import { useRef, useState, useEffect } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { TextShimmer } from "@/components/ui/text-shimmer";

gsap.registerPlugin(ScrollTrigger);

const ProblemStatement = () => {
  const sectionRef = useRef<HTMLElement | null>(null);
  const statRef = useRef<HTMLDivElement | null>(null);
  const subtitleRef = useRef<HTMLParagraphElement | null>(null);
  const bodyRef = useRef<HTMLParagraphElement | null>(null);
  const lineRef = useRef<HTMLDivElement | null>(null);

  useGSAP(
    () => {
      if (!sectionRef.current) return;

      const elements = [statRef.current, subtitleRef.current, lineRef.current, bodyRef.current].filter(Boolean);
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

      // Parallax on inner content
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
      <div className="parallax-inner mx-auto max-w-4xl px-6 md:px-10 lg:px-16 flex flex-col items-center text-center gap-6">
        <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1.5 backdrop-blur-sm">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
          </span>
          <span className="text-xs font-light tracking-tight text-white/80">The Results</span>
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

        <div
          ref={lineRef}
          className="w-16 h-px bg-white/10 my-1"
        />

        <p
          ref={bodyRef}
          className="max-w-3xl text-sm sm:text-lg font-light leading-relaxed tracking-tight text-white/50"
        >
          <span className="sm:hidden">We recover lost revenue from inactive leads and churned customers using AI agents that re-engage, personalise offers, and revive stalled conversations — turning lost opportunities into measurable revenue.</span>
          <span className="hidden sm:inline">We partner with growth-focused SaaS, eCommerce, and service businesses
          to recover lost revenue from inactive leads and churned customers. Our
          AI agents automatically re-engage, personalise offers, and revive
          stalled conversations across Email, Web System, AI Voice Agents, and
          third-party platforms, turning lost opportunities into measurable
          revenue.</span>
        </p>

        <ProblemStatementHeadlines />
      </div>
    </section>
  );
};

/* Rotating headlines for the 68% section */
const ProblemStatementHeadlines = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const startedRef = useRef(false);

  const headlines = [
    "AI Writing App with 20% monthly churn recovered 11% of churned subscribers in 45 days.",
    "Gymwear Brand recovered 15–35% of inactive customers in 60 days using Effect3 Revenue Recovery system.",
    "SaaS Platform cut involuntary churn by 28% and reactivated 1,200+ expired trials in under 90 days.",
    "D2C Skincare Brand re-engaged 22% of lapsed buyers and generated $140K in win-back revenue within 8 weeks.",
  ];

  useEffect(() => {
    let interval: ReturnType<typeof setInterval>;

    const trigger = ScrollTrigger.create({
      trigger: containerRef.current,
      start: "top 85%",
      once: true,
      onEnter: () => {
        if (startedRef.current) return;
        startedRef.current = true;
        let step = 0;
        interval = setInterval(() => {
          step++;
          setActiveIndex(step % headlines.length);
        }, 3500);
      },
    });

    return () => {
      trigger.kill();
      clearInterval(interval);
    };
  }, []);

  return (
    <div ref={containerRef} className="relative h-[80px] sm:h-[60px] overflow-hidden rounded-lg border border-white/5 bg-white/[0.02] px-5 py-4 mt-2 w-full max-w-3xl">
      {headlines.map((headline, i) => (
        <p
          key={i}
          className={`absolute inset-x-5 top-4 text-sm sm:text-[15px] italic font-light leading-relaxed tracking-tight transition-all duration-1000 ease-[cubic-bezier(0.16,1,0.3,1)] ${
            activeIndex === i
              ? "opacity-100 translate-y-0"
              : i === (activeIndex - 1 + headlines.length) % headlines.length
                ? "opacity-0 -translate-y-4"
                : "opacity-0 translate-y-4"
          } text-orange-200/70`}
        >
          &ldquo;{headline}&rdquo;
        </p>
      ))}
    </div>
  );
};

export default ProblemStatement;
