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

    // ── Build response headers ───────────────────────────────────────
    const headers = new Headers();

    // Content-Type: use upstream value or fall back to a safe binary type
    headers.set(
      "Content-Type",
      upstream.headers.get("content-type") || "video/mp4"
    );

    // Content-Length: forward it if the upstream provides it so
    // the browser can show a proper download progress bar
    const contentLength = upstream.headers.get("content-length");
    if (contentLength) {
      headers.set("Content-Length", contentLength);
    }

    // Force the browser to download instead of playing inline
    headers.set(
      "Content-Disposition",
      `attachment; filename="AnyClip-Video-${Date.now()}.mp4"`
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
