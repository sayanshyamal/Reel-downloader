import { Metadata } from "next";
import Link from "next/link";
import UniversalDownloader from "@/components/UniversalDownloader";
import {
  Zap,
  Shield,
  Smartphone,
  CheckCircle,
  Download,
  Copy,
  Sparkles,
  Layers,
  Music,
  Film,
  Image as ImageIcon,
  ArrowRight,
  HelpCircle,
} from "lucide-react";
import { FaInstagram, FaFacebook, FaYoutube } from "react-icons/fa";

export const metadata: Metadata = {
  title: "AnyClip — Free Video Downloader for Instagram, Facebook & YouTube",
  description:
    "Download videos, reels, stories, photos, and audio from Instagram, Facebook, and YouTube in 1080p Full HD. 100% free, fast, no watermark, and no login required.",
  alternates: {
    canonical: "/",
  },
};

export default function Home() {
  const jsonLdWebSite = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "AnyClip",
    url: "https://reels.sayan.studio",
    description:
      "Universal online video downloader for Instagram, Facebook, and YouTube in HD.",
    potentialAction: {
      "@type": "SearchAction",
      target: "https://reels.sayan.studio/?url={search_term_string}",
      "query-input": "required name=search_term_string",
    },
  };

  const jsonLdWebApp = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name: "AnyClip Video Downloader",
    url: "https://reels.sayan.studio",
    applicationCategory: "MultimediaApplication",
    operatingSystem: "All",
    browserRequirements: "Requires JavaScript. Requires HTML5.",
    description:
      "Free multi-platform video downloader for Instagram Reels, Facebook Videos, and YouTube Shorts in original HD quality.",
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "USD",
    },
    featureList: [
      "Instagram Reels, Stories, Photos & Audio Downloader",
      "Facebook Video & Reels Downloader in HD/SD",
      "YouTube Shorts & MP4 Video Downloader",
      "No Watermark or Compression",
      "No Account Registration Required",
      "Works on iOS, Android, PC, and Mac",
    ],
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: "How do I download videos using AnyClip?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Copy the link of the video, Reel, Story, or Short from Instagram, Facebook, or YouTube. Paste the URL into the input field above and click 'Download'. Your media will be prepared for immediate download in highest available quality.",
        },
      },
      {
        "@type": "Question",
        name: "Is AnyClip completely free to use?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Yes, AnyClip is 100% free with no limits on how many videos you can download. There are no subscriptions, hidden fees, or account registrations required.",
        },
      },
      {
        "@type": "Question",
        name: "Do downloaded videos have watermarks?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "No. AnyClip downloads the direct original video stream from the respective platform CDN, so there are no added watermarks, logos, or branding on your saved files.",
        },
      },
      {
        "@type": "Question",
        name: "Can I download videos on iPhone, Android, and PC?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Yes. AnyClip is a web-based utility compatible with all modern browsers including Safari, Chrome, Firefox, and Edge on iOS, Android, macOS, Windows, and Linux.",
        },
      },
      {
        "@type": "Question",
        name: "Can I download content from private profiles?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "No. AnyClip respects user privacy and copyright rules and only resolves publicly accessible media. Content from private accounts, private groups, or restricted profiles cannot be downloaded.",
        },
      },
      {
        "@type": "Question",
        name: "What video resolutions are supported?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "AnyClip fetches the highest resolution provided by the source, ranging from 720p HD up to 1080p Full HD, and even 4K where available on YouTube.",
        },
      },
      {
        "@type": "Question",
        name: "Can I download audio or MP3 tracks from Instagram Reels?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Yes. Use our Instagram Audio Downloader tool or paste the Reel link into AnyClip to extract the audio track as an MP3 file.",
        },
      },
    ],
  };

  const howToSchema = {
    "@context": "https://schema.org",
    "@type": "HowTo",
    name: "How to Download Videos Online from Any Platform",
    description:
      "A quick 3-step guide to download high-definition videos from Instagram, Facebook, and YouTube.",
    step: [
      {
        "@type": "HowToStep",
        position: 1,
        name: "Copy the Video Link",
        text: "Open Instagram, Facebook, or YouTube, locate the video, Reel, or Short you wish to save, tap Share, and select 'Copy Link'.",
      },
      {
        "@type": "HowToStep",
        position: 2,
        name: "Paste URL into AnyClip",
        text: "Navigate to AnyClip (https://reels.sayan.studio) and paste the link into the download search bar.",
      },
      {
        "@type": "HowToStep",
        position: 3,
        name: "Download in HD",
        text: "Click 'Download', select your desired format (HD Video, Audio, or Photo), and save the file directly to your device.",
      },
    ],
  };

  return (
    <div className="flex flex-col items-center w-full">
      {/* JSON-LD Schemas */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(jsonLdWebSite).replace(/</g, "\\u003c"),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(jsonLdWebApp).replace(/</g, "\\u003c"),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(faqSchema).replace(/</g, "\\u003c"),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(howToSchema).replace(/</g, "\\u003c"),
        }}
      />

      {/* Hero Section with Functional Downloader */}
      <section className="w-full pt-12 pb-20 md:pt-16 md:pb-28 bg-gradient-to-b from-indigo-50/70 via-purple-50/30 to-slate-50 relative overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-[520px] bg-gradient-to-tr from-indigo-500/10 via-purple-500/10 to-pink-500/10 blur-[130px] rounded-full pointer-events-none" />

        <div className="container mx-auto px-4 max-w-5xl relative z-10 text-center">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/90 text-indigo-700 text-xs sm:text-sm font-semibold mb-6 border border-indigo-200/80 shadow-xs">
            <Zap className="w-4 h-4 text-indigo-600" />
            <span>Multi-Platform Video Downloader • 100% Free &amp; Unlimited</span>
          </div>

          {/* Main H1 */}
          <h1 className="text-4xl sm:text-6xl md:text-7xl font-black text-slate-900 tracking-tight mb-6">
            Download Any Video <br className="hidden sm:block" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600">
              Instantly in 1080p HD
            </span>
          </h1>

          {/* Subtitle */}
          <p className="text-base sm:text-lg md:text-xl text-slate-600 max-w-3xl mx-auto mb-10 leading-relaxed">
            The fastest all-in-one downloader for <strong>Instagram Reels &amp; Stories</strong>,{" "}
            <strong>Facebook Videos &amp; Watch</strong>, and <strong>YouTube Shorts</strong>. No app installation, no registration, and zero watermarks.
          </p>

          {/* Downloader Form */}
          <UniversalDownloader />

          {/* Feature Highlights beneath Downloader */}
          <div className="mt-8 flex flex-wrap items-center justify-center gap-6 sm:gap-8 text-xs sm:text-sm font-semibold text-slate-600">
            <span className="flex items-center gap-1.5">
              <CheckCircle className="w-4 h-4 text-emerald-500" />
              1080p Full HD
            </span>
            <span className="flex items-center gap-1.5">
              <CheckCircle className="w-4 h-4 text-emerald-500" />
              No Watermarks
            </span>
            <span className="flex items-center gap-1.5">
              <CheckCircle className="w-4 h-4 text-emerald-500" />
              100% Anonymous
            </span>
            <span className="flex items-center gap-1.5">
              <CheckCircle className="w-4 h-4 text-emerald-500" />
              Unlimited Downloads
            </span>
          </div>
        </div>
      </section>

      {/* Step-by-Step "How to Download" Section */}
      <section className="w-full py-16 md:py-24 bg-white border-b border-slate-200">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-100 text-slate-700 text-xs sm:text-sm font-semibold mb-3 border border-slate-200">
              <Sparkles className="w-4 h-4 text-indigo-600" />
              Quick &amp; Simple
            </div>
            <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 tracking-tight mb-4">
              How to Download Videos in 3 Simple Steps
            </h2>
            <p className="text-slate-600 max-w-2xl mx-auto text-base sm:text-lg">
              Follow this effortless guide to save videos, reels, or audio directly to your phone gallery or computer storage.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Step 1 */}
            <div className="bg-slate-50 border border-slate-200 rounded-3xl p-8 hover:shadow-lg transition-all duration-300 flex flex-col items-center text-center group">
              <div className="w-14 h-14 rounded-2xl bg-indigo-600 text-white font-black text-xl flex items-center justify-center mb-6 shadow-md shadow-indigo-200 group-hover:scale-105 transition-transform">
                <Copy className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-3">
                1. Copy the Video Link
              </h3>
              <p className="text-slate-600 text-sm leading-relaxed">
                Open Instagram, Facebook, or YouTube on your phone or browser. Find the video, Reel, Story, or Short you want to save, tap the <strong>Share</strong> icon, and select <strong>&quot;Copy Link&quot;</strong>.
              </p>
            </div>

            {/* Step 2 */}
            <div className="bg-slate-50 border border-slate-200 rounded-3xl p-8 hover:shadow-lg transition-all duration-300 flex flex-col items-center text-center group">
              <div className="w-14 h-14 rounded-2xl bg-purple-600 text-white font-black text-xl flex items-center justify-center mb-6 shadow-md shadow-purple-200 group-hover:scale-105 transition-transform">
                <Layers className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-3">
                2. Paste the URL into AnyClip
              </h3>
              <p className="text-slate-600 text-sm leading-relaxed">
                Return to AnyClip and paste the link into the universal search field at the top of the page. You can use the handy <strong>&quot;Paste&quot;</strong> button or press Ctrl+V / Cmd+V.
              </p>
            </div>

            {/* Step 3 */}
            <div className="bg-slate-50 border border-slate-200 rounded-3xl p-8 hover:shadow-lg transition-all duration-300 flex flex-col items-center text-center group">
              <div className="w-14 h-14 rounded-2xl bg-pink-600 text-white font-black text-xl flex items-center justify-center mb-6 shadow-md shadow-pink-200 group-hover:scale-105 transition-transform">
                <Download className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-3">
                3. Download in HD Quality
              </h3>
              <p className="text-slate-600 text-sm leading-relaxed">
                Click <strong>&quot;Download&quot;</strong>. Within seconds, your file will be converted and ready to save as an MP4 video or MP3 audio file in full resolution with crystal-clear sound.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Supported Platforms Deep Dive */}
      <section className="w-full py-16 md:py-24 bg-slate-50">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 mb-4 tracking-tight">
              Supported Platforms &amp; Dedicated Tools
            </h2>
            <p className="text-slate-600 max-w-2xl mx-auto text-base sm:text-lg">
              Explore our dedicated downloaders tailored for each platform and format with specialized features.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Instagram Card */}
            <div className="bg-white border border-slate-200 rounded-3xl p-8 hover:shadow-xl hover:border-pink-200 transition-all duration-300 flex flex-col justify-between">
              <div>
                <div className="bg-gradient-to-tr from-yellow-400 via-pink-500 to-purple-600 w-14 h-14 rounded-2xl flex items-center justify-center mb-6 shadow-md">
                  <FaInstagram className="w-7 h-7 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-slate-900 mb-3">
                  Instagram Downloader
                </h3>
                <p className="text-slate-600 mb-6 text-sm leading-relaxed">
                  Save Instagram Reels, single and multi-photo carousel albums, feed videos, anonymous Stories, and background audio tracks in 1080p resolution.
                </p>
                <div className="space-y-2 border-t border-slate-100 pt-4 mb-6 text-xs text-slate-600">
                  <Link href="/instagram-downloader" className="flex items-center justify-between py-1 hover:text-pink-600 font-medium">
                    <span>Instagram Reels Downloader</span>
                    <ArrowRight className="w-3.5 h-3.5 text-pink-500" />
                  </Link>
                  <Link href="/instagram-video-downloader" className="flex items-center justify-between py-1 hover:text-pink-600 font-medium">
                    <span>Instagram Feed &amp; IGTV Video</span>
                    <ArrowRight className="w-3.5 h-3.5 text-pink-500" />
                  </Link>
                  <Link href="/instagram-photo-downloader" className="flex items-center justify-between py-1 hover:text-pink-600 font-medium">
                    <span>Instagram Photo &amp; Carousel</span>
                    <ArrowRight className="w-3.5 h-3.5 text-pink-500" />
                  </Link>
                  <Link href="/instagram-story-downloader" className="flex items-center justify-between py-1 hover:text-pink-600 font-medium">
                    <span>Instagram Story &amp; Highlights</span>
                    <ArrowRight className="w-3.5 h-3.5 text-pink-500" />
                  </Link>
                  <Link href="/instagram-audio-downloader" className="flex items-center justify-between py-1 hover:text-pink-600 font-medium">
                    <span>Instagram Reel Audio (MP3)</span>
                    <ArrowRight className="w-3.5 h-3.5 text-pink-500" />
                  </Link>
                </div>
              </div>

              <Link
                href="/instagram-downloader"
                className="inline-flex items-center justify-center gap-2 w-full py-3 rounded-xl bg-pink-50 hover:bg-pink-100 text-pink-700 font-bold text-sm transition-colors"
              >
                Open Instagram Tool <ArrowRight className="w-4 h-4" />
              </Link>
            </div>

            {/* Facebook Card */}
            <div className="bg-white border border-slate-200 rounded-3xl p-8 hover:shadow-xl hover:border-blue-200 transition-all duration-300 flex flex-col justify-between">
              <div>
                <div className="bg-blue-600 w-14 h-14 rounded-2xl flex items-center justify-center mb-6 shadow-md">
                  <FaFacebook className="w-7 h-7 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-slate-900 mb-3">
                  Facebook Downloader
                </h3>
                <p className="text-slate-600 mb-6 text-sm leading-relaxed">
                  Download public Facebook videos, viral Reels, and Facebook Watch episodes in High Definition (720p/1080p HD) and Standard Definition (SD) MP4 format.
                </p>
                <div className="space-y-2 border-t border-slate-100 pt-4 mb-6 text-xs text-slate-600">
                  <div className="flex items-center gap-2 py-1">
                    <CheckCircle className="w-3.5 h-3.5 text-blue-500" />
                    <span>Facebook Watch &amp; Live Replays</span>
                  </div>
                  <div className="flex items-center gap-2 py-1">
                    <CheckCircle className="w-3.5 h-3.5 text-blue-500" />
                    <span>Facebook Reels in Original 1080p</span>
                  </div>
                  <div className="flex items-center gap-2 py-1">
                    <CheckCircle className="w-3.5 h-3.5 text-blue-500" />
                    <span>Public Page &amp; Group Video Links</span>
                  </div>
                  <div className="flex items-center gap-2 py-1">
                    <CheckCircle className="w-3.5 h-3.5 text-blue-500" />
                    <span>Dual Quality Options (HD &amp; SD)</span>
                  </div>
                </div>
              </div>

              <Link
                href="/facebook-video-downloader"
                className="inline-flex items-center justify-center gap-2 w-full py-3 rounded-xl bg-blue-50 hover:bg-blue-100 text-blue-700 font-bold text-sm transition-colors"
              >
                Open Facebook Tool <ArrowRight className="w-4 h-4" />
              </Link>
            </div>

            {/* YouTube Card */}
            <div className="bg-white border border-slate-200 rounded-3xl p-8 hover:shadow-xl hover:border-red-200 transition-all duration-300 flex flex-col justify-between">
              <div>
                <div className="bg-red-600 w-14 h-14 rounded-2xl flex items-center justify-center mb-6 shadow-md">
                  <FaYoutube className="w-7 h-7 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-slate-900 mb-3">
                  YouTube Downloader
                </h3>
                <p className="text-slate-600 mb-6 text-sm leading-relaxed">
                  Save YouTube Shorts and standard YouTube videos as high-speed MP4 files. Works with youtu.be shortlinks, full watch URLs, and vertical Shorts.
                </p>
                <div className="space-y-2 border-t border-slate-100 pt-4 mb-6 text-xs text-slate-600">
                  <div className="flex items-center gap-2 py-1">
                    <CheckCircle className="w-3.5 h-3.5 text-red-500" />
                    <span>YouTube Shorts Vertical Videos</span>
                  </div>
                  <div className="flex items-center gap-2 py-1">
                    <CheckCircle className="w-3.5 h-3.5 text-red-500" />
                    <span>Full HD 1080p MP4 Format</span>
                  </div>
                  <div className="flex items-center gap-2 py-1">
                    <CheckCircle className="w-3.5 h-3.5 text-red-500" />
                    <span>Compatible with Mobile and Desktop</span>
                  </div>
                  <div className="flex items-center gap-2 py-1">
                    <CheckCircle className="w-3.5 h-3.5 text-red-500" />
                    <span>Instant URL Fetch &amp; Download</span>
                  </div>
                </div>
              </div>

              <Link
                href="/youtube-video-downloader"
                className="inline-flex items-center justify-center gap-2 w-full py-3 rounded-xl bg-red-50 hover:bg-red-100 text-red-700 font-bold text-sm transition-colors"
              >
                Open YouTube Tool <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Core Advantages Section */}
      <section className="w-full py-16 md:py-24 bg-white border-b border-slate-200">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 mb-4 tracking-tight">
              Why Users Choose AnyClip
            </h2>
            <p className="text-slate-600 max-w-2xl mx-auto text-base sm:text-lg">
              Designed to be the fastest, cleanest, and most reliable online media downloader without annoying popups or bloated software.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="p-8 rounded-3xl bg-slate-50 border border-slate-200 flex flex-col items-start">
              <div className="p-3 bg-indigo-100 text-indigo-600 rounded-2xl mb-5">
                <Shield className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-2">
                100% Secure &amp; Anonymous
              </h3>
              <p className="text-slate-600 text-sm leading-relaxed">
                We never ask for your Instagram, Facebook, or Google passwords. You don&apos;t need to log in or register. We never record your personal IP address or save your download history.
              </p>
            </div>

            <div className="p-8 rounded-3xl bg-slate-50 border border-slate-200 flex flex-col items-start">
              <div className="p-3 bg-purple-100 text-purple-600 rounded-2xl mb-5">
                <Zap className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-2">
                Blazing Fast CDN Speeds
              </h3>
              <p className="text-slate-600 text-sm leading-relaxed">
                AnyClip connects directly to the platform content delivery networks, allowing you to download videos at your full internet bandwidth without artificial speed throttling.
              </p>
            </div>

            <div className="p-8 rounded-3xl bg-slate-50 border border-slate-200 flex flex-col items-start">
              <div className="p-3 bg-emerald-100 text-emerald-600 rounded-2xl mb-5">
                <Smartphone className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-2">
                Universal Device Support
              </h3>
              <p className="text-slate-600 text-sm leading-relaxed">
                Works seamlessly in any modern browser across iPhone, iPad, Android smartphones, Windows PC, Mac, and Chromebooks with zero app installation needed.
              </p>
            </div>

            <div className="p-8 rounded-3xl bg-slate-50 border border-slate-200 flex flex-col items-start">
              <div className="p-3 bg-pink-100 text-pink-600 rounded-2xl mb-5">
                <Film className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-2">
                Zero Watermarks
              </h3>
              <p className="text-slate-600 text-sm leading-relaxed">
                All downloaded videos preserve their pristine original quality with no superimposed logos, third-party watermarks, or compression artifacts.
              </p>
            </div>

            <div className="p-8 rounded-3xl bg-slate-50 border border-slate-200 flex flex-col items-start">
              <div className="p-3 bg-amber-100 text-amber-600 rounded-2xl mb-5">
                <Music className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-2">
                Audio &amp; Music Extraction
              </h3>
              <p className="text-slate-600 text-sm leading-relaxed">
                Extract catchy background music, trending dialogue, and songs from Instagram Reels and Shorts directly into high-fidelity MP3 format for offline listening.
              </p>
            </div>

            <div className="p-8 rounded-3xl bg-slate-50 border border-slate-200 flex flex-col items-start">
              <div className="p-3 bg-cyan-100 text-cyan-600 rounded-2xl mb-5">
                <ImageIcon className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-2">
                Carousel &amp; Album Support
              </h3>
              <p className="text-slate-600 text-sm leading-relaxed">
                Easily download multi-image posts and mixed photo/video albums from Instagram with our convenient batch &quot;Download All&quot; capability.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Comprehensive FAQ Section */}
      <section className="w-full py-16 md:py-24 bg-slate-50">
        <div className="container mx-auto px-4 max-w-4xl">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-indigo-50 text-indigo-600 text-xs sm:text-sm font-semibold mb-3 border border-indigo-100">
              <HelpCircle className="w-4 h-4" />
              Got Questions?
            </div>
            <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 mb-4 tracking-tight">
              Frequently Asked Questions
            </h2>
            <p className="text-slate-600 max-w-xl mx-auto text-base sm:text-lg">
              Everything you need to know about using AnyClip to download videos securely.
            </p>
          </div>

          <div className="space-y-4">
            <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-xs">
              <h3 className="font-bold text-slate-900 text-base sm:text-lg mb-2">
                How do I download videos from Instagram, Facebook, or YouTube?
              </h3>
              <p className="text-slate-600 text-sm leading-relaxed">
                Simply copy the URL of the public video, Reel, Story, or Short from the app or website. Paste the link into the AnyClip input box above and click &quot;Download&quot;. Your video will be parsed and ready to save as an MP4 or JPG file in seconds.
              </p>
            </div>

            <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-xs">
              <h3 className="font-bold text-slate-900 text-base sm:text-lg mb-2">
                Is AnyClip completely free? Are there any download limits?
              </h3>
              <p className="text-slate-600 text-sm leading-relaxed">
                Yes, AnyClip is 100% free with no hidden fees, subscriptions, or quotas. You can download as many videos and reels as you like without any restrictions.
              </p>
            </div>

            <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-xs">
              <h3 className="font-bold text-slate-900 text-base sm:text-lg mb-2">
                Do I need to install an app or browser extension?
              </h3>
              <p className="text-slate-600 text-sm leading-relaxed">
                No. AnyClip is an entirely web-based cloud service. You do not need to install APK files, apps, or extensions. It works natively inside Safari, Chrome, Edge, and Firefox.
              </p>
            </div>

            <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-xs">
              <h3 className="font-bold text-slate-900 text-base sm:text-lg mb-2">
                Can I download videos on iPhone (iOS) and Android?
              </h3>
              <p className="text-slate-600 text-sm leading-relaxed">
                Yes. On Android, files download directly into your Downloads folder and Gallery app. On iPhone/iPad running iOS 13 or later, Safari downloads the file directly to your Files or Photos app when you tap download.
              </p>
            </div>

            <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-xs">
              <h3 className="font-bold text-slate-900 text-base sm:text-lg mb-2">
                Can I download Instagram Stories anonymously?
              </h3>
              <p className="text-slate-600 text-sm leading-relaxed">
                Yes. AnyClip fetches public Instagram Stories and Highlights server-side. The person who uploaded the story will not receive any notification that you viewed or saved their story. Note that private stories cannot be viewed or saved.
              </p>
            </div>

            <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-xs">
              <h3 className="font-bold text-slate-900 text-base sm:text-lg mb-2">
                Can I download videos from private accounts or closed groups?
              </h3>
              <p className="text-slate-600 text-sm leading-relaxed">
                No. AnyClip only supports publicly available videos. We respect user privacy and security and cannot bypass authentication to access private profiles, secret groups, or non-public posts.
              </p>
            </div>

            <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-xs">
              <h3 className="font-bold text-slate-900 text-base sm:text-lg mb-2">
                Is it legal to download videos with AnyClip?
              </h3>
              <p className="text-slate-600 text-sm leading-relaxed">
                Downloading public videos for personal, non-commercial offline viewing is generally permitted under fair use principles. However, you should not redistribute, re-upload, or commercially exploit content without the explicit consent of the original copyright owner.
              </p>
            </div>

            <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-xs">
              <h3 className="font-bold text-slate-900 text-base sm:text-lg mb-2">
                Where are my downloaded videos saved on my device?
              </h3>
              <p className="text-slate-600 text-sm leading-relaxed">
                On desktop computers (Windows/Mac), downloaded files are stored in your default &quot;Downloads&quot; folder. On Android smartphones, you can find them in your &quot;Downloads&quot; folder or Gallery. On iPhone, check the &quot;Downloads&quot; section in the Files app.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Trust & Legal Disclaimer Banner */}
      <section className="w-full py-12 bg-white border-t border-slate-200">
        <div className="container mx-auto px-4 max-w-4xl text-center text-xs text-slate-500 space-y-3">
          <p className="font-semibold text-slate-700">
            Legal &amp; Copyright Notice
          </p>
          <p className="leading-relaxed">
            AnyClip is an independent tool designed for personal offline backup and fair use of publicly accessible multimedia content. AnyClip does not host or store any media on its servers; all files are fetched directly from third-party content delivery networks. AnyClip is not affiliated with, endorsed, or sponsored by Instagram, Meta Platforms, Facebook, YouTube, Google, or Alphabet Inc.
          </p>
          <div className="flex justify-center gap-4 pt-2 font-medium text-indigo-600">
            <Link href="/terms" className="hover:underline">Terms of Service</Link>
            <span>•</span>
            <Link href="/privacy" className="hover:underline">Privacy Policy</Link>
            <span>•</span>
            <Link href="/contact" className="hover:underline">DMCA &amp; Contact</Link>
          </div>
        </div>
      </section>
    </div>
  );
}
