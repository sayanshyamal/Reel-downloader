import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { url: videoUrl } = await req.json();

    if (!videoUrl) {
      return NextResponse.json({ error: "URL is required" }, { status: 400 });
    }

    const response = await fetch(`https://instagram-reels-downloader-api.p.rapidapi.com/download?url=${encodeURIComponent(videoUrl)}`, {
      method: 'GET',
      headers: {
        'x-rapidapi-key': '1d3c664356msh76d4c41dada8eabp1d9fcajsna797af8ee7be', 
        'x-rapidapi-host': 'instagram-reels-downloader-api.p.rapidapi.com'
      }
    });

    if (!response.ok) {
      throw new Error(`RapidAPI responded with status: ${response.status}`);
    }

    const data = await response.json();
    return NextResponse.json(data);

  } catch (error: any) {
    console.error("Instagram API Error:", error.message);
    return NextResponse.json({ error: 'সার্ভার থেকে ডাটা আনতে সমস্যা হয়েছে।' }, { status: 500 });
  }
}
