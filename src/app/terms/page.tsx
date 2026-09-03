import { Metadata } from "next";
import Link from "next/link";
import { FileText, CheckCircle, AlertTriangle, Copyright, Scale, ArrowLeft } from "lucide-react";

export const metadata: Metadata = {
  title: "Terms of Service — AnyClip",
  description:
    "Review AnyClip's Terms of Service, acceptable use guidelines, fair use policy, and copyright/DMCA disclaimer.",
  alternates: {
    canonical: "/terms",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function TermsOfServicePage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: "Terms of Service — AnyClip",
    url: "https://reels.sayan.studio/terms",
    description: "AnyClip Terms of Service and acceptable use policy.",
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
            <FileText className="w-8 h-8" />
          </div>
          <div>
            <h1 className="text-3xl md:text-4xl font-extrabold text-slate-900">
              Terms of Service
            </h1>
            <p className="text-sm text-slate-500 mt-1">
              Last Updated: March 2025 • Effective immediately
            </p>
          </div>
        </div>

        <div className="prose prose-slate max-w-none space-y-8 text-slate-600 leading-relaxed">
          <section>
            <h2 className="text-xl font-bold text-slate-900 mb-3 flex items-center gap-2">
              <CheckCircle className="w-5 h-5 text-indigo-500" />
              1. Agreement to Terms
            </h2>
            <p>
              By accessing or using AnyClip (
              <Link href="/" className="text-indigo-600 underline">
                https://reels.sayan.studio
              </Link>
              ), you agree to be bound by these Terms of Service. If you do not
              agree with any part of these terms, you must discontinue use of the
              website immediately.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-slate-900 mb-3 flex items-center gap-2">
              <Scale className="w-5 h-5 text-indigo-500" />
              2. Nature of the Service
            </h2>
            <p>
              AnyClip provides a free web-based utility that enables users to
              download and backup publicly accessible online video and multimedia
              content from supported social platforms (such as Instagram,
              Facebook, and YouTube) for personal, non-commercial, and offline
              viewing purposes.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-slate-900 mb-3 flex items-center gap-2">
              <Copyright className="w-5 h-5 text-indigo-500" />
              3. Copyright and Intellectual Property Disclaimer
            </h2>
            <p>
              <strong>AnyClip does NOT host, store, replicate, or broadcast</strong>{" "}
              any media files or copyrighted material on its own servers. All media
              files downloaded through AnyClip are served directly from the Content
              Delivery Networks (CDNs) of the respective third-party platforms.
            </p>
            <p className="mt-3">
              Users are solely responsible for ensuring that their download and
              use of any content comply with applicable copyright laws, fair use
              doctrines, and the terms of the original content publishers. You must
              not use AnyClip to infringe upon the intellectual property rights of
              any creator, artist, or publisher.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-slate-900 mb-3 flex items-center gap-2">
              <AlertTriangle className="w-5 h-5 text-amber-500" />
              4. Non-Affiliation Disclaimer
            </h2>
            <p>
              AnyClip is an independent tool and is <strong>NOT affiliated,
              associated, authorized, endorsed by, or in any way officially
              connected</strong> with Instagram, Meta Platforms Inc., Facebook,
              YouTube, Google LLC, or any of their subsidiaries or affiliates.
              The names Instagram, Facebook, and YouTube, as well as related
              names, marks, emblems, and images are registered trademarks of
              their respective owners.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-slate-900 mb-3">
              5. Acceptable Use
            </h2>
            <p>When using AnyClip, you agree not to:</p>
            <ul className="list-disc pl-6 space-y-2 mt-2">
              <li>
                Attempt to bypass, disable, or interfere with security features or
                rate limits of the website.
              </li>
              <li>
                Use automated scripts, bots, or crawlers to send excessive batch
                requests that degrade service performance for other users.
              </li>
              <li>
                Redistribute, sell, or commercialize downloaded content without the
                explicit written permission of the copyright owner.
              </li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-bold text-slate-900 mb-3">
              6. DMCA and Copyright Takedowns
            </h2>
            <p>
              AnyClip respects the intellectual property rights of others. If you
              are a copyright owner or an agent thereof and believe that any link
              resolution capability infringes upon your copyright, please contact
              us via our{" "}
              <Link href="/contact" className="text-indigo-600 underline font-semibold">
                Contact Page
              </Link>
              . We will promptly review and blacklist any requested URLs from our
              system.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-slate-900 mb-3">
              7. Limitation of Liability & Warranty Disclaimer
            </h2>
            <p>
              AnyClip is provided on an &quot;AS IS&quot; and &quot;AS AVAILABLE&quot;
              basis without warranties of any kind, whether express or implied. In
              no event shall AnyClip or its operators be liable for any direct,
              indirect, incidental, or consequential damages resulting from the use
              or inability to use the service.
            </p>
          </section>

          <section className="pt-4 border-t border-slate-200">
            <h2 className="text-xl font-bold text-slate-900 mb-3">
              8. Contact Information
            </h2>
            <p>
              For inquiries regarding these Terms of Service, please reach out
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
