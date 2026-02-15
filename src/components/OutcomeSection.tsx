import { useRef, useEffect, useState } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { TextShimmer } from "@/components/ui/text-shimmer";
import { Activity, MessageCircle, Map as MapIcon } from "lucide-react";
import DottedMap from "dotted-map";

gsap.registerPlugin(ScrollTrigger);

const map = new DottedMap({ height: 55, grid: "diagonal" });
const points = map.getPoints();

const highlightedPoints = [
  { cx: 25, cy: 22 }, { cx: 18, cy: 28 }, { cx: 30, cy: 18 },
  { cx: 55, cy: 22 }, { cx: 58, cy: 24 }, { cx: 60, cy: 22 },
  { cx: 85, cy: 20 }, { cx: 80, cy: 28 }, { cx: 90, cy: 22 },
  { cx: 65, cy: 35 }, { cx: 95, cy: 38 }, { cx: 42, cy: 40 },
  { cx: 62, cy: 18 }, { cx: 75, cy: 25 }, { cx: 22, cy: 32 },
  { cx: 35, cy: 25 }, { cx: 50, cy: 30 }, { cx: 70, cy: 18 },
  { cx: 78, cy: 35 }, { cx: 88, cy: 30 }, { cx: 45, cy: 22 },
  { cx: 68, cy: 28 },
];

const connections = [
  { x1: 25, y1: 22, x2: 55, y2: 22 }, { x1: 55, y1: 22, x2: 85, y2: 20 },
  { x1: 60, y1: 22, x2: 80, y2: 28 }, { x1: 18, y1: 28, x2: 42, y2: 40 },
  { x1: 30, y1: 18, x2: 62, y2: 18 }, { x1: 75, y1: 25, x2: 90, y2: 22 },
  { x1: 65, y1: 35, x2: 80, y2: 28 }, { x1: 58, y1: 24, x2: 75, y2: 25 },
  { x1: 25, y1: 22, x2: 35, y2: 25 }, { x1: 85, y1: 20, x2: 95, y2: 38 },
  { x1: 45, y1: 22, x2: 55, y2: 22 }, { x1: 70, y1: 18, x2: 85, y2: 20 },
];

const MapComponent = () => (
  <svg viewBox="0 0 120 60" className="w-full h-full text-white/20">
    {points.map((point, index) => (
      <circle key={index} cx={point.x} cy={point.y} r={0.15} fill="currentColor" />
    ))}
    {connections.map((c, i) => (
      <line key={`line-${i}`} x1={c.x1} y1={c.y1} x2={c.x2} y2={c.y2} stroke="hsl(25 95% 53%)" strokeWidth="0.3" opacity="0.35">
        <animate attributeName="opacity" values="0.2;0.5;0.2" dur={`${2.5 + i * 0.3}s`} repeatCount="indefinite" />
      </line>
    ))}
    {highlightedPoints.map((p, i) => (
      <g key={`hl-${i}`}>
        <circle cx={p.cx} cy={p.cy} r="1.8" fill="hsl(25 95% 53%)" opacity="0.15">
          <animate attributeName="r" values="1.2;2.8;1.2" dur={`${2 + i * 0.2}s`} repeatCount="indefinite" />
          <animate attributeName="opacity" values="0.2;0.06;0.2" dur={`${2 + i * 0.2}s`} repeatCount="indefinite" />
        </circle>
        <circle cx={p.cx} cy={p.cy} r="0.6" fill="hsl(25 95% 53%)" opacity="1">
          <animate attributeName="opacity" values="0.7;1;0.7" dur={`${1.5 + i * 0.15}s`} repeatCount="indefinite" />
        </circle>
      </g>
    ))}
  </svg>
);

const TypingIndicator = ({ color = "white" }: { color?: string }) => (
  <div className="flex items-center gap-1 px-3 py-2">
    {[0, 1, 2].map((i) => (
      <span
        key={i}
        className="w-1.5 h-1.5 rounded-full"
        style={{
          backgroundColor: color === "orange" ? "hsl(25 95% 53%)" : "rgba(255,255,255,0.4)",
          animation: `typingDot 1.2s ease-in-out ${i * 0.2}s infinite`,
        }}
      />
    ))}
  </div>
);

const ChatAnimation = () => {
  const [stage, setStage] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const startedRef = useRef(false);

  useEffect(() => {
    let cycleCount = 0;
    const maxCycles = 3;
    const cycleDuration = 5000;
    const allTimers: ReturnType<typeof setTimeout>[] = [];

    const runCycle = () => {
      if (cycleCount >= maxCycles) return;
      const offset = cycleCount * cycleDuration;
      cycleCount++;
      allTimers.push(
        setTimeout(() => setStage(0), offset),
        setTimeout(() => setStage(1), offset + 200),
        setTimeout(() => setStage(2), offset + 900),
        setTimeout(() => setStage(3), offset + 1400),
        setTimeout(() => setStage(4), offset + 2200),
        setTimeout(() => setStage(5), offset + 3000),
        setTimeout(() => setStage(6), offset + 3800),
      );
      if (cycleCount < maxCycles) {
        allTimers.push(setTimeout(() => runCycle(), cycleDuration));
      }
    };

    const trigger = ScrollTrigger.create({
      trigger: containerRef.current,
      start: "top 85%",
      once: true,
      onEnter: () => {
        if (!startedRef.current) { startedRef.current = true; runCycle(); }
      },
    });

    return () => { trigger.kill(); allTimers.forEach(clearTimeout); };
  }, []);

  return (
    <div ref={containerRef} className="flex flex-col gap-3 mt-auto">
      <div className={`flex items-start gap-2 transition-all duration-500 ${stage >= 1 ? "opacity-100 translate-y-0" : "opacity-0 translate-y-3"}`}>
        <div className="w-5 h-5 rounded-full bg-orange-500/20 mt-0.5 flex-shrink-0 flex items-center justify-center"><span className="text-[8px]">🤖</span></div>
        <div>
          <p className="text-[10px] text-white/40">AI Agent</p>
          {stage >= 1 && stage < 2 ? <div className="mt-1 rounded-lg border border-orange-500/20 bg-orange-500/10"><TypingIndicator color="orange" /></div>
           : stage >= 2 ? <div className="mt-1 rounded-lg border border-orange-500/20 bg-orange-500/10 px-3 py-2"><p className="text-xs text-white/80">Hey, we noticed you haven't completed your setup...</p></div> : null}
        </div>
      </div>
      <div className={`flex items-start gap-2 transition-all duration-500 ${stage >= 3 ? "opacity-100 translate-y-0" : "opacity-0 translate-y-3"}`}>
        <div className="w-5 h-5 rounded-full bg-orange-500/20 mt-0.5 flex-shrink-0 flex items-center justify-center"><span className="text-[8px]">🤖</span></div>
        <div>
          {stage >= 3 && stage < 4 ? <div className="mt-1 rounded-lg border border-orange-500/20 bg-orange-500/10"><TypingIndicator color="orange" /></div>
           : stage >= 4 ? <div className="mt-1 rounded-lg border border-orange-500/20 bg-orange-500/10 px-3 py-2"><p className="text-xs text-white/80">Would you like to schedule a quick call to finish onboarding?</p></div> : null}
        </div>
      </div>
      <div className={`flex justify-end transition-all duration-500 ${stage >= 5 ? "opacity-100 translate-y-0" : "opacity-0 translate-y-3"}`}>
        {stage >= 5 && stage < 6 ? <div className="rounded-lg bg-white/10 border border-white/10"><TypingIndicator color="white" /></div>
         : stage >= 6 ? <div className="rounded-lg bg-white/10 border border-white/10 px-3 py-2 max-w-[80%]"><p className="text-xs text-white/70">Thanks for checking in! I'd love to pick this back up.</p><p className="text-[10px] text-white/30 mt-1 text-right">Now</p></div> : null}
      </div>
    </div>
  );
};

/* Continuous auto-animating chart for Outcome section */
const AutoOutcomeChart = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [progress, setProgress] = useState(0);
  const [manualCount, setManualCount] = useState(0);
  const [agentCount, setAgentCount] = useState(0);
  const startedRef = useRef(false);

  useEffect(() => {
    let animFrame: number;
    let startTime: number;
    const cycleDuration = 8000; // 8s — slow and smooth

    const trigger = ScrollTrigger.create({
      trigger: containerRef.current,
      start: "top 85%",
      once: true,
      onEnter: () => {
        if (startedRef.current) return;
        startedRef.current = true;
        startTime = performance.now();

        const animate = (now: number) => {
          const elapsed = (now - startTime) % cycleDuration;
          const t = elapsed / cycleDuration;
          // Ease-out cubic for smooth deceleration
          const eased = 1 - Math.pow(1 - t, 3);
          setProgress(eased);
          setManualCount(Math.round(eased * 11));
          setAgentCount(Math.round(eased * 210));
          animFrame = requestAnimationFrame(animate);
        };
        animFrame = requestAnimationFrame(animate);
      },
    });

    return () => { trigger.kill(); cancelAnimationFrame(animFrame); };
  }, []);

  // Manual line (flat-ish)
  const manualPoints = [
    { x: 0, y: 58 }, { x: 40, y: 52 }, { x: 80, y: 55 },
    { x: 120, y: 48 }, { x: 160, y: 53 }, { x: 200, y: 50 },
  ];
  // Agent line (goes up steeply)
  const agentPoints = [
    { x: 0, y: 55 }, { x: 40, y: 42 }, { x: 80, y: 32 },
    { x: 120, y: 20 }, { x: 160, y: 10 }, { x: 200, y: 3 },
  ];

  const visibleCount = Math.max(2, Math.ceil(progress * agentPoints.length));
  const visManual = manualPoints.slice(0, visibleCount);
  const visAgent = agentPoints.slice(0, visibleCount);

  const toPath = (pts: typeof manualPoints) => pts.map((p, i) => `${i === 0 ? "M" : "L"}${p.x} ${p.y}`).join(" ");
  const lastAgent = visAgent[visAgent.length - 1];
  const lastManual = visManual[visManual.length - 1];

  return (
    <div ref={containerRef} className="h-full w-full flex flex-col">
      <div className="flex items-center justify-between mb-2">
        <div className="flex gap-4 text-[10px] text-white/40">
          <span className="flex items-center gap-1.5"><span className="w-2 h-2 rounded-full bg-white/30" /> Manual <span className="font-mono text-white/50">{manualCount}</span></span>
          <span className="flex items-center gap-1.5"><span className="w-2 h-2 rounded-full bg-orange-500" /> Effect3 Agents <span className="font-mono text-orange-400">{agentCount}</span></span>
        </div>
      </div>
      <svg viewBox="0 0 200 60" className="w-full flex-1" fill="none" preserveAspectRatio="none">
        {/* Manual */}
        <path d={toPath(visManual)} stroke="rgba(255,255,255,0.3)" strokeWidth="1.5" strokeLinecap="round" />
        <path d={`${toPath(visManual)} L${lastManual.x} 60 L0 60 Z`} fill="rgba(255,255,255,0.03)" />
        {/* Agent */}
        <path d={toPath(visAgent)} stroke="hsl(25 95% 53%)" strokeWidth="2" strokeLinecap="round" />
        <path d={`${toPath(visAgent)} L${lastAgent.x} 60 L0 60 Z`} fill="url(#outcomeAgentFill)" />
        {/* Dot */}
        <circle cx={lastAgent.x} cy={lastAgent.y} r="3" fill="#fb923c">
          <animate attributeName="r" values="2;4;2" dur="1s" repeatCount="indefinite" />
        </circle>
        <defs>
          <linearGradient id="outcomeAgentFill" x1="0" y1="0" x2="0" y2="60">
            <stop offset="0%" stopColor="rgba(251,146,60,0.2)" />
            <stop offset="100%" stopColor="rgba(251,146,60,0)" />
          </linearGradient>
        </defs>
      </svg>
    </div>
  );
};

const OutcomeSection = () => {
  const sectionRef = useRef<HTMLElement | null>(null);
  const headingRef = useRef<HTMLDivElement | null>(null);
  const gridRef = useRef<HTMLDivElement | null>(null);

  useGSAP(
    () => {
      if (!sectionRef.current) return;
      const elements = [headingRef.current, gridRef.current].filter(Boolean);
      gsap.set(elements, { autoAlpha: 0, y: 30 });
      gsap.to(elements, {
        autoAlpha: 1, y: 0, duration: 0.8, stagger: 0.2, ease: "power3.out",
        scrollTrigger: { trigger: sectionRef.current, start: "top 75%", once: true },
      });
    },
    { scope: sectionRef }
  );

  return (
    <section ref={sectionRef} className="w-full py-12 md:py-16 bg-black border-t border-white/5">
      <div className="mx-auto max-w-7xl px-6 md:px-10 lg:px-16">
        <div ref={headingRef} className="flex flex-col gap-4 mb-10 max-w-3xl">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1.5 backdrop-blur-sm">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500" />
              </span>
              <span className="text-xs font-light tracking-tight text-white/80">The Outcome</span>
            </div>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extralight tracking-tight leading-[1.1]">
            <span className="text-white/90">With us, this is how your </span>
            <TextShimmer
              as="span" duration={2} spread={4}
              className="italic font-light [--base-color:theme(colors.orange.300)] [--base-gradient-color:theme(colors.orange.100)] dark:[--base-color:theme(colors.orange.300)] dark:[--base-gradient-color:theme(colors.orange.100)]"
            >
              business is going to thrive.
            </TextShimmer>
          </h2>
        </div>

        <div ref={gridRef} className="grid grid-cols-1 md:grid-cols-5 gap-3">
          {/* Card 1 - Global Reach */}
          <div className="md:col-span-3 rounded-xl border border-white/10 bg-white/[0.02] p-6 flex flex-col gap-4 overflow-hidden">
            <div className="flex items-center gap-2 text-white/50">
              <MapIcon className="w-4 h-4" />
              <span className="text-xs font-light tracking-wide">Global lead recovery</span>
            </div>
            <p className="text-base sm:text-lg font-light text-white/80 leading-relaxed">
              Our agents reach your leads worldwide, across every timezone, automatically.
            </p>
            <div className="relative h-40 sm:h-48 mt-auto">
              <MapComponent />
              <div className="absolute bottom-3 left-3 inline-flex items-center gap-2 rounded-lg bg-white/5 border border-white/10 px-3 py-1.5 backdrop-blur-sm">
                <span className="text-[10px] text-white/60">🌍 Active in 40+ countries</span>
              </div>
            </div>
          </div>

          {/* Card 2 - AI Conversations */}
          <div className="md:col-span-2 rounded-xl border border-white/10 bg-white/[0.02] p-6 flex flex-col gap-4">
            <div className="flex items-center gap-2 text-white/50">
              <MessageCircle className="w-4 h-4" />
              <span className="text-xs font-light tracking-wide">AI-powered conversations</span>
            </div>
            <p className="text-base sm:text-lg font-light text-white/80 leading-relaxed">
              Personalized re-engagement for every lead, at scale.
            </p>
            <ChatAnimation />
          </div>

          {/* Card 3 - Uptime */}
          <div className="md:col-span-2 rounded-xl border border-white/10 bg-white/[0.02] p-6 flex flex-col items-center justify-center text-center gap-2">
            <p className="text-4xl sm:text-5xl md:text-6xl font-extralight tracking-tight text-white/90">99.99%</p>
            <p className="text-sm font-light text-white/40">Agent Uptime</p>
          </div>

          {/* Card 4 - Auto-animating Activity Chart */}
          <div className="md:col-span-3 rounded-xl border border-white/10 bg-white/[0.02] p-6 flex flex-col gap-4 overflow-hidden">
            <div className="flex items-center gap-2 text-white/50">
              <Activity className="w-4 h-4" />
              <span className="text-xs font-light tracking-wide">Lead recovery performance</span>
            </div>
            <div className="flex flex-col gap-1">
              <p className="text-base sm:text-lg font-light text-white/80 leading-relaxed">
                Manual vs AI agent recovery.{" "}
                <span className="text-white/40">See the difference in real conversions.</span>
              </p>
            </div>
            <div className="h-36 sm:h-44 mt-auto">
              <AutoOutcomeChart />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default OutcomeSection;
