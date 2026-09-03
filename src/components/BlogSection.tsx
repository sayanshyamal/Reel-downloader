"use client";

import { useState } from "react";

export type BlogPlatform =
  | "instagram"
  | "instagram-reel"
  | "instagram-video"
  | "instagram-photo"
  | "instagram-story"
  | "instagram-audio"
  | "facebook"
  | "youtube";

interface BlogSectionProps {
  platform: BlogPlatform;
}

interface FAQItem {
  question: string;
  answer: string;
}

const blogContent: Record<
  BlogPlatform,
  {
    heading: string;
    intro: string;
    sections: { title: string; content: string }[];
    faqs: FAQItem[];
  }
> = {
  instagram: {
    heading: "Complete Guide to Downloading Instagram Reels in 1080p HD",
    intro:
      "Instagram Reels are the fastest-growing short video format on the web. AnyClip gives you the easiest way to save your favorite Reels directly to your phone or computer with crystal-clear audio and zero watermarks.",
    sections: [
      {
        title: "How Does the Instagram Reel Downloader Work?",
        content:
          "AnyClip connects directly to Instagram's content delivery servers to retrieve the original 1080p Full HD video stream. Unlike screen recording which degrades audio quality and captures UI overlays, our tool downloads the authentic clean MP4 source video exactly as uploaded by the creator.",
      },
      {
        title: "Download Instagram Reels Without Watermark",
        content:
          "Unlike standard in-app saves or third-party recording apps that slap logos and usernames across your video, AnyClip ensures completely watermark-free downloads. This makes your saved clips ideal for personal archives, presentations, and offline viewing.",
      },
      {
        title: "Fast & Anonymous Reel Downloads",
        content:
          "You do not need to log into an Instagram account or share any personal credentials. AnyClip operates entirely through public links, keeping your personal identity and browsing history 100% confidential.",
      },
      {
        title: "Pro-Tips for Seamless Reel Downloads",
        content:
          "Make sure the Instagram account is public, as private accounts are restricted by Instagram's API. Always copy the full URL from the Share menu, and ensure your device has sufficient storage space before downloading high-definition video files.",
      },
    ],
    faqs: [
      {
        question: "Can I download Instagram Reels in 1080p Full HD?",
        answer:
          "Yes! AnyClip automatically fetches the highest resolution available from Instagram, typically 1080p (1080x1920) for standard Reels.",
      },
      {
        question: "Is the audio included in downloaded Reels?",
        answer:
          "Yes, every downloaded Reel includes its complete original stereo soundtrack, background music, voiceover, and sound effects.",
      },
      {
        question: "Do I need to install any app to download Reels?",
        answer:
          "No software or browser extension is required. AnyClip works directly in mobile Safari, Chrome, Edge, and all modern browsers.",
      },
      {
        question: "Are Reel downloads unlimited?",
        answer:
          "Yes, AnyClip is 100% free with unlimited daily downloads and no throttled speeds.",
      },
    ],
  },
  "instagram-reel": {
    heading: "Instagram Reel Downloader — Save Trending Reels in HD",
    intro:
      "Download trending Instagram Reels with full stereo sound in original resolution. No app or registration needed.",
    sections: [
      {
        title: "Original Quality Retention",
        content:
          "When creators upload Reels, Instagram encodes them in high bitrate MP4. AnyClip extracts this exact stream directly, preserving color accuracy and high frame rates.",
      },
      {
        title: "Compatible With All Operating Systems",
        content:
          "Whether you are on an iPhone running iOS 18, an Android flagship, a Windows PC, or a Mac, AnyClip downloads files directly into your standard downloads folder or camera roll.",
      },
      {
        title: "Privacy and Security Guaranteed",
        content:
          "We never store your search queries, URLs, or downloaded videos on our servers. Processing occurs entirely in transient memory.",
      },
    ],
    faqs: [
      {
        question: "Why did my Reel download without audio?",
        answer:
          "Some Reels use licensed music that Instagram mutes when viewed outside certain countries. For standard Reels, audio is always included in full stereo.",
      },
      {
        question: "Can I download private Reels?",
        answer:
          "No, AnyClip only accesses publicly available content in compliance with privacy guidelines.",
      },
    ],
  },
  "instagram-video": {
    heading: "The Definitive Guide to Downloading Instagram Feed Videos & IGTV",
    intro:
      "From long-form IGTV interviews and tutorials to landscape video posts, AnyClip lets you save full-length Instagram videos in original MP4 quality without duration restrictions.",
    sections: [
      {
        title: "Feed Videos vs. Reels — What is the Difference?",
        content:
          "While Reels are short vertical clips capped at 90 seconds, Instagram feed videos and IGTV broadcasts can span anywhere from a few minutes up to 60 minutes in length. AnyClip handles both short clips and lengthy IGTV videos effortlessly.",
      },
      {
        title: "High-Bitrate MP4 Encoding",
        content:
          "AnyClip preserves the creator's upload bitrate, ensuring sharp text, clear dialogue, and vibrant visual fidelity without re-compression artifacts.",
      },
      {
        title: "Supported Video Formats",
        content:
          "All video posts are downloaded as universal MP4 files encoded with H.264 video and AAC audio, guaranteeing compatibility with all media players (VLC, QuickTime, Windows Media Player) and mobile photo apps.",
      },
      {
        title: "Troubleshooting Instagram Video Downloads",
        content:
          "If a video fails to download, verify that the link belongs to a public profile and that the post has not been removed or age-restricted by Instagram.",
      },
    ],
    faqs: [
      {
        question: "Can I download long-form IGTV videos?",
        answer:
          "Yes! AnyClip supports videos of any duration, including 15-minute, 30-minute, and 60-minute IGTV broadcasts.",
      },
      {
        question: "What format are feed videos saved in?",
        answer:
          "All videos are downloaded in standard MP4 format with AAC audio, compatible across phones, tablets, and computers.",
      },
      {
        question: "Why won't a specific video download?",
        answer:
          "Ensure the post is public. If the account is private or the video was deleted, third-party tools cannot access the content.",
      },
      {
        question: "Can I download videos from carousel posts?",
        answer:
          "Yes! If a post contains multiple videos or mixed photos and videos, AnyClip displays each slide with its own download button.",
      },
    ],
  },
  "instagram-photo": {
    heading: "Complete Guide to Downloading Instagram Photos & Carousel Albums",
    intro:
      "Save single photos, multi-image carousel albums, and high-resolution Instagram pictures in their authentic, uncompressed JPEG resolution.",
    sections: [
      {
        title: "Original Resolution Image Extraction",
        content:
          "Instagram stores multiple resolutions of every uploaded photo up to 1080x1350 pixels. While the standard app might show a compressed version, AnyClip extracts the maximum resolution master file directly from Instagram's image CDN.",
      },
      {
        title: "Multi-Photo Carousel Album Downloads",
        content:
          "Instagram allows up to 10 or 20 photos in a single carousel album post. AnyClip automatically detects every photo and video slide, presenting you with individual download buttons as well as a one-click 'Download All' button to save the entire collection.",
      },
      {
        title: "No Loss of Image Quality",
        content:
          "Unlike screenshots which capture phone status bars, battery icons, and suffer severe downsampling, AnyClip saves the exact file sent by Instagram's servers with full EXIF color profiling intact.",
      },
      {
        title: "Download Instagram Profile Pictures (DP)",
        content:
          "You can also use AnyClip to retrieve higher-resolution versions of public profile pictures that are otherwise tiny and unclickable within the Instagram mobile application.",
      },
    ],
    faqs: [
      {
        question: "Can I download all photos from a carousel at once?",
        answer:
          "Yes! AnyClip features a dedicated 'Download All' button that systematically downloads each image in the album to your device.",
      },
      {
        question: "What image format are photos saved in?",
        answer:
          "Photos are downloaded as high-quality JPG files, ensuring maximum compatibility across all photo viewers and editors.",
      },
      {
        question: "Does AnyClip add any watermarks to photos?",
        answer:
          "Never. All photos are saved completely untouched with zero watermarks or logos.",
      },
      {
        question: "Can I download photos from private profiles?",
        answer:
          "No, AnyClip only accesses photos from public accounts in accordance with privacy rules.",
      },
    ],
  },
  "instagram-story": {
    heading: "The Ultimate Guide to Saving Instagram Stories Anonymously",
    intro:
      "Download public Instagram Stories and permanent Highlights secretly in original HD quality without alerting the story owner or appearing in their viewer list.",
    sections: [
      {
        title: "How Anonymous Story Downloading Works",
        content:
          "When you view a story inside the official Instagram app, your account ID is added to the uploader's 'Seen By' list. AnyClip downloads the media server-to-server without sending user identification, keeping your viewing 100% anonymous.",
      },
      {
        title: "Saving Expiring 24-Hour Stories",
        content:
          "Instagram Stories vanish after 24 hours. AnyClip enables you to archive memorable announcements, recipes, tutorial clips, and behind-the-scenes moments before they disappear forever.",
      },
      {
        title: "Downloading Profile Highlights",
        content:
          "In addition to active 24-hour stories, AnyClip can download public Highlights pinned to creator profiles in full 1080p video or high-res photo quality.",
      },
      {
        title: "Responsible Use & Privacy",
        content:
          "AnyClip only resolves stories from public accounts. We never bypass private account permissions, and we encourage users to respect personal creator privacy.",
      },
    ],
    faqs: [
      {
        question: "Will the creator know I downloaded their Story?",
        answer:
          "No. AnyClip requests the media server-side, meaning your account or IP is never passed to Instagram's viewer metrics. It is completely anonymous.",
      },
      {
        question: "Can I download expired Stories after 24 hours?",
        answer:
          "No. Once a story expires and disappears from Instagram's servers, it cannot be recovered unless the user saved it to their permanent Highlights.",
      },
      {
        question: "What format are downloaded Stories in?",
        answer:
          "Video stories are saved as MP4 files and photo stories are saved as high-resolution JPG files.",
      },
      {
        question: "Can I save Stories from private accounts?",
        answer:
          "No, only stories from publicly accessible profiles can be downloaded.",
      },
    ],
  },
  "instagram-audio": {
    heading: "How to Extract and Download Audio & Music from Instagram Reels",
    intro:
      "Love a trending background song, dialogue, or sound effect in a Reel? AnyClip lets you extract and save the audio track as an MP3 file directly to your phone or PC.",
    sections: [
      {
        title: "Extract Clean Audio from Any Reel",
        content:
          "Instead of screen-recording a Reel and converting it with third-party software, AnyClip extracts the original audio stream directly from the video container, ensuring crisp stereo sound with zero background noise.",
      },
      {
        title: "Save Trending Sounds for Ringtones & Offline Listening",
        content:
          "Easily download viral audio clips, motivating speeches, podcast snippets, or background music to use as phone ringtones, alarm tones, or additions to your offline music library.",
      },
      {
        title: "High-Bitrate Universal MP3 Format",
        content:
          "The extracted audio is provided in universal MP3 format, compatible with Apple Music, Spotify local files, Android music players, and audio editing suites.",
      },
      {
        title: "Fast One-Click Extraction",
        content:
          "Paste any Reel link into AnyClip's Audio Downloader and click 'Extract Audio'. The process takes less than 3 seconds.",
      },
    ],
    faqs: [
      {
        question: "What audio format does AnyClip download?",
        answer:
          "Audio is saved in MP3 format, which is universally supported by all smartphones, computers, and car audio systems.",
      },
      {
        question: "Can I use downloaded Reel audio as my phone ringtone?",
        answer:
          "Yes! Once downloaded, you can set the MP3 file as your phone ringtone, notification sound, or alarm on Android and iOS.",
      },
      {
        question: "Is the audio quality identical to the original Reel?",
        answer:
          "Yes, AnyClip extracts the original audio stream without re-compression, preserving the creator's upload bitrate.",
      },
      {
        question: "Can I extract audio from private Reels?",
        answer:
          "No, the Reel must be from a public account for our server to process the audio stream.",
      },
    ],
  },
  facebook: {
    heading: "The Complete Guide to Downloading Facebook Videos in Full HD",
    intro:
      "Save public Facebook videos, Facebook Watch episodes, and Facebook Reels directly to your phone or computer in 1080p HD quality with zero software installation.",
    sections: [
      {
        title: "How Facebook Video Downloading Works",
        content:
          "Facebook encodes videos into both High Definition (HD 720p/1080p) and Standard Definition (SD). AnyClip parses the public video page and extracts direct CDN links for both qualities, giving you the choice to save maximum quality or preserve mobile data.",
      },
      {
        title: "Downloading Facebook Reels and Watch Videos",
        content:
          "Whether it is a short-form vertical Reel, a viral news clip, a cooking tutorial, or a full-length Facebook Watch episode, AnyClip provides fast, seamless downloads for all public Facebook media types.",
      },
      {
        title: "Public vs. Private Facebook Content",
        content:
          "AnyClip works exclusively with public Facebook posts, pages, and public group videos. Closed group videos, secret groups, and private profile posts are protected and cannot be downloaded.",
      },
      {
        title: "Compatible with fb.watch and Full Facebook URLs",
        content:
          "AnyClip automatically resolves mobile links (m.facebook.com), desktop links (web.facebook.com), and shortened mobile sharing URLs (fb.watch).",
      },
    ],
    faqs: [
      {
        question: "Can I choose between HD and SD video quality?",
        answer:
          "Yes! AnyClip provides separate download buttons for HD (High Definition) and SD (Standard Definition) whenever both streams are available from Facebook.",
      },
      {
        question: "Do I need a Facebook account to download videos?",
        answer:
          "No, you do not need to log into Facebook or possess an account. Just paste the public video link and download.",
      },
      {
        question: "Can I download videos from closed or private Facebook groups?",
        answer:
          "No, videos posted inside private or closed Facebook groups cannot be downloaded for privacy reasons.",
      },
      {
        question: "What format are Facebook videos saved in?",
        answer:
          "Videos are downloaded as MP4 files with integrated AAC audio, playable on all devices.",
      },
    ],
  },
  youtube: {
    heading: "The Ultimate Guide to Downloading YouTube Shorts & Videos in HD",
    intro:
      "Save YouTube Shorts and standard YouTube videos as high-speed MP4 files in up to 1080p Full HD resolution for offline study, travel, and personal viewing.",
    sections: [
      {
        title: "Fast YouTube Shorts Downloads",
        content:
          "YouTube Shorts have revolutionized vertical video. AnyClip lets you save Shorts directly to your camera roll without watermarks, perfect for offline viewing during flights or commutes.",
      },
      {
        title: "Full-Length Video Support",
        content:
          "In addition to Shorts, AnyClip supports regular YouTube videos, educational lectures, open-source tutorials, and creative commons documentaries in sharp 1080p HD MP4 format.",
      },
      {
        title: "Supports All YouTube Link Formats",
        content:
          "AnyClip seamlessly parses standard youtube.com/watch URLs, shortened youtu.be links, and youtube.com/shorts URLs with zero manual formatting needed.",
      },
      {
        title: "Respecting Creators and Fair Use",
        content:
          "AnyClip is intended strictly for personal offline backup of publicly accessible content. Please respect copyright laws and never re-upload or monetize downloaded content without permission.",
      },
    ],
    faqs: [
      {
        question: "Can I download YouTube Shorts in vertical 1080p?",
        answer:
          "Yes! AnyClip downloads YouTube Shorts in their original vertical format (9:16 aspect ratio) in Full HD.",
      },
      {
        question: "What format are YouTube videos saved in?",
        answer:
          "Videos are downloaded as universal MP4 files with embedded stereo audio.",
      },
      {
        question: "Do I need to install software or apps?",
        answer:
          "No. AnyClip works directly in your web browser with no third-party extensions or desktop software required.",
      },
      {
        question: "Why is a specific YouTube video unavailable?",
        answer:
          "Videos that are private, age-restricted, or country-blocked by the uploader cannot be resolved by third-party downloaders.",
      },
    ],
  },
};

function FAQAccordion({ faqs }: { faqs: FAQItem[] }) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  return (
    <div className="space-y-3">
      {faqs.map((faq, index) => (
        <div
          key={index}
          className="border border-slate-200 rounded-2xl overflow-hidden bg-white hover:border-slate-300 transition-colors"
        >
          <button
            onClick={() => setOpenIndex(openIndex === index ? null : index)}
            className="w-full px-6 py-4 text-left flex items-center justify-between gap-4 cursor-pointer"
            aria-expanded={openIndex === index}
          >
            <span className="font-semibold text-slate-800 text-sm md:text-base">
              {faq.question}
            </span>
            <svg
              className={`w-5 h-5 text-slate-400 shrink-0 transition-transform duration-200 ${
                openIndex === index ? "rotate-180" : ""
              }`}
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M19 9l-7 7-7-7"
              />
            </svg>
          </button>
          {openIndex === index && (
            <div className="px-6 pb-4">
              <p className="text-slate-600 text-sm leading-relaxed">
                {faq.answer}
              </p>
            </div>
          )}
        </div>
      ))}
    </div>
  );
}

export default function BlogSection({ platform }: BlogSectionProps) {
  const data = blogContent[platform] || blogContent.instagram;

  return (
    <section
      className="w-full py-16 md:py-20 bg-slate-50 border-t border-slate-200"
      id="blog"
    >
      <div className="container mx-auto px-4 max-w-4xl">
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-indigo-50 text-indigo-600 text-sm font-medium mb-4 border border-indigo-100">
            <svg
              className="w-4 h-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
              />
            </svg>
            Comprehensive Guide &amp; FAQ
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
            {data.heading}
          </h2>
          <p className="text-slate-600 max-w-2xl mx-auto text-base sm:text-lg leading-relaxed">
            {data.intro}
          </p>
        </div>

        <div className="space-y-6 mb-16">
          {data.sections.map((section, index) => (
            <article
              key={index}
              className="bg-white rounded-2xl border border-slate-200 p-6 md:p-8 shadow-xs hover:shadow-md transition-shadow"
            >
              <h3 className="text-xl font-bold text-slate-900 mb-3 flex items-start gap-3">
                <span className="bg-indigo-100 text-indigo-600 w-8 h-8 rounded-lg flex items-center justify-center text-sm font-bold shrink-0 mt-0.5">
                  {index + 1}
                </span>
                {section.title}
              </h3>
              <p className="text-slate-600 leading-relaxed pl-11 text-sm sm:text-base">
                {section.content}
              </p>
            </article>
          ))}
        </div>

        <div>
          <h2 className="text-2xl font-bold text-slate-900 mb-6 text-center">
            Frequently Asked Questions
          </h2>
          <FAQAccordion faqs={data.faqs} />
        </div>
      </div>
    </section>
  );
}
