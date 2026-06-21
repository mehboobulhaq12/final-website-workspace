import { ArrowRight, Check, ChevronRight } from "lucide-react";
import { Link } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ScrollToTop from "@/components/ScrollToTop";
import SeoHead from "@/components/SeoHead";
import { TextShimmer } from "@/components/ui/text-shimmer";
import { getLandingPageStructuredData, type LandingPageConfig } from "@/lib/landingPages";
import { getCanonicalUrl } from "@/lib/seo";

type LandingPageTemplateProps = {
  page: LandingPageConfig;
};

export default function LandingPageTemplate({ page }: LandingPageTemplateProps) {
  const structuredData = getLandingPageStructuredData(page);
  const systemReviewHref =
    page.primaryCtaHref === "/#book"
      ? `/?intent=review&source=${encodeURIComponent(page.slug)}&workflow=${encodeURIComponent(page.serviceName)}`
      : page.primaryCtaHref;

  return (
    <div className="w-full min-h-screen bg-black text-white overflow-x-clip">
      <SeoHead
        title={page.title}
        description={page.description}
        canonical={getCanonicalUrl(page.path)}
        structuredData={structuredData}
      />
      <Navbar />

      <main>
        <section className="relative overflow-hidden border-b border-white/5">
          <div
            aria-hidden="true"
            className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(249,115,22,0.18),_transparent_35%),radial-gradient(circle_at_80%_20%,_rgba(251,191,36,0.12),_transparent_28%),linear-gradient(180deg,_#060606_0%,_#0b0b0b_55%,_#050505_100%)]"
          />
          <div className="relative mx-auto max-w-7xl px-6 pb-16 pt-32 md:px-10 md:pb-20 md:pt-40 lg:px-16">
            <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1.5 backdrop-blur-sm">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-orange-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-orange-500" />
              </span>
              <span className="text-xs font-light tracking-tight text-white/80">{page.eyebrow}</span>
            </div>

            <div className="mt-8 grid gap-10 lg:grid-cols-[1.2fr_0.8fr] lg:items-end">
              <div className="max-w-4xl">
                <h1 className="text-4xl font-extralight tracking-tight text-white sm:text-5xl md:text-6xl lg:text-7xl">
                  {page.headline.split(" ").slice(0, -2).join(" ")}{" "}
                  <TextShimmer
                    as="span"
                    duration={2}
                    spread={4}
                    className="italic font-light [--base-color:theme(colors.orange.300)] [--base-gradient-color:theme(colors.orange.100)] dark:[--base-color:theme(colors.orange.300)] dark:[--base-gradient-color:theme(colors.orange.100)]"
                  >
                    {page.headline.split(" ").slice(-2).join(" ")}
                  </TextShimmer>
                </h1>
                <p className="mt-6 max-w-2xl text-base font-light leading-relaxed text-white/55 sm:text-lg">
                  {page.intro}
                </p>
                <div className="mt-8 flex flex-wrap gap-3">
                  <Link
                    to={systemReviewHref}
                    className="rounded-2xl border border-white/10 bg-white/10 px-5 py-3 text-sm font-light tracking-tight text-white backdrop-blur-sm transition-colors duration-200 hover:bg-white/20"
                  >
                    {page.primaryCtaLabel}
                  </Link>
                  <Link
                    to={page.secondaryCtaHref}
                    className="rounded-2xl border border-white/10 px-5 py-3 text-sm font-light tracking-tight text-white/70 transition-colors duration-200 hover:bg-white/5 hover:text-white"
                  >
                    {page.secondaryCtaLabel}
                  </Link>
                </div>
              </div>

              <div className="rounded-3xl border border-white/10 bg-white/[0.03] p-6 backdrop-blur-sm">
                <div className="text-xs uppercase tracking-[0.24em] text-white/35">What you get</div>
                <ul className="mt-5 space-y-4">
                  {page.deliverables.map((item) => (
                    <li key={item} className="flex items-start gap-3">
                      <span className="mt-0.5 flex h-6 w-6 items-center justify-center rounded-full border border-orange-500/20 bg-orange-500/10">
                        <Check className="h-3.5 w-3.5 text-orange-300" />
                      </span>
                      <span className="text-sm font-light leading-relaxed text-white/70">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </section>

        <section className="border-b border-white/5 py-20">
          <div className="mx-auto grid max-w-7xl gap-10 px-6 md:px-10 lg:grid-cols-[0.8fr_1.2fr] lg:px-16">
            <div>
              <div className="text-xs uppercase tracking-[0.24em] text-white/35">Why teams buy this</div>
              <h2 className="mt-4 text-3xl font-extralight tracking-tight text-white md:text-4xl">
                The operating problems underneath the keyword
              </h2>
            </div>
            <div className="grid gap-4">
              {page.painPoints.map((pain) => (
                <div
                  key={pain}
                  className="rounded-2xl border border-white/10 bg-white/[0.02] p-5 text-sm font-light leading-relaxed text-white/60"
                >
                  {pain}
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="border-b border-white/5 py-20">
          <div className="mx-auto max-w-7xl px-6 md:px-10 lg:px-16">
            <div className="max-w-3xl">
              <div className="text-xs uppercase tracking-[0.24em] text-white/35">How Effect3 fits</div>
              <h2 className="mt-4 text-3xl font-extralight tracking-tight text-white md:text-4xl">
                Designed for commercial intent and ICP fit
              </h2>
              <p className="mt-4 text-base font-light leading-relaxed text-white/50">
                This page exists because buyers search with very specific commercial language. Effect3 answers that
                intent with a production AI system, clear ICP use cases, and deployment scope that LLMs and search engines can cite directly.
              </p>
            </div>

            <div className="mt-10 grid gap-5 md:grid-cols-3">
              {page.useCases.map((useCase) => (
                <article
                  key={useCase.title}
                  className="rounded-3xl border border-white/10 bg-white/[0.03] p-6 backdrop-blur-sm"
                >
                  <div className="flex items-center gap-2 text-xs uppercase tracking-[0.24em] text-orange-300/70">
                    <ChevronRight className="h-3.5 w-3.5" />
                    Use case
                  </div>
                  <h3 className="mt-4 text-xl font-light tracking-tight text-white/90">{useCase.title}</h3>
                  <p className="mt-3 text-sm font-light leading-relaxed text-white/55">{useCase.body}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="border-b border-white/5 py-20">
          <div className="mx-auto max-w-7xl px-6 md:px-10 lg:px-16">
            <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr]">
              <div>
                <div className="text-xs uppercase tracking-[0.24em] text-white/35">FAQ</div>
                <h2 className="mt-4 text-3xl font-extralight tracking-tight text-white md:text-4xl">
                  Direct answers for search and AI retrieval
                </h2>
              </div>
              <div className="space-y-4">
                {page.faqs.map((faq) => (
                  <div
                    key={faq.question}
                    className="rounded-2xl border border-white/10 bg-white/[0.02] p-5"
                  >
                    <h3 className="text-base font-light text-white/90">{faq.question}</h3>
                    <p className="mt-3 text-sm font-light leading-relaxed text-white/55">{faq.answer}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="py-20">
          <div className="mx-auto max-w-7xl px-6 md:px-10 lg:px-16">
            <div className="rounded-3xl border border-white/10 bg-white/[0.03] p-8 backdrop-blur-sm md:p-10">
              <div className="grid gap-8 lg:grid-cols-[1fr_auto] lg:items-end">
                <div>
                  <div className="text-xs uppercase tracking-[0.24em] text-white/35">Related paths</div>
                  <h2 className="mt-4 text-3xl font-extralight tracking-tight text-white md:text-4xl">
                    Keep the crawl path connected
                  </h2>
                  <p className="mt-4 max-w-2xl text-sm font-light leading-relaxed text-white/55">
                    These linked pages support the same search cluster and strengthen both SEO and AEO through internal
                    linking and clearer retrieval surfaces.
                  </p>
                </div>
                <Link
                  to={systemReviewHref}
                  className="inline-flex items-center gap-2 rounded-2xl border border-white/10 bg-white px-5 py-3 text-sm font-medium tracking-tight text-black transition-colors duration-200 hover:bg-white/90"
                >
                  Book a system review
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
              <div className="mt-8 grid gap-3 md:grid-cols-3">
                {page.relatedLinks.map((link) => (
                  <Link
                    key={link.href}
                    to={link.href}
                    className="rounded-2xl border border-white/10 px-4 py-4 text-sm font-light tracking-tight text-white/70 transition-colors duration-200 hover:bg-white/5 hover:text-white"
                  >
                    {link.label}
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
      <ScrollToTop />
    </div>
  );
}
