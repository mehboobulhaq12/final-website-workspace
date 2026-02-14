import { useRef } from "react";
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
        autoAlpha: 1,
        y: 0,
        duration: 0.8,
        stagger: 0.15,
        ease: "power3.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 75%",
          once: true,
        },
      });

      gsap.to(diagramRef.current, {
        autoAlpha: 1,
        x: 0,
        duration: 1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 70%",
          once: true,
        },
      });
    },
    { scope: sectionRef }
  );

  return (
    <section
      ref={sectionRef}
      className="w-full pt-12 md:pt-16 pb-24 md:pb-32 bg-black"
    >
      <div className="mx-auto max-w-7xl px-6 md:px-10 lg:px-16 grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-20 items-start">
        {/* Left: Text content */}
        <div className="flex flex-col gap-6 items-center text-center">
          <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1.5 backdrop-blur-sm">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
            </span>
            <span className="text-xs font-light tracking-tight text-white/80">The Friction Map</span>
          </div>
          <div ref={headingRef}>
            <TextShimmer
              as="span"
              duration={2}
              spread={4}
              className="text-3xl sm:text-4xl md:text-5xl font-extralight tracking-tight leading-[1.1] [--base-color:theme(colors.orange.300)] [--base-gradient-color:theme(colors.orange.100)] dark:[--base-color:theme(colors.orange.300)] dark:[--base-gradient-color:theme(colors.orange.100)]"
            >
              Manually tracking every lead is stressful and unsustainable.
            </TextShimmer>
          </div>

          <div
            ref={lineRef}
            className="w-14 h-[3px] bg-blue-400/60 rounded-full"
          />

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
            <div className="flex flex-col items-center gap-4">
              <DiagramIcon><User className="w-4 h-4 text-white/40" /></DiagramIcon>
              <VerticalLine />
              <DiagramIcon><Mail className="w-4 h-4 text-white/40" /></DiagramIcon>
              <VerticalLine />
              <div className="flex gap-3 items-center">
                <DiagramIcon><FileText className="w-4 h-4 text-white/40" /></DiagramIcon>
                <DiagramIcon><CheckSquare className="w-4 h-4 text-white/40" /></DiagramIcon>
              </div>
              <VerticalLine />
              <DiagramIcon><Users className="w-4 h-4 text-white/40" /></DiagramIcon>
            </div>
            <p className="text-[10px] sm:text-xs text-white/30 text-center mt-6 font-light">
              Manual Hand-offs
            </p>
          </div>

          {/* Effect3 System */}
          <div className="flex-1 border border-white/10 rounded-r-xl p-6 bg-white/[0.04] border-l-0">
            <p className="text-[10px] sm:text-xs font-mono tracking-[0.2em] text-orange-400/80 uppercase mb-8 text-center">
              Effect3 System (End-to-End)
            </p>
            <div className="flex flex-col items-center gap-4">
              <DiagramIcon highlight><User className="w-4 h-4 text-white/80" /></DiagramIcon>
              <VerticalLine highlight />
              <div className="rounded-xl bg-gradient-to-r from-orange-500/80 to-orange-400/60 border border-orange-400/30 px-4 py-3 flex items-center gap-2">
                <Bot className="w-4 h-4 text-white" />
                <span className="text-xs sm:text-sm font-light text-white tracking-tight">Autonomous Agent</span>
              </div>
              <VerticalLine highlight />
              <div className="relative w-10 h-10 rounded-lg flex items-center justify-center border border-orange-400/30 bg-gradient-to-br from-orange-500/80 to-orange-400/60 group">
                <Check className="w-5 h-5 text-white animate-[checkPop_1.5s_ease-in-out_infinite]" />
                <span className="absolute inset-0 rounded-lg bg-orange-400/20 animate-[checkRing_1.5s_ease-in-out_infinite]" />
              </div>
            </div>
            <p className="text-[10px] sm:text-xs text-blue-300/40 text-center mt-6 font-light">
              Fully Automated
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

function DiagramIcon({ children, highlight, filled }: { children: React.ReactNode; highlight?: boolean; filled?: boolean }) {
  return (
    <div
      className={`w-10 h-10 rounded-lg flex items-center justify-center border ${
        filled
          ? "bg-white border-white/20"
          : highlight
          ? "bg-white/10 border-white/20"
          : "bg-white/[0.03] border-white/10"
      }`}
    >
      {filled ? <div className="text-black">{children}</div> : children}
    </div>
  );
}

function VerticalLine({ highlight }: { highlight?: boolean }) {
  return (
    <div className={`w-px h-6 ${highlight ? "bg-white/20" : "bg-white/10"}`} />
  );
}

export default ProblemSection;
