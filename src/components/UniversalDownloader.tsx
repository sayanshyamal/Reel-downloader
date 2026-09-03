"use client";

import { useState, useMemo } from "react";
import {
  Download,
  Loader2,
  AlertCircle,
  Clipboard,
  X,
  Check,
  Film,
  Image as ImageIcon,
  Layers,
  Sparkles,
  Globe,
} from "lucide-react";
import { FaInstagram, FaFacebook, FaYoutube } from "react-icons/fa";

interface MediaItem {
  type: "video" | "image" | "audio";
  downloadUrl: string;
  thumbnail?: string;
  quality?: string;
}

interface VideoData {
  title: string;
  thumbnail: string;
  downloadUrl: string;
  videoUrl?: string;
  audioUrl?: string;
  photoUrl?: string;
  hdUrl?: string;
  sdUrl?: string;
  platform?: string;
  mediaType?: "video" | "photo" | "carousel" | "story" | "audio";
  items?: MediaItem[];
  author?: string;
}

type PlatformTab = "all" | "instagram" | "facebook" | "youtube";

const API_BASE = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";

export default function UniversalDownloader() {
  const [selectedTab, setSelectedTab] = useState<PlatformTab>("all");
  const [url, setUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [videoData, setVideoData] = useState<VideoData | null>(null);
  const [downloadingUrl, setDownloadingUrl] = useState<string | null>(null);
  const [downloadAllProgress, setDownloadAllProgress] = useState(false);
  const [copied, setCopied] = useState(false);

  // Auto-detect platform from URL input
  const detectedPlatform = useMemo(() => {
    const trimmed = url.trim().toLowerCase();
    if (!trimmed) return null;
    if (trimmed.includes("instagram.com") || trimmed.includes("instagr.am")) {
      return "instagram";
    }
    if (
      trimmed.includes("facebook.com") ||
      trimmed.includes("fb.watch") ||
      trimmed.includes("fb.com")
    ) {
      return "facebook";
    }
    if (trimmed.includes("youtube.com") || trimmed.includes("youtu.be")) {
      return "youtube";
    }
    return null;
  }, [url]);

  const activeTargetPlatform =
    selectedTab === "all" ? detectedPlatform || "all" : selectedTab;

  const placeholderText = useMemo(() => {
    switch (activeTargetPlatform) {
      case "instagram":
        return "Paste Instagram Reel, Story, Photo, or Video URL...";
      case "facebook":
        return "Paste Facebook Video, Reel, or Watch URL...";
      case "youtube":
        return "Paste YouTube Shorts or Video URL...";
      default:
        return "Paste any Instagram, Facebook, or YouTube URL here...";
    }
  }, [activeTargetPlatform]);

  const handlePaste = async () => {
    try {
      const text = await navigator.clipboard.readText();
      if (text) {
        setUrl(text.trim());
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      }
    } catch {
      // Clipboard permissions denied
    }
  };

  const handleClear = () => {
    setUrl("");
    setError("");
  };

  const triggerDownload = (
    fileUrl: string,
    filename?: string,
    type: "video" | "image" | "audio" = "video"
  ) => {
    if (!fileUrl) return;

    setDownloadingUrl(fileUrl);

    const safeFilename =
      filename ||
      `AnyClip-${
        type === "image" ? "Photo" : type === "audio" ? "Audio" : "Video"
      }-${Date.now()}.${
        type === "image" ? "jpg" : type === "audio" ? "mp3" : "mp4"
      }`;

    const proxyUrl = `/api/force-download?url=${encodeURIComponent(
      fileUrl
    )}&filename=${encodeURIComponent(safeFilename)}&type=${type}`;

    const link = document.createElement("a");
    link.href = proxyUrl;
    link.download = safeFilename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    setTimeout(() => {
      setDownloadingUrl(null);
    }, 2500);
  };

  const handleDownloadAll = async (items: MediaItem[]) => {
    if (!items || items.length === 0 || downloadAllProgress) return;
    setDownloadAllProgress(true);

    for (let i = 0; i < items.length; i++) {
      const item = items[i];
      const itemType = item.type === "image" ? "image" : "video";
      const ext = itemType === "image" ? "jpg" : "mp4";
      const filename = `AnyClip-Media-${i + 1}-${Date.now()}.${ext}`;

      triggerDownload(item.downloadUrl, filename, itemType);
      await new Promise((r) => setTimeout(r, 1200));
    }

    setDownloadAllProgress(false);
  };

  const handleFetch = async (e: React.FormEvent) => {
    e.preventDefault();
    const trimmedUrl = url.trim();
    if (!trimmedUrl) {
      setError("Please enter or paste a valid video URL.");
      return;
    }

    // Determine appropriate endpoint
    let targetPlatform = selectedTab !== "all" ? selectedTab : detectedPlatform;

    if (!targetPlatform) {
      if (
        trimmedUrl.includes("instagram.com") ||
        trimmedUrl.includes("instagr.am")
      ) {
        targetPlatform = "instagram";
      } else if (
        trimmedUrl.includes("facebook.com") ||
        trimmedUrl.includes("fb.watch")
      ) {
        targetPlatform = "facebook";
      } else if (
        trimmedUrl.includes("youtube.com") ||
        trimmedUrl.includes("youtu.be")
      ) {
        targetPlatform = "youtube";
      } else {
        setError(
          "Unsupported URL. Please enter a valid Instagram, Facebook, or YouTube link."
        );
        return;
      }
    }

    const endpoint = `/api/download/${targetPlatform}`;

    setLoading(true);
    setError("");
    setVideoData(null);

    try {
      const res = await fetch(`${API_BASE}${endpoint}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ url: trimmedUrl }),
      });

      const data = await res.json();

      if (!res.ok || !data.success) {
        throw new Error(
          data.error ||
            "Failed to fetch video. Please check the URL or ensure the post/account is public."
        );
      }

      setVideoData({
        title: data.title || "Downloaded Video",
        thumbnail: data.thumbnail || "",
        downloadUrl: data.downloadUrl || data.hd_url || data.sd_url,
        videoUrl: data.videoUrl,
        audioUrl: data.audioUrl,
        photoUrl: data.photoUrl,
        hdUrl: data.hdUrl || data.hd_url,
        sdUrl: data.sdUrl || data.sd_url,
        platform: data.platform || targetPlatform,
        mediaType: data.mediaType || "video",
        items: data.items && data.items.length > 0 ? data.items : undefined,
        author: data.author || "",
      });
    } catch (err: unknown) {
      setError(
        err instanceof Error ? err.message : "An unexpected error occurred."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full max-w-4xl mx-auto">
      {/* Platform Selector Pills */}
      <div className="flex justify-center mb-5">
        <div className="inline-flex items-center gap-1.5 p-1.5 bg-white/90 backdrop-blur-xl rounded-2xl border border-slate-200/80 shadow-md">
          <button
            type="button"
            onClick={() => setSelectedTab("all")}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all cursor-pointer ${
              selectedTab === "all"
                ? "bg-indigo-600 text-white shadow-sm"
                : "text-slate-600 hover:text-slate-900 hover:bg-slate-100"
            }`}
          >
            <Globe className="w-4 h-4" />
            <span>Universal</span>
          </button>

          <button
            type="button"
            onClick={() => setSelectedTab("instagram")}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all cursor-pointer ${
              selectedTab === "instagram"
                ? "bg-gradient-to-r from-pink-500 to-purple-600 text-white shadow-sm"
                : "text-slate-600 hover:text-slate-900 hover:bg-slate-100"
            }`}
          >
            <FaInstagram className="w-4 h-4" />
            <span>Instagram</span>
          </button>

          <button
            type="button"
            onClick={() => setSelectedTab("facebook")}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all cursor-pointer ${
              selectedTab === "facebook"
                ? "bg-blue-600 text-white shadow-sm"
                : "text-slate-600 hover:text-slate-900 hover:bg-slate-100"
            }`}
          >
            <FaFacebook className="w-4 h-4" />
            <span>Facebook</span>
          </button>

          <button
            type="button"
            onClick={() => setSelectedTab("youtube")}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all cursor-pointer ${
              selectedTab === "youtube"
                ? "bg-red-600 text-white shadow-sm"
                : "text-slate-600 hover:text-slate-900 hover:bg-slate-100"
            }`}
          >
            <FaYoutube className="w-4 h-4" />
            <span>YouTube</span>
          </button>
        </div>
      </div>

      {/* Main Form Box */}
      <div className="bg-white/95 backdrop-blur-xl rounded-3xl shadow-2xl shadow-indigo-100/70 border border-slate-200/80 p-5 sm:p-8 transition-all">
        {/* Detection Badge */}
        {selectedTab === "all" && detectedPlatform && (
          <div className="mb-3 flex items-center gap-2 text-xs font-semibold text-slate-500 animate-in fade-in">
            <Sparkles className="w-3.5 h-3.5 text-indigo-500" />
            <span>
              Detected Platform:{" "}
              <strong className="capitalize text-indigo-600 font-bold">
                {detectedPlatform}
              </strong>
            </span>
          </div>
        )}

        <form onSubmit={handleFetch} className="flex flex-col sm:flex-row gap-3">
          <div className="relative flex-grow">
            <input
              type="url"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              placeholder={placeholderText}
              className="w-full pl-4 pr-24 py-4 rounded-2xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-indigo-500/40 focus:border-indigo-500 bg-slate-50/70 hover:bg-white focus:bg-white transition-all text-slate-800 text-sm sm:text-base placeholder:text-slate-400 shadow-inner"
              required
            />

            <div className="absolute right-2 top-1/2 -translate-y-1/2 flex items-center gap-1">
              {url ? (
                <button
                  type="button"
                  onClick={handleClear}
                  aria-label="Clear input"
                  className="p-1.5 text-slate-400 hover:text-slate-600 rounded-lg hover:bg-slate-200/60 transition-colors"
                >
                  <X className="w-4 h-4" />
                </button>
              ) : (
                <button
                  type="button"
                  onClick={handlePaste}
                  title="Paste link from clipboard"
                  className="flex items-center gap-1 px-3 py-1.5 text-xs font-semibold text-slate-600 bg-slate-200/80 hover:bg-slate-200 rounded-xl transition-colors cursor-pointer"
                >
                  {copied ? (
                    <Check className="w-3.5 h-3.5 text-emerald-600" />
                  ) : (
                    <Clipboard className="w-3.5 h-3.5" />
                  )}
                  <span className="hidden sm:inline">
                    {copied ? "Pasted!" : "Paste"}
                  </span>
                </button>
              )}
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 hover:from-indigo-700 hover:to-pink-700 text-white px-8 py-4 rounded-2xl font-bold transition-all duration-200 flex items-center justify-center gap-2 min-w-[160px] shadow-lg shadow-indigo-200/80 disabled:opacity-70 disabled:cursor-not-allowed cursor-pointer active:scale-[0.98]"
          >
            {loading ? (
              <Loader2 className="w-5 h-5 animate-spin" />
            ) : (
              <Download className="w-5 h-5" />
            )}
            <span>{loading ? "Processing..." : "Download"}</span>
          </button>
        </form>

        {/* Error Alert */}
        {error && (
          <div className="mt-5 p-4 bg-rose-50 text-rose-700 rounded-2xl flex items-start gap-3 border border-rose-200 text-sm">
            <AlertCircle className="w-5 h-5 shrink-0 mt-0.5 text-rose-500" />
            <div>
              <p className="font-semibold">{error}</p>
              <p className="text-xs text-rose-600/80 mt-1">
                Make sure the profile or video is public and you pasted the entire URL.
              </p>
            </div>
          </div>
        )}

        {/* Results Box */}
        {videoData && (
          <div className="mt-8 pt-6 border-t border-slate-100 animate-in fade-in slide-in-from-bottom-4 duration-500">
            {videoData.items && videoData.items.length > 1 ? (
              <div>
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 mb-6">
                  <div className="flex items-center gap-2">
                    <span className="p-2 rounded-xl bg-purple-100 text-purple-700">
                      <Layers className="w-5 h-5" />
                    </span>
                    <div>
                      <h3 className="font-bold text-slate-800 text-base sm:text-lg line-clamp-1">
                        {videoData.title}
                      </h3>
                      <p className="text-xs text-slate-500">
                        Found {videoData.items.length} media items in this post
                      </p>
                    </div>
                  </div>

                  <button
                    onClick={() => handleDownloadAll(videoData.items!)}
                    disabled={downloadAllProgress}
                    className="w-full sm:w-auto px-4 py-2.5 bg-purple-600 hover:bg-purple-700 text-white rounded-xl text-xs sm:text-sm font-bold shadow-md shadow-purple-200 transition-all flex items-center justify-center gap-2"
                  >
                    {downloadAllProgress ? (
                      <>
                        <Loader2 className="w-4 h-4 animate-spin" />
                        Downloading All ({videoData.items.length})...
                      </>
                    ) : (
                      <>
                        <Download className="w-4 h-4" />
                        Download All ({videoData.items.length})
                      </>
                    )}
                  </button>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {videoData.items.map((item, idx) => {
                    const isImage = item.type === "image";
                    const isCurrentDownloading =
                      downloadingUrl === item.downloadUrl;

                    return (
                      <div
                        key={idx}
                        className="bg-slate-50 border border-slate-200 rounded-2xl p-4 flex flex-col justify-between hover:shadow-md transition-shadow"
                      >
                        <div className="relative aspect-square w-full rounded-xl overflow-hidden bg-slate-200 mb-3">
                          {/* eslint-disable-next-line @next/next/no-img-element */}
                          <img
                            src={item.thumbnail || item.downloadUrl}
                            alt={`Item #${idx + 1}`}
                            className="w-full h-full object-cover"
                            loading="lazy"
                          />
                          <div className="absolute top-2 left-2 px-2 py-0.5 bg-black/60 backdrop-blur-md rounded-md text-[11px] font-bold text-white flex items-center gap-1">
                            {isImage ? (
                              <>
                                <ImageIcon className="w-3 h-3 text-purple-300" />
                                Photo #{idx + 1}
                              </>
                            ) : (
                              <>
                                <Film className="w-3 h-3 text-pink-300" />
                                Video #{idx + 1}
                              </>
                            )}
                          </div>
                        </div>

                        <button
                          onClick={() =>
                            triggerDownload(
                              item.downloadUrl,
                              `AnyClip-${isImage ? "Photo" : "Video"}-${
                                idx + 1
                              }-${Date.now()}.${isImage ? "jpg" : "mp4"}`,
                              isImage ? "image" : "video"
                            )
                          }
                          disabled={isCurrentDownloading}
                          className={`w-full py-2.5 rounded-xl font-semibold text-xs sm:text-sm text-white flex items-center justify-center gap-2 transition-all cursor-pointer ${
                            isImage
                              ? "bg-purple-600 hover:bg-purple-700"
                              : "bg-indigo-600 hover:bg-indigo-700"
                          }`}
                        >
                          {isCurrentDownloading ? (
                            <>
                              <Loader2 className="w-4 h-4 animate-spin" />
                              Downloading...
                            </>
                          ) : (
                            <>
                              <Download className="w-4 h-4" />
                              Download {isImage ? "Photo" : "Video"} #{idx + 1}
                            </>
                          )}
                        </button>
                      </div>
                    );
                  })}
                </div>
              </div>
            ) : (
              /* Single Media Item Result */
              <div className="bg-slate-50/90 rounded-2xl p-5 border border-slate-200/90 flex flex-col sm:flex-row gap-6 items-center sm:items-start">
                {videoData.thumbnail && (
                  <div className="relative shrink-0 w-full sm:w-52 aspect-[4/5] sm:aspect-square rounded-2xl overflow-hidden shadow-md bg-slate-900">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={videoData.thumbnail}
                      alt={videoData.title}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute top-2.5 left-2.5 px-2 py-0.5 rounded-md bg-black/60 backdrop-blur-md text-[11px] font-bold text-white uppercase tracking-wider flex items-center gap-1">
                      {videoData.mediaType === "photo" ? (
                        <>
                          <ImageIcon className="w-3 h-3 text-purple-400" />
                          Photo HD
                        </>
                      ) : (
                        <>
                          <Film className="w-3 h-3 text-pink-400" />
                          Video HD
                        </>
                      )}
                    </div>
                  </div>
                )}

                <div className="flex-grow flex flex-col justify-between w-full h-full space-y-4">
                  <div>
                    {videoData.author && (
                      <p className="text-xs font-semibold text-indigo-600 uppercase tracking-wider mb-1">
                        @{videoData.author}
                      </p>
                    )}
                    <h3 className="font-bold text-slate-800 text-base sm:text-lg line-clamp-2">
                      {videoData.title}
                    </h3>
                  </div>

                  <div className="space-y-2.5 w-full pt-2">
                    {videoData.platform === "facebook" &&
                    (videoData.hdUrl || videoData.sdUrl) ? (
                      <div className="flex flex-col sm:flex-row gap-2 w-full">
                        {videoData.hdUrl && (
                          <button
                            onClick={() =>
                              triggerDownload(
                                videoData.hdUrl!,
                                `AnyClip-Facebook-HD-${Date.now()}.mp4`,
                                "video"
                              )
                            }
                            disabled={downloadingUrl === videoData.hdUrl}
                            className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-xl font-bold transition-all flex items-center justify-center gap-2 cursor-pointer"
                          >
                            {downloadingUrl === videoData.hdUrl ? (
                              <Loader2 className="w-4 h-4 animate-spin" />
                            ) : (
                              <Download className="w-4 h-4" />
                            )}
                            Download HD (1080p)
                          </button>
                        )}
                        {videoData.sdUrl && (
                          <button
                            onClick={() =>
                              triggerDownload(
                                videoData.sdUrl!,
                                `AnyClip-Facebook-SD-${Date.now()}.mp4`,
                                "video"
                              )
                            }
                            disabled={downloadingUrl === videoData.sdUrl}
                            className="w-full bg-slate-600 hover:bg-slate-700 text-white py-3 rounded-xl font-bold transition-all flex items-center justify-center gap-2 cursor-pointer"
                          >
                            {downloadingUrl === videoData.sdUrl ? (
                              <Loader2 className="w-4 h-4 animate-spin" />
                            ) : (
                              <Download className="w-4 h-4" />
                            )}
                            Download SD
                          </button>
                        )}
                      </div>
                    ) : (
                      <button
                        onClick={() =>
                          triggerDownload(
                            videoData.downloadUrl ||
                              videoData.videoUrl ||
                              videoData.photoUrl!,
                            `AnyClip-${Date.now()}.${
                              videoData.mediaType === "photo" ? "jpg" : "mp4"
                            }`,
                            videoData.mediaType === "photo" ? "image" : "video"
                          )
                        }
                        disabled={
                          downloadingUrl ===
                          (videoData.downloadUrl ||
                            videoData.videoUrl ||
                            videoData.photoUrl)
                        }
                        className="w-full bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 hover:from-indigo-700 hover:to-pink-700 text-white py-3.5 rounded-xl font-bold transition-all flex items-center justify-center gap-2 shadow-lg shadow-indigo-200 cursor-pointer"
                      >
                        {downloadingUrl ===
                        (videoData.downloadUrl ||
                          videoData.videoUrl ||
                          videoData.photoUrl) ? (
                          <>
                            <Loader2 className="w-4 h-4 animate-spin" />
                            Downloading Media...
                          </>
                        ) : (
                          <>
                            <Download className="w-4 h-4" />
                            Download {videoData.mediaType === "photo" ? "Photo (HD)" : "Video (1080p HD)"}
                          </>
                        )}
                      </button>
                    )}
                  </div>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
