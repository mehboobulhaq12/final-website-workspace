import { useRef, useEffect, useState } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { TextShimmer } from "@/components/ui/text-shimmer";
import {
  Mail, Bot, Check, Search, Clock, AlertTriangle,
  BarChart3, Globe, PenTool,
  Target, Brain, Zap, Eye, PhoneCall, FileText, TrendingUp,
  Layers, Sparkles, Activity, Frown, Send, Filter,
  Headphones, LayoutDashboard, Share2, CalendarCheck,
  Repeat, Database, Cpu, LineChart, Radar, Megaphone
} from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

/* ─── Data ─── */
const standardSections = [
  {
    label: "Converting Dead Customers",
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
    label: "Content + Distribution",
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

const frustrationLabels = ["Exhausting...", "Overwhelming...", "Impossible..."];

/* ─── Synced Animation: shows one group at a time on both sides ─── */
const SyncedComparison = () => {
  const [activeGroupIdx, setActiveGroupIdx] = useState(0);
  const [stdStepIdx, setStdStepIdx] = useState(-1);
  const [e3StepIdx, setE3StepIdx] = useState(-1);
  const [phase, setPhase] = useState<"std" | "e3" | "pause">("std");
  const containerRef = useRef<HTMLDivElement>(null);
  const startedRef = useRef(false);

  useEffect(() => {
    let timeout: ReturnType<typeof setTimeout>;
    let interval: ReturnType<typeof setInterval>;

    const trigger = ScrollTrigger.create({
      trigger: containerRef.current,
      start: "top 85%",
      once: true,
      onEnter: () => {
        if (startedRef.current) return;
        startedRef.current = true;
        runGroup(0);
      },
    });

    function runGroup(groupIdx: number) {
      setActiveGroupIdx(groupIdx);
      setStdStepIdx(-1);
      setE3StepIdx(-1);
      setPhase("std");

      // Phase 1: reveal standard steps one by one
      let step = 0;
      interval = setInterval(() => {
        setStdStepIdx(step);
        step++;
        if (step >= 8) {
          clearInterval(interval);
          // Short pause then show Effect3
          timeout = setTimeout(() => {
            setPhase("e3");
            let e3Step = 0;
            interval = setInterval(() => {
              setE3StepIdx(e3Step);
              e3Step++;
              if (e3Step >= 3) {
                clearInterval(interval);
                // Pause then next group
                timeout = setTimeout(() => {
                  const nextGroup = (groupIdx + 1) % 3;
                  runGroup(nextGroup);
                }, 2000);
              }
            }, 600);
          }, 600);
        }
      }, 400);
    }

    return () => {
      trigger.kill();
      clearTimeout(timeout);
      clearInterval(interval);
    };
  }, []);

  const currentStd = standardSections[activeGroupIdx];
  const currentE3 = effect3Sections[activeGroupIdx];

  return (
    <div ref={containerRef} className="flex flex-col sm:flex-row gap-0 w-full">
      {/* Standard Process Card */}
      <div className="flex-1 border border-white/10 rounded-t-xl sm:rounded-l-xl sm:rounded-tr-none p-4 sm:p-5 bg-white/[0.02] min-h-[340px] sm:min-h-[400px]">
        <p className="text-[10px] sm:text-xs font-mono tracking-[0.2em] text-white/40 uppercase mb-4 text-center">
          Standard Process
        </p>

        <div className="flex flex-col gap-0.5">
          <p className="text-[7px] sm:text-[8px] font-mono tracking-widest text-white/25 uppercase mb-1 transition-all duration-500">
            {currentStd.label}
          </p>
          {currentStd.steps.map((step, i) => {
            const isActive = stdStepIdx === i;
            const isPast = stdStepIdx > i;
            const isFailStep = i === 7;
            return (
              <div key={`${activeGroupIdx}-${i}`} className="flex flex-col items-center">
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
                  <span className={`text-[7px] sm:text-[8px] font-light tracking-tight transition-all duration-500 ${
                    isActive
                      ? isFailStep ? "text-red-400/70" : "text-white/50"
                      : isPast ? "text-white/25" : "text-white/12"
                  }`}>
                    {step.label}
                  </span>
                </div>
                {i < 7 && (
                  <div className={`w-px h-1 transition-all duration-500 mt-0.5 ${
                    isActive ? "bg-white/20" : isPast ? "bg-white/10" : "bg-white/5"
                  }`} />
                )}
              </div>
            );
          })}
          {stdStepIdx >= 7 && (
            <div className="flex items-center gap-1.5 mt-1 ml-0.5 animate-fade-in">
              <Frown className="w-2.5 h-2.5 text-red-400/50" />
              <span className="text-[7px] text-red-400/40 font-light italic">
                {frustrationLabels[activeGroupIdx]}
              </span>
            </div>
          )}
        </div>

        <p className="text-[10px] sm:text-xs text-white/30 text-center mt-4 font-light">
          Manual Hand-offs
        </p>
      </div>

      {/* Effect3 System Card */}
      <div className="flex-1 border border-white/10 rounded-b-xl sm:rounded-r-xl sm:rounded-bl-none p-4 sm:p-5 bg-white/[0.04] border-t-0 sm:border-t sm:border-l-0 min-h-[220px] sm:min-h-[400px] flex flex-col">
        <p className="text-[10px] sm:text-xs font-mono tracking-[0.2em] text-orange-400/80 uppercase mb-4 text-center">
          Effect3 System
        </p>

        <div className="flex-1 flex flex-col justify-center gap-1">
          <p className="text-[8px] sm:text-[9px] font-mono tracking-widest text-orange-400/40 uppercase mb-1 transition-all duration-500">
            {currentE3.label}
          </p>
          {currentE3.steps.map((step, i) => {
            const isActive = phase === "e3" && e3StepIdx === i;
            const isPast = phase === "e3" && e3StepIdx > i;
            const isSuccess = i === 2;
            const isVisible = phase === "e3" && e3StepIdx >= i;
            return (
              <div
                key={`${activeGroupIdx}-${i}`}
                className={`flex flex-col items-center transition-all duration-500 ${
                  isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-2"
                }`}
              >
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
                  <span className={`text-[8px] sm:text-[9px] font-light tracking-tight transition-all duration-500 ${
                    isActive
                      ? isSuccess ? "text-green-300/80" : "text-orange-300/80"
                      : isPast ? "text-orange-300/30" : "text-white/15"
                  }`}>
                    {step.label}
                  </span>
                </div>
                {i < 2 && (
                  <div className={`w-px h-2 transition-all duration-500 mt-0.5 ${
                    isActive || isPast ? "bg-orange-400/30" : "bg-white/5"
                  }`} />
                )}
              </div>
            );
          })}
        </div>

        <p className="text-[10px] sm:text-xs text-orange-300/40 text-center mt-4 font-light">
          Fully Automated
        </p>
      </div>

      {/* Group indicator dots */}
      <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex gap-1.5 sm:hidden">
        {[0, 1, 2].map((i) => (
          <div
            key={i}
            className={`h-[2px] rounded-full transition-all duration-500 ${
              i === activeGroupIdx ? "w-4 bg-orange-400/60" : "w-2 bg-white/15"
            }`}
          />
        ))}
      </div>
    </div>
  );
};

/* ─── Main Section ─── */
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
      <div className="parallax-inner mx-auto max-w-7xl px-6 md:px-10 lg:px-16 grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-start">
        {/* Left: Text */}
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
              <span className="hidden sm:inline">We give brands an AI-powered engine that handles dead lead revival, content distribution, and programmatic SEO discovery.</span>
              <span className="sm:hidden">AI-powered lead revival, content distribution, and SEO discovery — in one system.</span>
            </p>
            <ul className="flex flex-col gap-3 text-sm sm:text-base font-light leading-relaxed tracking-tight text-white/50">
              <li className="flex items-start gap-2">
                <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-orange-400/40 shrink-0" />
                <span className="hidden sm:inline">Target inactive leads, segment by sentiment, and deploy personalised campaigns across email, AI voice agents, and web systems.</span>
                <span className="sm:hidden">Revive dead leads with AI-personalised campaigns.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-orange-400/40 shrink-0" />
                <span className="hidden sm:inline">Create niche content within 48 hours, distribute across channels, and track every conversion automatically.</span>
                <span className="sm:hidden">48hr content creation, distribution, and tracking.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-orange-400/40 shrink-0" />
                <span className="hidden sm:inline">Programmatic SEO to rank on LLMs and search engines, so new customers discover your brand organically.</span>
                <span className="sm:hidden">Programmatic SEO for LLMs and search engines.</span>
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

        {/* Right: Synced comparison */}
        <div ref={diagramRef} className="relative w-full">
          <SyncedComparison />
        </div>
      </div>
    </section>
  );
};

export default ProblemSection;
