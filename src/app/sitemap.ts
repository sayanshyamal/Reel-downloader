import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://reels.sayan.studio";
  const lastModified = new Date();

  return [
    {
      url: baseUrl,
      lastModified,
      changeFrequency: "weekly",
      priority: 1.0,
    },
    // ─── Instagram Pages ───
    {
      url: `${baseUrl}/instagram-downloader`,
      lastModified,
      changeFrequency: "weekly",
      priority: 0.95,
    },
    {
      url: `${baseUrl}/instagram-story-downloader`,
      lastModified,
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: `${baseUrl}/instagram-photo-downloader`,
      lastModified,
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: `${baseUrl}/instagram-video-downloader`,
      lastModified,
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: `${baseUrl}/instagram-audio-downloader`,
      lastModified,
      changeFrequency: "weekly",
      priority: 0.85,
    },
    // ─── Facebook ───
    {
      url: `${baseUrl}/facebook-video-downloader`,
      lastModified,
      changeFrequency: "weekly",
      priority: 0.9,
    },
    // ─── YouTube ───
    {
      url: `${baseUrl}/youtube-video-downloader`,
      lastModified,
      changeFrequency: "weekly",
      priority: 0.9,
    },
  ];
}
