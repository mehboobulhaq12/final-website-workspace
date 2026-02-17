import { useRef, useState, useEffect, useCallback } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { TextShimmer } from "@/components/ui/text-shimmer";

gsap.registerPlugin(ScrollTrigger);

const headlines = [
  "AI Writing App with 20% monthly churn recovered 11% of churned subscribers in 45 days.",
  "Gymwear Brand Recovered 15–35% of Inactive Customers in 60 Days Using Effect3 Revenue Recovery System.",
  "B2B SaaS Platform re-engaged 2,400 dormant accounts and converted 18% into paid plans within 30 days.",
  "D2C Skincare Brand brought back 22% of lapsed buyers through AI-powered win-back sequences in under 6 weeks.",
];

const RotatingHeadlines = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isVisible, setIsVisible] = useState(true);
  const containerRef = useRef<HTMLDivElement>(null);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const startedRef = useRef(false);

  const startCycling = useCallback(() => {
    if (startedRef.current) return;
    startedRef.current = true;
    // Show first headline immediately
    setIsVisible(true);
    intervalRef.current = setInterval(() => {
      setIsVisible(false);
      setTimeout(() => {
        setCurrentIndex((prev) => (prev + 1) % headlines.length);
        setIsVisible(true);
      }, 500);
    }, 4000);
  }, []);

  useEffect(() => {
    const trigger = ScrollTrigger.create({
      trigger: containerRef.current,
      start: "top 85%",
      once: true,
      onEnter: () => startCycling(),
    });

    return () => {
      trigger.kill();
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [startCycling]);

  return (
    <div ref={containerRef} className="relative min-h-[3.5rem] sm:min-h-[3rem] md:min-h-[2.5rem] mt-4">
      <p
        className="max-w-3xl text-sm sm:text-base font-light leading-relaxed tracking-tight text-orange-300/70 italic"
        style={{
          transition: "all 0.5s cubic-bezier(0.16, 1, 0.3, 1)",
          opacity: isVisible ? 1 : 0,
          transform: isVisible ? "translateY(0) scale(1)" : "translateY(-14px) scale(0.97)",
          filter: isVisible ? "blur(0px)" : "blur(6px)",
        }}
      >
        "{headlines[currentIndex]}"
      </p>
      {/* Progress dots */}
      <div className="flex gap-1.5 mt-3 justify-center">
        {headlines.map((_, i) => (
          <div
            key={i}
            className={`h-[2px] rounded-full transition-all duration-500 ${
              i === currentIndex ? "w-5 bg-orange-400/60" : "w-2 bg-white/10"
            }`}
          />
        ))}
      </div>
    </div>
  );
};

const ProblemStatement = () => {
  const sectionRef = useRef<HTMLElement | null>(null);
  const statRef = useRef<HTMLDivElement | null>(null);
  const subtitleRef = useRef<HTMLParagraphElement | null>(null);
  const bodyRef = useRef<HTMLDivElement | null>(null);

  useGSAP(
    () => {
      if (!sectionRef.current) return;

      const elements = [statRef.current, subtitleRef.current, bodyRef.current].filter(Boolean);
      gsap.set(elements, { autoAlpha: 0, y: 30 });

      gsap.to(elements, {
        autoAlpha: 1,
        y: 0,
        duration: 0.8,
        stagger: 0.15,
        ease: "power3.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 80%",
          once: true,
        },
      });

      const inner = sectionRef.current.querySelector(".parallax-inner");
      if (inner) {
        gsap.to(inner, {
          yPercent: -8,
          ease: "none",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top bottom",
            end: "bottom top",
            scrub: 0.6,
          },
        });
      }
    },
    { scope: sectionRef }
  );

  return (
    <section
      ref={sectionRef}
      className="w-full pt-24 md:pt-32 pb-12 md:pb-16 bg-black border-t border-white/5 overflow-hidden"
    >
      <div className="parallax-inner mx-auto max-w-4xl px-6 md:px-10 lg:px-16 flex flex-col items-center text-center gap-4">
        <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1.5 backdrop-blur-sm">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
          </span>
          <span className="text-xs font-light tracking-tight text-white/80">AI Revenue Recovery System</span>
        </div>
        <h2 ref={statRef} className="text-5xl sm:text-6xl md:text-7xl font-extralight tracking-tight">
          <span className="text-white/90">68% of Dead Leads </span>
          <TextShimmer
            as="span"
            duration={2}
            spread={4}
            className="italic font-light [--base-color:theme(colors.orange.300)] [--base-gradient-color:theme(colors.orange.100)] dark:[--base-color:theme(colors.orange.300)] dark:[--base-gradient-color:theme(colors.orange.100)]"
          >
            Recovered
          </TextShimmer>
        </h2>

        <p
          ref={subtitleRef}
          className="text-lg sm:text-xl font-light tracking-tight text-white/60"
        >
          Proven average recovery rate from inactive and ghosted leads
        </p>

        <p className="max-w-3xl text-base sm:text-lg font-light leading-relaxed tracking-tight text-white/50">
          We partner with growth-focused SaaS, eCommerce, and service businesses
          to recover lost revenue from inactive leads and churned customers. Our
          AI agents automatically re-engage, personalise offers, and revive
          stalled conversations across Email, Web System, AI Voice Agents, and
          third-party platforms, turning lost opportunities into measurable
          revenue.
        </p>

        <div ref={bodyRef}>
          <RotatingHeadlines />
        </div>
      </div>
    </section>
  );
};

export default ProblemStatement;
