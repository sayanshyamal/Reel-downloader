"use client";

import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import InstagramTypeTabs, { InstagramTabType } from "./InstagramTypeTabs";
import DownloaderClient from "./DownloaderClient";
import HowToDownload from "./HowToDownload";
import BlogSection from "./BlogSection";
import { Film, Clock, Image as ImageIcon, Video, Music, Sparkles } from "lucide-react";

interface TabMeta {
  badge: string;
  titlePrefix: string;
  titleHighlight: string;
  titleSuffix: string;
  subtitle: string;
  placeholder: string;
  color: string;
}

const TAB_CONFIGS: Record<InstagramTabType, TabMeta> = {
  reel: {
    badge: "⚡ High Quality Reel Saver",
    titlePrefix: "Instagram",
    titleHighlight: "Reels",
    titleSuffix: "Downloader",
    subtitle:
      "Download high-quality Instagram Reels videos in 1080p Full HD with sound. Fast, free, and watermark-free.",
    placeholder:
      "Paste Instagram Reel link (e.g., https://www.instagram.com/reel/C8x...)",
    color: "pink",
  },
  story: {
    badge: "⏱️ Anonymous Story Saver",
    titlePrefix: "Instagram",
    titleHighlight: "Story",
    titleSuffix: "Downloader",
    subtitle:
      "Save Instagram Stories and Highlights in HD quality anonymously without leaving any trace.",
    placeholder:
      "Paste Instagram Story link (e.g., https://www.instagram.com/stories/username/...)",
    color: "amber",
  },
  photo: {
    badge: "📸 Original Resolution Image Saver",
    titlePrefix: "Instagram",
    titleHighlight: "Photo",
    titleSuffix: "Downloader",
    subtitle:
      "Download single photos and multi-photo carousel albums in their original high resolution JPEG/PNG format.",
    placeholder:
      "Paste Instagram Photo or Carousel link (e.g., https://www.instagram.com/p/C9y...)",
    color: "purple",
  },
  video: {
    badge: "🎬 Feed & IGTV Video Saver",
    titlePrefix: "Instagram",
    titleHighlight: "Video",
    titleSuffix: "Downloader",
    subtitle:
      "Download any Instagram post video, IGTV, or feed clip directly to your gallery in MP4 format.",
    placeholder:
      "Paste Instagram Video link (e.g., https://www.instagram.com/p/... or /tv/...)",
    color: "blue",
  },
  audio: {
    badge: "🎵 Trending Reel Audio Saver",
    titlePrefix: "Instagram",
    titleHighlight: "Audio",
    titleSuffix: "Downloader",
    subtitle:
      "Extract and download original background music, songs, and voice tracks from Instagram Reels in MP3 format.",
    placeholder:
      "Paste Instagram Reel or Audio link (e.g., https://www.instagram.com/reel/...)",
    color: "emerald",
  },
};

interface InstagramDownloaderViewProps {
  defaultTab?: InstagramTabType;
}

export default function InstagramDownloaderView({
  defaultTab,
}: InstagramDownloaderViewProps = {}) {
  const searchParams = useSearchParams();
  const initialType =
    (searchParams.get("type") as InstagramTabType) || defaultTab || "reel";
  const [activeTab, setActiveTab] = useState<InstagramTabType>(
    TAB_CONFIGS[initialType] ? initialType : "reel"
  );

  useEffect(() => {
    const typeParam = searchParams.get("type") as InstagramTabType;
    if (typeParam && TAB_CONFIGS[typeParam]) {
      setActiveTab(typeParam);
    }
  }, [searchParams]);

  const currentConfig = TAB_CONFIGS[activeTab] || TAB_CONFIGS.reel;

  return (
    <div className="flex flex-col items-center w-full" id="top">
      {/* Hero Section */}
      <section className="w-full pt-8 pb-16 md:pt-12 md:pb-24 bg-gradient-to-b from-pink-50/70 via-purple-50/20 to-white relative overflow-hidden">
        {/* Background glow decorations */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-[420px] bg-gradient-to-tr from-pink-400/10 via-purple-400/10 to-amber-300/10 blur-[100px] rounded-full pointer-events-none -z-0" />

        <div className="container mx-auto px-4 max-w-4xl relative z-10">
          {/* Top marked section: Media Type Selector Tabs */}
          <div className="mb-8 flex flex-col items-center">
            <InstagramTypeTabs
              activeTab={activeTab}
              onTabChange={(tab) => {
                setActiveTab(tab);
                // Optionally update URL query param shallowly
                const url = new URL(window.location.href);
                url.searchParams.set("type", tab);
                window.history.replaceState({}, "", url.toString());
              }}
            />
          </div>

          {/* Dynamic Headline & Info */}
          <div className="text-center mb-8">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/90 shadow-xs border border-pink-200/80 text-xs sm:text-sm font-semibold text-slate-700 mb-5 animate-in fade-in duration-300">
              <Sparkles className="w-4 h-4 text-pink-500" />
              <span>{currentConfig.badge}</span>
            </div>

            <h1 className="text-4xl sm:text-5xl md:text-6xl font-black mb-4 text-slate-900 tracking-tight">
              {currentConfig.titlePrefix}{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 via-pink-500 to-purple-600">
                {currentConfig.titleHighlight}
              </span>{" "}
              {currentConfig.titleSuffix}
            </h1>

            <p className="text-base sm:text-lg text-slate-600 max-w-xl mx-auto leading-relaxed">
              {currentConfig.subtitle}
            </p>
          </div>

          {/* Downloader Form */}
          <DownloaderClient
            key={activeTab}
            endpoint="/api/download/instagram"
            placeholder={currentConfig.placeholder}
            selectedTab={activeTab}
            accentColor={currentConfig.color}
          />
        </div>
      </section>

      {/* How to Download Section */}
      <HowToDownload platform="instagram" />

      {/* Blog Section */}
      <BlogSection platform="instagram" />
    </div>
  );
}
