import { useRef, useEffect, useState } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { TextShimmer } from "@/components/ui/text-shimmer";
import { User, Mail, FileText, CheckSquare, Users, Check, Bot } from "lucide-react";

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
    },
    { scope: sectionRef }
  );

  return (
    <section ref={sectionRef} className="w-full pt-12 md:pt-16 pb-12 md:pb-16 bg-black">
      <div className="mx-auto max-w-7xl px-6 md:px-10 lg:px-16 grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-20 items-start">
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
            <span className="text-white/90">Manually tracking every lead is stressful and </span>
            <TextShimmer
              as="span" duration={2} spread={4}
              className="italic font-light [--base-color:theme(colors.orange.300)] [--base-gradient-color:theme(colors.orange.100)] dark:[--base-color:theme(colors.orange.300)] dark:[--base-gradient-color:theme(colors.orange.100)]"
            >
              unsustainable.
            </TextShimmer>
          </h2>

          <div ref={lineRef} className="w-14 h-[3px] bg-blue-400/60 rounded-full" />

          <div ref={bodyRef} className="flex flex-col gap-5">
            <p className="text-base sm:text-lg font-light leading-relaxed tracking-tight text-white/60">
              <span className="text-white/80 font-normal">The Friction Map</span>
              <br />
              Reviving old leads manually is almost impossible at scale.
            </p>
            <ul className="flex flex-col gap-3 text-base sm:text-lg font-light leading-relaxed tracking-tight text-white/50">
              <li className="flex items-start gap-2">
                <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-white/20 shrink-0" />
                Creating tailored emails for every lead would take weeks.
              </li>
              <li className="flex items-start gap-2">
                <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-white/20 shrink-0" />
                Following up consistently? Even harder.
              </li>
              <li className="flex items-start gap-2">
                <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-white/20 shrink-0" />
                Understanding sentiment and timing? Nearly impossible.
              </li>
            </ul>
          </div>

          <div ref={resultRef} className="mt-2">
            <p className="text-base sm:text-lg font-light leading-relaxed tracking-tight text-white/60">
              <span className="text-white/80 font-normal">The results:</span>
              <br />
              Instead of hiring more people to chase old leads, you deploy autonomous agents that work 24/7.
            </p>
          </div>
        </div>

        {/* Right: Comparison diagram */}
        <div ref={diagramRef} className="flex gap-0 w-full">
          {/* Standard Process */}
          <div className="flex-1 border border-white/10 rounded-l-xl p-6 bg-white/[0.02]">
            <p className="text-[10px] sm:text-xs font-mono tracking-[0.2em] text-white/40 uppercase mb-8 text-center">
              Standard Process (12 Steps)
            </p>
            <StandardProcessAnimation />
            <p className="text-[10px] sm:text-xs text-white/30 text-center mt-6 font-light">
              Manual Hand-offs
            </p>
          </div>

          {/* Effect3 System */}
          <div className="flex-1 border border-white/10 rounded-r-xl p-6 bg-white/[0.04] border-l-0">
            <p className="text-[10px] sm:text-xs font-mono tracking-[0.2em] text-orange-400/80 uppercase mb-8 text-center">
              Effect3 System (End-to-End)
            </p>
            <Effect3Animation />
            <p className="text-[10px] sm:text-xs text-blue-300/40 text-center mt-6 font-light">
              Fully Automated
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

/* Animated Standard Process: icons appear sequentially top-to-bottom, then loop */
const StandardProcessAnimation = () => {
  const [activeIndex, setActiveIndex] = useState(-1);
  const containerRef = useRef<HTMLDivElement>(null);
  const startedRef = useRef(false);

  useEffect(() => {
    const totalSteps = 4;
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

  const icons = [
    <User className="w-4 h-4 text-white/40" />,
    <Mail className="w-4 h-4 text-white/40" />,
    <FileText className="w-4 h-4 text-white/40" />,
    <Users className="w-4 h-4 text-white/40" />,
  ];

  return (
    <div ref={containerRef} className="flex flex-col items-center gap-4">
      {icons.map((icon, i) => (
        <div key={i}>
          <div
            className={`w-10 h-10 rounded-lg flex items-center justify-center border transition-all duration-500 ${
              activeIndex === i
                ? "bg-white/10 border-white/30 scale-110 shadow-[0_0_15px_rgba(255,255,255,0.1)]"
                : "bg-white/[0.03] border-white/10"
            }`}
          >
            {icon}
          </div>
          {i < icons.length - 1 && (
            <div className="flex justify-center mt-4">
              <div
                className={`w-px h-6 transition-all duration-500 ${
                  activeIndex === i ? "bg-white/40 shadow-[0_0_4px_rgba(255,255,255,0.2)]" : "bg-white/10"
                }`}
              />
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

/* Animated Effect3 System: smooth sequential glow from user → agent → checkmark, loops */
const Effect3Animation = () => {
  const [activeIndex, setActiveIndex] = useState(-1);
  const containerRef = useRef<HTMLDivElement>(null);
  const startedRef = useRef(false);

  useEffect(() => {
    const totalSteps = 3;
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
        }, 1000);
      },
    });

    return () => {
      trigger.kill();
      clearInterval(interval);
    };
  }, []);

  return (
    <div ref={containerRef} className="flex flex-col items-center gap-4">
      {/* User icon */}
      <div
        className={`w-10 h-10 rounded-lg flex items-center justify-center border transition-all duration-600 ${
          activeIndex === 0
            ? "bg-orange-500/20 border-orange-400/40 scale-110 shadow-[0_0_20px_rgba(251,146,60,0.2)]"
            : "bg-white/10 border-white/20"
        }`}
      >
        <User className={`w-4 h-4 transition-colors duration-500 ${activeIndex === 0 ? "text-orange-300" : "text-white/80"}`} />
      </div>

      <div className={`w-px h-6 transition-all duration-500 ${activeIndex >= 0 ? "bg-orange-400/40" : "bg-white/20"}`} />

      {/* Agent */}
      <div
        className={`rounded-xl bg-gradient-to-r from-orange-500/80 to-orange-400/60 border px-4 py-3 flex items-center gap-2 transition-all duration-600 ${
          activeIndex === 1
            ? "border-orange-300/50 scale-105 shadow-[0_0_30px_rgba(251,146,60,0.3)]"
            : "border-orange-400/30"
        }`}
      >
        <Bot className="w-4 h-4 text-white" />
        <span className="text-xs sm:text-sm font-light text-white tracking-tight">Autonomous Agent</span>
      </div>

      <div className={`w-px h-6 transition-all duration-500 ${activeIndex >= 1 ? "bg-orange-400/40" : "bg-white/20"}`} />

      {/* Checkmark */}
      <div
        className={`relative w-10 h-10 rounded-lg flex items-center justify-center border bg-gradient-to-br from-orange-500/80 to-orange-400/60 transition-all duration-600 ${
          activeIndex === 2
            ? "border-orange-300/50 scale-110 shadow-[0_0_30px_rgba(251,146,60,0.4)]"
            : "border-orange-400/30"
        }`}
      >
        <Check className={`w-5 h-5 text-white transition-transform duration-500 ${activeIndex === 2 ? "scale-125" : ""}`} />
        {activeIndex === 2 && (
          <span className="absolute inset-0 rounded-lg bg-orange-400/20 animate-[checkRing_1.5s_ease-in-out_infinite]" />
        )}
      </div>
    </div>
  );
};

export default ProblemSection;
