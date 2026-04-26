/**
 * Facebook Video Extractor
 * -------------------------
 * Facebook embeds video URLs directly inside the page HTML/JS payload.
 * We fetch the page with a mobile User-Agent (which returns a lighter page)
 * and extract HD / SD video URLs via regex pattern matching.
 *
 * Handles: /watch/, /videos/, /reel/, /share/v/, fb.watch short links.
 */

import axios from "axios";
import { isValidFacebookUrl } from "../utils/validators.js";
import { ok, fail } from "../utils/response.js";

const MOBILE_UA =
  "Mozilla/5.0 (Linux; Android 14; Pixel 8) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Mobile Safari/537.36";

const DESKTOP_UA =
  "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36";

// ─── Resolve fb.watch short links ────────────────────────────────────────────
async function resolveShortUrl(url) {
  if (/fb\.watch/i.test(url)) {
    try {
      const resp = await axios.head(url, {
        maxRedirects: 5,
        timeout: 10000,
        headers: { "User-Agent": DESKTOP_UA },
        validateStatus: () => true,
      });
      return resp.request?.res?.responseUrl || resp.headers?.location || url;
    } catch {
      return url;
    }
  }
  return url;
}

// ─── Extract video URLs from Facebook page HTML ──────────────────────────────
function extractVideoUrls(html) {
  const urls = { hd: null, sd: null, title: null };

  // ── HD URL patterns ──────────────────────────────────────────────────────
  const hdPatterns = [
    /browser_native_hd_url\s*"?\s*:\s*"(https?[^"]+)"/i,
    /playable_url_quality_hd\s*"?\s*:\s*"(https?[^"]+)"/i,
    /"hd_src\s*"?\s*:\s*"(https?[^"]+)"/i,
    /hd_src\s*:\s*"(https?[^"]+)"/i,
    /"hd_src_no_ratelimit\s*"?\s*:\s*"(https?[^"]+)"/i,
  ];

  // ── SD URL patterns ──────────────────────────────────────────────────────
  const sdPatterns = [
    /browser_native_sd_url\s*"?\s*:\s*"(https?[^"]+)"/i,
    /playable_url\s*"?\s*:\s*"(https?[^"]+)"/i,
    /"sd_src\s*"?\s*:\s*"(https?[^"]+)"/i,
    /sd_src\s*:\s*"(https?[^"]+)"/i,
    /"sd_src_no_ratelimit\s*"?\s*:\s*"(https?[^"]+)"/i,
  ];

  // ── Title patterns ───────────────────────────────────────────────────────
  const titlePatterns = [
    /<title[^>]*>([^<]+)<\/title>/i,
    /property="og:title"\s+content="([^"]+)"/i,
    /name="description"\s+content="([^"]+)"/i,
  ];

  const decode = (str) =>
    str
      .replace(/\\u0025/g, "%")
      .replace(/\\u0026/g, "&")
      .replace(/\\\//g, "/")
      .replace(/\\x([0-9A-Fa-f]{2})/g, (_, hex) =>
        String.fromCharCode(parseInt(hex, 16))
      );

  for (const p of hdPatterns) {
    const m = html.match(p);
    if (m) {
      urls.hd = decode(m[1]);
      break;
    }
  }

  for (const p of sdPatterns) {
    const m = html.match(p);
    if (m) {
      urls.sd = decode(m[1]);
      break;
    }
  }

  for (const p of titlePatterns) {
    const m = html.match(p);
    if (m) {
      urls.title = m[1].trim();
      break;
    }
  }

  return urls;
}

// ─── Fetch and scrape a Facebook page ────────────────────────────────────────
async function fetchFacebookPage(url, userAgent) {
  const { data: html } = await axios.get(url, {
    headers: {
      "User-Agent": userAgent,
      Accept: "text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8",
      "Accept-Language": "en-US,en;q=0.9",
      "Sec-Fetch-Mode": "navigate",
      "Cache-Control": "no-cache",
    },
    timeout: 20000,
    maxRedirects: 5,
  });
  return html;
}

// ─── Main Controller ─────────────────────────────────────────────────────────
export async function handleFacebook(req, res) {
  try {
    const { url } = req.body;

    if (!url || typeof url !== "string") {
      return fail(res, "Missing or invalid 'url' field in request body.");
    }

    const trimmedUrl = url.trim();

    if (!isValidFacebookUrl(trimmedUrl)) {
      return fail(
        res,
        "Invalid Facebook URL. Please provide a public Facebook video, Reel, or Watch link."
      );
    }

    // Resolve short URLs first
    const resolvedUrl = await resolveShortUrl(trimmedUrl);
    console.log(`📘 Processing Facebook: ${resolvedUrl}`);

    // Try mobile page first (lighter HTML, easier to parse)
    let result = { hd: null, sd: null, title: null };

    try {
      const mobileHtml = await fetchFacebookPage(
        resolvedUrl.replace("www.facebook.com", "m.facebook.com"),
        MOBILE_UA
      );
      result = extractVideoUrls(mobileHtml);
    } catch (err) {
      console.warn("⚠ Mobile fetch failed, trying desktop:", err.message);
    }

    // Fallback to desktop page if mobile didn't yield results
    if (!result.hd && !result.sd) {
      try {
        const desktopHtml = await fetchFacebookPage(resolvedUrl, DESKTOP_UA);
        result = extractVideoUrls(desktopHtml);
      } catch (err) {
        console.warn("⚠ Desktop fetch also failed:", err.message);
      }
    }

    const downloadUrl = result.hd || result.sd;

    if (!downloadUrl) {
      return fail(
        res,
        "Could not extract video from this Facebook URL. The video may be private, removed, or the page structure has changed.",
        422
      );
    }

    return ok(res, {
      title: result.title || "Facebook Video",
      thumbnail: "",
      downloadUrl,
      hdUrl: result.hd || null,
      sdUrl: result.sd || null,
      platform: "facebook",
    });
  } catch (err) {
    console.error("❌ Facebook controller error:", err);
    return fail(res, "Server error while processing Facebook video.", 500);
  }
}
