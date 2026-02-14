import { useRef } from "react";
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
  { month: "Jan", manual: 8, agents: 12 },
  { month: "Feb", manual: 12, agents: 28 },
  { month: "Mar", manual: 10, agents: 45 },
  { month: "Apr", manual: 15, agents: 68 },
  { month: "May", manual: 11, agents: 82 },
  { month: "Jun", manual: 14, agents: 120 },
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

const MapComponent = () => {
  const viewBox = "0 0 120 60";
  return (
    <svg viewBox={viewBox} className="w-full h-full text-white/20">
      {points.map((point, index) => (
        <circle
          key={index}
          cx={point.x}
          cy={point.y}
          r={0.15}
          fill="currentColor"
        />
      ))}
      {/* Highlighted points */}
      <circle cx="30" cy="25" r="0.6" fill="hsl(25 95% 53%)" opacity="0.8" />
      <circle cx="30" cy="25" r="1.5" fill="hsl(25 95% 53%)" opacity="0.15" />
      <circle cx="85" cy="20" r="0.6" fill="hsl(25 95% 53%)" opacity="0.8" />
      <circle cx="85" cy="20" r="1.5" fill="hsl(25 95% 53%)" opacity="0.15" />
      <circle cx="60" cy="35" r="0.6" fill="hsl(25 95% 53%)" opacity="0.8" />
      <circle cx="60" cy="35" r="1.5" fill="hsl(25 95% 53%)" opacity="0.15" />
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
        <Area
          dataKey="manual"
          type="monotone"
          fill="url(#fillManual)"
          stroke="hsl(0 0% 40%)"
          strokeWidth={1.5}
        />
        <Area
          dataKey="agents"
          type="monotone"
          fill="url(#fillAgents)"
          stroke="hsl(25 95% 53%)"
          strokeWidth={2}
        />
        <ChartTooltip
          content={<ChartTooltipContent />}
        />
      </AreaChart>
    </ChartContainer>
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
        autoAlpha: 1,
        y: 0,
        duration: 0.8,
        stagger: 0.2,
        ease: "power3.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 75%",
          once: true,
        },
      });
    },
    { scope: sectionRef }
  );

  return (
    <section
      ref={sectionRef}
      className="w-full py-12 md:py-16 bg-black border-t border-white/5"
    >
      <div className="mx-auto max-w-7xl px-6 md:px-10 lg:px-16">
        {/* Badge & Heading */}
        <div ref={headingRef} className="flex flex-col gap-4 mb-10 max-w-3xl">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1.5 backdrop-blur-sm">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500" />
              </span>
              <span className="text-xs font-light tracking-tight text-white/80">
                The Outcome
              </span>
            </div>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extralight tracking-tight leading-[1.1]">
            <span className="text-white/90">With us, this is how your </span>
            <TextShimmer
              as="span"
              duration={2}
              spread={4}
              className="italic font-light [--base-color:theme(colors.orange.300)] [--base-gradient-color:theme(colors.orange.100)] dark:[--base-color:theme(colors.orange.300)] dark:[--base-gradient-color:theme(colors.orange.100)]"
            >
              business is going to thrive.
            </TextShimmer>
          </h2>
        </div>

        {/* Bento Grid */}
        <div
          ref={gridRef}
          className="grid grid-cols-1 md:grid-cols-5 gap-3"
        >
          {/* Card 1 — Global Reach (spans 3) */}
          <div className="md:col-span-3 rounded-xl border border-white/10 bg-white/[0.02] p-6 flex flex-col gap-4 overflow-hidden">
            <div className="flex items-center gap-2 text-white/50">
              <MapIcon className="w-4 h-4" />
              <span className="text-xs font-light tracking-wide">
                Global lead recovery
              </span>
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

          {/* Card 2 — Support (spans 2) */}
          <div className="md:col-span-2 rounded-xl border border-white/10 bg-white/[0.02] p-6 flex flex-col gap-4">
            <div className="flex items-center gap-2 text-white/50">
              <MessageCircle className="w-4 h-4" />
              <span className="text-xs font-light tracking-wide">
                AI-powered conversations
              </span>
            </div>
            <p className="text-base sm:text-lg font-light text-white/80 leading-relaxed">
              Personalized re-engagement for every lead, at scale.
            </p>
            <div className="flex flex-col gap-3 mt-auto">
              <div className="flex items-start gap-2">
                <div className="w-5 h-5 rounded-full bg-white/10 mt-0.5 flex-shrink-0" />
                <div>
                  <p className="text-[10px] text-white/40">Mon 14 Feb</p>
                  <div className="mt-1 rounded-lg border border-white/10 bg-white/5 px-3 py-2">
                    <p className="text-xs text-white/60">
                      Hey, we noticed you haven't completed your setup...
                    </p>
                  </div>
                </div>
              </div>
              <div className="flex justify-end">
                <div className="rounded-lg bg-gradient-to-r from-orange-500/80 to-orange-400/60 px-3 py-2 max-w-[80%]">
                  <p className="text-xs text-white">
                    Thanks for checking in! I'd love to pick this back up.
                  </p>
                  <p className="text-[10px] text-white/50 mt-1 text-right">Now</p>
                </div>
              </div>
            </div>
          </div>

          {/* Card 3 — Uptime (spans 2) */}
          <div className="md:col-span-2 rounded-xl border border-white/10 bg-white/[0.02] p-6 flex flex-col items-center justify-center text-center gap-2">
            <p className="text-4xl sm:text-5xl md:text-6xl font-extralight tracking-tight text-white/90">
              99.99%
            </p>
            <p className="text-sm font-light text-white/40">Agent Uptime</p>
          </div>

          {/* Card 4 — Activity Chart (spans 3) */}
          <div className="md:col-span-3 rounded-xl border border-white/10 bg-white/[0.02] p-6 flex flex-col gap-4 overflow-hidden">
            <div className="flex items-center gap-2 text-white/50">
              <Activity className="w-4 h-4" />
              <span className="text-xs font-light tracking-wide">
                Lead recovery performance
              </span>
            </div>
            <div className="flex flex-col gap-1">
              <p className="text-base sm:text-lg font-light text-white/80 leading-relaxed">
                Manual vs AI agent recovery.{" "}
                <span className="text-white/40">
                  See the difference in real conversions.
                </span>
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
