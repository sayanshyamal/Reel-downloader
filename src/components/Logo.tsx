import Link from "next/link";

interface LogoProps {
  size?: "sm" | "md" | "lg";
  variant?: "light" | "dark";
}

export default function Logo({ size = "md", variant = "dark" }: LogoProps) {
  const sizes = {
    sm: { icon: 28, text: "text-lg" },
    md: { icon: 32, text: "text-xl" },
    lg: { icon: 40, text: "text-2xl" },
  };

  const { icon, text } = sizes[size];

  return (
    <Link href="/" className="flex items-center gap-2.5 group" aria-label="AnyClip Home">
      {/* SVG Logo Mark */}
      <div className="relative">
        <svg
          width={icon}
          height={icon}
          viewBox="0 0 40 40"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="drop-shadow-sm group-hover:scale-105 transition-transform duration-200"
        >
          <defs>
            <linearGradient id="logoGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#6366f1" />
              <stop offset="50%" stopColor="#8b5cf6" />
              <stop offset="100%" stopColor="#ec4899" />
            </linearGradient>
          </defs>
          {/* Rounded square background */}
          <rect
            x="2"
            y="2"
            width="36"
            height="36"
            rx="10"
            fill="url(#logoGradient)"
          />
          {/* Play triangle */}
          <path
            d="M16 12 L16 28 L30 20 Z"
            fill="white"
            fillOpacity="0.95"
          />
          {/* Small download arrow at bottom-right */}
          <path
            d="M28 26 L28 31 M25 29 L28 32 L31 29"
            stroke="white"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            opacity="0.8"
          />
        </svg>
      </div>

      {/* Text */}
      <span className={`${text} font-extrabold tracking-tight ${variant === "dark" ? "text-slate-900" : "text-white"}`}>
        Any
        <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-500 to-pink-500">
          Clip
        </span>
      </span>
    </Link>
  );
}
