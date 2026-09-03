import Image from "next/image";

export type HowToPlatform =
  | "instagram"
  | "instagram-reel"
  | "instagram-video"
  | "instagram-photo"
  | "instagram-story"
  | "instagram-audio"
  | "facebook"
  | "youtube";

interface HowToDownloadProps {
  platform: HowToPlatform;
}

const platformData: Record<
  HowToPlatform,
  {
    title: string;
    description: string;
    accentBorder: string;
    accentBg: string;
    badgeBg: string;
    steps: { title: string; description: string; image: string }[];
  }
> = {
  instagram: {
    title: "How to Download Instagram Reels",
    description: "Follow these 3 simple steps to save any public Instagram Reel with crystal-clear audio to your gallery.",
    accentBg: "from-pink-500/10 to-purple-500/10",
    accentBorder: "border-pink-200",
    badgeBg: "bg-gradient-to-br from-yellow-400 via-pink-500 to-purple-600",
    steps: [
      {
        title: "Copy Reel URL",
        description: "Open the Instagram app or website, navigate to the Reel, tap the 'Share' (paper plane) icon, and click 'Copy Link'.",
        image: "/steps/ig-step1.png",
      },
      {
        title: "Paste URL in AnyClip",
        description: "Head over to AnyClip and paste the link into the download input box above using Ctrl+V or the Paste button.",
        image: "/steps/ig-step2.png",
      },
      {
        title: "Download 1080p MP4",
        description: "Click 'Download'. Your Reel will be parsed and ready to save in full 1080p HD MP4 format with audio.",
        image: "/steps/ig-step3.png",
      },
    ],
  },
  "instagram-reel": {
    title: "How to Download Instagram Reels",
    description: "Save Instagram Reels with audio in original 1080p Full HD without watermarks.",
    accentBg: "from-pink-500/10 to-purple-500/10",
    accentBorder: "border-pink-200",
    badgeBg: "bg-gradient-to-br from-yellow-400 via-pink-500 to-purple-600",
    steps: [
      {
        title: "Copy Reel Link",
        description: "Open Instagram, tap the Share icon on the Reel, and choose 'Copy Link'.",
        image: "/steps/ig-step1.png",
      },
      {
        title: "Paste into Search Bar",
        description: "Paste the Reel link into AnyClip's input box above.",
        image: "/steps/ig-step2.png",
      },
      {
        title: "Save Video to Gallery",
        description: "Press 'Download' and the MP4 video will download directly to your smartphone or computer.",
        image: "/steps/ig-step3.png",
      },
    ],
  },
  "instagram-video": {
    title: "How to Download Instagram Feed & IGTV Videos",
    description: "Save long-form IGTV videos and regular feed video posts in highest available resolution.",
    accentBg: "from-blue-500/10 to-indigo-500/10",
    accentBorder: "border-blue-200",
    badgeBg: "bg-gradient-to-br from-blue-600 to-indigo-600",
    steps: [
      {
        title: "Copy Feed/IGTV Link",
        description: "Tap the three dots (•••) on the Instagram video post or the Share icon, then select 'Copy Link'.",
        image: "/steps/ig-step1.png",
      },
      {
        title: "Paste URL into AnyClip",
        description: "Paste the copied URL into the Video Downloader input field above.",
        image: "/steps/ig-step2.png",
      },
      {
        title: "Download HD Video",
        description: "Click 'Download' to save the complete feed or IGTV video as a high-definition MP4 file.",
        image: "/steps/ig-step3.png",
      },
    ],
  },
  "instagram-photo": {
    title: "How to Download Instagram Photos & Carousels",
    description: "Download single photos and multi-photo carousel albums in original full-resolution JPG.",
    accentBg: "from-purple-500/10 to-pink-500/10",
    accentBorder: "border-purple-200",
    badgeBg: "bg-gradient-to-br from-purple-600 to-indigo-600",
    steps: [
      {
        title: "Copy Photo/Album Link",
        description: "Open the Instagram photo or carousel post, tap the three dots or Share icon, and select 'Copy Link'.",
        image: "/steps/ig-step1.png",
      },
      {
        title: "Paste URL in AnyClip",
        description: "Paste the link into the Photo Downloader input box above and click 'Fetch Photo'.",
        image: "/steps/ig-step2.png",
      },
      {
        title: "Save Original HD Images",
        description: "Download individual photos in original resolution or click 'Download All' to save the full carousel album.",
        image: "/steps/ig-step3.png",
      },
    ],
  },
  "instagram-story": {
    title: "How to Download Instagram Stories Anonymously",
    description: "Save 24-hour public Instagram Stories and Highlights secretly without notifying the account owner.",
    accentBg: "from-amber-500/10 to-orange-500/10",
    accentBorder: "border-amber-200",
    badgeBg: "bg-gradient-to-br from-amber-500 to-orange-600",
    steps: [
      {
        title: "Copy Story Link",
        description: "Open the Instagram Story, tap the three dots in the top corner, and select 'Link' or 'Copy Link'.",
        image: "/steps/ig-step1.png",
      },
      {
        title: "Paste into Story Saver",
        description: "Paste the Story URL into the AnyClip search bar above and click 'Fetch Story'.",
        image: "/steps/ig-step2.png",
      },
      {
        title: "Save Secretly in HD",
        description: "Click 'Download'. The photo or video story is saved directly to your device without leaving any view footprint.",
        image: "/steps/ig-step3.png",
      },
    ],
  },
  "instagram-audio": {
    title: "How to Extract & Download Instagram Reel Audio",
    description: "Extract background music, voice tracks, and viral sounds from any Instagram Reel into MP3.",
    accentBg: "from-emerald-500/10 to-teal-500/10",
    accentBorder: "border-emerald-200",
    badgeBg: "bg-gradient-to-br from-emerald-500 to-teal-600",
    steps: [
      {
        title: "Copy Reel Link",
        description: "Find the Reel with the sound or music track you want, tap Share, and select 'Copy Link'.",
        image: "/steps/ig-step1.png",
      },
      {
        title: "Paste into Audio Saver",
        description: "Paste the link into the Audio Downloader field above and click 'Extract Audio'.",
        image: "/steps/ig-step2.png",
      },
      {
        title: "Download MP3 Track",
        description: "Click 'Download Audio (MP3)' to save the sound directly to your phone or PC as an audio file.",
        image: "/steps/ig-step3.png",
      },
    ],
  },
  facebook: {
    title: "How to Download Facebook Videos & Reels",
    description: "Follow these 3 easy steps to download public Facebook videos and Watch episodes in HD.",
    accentBg: "from-blue-500/10 to-cyan-500/10",
    accentBorder: "border-blue-200",
    badgeBg: "bg-blue-600",
    steps: [
      {
        title: "Copy Facebook Video Link",
        description: "On the Facebook video or Reel, tap the three dots (•••) or Share button and select 'Copy link'.",
        image: "/steps/fb-step1.png",
      },
      {
        title: "Paste URL into AnyClip",
        description: "Navigate to AnyClip and paste the Facebook video link into the input field above.",
        image: "/steps/fb-step2.png",
      },
      {
        title: "Download in HD or SD",
        description: "Choose your preferred quality (HD 1080p or SD) and save the MP4 video directly to your gallery.",
        image: "/steps/fb-step3.png",
      },
    ],
  },
  youtube: {
    title: "How to Download YouTube Videos & Shorts",
    description: "Save YouTube Shorts and standard YouTube videos as high-quality MP4 files in seconds.",
    accentBg: "from-red-500/10 to-orange-500/10",
    accentBorder: "border-red-200",
    badgeBg: "bg-red-600",
    steps: [
      {
        title: "Copy YouTube Link",
        description: "Open YouTube on mobile or desktop. Tap 'Share' beneath the video or Short and choose 'Copy link'.",
        image: "/steps/yt-step1.png",
      },
      {
        title: "Paste URL into AnyClip",
        description: "Come to AnyClip and paste the YouTube URL into the input field above.",
        image: "/steps/yt-step2.png",
      },
      {
        title: "Download High-Def MP4",
        description: "Press 'Download' and your YouTube video will be saved as an MP4 file in crystal-clear quality.",
        image: "/steps/yt-step3.png",
      },
    ],
  },
};

export default function HowToDownload({ platform }: HowToDownloadProps) {
  const data = platformData[platform] || platformData.instagram;

  return (
    <section className="w-full py-16 md:py-20" id="how-to-download">
      <div className="container mx-auto px-4 max-w-6xl">
        <div className="text-center mb-14">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-slate-100 text-slate-600 text-sm font-medium mb-4 border border-slate-200">
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
                d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            Step-by-Step Guide
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
            {data.title}
          </h2>
          <p className="text-slate-600 max-w-2xl mx-auto text-base sm:text-lg">
            {data.description}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
          <div className="hidden md:block absolute top-[140px] left-[33%] w-[34%] h-0.5 bg-gradient-to-r from-slate-200 via-slate-300 to-slate-200 z-0" />
          {data.steps.map((step, index) => (
            <div key={index} className="relative z-10 group">
              <div
                className={`bg-white rounded-3xl border ${data.accentBorder} p-6 shadow-xs hover:shadow-xl transition-all duration-300 h-full flex flex-col overflow-hidden`}
              >
                <div className="flex items-center gap-3 mb-5">
                  <div
                    className={`${data.badgeBg} w-10 h-10 rounded-xl flex items-center justify-center text-white font-bold text-lg shadow-md`}
                  >
                    {index + 1}
                  </div>
                  <h3 className="text-lg font-bold text-slate-900">
                    {step.title}
                  </h3>
                </div>
                <div
                  className={`relative w-full aspect-square rounded-2xl overflow-hidden mb-5 bg-gradient-to-br ${data.accentBg} border ${data.accentBorder}`}
                >
                  <Image
                    src={step.image}
                    alt={`Step ${index + 1}: ${step.title}`}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                    sizes="(max-width: 768px) 100vw, 33vw"
                  />
                </div>
                <p className="text-slate-600 leading-relaxed text-sm flex-grow">
                  {step.description}
                </p>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-12">
          <a
            href="#top"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-semibold transition-all shadow-lg shadow-indigo-200"
          >
            <svg
              className="w-5 h-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M5 10l7-7m0 0l7 7m-7-7v18"
              />
            </svg>
            Try It Now — Scroll Up
          </a>
        </div>
      </div>
    </section>
  );
}
