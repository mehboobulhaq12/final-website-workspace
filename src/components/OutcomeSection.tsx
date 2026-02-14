import { useRef, useEffect, useState } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { TextShimmer } from "@/components/ui/text-shimmer";
import { Activity, MessageCircle, Map as MapIcon } from "lucide-react";
import DottedMap from "dotted-map";
import { Area, AreaChart, CartesianGrid } from "recharts";
import {
  type ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";

gsap.registerPlugin(ScrollTrigger);

const chartData = [
  { month: "Jan", manual: 5, agents: 8 },
  { month: "Feb", manual: 8, agents: 32 },
  { month: "Mar", manual: 7, agents: 58 },
  { month: "Apr", manual: 12, agents: 95 },
  { month: "May", manual: 9, agents: 142 },
  { month: "Jun", manual: 11, agents: 210 },
];

const chartConfig = {
  manual: {
    label: "Manual Recovery",
    color: "hsl(0 0% 40%)",
  },
  agents: {
    label: "AI Agents",
    color: "hsl(25 95% 53%)",
  },
} satisfies ChartConfig;

const map = new DottedMap({ height: 55, grid: "diagonal" });
const points = map.getPoints();

const highlightedPoints = [
  { cx: 25, cy: 22 },  // US East
  { cx: 18, cy: 28 },  // US West
  { cx: 30, cy: 18 },  // Canada
  { cx: 55, cy: 22 },  // UK
  { cx: 58, cy: 24 },  // France
  { cx: 60, cy: 22 },  // Germany
  { cx: 85, cy: 20 },  // Japan
  { cx: 80, cy: 28 },  // India
  { cx: 90, cy: 22 },  // Korea
  { cx: 65, cy: 35 },  // UAE
  { cx: 95, cy: 38 },  // Australia
  { cx: 42, cy: 40 },  // Brazil
  { cx: 62, cy: 18 },  // Nordics
  { cx: 75, cy: 25 },  // China
];

const MapComponent = () => {
  const viewBox = "0 0 120 60";
  return (
    <svg viewBox={viewBox} className="w-full h-full text-white/20">
      {points.map((point, index) => (
        <circle key={index} cx={point.x} cy={point.y} r={0.15} fill="currentColor" />
      ))}
      {highlightedPoints.map((p, i) => (
        <g key={`hl-${i}`}>
          <circle cx={p.cx} cy={p.cy} r="1.8" fill="hsl(25 95% 53%)" opacity="0.1">
            <animate attributeName="r" values="1.2;2.4;1.2" dur={`${2 + i * 0.3}s`} repeatCount="indefinite" />
            <animate attributeName="opacity" values="0.15;0.05;0.15" dur={`${2 + i * 0.3}s`} repeatCount="indefinite" />
          </circle>
          <circle cx={p.cx} cy={p.cy} r="0.5" fill="hsl(25 95% 53%)" opacity="0.9">
            <animate attributeName="opacity" values="0.6;1;0.6" dur={`${1.5 + i * 0.2}s`} repeatCount="indefinite" />
          </circle>
        </g>
      ))}
      {/* Connection lines */}
      <line x1="25" y1="22" x2="55" y2="22" stroke="hsl(25 95% 53%)" strokeWidth="0.15" opacity="0.2">
        <animate attributeName="opacity" values="0.1;0.3;0.1" dur="3s" repeatCount="indefinite" />
      </line>
      <line x1="55" y1="22" x2="85" y2="20" stroke="hsl(25 95% 53%)" strokeWidth="0.15" opacity="0.2">
        <animate attributeName="opacity" values="0.1;0.3;0.1" dur="3.5s" repeatCount="indefinite" />
      </line>
      <line x1="60" y1="22" x2="80" y2="28" stroke="hsl(25 95% 53%)" strokeWidth="0.15" opacity="0.2">
        <animate attributeName="opacity" values="0.1;0.3;0.1" dur="4s" repeatCount="indefinite" />
      </line>
    </svg>
  );
};

const MonitoringChart = () => {
  return (
    <ChartContainer config={chartConfig} className="aspect-auto h-full w-full">
      <AreaChart data={chartData}>
        <CartesianGrid vertical={false} stroke="rgba(255,255,255,0.05)" />
        <defs>
          <linearGradient id="fillManual" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="hsl(0 0% 40%)" stopOpacity={0.3} />
            <stop offset="100%" stopColor="hsl(0 0% 40%)" stopOpacity={0} />
          </linearGradient>
          <linearGradient id="fillAgents" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="hsl(25 95% 53%)" stopOpacity={0.4} />
            <stop offset="100%" stopColor="hsl(25 95% 53%)" stopOpacity={0} />
          </linearGradient>
        </defs>
        <Area dataKey="manual" type="monotone" fill="url(#fillManual)" stroke="hsl(0 0% 40%)" strokeWidth={1.5} />
        <Area dataKey="agents" type="monotone" fill="url(#fillAgents)" stroke="hsl(25 95% 53%)" strokeWidth={2} />
        <ChartTooltip content={<ChartTooltipContent />} />
      </AreaChart>
    </ChartContainer>
  );
};

const ChatAnimation = () => {
  const [visible, setVisible] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const trigger = ScrollTrigger.create({
      trigger: containerRef.current,
      start: "top 85%",
      once: true,
      onEnter: () => {
        const timers = [
          setTimeout(() => setVisible(1), 300),
          setTimeout(() => setVisible(2), 1200),
          setTimeout(() => setVisible(3), 2200),
        ];
        return () => timers.forEach(clearTimeout);
      },
    });
    return () => trigger.kill();
  }, []);

  return (
    <div ref={containerRef} className="flex flex-col gap-3 mt-auto">
      <div className={`flex items-start gap-2 transition-all duration-500 ${visible >= 1 ? "opacity-100 translate-y-0" : "opacity-0 translate-y-3"}`}>
        <div className="w-5 h-5 rounded-full bg-white/10 mt-0.5 flex-shrink-0" />
        <div>
          <p className="text-[10px] text-white/40">Mon 14 Feb</p>
          <div className="mt-1 rounded-lg border border-white/10 bg-white/5 px-3 py-2">
            <p className="text-xs text-white/60">Hey, we noticed you haven't completed your setup...</p>
          </div>
        </div>
      </div>
      <div className={`flex items-start gap-2 transition-all duration-500 ${visible >= 2 ? "opacity-100 translate-y-0" : "opacity-0 translate-y-3"}`}>
        <div className="w-5 h-5 rounded-full bg-white/10 mt-0.5 flex-shrink-0" />
        <div>
          <div className="mt-1 rounded-lg border border-white/10 bg-white/5 px-3 py-2">
            <p className="text-xs text-white/60">Would you like to schedule a quick call to finish onboarding?</p>
          </div>
        </div>
      </div>
      <div className={`flex justify-end transition-all duration-500 ${visible >= 3 ? "opacity-100 translate-y-0" : "opacity-0 translate-y-3"}`}>
        <div className="rounded-lg bg-gradient-to-r from-orange-500/80 to-orange-400/60 px-3 py-2 max-w-[80%]">
          <p className="text-xs text-white">Thanks for checking in! I'd love to pick this back up.</p>
          <p className="text-[10px] text-white/50 mt-1 text-right">Now</p>
        </div>
      </div>
    </div>
  );
};

const OutcomeSection = () => {
  const sectionRef = useRef<HTMLElement | null>(null);
  const headingRef = useRef<HTMLDivElement | null>(null);
  const gridRef = useRef<HTMLDivElement | null>(null);
  const chartCardRef = useRef<HTMLDivElement | null>(null);

  useGSAP(
    () => {
      if (!sectionRef.current) return;
      const elements = [headingRef.current, gridRef.current].filter(Boolean);
      gsap.set(elements, { autoAlpha: 0, y: 30 });
      gsap.to(elements, {
        autoAlpha: 1, y: 0, duration: 0.8, stagger: 0.2, ease: "power3.out",
        scrollTrigger: { trigger: sectionRef.current, start: "top 75%", once: true },
      });

      // Animate chart card
      if (chartCardRef.current) {
        gsap.set(chartCardRef.current, { autoAlpha: 0, y: 20 });
        gsap.to(chartCardRef.current, {
          autoAlpha: 1, y: 0, duration: 0.8, ease: "power3.out",
          scrollTrigger: { trigger: chartCardRef.current, start: "top 85%", once: true },
        });
      }
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
          {/* Card 1 — Global Reach */}
          <div className="md:col-span-3 rounded-xl border border-white/10 bg-white/[0.02] p-6 flex flex-col gap-4 overflow-hidden">
            <div className="flex items-center gap-2 text-white/50">
              <MapIcon className="w-4 h-4" />
              <span className="text-xs font-light tracking-wide">Global lead recovery</span>
            </div>
            <p className="text-base sm:text-lg font-light text-white/80 leading-relaxed">
              Our agents reach your leads worldwide, across every timezone — automatically.
            </p>
            <div className="relative h-40 sm:h-48 mt-auto">
              <MapComponent />
              <div className="absolute bottom-3 left-3 inline-flex items-center gap-2 rounded-lg bg-white/5 border border-white/10 px-3 py-1.5 backdrop-blur-sm">
                <span className="text-[10px] text-white/60">🌍 Active in 40+ countries</span>
              </div>
            </div>
          </div>

          {/* Card 2 — Support with scroll animation */}
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

          {/* Card 3 — Uptime */}
          <div className="md:col-span-2 rounded-xl border border-white/10 bg-white/[0.02] p-6 flex flex-col items-center justify-center text-center gap-2">
            <p className="text-4xl sm:text-5xl md:text-6xl font-extralight tracking-tight text-white/90">99.99%</p>
            <p className="text-sm font-light text-white/40">Agent Uptime</p>
          </div>

          {/* Card 4 — Activity Chart */}
          <div ref={chartCardRef} className="md:col-span-3 rounded-xl border border-white/10 bg-white/[0.02] p-6 flex flex-col gap-4 overflow-hidden">
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
            <div className="flex gap-4 text-[10px] text-white/40">
              <span className="flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-white/30" /> Manual
              </span>
              <span className="flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-orange-500" /> AI Agents
              </span>
            </div>
            <div className="h-36 sm:h-44 mt-auto">
              <MonitoringChart />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default OutcomeSection;
