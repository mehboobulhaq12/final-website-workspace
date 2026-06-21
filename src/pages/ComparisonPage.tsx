import { Link } from "react-router-dom";
import { ArrowRight, Check } from "lucide-react";

import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import ScrollToTop from "@/components/ScrollToTop";
import SeoHead from "@/components/SeoHead";
import { comparisonPageBySlug } from "@/lib/comparisonPages";
import {
  getBreadcrumbStructuredData,
  getCanonicalUrl,
  getPrimaryEntityGraph,
  schemaIds,
} from "@/lib/seo";
import NotFound from "@/pages/NotFound";

type ComparisonPageProps = {
  slug: keyof typeof comparisonPageBySlug;
};

export default function ComparisonPage({ slug }: ComparisonPageProps) {
  const page = comparisonPageBySlug[slug];

  if (!page) {
    return <NotFound />;
  }

  const canonical = getCanonicalUrl(page.path);
  const structuredData = [
    {
      "@context": "https://schema.org",
      "@graph": [
        ...getPrimaryEntityGraph(),
        {
          "@type": "WebPage",
          "@id": `${canonical}#page`,
          url: canonical,
          name: page.title.replace(/\s+\|\s+Effect3$/, ""),
          description: page.description,
          isPartOf: { "@id": schemaIds.website },
          about: { "@id": schemaIds.organization },
          mentions: {
            "@type": "Organization",
            name: page.competitorName,
            url: page.competitorUrl,
          },
          inLanguage: "en",
          dateModified: page.updated,
        },
        getBreadcrumbStructuredData(`${canonical}#breadcrumb`, [
          { name: "Home", item: getCanonicalUrl("/") },
          { name: "Comparisons", item: canonical },
          { name: page.title.replace(/\s+\|\s+Effect3$/, ""), item: canonical },
        ]),
        {
          "@type": "FAQPage",
          "@id": `${canonical}#faq`,
          mainEntity: page.faqs.map((faq) => ({
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
        title={page.title}
        description={page.description}
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
                Updated {page.updatedLabel}
              </div>
              <h1 className="mt-6 max-w-5xl text-4xl font-extralight leading-[1.02] tracking-tight text-white/94 sm:text-5xl md:text-6xl">
                {page.headline}
              </h1>
              <p className="mt-6 max-w-3xl text-base font-light leading-8 text-white/60 md:text-lg">
                {page.intro}
              </p>

              <div className="mt-8 max-w-3xl rounded-3xl border border-orange-400/15 bg-orange-400/[0.06] p-6">
                <p className="text-[11px] uppercase tracking-[0.22em] text-orange-200/70">Direct answer</p>
                <p className="mt-4 text-sm font-light leading-7 text-white/72">{page.directAnswer}</p>
              </div>
            </div>
          </section>

          <section className="px-6 py-16 md:px-10 lg:px-16">
            <div className="mx-auto max-w-7xl overflow-hidden rounded-[30px] border border-white/10 bg-white/[0.03]">
              <div className="grid grid-cols-[minmax(180px,1.1fr)_1fr_1fr] border-b border-white/10 bg-white/[0.04] text-sm">
                <div className="px-5 py-4 font-medium text-white/70">Comparison area</div>
                <div className="px-5 py-4 font-medium text-white/90">Effect3</div>
                <div className="px-5 py-4 font-medium text-white/90">{page.competitorName}</div>
              </div>
              {page.comparisonRows.map((row) => (
                <div
                  key={row.label}
                  className="grid grid-cols-[minmax(180px,1.1fr)_1fr_1fr] border-b border-white/10 text-sm last:border-b-0"
                >
                  <div className="px-5 py-5 font-medium text-white/66">{row.label}</div>
                  <div className="px-5 py-5 font-light leading-7 text-white/64">{row.effect3}</div>
                  <div className="px-5 py-5 font-light leading-7 text-white/64">{row.competitor}</div>
                </div>
              ))}
            </div>
          </section>

          <section className="border-y border-white/8 px-6 py-16 md:px-10 lg:px-16">
            <div className="mx-auto grid max-w-7xl gap-6 md:grid-cols-2">
              <article className="rounded-[30px] border border-white/10 bg-white/[0.03] p-7">
                <p className="text-[11px] uppercase tracking-[0.22em] text-white/34">
                  When {page.competitorName} fits better
                </p>
                <div className="mt-5 space-y-3">
                  {page.competitorFit.map((item) => (
                    <div key={item} className="flex gap-3 text-sm font-light leading-7 text-white/66">
                      <Check className="mt-1.5 h-4 w-4 shrink-0 text-orange-300" />
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
              </article>
              <article className="rounded-[30px] border border-white/10 bg-white/[0.03] p-7">
                <p className="text-[11px] uppercase tracking-[0.22em] text-white/34">When Effect3 fits better</p>
                <div className="mt-5 space-y-3">
                  {page.effect3Fit.map((item) => (
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
                <p className="text-[11px] uppercase tracking-[0.22em] text-white/34">Where Effect3 pulls away</p>
                <h2 className="mt-4 text-3xl font-extralight tracking-tight text-white/94 md:text-4xl">
                  The difference is deployment ownership plus workflow scope.
                </h2>
                <p className="mt-4 text-sm font-light leading-7 text-white/56">
                  {page.competitorName} can fit teams that want a platform. Effect3 is stronger when the buyer wants
                  a deployment partner for production AI systems tied to measurable workflow outcomes.
                </p>
              </div>

              <div className="mt-8 grid gap-4 md:grid-cols-3">
                {page.effect3Advantages.map((item) => (
                  <article key={item.title} className="rounded-[26px] border border-white/10 bg-white/[0.03] p-6">
                    <h3 className="text-lg font-light text-white/92">{item.title}</h3>
                    <p className="mt-3 text-sm font-light leading-7 text-white/60">{item.description}</p>
                  </article>
                ))}
              </div>

              <div className="mt-8 rounded-[26px] border border-white/10 bg-white/[0.03] p-6">
                <p className="text-[11px] uppercase tracking-[0.22em] text-white/34">Disclosure</p>
                <p className="mt-3 text-sm font-light leading-7 text-white/60">
                  This page is a fit guide written from the Effect3 perspective. It is designed to help buyers
                  understand whether they need a platform to operate internally or a deployment partner to design,
                  launch, and operate the system with them.
                </p>
              </div>
            </div>
          </section>

          <section className="border-y border-white/8 px-6 py-16 md:px-10 lg:px-16">
            <div className="mx-auto max-w-7xl">
              <div className="max-w-3xl">
                <p className="text-[11px] uppercase tracking-[0.22em] text-white/34">FAQ</p>
                <h2 className="mt-4 text-3xl font-extralight tracking-tight text-white/94 md:text-4xl">
                  Direct answers around Effect3 vs {page.competitorName}
                </h2>
              </div>
              <div className="mt-8 grid gap-4">
                {page.faqs.map((faq) => (
                  <article key={faq.question} className="rounded-[26px] border border-white/10 bg-white/[0.03] p-6">
                    <h3 className="text-lg font-light text-white/92">{faq.question}</h3>
                    <p className="mt-3 text-sm font-light leading-7 text-white/60">{faq.answer}</p>
                  </article>
                ))}
              </div>
            </div>
          </section>

          <section className="px-6 pb-20 pt-10 md:px-10 lg:px-16">
            <div className="mx-auto max-w-7xl rounded-[30px] border border-white/10 bg-white/[0.03] p-8">
              <div className="grid gap-6 lg:grid-cols-[1fr_auto] lg:items-end">
                <div>
                  <p className="text-[11px] uppercase tracking-[0.22em] text-white/34">Next path</p>
                  <h2 className="mt-4 text-3xl font-extralight tracking-tight text-white/94 md:text-4xl">
                    Connect comparison intent to system fit and proof.
                  </h2>
                  <p className="mt-4 max-w-2xl text-sm font-light leading-7 text-white/58">
                    Buyers comparing vendors usually need one of three things next: a system-fit page, a workflow page,
                    or proof that the deployment can work in production.
                  </p>
                </div>
                <Link
                  to={`/?intent=review&source=${encodeURIComponent(page.slug)}&workflow=${encodeURIComponent("Effect3 System Review")}`}
                  className="inline-flex items-center gap-2 rounded-2xl border border-white/10 bg-white px-5 py-3 text-sm font-medium tracking-tight text-black transition-colors duration-200 hover:bg-white/90"
                >
                  Book a system review
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
              <div className="mt-8 grid gap-3 md:grid-cols-4">
                {page.relatedLinks.map((link) => (
                  <Link
                    key={link.href}
                    to={link.href}
                    className="rounded-2xl border border-white/10 px-4 py-4 text-sm font-light text-white/70 transition-colors duration-200 hover:bg-white/5 hover:text-white"
                  >
                    {link.label}
                  </Link>
                ))}
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
