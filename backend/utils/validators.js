/**
 * URL validators for each supported platform.
 * Returns `true` when the URL matches at least one known pattern.
 */

const INSTAGRAM_PATTERNS = [
  /^https?:\/\/(www\.)?instagram\.com\/(p|reel|reels|tv)\/[A-Za-z0-9_-]+/i,
  /^https?:\/\/instagr\.am\/p\/[A-Za-z0-9_-]+/i,
];

const FACEBOOK_PATTERNS = [
  /^https?:\/\/(www\.|m\.|web\.)?facebook\.com\/.*\/videos\//i,
  /^https?:\/\/(www\.|m\.|web\.)?facebook\.com\/watch\//i,
  /^https?:\/\/(www\.|m\.|web\.)?facebook\.com\/reel\//i,
  /^https?:\/\/(www\.|m\.|web\.)?facebook\.com\/share\/v\//i,
  /^https?:\/\/(www\.|m\.|web\.)?facebook\.com\/share\/r\//i,
  /^https?:\/\/(www\.|m\.|web\.)?facebook\.com\/share\/p\//i,
  /^https?:\/\/(www\.|m\.|web\.)?facebook\.com\/share\//i,
  /^https?:\/\/(www\.|m\.)?facebook\.com\/[A-Za-z0-9.]+\/videos\//i,
  /^https?:\/\/fb\.watch\/[A-Za-z0-9_-]+/i,
  /^https?:\/\/(www\.|m\.|web\.)?facebook\.com\/video\.php/i,
];

const YOUTUBE_PATTERNS = [
  /^https?:\/\/(www\.)?youtube\.com\/watch\?v=[A-Za-z0-9_-]{11}/i,
  /^https?:\/\/youtu\.be\/[A-Za-z0-9_-]{11}/i,
  /^https?:\/\/(www\.)?youtube\.com\/shorts\/[A-Za-z0-9_-]{11}/i,
  /^https?:\/\/(www\.)?youtube\.com\/embed\/[A-Za-z0-9_-]{11}/i,
  /^https?:\/\/m\.youtube\.com\/watch\?v=[A-Za-z0-9_-]{11}/i,
];

export const isValidInstagramUrl = (url) =>
  INSTAGRAM_PATTERNS.some((p) => p.test(url));

export const isValidFacebookUrl = (url) =>
  FACEBOOK_PATTERNS.some((p) => p.test(url));

export const isValidYouTubeUrl = (url) =>
  YOUTUBE_PATTERNS.some((p) => p.test(url));

/**
 * Extract the Instagram shortcode from a URL.
 */
export function extractInstagramShortcode(url) {
  const match = url.match(
    /instagram\.com\/(?:p|reel|reels|tv)\/([A-Za-z0-9_-]+)/i
  );
  return match ? match[1] : null;
}

/**
 * Normalise any IG URL into a canonical post URL.
 */
export function normaliseInstagramUrl(url) {
  const shortcode = extractInstagramShortcode(url);
  return shortcode ? `https://www.instagram.com/p/${shortcode}/` : url;
}
