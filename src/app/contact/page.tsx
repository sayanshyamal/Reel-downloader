import { Metadata } from "next";
import Link from "next/link";
import { Mail, MessageSquare, Clock, ShieldCheck, ArrowLeft } from "lucide-react";

export const metadata: Metadata = {
  title: "Contact Us & DMCA Takedown — AnyClip",
  description:
    "Get in touch with the AnyClip team for support, feature requests, business inquiries, or DMCA copyright notices.",
  alternates: {
    canonical: "/contact",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function ContactPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "ContactPage",
    name: "Contact AnyClip",
    url: "https://reels.sayan.studio/contact",
    description: "Contact AnyClip for support, feedback, and DMCA inquiries.",
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
            <Mail className="w-8 h-8" />
          </div>
          <div>
            <h1 className="text-3xl md:text-4xl font-extrabold text-slate-900">
              Contact Us & Support
            </h1>
            <p className="text-sm text-slate-500 mt-1">
              Have questions, feedback, or a copyright inquiry? We are here to help.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
          <div className="p-6 rounded-2xl bg-slate-50 border border-slate-200 flex flex-col items-center text-center">
            <Mail className="w-6 h-6 text-indigo-600 mb-3" />
            <h3 className="font-bold text-slate-900 mb-1">Email Support</h3>
            <p className="text-xs text-slate-500 mb-2">Direct email assistance</p>
            <span className="text-sm font-semibold text-indigo-600">
              contact@sayan.studio
            </span>
          </div>

          <div className="p-6 rounded-2xl bg-slate-50 border border-slate-200 flex flex-col items-center text-center">
            <Clock className="w-6 h-6 text-pink-600 mb-3" />
            <h3 className="font-bold text-slate-900 mb-1">Response Time</h3>
            <p className="text-xs text-slate-500 mb-2">Typically within</p>
            <span className="text-sm font-semibold text-slate-700">
              24 to 48 hours
            </span>
          </div>

          <div className="p-6 rounded-2xl bg-slate-50 border border-slate-200 flex flex-col items-center text-center">
            <ShieldCheck className="w-6 h-6 text-emerald-600 mb-3" />
            <h3 className="font-bold text-slate-900 mb-1">DMCA & Legal</h3>
            <p className="text-xs text-slate-500 mb-2">Fast URL takedowns</p>
            <span className="text-sm font-semibold text-emerald-600">
              dmca@sayan.studio
            </span>
          </div>
        </div>

        <div className="prose prose-slate max-w-none space-y-6 text-slate-600 leading-relaxed">
          <section>
            <h2 className="text-xl font-bold text-slate-900 mb-3 flex items-center gap-2">
              <MessageSquare className="w-5 h-5 text-indigo-500" />
              General Inquiries & Feedback
            </h2>
            <p>
              Whether you encountered a bug, have a feature suggestion (such as
              adding support for new media platforms), or need assistance
              downloading a specific post, please send an email detailing:
            </p>
            <ul className="list-disc pl-6 space-y-1 mt-2 text-sm">
              <li>The URL you tried to download (if reporting an error)</li>
              <li>Your device and browser (e.g., Chrome on Android, Safari on iOS)</li>
              <li>A brief description of what happened</li>
            </ul>
          </section>

          <section className="pt-4 border-t border-slate-200">
            <h2 className="text-xl font-bold text-slate-900 mb-3 flex items-center gap-2">
              <ShieldCheck className="w-5 h-5 text-indigo-500" />
              DMCA Copyright Notice Procedure
            </h2>
            <p className="text-sm">
              AnyClip respects the intellectual property rights of copyright
              holders. AnyClip does not store or host any content. If you are a
              content owner and would like certain content or URLs to be blocked
              from being resolved by our service, please provide the following in
              your notice to <strong>dmca@sayan.studio</strong>:
            </p>
            <ol className="list-decimal pl-6 space-y-1 mt-2 text-sm">
              <li>Identification of the copyrighted work claimed to be infringed.</li>
              <li>The exact URL(s) you request to be blocked.</li>
              <li>Your contact information (name, address, telephone number, and email).</li>
              <li>
                A statement that you have a good faith belief that the disputed use
                is not authorized by the copyright owner, its agent, or the law.
              </li>
              <li>
                A statement under penalty of perjury that the information in your
                notice is accurate and that you are authorized to act on behalf of
                the copyright owner.
              </li>
            </ol>
            <p className="text-sm mt-3">
              Upon receiving a valid takedown notice, we will blacklist the
              specified URLs within 48 business hours.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
