import { useState, useCallback, useEffect, useMemo, useRef } from "react";
import { AnimatePresence } from "framer-motion";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Hero from "@/components/ui/neural-network-hero";
import Navbar from "@/components/Navbar";
import TrustedBy from "@/components/TrustedBy";
import DashboardShowcase from "@/components/DashboardShowcase";
import ProblemStatement from "@/components/ProblemStatement";
import ProblemSection from "@/components/ProblemSection";
import InfrastructureSection from "@/components/InfrastructureSection";
import FeaturesSection from "@/components/FeaturesSection";
import IntegrationSection from "@/components/IntegrationSection";
import OutcomeSection from "@/components/OutcomeSection";
import TestimonialSection from "@/components/TestimonialSection";
import CaseStudiesSection from "@/components/CaseStudiesSection";
import FAQSection from "@/components/FAQSection";
import CTASection from "@/components/CTASection";
import BookingSection from "@/components/BookingSection";
import AiSystemPromptSection from "@/components/AiSystemPromptSection";
import Footer from "@/components/Footer";
import LoadingScreen from "@/components/LoadingScreen";
import ScrollToTop from "@/components/ScrollToTop";
import OnboardingModal from "@/components/OnboardingModal";
import FindTheCapGame from "@/components/FindTheCapGame";
import HyperAgentsPopup from "@/components/HyperAgentsPopup";
import SeoHead from "@/components/SeoHead";
import { TextShimmer } from "@/components/ui/text-shimmer";
import aliRazaImg from "@/assets/clients/ali-raza.png";
import hassanAbbasImg from "@/assets/clients/hassan-abbas.png";
import awaisNematImg from "@/assets/clients/awais-nemat.png";
import brunoCasanovasImg from "@/assets/clients/bruno-casanovas.png";
import { getHomeStructuredData, siteKeywords, siteMeta } from "@/lib/seo";

const Index = () => {
  const isPrerenderMode = useMemo(() => {
    if (typeof window === "undefined") return false;

    const search = new URLSearchParams(window.location.search);
    return search.has("prerender") || /HeadlessChrome/i.test(window.navigator.userAgent);
  }, []);

  const [loading, setLoading] = useState(() => {
    if (typeof window === "undefined") return true;

    const search = new URLSearchParams(window.location.search);
    const isPrerenderRequest =
      search.has("prerender") || /HeadlessChrome/i.test(window.navigator.userAgent);

    return !isPrerenderRequest;
  });
  const [onboardingOpen, setOnboardingOpen] = useState(false);
  const [onboardingMode, setOnboardingMode] = useState<"audit" | "implement" | "demo">("audit");
  const [onboardingSeed, setOnboardingSeed] = useState("");
  const hasHandledIntent = useRef(false);
  const structuredData = useMemo(() => getHomeStructuredData(), []);

  const handleLoadingComplete = useCallback(() => {
    setLoading(false);
  }, []);

  const openOnboarding = useCallback((mode: "audit" | "implement" | "demo", seed = "") => {
    setOnboardingMode(mode);
    setOnboardingSeed(seed);
    setOnboardingOpen(true);
  }, []);

  useEffect(() => {
    if (loading || typeof window === "undefined") return;

    // Recalculate GSAP entry points after the loading overlay exits and layout settles.
    const refreshTriggers = () => ScrollTrigger.refresh(true);
    const rafId = window.requestAnimationFrame(refreshTriggers);
    const firstPass = window.setTimeout(refreshTriggers, 300);
    const secondPass = window.setTimeout(refreshTriggers, 1200);

    window.addEventListener("load", refreshTriggers, { once: true });

    return () => {
      window.cancelAnimationFrame(rafId);
      window.clearTimeout(firstPass);
      window.clearTimeout(secondPass);
      window.removeEventListener("load", refreshTriggers);
    };
  }, [loading]);

  useEffect(() => {
    if (loading || typeof window === "undefined" || hasHandledIntent.current) return;

    const url = new URL(window.location.href);
    const intent = url.searchParams.get("intent");
    if (!intent) return;

    const source = url.searchParams.get("source");
    const workflow = url.searchParams.get("workflow");
    const seedParts = [
      workflow ? `Workflow: ${workflow}` : "",
      source ? `Source: ${source}` : "",
    ].filter(Boolean);

    hasHandledIntent.current = true;
    openOnboarding("demo", seedParts.join(" | "));

    url.searchParams.delete("intent");
    url.searchParams.delete("source");
    url.searchParams.delete("workflow");
    const nextUrl = `${url.pathname}${url.search}${url.hash}`;
    window.history.replaceState({}, "", nextUrl);
  }, [loading, openOnboarding]);

  return (
    <>
      <SeoHead
        title={siteMeta.defaultTitle}
        description={siteMeta.defaultDescription}
        canonical={`${siteMeta.url}/`}
        keywords={siteKeywords}
        structuredData={structuredData}
      />
      <AnimatePresence>
        {loading && <LoadingScreen onComplete={handleLoadingComplete} />}
      </AnimatePresence>
      <div className="w-screen min-h-screen flex flex-col relative">
        <Navbar />
        <HyperAgentsPopup enabled={!loading && !isPrerenderMode} />
        <Hero
          disableBackground={isPrerenderMode}
          title={
            <>
              AI Systems Built for One Thing:{" "}
              <TextShimmer
                as="span"
                duration={2}
                spread={4}
                className="italic font-light [--base-color:theme(colors.orange.300)] [--base-gradient-color:theme(colors.orange.100)] dark:[--base-color:theme(colors.orange.300)] dark:[--base-gradient-color:theme(colors.orange.100)]"
              >
                More Conversions
              </TextShimmer>
            </>
          }
          description="We deploy custom AI agents that revive your dead leads and bring your customers back to life, turning them into paying customers again."
          badgeText="AI Operating Systems Company"
          badgeLabel="online"
          ctaButtons={[
            { text: "Book a System Review", href: "#book", primary: true }
          ]}
          trustBadge={{
            avatars: [aliRazaImg, hassanAbbasImg, awaisNematImg, brunoCasanovasImg],
            text: "25+ companies",
          }}
          onCtaClick={(text) => {
            const normalized = text.toLowerCase();
            if (normalized.includes("audit")) openOnboarding("audit");
            else if (normalized.includes("implement")) openOnboarding("implement");
            else openOnboarding("demo");
          }}
        />
        <TrustedBy />
        <DashboardShowcase />
        <ProblemStatement />
        <ProblemSection />
        <InfrastructureSection />
        <FeaturesSection />
        <IntegrationSection />
        <OutcomeSection />
        <TestimonialSection />
        <CaseStudiesSection />
        <FAQSection />
        <CTASection onCtaClick={(mode) => openOnboarding(mode)} />
        <BookingSection />
        <AiSystemPromptSection
          onPromptSend={(message) => {
            openOnboarding("implement", message);
          }}
        />
        <Footer />
        <ScrollToTop />
      </div>
      <OnboardingModal
        open={onboardingOpen}
        onClose={() => {
          setOnboardingOpen(false);
          setOnboardingSeed("");
        }}
        mode={onboardingMode}
        initialProblem={onboardingSeed}
      />
      <FindTheCapGame />
    </>
  );
};

export default Index;
