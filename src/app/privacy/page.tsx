import { Metadata } from "next";
import Link from "next/link";
import { Shield, Lock, EyeOff, Server, FileText, ArrowLeft } from "lucide-react";

export const metadata: Metadata = {
  title: "Privacy Policy — AnyClip",
  description:
    "Learn how AnyClip protects your privacy. We do not store your personal information, tracking logs, or downloaded videos.",
  alternates: {
    canonical: "/privacy",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function PrivacyPolicyPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: "Privacy Policy — AnyClip",
    url: "https://reels.sayan.studio/privacy",
    description: "AnyClip Privacy Policy and data protection terms.",
  };

  return (
    <div className="container mx-auto px-4 py-12 md:py-16 max-w-4xl">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c"),
        }}
      />

      <Link
        href="/"
        className="inline-flex items-center gap-2 text-sm text-indigo-600 hover:text-indigo-700 font-semibold mb-8 group"
      >
        <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
        Back to Home
      </Link>

      <div className="bg-white rounded-3xl border border-slate-200 p-6 md:p-12 shadow-sm">
        <div className="flex items-center gap-3 mb-6">
          <div className="p-3 bg-indigo-50 text-indigo-600 rounded-2xl">
            <Shield className="w-8 h-8" />
          </div>
          <div>
            <h1 className="text-3xl md:text-4xl font-extrabold text-slate-900">
              Privacy Policy
            </h1>
            <p className="text-sm text-slate-500 mt-1">
              Last Updated: March 2025 • Effective immediately
            </p>
          </div>
        </div>

        <div className="prose prose-slate max-w-none space-y-8 text-slate-600 leading-relaxed">
          <section>
            <h2 className="text-xl font-bold text-slate-900 mb-3 flex items-center gap-2">
              <Lock className="w-5 h-5 text-indigo-500" />
              1. Our Core Privacy Commitment
            </h2>
            <p>
              At AnyClip (accessible from{" "}
              <Link href="/" className="text-indigo-600 underline">
                https://reels.sayan.studio
              </Link>
              ), user privacy is our highest priority. AnyClip is built from the
              ground up as a privacy-first utility: <strong>we do not require user
              accounts</strong>, we do not require email addresses, and we never
              track or archive your download history.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-slate-900 mb-3 flex items-center gap-2">
              <Server className="w-5 h-5 text-indigo-500" />
              2. Data We Do NOT Collect
            </h2>
            <ul className="list-disc pl-6 space-y-2">
              <li>
                <strong>No Video Storage:</strong> We do not store, host, or
                archive any videos, images, or audio files on our servers. All
                media is fetched on-the-fly directly from public Content Delivery
                Networks (CDNs).
              </li>
              <li>
                <strong>No Personal Data:</strong> We do not ask for or collect your
                name, email, phone number, social media passwords, or credentials.
              </li>
              <li>
                <strong>No Download Logs:</strong> We do not log which user or IP
                address requested a specific video link.
              </li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-bold text-slate-900 mb-3 flex items-center gap-2">
              <EyeOff className="w-5 h-5 text-indigo-500" />
              3. Information Automatically Processed
            </h2>
            <p>
              When you submit a URL to be processed, our server temporarily parses
              the public web page to locate the direct media streaming link. This
              processing occurs entirely in volatile memory (RAM) and is purged
              immediately upon delivery to your browser.
            </p>
            <p className="mt-3">
              Standard web server logs may temporarily record basic technical
              metadata (such as your browser user-agent and request timestamp)
              solely for DDoS prevention, rate limiting, and server health
              monitoring. These operational logs are rotated and discarded
              regularly.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-slate-900 mb-3 flex items-center gap-2">
              <FileText className="w-5 h-5 text-indigo-500" />
              4. Cookies and Local Storage
            </h2>
            <p>
              AnyClip uses local browser state only for basic UI preferences (such
              as remembering your chosen tab or theme). We do not deploy
              cross-site tracking cookies or advertising telemetry pixels.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-slate-900 mb-3">
              5. Third-Party Websites and Services
            </h2>
            <p>
              AnyClip acts as a bridge to publicly available content on Instagram,
              Facebook, and YouTube. Once you download media or follow links to
              third-party platforms, their respective privacy policies govern
              their services. We encourage you to review the privacy policies of
              those platforms.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-slate-900 mb-3">
              6. Children&apos;s Privacy
            </h2>
            <p>
              AnyClip does not knowingly collect any personally identifiable
              information from children under the age of 13. If you believe that a
              minor has provided personal information on our website, please
              contact us immediately and we will promptly remove such records.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-slate-900 mb-3">
              7. Changes to This Privacy Policy
            </h2>
            <p>
              We may update our Privacy Policy periodically. Any changes will be
              posted on this page with an updated &quot;Last Updated&quot; date.
              Continued use of the website constitutes acceptance of the modified
              terms.
            </p>
          </section>

          <section className="pt-4 border-t border-slate-200">
            <h2 className="text-xl font-bold text-slate-900 mb-3">
              8. Contact Us Regarding Privacy
            </h2>
            <p>
              If you have any questions, feedback, or concerns regarding this
              Privacy Policy or our data handling practices, please contact us
              via our{" "}
              <Link href="/contact" className="text-indigo-600 underline font-semibold">
                Contact Page
              </Link>
              .
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
