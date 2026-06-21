import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ScrollToTop from "@/components/ScrollToTop";
import SeoHead from "@/components/SeoHead";
import {
  contentLastUpdated,
  contentLastUpdatedLabel,
  entityFaqs,
  getBreadcrumbStructuredData,
  getCanonicalUrl,
  getPrimaryEntityGraph,
  homeFaqs,
  schemaIds,
} from "@/lib/seo";

const faqItems = [...entityFaqs, ...homeFaqs.filter((faq) => !entityFaqs.some((item) => item.question === faq.question))];

export default function Faq() {
  const canonical = getCanonicalUrl("/faq");
  const structuredData = [
    {
      "@context": "https://schema.org",
      "@graph": [
        ...getPrimaryEntityGraph(),
        {
          "@type": "CollectionPage",
          "@id": `${canonical}#page`,
          url: canonical,
          name: "Effect3 FAQ",
          description:
            "Direct answers about Effect3, AI operating systems, inbound automation, lead revival, AI voice workflows, and deployment fit.",
          isPartOf: { "@id": schemaIds.website },
          about: { "@id": schemaIds.organization },
          inLanguage: "en",
          dateModified: contentLastUpdated,
        },
        getBreadcrumbStructuredData(`${canonical}#breadcrumb`, [
          { name: "Home", item: getCanonicalUrl("/") },
          { name: "FAQ", item: canonical },
        ]),
        {
          "@type": "FAQPage",
          "@id": `${canonical}#faq`,
          mainEntity: faqItems.map((faq) => ({
            "@type": "Question",
            name: faq.question,
            acceptedAnswer: {
              "@type": "Answer",
              text: faq.answer,
            },
          })),
        },
      ],
    },
  ];

  return (
    <>
      <SeoHead
        title="Effect3 FAQ | AI Operating Systems, Inbound Automation, Lead Revival, and AI Voice"
        description="Read direct answers about Effect3, AI operating systems, inbound automation, lead revival, ManyChat replacement, Claude automation, and AI voice workflows."
        canonical={canonical}
        structuredData={structuredData}
      />
      <div className="min-h-screen bg-black text-white">
        <Navbar />
        <main>
          <section className="relative overflow-hidden border-b border-white/8 px-6 pb-18 pt-32 md:px-10 md:pb-24 md:pt-40 lg:px-16">
            <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_left,_rgba(249,115,22,0.14),_transparent_26%),radial-gradient(circle_at_80%_10%,_rgba(255,237,220,0.08),_transparent_24%),linear-gradient(180deg,_#040404_0%,_#090909_58%,_#050505_100%)]" />
            <div className="relative z-10 mx-auto max-w-7xl">
              <div className="inline-flex items-center rounded-full border border-white/10 bg-white/[0.03] px-3 py-1.5 text-[11px] uppercase tracking-[0.22em] text-white/42">
                Updated {contentLastUpdatedLabel}
              </div>
              <h1 className="mt-6 max-w-5xl text-4xl font-extralight leading-[1.02] tracking-tight text-white/94 sm:text-5xl md:text-6xl">
                Direct answers for buyers, search engines, and AI retrieval.
              </h1>
              <p className="mt-6 max-w-3xl text-base font-light leading-8 text-white/60 md:text-lg">
                This FAQ page is the clearest answer surface on the site for questions about Effect3, AI
                operating systems, inbound automation, lead revival, AI voice workflows, and deployment fit.
              </p>
            </div>
          </section>

          <section className="px-6 py-16 md:px-10 lg:px-16">
            <div className="mx-auto max-w-7xl">
              <div className="grid gap-4">
                {faqItems.map((faq) => (
                  <article key={faq.question} className="rounded-[26px] border border-white/10 bg-white/[0.03] p-6">
                    <h2 className="text-lg font-light text-white/92">{faq.question}</h2>
                    <p className="mt-3 text-sm font-light leading-7 text-white/60">{faq.answer}</p>
                  </article>
                ))}
              </div>
            </div>
          </section>

          <section className="px-6 pb-20 pt-4 md:px-10 lg:px-16">
            <div className="mx-auto max-w-7xl rounded-[30px] border border-white/10 bg-white/[0.03] p-8">
              <div className="grid gap-6 lg:grid-cols-[1fr_auto] lg:items-end">
                <div>
                  <p className="text-[11px] uppercase tracking-[0.22em] text-white/34">Keep exploring</p>
                  <h2 className="mt-4 text-3xl font-extralight tracking-tight text-white/94 md:text-4xl">
                    Move from direct answers into category and proof.
                  </h2>
                  <p className="mt-4 max-w-2xl text-sm font-light leading-7 text-white/58">
                  These next pages give more context on the category, the deployment model, and the proof
                  behind the answers above.
                </p>
              </div>
                <Link
                  to="/?intent=review&source=faq-page&workflow=Effect3%20System%20Review"
                  className="inline-flex items-center gap-2 rounded-2xl border border-white/10 bg-white px-5 py-3 text-sm font-medium tracking-tight text-black transition-colors duration-200 hover:bg-white/90"
                >
                  Book a system review
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
              <div className="mt-8 grid gap-3 md:grid-cols-5">
                <Link to="/company" className="rounded-2xl border border-white/10 px-4 py-4 text-sm font-light text-white/70 transition-colors duration-200 hover:bg-white/5 hover:text-white">
                  Company
                </Link>
                <Link to="/effect3-vs-manychat" className="rounded-2xl border border-white/10 px-4 py-4 text-sm font-light text-white/70 transition-colors duration-200 hover:bg-white/5 hover:text-white">
                  Effect3 vs ManyChat
                </Link>
                <Link to="/ai-search-prompts" className="rounded-2xl border border-white/10 px-4 py-4 text-sm font-light text-white/70 transition-colors duration-200 hover:bg-white/5 hover:text-white">
                  AI Search Prompts
                </Link>
                <Link to="/ai-operating-systems" className="rounded-2xl border border-white/10 px-4 py-4 text-sm font-light text-white/70 transition-colors duration-200 hover:bg-white/5 hover:text-white">
                  AI Operating Systems
                </Link>
                <Link to="/case-studies" className="rounded-2xl border border-white/10 px-4 py-4 text-sm font-light text-white/70 transition-colors duration-200 hover:bg-white/5 hover:text-white">
                  Case Studies
                </Link>
              </div>
            </div>
          </section>
        </main>
        <Footer />
        <ScrollToTop />
      </div>
    </>
  );
}
