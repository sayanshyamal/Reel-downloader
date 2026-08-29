import { NextRequest } from "next/server";

/**
 * Edge Runtime gives us true zero-copy streaming.
 * The Node.js serverless runtime may buffer the upstream response
 * before flushing it to the client — Edge does not.
 */
export const runtime = "edge";

/** Allowed protocols for the upstream URL (prevent SSRF). */
const ALLOWED_PROTOCOLS = new Set(["http:", "https:"]);

export async function GET(req: NextRequest) {
  try {
    const url = req.nextUrl.searchParams.get("url");

    if (!url) {
      return Response.json(
        { error: "Missing url parameter" },
        { status: 400 }
      );
    }

    // ── Validate URL to prevent SSRF attacks ─────────────────────────
    let parsed: URL;
    try {
      parsed = new URL(url);
    } catch {
      return Response.json({ error: "Invalid url" }, { status: 400 });
    }

    if (!ALLOWED_PROTOCOLS.has(parsed.protocol)) {
      return Response.json(
        { error: "Only HTTP(S) URLs are allowed" },
        { status: 400 }
      );
    }

    // ── Fetch upstream — do NOT await the body ───────────────────────
    const upstream = await fetch(url);

    if (!upstream.ok) {
      return Response.json(
        { error: `Upstream responded with ${upstream.status} ${upstream.statusText}` },
        { status: upstream.status }
      );
    }

    const requestedFilename = req.nextUrl.searchParams.get("filename");
    const mediaType = req.nextUrl.searchParams.get("type"); // "image" | "video" | "audio" | "photo"
    const upstreamContentType = upstream.headers.get("content-type") || "";

    // Determine appropriate Content-Type and extension
    let resolvedContentType = upstreamContentType;
    let defaultExt = "mp4";

    if (
      mediaType === "image" ||
      mediaType === "photo" ||
      upstreamContentType.startsWith("image/")
    ) {
      resolvedContentType = upstreamContentType || "image/jpeg";
      defaultExt = upstreamContentType.includes("png")
        ? "png"
        : upstreamContentType.includes("webp")
        ? "webp"
        : "jpg";
    } else if (
      mediaType === "audio" ||
      upstreamContentType.startsWith("audio/")
    ) {
      resolvedContentType = upstreamContentType || "audio/mpeg";
      defaultExt = "mp3";
    } else {
      resolvedContentType = upstreamContentType || "video/mp4";
      defaultExt = upstreamContentType.includes("webm") ? "webm" : "mp4";
    }

    // ── Build response headers ───────────────────────────────────────
    const headers = new Headers();
    headers.set("Content-Type", resolvedContentType);

    // Content-Length: forward it if the upstream provides it
    const contentLength = upstream.headers.get("content-length");
    if (contentLength) {
      headers.set("Content-Length", contentLength);
    }

    // Build clean filename
    const safeFilename =
      requestedFilename && requestedFilename.trim()
        ? requestedFilename.trim().replace(/[^a-zA-Z0-9._-]/g, "_")
        : `AnyClip-${
            mediaType === "photo" || mediaType === "image"
              ? "Photo"
              : mediaType === "audio"
              ? "Audio"
              : "Media"
          }-${Date.now()}.${defaultExt}`;

    // Force the browser to download instead of playing inline
    headers.set(
      "Content-Disposition",
      `attachment; filename="${safeFilename}"`
    );

    // ── Stream the body directly — no buffering ──────────────────────
    // `upstream.body` is a ReadableStream<Uint8Array>.
    // Passing it straight into the Response constructor means data
    // flows from the CDN → Edge Worker → Client with zero buffering.
    return new Response(upstream.body, {
      status: 200,
      headers,
    });
  } catch (error) {
    console.error("Force download proxy error:", error);
    return Response.json(
      { error: "Internal server error during proxy" },
      { status: 500 }
    );
  }
}
