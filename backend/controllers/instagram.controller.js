/**
 * Instagram Video / Reel Extractor
 * ---------------------------------
 * Strategy 1 → instagram-url-direct package (most reliable)
 * Strategy 2 → GraphQL / Additional Data extraction from Page Source
 * Strategy 3 → Embed page scraping fallback
 */

import axios from "axios";
import * as cheerio from "cheerio";
import instagramDl from "instagram-url-direct";
import { isValidInstagramUrl, normaliseInstagramUrl, extractInstagramShortcode } from "../utils/validators.js";
import { ok, fail } from "../utils/response.js";

const getHeaders = () => {
  // Rotate or use a very standard UA to avoid immediate blocks
  return {
    "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36",
    "Accept": "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8",
    "Accept-Language": "en-US,en;q=0.9",
    "Accept-Encoding": "gzip, deflate, br",
    "Connection": "keep-alive",
    "Upgrade-Insecure-Requests": "1",
    "Sec-Fetch-Dest": "document",
    "Sec-Fetch-Mode": "navigate",
    "Sec-Fetch-Site": "none",
    "Sec-Fetch-User": "?1",
    "Cache-Control": "max-age=0",
  };
};

const cleanUrl = (url) => url.replace(/\\u0026/g, "&").replace(/\\\//g, "/");

// ─── Strategy 1: instagram-url-direct ────────────────────────────────────────
async function extractViaPackage(url) {
  try {
    const result = await instagramDl(url);
    if (!result || !result.url_list || result.url_list.length === 0) {
      return null;
    }
    return {
      downloadUrl: result.url_list[0],
      allUrls: result.url_list,
      source: "instagram-url-direct",
      title: "Instagram Video",
      thumbnail: ""
    };
  } catch (err) {
    console.warn("⚠ instagram-url-direct failed:", err.message);
    return null;
  }
}

// ─── Strategy 2: Page Source Scraping (GraphQL / AdditionalData) ─────────────
async function extractViaPageSource(url) {
  try {
    const { data: html } = await axios.get(url, {
      headers: getHeaders(),
      timeout: 15000,
    });

    let downloadUrl = null;
    let title = "Instagram Video";
    let thumbnail = "";

    // Method A: Look for "video_url" directly in the raw HTML string
    // Instagram often embeds state like "video_url":"https://..."
    const videoUrlMatch = html.match(/"video_url":"(https?:[^"]+)"/);
    if (videoUrlMatch) {
      downloadUrl = cleanUrl(videoUrlMatch[1]);
    }

    // Method B: Look inside GraphQL / xdt_shortcode_media json payload
    if (!downloadUrl) {
      // Find script tags containing 'xdt_shortcode_media' or 'video_versions'
      const $ = cheerio.load(html);
      $('script').each((_, el) => {
        const scriptContent = $(el).html() || "";
        if (scriptContent.includes("video_url") || scriptContent.includes("video_versions")) {
          // Try to match the video_url pattern again just in case
          const urlMatch = scriptContent.match(/"video_url":"(https?:[^"]+)"/);
          if (urlMatch) {
            downloadUrl = cleanUrl(urlMatch[1]);
          } else {
            // Sometimes it's inside video_versions array
            const versionMatch = scriptContent.match(/"url":"(https?:[^"]+)"/g);
            if (versionMatch && versionMatch.length > 0) {
              // Take the first one (usually highest quality)
              const firstMatch = versionMatch[0].match(/"url":"(https?:[^"]+)"/);
              if (firstMatch) downloadUrl = cleanUrl(firstMatch[1]);
            }
          }
        }
      });
    }

    // Get metadata
    const $ = cheerio.load(html);
    thumbnail = $('meta[property="og:image"]').attr('content') || "";
    title = $('meta[property="og:title"]').attr('content') || "Instagram Video";

    // Method C: og:video tag fallback
    if (!downloadUrl) {
      const ogVideo = $('meta[property="og:video"]').attr('content');
      if (ogVideo) {
        downloadUrl = cleanUrl(ogVideo);
      }
    }

    if (downloadUrl) {
      return {
        downloadUrl,
        allUrls: [downloadUrl],
        source: "page-source",
        title,
        thumbnail
      };
    }
    return null;
  } catch (err) {
    console.warn("⚠ Page source scrape failed:", err.message);
    return null;
  }
}

// ─── Strategy 3: Embed page scraping ─────────────────────────────────────────
async function extractViaEmbed(shortcode) {
  try {
    const embedUrl = `https://www.instagram.com/p/${shortcode}/embed/captioned/`;
    const { data: html } = await axios.get(embedUrl, {
      headers: getHeaders(),
      timeout: 15000,
    });

    let downloadUrl = null;
    let thumbnail = "";

    // Method A: Check script tags in embed
    const videoUrlMatch = html.match(/"video_url":"(.*?)"/);
    if (videoUrlMatch) {
      downloadUrl = cleanUrl(videoUrlMatch[1]);
    }

    const $ = cheerio.load(html);
    
    // Method B: Check video source
    if (!downloadUrl) {
      const videoSrc = $("video source").attr("src") || $("video").attr("src");
      if (videoSrc) {
        downloadUrl = cleanUrl(videoSrc);
      }
    }

    thumbnail = $('.EmbeddedMediaImage').attr('src') || $('img').attr('src') || "";

    if (downloadUrl) {
      return {
        downloadUrl,
        allUrls: [downloadUrl],
        source: "embed-scrape",
        title: `Instagram Video - ${shortcode}`,
        thumbnail
      };
    }

    return null;
  } catch (err) {
    console.warn("⚠ Embed scrape failed:", err.message);
    return null;
  }
}

// ─── Main Controller ─────────────────────────────────────────────────────────
export async function handleInstagram(req, res) {
  try {
    const { url } = req.body;

    if (!url || typeof url !== "string") {
      return fail(res, "Missing or invalid 'url' field in request body.");
    }

    const trimmedUrl = url.trim();

    if (!isValidInstagramUrl(trimmedUrl)) {
      return fail(
        res,
        "Invalid Instagram URL. Please provide a valid Instagram Reel, Post, or IGTV link."
      );
    }

    const normalised = normaliseInstagramUrl(trimmedUrl);
    const shortcode = extractInstagramShortcode(trimmedUrl);

    console.log(`📸 Processing Instagram: ${shortcode || trimmedUrl}`);

    // Tier 1: Try package first
    let result = await extractViaPackage(normalised);

    // Tier 2: Try Page Source (GraphQL / AdditionalData)
    if (!result) {
      console.log("Tier 1 failed. Trying Tier 2 (Page Source)...");
      result = await extractViaPageSource(normalised);
    }

    // Tier 3: Try Embed Scraping
    if (!result && shortcode) {
      console.log("Tier 2 failed. Trying Tier 3 (Embed Scraping)...");
      result = await extractViaEmbed(shortcode);
    }

    if (!result || !result.downloadUrl) {
      return fail(
        res,
        "Could not extract video from this Instagram URL. The post may be private, deleted, or Instagram may have blocked the request.",
        422
      );
    }

    return ok(res, {
      title: result.title || `Instagram Video - ${shortcode || "Post"}`,
      thumbnail: result.thumbnail || "",
      downloadUrl: result.downloadUrl,
      allUrls: result.allUrls,
      platform: "instagram",
      extractionMethod: result.source,
    });
  } catch (err) {
    console.error("❌ Instagram controller error:", err);
    return fail(res, "Server error while processing Instagram video.", 500);
  }
}
