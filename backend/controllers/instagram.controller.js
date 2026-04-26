/**
 * Instagram Video / Reel Extractor
 * ---------------------------------
 * Strategy 1 → instagram-url-direct package (most reliable)
 * Strategy 2 → Embed page scraping fallback
 *
 * If Instagram changes its HTML structure, Strategy 1 (package) is the
 * first thing to update — just bump the package version.
 */

import axios from "axios";
import * as cheerio from "cheerio";
import instagramDl from "instagram-url-direct";
import { isValidInstagramUrl, normaliseInstagramUrl, extractInstagramShortcode } from "../utils/validators.js";
import { ok, fail } from "../utils/response.js";

const BROWSER_UA =
  "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36";

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
    };
  } catch (err) {
    console.warn("⚠ instagram-url-direct failed:", err.message);
    return null;
  }
}

// ─── Strategy 2: Embed page scraping ─────────────────────────────────────────
async function extractViaEmbed(shortcode) {
  try {
    const embedUrl = `https://www.instagram.com/p/${shortcode}/embed/captioned/`;
    const { data: html } = await axios.get(embedUrl, {
      headers: {
        "User-Agent": BROWSER_UA,
        Accept: "text/html,application/xhtml+xml",
        "Accept-Language": "en-US,en;q=0.9",
        Referer: "https://www.instagram.com/",
      },
      timeout: 15000,
    });

    // Try to find video_url in the embedded JSON data
    const videoUrlMatch = html.match(/"video_url":"(.*?)"/);
    if (videoUrlMatch) {
      const videoUrl = videoUrlMatch[1].replace(/\\u0026/g, "&").replace(/\\\//g, "/");
      return {
        downloadUrl: videoUrl,
        allUrls: [videoUrl],
        source: "embed-scrape",
      };
    }

    // Try to find og:video meta tag
    const $ = cheerio.load(html);
    const ogVideo = $('meta[property="og:video"]').attr("content");
    if (ogVideo) {
      return {
        downloadUrl: ogVideo,
        allUrls: [ogVideo],
        source: "embed-og-tag",
      };
    }

    // Try extracting from the video element directly
    const videoSrc = $("video source").attr("src") || $("video").attr("src");
    if (videoSrc) {
      return {
        downloadUrl: videoSrc,
        allUrls: [videoSrc],
        source: "embed-video-tag",
      };
    }

    return null;
  } catch (err) {
    console.warn("⚠ Embed scrape failed:", err.message);
    return null;
  }
}

// ─── Strategy 3: Page source scraping ────────────────────────────────────────
async function extractViaPageSource(url) {
  try {
    const { data: html } = await axios.get(url, {
      headers: {
        "User-Agent": BROWSER_UA,
        Accept: "text/html,application/xhtml+xml",
        "Accept-Language": "en-US,en;q=0.9",
        Cookie: "",
      },
      timeout: 15000,
      maxRedirects: 5,
    });

    // Look for video_url in page source (JSON-LD or embedded data)
    const patterns = [
      /"video_url":"(https?:[^"]+)"/,
      /"contentUrl":"(https?:[^"]+)"/,
      /video_url\\?":\\?"(https?:[^"\\]+)/,
    ];

    for (const pattern of patterns) {
      const match = html.match(pattern);
      if (match) {
        const videoUrl = match[1].replace(/\\u0026/g, "&").replace(/\\\//g, "/");
        return {
          downloadUrl: videoUrl,
          allUrls: [videoUrl],
          source: "page-source",
        };
      }
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

    // Try each strategy in order of reliability
    let result = await extractViaPackage(normalised);

    if (!result && shortcode) {
      result = await extractViaEmbed(shortcode);
    }

    if (!result) {
      result = await extractViaPageSource(normalised);
    }

    if (!result) {
      return fail(
        res,
        "Could not extract video from this Instagram URL. The post may be private, deleted, or Instagram may have changed their page structure.",
        422
      );
    }

    return ok(res, {
      title: `Instagram Video - ${shortcode || "Post"}`,
      thumbnail: "",
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
