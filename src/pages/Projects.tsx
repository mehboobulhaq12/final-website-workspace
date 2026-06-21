import { useCallback, useMemo, useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ScrollToTop from "@/components/ScrollToTop";
import SeoHead from "@/components/SeoHead";
import ProjectShowcaseCard from "@/components/projects/ProjectShowcaseCard";
import { TextShimmer } from "@/components/ui/text-shimmer";
import AiSystemPromptSection from "@/components/AiSystemPromptSection";
import OnboardingModal from "@/components/OnboardingModal";
import { caseStudiesPath, getProjectsStructuredData, projects } from "@/lib/projects";
import { getCanonicalUrl } from "@/lib/seo";

export default function Projects() {
  const structuredData = useMemo(() => getProjectsStructuredData(), []);
  const [onboardingOpen, setOnboardingOpen] = useState(false);
  const [onboardingSeed, setOnboardingSeed] = useState("");

  const openOnboarding = useCallback((seed = "") => {
    setOnboardingSeed(seed);
    setOnboardingOpen(true);
  }, []);

  return (
    <>
      <SeoHead
        title="Case Studies | Effect3 Production AI Systems and Deployments"
        description="Review Effect3 case studies across inbound automation, AI voice workflows, dashboards, GTM systems, and conversion-focused operating layers."
        canonical={getCanonicalUrl(caseStudiesPath)}
        structuredData={structuredData}
      />
      <div className="min-h-screen bg-black text-white">
        <Navbar />
        <main>
          <AiSystemPromptSection
            variant="projects"
            onPromptSend={(message) => {
              openOnboarding(message);
            }}
          />

          <section className="px-6 py-16 md:px-10 lg:px-16 lg:py-20">
            <div className="mx-auto max-w-7xl">
              <div className="mb-10 flex flex-col gap-4 border-b border-white/8 pb-6 md:flex-row md:items-end md:justify-between">
                <div>
                  <p className="text-xs font-light uppercase tracking-[0.24em] text-white/38">Case Studies</p>
                  <h2 className="mt-3 text-3xl font-extralight tracking-tight text-white/94 md:text-4xl text-balance">
                    Production systems from the <TextShimmer as="span" duration={2} spread={3} className="italic font-light [--base-color:theme(colors.orange.300)] [--base-gradient-color:theme(colors.orange.100)]">Effect3 deployment stack</TextShimmer>
                  </h2>
                </div>
                <p className="max-w-md text-sm font-light leading-7 text-white/48 md:text-right">
                  Start with the case study summary. Use the breakdown to understand the workflow, the operating problem, and the system Effect3 actually shipped.
                </p>
              </div>

              <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
                {projects.map((project) => (
                  <ProjectShowcaseCard key={project.slug} project={project} />
                ))}
              </div>
            </div>
          </section>
        </main>
        <Footer />
        <ScrollToTop />
      </div>
      <OnboardingModal
        open={onboardingOpen}
        onClose={() => {
          setOnboardingOpen(false);
          setOnboardingSeed("");
        }}
        mode="implement"
        initialProblem={onboardingSeed}
      />
    </>
  );
}
