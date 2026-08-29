/**
 * Instagram Multi-Media Extractor (Reels, Stories, Photos, Carousels, Audio)
 * -------------------------------------------------------------------------
 * Strategy 1 → RapidAPI Instagram Downloader (extracts 1080p video, dedicated audio track, carousel, photo)
 * Strategy 2 → instagram-url-direct package (instagramGetUrl)
 * Strategy 3 → Direct Page / GraphQL Data extraction from Page Source
 * Strategy 4 → Embed page scraping fallback
 */

import axios from "axios";
import * as cheerio from "cheerio";
import { instagramGetUrl } from "instagram-url-direct";
import {
  isValidInstagramUrl,
  normaliseInstagramUrl,
  extractInstagramShortcode,
  extractInstagramStoryInfo,
} from "../utils/validators.js";
import { ok, fail } from "../utils/response.js";

const getHeaders = () => {
  return {
    "User-Agent":
      "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36",
    Accept:
      "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8",
    "Accept-Language": "en-US,en;q=0.9",
    "Accept-Encoding": "gzip, deflate, br",
    Connection: "keep-alive",
    "Upgrade-Insecure-Requests": "1",
    "Sec-Fetch-Dest": "document",
    "Sec-Fetch-Mode": "navigate",
    "Sec-Fetch-Site": "none",
    "Sec-Fetch-User": "?1",
    "Cache-Control": "max-age=0",
  };
};

const cleanUrl = (url) =>
  url ? url.replace(/\\u0026/g, "&").replace(/\\\//g, "/") : "";

// ─── Strategy 1: RapidAPI Extractor (Full Video, Dedicated Audio, Photos) ────
async function extractViaRapidAPI(url) {
  try {
    const rapidResponse = await axios.get(
      `https://instagram-reels-downloader-api.p.rapidapi.com/download?url=${encodeURIComponent(
        url
      )}`,
      {
        headers: {
          "x-rapidapi-key":
            process.env.RAPIDAPI_KEY ||
            "1d3c664356msh76d4c41dada8eabp1d9fcajsna797af8ee7be",
          "x-rapidapi-host": "instagram-reels-downloader-api.p.rapidapi.com",
        },
        timeout: 12000,
      }
    );

    const data = rapidResponse.data?.data;
    if (!data) return null;

    const title =
      data.title ||
      data.caption ||
      (data.user ? `Instagram post by @${data.user.username || data.user.full_name}` : "Instagram Media");

    const author = data.user?.username || "";
    const thumbnail = data.thumbnail || data.picture_url || "";
    const medias = data.medias || [];

    let videoUrl = "";
    let audioUrl = "";
    let photoUrl = "";
    const items = [];

    // Parse all medias returned
    for (const m of medias) {
      if (m.type === "audio" || m.is_audio && !m.type) {
        if (!audioUrl) audioUrl = m.url;
      } else if (m.type === "video" || m.extension === "mp4") {
        if (!videoUrl) videoUrl = m.url;
        items.push({
          type: "video",
          downloadUrl: m.url,
          thumbnail: m.thumbnail || thumbnail,
          quality: m.quality,
        });
      } else if (m.type === "image" || m.type === "photo" || m.extension === "jpg") {
        if (!photoUrl) photoUrl = m.url;
        items.push({
          type: "image",
          downloadUrl: m.url,
          thumbnail: m.url,
        });
      }
    }

    // If no specific audio stream was returned separately, the video stream itself has the audio track
    if (!audioUrl && videoUrl) {
      audioUrl = videoUrl;
    }

    // Determine primary media type
    let mediaType = "video";
    if (items.length > 1) {
      mediaType = "carousel";
    } else if (photoUrl && !videoUrl) {
      mediaType = "photo";
    } else if (url.includes("/stories/")) {
      mediaType = "story";
    } else {
      mediaType = "video";
    }

    const primaryDownloadUrl =
      videoUrl || photoUrl || (items[0] && items[0].downloadUrl) || "";

    if (!primaryDownloadUrl && !audioUrl) return null;

    return {
      title,
      thumbnail: thumbnail || (items[0] && items[0].thumbnail) || "",
      downloadUrl: primaryDownloadUrl,
      videoUrl: videoUrl || primaryDownloadUrl,
      audioUrl: audioUrl || primaryDownloadUrl,
      photoUrl: photoUrl || primaryDownloadUrl,
      items: items.length > 0 ? items : [
        {
          type: mediaType === "photo" ? "image" : "video",
          downloadUrl: primaryDownloadUrl,
          thumbnail: thumbnail || primaryDownloadUrl,
        },
      ],
      mediaType,
      author,
      source: "rapidapi",
    };
  } catch (err) {
    console.warn("⚠ RapidAPI extraction failed:", err.message);
    return null;
  }
}

// ─── Strategy 2: instagram-url-direct package ───────────────────────────────
async function extractViaPackage(url) {
  try {
    const fn = instagramGetUrl || (await import("instagram-url-direct")).instagramGetUrl;
    if (typeof fn !== "function") return null;

    const result = await fn(url);
    if (!result) return null;

    const mediaDetails = result.media_details || [];
    const urlList = result.url_list || [];

    if (urlList.length === 0 && mediaDetails.length === 0) {
      return null;
    }

    const postInfo = result.post_info || {};
    const title =
      postInfo.caption
        ? postInfo.caption.slice(0, 120)
        : postInfo.owner_username
        ? `Instagram post by @${postInfo.owner_username}`
        : "Instagram Media";

    const items = [];
    let videoUrl = "";
    let photoUrl = "";

    if (mediaDetails.length > 0) {
      for (const m of mediaDetails) {
        const isImg = m.type === "image";
        if (isImg && !photoUrl) photoUrl = m.url;
        if (!isImg && !videoUrl) videoUrl = m.url;

        items.push({
          type: isImg ? "image" : "video",
          downloadUrl: m.url,
          thumbnail: m.thumbnail || m.url,
          dimensions: m.dimensions,
        });
      }
    } else {
      for (const u of urlList) {
        const isVideo =
          u.includes(".mp4") ||
          u.includes("video") ||
          url.includes("/reel/") ||
          url.includes("/tv/");

        if (isVideo && !videoUrl) videoUrl = u;
        if (!isVideo && !photoUrl) photoUrl = u;

        items.push({
          type: isVideo ? "video" : "image",
          downloadUrl: u,
          thumbnail: isVideo ? "" : u,
        });
      }
    }

    const firstItem = items[0] || {};
    const isMultiple = items.length > 1;
    let mediaType = "video";
    if (isMultiple) {
      mediaType = "carousel";
    } else if (firstItem.type === "image" && !videoUrl) {
      mediaType = "photo";
    } else if (url.includes("/stories/")) {
      mediaType = "story";
    } else {
      mediaType = "video";
    }

    return {
      title,
      thumbnail: firstItem.thumbnail || firstItem.downloadUrl || "",
      downloadUrl: firstItem.downloadUrl,
      videoUrl: videoUrl || firstItem.downloadUrl,
      audioUrl: videoUrl || firstItem.downloadUrl,
      photoUrl: photoUrl || firstItem.downloadUrl,
      allUrls: urlList,
      items,
      mediaType,
      author: postInfo.owner_username || "",
      likes: postInfo.likes || 0,
      source: "instagram-url-direct",
    };
  } catch (err) {
    console.warn("⚠ instagram-url-direct failed:", err.message);
    return null;
  }
}

// ─── Strategy 3: Direct Page Source Scraping ────────────────────────────────
async function extractViaPageSource(url) {
  try {
    const { data: html } = await axios.get(url, {
      headers: getHeaders(),
      timeout: 12000,
    });

    let downloadUrl = null;
    let title = "Instagram Media";
    let thumbnail = "";
    let mediaType = "video";
    const items = [];

    const $ = cheerio.load(html);
    thumbnail =
      $('meta[property="og:image"]').attr("content") ||
      $('meta[name="twitter:image"]').attr("content") ||
      "";
    title =
      $('meta[property="og:title"]').attr("content") ||
      $('meta[name="twitter:title"]').attr("content") ||
      "Instagram Post";

    const videoUrlMatch = html.match(/"video_url":"(https?:[^"]+)"/);
    if (videoUrlMatch) {
      downloadUrl = cleanUrl(videoUrlMatch[1]);
      mediaType = "video";
    }

    const displayUrlMatch = html.match(/"display_url":"(https?:[^"]+)"/);
    const displayUrl = displayUrlMatch ? cleanUrl(displayUrlMatch[1]) : "";

    if (!downloadUrl) {
      const ogVideo = $('meta[property="og:video"]').attr("content");
      if (ogVideo) {
        downloadUrl = cleanUrl(ogVideo);
        mediaType = "video";
      }
    }

    if (!downloadUrl) {
      if (displayUrl) {
        downloadUrl = displayUrl;
        mediaType = "photo";
      } else if (thumbnail) {
        downloadUrl = thumbnail;
        mediaType = "photo";
      }
    }

    if (downloadUrl) {
      items.push({
        type: mediaType === "video" ? "video" : "image",
        downloadUrl,
        thumbnail: thumbnail || downloadUrl,
      });

      return {
        title,
        thumbnail: thumbnail || downloadUrl,
        downloadUrl,
        videoUrl: mediaType === "video" ? downloadUrl : "",
        audioUrl: mediaType === "video" ? downloadUrl : "",
        photoUrl: mediaType === "photo" ? downloadUrl : thumbnail,
        allUrls: [downloadUrl],
        items,
        mediaType,
        source: "page-source",
      };
    }

    return null;
  } catch (err) {
    console.warn("⚠ Page source scrape failed:", err.message);
    return null;
  }
}

// ─── Main Controller ─────────────────────────────────────────────────────────
export async function handleInstagram(req, res) {
  try {
    const { url, type } = req.body;

    if (!url || typeof url !== "string") {
      return fail(res, "Missing or invalid 'url' field in request body.");
    }

    const trimmedUrl = url.trim();

    if (!isValidInstagramUrl(trimmedUrl)) {
      return fail(
        res,
        "Invalid Instagram URL. Please provide a valid Reel, Story, Post, Photo, or IGTV link."
      );
    }

    const normalised = normaliseInstagramUrl(trimmedUrl);
    const shortcode = extractInstagramShortcode(trimmedUrl);
    const storyInfo = extractInstagramStoryInfo(trimmedUrl);

    console.log(
      `📸 Processing Instagram [${type || "auto"}]: ${
        storyInfo ? `Story (@${storyInfo.username})` : shortcode || trimmedUrl
      }`
    );

    // Strategy 1: RapidAPI
    let result = await extractViaRapidAPI(normalised);

    // Strategy 2: instagram-url-direct
    if (!result) {
      console.log("Strategy 1 failed. Trying Strategy 2 (instagram-url-direct)...");
      result = await extractViaPackage(normalised);
    }

    // Strategy 3: Page Source
    if (!result) {
      console.log("Strategy 2 failed. Trying Strategy 3 (Page Source)...");
      result = await extractViaPageSource(normalised);
    }

    if (!result || (!result.downloadUrl && !result.audioUrl && (!result.items || result.items.length === 0))) {
      return fail(
        res,
        "Could not extract media from this Instagram URL. The post or story may be from a private account or removed.",
        422
      );
    }

    // If requested specifically for audio, ensure audioUrl is prioritized
    const isAudioRequest = type === "audio";
    const selectedDownloadUrl = isAudioRequest
      ? result.audioUrl || result.downloadUrl
      : type === "photo" && result.photoUrl
      ? result.photoUrl
      : result.downloadUrl;

    const resolvedMediaType = isAudioRequest
      ? "audio"
      : type === "photo" && result.mediaType !== "carousel"
      ? "photo"
      : result.mediaType || "video";

    return ok(res, {
      title: result.title || `Instagram ${type || "Media"} - ${shortcode || "Post"}`,
      thumbnail: result.thumbnail || "",
      downloadUrl: selectedDownloadUrl,
      videoUrl: result.videoUrl || result.downloadUrl,
      audioUrl: result.audioUrl || result.downloadUrl,
      photoUrl: result.photoUrl || result.thumbnail,
      allUrls: result.allUrls || [],
      items: result.items || [
        {
          type: resolvedMediaType === "photo" ? "image" : resolvedMediaType === "audio" ? "audio" : "video",
          downloadUrl: selectedDownloadUrl,
          thumbnail: result.thumbnail,
        },
      ],
      mediaType: resolvedMediaType,
      author: result.author || "",
      likes: result.likes || 0,
      platform: "instagram",
      extractionMethod: result.source,
    });
  } catch (err) {
    console.error("❌ Instagram controller error:", err);
    return fail(res, "Server error while processing Instagram request.", 500);
  }
}
