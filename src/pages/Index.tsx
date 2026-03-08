import { useState, useCallback } from "react";
import { AnimatePresence } from "framer-motion";
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
import Footer from "@/components/Footer";
import LoadingScreen from "@/components/LoadingScreen";
import ScrollToTop from "@/components/ScrollToTop";
import OnboardingModal from "@/components/OnboardingModal";
import FindTheCapGame from "@/components/FindTheCapGame";
import { TextShimmer } from "@/components/ui/text-shimmer";
import aliRazaImg from "@/assets/clients/ali-raza.png";
import hassanAbbasImg from "@/assets/clients/hassan-abbas.png";
import awaisNematImg from "@/assets/clients/awais-nemat.png";
import brunoCasanovasImg from "@/assets/clients/bruno-casanovas.png";

const Index = () => {
  const [loading, setLoading] = useState(true);
  const [onboardingOpen, setOnboardingOpen] = useState(false);
  const [onboardingMode, setOnboardingMode] = useState<"audit" | "demo">("audit");

  const handleLoadingComplete = useCallback(() => {
    setLoading(false);
  }, []);

  const openOnboarding = useCallback((mode: "audit" | "demo") => {
    setOnboardingMode(mode);
    setOnboardingOpen(true);
  }, []);

  return (
    <>
      <AnimatePresence>
        {loading && <LoadingScreen onComplete={handleLoadingComplete} />}
      </AnimatePresence>
      <div className="w-screen min-h-screen flex flex-col relative">
        <Navbar />
        <Hero
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
          badgeText="Enterprises AI System"
          badgeLabel="online"
          ctaButtons={[
            { text: "Run A Free Churn Audit", href: "#get-started", primary: true }
          ]}
          microDetails={["Get your most boring work handled by AI agents."]}
          trustBadge={{
            avatars: [aliRazaImg, hassanAbbasImg, awaisNematImg, brunoCasanovasImg],
            text: "25+ companies",
          }}
          onCtaClick={(text) => {
            if (text.toLowerCase().includes("audit")) openOnboarding("audit");
            else if (text.toLowerCase().includes("demo")) openOnboarding("demo");
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
        <Footer />
        <ScrollToTop />
      </div>
      <OnboardingModal
        open={onboardingOpen}
        onClose={() => setOnboardingOpen(false)}
        mode={onboardingMode}
      />
    </>
  );
};

export default Index;
