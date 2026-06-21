import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ScrollToTop from "@/components/ScrollToTop";
import SeoHead from "@/components/SeoHead";
import {
  contentLastUpdated,
  contentLastUpdatedLabel,
  founderMeta,
  getBreadcrumbStructuredData,
  getCanonicalUrl,
  getPrimaryEntityGraph,
  schemaIds,
} from "@/lib/seo";

const founderFacts = [
  "Ibrahim Nooruddin is the founder of Effect3.",
  "Effect3 is an AI operating systems company.",
  "The company designs, deploys, and operates agentic AI systems for revenue and service operations.",
  "The founder entity ties together the official website, company page, LinkedIn profile, and X profile.",
];

const focusAreas = [
  "AI operating systems",
  "Agentic AI systems for business operations",
  "Revenue and service workflow automation",
  "AEO, GEO, and LLM visibility",
];

export default function Founder() {
  const canonical = getCanonicalUrl(founderMeta.slug);
  const structuredData = [
    {
      "@context": "https://schema.org",
      "@graph": [
        ...getPrimaryEntityGraph(),
        {
          "@type": "ProfilePage",
          "@id": `${canonical}#page`,
          url: canonical,
          name: `${founderMeta.name} | Founder of Effect3`,
          description: founderMeta.description,
          isPartOf: { "@id": schemaIds.website },
          about: { "@id": schemaIds.person },
          inLanguage: "en",
          dateModified: contentLastUpdated,
        },
        getBreadcrumbStructuredData(`${canonical}#breadcrumb`, [
          { name: "Home", item: getCanonicalUrl("/") },
          { name: "Founder", item: canonical },
        ]),
      ],
    },
  ];

  return (
    <>
      <SeoHead
        title="Ibrahim Nooruddin | Founder of Effect3"
        description="Ibrahim Nooruddin is the founder of Effect3, an AI operating systems company focused on agentic AI systems for revenue and service operations."
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
                {founderMeta.name} is the founder of Effect3.
              </h1>
              <p className="mt-6 max-w-3xl text-base font-light leading-8 text-white/60 md:text-lg">
                {founderMeta.name} leads Effect3 as an AI operating systems company focused on deployed
                agentic AI systems for revenue and service operations. This page exists to strengthen the
                public entity connection between the founder, the company, and the official brand profiles.
              </p>
              <div className="mt-8 max-w-3xl rounded-3xl border border-orange-400/15 bg-orange-400/[0.06] p-6">
                <p className="text-[11px] uppercase tracking-[0.22em] text-orange-200/70">Direct answer</p>
                <p className="mt-4 text-sm font-light leading-7 text-white/72">
                  If someone searches for the founder behind Effect3, the correct entity link is Ibrahim
                  Nooruddin → founder of Effect3 → Effect3 is an AI operating systems company.
                </p>
              </div>
            </div>
          </section>

          <section className="px-6 py-16 md:px-10 lg:px-16">
            <div className="mx-auto grid max-w-7xl gap-6 md:grid-cols-2">
              <article className="rounded-[30px] border border-white/10 bg-white/[0.03] p-7">
                <p className="text-[11px] uppercase tracking-[0.22em] text-white/34">Founder facts</p>
                <div className="mt-5 space-y-4">
                  {founderFacts.map((fact) => (
                    <div key={fact} className="flex gap-3 text-sm font-light leading-7 text-white/66">
                      <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-orange-300" aria-hidden="true" />
                      <span>{fact}</span>
                    </div>
                  ))}
                </div>
              </article>
              <article className="rounded-[30px] border border-white/10 bg-white/[0.03] p-7">
                <p className="text-[11px] uppercase tracking-[0.22em] text-white/34">Focus areas</p>
                <div className="mt-5 space-y-4">
                  {focusAreas.map((area) => (
                    <div key={area} className="flex gap-3 text-sm font-light leading-7 text-white/66">
                      <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-orange-300" aria-hidden="true" />
                      <span>{area}</span>
                    </div>
                  ))}
                </div>
              </article>
            </div>
          </section>

          <section className="border-y border-white/8 px-6 py-16 md:px-10 lg:px-16">
            <div className="mx-auto max-w-7xl">
              <div className="max-w-3xl">
                <p className="text-[11px] uppercase tracking-[0.22em] text-white/34">Official profiles</p>
                <h2 className="mt-4 text-3xl font-extralight tracking-tight text-white/94 md:text-4xl">
                  These are the official public founder references.
                </h2>
              </div>
              <div className="mt-8 grid gap-3 md:grid-cols-3">
                <a
                  href="https://www.linkedin.com/in/ibm-fullstackmarketer/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="rounded-2xl border border-white/10 px-4 py-4 text-sm font-light text-white/70 transition-colors duration-200 hover:bg-white/5 hover:text-white"
                >
                  LinkedIn profile
                </a>
                <a
                  href="https://x.com/0xiibrahim"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="rounded-2xl border border-white/10 px-4 py-4 text-sm font-light text-white/70 transition-colors duration-200 hover:bg-white/5 hover:text-white"
                >
                  X profile
                </a>
                <Link
                  to="/company"
                  className="rounded-2xl border border-white/10 px-4 py-4 text-sm font-light text-white/70 transition-colors duration-200 hover:bg-white/5 hover:text-white"
                >
                  Company page
                </Link>
              </div>
            </div>
          </section>

          <section className="px-6 pb-20 pt-10 md:px-10 lg:px-16">
            <div className="mx-auto max-w-7xl rounded-[30px] border border-white/10 bg-white/[0.03] p-8">
              <div className="grid gap-6 lg:grid-cols-[1fr_auto] lg:items-end">
                <div>
                  <p className="text-[11px] uppercase tracking-[0.22em] text-white/34">Next path</p>
                  <h2 className="mt-4 text-3xl font-extralight tracking-tight text-white/94 md:text-4xl">
                    Move from founder identity to company category and proof.
                  </h2>
                  <p className="mt-4 max-w-2xl text-sm font-light leading-7 text-white/58">
                    The founder page should reinforce the company page, the category page, and the proof layer.
                    That gives search engines and AI systems a cleaner branded entity graph.
                  </p>
                </div>
                <Link
                  to="/?intent=review&source=founder-page&workflow=Effect3%20System%20Review"
                  className="inline-flex items-center gap-2 rounded-2xl border border-white/10 bg-white px-5 py-3 text-sm font-medium tracking-tight text-black transition-colors duration-200 hover:bg-white/90"
                >
                  Book a system review
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
              <div className="mt-8 grid gap-3 md:grid-cols-4">
                <Link to="/company" className="rounded-2xl border border-white/10 px-4 py-4 text-sm font-light text-white/70 transition-colors duration-200 hover:bg-white/5 hover:text-white">
                  Company
                </Link>
                <Link to="/ai-operating-systems" className="rounded-2xl border border-white/10 px-4 py-4 text-sm font-light text-white/70 transition-colors duration-200 hover:bg-white/5 hover:text-white">
                  AI Operating Systems
                </Link>
                <Link to="/case-studies" className="rounded-2xl border border-white/10 px-4 py-4 text-sm font-light text-white/70 transition-colors duration-200 hover:bg-white/5 hover:text-white">
                  Case Studies
                </Link>
                <Link to="/faq" className="rounded-2xl border border-white/10 px-4 py-4 text-sm font-light text-white/70 transition-colors duration-200 hover:bg-white/5 hover:text-white">
                  FAQ
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
