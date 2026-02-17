import { useRef, useEffect, useState } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { TextShimmer } from "@/components/ui/text-shimmer";
import {
  User, Mail, Bot, Check, Search, Clock, AlertTriangle,
  Users, BarChart3, MessageSquare, Megaphone, Globe, PenTool,
  Target, Brain, Zap, Eye, PhoneCall, FileText, TrendingUp,
  Layers, Sparkles, Activity
} from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

const ProblemSection = () => {
  const sectionRef = useRef<HTMLElement | null>(null);
  const headingRef = useRef<HTMLDivElement | null>(null);
  const lineRef = useRef<HTMLDivElement | null>(null);
  const bodyRef = useRef<HTMLDivElement | null>(null);
  const resultRef = useRef<HTMLDivElement | null>(null);
  const diagramRef = useRef<HTMLDivElement | null>(null);

  useGSAP(
    () => {
      if (!sectionRef.current) return;

      const leftElements = [headingRef.current, lineRef.current, bodyRef.current, resultRef.current].filter(Boolean);
      gsap.set(leftElements, { autoAlpha: 0, y: 30 });
      gsap.set(diagramRef.current, { autoAlpha: 0, x: 40 });

      gsap.to(leftElements, {
        autoAlpha: 1, y: 0, duration: 0.8, stagger: 0.15, ease: "power3.out",
        scrollTrigger: { trigger: sectionRef.current, start: "top 75%", once: true },
      });

      gsap.to(diagramRef.current, {
        autoAlpha: 1, x: 0, duration: 1, ease: "power3.out",
        scrollTrigger: { trigger: sectionRef.current, start: "top 70%", once: true },
      });

      const inner = sectionRef.current.querySelector(".parallax-inner");
      if (inner) {
        gsap.to(inner, {
          yPercent: -6,
          ease: "none",
          scrollTrigger: { trigger: sectionRef.current, start: "top bottom", end: "bottom top", scrub: 0.6 },
        });
      }
    },
    { scope: sectionRef }
  );

  return (
    <section ref={sectionRef} className="w-full pt-12 md:pt-16 pb-12 md:pb-16 bg-black overflow-hidden">
      <div className="parallax-inner mx-auto max-w-7xl px-6 md:px-10 lg:px-16 grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-20 items-start">
        {/* Left: Text content */}
        <div className="flex flex-col gap-6">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1.5 backdrop-blur-sm">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
              </span>
              <span className="text-xs font-light tracking-tight text-white/80">The Friction Map</span>
            </div>
          </div>
          <h2 ref={headingRef} className="text-3xl sm:text-4xl md:text-5xl font-extralight tracking-tight leading-[1.1]">
            <span className="text-white/90">Revenue recovery, content, and SEO at scale is </span>
            <TextShimmer
              as="span" duration={2} spread={4}
              className="italic font-light [--base-color:theme(colors.orange.300)] [--base-gradient-color:theme(colors.orange.100)] dark:[--base-color:theme(colors.orange.300)] dark:[--base-gradient-color:theme(colors.orange.100)]"
            >
              impossible manually.
            </TextShimmer>
          </h2>

          <div ref={lineRef} className="w-14 h-[3px] bg-orange-400/60 rounded-full" />

          <div ref={bodyRef} className="flex flex-col gap-5">
            <p className="text-base sm:text-lg font-light leading-relaxed tracking-tight text-white/60">
              <span className="text-white/80 font-normal">Three systems, one platform</span>
              <br />
              We give brands an AI-powered engine that handles dead lead revival, content distribution, and programmatic SEO discovery.
            </p>
            <ul className="flex flex-col gap-3 text-base sm:text-lg font-light leading-relaxed tracking-tight text-white/50">
              <li className="flex items-start gap-2">
                <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-orange-400/40 shrink-0" />
                Target inactive leads, segment by sentiment, and deploy personalised campaigns across email, AI voice agents, and web systems.
              </li>
              <li className="flex items-start gap-2">
                <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-orange-400/40 shrink-0" />
                Create niche content within 48 hours, distribute across your channels, and track every conversion automatically.
              </li>
              <li className="flex items-start gap-2">
                <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-orange-400/40 shrink-0" />
                Programmatic SEO to rank on LLMs and search engines, so new customers discover your brand organically.
              </li>
            </ul>
          </div>

          <div ref={resultRef} className="mt-2">
            <p className="text-base sm:text-lg font-light leading-relaxed tracking-tight text-white/60">
              <span className="text-white/80 font-normal">The result:</span>
              <br />
              Instead of hiring teams for each function, you deploy one AI system that works 24/7 across all three.
            </p>
          </div>
        </div>

        {/* Right: Comparison diagram */}
        <div ref={diagramRef} className="flex gap-0 w-full">
          {/* Standard Process */}
          <div className="flex-1 border border-white/10 rounded-l-xl p-5 bg-white/[0.02]">
            <p className="text-[10px] sm:text-xs font-mono tracking-[0.2em] text-white/40 uppercase mb-4 text-center">
              Standard Process
            </p>
            <StandardProcessAnimation />
            <p className="text-[10px] sm:text-xs text-white/30 text-center mt-5 font-light">
              Manual Hand-offs
            </p>
          </div>

          {/* Effect3 System */}
          <div className="flex-1 border border-white/10 rounded-r-xl p-5 bg-white/[0.04] border-l-0">
            <p className="text-[10px] sm:text-xs font-mono tracking-[0.2em] text-orange-400/80 uppercase mb-4 text-center">
              Effect3 System
            </p>
            <Effect3Animation />
            <p className="text-[10px] sm:text-xs text-orange-300/40 text-center mt-5 font-light">
              Fully Automated
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

/* Standard Process: Shows 3 offerings as manual steps - each one is painful */
const StandardProcessAnimation = () => {
  const [activeIndex, setActiveIndex] = useState(-1);
  const containerRef = useRef<HTMLDivElement>(null);
  const startedRef = useRef(false);

  useEffect(() => {
    const totalSteps = 12;
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
          setActiveIndex(step % totalSteps);
          step++;
        }, 800);
      },
    });

    return () => {
      trigger.kill();
      clearInterval(interval);
    };
  }, []);

  const sections = [
    {
      label: "Revenue Recovery",
      steps: [
        { icon: <Target className="w-3 h-3" />, label: "Find Inactive" },
        { icon: <Users className="w-3 h-3" />, label: "Segment Leads" },
        { icon: <Mail className="w-3 h-3" />, label: "Write Emails" },
        { icon: <Clock className="w-3 h-3" />, label: "Follow Up" },
      ],
    },
    {
      label: "Content Distribution",
      steps: [
        { icon: <PenTool className="w-3 h-3" />, label: "Create Content" },
        { icon: <Megaphone className="w-3 h-3" />, label: "Distribute" },
        { icon: <Eye className="w-3 h-3" />, label: "Track Results" },
        { icon: <BarChart3 className="w-3 h-3" />, label: "Measure ROI" },
      ],
    },
    {
      label: "SEO Discovery",
      steps: [
        { icon: <Search className="w-3 h-3" />, label: "Keyword Research" },
        { icon: <FileText className="w-3 h-3" />, label: "Write Pages" },
        { icon: <Globe className="w-3 h-3" />, label: "Publish & Index" },
        { icon: <AlertTriangle className="w-3 h-3" />, label: "No Rankings" },
      ],
    },
  ];

  let globalIndex = 0;

  return (
    <div ref={containerRef} className="flex flex-col gap-3">
      {sections.map((section, sIdx) => (
        <div key={sIdx} className="flex flex-col gap-1">
          <p className="text-[8px] font-mono tracking-widest text-white/25 uppercase mb-1">{section.label}</p>
          {section.steps.map((step, i) => {
            const thisIndex = globalIndex++;
            const isActive = activeIndex === thisIndex;
            const isLast = i === section.steps.length - 1 && sIdx === sections.length - 1;
            const isFailStep = sIdx === 2 && i === 3;
            return (
              <div key={i} className="flex flex-col items-center">
                <div className="flex items-center gap-2 w-full">
                  <div
                    className={`w-6 h-6 rounded flex items-center justify-center border transition-all duration-700 ease-in-out ${
                      isActive
                        ? isFailStep
                          ? "bg-red-500/15 border-red-400/40 scale-110 shadow-[0_0_12px_rgba(239,68,68,0.15)]"
                          : "bg-white/10 border-white/30 scale-110 shadow-[0_0_12px_rgba(255,255,255,0.08)]"
                        : "bg-white/[0.02] border-white/8"
                    }`}
                  >
                    <span className={`transition-colors duration-700 ${
                      isActive
                        ? isFailStep ? "text-red-400/80" : "text-white/60"
                        : "text-white/20"
                    }`}>
                      {step.icon}
                    </span>
                  </div>
                  <span className={`text-[8px] font-light tracking-tight transition-all duration-700 ${
                    isActive
                      ? isFailStep ? "text-red-400/70" : "text-white/50"
                      : "text-white/15"
                  }`}>
                    {step.label}
                  </span>
                </div>
                {!isLast && i === section.steps.length - 1 && (
                  <div className="w-px h-2 bg-white/8 mt-1" />
                )}
                {i < section.steps.length - 1 && (
                  <div className={`w-px h-2 transition-all duration-700 mt-0.5 ${isActive ? "bg-white/20" : "bg-white/5"}`} />
                )}
              </div>
            );
          })}
        </div>
      ))}
    </div>
  );
};

/* Effect3 System: Shows unified AI system handling all three offerings */
const Effect3Animation = () => {
  const [activeIndex, setActiveIndex] = useState(-1);
  const containerRef = useRef<HTMLDivElement>(null);
  const startedRef = useRef(false);

  useEffect(() => {
    const totalSteps = 5;
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
          setActiveIndex(step % totalSteps);
          step++;
        }, 1400);
      },
    });

    return () => {
      trigger.kill();
      clearInterval(interval);
    };
  }, []);

  const steps = [
    { icon: <User className="w-4 h-4" />, label: "Your Brand", isAgent: false },
    { icon: <Brain className="w-4 h-4" />, label: "AI Agent Army", isAgent: true },
    { icon: <Layers className="w-3.5 h-3.5" />, label: "Recovery + Content + SEO", isAgent: true },
    { icon: <Activity className="w-3.5 h-3.5" />, label: "Multi-Channel Deploy", isAgent: true },
    { icon: <TrendingUp className="w-4 h-4" />, label: "Revenue Growth", isAgent: true },
  ];

  return (
    <div ref={containerRef} className="flex flex-col items-center gap-2 py-2">
      {steps.map((step, i) => (
        <div key={i} className="flex flex-col items-center">
          <div className="flex items-center gap-2">
            <div
              className={`w-8 h-8 rounded-lg flex items-center justify-center border transition-all duration-700 ease-in-out ${
                activeIndex === i
                  ? step.isAgent
                    ? "bg-orange-500/20 border-orange-400/40 scale-110 shadow-[0_0_20px_rgba(251,146,60,0.25)]"
                    : "bg-white/15 border-white/30 scale-110 shadow-[0_0_12px_rgba(255,255,255,0.1)]"
                  : step.isAgent
                    ? "bg-orange-500/5 border-orange-400/20"
                    : "bg-white/5 border-white/15"
              }`}
            >
              <span className={`transition-colors duration-700 ${
                activeIndex === i
                  ? step.isAgent ? "text-orange-300" : "text-white/80"
                  : step.isAgent ? "text-orange-400/40" : "text-white/40"
              }`}>
                {step.icon}
              </span>
            </div>
            <span className={`text-[8px] font-light tracking-tight transition-all duration-700 w-24 ${
              activeIndex === i
                ? step.isAgent ? "text-orange-300/80" : "text-white/60"
                : "text-white/20"
            }`}>
              {step.label}
            </span>
          </div>
          {i < steps.length - 1 && (
            <div className={`w-px h-3 transition-all duration-700 mt-1 ${
              activeIndex >= i ? "bg-orange-400/40" : "bg-white/10"
            }`} />
          )}
        </div>
      ))}
    </div>
  );
};

export default ProblemSection;
