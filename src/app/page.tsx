import Link from "next/link";
import { ArrowRight, Zap, Shield, Smartphone } from "lucide-react";
import { FaInstagram, FaFacebook, FaYoutube } from "react-icons/fa";

export default function Home() {
  return (
    <div className="flex flex-col items-center">
      {/* Hero Section */}
      <section className="w-full py-20 md:py-32 bg-gradient-to-b from-indigo-50 to-slate-50 relative overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-[500px] bg-indigo-500/10 blur-[120px] rounded-full pointer-events-none" />
        
        <div className="container mx-auto px-4 max-w-5xl relative z-10 text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-indigo-100/80 text-indigo-700 text-sm font-medium mb-8 border border-indigo-200">
            <Zap className="w-4 h-4" />
            <span>100% Free & Unlimited</span>
          </div>
          <h1 className="text-5xl md:text-7xl font-extrabold text-slate-900 tracking-tight mb-6">
            Download Any Video <br className="hidden md:block" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-500 to-pink-500">
              Instantly & Securely
            </span>
          </h1>
          <p className="text-lg md:text-xl text-slate-600 max-w-2xl mx-auto mb-10 leading-relaxed">
            The ultimate multi-platform video downloader. Save high-quality videos from Instagram, Facebook, and YouTube directly to your device with zero hassle.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link 
              href="/instagram-downloader" 
              className="bg-indigo-600 hover:bg-indigo-700 text-white px-8 py-4 rounded-xl font-semibold transition-all shadow-lg shadow-indigo-200 flex items-center justify-center gap-2 group"
            >
              Get Started
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </div>
      </section>

      {/* Downloader Cards Section */}
      <section className="w-full py-20 bg-white">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-slate-900 mb-4">Supported Platforms</h2>
            <p className="text-slate-600 max-w-xl mx-auto">Choose your preferred platform below to start downloading videos in HD quality.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Instagram Card */}
            <Link href="/instagram-downloader" className="group h-full">
              <div className="bg-slate-50 border border-slate-200 rounded-3xl p-8 hover:shadow-xl hover:border-indigo-200 transition-all duration-300 h-full flex flex-col relative overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-pink-500/5 rounded-bl-full -z-0 group-hover:scale-110 transition-transform" />
                <div className="bg-gradient-to-tr from-yellow-400 via-pink-500 to-purple-500 w-16 h-16 rounded-2xl flex items-center justify-center mb-6 shadow-md relative z-10">
                  <FaInstagram className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-slate-900 mb-3 relative z-10">Instagram Downloader</h3>
                <p className="text-slate-600 mb-6 flex-grow relative z-10">Download Reels, IGTV, Photos, and Videos without quality loss.</p>
                <div className="flex items-center text-indigo-600 font-semibold group-hover:text-indigo-700 relative z-10">
                  Try it now <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            </Link>

            {/* Facebook Card */}
            <Link href="/facebook-video-downloader" className="group h-full">
              <div className="bg-slate-50 border border-slate-200 rounded-3xl p-8 hover:shadow-xl hover:border-blue-200 transition-all duration-300 h-full flex flex-col relative overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/5 rounded-bl-full -z-0 group-hover:scale-110 transition-transform" />
                <div className="bg-blue-600 w-16 h-16 rounded-2xl flex items-center justify-center mb-6 shadow-md relative z-10">
                  <FaFacebook className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-slate-900 mb-3 relative z-10">Facebook Downloader</h3>
                <p className="text-slate-600 mb-6 flex-grow relative z-10">Save public videos and reels from Facebook directly to your gallery.</p>
                <div className="flex items-center text-blue-600 font-semibold group-hover:text-blue-700 relative z-10">
                  Try it now <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            </Link>

            {/* YouTube Card */}
            <Link href="/youtube-video-downloader" className="group h-full">
              <div className="bg-slate-50 border border-slate-200 rounded-3xl p-8 hover:shadow-xl hover:border-red-200 transition-all duration-300 h-full flex flex-col relative overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-red-500/5 rounded-bl-full -z-0 group-hover:scale-110 transition-transform" />
                <div className="bg-red-600 w-16 h-16 rounded-2xl flex items-center justify-center mb-6 shadow-md relative z-10">
                  <FaYoutube className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-slate-900 mb-3 relative z-10">YouTube Downloader</h3>
                <p className="text-slate-600 mb-6 flex-grow relative z-10">Download YouTube Shorts and high-definition videos instantly.</p>
                <div className="flex items-center text-red-600 font-semibold group-hover:text-red-700 relative z-10">
                  Try it now <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="w-full py-20 bg-slate-50 border-t border-slate-200">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            <div className="text-center flex flex-col items-center">
              <div className="bg-white p-4 rounded-full shadow-sm border border-slate-100 mb-4">
                <Shield className="w-8 h-8 text-indigo-500" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-2">100% Secure</h3>
              <p className="text-slate-600">No login required. We don&apos;t save your download history.</p>
            </div>
            <div className="text-center flex flex-col items-center">
              <div className="bg-white p-4 rounded-full shadow-sm border border-slate-100 mb-4">
                <Zap className="w-8 h-8 text-pink-500" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-2">Lightning Fast</h3>
              <p className="text-slate-600">Optimized servers ensure your downloads complete in seconds.</p>
            </div>
            <div className="text-center flex flex-col items-center">
              <div className="bg-white p-4 rounded-full shadow-sm border border-slate-100 mb-4">
                <Smartphone className="w-8 h-8 text-emerald-500" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-2">Any Device</h3>
              <p className="text-slate-600">Works flawlessly on PC, Mac, iOS, Android, and tablets.</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
