/**
 * YouTube Video Extractor
 * -------------------------
 * Uses youtube-dl-exec (wrapper for yt-dlp) to safely bypass IP blocks
 * and robustly extract metadata and formats.
 */

import ytDlp from "youtube-dl-exec";
import { isValidYouTubeUrl } from "../utils/validators.js";
import { ok, fail } from "../utils/response.js";

// ─── Helpers ─────────────────────────────────────────────────────────────────

function buildFormatList(formats) {
  const muxed = [];
  const videoOnly = [];
  const audioOnly = [];

  for (const f of formats) {
    // Only care about mp4/webm for standard web playback
    if (f.ext !== "mp4" && f.ext !== "webm") continue;

    const entry = {
      itag: f.format_id,
      url: f.url,
      mimeType: f.ext,
      quality: f.format_note || f.height ? `${f.height}p` : "unknown",
      bitrate: f.tbr || 0,
      fps: f.fps || null,
      hasAudio: f.acodec !== "none" && f.acodec !== null,
      hasVideo: f.vcodec !== "none" && f.vcodec !== null,
      container: f.ext,
    };

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
        "Invalid YouTube URL. Please provide a valid YouTube video or Shorts link.",
        400
      );
    }

    console.log(`🔴 Processing YouTube via yt-dlp: ${trimmedUrl}`);

    let info;
    try {
      // yt-dlp is extremely robust and will not hang on dead links like play-dl
      // Bypass datacenter IP Blocks by forcing mobile clients (iOS/Android)
      info = await ytDlp(trimmedUrl, {
        dumpJson: true,
        noWarnings: true,
        preferFreeFormats: true,
        noCallHome: true,
        noCheckCertificate: true,
        extractorArgs: "youtube:player_client=ios,android,web"
      });
    } catch (innerErr) {
      console.error("yt-dlp failed:", innerErr.message);

      const msg = innerErr.message.toLowerCase();

      if (msg.includes("video unavailable") || msg.includes("not available")) {
        return fail(res, "This YouTube video is unavailable, deleted, or the link is broken.", 404);
      }
      if (msg.includes("private")) {
        return fail(res, "This YouTube video is private and cannot be downloaded.", 403);
      }
      if (msg.includes("sign in") || msg.includes("age")) {
        return fail(res, "This video is age-restricted. Age-restricted videos are not supported.", 403);
      }
      if (msg.includes("429") || msg.includes("bot") || msg.includes("sign in to confirm")) {
         return fail(
          res,
          "YouTube is temporarily blocking downloads from this server IP. Please try another video or try again later.",
          400
        );
      }

      return fail(
        res,
        "Failed to fetch YouTube video info. The video might be restricted or the service is temporarily unavailable.",
        400
      );
    }

    const formatGroups = buildFormatList(info.formats || []);
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
      title: info.title || "YouTube Video",
      thumbnail: info.thumbnail || "",
      downloadUrl: bestFormat.url,
      duration: info.duration
        ? `${Math.floor(info.duration / 60)}:${String(info.duration % 60).padStart(2, "0")}`
        : null,
      author: info.uploader || "",
      viewCount: info.view_count || null,
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
