import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  try {
    const searchParams = req.nextUrl.searchParams;
    const url = searchParams.get("url");

    if (!url) {
      return NextResponse.json({ error: "Missing url parameter" }, { status: 400 });
    }

    // Fetch the video stream from the external URL
    const response = await fetch(url);

    if (!response.ok) {
      return NextResponse.json(
        { error: `Failed to fetch video: ${response.statusText}` },
        { status: response.status }
      );
    }

    // Get the response body as a readable stream
    const fileStream = response.body;
    
    // Attempt to parse the original content type, fallback to mp4
    const contentType = response.headers.get("content-type") || "video/mp4";

    // Set headers to force the browser to download the file rather than play it
    const headers = new Headers();
    headers.set("Content-Type", contentType);
    headers.set("Content-Disposition", `attachment; filename="AnyClip-Video-${Date.now()}.mp4"`);

    // Stream the proxy response directly to the client
    return new NextResponse(fileStream, {
      status: 200,
      headers,
    });
  } catch (error) {
    console.error("Force download proxy error:", error);
    return NextResponse.json({ error: "Internal server error during proxy" }, { status: 500 });
  }
}
