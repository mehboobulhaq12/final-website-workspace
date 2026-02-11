import { useState, useCallback } from "react";
import { AnimatePresence } from "framer-motion";
import Hero from "@/components/ui/neural-network-hero";
import Navbar from "@/components/Navbar";
import TrustedBy from "@/components/TrustedBy";
import LoadingScreen from "@/components/LoadingScreen";

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
          title="Transform your business with AI."
          description="Custom AI implementations tailored to your business that automate entire departments from the inside, end to end. No generalized software that only does half the job. No 18-month timelines or migrations required."
          badgeText="Enterprises AI System"
          badgeLabel="online"
          ctaButtons={[
            { text: "Get started", href: "#get-started", primary: true },
            { text: "Book a demo", href: "#demo" }
          ]}
          microDetails={["Low‑weight font", "Tight tracking", "Subtle motion"]}
        />
        <TrustedBy />
      </div>
    </>
  );
};

export default Index;
