import Image from "next/image";

type Platform = "instagram" | "facebook" | "youtube";

interface HowToDownloadProps {
  platform: Platform;
}

const platformData: Record<Platform, {
  title: string;
  accentBorder: string;
  accentBg: string;
  badgeBg: string;
  steps: { title: string; description: string; image: string }[];
}> = {
  instagram: {
    title: "How to Download Instagram Videos",
    accentBg: "from-pink-500/10 to-purple-500/10",
    accentBorder: "border-pink-200",
    badgeBg: "bg-gradient-to-br from-yellow-400 via-pink-500 to-purple-600",
    steps: [
      { title: "Copy the Reel Link", description: "Open Instagram, find the Reel or Video. Tap the Share button and select \"Copy Link\".", image: "/steps/ig-step1.png" },
      { title: "Paste the URL", description: "Come back to AnyClip and paste the Instagram link into the input field above using Ctrl+V.", image: "/steps/ig-step2.png" },
      { title: "Download & Save", description: "Click \"Download\" and wait a few seconds. Your video will be ready to save in HD quality.", image: "/steps/ig-step3.png" },
    ],
  },
  facebook: {
    title: "How to Download Facebook Videos",
    accentBg: "from-blue-500/10 to-cyan-500/10",
    accentBorder: "border-blue-200",
    badgeBg: "bg-blue-600",
    steps: [
      { title: "Copy the Video Link", description: "Open Facebook, find the video. Click the three dots menu and select \"Copy link\".", image: "/steps/fb-step1.png" },
      { title: "Paste the URL", description: "Navigate to AnyClip and paste the Facebook video link into the input field above.", image: "/steps/fb-step2.png" },
      { title: "Download & Save", description: "Hit \"Download\" and wait for processing. Your Facebook video will be saved in HD.", image: "/steps/fb-step3.png" },
    ],
  },
  youtube: {
    title: "How to Download YouTube Videos",
    accentBg: "from-red-500/10 to-orange-500/10",
    accentBorder: "border-red-200",
    badgeBg: "bg-red-600",
    steps: [
      { title: "Copy the Video Link", description: "Open YouTube, find the video or Short. Click \"Share\" and then \"Copy\" to copy the URL.", image: "/steps/yt-step1.png" },
      { title: "Paste the URL", description: "Come to AnyClip and paste the YouTube URL into the input field above.", image: "/steps/yt-step2.png" },
      { title: "Download & Save", description: "Press \"Download\" and your YouTube video will be ready to save as MP4 in best quality.", image: "/steps/yt-step3.png" },
    ],
  },
};

export default function HowToDownload({ platform }: HowToDownloadProps) {
  const data = platformData[platform];
  return (
    <section className="w-full py-16 md:py-20" id="how-to-download">
      <div className="container mx-auto px-4 max-w-6xl">
        <div className="text-center mb-14">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-slate-100 text-slate-600 text-sm font-medium mb-4 border border-slate-200">
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
            Step-by-Step Guide
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">{data.title}</h2>
          <p className="text-slate-600 max-w-2xl mx-auto text-lg">Follow these 3 simple steps to download your favorite videos in seconds. No app needed!</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
          <div className="hidden md:block absolute top-[140px] left-[33%] w-[34%] h-0.5 bg-gradient-to-r from-slate-200 via-slate-300 to-slate-200 z-0" />
          {data.steps.map((step, index) => (
            <div key={index} className="relative z-10 group">
              <div className={`bg-white rounded-3xl border ${data.accentBorder} p-6 shadow-sm hover:shadow-xl transition-all duration-300 h-full flex flex-col overflow-hidden`}>
                <div className="flex items-center gap-3 mb-5">
                  <div className={`${data.badgeBg} w-10 h-10 rounded-xl flex items-center justify-center text-white font-bold text-lg shadow-md`}>{index + 1}</div>
                  <h3 className="text-lg font-bold text-slate-900">{step.title}</h3>
                </div>
                <div className={`relative w-full aspect-square rounded-2xl overflow-hidden mb-5 bg-gradient-to-br ${data.accentBg} border ${data.accentBorder}`}>
                  <Image src={step.image} alt={`Step ${index + 1}: ${step.title}`} fill className="object-cover group-hover:scale-105 transition-transform duration-500" sizes="(max-width: 768px) 100vw, 33vw" />
                </div>
                <p className="text-slate-600 leading-relaxed text-sm flex-grow">{step.description}</p>
              </div>
            </div>
          ))}
        </div>
        <div className="text-center mt-12">
          <a href="#top" className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-indigo-500 hover:bg-indigo-600 text-white font-semibold transition-all shadow-lg shadow-indigo-200">
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M5 10l7-7m0 0l7 7m-7-7v18" /></svg>
            Try It Now — Scroll Up
          </a>
        </div>
      </div>
    </section>
  );
}
