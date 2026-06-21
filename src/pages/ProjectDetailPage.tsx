import { useMemo } from "react";
import { Link, Navigate, useParams } from "react-router-dom";
import { ArrowLeft, ArrowRight, ExternalLink } from "lucide-react";
import { motion, useReducedMotion } from "framer-motion";

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ScrollToTop from "@/components/ScrollToTop";
import SeoHead from "@/components/SeoHead";
import ProjectShowcaseCard from "@/components/projects/ProjectShowcaseCard";
import { TextShimmer } from "@/components/ui/text-shimmer";
import { caseStudiesPath, getProjectPath, getProjectStructuredData, projectBySlug, projects } from "@/lib/projects";
import { getCanonicalUrl } from "@/lib/seo";

const microCardDelays = [0, 0.06, 0.12, 0.18];

export default function ProjectDetailPage() {
  const { slug } = useParams<{ slug: string }>();
  const project = slug ? projectBySlug[slug] : undefined;
  const reduceMotion = useReducedMotion();

  const relatedProjects = useMemo(() => {
    if (!project) return [];
    return projects.filter((item) => item.slug !== project.slug).slice(0, 3);
  }, [project]);

  if (!project) {
    return <Navigate to={caseStudiesPath} replace />;
  }

  const microCards = [
    { label: "Client", value: project.client },
    { label: "Timeline", value: project.timeline },
    { label: "Primary Impact", value: project.impactValue },
    { label: "Category", value: project.category },
  ];
  const previewIsExternal = project.previewUrl ? /^https?:\/\//.test(project.previewUrl) : false;

  return (
    <>
      <SeoHead
        title={`${project.title} | Effect3 Case Study`}
        description={project.summary}
        canonical={getCanonicalUrl(getProjectPath(project.slug))}
        structuredData={getProjectStructuredData(project)}
      />

      <div className="min-h-screen bg-black text-white">
        <Navbar />
        <main>
          <section className="relative overflow-hidden border-b border-white/8 px-6 pb-18 pt-32 md:px-10 md:pb-24 md:pt-40 lg:px-16">
            <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_left,_rgba(249,115,22,0.14),_transparent_26%),radial-gradient(circle_at_80%_10%,_rgba(255,237,220,0.08),_transparent_24%),linear-gradient(180deg,_#040404_0%,_#090909_58%,_#050505_100%)]" />
            <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/15 to-transparent" />

            <div className="relative z-10 mx-auto max-w-7xl">
              <Link
                to={caseStudiesPath}
                className="inline-flex items-center gap-2 text-sm font-light text-white/56 transition-colors duration-300 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-400/70 focus-visible:ring-offset-2 focus-visible:ring-offset-black"
              >
                <ArrowLeft className="h-4 w-4" aria-hidden="true" />
                Back To Case Studies
              </Link>

              <div className="mt-8 grid gap-10 lg:grid-cols-[minmax(0,1.1fr)_320px] lg:items-end">
                <div className="max-w-4xl">
                  <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-[11px] uppercase tracking-[0.24em] text-white/60">
                    <span className="h-1.5 w-1.5 rounded-full bg-orange-400" aria-hidden="true" />
                    {project.tag}
                  </div>

                  <h1 className="mt-6 text-4xl font-extralight leading-[1.02] tracking-tight text-white/94 text-balance sm:text-5xl md:text-6xl">
                    {project.title}
                  </h1>

                  <p className="mt-6 max-w-3xl text-base font-light leading-8 text-white/52 md:text-lg">
                    {project.summary}
                  </p>

                  <div className="mt-8 flex flex-wrap items-center gap-4">
                    {project.previewUrl ? (
                      <a
                        href={project.previewUrl}
                        target={previewIsExternal ? "_blank" : undefined}
                        rel={previewIsExternal ? "noopener noreferrer" : undefined}
                        className="inline-flex items-center gap-2 rounded-2xl bg-orange-500 px-6 py-3 text-sm font-medium text-black transition-colors duration-300 hover:bg-orange-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-300 focus-visible:ring-offset-2 focus-visible:ring-offset-black"
                      >
                        {project.previewLabel ?? "Open Preview"}
                        <ExternalLink className="h-4 w-4" aria-hidden="true" />
                      </a>
                    ) : null}

                    <Link
                      to={`/?intent=review&source=case-study&workflow=${encodeURIComponent(project.title)}`}
                      className="inline-flex items-center gap-2 rounded-2xl border border-white/12 bg-white/6 px-6 py-3 text-sm font-light text-white/88 transition-colors duration-300 hover:bg-white/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-400/70 focus-visible:ring-offset-2 focus-visible:ring-offset-black"
                    >
                      Book a System Review
                      <ArrowRight className="h-4 w-4" aria-hidden="true" />
                    </Link>
                  </div>
                </div>

                <div className="rounded-[28px] border border-white/10 bg-white/[0.03] p-6 shadow-[0_0_90px_-45px_rgba(249,115,22,0.45)]">
                  <p className="text-[11px] uppercase tracking-[0.24em] text-white/35">Effect3 View</p>
                  <h2 className="mt-4 text-2xl font-extralight tracking-tight text-white/94 text-balance">
                    {project.headline}
                  </h2>
                  <p className="mt-4 text-sm font-light leading-7 text-white/48">
                    Short deployment brief, tighter proof narrative, and the exact operating shift this system was designed to create.
                  </p>
                </div>
              </div>
            </div>
          </section>

          <section id="project-demo" className="px-6 pb-8 pt-10 md:px-10 lg:px-16">
            <div className="mx-auto max-w-7xl">
              <motion.div
                initial={reduceMotion ? undefined : { opacity: 0, y: 18 }}
                animate={reduceMotion ? undefined : { opacity: 1, y: 0 }}
                transition={{ duration: 0.55, ease: "easeOut" }}
                className="overflow-hidden rounded-[34px] border border-white/10 bg-white/[0.03] shadow-[0_45px_120px_rgba(0,0,0,0.28)]"
              >
                {project.videoSrc ? (
                  <video
                    src={project.videoSrc}
                    poster={project.image}
                    className="aspect-[16/8.5] w-full object-cover object-top"
                    controls
                    autoPlay
                    muted
                    loop
                    playsInline
                    preload="metadata"
                  />
                ) : (
                  <img
                    src={project.image}
                    alt={`${project.title} dashboard preview`}
                    className="aspect-[16/8.5] w-full object-cover object-top"
                    width={1600}
                    height={850}
                    fetchPriority="high"
                  />
                )}
              </motion.div>
            </div>
          </section>

          <section className="px-6 py-10 md:px-10 lg:px-16">
            <div className="mx-auto grid max-w-7xl gap-5 md:grid-cols-2 xl:grid-cols-4">
              {microCards.map((card, index) => (
                <motion.article
                  key={card.label}
                  initial={reduceMotion ? undefined : { opacity: 0, y: 14 }}
                  animate={reduceMotion ? undefined : { opacity: 1, y: 0 }}
                  transition={{ duration: 0.45, delay: microCardDelays[index], ease: "easeOut" }}
                  className="rounded-[26px] border border-white/10 bg-white/[0.03] p-5"
                >
                  <p className="text-[11px] uppercase tracking-[0.22em] text-white/34">{card.label}</p>
                  <p className="mt-4 text-lg font-light text-white/90 text-balance">{card.value}</p>
                </motion.article>
              ))}
            </div>
          </section>

          <section className="px-6 py-10 md:px-10 lg:px-16 lg:py-14">
            <div className="mx-auto grid max-w-7xl gap-6 lg:grid-cols-[minmax(0,1.1fr)_380px]">
              <div className="space-y-6">
                <article className="rounded-[30px] border border-white/10 bg-white/[0.03] p-7 md:p-8">
                  <p className="text-[11px] uppercase tracking-[0.22em] text-white/34">Purpose</p>
                  <h2 className="mt-4 text-2xl font-extralight tracking-tight text-white/94 text-balance md:text-3xl">
                    Why This System Existed
                  </h2>
                  <p className="mt-5 max-w-3xl text-base font-light leading-8 text-white/62">
                    {project.purpose}
                  </p>
                </article>

                <div className="grid gap-6 md:grid-cols-3">
                  <article className="rounded-[28px] border border-white/10 bg-white/[0.03] p-6">
                    <p className="text-[11px] uppercase tracking-[0.22em] text-white/34">Problem</p>
                    <p className="mt-4 text-sm font-light leading-7 text-white/64">{project.problem}</p>
                  </article>
                  <article className="rounded-[28px] border border-white/10 bg-white/[0.03] p-6">
                    <p className="text-[11px] uppercase tracking-[0.22em] text-white/34">Solution</p>
                    <p className="mt-4 text-sm font-light leading-7 text-white/64">{project.solution}</p>
                  </article>
                  <article className="rounded-[28px] border border-white/10 bg-white/[0.03] p-6">
                    <p className="text-[11px] uppercase tracking-[0.22em] text-white/34">Final Output</p>
                    <p className="mt-4 text-sm font-light leading-7 text-white/64">{project.finalOutput}</p>
                  </article>
                </div>

                <article className="overflow-hidden rounded-[30px] border border-orange-400/16 bg-[linear-gradient(180deg,rgba(249,115,22,0.08),rgba(255,255,255,0.02))] p-7 md:p-8">
                  <p className="text-[11px] uppercase tracking-[0.22em] text-orange-200/70">Project Outcome</p>
                  <h2 className="mt-4 text-2xl font-extralight tracking-tight text-white/94 text-balance md:text-3xl">
                    {project.headline}
                  </h2>
                  <div className="mt-6 grid gap-4 sm:grid-cols-3">
                    {project.outcomes.map((item) => (
                      <div key={item} className="rounded-2xl border border-white/10 bg-black/30 p-5">
                        <p className="text-sm font-light leading-7 text-white/66">{item}</p>
                      </div>
                    ))}
                  </div>
                </article>
              </div>

              <div className="space-y-6">
                <article className="rounded-[30px] border border-white/10 bg-white/[0.03] p-7">
                  <p className="text-[11px] uppercase tracking-[0.22em] text-white/34">What Shipped</p>
                  <ul className="mt-5 space-y-3">
                    {project.shipped.map((item) => (
                      <li key={item} className="flex gap-3 text-sm font-light leading-7 text-white/66">
                        <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-orange-300" aria-hidden="true" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </article>

                <article className="rounded-[30px] border border-white/10 bg-white/[0.03] p-7">
                  <p className="text-[11px] uppercase tracking-[0.22em] text-white/34">What Made It Hard</p>
                  <ul className="mt-5 space-y-3">
                    {project.challengePoints.map((item) => (
                      <li key={item} className="flex gap-3 text-sm font-light leading-7 text-white/66">
                        <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-orange-300" aria-hidden="true" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </article>

                <article className="rounded-[30px] border border-white/10 bg-white/[0.03] p-7">
                  <p className="text-[11px] uppercase tracking-[0.22em] text-white/34">Stack</p>
                  <div className="mt-5 flex flex-wrap gap-3">
                    {project.stack.map((item) => (
                      <span
                        key={item}
                        className="rounded-full border border-white/10 bg-black/35 px-4 py-2 text-sm font-light text-white/68"
                      >
                        {item}
                      </span>
                    ))}
                  </div>
                </article>
              </div>
            </div>
          </section>

          <section className="border-t border-white/8 px-6 py-14 md:px-10 lg:px-16 lg:py-20">
            <div className="mx-auto max-w-7xl">
              <div className="mb-8 flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
                <div>
                  <p className="text-[11px] uppercase tracking-[0.22em] text-white/34">More Case Studies</p>
                  <h2 className="mt-3 text-3xl font-extralight tracking-tight text-white/94 md:text-4xl text-balance">
                    More deployments from the{" "}
                    <TextShimmer
                      as="span"
                      duration={2}
                      spread={3}
                      className="italic font-light [--base-color:theme(colors.orange.300)] [--base-gradient-color:theme(colors.orange.100)]"
                    >
                      Effect3
                    </TextShimmer>{" "}
                    case-study library.
                  </h2>
                </div>
                <Link
                  to={caseStudiesPath}
                  className="inline-flex items-center gap-2 text-sm font-light text-orange-300 transition-colors duration-300 hover:text-orange-200"
                >
                  Open Full Case-Study Library
                  <ArrowRight className="h-4 w-4" aria-hidden="true" />
                </Link>
              </div>

              <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
                {relatedProjects.map((item) => (
                  <ProjectShowcaseCard key={item.slug} project={item} />
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
