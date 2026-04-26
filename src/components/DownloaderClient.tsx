"use client";

import { useState } from "react";
import { Download, Loader2, AlertCircle } from "lucide-react";

interface DownloaderClientProps {
  endpoint: string;
  placeholder: string;
}

interface VideoData {
  title: string;
  thumbnail: string;
  downloadUrl: string;
  hdUrl?: string;
  sdUrl?: string;
  platform?: string;
}

const API_BASE = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";

export default function DownloaderClient({ endpoint, placeholder }: DownloaderClientProps) {
  const [url, setUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [videoData, setVideoData] = useState<VideoData | null>(null);
  const [downloadingFile, setDownloadingFile] = useState(false);

  const downloadFile = (fileUrl: string) => {
    if (!fileUrl || downloadingFile) return;

    setDownloadingFile(true);
    const proxyUrl = `/api/force-download?url=${encodeURIComponent(fileUrl)}`;
    
    // Intercept download via proxy
    window.location.href = proxyUrl;

    setTimeout(() => {
      setDownloadingFile(false);
    }, 2500);
  };

  const handleDownload = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!url) {
      setError("Please enter a valid URL.");
      return;
    }

    setLoading(true);
    setError("");
    setVideoData(null);

    try {
      const res = await fetch(`${API_BASE}${endpoint}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ url }),
      });

      const data = await res.json();

      if (!res.ok || !data.success) {
        throw new Error(data.error || "Failed to fetch video. Please check the URL.");
      }

      setVideoData({
        title: data.title || "Downloaded Video",
        thumbnail: data.thumbnail || "",
        downloadUrl: data.downloadUrl || data.hd_url || data.sd_url,
        hdUrl: data.hdUrl || data.hd_url,
        sdUrl: data.sdUrl || data.sd_url,
        platform: data.platform || (endpoint.includes("facebook") ? "facebook" : ""),
      });
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "An unexpected error occurred.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full max-w-2xl mx-auto bg-white/80 backdrop-blur-md rounded-2xl shadow-xl border border-slate-200 p-6 sm:p-8">
      <form onSubmit={handleDownload} className="flex flex-col sm:flex-row gap-3">
        <input
          type="url"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          placeholder={placeholder}
          className="flex-grow px-4 py-3 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-slate-50 transition-all text-slate-800"
          required
        />
        <button
          type="submit"
          disabled={loading}
          className="bg-indigo-500 hover:bg-indigo-600 disabled:bg-indigo-300 text-white px-6 py-3 rounded-xl font-semibold transition-all flex items-center justify-center gap-2 min-w-[140px]"
        >
          {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : <Download className="w-5 h-5" />}
          {loading ? "Fetching..." : "Fetch Video"}
        </button>
      </form>

      {error && (
        <div className="mt-4 p-4 bg-red-50 text-red-600 rounded-xl flex items-center gap-2 border border-red-200">
          <AlertCircle className="w-5 h-5 shrink-0" />
          <p>{error}</p>
        </div>
      )}

      {videoData && (
        <div className="mt-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
          <div className="bg-slate-50 rounded-xl p-4 border border-slate-200 flex flex-col sm:flex-row gap-6 items-center sm:items-start">
            {videoData.thumbnail && (
              /* eslint-disable-next-line @next/next/no-img-element */
              <img 
                src={videoData.thumbnail} 
                alt={videoData.title} 
                className="w-full sm:w-48 h-auto rounded-lg object-cover shadow-sm"
              />
            )}
            <div className="flex-grow flex flex-col justify-between w-full h-full space-y-4">
              <h3 className="font-semibold text-slate-800 line-clamp-2">
                {videoData.title}
              </h3>
              
              {videoData.platform === "facebook" && (videoData.hdUrl || videoData.sdUrl) ? (
                <div className="flex flex-col sm:flex-row gap-2 w-full">
                  {videoData.hdUrl && (
                    <button
                      onClick={() => downloadFile(videoData.hdUrl!)}
                      disabled={downloadingFile}
                      className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white py-2.5 rounded-lg font-medium transition-colors flex items-center justify-center gap-2"
                    >
                      {downloadingFile ? <Loader2 className="w-4 h-4 animate-spin" /> : <Download className="w-4 h-4" />}
                      Download HD
                    </button>
                  )}
                  {videoData.sdUrl && (
                    <button
                      onClick={() => downloadFile(videoData.sdUrl!)}
                      disabled={downloadingFile}
                      className="w-full bg-slate-600 hover:bg-slate-700 disabled:bg-slate-400 text-white py-2.5 rounded-lg font-medium transition-colors flex items-center justify-center gap-2"
                    >
                      {downloadingFile ? <Loader2 className="w-4 h-4 animate-spin" /> : <Download className="w-4 h-4" />}
                      Download SD
                    </button>
                  )}
                </div>
              ) : (
                <button
                  onClick={() => downloadFile(videoData.downloadUrl)}
                  disabled={downloadingFile}
                  className="w-full bg-pink-500 hover:bg-pink-600 disabled:bg-pink-300 text-white py-2.5 rounded-lg font-medium transition-colors flex items-center justify-center gap-2"
                >
                  {downloadingFile ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      Starting Download...
                    </>
                  ) : (
                    <>
                      <Download className="w-4 h-4" />
                      Download Video
                    </>
                  )}
                </button>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
