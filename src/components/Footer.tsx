import Link from "next/link";
import { Video } from "lucide-react";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-slate-900 text-slate-300 py-12 mt-16 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="col-span-1 md:col-span-2">
            <Link href="/" className="flex items-center gap-2 mb-4">
              <div className="bg-indigo-500 p-1.5 rounded-lg">
                <Video className="h-5 w-5 text-white" />
              </div>
              <span className="font-bold text-xl tracking-tight text-white">
                Any<span className="text-indigo-500">Clip</span>
              </span>
            </Link>
            <p className="text-sm text-slate-400 max-w-sm">
              AnyClip is a free, fast, and secure tool to download your favorite videos from Instagram, Facebook, and YouTube straight to your device.
            </p>
          </div>
          
          <div>
            <h3 className="text-white font-semibold mb-4 tracking-wide">Downloaders</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/instagram-downloader" className="hover:text-indigo-400 transition-colors">
                  Instagram Downloader
                </Link>
              </li>
              <li>
                <Link href="/facebook-video-downloader" className="hover:text-indigo-400 transition-colors">
                  Facebook Downloader
                </Link>
              </li>
              <li>
                <Link href="/youtube-video-downloader" className="hover:text-indigo-400 transition-colors">
                  YouTube Downloader
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-white font-semibold mb-4 tracking-wide">Legal</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="#" className="hover:text-indigo-400 transition-colors">
                  Terms of Service
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-indigo-400 transition-colors">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-indigo-400 transition-colors">
                  Contact Us
                </Link>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-slate-800 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-sm text-slate-500 text-center md:text-left">
            &copy; {currentYear} AnyClip. All rights reserved.
          </p>
          <p className="text-xs text-slate-600 text-center md:text-right max-w-xl">
            Disclaimer: AnyClip does not host any pirated or copyright content on its server. All videos are downloaded directly from their respective CDNs.
          </p>
        </div>
      </div>
    </footer>
  );
}
