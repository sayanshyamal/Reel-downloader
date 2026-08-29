"use client";

import React from "react";
import { Film, Image as ImageIcon, Clock, Video, Music } from "lucide-react";

export type InstagramTabType = "reel" | "story" | "photo" | "video" | "audio";

interface TabItem {
  id: InstagramTabType;
  label: string;
  badge?: string;
  icon: React.ComponentType<{ className?: string }>;
  gradient: string;
  activeBg: string;
  borderActive: string;
}

const TABS: TabItem[] = [
  {
    id: "reel",
    label: "Reels",
    badge: "1080p",
    icon: Film,
    gradient: "from-pink-500 to-rose-500",
    activeBg: "bg-pink-50 text-pink-700",
    borderActive: "border-pink-300 shadow-pink-100",
  },
  {
    id: "story",
    label: "Story",
    badge: "Anonymous",
    icon: Clock,
    gradient: "from-amber-500 to-orange-500",
    activeBg: "bg-amber-50 text-amber-700",
    borderActive: "border-amber-300 shadow-amber-100",
  },
  {
    id: "photo",
    label: "Photo",
    badge: "Original HD",
    icon: ImageIcon,
    gradient: "from-purple-500 to-indigo-500",
    activeBg: "bg-purple-50 text-purple-700",
    borderActive: "border-purple-300 shadow-purple-100",
  },
  {
    id: "video",
    label: "Video",
    icon: Video,
    gradient: "from-blue-500 to-cyan-500",
    activeBg: "bg-blue-50 text-blue-700",
    borderActive: "border-blue-300 shadow-blue-100",
  },
  {
    id: "audio",
    label: "Audio",
    badge: "MP3",
    icon: Music,
    gradient: "from-emerald-500 to-teal-500",
    activeBg: "bg-emerald-50 text-emerald-700",
    borderActive: "border-emerald-300 shadow-emerald-100",
  },
];

interface InstagramTypeTabsProps {
  activeTab: InstagramTabType;
  onTabChange: (tab: InstagramTabType) => void;
  className?: string;
}

export default function InstagramTypeTabs({
  activeTab,
  onTabChange,
  className = "",
}: InstagramTypeTabsProps) {
  return (
    <div className={`w-full flex justify-center ${className}`}>
      <div className="inline-flex items-center gap-1.5 p-1.5 bg-white/85 backdrop-blur-xl rounded-2xl border border-slate-200/80 shadow-lg shadow-slate-100/60 max-w-full overflow-x-auto no-scrollbar">
        {TABS.map((tab) => {
          const isActive = activeTab === tab.id;
          const Icon = tab.icon;

          return (
            <button
              key={tab.id}
              onClick={() => onTabChange(tab.id)}
              type="button"
              className={`relative flex items-center gap-2 px-3.5 sm:px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all duration-200 whitespace-nowrap cursor-pointer select-none ${
                isActive
                  ? `${tab.activeBg} border ${tab.borderActive} shadow-sm scale-[1.02]`
                  : "text-slate-600 hover:text-slate-900 hover:bg-slate-100/70 border border-transparent"
              }`}
            >
              <Icon
                className={`w-4 h-4 transition-transform duration-200 ${
                  isActive ? "scale-110" : ""
                }`}
              />
              <span>{tab.label}</span>
              {tab.badge && (
                <span
                  className={`hidden sm:inline-block px-1.5 py-0.5 text-[10px] font-bold rounded-full uppercase tracking-wider ${
                    isActive
                      ? "bg-white/80 text-current shadow-xs"
                      : "bg-slate-200/70 text-slate-600"
                  }`}
                >
                  {tab.badge}
                </span>
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
}
