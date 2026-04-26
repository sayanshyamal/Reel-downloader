"use client";

import Link from "next/link";
import { Instagram, Facebook, Youtube } from "lucide-react";
import { usePathname } from "next/navigation";
import Logo from "./Logo";

export default function Navbar() {
  const pathname = usePathname();

  const navLinks = [
    { 
      name: "Instagram", 
      href: "/instagram-downloader", 
      icon: Instagram, 
      activeColor: "text-pink-600 bg-pink-50",
      desktopActive: "text-pink-600 bg-pink-50"
    },
    { 
      name: "Facebook", 
      href: "/facebook-video-downloader", 
      icon: Facebook, 
      activeColor: "text-blue-600 bg-blue-50",
      desktopActive: "text-blue-600 bg-blue-50"
    },
    { 
      name: "YouTube", 
      href: "/youtube-video-downloader", 
      icon: Youtube, 
      activeColor: "text-red-600 bg-red-50",
      desktopActive: "text-red-600 bg-red-50"
    },
  ];

  return (
    <nav className="fixed w-full z-50 bg-white/70 backdrop-blur-md border-b border-slate-200/50 shadow-sm transition-all duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex-shrink-0">
            <Logo size="sm" variant="dark" />
          </div>
          
          {/* Desktop Menu */}
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-8">
              {navLinks.map((link) => {
                const isActive = pathname === link.href;
                return (
                  <Link
                    key={link.name}
                    href={link.href}
                    className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                      isActive
                        ? link.desktopActive
                        : "text-slate-600 hover:text-slate-900 hover:bg-slate-50"
                    }`}
                  >
                    {link.name}
                  </Link>
                );
              })}
            </div>
          </div>
          
          {/* Mobile Menu (Side-by-side Icons) */}
          <div className="flex md:hidden items-center space-x-2">
            {navLinks.map((link) => {
              const isActive = pathname === link.href;
              const Icon = link.icon;
              return (
                <Link
                  key={link.name}
                  href={link.href}
                  aria-label={link.name}
                  className={`p-2 rounded-full transition-colors ${
                    isActive
                      ? link.activeColor
                      : "text-slate-500 hover:text-slate-900 hover:bg-slate-100"
                  }`}
                >
                  <Icon className="w-5 h-5" strokeWidth={isActive ? 2.5 : 2} />
                </Link>
              );
            })}
          </div>
        </div>
      </div>
    </nav>
  );
}
