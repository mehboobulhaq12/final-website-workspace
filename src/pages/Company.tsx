import { Link } from "react-router-dom";
import { ArrowRight, Check } from "lucide-react";

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ScrollToTop from "@/components/ScrollToTop";
import SeoHead from "@/components/SeoHead";
import {
  contentLastUpdated,
  contentLastUpdatedLabel,
  coreServices,
  entityFaqs,
  getBreadcrumbStructuredData,
  getCanonicalUrl,
  getPrimaryEntityGraph,
  schemaIds,
  siteMeta,
} from "@/lib/seo";

const companyFacts = [
  "Effect3 is an AI operating systems company.",
  "Effect3 designs, deploys, and operates agentic AI systems for revenue and service operations.",
  "Effect3 focuses on inbound automation, lead revival, AI voice workflows, outreach automation, GTM systems, and operating layers.",
  "Effect3 is not positioned as a generic marketing agency, a chatbot agency, or a freelancer automation studio.",
];

const fitList = [
  "D2C and retail brands",
  "Legal and service businesses",
  "SaaS and growth teams",
  "Enterprise revenue and service teams",
];

const notList = [
  "Generic marketing agency",
  "Chatbot agency",
  "Freelancer automation studio",
  "Pure consulting firm",
  "Foundation model company",
];

export default function Company() {
  const canonical = getCanonicalUrl("/company");
  const structuredData = [
    {
      "@context": "https://schema.org",
      "@graph": [
        ...getPrimaryEntityGraph(),
        {
          "@type": "AboutPage",
          "@id": `${canonical}#page`,
          url: canonical,
          name: "About Effect3",
          description:
            "Effect3 is an AI operating systems company that designs, deploys, and operates agentic AI systems for revenue and service operations.",
          isPartOf: { "@id": schemaIds.website },
          about: { "@id": schemaIds.organization },
          inLanguage: "en",
          dateModified: contentLastUpdated,
        },
        getBreadcrumbStructuredData(`${canonical}#breadcrumb`, [
          { name: "Home", item: getCanonicalUrl("/") },
          { name: "Company", item: canonical },
        ]),
        {
          "@type": "FAQPage",
          "@id": `${canonical}#faq`,
          mainEntity: entityFaqs.map((faq) => ({
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
        title="Effect3 Company | AI Operating Systems for Revenue and Service Operations"
        description="Effect3 is an AI operating systems company that designs, deploys, and operates agentic AI systems for inbound, lead recovery, voice, outreach, and GTM workflows."
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
                Effect3 is an AI operating systems company.
              </h1>
              <p className="mt-6 max-w-3xl text-base font-light leading-8 text-white/60 md:text-lg">
                Effect3 designs, deploys, and operates agentic AI systems for revenue and service operations.
                The company helps enterprises and growth-stage teams turn manual inbound, outreach, lead
                recovery, voice, and GTM workflows into production AI systems tied to measurable outcomes.
              </p>
              <div className="mt-8 max-w-3xl rounded-3xl border border-orange-400/15 bg-orange-400/[0.06] p-6">
                <p className="text-[11px] uppercase tracking-[0.22em] text-orange-200/70">Direct answer</p>
                <p className="mt-4 text-sm font-light leading-7 text-white/72">
                  Effect3 is not positioned as a generic agency or chatbot vendor. It is positioned as a
                  deployment partner for production AI systems across inbound automation, lead recovery, AI
                  voice workflows, outreach automation, and GTM operations.
                </p>
              </div>
            </div>
          </section>

          <section className="px-6 py-16 md:px-10 lg:px-16">
            <div className="mx-auto grid max-w-7xl gap-6 md:grid-cols-2">
              <article className="rounded-[30px] border border-white/10 bg-white/[0.03] p-7">
                <p className="text-[11px] uppercase tracking-[0.22em] text-white/34">Core facts</p>
                <div className="mt-5 space-y-4">
                  {companyFacts.map((fact) => (
                    <div key={fact} className="flex gap-3 text-sm font-light leading-7 text-white/66">
                      <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-orange-300" aria-hidden="true" />
                      <span>{fact}</span>
                    </div>
                  ))}
                </div>
              </article>
              <article className="rounded-[30px] border border-white/10 bg-white/[0.03] p-7">
                <p className="text-[11px] uppercase tracking-[0.22em] text-white/34">What Effect3 deploys</p>
                <div className="mt-5 grid gap-4">
                  {coreServices.map((service) => (
                    <div key={service.name} className="rounded-2xl border border-white/10 bg-black/20 p-4">
                      <h2 className="text-base font-light text-white/90">{service.name}</h2>
                      <p className="mt-2 text-sm font-light leading-7 text-white/60">{service.description}</p>
                    </div>
                  ))}
                </div>
              </article>
            </div>
          </section>

          <section className="border-y border-white/8 px-6 py-16 md:px-10 lg:px-16">
            <div className="mx-auto grid max-w-7xl gap-6 md:grid-cols-2">
              <article className="rounded-[30px] border border-white/10 bg-white/[0.03] p-7">
                <p className="text-[11px] uppercase tracking-[0.22em] text-white/34">Best fit</p>
                <div className="mt-5 space-y-3">
                  {fitList.map((item) => (
                    <div key={item} className="flex gap-3 text-sm font-light leading-7 text-white/66">
                      <Check className="mt-1.5 h-4 w-4 shrink-0 text-orange-300" />
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
              </article>
              <article className="rounded-[30px] border border-white/10 bg-white/[0.03] p-7">
                <p className="text-[11px] uppercase tracking-[0.22em] text-white/34">What Effect3 is not</p>
                <div className="mt-5 space-y-3">
                  {notList.map((item) => (
                    <div key={item} className="flex gap-3 text-sm font-light leading-7 text-white/66">
                      <Check className="mt-1.5 h-4 w-4 shrink-0 text-orange-300" />
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
              </article>
            </div>
          </section>

          <section className="px-6 py-16 md:px-10 lg:px-16">
            <div className="mx-auto max-w-7xl">
              <div className="max-w-3xl">
                <p className="text-[11px] uppercase tracking-[0.22em] text-white/34">Company FAQ</p>
                <h2 className="mt-4 text-3xl font-extralight tracking-tight text-white/94 md:text-4xl">
                  Direct answers for search and AI retrieval
                </h2>
              </div>
              <div className="mt-8 grid gap-4">
                {entityFaqs.map((faq) => (
                  <article key={faq.question} className="rounded-[26px] border border-white/10 bg-white/[0.03] p-6">
                    <h3 className="text-lg font-light text-white/92">{faq.question}</h3>
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
                  <p className="text-[11px] uppercase tracking-[0.22em] text-white/34">Next path</p>
                  <h2 className="mt-4 text-3xl font-extralight tracking-tight text-white/94 md:text-4xl">
                    Keep the brand and proof path connected.
                  </h2>
                  <p className="mt-4 max-w-2xl text-sm font-light leading-7 text-white/58">
                    The strongest citation path for Effect3 comes from entity clarity, category clarity, and
                    proof. Use the pages below to keep that path connected for both buyers and AI systems.
                  </p>
                </div>
                <Link
                  to="/?intent=review&source=company-page&workflow=Effect3%20System%20Review"
                  className="inline-flex items-center gap-2 rounded-2xl border border-white/10 bg-white px-5 py-3 text-sm font-medium tracking-tight text-black transition-colors duration-200 hover:bg-white/90"
                >
                  Book a system review
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
              <div className="mt-8 grid gap-3 md:grid-cols-4">
                <Link to="/ai-operating-systems" className="rounded-2xl border border-white/10 px-4 py-4 text-sm font-light text-white/70 transition-colors duration-200 hover:bg-white/5 hover:text-white">
                  AI Operating Systems
                </Link>
                <Link to="/founder" className="rounded-2xl border border-white/10 px-4 py-4 text-sm font-light text-white/70 transition-colors duration-200 hover:bg-white/5 hover:text-white">
                  Founder
                </Link>
                <Link to="/faq" className="rounded-2xl border border-white/10 px-4 py-4 text-sm font-light text-white/70 transition-colors duration-200 hover:bg-white/5 hover:text-white">
                  Effect3 FAQ
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
