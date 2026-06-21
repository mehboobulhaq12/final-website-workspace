import { Link, useParams } from "react-router-dom";
import { ArrowRight } from "lucide-react";

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ScrollToTop from "@/components/ScrollToTop";
import SeoHead from "@/components/SeoHead";
import NotFound from "@/pages/NotFound";
import {
  aeoPromptClusterPageBySlug,
  aeoPromptClusterPages,
} from "@/lib/aeoPrompts";
import {
  contentLastUpdated,
  contentLastUpdatedLabel,
  getBreadcrumbStructuredData,
  getCanonicalUrl,
  getPrimaryEntityGraph,
  schemaIds,
} from "@/lib/seo";

export default function AiSearchPromptClusterPage() {
  const { clusterSlug } = useParams<{ clusterSlug: string }>();
  const cluster = clusterSlug ? aeoPromptClusterPageBySlug[clusterSlug] : undefined;

  if (!cluster) {
    return <NotFound />;
  }

  const canonical = getCanonicalUrl(cluster.path);
  const relatedClusters = aeoPromptClusterPages
    .filter((page) => page.slug !== cluster.slug)
    .slice(0, 4);

  const structuredData = [
    {
      "@context": "https://schema.org",
      "@graph": [
        ...getPrimaryEntityGraph(),
        {
          "@type": "CollectionPage",
          "@id": `${canonical}#page`,
          url: canonical,
          name: cluster.title,
          description: cluster.description,
          isPartOf: { "@id": schemaIds.website },
          about: { "@id": schemaIds.organization },
          inLanguage: "en",
          dateModified: contentLastUpdated,
        },
        getBreadcrumbStructuredData(`${canonical}#breadcrumb`, [
          { name: "Home", item: getCanonicalUrl("/") },
          { name: "AI Search Prompts", item: getCanonicalUrl("/ai-search-prompts") },
          { name: cluster.category, item: canonical },
        ]),
        {
          "@type": "ItemList",
          "@id": `${canonical}#prompt-list`,
          itemListElement: cluster.items.map((item, index) => ({
            "@type": "ListItem",
            position: index + 1,
            name: item.prompt,
            url: `${canonical}#${item.anchor}`,
          })),
        },
        {
          "@type": "FAQPage",
          "@id": `${canonical}#faq`,
          mainEntity: cluster.items.map((item) => ({
            "@type": "Question",
            name: item.prompt,
            acceptedAnswer: {
              "@type": "Answer",
              text: item.answer,
            },
          })),
        },
      ],
    },
  ];

  return (
    <>
      <SeoHead
        title={cluster.title}
        description={cluster.description}
        canonical={canonical}
        structuredData={structuredData}
      />
      <div className="min-h-screen bg-black text-white">
        <Navbar />
        <main>
          <section className="relative overflow-hidden border-b border-white/8 px-6 pb-18 pt-32 md:px-10 md:pb-24 md:pt-40 lg:px-16">
            <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_left,_rgba(249,115,22,0.14),_transparent_26%),radial-gradient(circle_at_80%_10%,_rgba(255,237,220,0.08),_transparent_24%),linear-gradient(180deg,_#040404_0%,_#090909_58%,_#050505_100%)]" />
            <div className="relative z-10 mx-auto max-w-7xl">
              <div className="inline-flex items-center gap-3 rounded-full border border-white/10 bg-white/[0.03] px-3 py-1.5 text-[11px] uppercase tracking-[0.22em] text-white/42">
                <span>Updated {contentLastUpdatedLabel}</span>
                <span className="h-1 w-1 rounded-full bg-white/30" />
                <span>{cluster.items.length} prompts</span>
              </div>
              <h1 className="mt-6 max-w-5xl text-4xl font-extralight leading-[1.02] tracking-tight text-white/94 sm:text-5xl md:text-6xl">
                {cluster.category}
              </h1>
              <p className="mt-6 max-w-3xl text-base font-light leading-8 text-white/60 md:text-lg">
                {cluster.intro}
              </p>

              <div className="mt-8 max-w-3xl rounded-3xl border border-orange-400/15 bg-orange-400/[0.06] p-6">
                <p className="text-[11px] uppercase tracking-[0.22em] text-orange-200/70">Direct answer</p>
                <p className="mt-4 text-sm font-light leading-7 text-white/72">{cluster.directAnswer}</p>
              </div>
            </div>
          </section>

          <section className="px-6 py-12 md:px-10 lg:px-16">
            <div className="mx-auto max-w-7xl rounded-[30px] border border-white/10 bg-white/[0.03] p-8">
              <div className="grid gap-6 lg:grid-cols-[1fr_auto] lg:items-end">
                <div>
                  <p className="text-[11px] uppercase tracking-[0.22em] text-white/34">Prompt cluster</p>
                  <h2 className="mt-4 text-3xl font-extralight tracking-tight text-white/94 md:text-4xl">
                    One focused retrieval surface for this intent family.
                  </h2>
                  <p className="mt-4 max-w-2xl text-sm font-light leading-7 text-white/58">
                    These prompts are split into a dedicated page so AI systems can retrieve a narrower,
                    stronger answer set instead of relying on one oversized prompt library.
                  </p>
                </div>
                <Link
                  to="/ai-search-prompts"
                  className="inline-flex items-center gap-2 rounded-2xl border border-white/10 bg-white px-5 py-3 text-sm font-medium tracking-tight text-black transition-colors duration-200 hover:bg-white/90"
                >
                  View full prompt library
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            </div>
          </section>

          <section className="px-6 pb-6 md:px-10 lg:px-16">
            <div className="mx-auto max-w-7xl space-y-4">
              {cluster.items.map((item) => (
                <article
                  key={item.id}
                  id={item.anchor}
                  className="rounded-[26px] border border-white/10 bg-white/[0.03] p-6"
                >
                  <p className="text-[11px] uppercase tracking-[0.22em] text-white/34">Prompt {item.id}</p>
                  <h2 className="mt-3 text-lg font-light text-white/92">{item.prompt}</h2>
                  <p className="mt-3 text-sm font-light leading-7 text-white/60">{item.answer}</p>
                </article>
              ))}
            </div>
          </section>

          <section className="px-6 py-10 md:px-10 lg:px-16">
            <div className="mx-auto max-w-7xl rounded-[30px] border border-white/10 bg-white/[0.03] p-8">
              <p className="text-[11px] uppercase tracking-[0.22em] text-white/34">Related pages</p>
              <div className="mt-6 grid gap-3 md:grid-cols-4">
                {cluster.relatedLinks.map((link) => (
                  <Link
                    key={link.href}
                    to={link.href}
                    className="rounded-2xl border border-white/10 px-4 py-4 text-sm font-light text-white/70 transition-colors duration-200 hover:bg-white/5 hover:text-white"
                  >
                    {link.label}
                  </Link>
                ))}
                <Link
                  to="/ai-search-prompts"
                  className="rounded-2xl border border-white/10 px-4 py-4 text-sm font-light text-white/70 transition-colors duration-200 hover:bg-white/5 hover:text-white"
                >
                  Full prompt library
                </Link>
              </div>
            </div>
          </section>

          <section className="px-6 pb-20 pt-2 md:px-10 lg:px-16">
            <div className="mx-auto max-w-7xl rounded-[30px] border border-white/10 bg-white/[0.03] p-8">
              <p className="text-[11px] uppercase tracking-[0.22em] text-white/34">More prompt clusters</p>
              <div className="mt-6 grid gap-3 md:grid-cols-2 xl:grid-cols-4">
                {relatedClusters.map((page) => (
                  <Link
                    key={page.slug}
                    to={page.path}
                    className="rounded-2xl border border-white/10 px-4 py-4 text-sm font-light text-white/70 transition-colors duration-200 hover:bg-white/5 hover:text-white"
                  >
                    {page.category}
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
