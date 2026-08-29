"use client";

import { useState } from "react";
import {
  Download,
  Loader2,
  AlertCircle,
  Clipboard,
  X,
  Check,
  Film,
  Image as ImageIcon,
  Music,
  Layers,
  Volume2,
} from "lucide-react";

interface MediaItem {
  type: "video" | "image" | "audio";
  downloadUrl: string;
  thumbnail?: string;
  dimensions?: {
    height?: number;
    width?: number;
  };
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

interface DownloaderClientProps {
  endpoint: string;
  placeholder: string;
  selectedTab?: string;
  buttonText?: string;
  accentColor?: string;
}

const API_BASE = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";

export default function DownloaderClient({
  endpoint,
  placeholder,
  selectedTab = "reel",
  buttonText,
  accentColor = "indigo",
}: DownloaderClientProps) {
  const [url, setUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [videoData, setVideoData] = useState<VideoData | null>(null);
  const [downloadingUrl, setDownloadingUrl] = useState<string | null>(null);
  const [downloadAllProgress, setDownloadAllProgress] = useState(false);
  const [copied, setCopied] = useState(false);

  const handlePaste = async () => {
    try {
      const text = await navigator.clipboard.readText();
      if (text) {
        setUrl(text.trim());
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      }
    } catch {
      // Clipboard access blocked or not supported
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
      const filename = `AnyClip-${selectedTab || "Media"}-${i + 1}-${Date.now()}.${ext}`;

      triggerDownload(item.downloadUrl, filename, itemType);
      await new Promise((r) => setTimeout(r, 1200));
    }

    setDownloadAllProgress(false);
  };

  const handleFetch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!url || !url.trim()) {
      setError("Please enter or paste a valid link.");
      return;
    }

    setLoading(true);
    setError("");
    setVideoData(null);

    try {
      const res = await fetch(`${API_BASE}${endpoint}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ url: url.trim(), type: selectedTab }),
      });

      const data = await res.json();

      if (!res.ok || !data.success) {
        throw new Error(
          data.error ||
            "Failed to fetch media. Please check the URL or ensure the account is public."
        );
      }

      setVideoData({
        title: data.title || "Downloaded Media",
        thumbnail: data.thumbnail || "",
        downloadUrl: data.downloadUrl || data.hd_url || data.sd_url,
        videoUrl: data.videoUrl,
        audioUrl: data.audioUrl,
        photoUrl: data.photoUrl,
        hdUrl: data.hdUrl || data.hd_url,
        sdUrl: data.sdUrl || data.sd_url,
        platform:
          data.platform || (endpoint.includes("facebook") ? "facebook" : "instagram"),
        mediaType:
          selectedTab === "audio"
            ? "audio"
            : selectedTab === "photo" && data.mediaType !== "carousel"
            ? "photo"
            : data.mediaType || "video",
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

  // Dynamic button label & styling
  const submitLabel =
    buttonText ||
    (selectedTab === "photo"
      ? "Fetch Photo"
      : selectedTab === "story"
      ? "Fetch Story"
      : selectedTab === "audio"
      ? "Extract Audio"
      : "Download");

  const getButtonBg = () => {
    switch (selectedTab) {
      case "photo":
        return "bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 shadow-purple-200";
      case "story":
        return "bg-gradient-to-r from-amber-500 to-orange-600 hover:from-amber-600 hover:to-orange-700 shadow-orange-200";
      case "audio":
        return "bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 shadow-emerald-200";
      case "reel":
      default:
        if (accentColor === "pink" || endpoint.includes("instagram")) {
          return "bg-gradient-to-r from-pink-500 via-rose-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 shadow-pink-200";
        }
        if (accentColor === "blue" || endpoint.includes("facebook")) {
          return "bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 shadow-blue-200";
        }
        if (accentColor === "red" || endpoint.includes("youtube")) {
          return "bg-gradient-to-r from-red-600 to-rose-600 hover:from-red-700 hover:to-rose-700 shadow-red-200";
        }
        return "bg-indigo-600 hover:bg-indigo-700 shadow-indigo-200";
    }
  };

  return (
    <div className="w-full max-w-3xl mx-auto bg-white/90 backdrop-blur-xl rounded-3xl shadow-2xl shadow-slate-200/60 border border-slate-200/80 p-5 sm:p-8 transition-all">
      <form onSubmit={handleFetch} className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-grow">
          <input
            type="url"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            placeholder={placeholder}
            className="w-full pl-4 pr-20 py-3.5 rounded-2xl border border-slate-300/90 focus:outline-none focus:ring-2 focus:ring-pink-500/50 focus:border-pink-500 bg-slate-50/80 hover:bg-white focus:bg-white transition-all text-slate-800 text-sm sm:text-base placeholder:text-slate-400 shadow-inner"
            required
          />

          <div className="absolute right-2 top-1/2 -translate-y-1/2 flex items-center gap-1">
            {url ? (
              <button
                type="button"
                onClick={handleClear}
                aria-label="Clear link"
                className="p-1.5 text-slate-400 hover:text-slate-600 rounded-lg hover:bg-slate-200/60 transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            ) : (
              <button
                type="button"
                onClick={handlePaste}
                title="Paste from clipboard"
                className="flex items-center gap-1 px-2.5 py-1 text-xs font-semibold text-slate-600 bg-slate-200/70 hover:bg-slate-200 rounded-lg transition-colors cursor-pointer"
              >
                {copied ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Clipboard className="w-3.5 h-3.5" />}
                <span className="hidden sm:inline">{copied ? "Pasted!" : "Paste"}</span>
              </button>
            )}
          </div>
        </div>

        <button
          type="submit"
          disabled={loading}
          className={`text-white px-7 py-3.5 rounded-2xl font-bold transition-all duration-200 flex items-center justify-center gap-2 min-w-[150px] shadow-lg disabled:opacity-70 disabled:cursor-not-allowed cursor-pointer select-none active:scale-[0.98] ${getButtonBg()}`}
        >
          {loading ? (
            <Loader2 className="w-5 h-5 animate-spin" />
          ) : (
            <Download className="w-5 h-5" />
          )}
          <span>{loading ? "Fetching..." : submitLabel}</span>
        </button>
      </form>

      {error && (
        <div className="mt-5 p-4 bg-rose-50 text-rose-700 rounded-2xl flex items-start gap-3 border border-rose-200 text-sm">
          <AlertCircle className="w-5 h-5 shrink-0 mt-0.5 text-rose-500" />
          <div>
            <p className="font-semibold">{error}</p>
            <p className="text-xs text-rose-600/80 mt-1">
              Tip: Ensure the profile is public and you copied the entire shareable URL.
            </p>
          </div>
        </div>
      )}

      {videoData && (
        <div className="mt-8 pt-6 border-t border-slate-100 animate-in fade-in slide-in-from-bottom-4 duration-500">
          {/* CAROUSEL / MULTIPLE ITEMS (except when specifically requesting Audio) */}
          {selectedTab !== "audio" && videoData.items && videoData.items.length > 1 ? (
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

              {/* Items Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {videoData.items.map((item, idx) => {
                  const isImage = item.type === "image";
                  const isCurrentDownloading = downloadingUrl === item.downloadUrl;

                  return (
                    <div
                      key={idx}
                      className="bg-slate-50/90 border border-slate-200 rounded-2xl p-4 flex flex-col justify-between hover:shadow-md transition-shadow"
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
                            `AnyClip-Instagram-${isImage ? "Photo" : "Video"}-${idx + 1}-${Date.now()}.${isImage ? "jpg" : "mp4"}`,
                            isImage ? "image" : "video"
                          )
                        }
                        disabled={isCurrentDownloading}
                        className={`w-full py-2.5 rounded-xl font-semibold text-xs sm:text-sm text-white flex items-center justify-center gap-2 transition-all cursor-pointer ${
                          isImage
                            ? "bg-purple-600 hover:bg-purple-700"
                            : "bg-pink-600 hover:bg-pink-700"
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
            /* SINGLE ITEM (Photo, Reel, Story, or Audio) */
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
                    {selectedTab === "audio" || videoData.mediaType === "audio" ? (
                      <>
                        <Music className="w-3 h-3 text-emerald-400" />
                        Audio Track
                      </>
                    ) : selectedTab === "photo" || videoData.mediaType === "photo" ? (
                      <>
                        <ImageIcon className="w-3 h-3 text-purple-400" />
                        Photo HD
                      </>
                    ) : selectedTab === "story" || videoData.mediaType === "story" ? (
                      <>
                        <Film className="w-3 h-3 text-amber-400" />
                        Story
                      </>
                    ) : (
                      <>
                        <Film className="w-3 h-3 text-pink-400" />
                        Reel 1080p
                      </>
                    )}
                  </div>
                </div>
              )}

              <div className="flex-grow flex flex-col justify-between w-full h-full space-y-4">
                <div>
                  {videoData.author && (
                    <p className="text-xs font-semibold text-pink-600 uppercase tracking-wider mb-1">
                      @{videoData.author}
                    </p>
                  )}
                  <h3 className="font-bold text-slate-800 text-base sm:text-lg line-clamp-2">
                    {videoData.title}
                  </h3>
                </div>

                <div className="space-y-2.5 w-full pt-2">
                  {/* AUDIO DOWNLOAD TAB */}
                  {selectedTab === "audio" || videoData.mediaType === "audio" ? (
                    <div className="space-y-3 w-full">
                      <div className="p-3 bg-emerald-50 rounded-xl border border-emerald-200 flex items-center gap-3">
                        <div className="p-2 bg-emerald-500 text-white rounded-lg shrink-0">
                          <Volume2 className="w-5 h-5" />
                        </div>
                        <div className="flex-grow min-w-0">
                          <p className="text-xs font-bold text-emerald-900 truncate">
                            Audio Track Extracted (MP3 / High Quality)
                          </p>
                          <p className="text-[11px] text-emerald-700">
                            Ready for direct download & offline listening
                          </p>
                        </div>
                      </div>

                      <button
                        onClick={() =>
                          triggerDownload(
                            videoData.audioUrl || videoData.downloadUrl,
                            `AnyClip-Instagram-Audio-${Date.now()}.mp3`,
                            "audio"
                          )
                        }
                        disabled={downloadingUrl === (videoData.audioUrl || videoData.downloadUrl)}
                        className="w-full bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white py-3.5 rounded-xl font-bold transition-all flex items-center justify-center gap-2 shadow-lg shadow-emerald-200 cursor-pointer"
                      >
                        {downloadingUrl === (videoData.audioUrl || videoData.downloadUrl) ? (
                          <>
                            <Loader2 className="w-4 h-4 animate-spin" />
                            Downloading Audio (MP3)...
                          </>
                        ) : (
                          <>
                            <Music className="w-4 h-4" />
                            Download Audio (MP3)
                          </>
                        )}
                      </button>
                    </div>
                  ) : videoData.platform === "facebook" && (videoData.hdUrl || videoData.sdUrl) ? (
                    /* Facebook HD/SD */
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
                          className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white py-3 rounded-xl font-bold transition-all flex items-center justify-center gap-2 cursor-pointer"
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
                          className="w-full bg-slate-600 hover:bg-slate-700 disabled:bg-slate-400 text-white py-3 rounded-xl font-bold transition-all flex items-center justify-center gap-2 cursor-pointer"
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
                  ) : videoData.platform === "youtube" ? (
                    /* YouTube */
                    <button
                      onClick={() =>
                        triggerDownload(
                          videoData.downloadUrl,
                          `AnyClip-YouTube-${Date.now()}.mp4`,
                          "video"
                        )
                      }
                      disabled={downloadingUrl === videoData.downloadUrl}
                      className="w-full bg-red-600 hover:bg-red-700 disabled:bg-red-400 text-white py-3 rounded-xl font-bold transition-all flex items-center justify-center gap-2 shadow-lg shadow-red-200 cursor-pointer"
                    >
                      {downloadingUrl === videoData.downloadUrl ? (
                        <>
                          <Loader2 className="w-4 h-4 animate-spin" />
                          Starting Download...
                        </>
                      ) : (
                        <>
                          <Download className="w-4 h-4" />
                          Download Video (HD)
                        </>
                      )}
                    </button>
                  ) : selectedTab === "photo" || videoData.mediaType === "photo" ? (
                    /* Instagram Photo */
                    <button
                      onClick={() =>
                        triggerDownload(
                          videoData.photoUrl || videoData.downloadUrl,
                          `AnyClip-Instagram-Photo-${Date.now()}.jpg`,
                          "image"
                        )
                      }
                      disabled={downloadingUrl === (videoData.photoUrl || videoData.downloadUrl)}
                      className="w-full bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white py-3.5 rounded-xl font-bold transition-all flex items-center justify-center gap-2 shadow-lg shadow-purple-200 cursor-pointer"
                    >
                      {downloadingUrl === (videoData.photoUrl || videoData.downloadUrl) ? (
                        <>
                          <Loader2 className="w-4 h-4 animate-spin" />
                          Downloading Photo...
                        </>
                      ) : (
                        <>
                          <Download className="w-4 h-4" />
                          Download Photo (HD)
                        </>
                      )}
                    </button>
                  ) : selectedTab === "story" || videoData.mediaType === "story" ? (
                    /* Instagram Story */
                    <button
                      onClick={() =>
                        triggerDownload(
                          videoData.videoUrl || videoData.downloadUrl,
                          `AnyClip-Instagram-Story-${Date.now()}.mp4`,
                          "video"
                        )
                      }
                      disabled={downloadingUrl === (videoData.videoUrl || videoData.downloadUrl)}
                      className="w-full bg-gradient-to-r from-amber-500 to-orange-600 hover:from-amber-600 hover:to-orange-700 text-white py-3.5 rounded-xl font-bold transition-all flex items-center justify-center gap-2 shadow-lg shadow-orange-200 cursor-pointer"
                    >
                      {downloadingUrl === (videoData.videoUrl || videoData.downloadUrl) ? (
                        <>
                          <Loader2 className="w-4 h-4 animate-spin" />
                          Downloading Story...
                        </>
                      ) : (
                        <>
                          <Download className="w-4 h-4" />
                          Download Story (HD)
                        </>
                      )}
                    </button>
                  ) : (
                    /* Instagram Reel / Video */
                    <button
                      onClick={() =>
                        triggerDownload(
                          videoData.videoUrl || videoData.downloadUrl,
                          `AnyClip-Instagram-Reel-${Date.now()}.mp4`,
                          "video"
                        )
                      }
                      disabled={downloadingUrl === (videoData.videoUrl || videoData.downloadUrl)}
                      className="w-full bg-gradient-to-r from-pink-500 via-rose-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 text-white py-3.5 rounded-xl font-bold transition-all flex items-center justify-center gap-2 shadow-lg shadow-pink-200 cursor-pointer"
                    >
                      {downloadingUrl === (videoData.videoUrl || videoData.downloadUrl) ? (
                        <>
                          <Loader2 className="w-4 h-4 animate-spin" />
                          Downloading Reel (1080p)...
                        </>
                      ) : (
                        <>
                          <Download className="w-4 h-4" />
                          Download Reel (1080p HD)
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
  );
}
