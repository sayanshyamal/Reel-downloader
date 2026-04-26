"use client";

import { useState } from "react";

type Platform = "instagram" | "facebook" | "youtube";

interface BlogSectionProps {
  platform: Platform;
}

interface FAQItem {
  question: string;
  answer: string;
}

const blogContent: Record<Platform, {
  heading: string;
  intro: string;
  sections: { title: string; content: string }[];
  faqs: FAQItem[];
}> = {
  instagram: {
    heading: "Everything You Need to Know About Downloading Instagram Videos",
    intro: "Instagram is one of the most popular social media platforms, with millions of Reels, Stories, and IGTV videos shared every day. AnyClip makes it easy to save your favorite Instagram content directly to your device — no app installation or login required.",
    sections: [
      {
        title: "What is an Instagram Video Downloader?",
        content: "An Instagram video downloader is an online tool that lets you save Instagram Reels, IGTV videos, and regular video posts to your device. Unlike screen recording, AnyClip downloads the original high-quality file directly from Instagram's servers, ensuring you get the best resolution available — typically 1080p Full HD.",
      },
      {
        title: "Supported Instagram Content Types",
        content: "AnyClip supports all major Instagram video formats including: Reels (short-form vertical videos up to 90 seconds), IGTV videos (long-form content), regular video posts from public profiles, and video carousels. Simply copy the link to any of these formats and paste it into AnyClip to download.",
      },
      {
        title: "Is It Safe to Download Instagram Videos?",
        content: "Absolutely. AnyClip is 100% safe and secure. We don't require any login credentials or personal information. Your downloads are processed through secure servers, and we never store your download history. The tool works entirely in your browser — no software installation needed.",
      },
      {
        title: "Tips for Downloading Instagram Reels",
        content: "For the best experience: make sure the Instagram profile is public (private profiles cannot be downloaded), always copy the direct link to the specific Reel (not the profile URL), and ensure a stable internet connection for faster processing. AnyClip works on all devices including iPhone, Android, PC, and Mac.",
      },
    ],
    faqs: [
      { question: "Can I download Instagram Reels in HD?", answer: "Yes! AnyClip downloads Instagram Reels in the highest available quality, typically 1080p Full HD. The quality depends on the original upload resolution." },
      { question: "Do I need an Instagram account to download?", answer: "No, you don't need an Instagram account. However, the content must be from a public profile. Private account videos cannot be downloaded." },
      { question: "Is it free to use?", answer: "Yes, AnyClip is completely free with no hidden charges. You can download unlimited Instagram videos without any subscription." },
      { question: "Can I download Instagram Stories?", answer: "Currently, AnyClip supports Reels, IGTV, and regular video posts. Story downloads may be added in a future update." },
      { question: "Does it work on iPhone and Android?", answer: "Yes! AnyClip works on all devices and browsers. On iPhone, the video will open in a new tab where you can save it. On Android, it downloads directly to your device." },
    ],
  },
  facebook: {
    heading: "Complete Guide to Downloading Facebook Videos",
    intro: "Facebook hosts billions of videos — from funny clips and news segments to personal memories and viral Reels. With AnyClip, you can save any public Facebook video directly to your device in HD quality, completely free and without any software.",
    sections: [
      {
        title: "How Does Facebook Video Download Work?",
        content: "AnyClip processes Facebook video URLs by extracting the direct media link from Facebook's content delivery network (CDN). This means you get the original video file in its highest available quality. Simply paste any public Facebook video URL, and AnyClip handles the rest — no technical knowledge required.",
      },
      {
        title: "Public vs. Private Facebook Videos",
        content: "AnyClip can only download videos from public Facebook posts and pages. If a video is shared in a private group or on a private profile, it cannot be accessed by any third-party tool. To check if a video is public, try opening its URL in an incognito/private browser window.",
      },
      {
        title: "Downloading Facebook Reels",
        content: "Facebook Reels are short-form videos similar to Instagram Reels. AnyClip fully supports downloading Facebook Reels — just copy the Reel link from the Facebook app or website and paste it into the download field. The video will be saved in its original vertical format and quality.",
      },
      {
        title: "Choosing Video Quality",
        content: "Facebook videos are typically available in SD (360p/480p) and HD (720p/1080p) quality. AnyClip automatically selects the highest available quality for your download. The final quality depends on the original upload resolution set by the video creator.",
      },
    ],
    faqs: [
      { question: "Can I download Facebook videos in HD?", answer: "Yes! AnyClip downloads Facebook videos in the highest available quality. If the video was uploaded in HD (720p or 1080p), you'll get the HD version." },
      { question: "Can I download videos from Facebook groups?", answer: "Only videos from public groups can be downloaded. Private group videos are not accessible to third-party tools for privacy reasons." },
      { question: "Why can't I download a specific video?", answer: "The video might be from a private profile/group, or it might be a live stream that hasn't been saved yet. Ensure the video URL is from a public post." },
      { question: "Do I need a Facebook account?", answer: "No, you don't need a Facebook account to use AnyClip. Just paste the public video URL and download." },
      { question: "What format are Facebook videos downloaded in?", answer: "Facebook videos are downloaded in MP4 format, which is compatible with virtually all devices and media players." },
    ],
  },
  youtube: {
    heading: "Ultimate Guide to Downloading YouTube Videos",
    intro: "YouTube is the world's largest video platform with over 800 million videos. Whether you want to save tutorials, music videos, or YouTube Shorts for offline viewing, AnyClip provides a fast, free, and secure way to download YouTube content in high quality.",
    sections: [
      {
        title: "YouTube Video Download — How It Works",
        content: "AnyClip processes YouTube URLs by connecting to YouTube's content servers to extract the video in your preferred quality. Simply paste any YouTube video or Shorts URL, and AnyClip will process it within seconds. The downloaded file comes in universal MP4 format, playable on any device.",
      },
      {
        title: "YouTube Shorts vs. Full Videos",
        content: "AnyClip supports both YouTube Shorts (vertical videos up to 60 seconds) and full-length YouTube videos. For Shorts, copy the URL from the Shorts player or share button. For regular videos, copy the URL from the address bar or share menu. Both formats download seamlessly.",
      },
      {
        title: "Video Quality Options",
        content: "YouTube videos are available in multiple quality levels including 360p, 480p, 720p (HD), 1080p (Full HD), and sometimes 4K. AnyClip automatically selects the best available quality for your download. Higher quality means larger file sizes, so ensure you have enough storage space.",
      },
      {
        title: "Legal Considerations",
        content: "Downloading YouTube videos for personal offline viewing is common practice. However, please respect content creators' rights — don't re-upload or commercially use downloaded content without permission. AnyClip is intended for personal use only. Always credit original creators when sharing content.",
      },
    ],
    faqs: [
      { question: "Can I download YouTube videos in 1080p?", answer: "Yes! AnyClip supports downloading YouTube videos in up to 1080p Full HD quality, depending on the original upload resolution." },
      { question: "Can I download YouTube Shorts?", answer: "Absolutely! Just copy the YouTube Shorts URL and paste it into AnyClip. The Short will be downloaded in its original vertical format." },
      { question: "What format are videos downloaded in?", answer: "YouTube videos are downloaded in MP4 format, which works on all devices including smartphones, tablets, and computers." },
      { question: "Is downloading YouTube videos legal?", answer: "Downloading for personal offline viewing is generally acceptable. However, re-distributing or commercially using downloaded content without permission violates YouTube's Terms of Service." },
      { question: "Why is my download slow?", answer: "Download speed depends on your internet connection and the video file size. HD and 4K videos are larger files and may take longer. Try a lower quality if speed is an issue." },
    ],
  },
};

function FAQAccordion({ faqs }: { faqs: FAQItem[] }) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  return (
    <div className="space-y-3">
      {faqs.map((faq, index) => (
        <div key={index} className="border border-slate-200 rounded-2xl overflow-hidden bg-white hover:border-slate-300 transition-colors">
          <button
            onClick={() => setOpenIndex(openIndex === index ? null : index)}
            className="w-full px-6 py-4 text-left flex items-center justify-between gap-4"
            aria-expanded={openIndex === index}
          >
            <span className="font-semibold text-slate-800 text-sm md:text-base">{faq.question}</span>
            <svg className={`w-5 h-5 text-slate-400 shrink-0 transition-transform duration-200 ${openIndex === index ? "rotate-180" : ""}`} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
            </svg>
          </button>
          {openIndex === index && (
            <div className="px-6 pb-4">
              <p className="text-slate-600 text-sm leading-relaxed">{faq.answer}</p>
            </div>
          )}
        </div>
      ))}
    </div>
  );
}

export default function BlogSection({ platform }: BlogSectionProps) {
  const data = blogContent[platform];
  return (
    <section className="w-full py-16 md:py-20 bg-slate-50 border-t border-slate-200" id="blog">
      <div className="container mx-auto px-4 max-w-4xl">
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-indigo-50 text-indigo-600 text-sm font-medium mb-4 border border-indigo-100">
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" /></svg>
            Blog & Guide
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">{data.heading}</h2>
          <p className="text-slate-600 max-w-2xl mx-auto text-lg leading-relaxed">{data.intro}</p>
        </div>
        <div className="space-y-8 mb-16">
          {data.sections.map((section, index) => (
            <article key={index} className="bg-white rounded-2xl border border-slate-200 p-6 md:p-8 shadow-sm hover:shadow-md transition-shadow">
              <h3 className="text-xl font-bold text-slate-900 mb-3 flex items-start gap-3">
                <span className="bg-indigo-100 text-indigo-600 w-8 h-8 rounded-lg flex items-center justify-center text-sm font-bold shrink-0 mt-0.5">{index + 1}</span>
                {section.title}
              </h3>
              <p className="text-slate-600 leading-relaxed pl-11">{section.content}</p>
            </article>
          ))}
        </div>
        <div>
          <h2 className="text-2xl font-bold text-slate-900 mb-6 text-center">Frequently Asked Questions</h2>
          <FAQAccordion faqs={data.faqs} />
        </div>
      </div>
    </section>
  );
}
