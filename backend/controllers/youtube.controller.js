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

import ytdl from "@distube/ytdl-core";
import { isValidYouTubeUrl } from "../utils/validators.js";
import { ok, fail } from "../utils/response.js";

// ─── Helpers ─────────────────────────────────────────────────────────────────

/**
 * Build a clean formats list from ytdl's raw format data.
 * We prioritise formats that contain both video+audio (muxed),
 * then offer separate video-only and audio-only options.
 */
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
      hasAudio: f.hasAudio ?? !!f.audioBitrate,
      hasVideo: f.hasVideo ?? !!f.qualityLabel,
      contentLength: f.contentLength || null,
      container: f.container || "mp4",
    };

    if (entry.hasAudio && entry.hasVideo) {
      muxed.push(entry);
    } else if (entry.hasVideo) {
      videoOnly.push(entry);
    } else if (entry.hasAudio) {
      audioOnly.push(entry);
    }
  }

  // Sort by bitrate descending (highest quality first)
  const byBitrate = (a, b) => (b.bitrate || 0) - (a.bitrate || 0);
  muxed.sort(byBitrate);
  videoOnly.sort(byBitrate);
  audioOnly.sort(byBitrate);

  return { muxed, videoOnly, audioOnly };
}

/**
 * Select the best muxed (video+audio) download URL.
 * Preference: 1080p > 720p > 480p > 360p > any.
 */
function selectBestDownload(formatGroups) {
  const { muxed, videoOnly } = formatGroups;

  // Prefer muxed formats (video+audio in one file)
  if (muxed.length > 0) {
    // Try to find 720p+ first (muxed rarely has 1080p)
    const hd = muxed.find(
      (f) => f.quality && parseInt(f.quality) >= 720
    );
    return hd || muxed[0];
  }

  // Fallback: best video-only format
  if (videoOnly.length > 0) {
    return videoOnly[0];
  }

  return null;
}

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

    // Fetch video info
    let info;
    try {
      info = await ytdl.getInfo(trimmedUrl, {
        requestOptions: {
          headers: {
            "User-Agent":
              "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 Chrome/124.0.0.0 Safari/537.36",
          },
        },
      });
    } catch (innerErr) {
      console.error("ytdl.getInfo failed:", innerErr.message);

      // Handle common ytdl-core errors with user-friendly messages
      if (innerErr.message.includes("private")) {
        return fail(res, "This YouTube video is private and cannot be downloaded.", 403);
      }
      if (innerErr.message.includes("age")) {
        return fail(res, "This video is age-restricted. Age-restricted videos are not supported.", 403);
      }
      if (innerErr.message.includes("unavailable") || innerErr.message.includes("not available")) {
        return fail(res, "This YouTube video is unavailable or has been removed.", 404);
      }
      if (innerErr.message.includes("copyright")) {
        return fail(res, "This video has been removed due to a copyright claim.", 403);
      }

      return fail(
        res,
        "Failed to fetch YouTube video info. The video might be restricted or the service is temporarily unavailable.",
        502
      );
    }

    const { videoDetails } = info;
    const formats = ytdl.filterFormats(info.formats, "videoandaudio");
    const allFormats = info.formats;

    const formatGroups = buildFormatList(allFormats);
    const bestFormat = selectBestDownload(formatGroups);

    if (!bestFormat) {
      return fail(res, "No downloadable formats found for this YouTube video.", 422);
    }

    // Build a concise list of available qualities for the frontend
    const availableQualities = formatGroups.muxed.map((f) => ({
      quality: f.quality,
      url: f.url,
      container: f.container,
      hasAudio: f.hasAudio,
    }));

    return ok(res, {
      title: videoDetails.title || "YouTube Video",
      thumbnail:
        videoDetails.thumbnails?.[videoDetails.thumbnails.length - 1]?.url || "",
      downloadUrl: bestFormat.url,
      duration: videoDetails.lengthSeconds
        ? `${Math.floor(videoDetails.lengthSeconds / 60)}:${String(
            videoDetails.lengthSeconds % 60
          ).padStart(2, "0")}`
        : null,
      author: videoDetails.author?.name || videoDetails.ownerChannelName || "",
      viewCount: videoDetails.viewCount || null,
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
