/**
 * YouTube Video Extractor
 * -------------------------
 * Uses @distube/ytdl-core (actively-maintained fork of ytdl-core)
 * to extract video metadata and direct download URLs.
 *
 * Returns multiple quality options so the frontend can offer choices.
 *
 * FALLBACK: If ytdl-core ever breaks (YouTube changes are frequent),
 * consider switching to `yt-dlp-exec` which wraps the yt-dlp binary
 * and is far more resilient to changes.
 */

import play from "play-dl";
import { isValidYouTubeUrl } from "../utils/validators.js";
import { ok, fail } from "../utils/response.js";

// ─── Helpers ─────────────────────────────────────────────────────────────────

function buildFormatList(formats) {
  const muxed = [];
  const videoOnly = [];
  const audioOnly = [];

  for (const f of formats) {
    const entry = {
      itag: f.itag,
      url: f.url,
      mimeType: f.mimeType || "",
      quality: f.qualityLabel || f.quality || "unknown",
      bitrate: f.bitrate || 0,
      fps: f.fps || null,
      // In play-dl, if it has qualityLabel and audioQuality, it's muxed
      hasAudio: !!f.audioQuality || !!f.audioSampleRate,
      hasVideo: !!f.qualityLabel,
      contentLength: f.contentLength || null,
      container: "mp4", // default fallback
    };

    if (entry.mimeType.includes("mp4") || entry.mimeType.includes("webm")) {
      entry.container = entry.mimeType.split(";")[0].split("/")[1];
    }

    if (entry.hasAudio && entry.hasVideo) {
      muxed.push(entry);
    } else if (entry.hasVideo) {
      videoOnly.push(entry);
    } else if (entry.hasAudio) {
      audioOnly.push(entry);
    }
  }

  const byBitrate = (a, b) => (b.bitrate || 0) - (a.bitrate || 0);
  muxed.sort(byBitrate);
  videoOnly.sort(byBitrate);
  audioOnly.sort(byBitrate);

  return { muxed, videoOnly, audioOnly };
}

function selectBestDownload(formatGroups) {
  const { muxed, videoOnly } = formatGroups;

  if (muxed.length > 0) {
    const hd = muxed.find((f) => f.quality && parseInt(f.quality) >= 720);
    return hd || muxed[0];
  }

  if (videoOnly.length > 0) {
    return videoOnly[0];
  }

  return null;
}

// Configure play-dl with a generic browser User-Agent to bypass basic datacenter blocks
play.setToken({
  useragent: ["Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36"]
});

// ─── Main Controller ─────────────────────────────────────────────────────────
export async function handleYouTube(req, res) {
  try {
    const { url } = req.body;

    if (!url || typeof url !== "string") {
      return fail(res, "Missing or invalid 'url' field in request body.");
    }

    const trimmedUrl = url.trim();

    if (!isValidYouTubeUrl(trimmedUrl)) {
      return fail(
        res,
        "Invalid YouTube URL. Please provide a valid YouTube video or Shorts link."
      );
    }

    console.log(`🔴 Processing YouTube: ${trimmedUrl}`);

    let info;
    try {
      const fetchPromise = play.video_info(trimmedUrl);
      const timeoutPromise = new Promise((_, reject) =>
        setTimeout(() => reject(new Error("Request timed out or IP blocked")), 10000)
      );
      
      info = await Promise.race([fetchPromise, timeoutPromise]);
    } catch (innerErr) {
      console.error("play-dl video_info failed:", innerErr.message);

      const msg = innerErr.message.toLowerCase();

      // Catch strict IP blocks, bot checks, and timeouts
      if (
        msg.includes("timed out") ||
        msg.includes("429") ||
        msg.includes("400") ||
        msg.includes("bot") ||
        msg.includes("sign in") ||
        msg.includes("miniget")
      ) {
        return fail(
          res,
          "YouTube is temporarily blocking downloads from this server IP. Please try another video or try again later.",
          400
        );
      }

      if (msg.includes("private")) {
        return fail(res, "This YouTube video is private and cannot be downloaded.", 403);
      }
      if (msg.includes("age")) {
        return fail(res, "This video is age-restricted. Age-restricted videos are not supported.", 403);
      }
      if (msg.includes("unavailable") || msg.includes("not available") || msg.includes("410")) {
        return fail(res, "This YouTube video is unavailable or has been removed.", 404);
      }
      
      return fail(
        res,
        "Failed to fetch YouTube video info. The video might be restricted or the service is temporarily unavailable.",
        400
      );
    }

    const videoDetails = info.video_details;
    const allFormats = info.format || [];

    const formatGroups = buildFormatList(allFormats);
    const bestFormat = selectBestDownload(formatGroups);

    if (!bestFormat) {
      return fail(res, "No downloadable formats found for this YouTube video.", 422);
    }

    const availableQualities = formatGroups.muxed.map((f) => ({
      quality: f.quality,
      url: f.url,
      container: f.container,
      hasAudio: f.hasAudio,
    }));

    return ok(res, {
      title: videoDetails.title || "YouTube Video",
      thumbnail: videoDetails.thumbnails?.[videoDetails.thumbnails.length - 1]?.url || "",
      downloadUrl: bestFormat.url,
      duration: videoDetails.durationInSec
        ? `${Math.floor(videoDetails.durationInSec / 60)}:${String(
            videoDetails.durationInSec % 60
          ).padStart(2, "0")}`
        : null,
      author: videoDetails.channel?.name || "",
      viewCount: videoDetails.views || null,
      platform: "youtube",
      quality: bestFormat.quality,
      availableQualities,
      audioUrl: formatGroups.audioOnly[0]?.url || null,
    });
  } catch (err) {
    console.error("❌ YouTube controller error:", err);
    return fail(res, "Server error while processing YouTube video.", 500);
  }
}
