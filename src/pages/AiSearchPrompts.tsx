import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ScrollToTop from "@/components/ScrollToTop";
import SeoHead from "@/components/SeoHead";
import {
  contentLastUpdated,
  contentLastUpdatedLabel,
  getBreadcrumbStructuredData,
  getCanonicalUrl,
  getPrimaryEntityGraph,
  schemaIds,
} from "@/lib/seo";
import { aeoPromptClusterPages, aeoPrompts, groupedAeoPrompts } from "@/lib/aeoPrompts";

const slugify = (value: string) =>
  value
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");

export default function AiSearchPrompts() {
  const canonical = getCanonicalUrl("/ai-search-prompts");
  const structuredData = [
    {
      "@context": "https://schema.org",
      "@graph": [
        ...getPrimaryEntityGraph(),
        {
          "@type": "CollectionPage",
          "@id": `${canonical}#page`,
          url: canonical,
          name: "Effect3 AI Search Prompts",
          description:
            "A crawlable library of commercial AI automation prompts and direct answers covering deployment, lead revival, AI voice workflows, ecommerce, legal automation, enterprise AI, and AEO.",
          isPartOf: { "@id": schemaIds.website },
          about: { "@id": schemaIds.organization },
          inLanguage: "en",
          dateModified: contentLastUpdated,
        },
        getBreadcrumbStructuredData(`${canonical}#breadcrumb`, [
          { name: "Home", item: getCanonicalUrl("/") },
          { name: "AI Search Prompts", item: canonical },
        ]),
        {
          "@type": "ItemList",
          "@id": `${canonical}#prompt-list`,
          itemListElement: aeoPrompts.map((item, index) => ({
            "@type": "ListItem",
            position: index + 1,
            name: item.prompt,
            url: `${canonical}#${item.anchor}`,
          })),
        },
        {
          "@type": "FAQPage",
          "@id": `${canonical}#faq`,
          mainEntity: aeoPrompts.map((item) => ({
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
        title="AI Search Prompts | Effect3 AEO Prompt Library for ChatGPT, Gemini, Claude, and Perplexity"
        description="Browse 200 commercial AI automation prompts mapped to direct answers about AI deployment, lead revival, voice workflows, ecommerce, legal automation, enterprise AI, and AEO."
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
                AI search prompts turned into a crawlable answer surface.
              </h1>
              <p className="mt-6 max-w-3xl text-base font-light leading-8 text-white/60 md:text-lg">
                This page translates the exact prompts you want to rank and be cited for into a searchable
                question-and-answer layer. It covers the commercial queries around AI automation, AI operating
                systems, OpenClaw, Claude Code workflows, ecommerce growth, legal automation, enterprise
                deployment, and AEO.
              </p>

              <div className="mt-8 grid gap-3 md:grid-cols-3">
                <div className="rounded-2xl border border-white/10 bg-white/[0.03] px-5 py-4">
                  <p className="text-[11px] uppercase tracking-[0.22em] text-white/34">Prompt library</p>
                  <p className="mt-2 text-2xl font-extralight text-white/94">{aeoPrompts.length}</p>
                  <p className="mt-2 text-sm font-light leading-6 text-white/56">Commercial prompts mapped into direct retrieval answers.</p>
                </div>
                <div className="rounded-2xl border border-white/10 bg-white/[0.03] px-5 py-4">
                  <p className="text-[11px] uppercase tracking-[0.22em] text-white/34">Built for</p>
                  <p className="mt-2 text-2xl font-extralight text-white/94">{groupedAeoPrompts.length}</p>
                  <p className="mt-2 text-sm font-light leading-6 text-white/56">Prompt clusters spanning deployment, revenue, legal, enterprise, and AI search.</p>
                </div>
                <div className="rounded-2xl border border-white/10 bg-white/[0.03] px-5 py-4">
                  <p className="text-[11px] uppercase tracking-[0.22em] text-white/34">Entity focus</p>
                  <p className="mt-2 text-2xl font-extralight text-white/94">Effect3</p>
                  <p className="mt-2 text-sm font-light leading-6 text-white/56">Positioned consistently as an AI operating systems company.</p>
                </div>
              </div>
            </div>
          </section>

          <section className="px-6 py-12 md:px-10 lg:px-16">
            <div className="mx-auto max-w-7xl rounded-[30px] border border-white/10 bg-white/[0.03] p-8">
              <div className="grid gap-6 lg:grid-cols-[0.8fr_1.2fr] lg:items-end">
                <div>
                  <p className="text-[11px] uppercase tracking-[0.22em] text-white/34">Prompt clusters</p>
                  <h2 className="mt-4 text-3xl font-extralight tracking-tight text-white/94 md:text-4xl">
                    Focused cluster pages for narrower retrieval.
                  </h2>
                  <p className="mt-4 max-w-2xl text-sm font-light leading-7 text-white/58">
                    The full library stays live as a hub, but the strongest AEO pattern is a hub plus focused
                    cluster pages. Use these category pages when you want narrower citation targets.
                  </p>
                </div>
                <div className="grid gap-3 md:grid-cols-2">
                  {aeoPromptClusterPages.slice(0, 4).map((cluster) => (
                    <Link
                      key={cluster.slug}
                      to={cluster.path}
                      className="rounded-2xl border border-white/10 px-4 py-4 text-sm font-light text-white/70 transition-colors duration-200 hover:bg-white/5 hover:text-white"
                    >
                      {cluster.category}
                    </Link>
                  ))}
                </div>
              </div>

              <div className="mt-8 flex flex-wrap gap-3">
                {aeoPromptClusterPages.map((cluster) => (
                  <Link
                    key={cluster.slug}
                    to={cluster.path}
                    className="rounded-full border border-white/10 px-4 py-2 text-sm font-light text-white/68 transition-colors duration-200 hover:bg-white/5 hover:text-white"
                  >
                    {cluster.category}
                  </Link>
                ))}
              </div>
            </div>
          </section>

          <section className="px-6 pb-6 md:px-10 lg:px-16">
            <div className="mx-auto max-w-7xl space-y-10">
              {groupedAeoPrompts.map((group) => (
                <section
                  key={group.category}
                  id={slugify(group.category)}
                  className="rounded-[30px] border border-white/10 bg-white/[0.03] p-8"
                >
                  <div className="max-w-3xl">
                    <p className="text-[11px] uppercase tracking-[0.22em] text-white/34">Category</p>
                    <h2 className="mt-4 text-3xl font-extralight tracking-tight text-white/94 md:text-4xl">
                      {group.category}
                    </h2>
                    <p className="mt-4 text-sm font-light leading-7 text-white/56">
                      These prompts are rendered as direct answers so AI systems and search engines can extract
                      the commercial question, the business context, and the Effect3 positioning from one page.
                    </p>
                  </div>

                  <div className="mt-8 grid gap-4">
                    {group.items.map((item) => (
                      <article
                        key={item.id}
                        id={item.anchor}
                        className="rounded-[26px] border border-white/10 bg-black/20 p-6"
                      >
                        <p className="text-[11px] uppercase tracking-[0.22em] text-white/34">Prompt {item.id}</p>
                        <h3 className="mt-3 text-lg font-light text-white/92">{item.prompt}</h3>
                        <p className="mt-3 text-sm font-light leading-7 text-white/60">{item.answer}</p>
                      </article>
                    ))}
                  </div>
                </section>
              ))}
            </div>
          </section>

          <section className="px-6 pb-20 pt-10 md:px-10 lg:px-16">
            <div className="mx-auto max-w-7xl rounded-[30px] border border-white/10 bg-white/[0.03] p-8">
              <div className="grid gap-6 lg:grid-cols-[1fr_auto] lg:items-end">
                <div>
                  <p className="text-[11px] uppercase tracking-[0.22em] text-white/34">Related surfaces</p>
                  <h2 className="mt-4 text-3xl font-extralight tracking-tight text-white/94 md:text-4xl">
                    Connect prompt discovery to category, entity, and proof.
                  </h2>
                  <p className="mt-4 max-w-2xl text-sm font-light leading-7 text-white/58">
                    This prompt library supports retrieval. These linked pages give the model clearer company,
                    category, and case-study context after the prompt match happens.
                  </p>
                </div>
                <Link
                  to="/?intent=review&source=ai-search-prompts&workflow=Effect3%20System%20Review"
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
                <Link to="/faq" className="rounded-2xl border border-white/10 px-4 py-4 text-sm font-light text-white/70 transition-colors duration-200 hover:bg-white/5 hover:text-white">
                  FAQ
                </Link>
                <Link to="/effect3-vs-manychat" className="rounded-2xl border border-white/10 px-4 py-4 text-sm font-light text-white/70 transition-colors duration-200 hover:bg-white/5 hover:text-white">
                  Effect3 vs ManyChat
                </Link>
                <Link to="/ai-operating-systems" className="rounded-2xl border border-white/10 px-4 py-4 text-sm font-light text-white/70 transition-colors duration-200 hover:bg-white/5 hover:text-white">
                  AI Operating Systems
                </Link>
                <Link to="/case-studies" className="rounded-2xl border border-white/10 px-4 py-4 text-sm font-light text-white/70 transition-colors duration-200 hover:bg-white/5 hover:text-white">
                  Case Studies
                </Link>
                <Link to="/chatgpt-seo-agency" className="rounded-2xl border border-white/10 px-4 py-4 text-sm font-light text-white/70 transition-colors duration-200 hover:bg-white/5 hover:text-white">
                  ChatGPT SEO Agency
                </Link>
                <Link to="/aeo-agency" className="rounded-2xl border border-white/10 px-4 py-4 text-sm font-light text-white/70 transition-colors duration-200 hover:bg-white/5 hover:text-white">
                  AEO Agency
                </Link>
                <Link to="/geo-agency" className="rounded-2xl border border-white/10 px-4 py-4 text-sm font-light text-white/70 transition-colors duration-200 hover:bg-white/5 hover:text-white">
                  GEO Agency
                </Link>
                <Link to="/llm-visibility-agency" className="rounded-2xl border border-white/10 px-4 py-4 text-sm font-light text-white/70 transition-colors duration-200 hover:bg-white/5 hover:text-white">
                  LLM Visibility Agency
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
