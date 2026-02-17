import { useRef, useEffect, useState } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { TextShimmer } from "@/components/ui/text-shimmer";
import {
  User, Mail, Bot, Check, Search, Clock, AlertTriangle,
  Users, BarChart3, MessageSquare, Megaphone, Globe, PenTool,
  Target, Brain, Zap, Eye, PhoneCall, FileText, TrendingUp,
  Layers, Sparkles, Activity, HeartCrack, Frown, Send, Filter,
  UserCheck, Headphones, LayoutDashboard, Share2, CalendarCheck,
  ThumbsUp, Repeat, Database, Cpu, LineChart, Radar
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
            <span className="text-white/90">Managing all of this at once is really </span>
            <TextShimmer
              as="span" duration={2} spread={4}
              className="italic font-light [--base-color:theme(colors.red.400)] [--base-gradient-color:theme(colors.orange.200)] dark:[--base-color:theme(colors.red.400)] dark:[--base-gradient-color:theme(colors.orange.200)]"
            >
              Painfully exhausting.
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

/* ─── Standard Process: 3 groups × 8 steps, one group at a time ─── */
const standardSections = [
  {
    label: "Converting Dead Customers Back Alive",
    steps: [
      { icon: <Target className="w-3 h-3" />, label: "Find Inactive Leads" },
      { icon: <Filter className="w-3 h-3" />, label: "Segment by Sentiment" },
      { icon: <Mail className="w-3 h-3" />, label: "Write Personalised Emails" },
      { icon: <Send className="w-3 h-3" />, label: "Send Campaign Manually" },
      { icon: <Clock className="w-3 h-3" />, label: "Wait & Chase Follow-Ups" },
      { icon: <PhoneCall className="w-3 h-3" />, label: "Cold Call One-by-One" },
      { icon: <Headphones className="w-3 h-3" />, label: "Handle Inbound Queries" },
      { icon: <AlertTriangle className="w-3 h-3" />, label: "Still Losing Leads" },
    ],
  },
  {
    label: "Content + Distribution & Tracking",
    steps: [
      { icon: <PenTool className="w-3 h-3" />, label: "Research Niche Topics" },
      { icon: <FileText className="w-3 h-3" />, label: "Write Long-Form Content" },
      { icon: <LayoutDashboard className="w-3 h-3" />, label: "Design Visual Assets" },
      { icon: <Share2 className="w-3 h-3" />, label: "Post to Each Channel" },
      { icon: <CalendarCheck className="w-3 h-3" />, label: "Schedule & Manage" },
      { icon: <Eye className="w-3 h-3" />, label: "Monitor Engagement" },
      { icon: <BarChart3 className="w-3 h-3" />, label: "Track Every Conversion" },
      { icon: <AlertTriangle className="w-3 h-3" />, label: "No Time for Strategy" },
    ],
  },
  {
    label: "AEO – Answer Engine Optimisation",
    steps: [
      { icon: <Search className="w-3 h-3" />, label: "Keyword & Query Research" },
      { icon: <FileText className="w-3 h-3" />, label: "Write SEO Pages" },
      { icon: <Globe className="w-3 h-3" />, label: "Publish & Submit Index" },
      { icon: <Database className="w-3 h-3" />, label: "Structure Data / Schema" },
      { icon: <Radar className="w-3 h-3" />, label: "Monitor LLM Citations" },
      { icon: <Repeat className="w-3 h-3" />, label: "Update Content Regularly" },
      { icon: <LineChart className="w-3 h-3" />, label: "Measure Organic Traffic" },
      { icon: <AlertTriangle className="w-3 h-3" />, label: "Still No Rankings" },
    ],
  },
];

const StandardProcessAnimation = () => {
  const [activeGroup, setActiveGroup] = useState(-1);
  const [activeStep, setActiveStep] = useState(-1);
  const containerRef = useRef<HTMLDivElement>(null);
  const startedRef = useRef(false);

  useEffect(() => {
    let timeout: ReturnType<typeof setTimeout>;
    let stepInterval: ReturnType<typeof setInterval>;

    const trigger = ScrollTrigger.create({
      trigger: containerRef.current,
      start: "top 85%",
      once: true,
      onEnter: () => {
        if (startedRef.current) return;
        startedRef.current = true;

        let group = 0;
        const stepsPerGroup = 8;

        const revealGroup = () => {
          setActiveGroup(group);
          let step = 0;

          stepInterval = setInterval(() => {
            setActiveStep(group * stepsPerGroup + step);
            step++;
            if (step >= stepsPerGroup) {
              clearInterval(stepInterval);
              group++;
              if (group < standardSections.length) {
                timeout = setTimeout(revealGroup, 800);
              } else {
                // Loop
                timeout = setTimeout(() => {
                  group = 0;
                  setActiveGroup(-1);
                  setActiveStep(-1);
                  timeout = setTimeout(revealGroup, 600);
                }, 1500);
              }
            }
          }, 500);
        };

        revealGroup();
      },
    });

    return () => {
      trigger.kill();
      clearTimeout(timeout);
      clearInterval(stepInterval);
    };
  }, []);

  const frustrationLabels = ["Exhausting...", "Overwhelming...", "Impossible..."];

  return (
    <div ref={containerRef} className="flex flex-col gap-3">
      {standardSections.map((section, sIdx) => {
        const isGroupVisible = activeGroup >= sIdx;
        const stepsPerGroup = 8;
        return (
          <div
            key={sIdx}
            className={`flex flex-col gap-0.5 transition-all duration-700 ease-out ${
              isGroupVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-3"
            }`}
          >
            <p className="text-[7px] font-mono tracking-widest text-white/25 uppercase mb-1">{section.label}</p>
            {section.steps.map((step, i) => {
              const globalIdx = sIdx * stepsPerGroup + i;
              const isActive = activeStep === globalIdx;
              const isPast = activeStep > globalIdx;
              const isFailStep = i === stepsPerGroup - 1;
              return (
                <div key={i} className="flex flex-col items-center">
                  <div className="flex items-center gap-1.5 w-full">
                    <div
                      className={`w-5 h-5 rounded flex items-center justify-center border transition-all duration-500 ease-in-out ${
                        isActive
                          ? isFailStep
                            ? "bg-red-500/15 border-red-400/40 scale-110 shadow-[0_0_12px_rgba(239,68,68,0.2)]"
                            : "bg-white/10 border-white/30 scale-110 shadow-[0_0_12px_rgba(255,255,255,0.08)]"
                          : isPast
                            ? "bg-white/5 border-white/15"
                            : "bg-white/[0.02] border-white/8"
                      }`}
                    >
                      <span className={`transition-colors duration-500 ${
                        isActive
                          ? isFailStep ? "text-red-400/80" : "text-white/60"
                          : isPast ? "text-white/30" : "text-white/15"
                      }`}>
                        {step.icon}
                      </span>
                    </div>
                    <span className={`text-[7px] font-light tracking-tight transition-all duration-500 ${
                      isActive
                        ? isFailStep ? "text-red-400/70" : "text-white/50"
                        : isPast ? "text-white/25" : "text-white/12"
                    }`}>
                      {step.label}
                    </span>
                  </div>
                  {i < stepsPerGroup - 1 && (
                    <div className={`w-px h-1 transition-all duration-500 mt-0.5 ${
                      isActive ? "bg-white/20" : isPast ? "bg-white/10" : "bg-white/5"
                    }`} />
                  )}
                </div>
              );
            })}
            {/* Frustration indicator */}
            {isGroupVisible && activeGroup === sIdx && (
              <div className="flex items-center gap-1.5 mt-1 ml-0.5 transition-all duration-500">
                <Frown className="w-2.5 h-2.5 text-red-400/50" />
                <span className="text-[7px] text-red-400/40 font-light italic">
                  {frustrationLabels[sIdx]}
                </span>
              </div>
            )}
            {sIdx < standardSections.length - 1 && isGroupVisible && (
              <div className="w-px h-2 bg-white/8 mx-auto mt-1" />
            )}
          </div>
        );
      })}
    </div>
  );
};

/* ─── Effect3 System: 3 groups × 3 steps ─── */
const effect3Sections = [
  {
    label: "Revenue Recovery",
    steps: [
      { icon: <Brain className="w-3 h-3" />, label: "AI Sentiment Analysis" },
      { icon: <Bot className="w-3 h-3" />, label: "Auto Campaigns Deploy" },
      { icon: <TrendingUp className="w-3 h-3" />, label: "Revenue Recovered" },
    ],
  },
  {
    label: "Content Distribution",
    steps: [
      { icon: <Sparkles className="w-3 h-3" />, label: "48hr Content Creation" },
      { icon: <Megaphone className="w-3 h-3" />, label: "Multi-Channel Push" },
      { icon: <Activity className="w-3 h-3" />, label: "Conversions Tracked" },
    ],
  },
  {
    label: "AEO Discovery",
    steps: [
      { icon: <Layers className="w-3 h-3" />, label: "Programmatic Pages" },
      { icon: <Globe className="w-3 h-3" />, label: "LLM + Search Ranking" },
      { icon: <Zap className="w-3 h-3" />, label: "New Customers Found" },
    ],
  },
];

const Effect3Animation = () => {
  const [activeGroup, setActiveGroup] = useState(-1);
  const [activeStep, setActiveStep] = useState(-1);
  const containerRef = useRef<HTMLDivElement>(null);
  const startedRef = useRef(false);

  useEffect(() => {
    let timeout: ReturnType<typeof setTimeout>;
    let stepInterval: ReturnType<typeof setInterval>;

    const trigger = ScrollTrigger.create({
      trigger: containerRef.current,
      start: "top 85%",
      once: true,
      onEnter: () => {
        if (startedRef.current) return;
        startedRef.current = true;

        let group = 0;
        const stepsPerGroup = 3;

        const revealGroup = () => {
          setActiveGroup(group);
          let step = 0;

          stepInterval = setInterval(() => {
            setActiveStep(group * stepsPerGroup + step);
            step++;
            if (step >= stepsPerGroup) {
              clearInterval(stepInterval);
              group++;
              if (group < effect3Sections.length) {
                timeout = setTimeout(revealGroup, 500);
              } else {
                timeout = setTimeout(() => {
                  group = 0;
                  setActiveGroup(-1);
                  setActiveStep(-1);
                  timeout = setTimeout(revealGroup, 600);
                }, 1500);
              }
            }
          }, 700);
        };

        revealGroup();
      },
    });

    return () => {
      trigger.kill();
      clearTimeout(timeout);
      clearInterval(stepInterval);
    };
  }, []);

  return (
    <div ref={containerRef} className="flex flex-col gap-3 py-1">
      {effect3Sections.map((section, sIdx) => {
        const isGroupVisible = activeGroup >= sIdx;
        const stepsPerGroup = 3;
        return (
          <div
            key={sIdx}
            className={`flex flex-col gap-1 transition-all duration-700 ease-out ${
              isGroupVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-3"
            }`}
          >
            <p className="text-[8px] font-mono tracking-widest text-orange-400/40 uppercase mb-1">{section.label}</p>
            {section.steps.map((step, i) => {
              const globalIdx = sIdx * stepsPerGroup + i;
              const isActive = activeStep === globalIdx;
              const isPast = activeStep > globalIdx;
              const isSuccess = i === stepsPerGroup - 1;
              return (
                <div key={i} className="flex flex-col items-center">
                  <div className="flex items-center gap-2 w-full">
                    <div
                      className={`w-6 h-6 rounded-md flex items-center justify-center border transition-all duration-500 ease-in-out ${
                        isActive
                          ? isSuccess
                            ? "bg-green-500/15 border-green-400/40 scale-110 shadow-[0_0_16px_rgba(34,197,94,0.2)]"
                            : "bg-orange-500/15 border-orange-400/40 scale-110 shadow-[0_0_16px_rgba(251,146,60,0.2)]"
                          : isPast
                            ? isSuccess
                              ? "bg-green-500/8 border-green-400/20"
                              : "bg-orange-500/8 border-orange-400/20"
                            : "bg-orange-500/[0.03] border-orange-400/10"
                      }`}
                    >
                      <span className={`transition-colors duration-500 ${
                        isActive
                          ? isSuccess ? "text-green-300" : "text-orange-300"
                          : isPast
                            ? isSuccess ? "text-green-400/50" : "text-orange-400/40"
                            : "text-orange-400/20"
                      }`}>
                        {isActive && isSuccess ? <Check className="w-3 h-3" /> : step.icon}
                      </span>
                    </div>
                    <span className={`text-[8px] font-light tracking-tight transition-all duration-500 ${
                      isActive
                        ? isSuccess ? "text-green-300/80" : "text-orange-300/80"
                        : isPast ? "text-orange-300/30" : "text-white/15"
                    }`}>
                      {step.label}
                    </span>
                  </div>
                  {i < stepsPerGroup - 1 && (
                    <div className={`w-px h-2 transition-all duration-500 mt-0.5 ${
                      isActive || isPast ? "bg-orange-400/30" : "bg-white/5"
                    }`} />
                  )}
                  {i === stepsPerGroup - 1 && sIdx < effect3Sections.length - 1 && (
                    <div className={`w-px h-2 mt-1 transition-all duration-500 ${
                      isPast || isActive ? "bg-orange-400/20" : "bg-white/5"
                    }`} />
                  )}
                </div>
              );
            })}
          </div>
        );
      })}
    </div>
  );
};

export default ProblemSection;
