import { useState, useCallback } from "react";
import { AnimatePresence } from "framer-motion";
import Hero from "@/components/ui/neural-network-hero";
import Navbar from "@/components/Navbar";
import TrustedBy from "@/components/TrustedBy";
import LoadingScreen from "@/components/LoadingScreen";
import { TextShimmer } from "@/components/ui/text-shimmer";

const Index = () => {
  const [loading, setLoading] = useState(true);

  const handleLoadingComplete = useCallback(() => {
    setLoading(false);
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
                className="italic font-light [--base-color:theme(colors.blue.200)] [--base-gradient-color:theme(colors.white)] dark:[--base-color:theme(colors.blue.200)] dark:[--base-gradient-color:theme(colors.white)]"
              >
                More Conversions
              </TextShimmer>
            </>
          }
          description="We deploy custom AI agents that revive your dead leads and bring your old leads and customers back to life, and make them paying customers again."
          badgeText="Enterprises AI System"
          badgeLabel="online"
          ctaButtons={[
            { text: "Implement Now", href: "#get-started", primary: true }
          ]}
          microDetails={["Get your most boring work handled by AI agents."]}
        />
        <TrustedBy />
      </div>
    </>
  );
};

export default Index;
