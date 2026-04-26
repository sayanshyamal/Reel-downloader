import Link from "next/link";
import Logo from "./Logo";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-slate-900 text-slate-300 py-12 mt-16 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="col-span-1 md:col-span-1">
            <div className="mb-4">
              <Logo size="md" variant="light" />
            </div>
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
            <h3 className="text-white font-semibold mb-4 tracking-wide">Resources</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/instagram-downloader#how-to-download" className="hover:text-indigo-400 transition-colors">
                  How to Download Reels
                </Link>
              </li>
              <li>
                <Link href="/facebook-video-downloader#how-to-download" className="hover:text-indigo-400 transition-colors">
                  How to Download FB Videos
                </Link>
              </li>
              <li>
                <Link href="/youtube-video-downloader#how-to-download" className="hover:text-indigo-400 transition-colors">
                  How to Download YT Videos
                </Link>
              </li>
              <li>
                <Link href="/instagram-downloader#blog" className="hover:text-indigo-400 transition-colors">
                  Instagram Download Guide
                </Link>
              </li>
              <li>
                <Link href="/youtube-video-downloader#blog" className="hover:text-indigo-400 transition-colors">
                  YouTube Download Guide
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
