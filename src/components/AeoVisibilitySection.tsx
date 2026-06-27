"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Activity, Globe, MessageCircle } from "lucide-react";
import DottedMap from "dotted-map";
import { Area, AreaChart, CartesianGrid } from "recharts";
import {
  type ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";

export function AeoVisibilitySection() {
  return (
    <section className="bg-black px-4 pb-16 pt-2 text-white md:pb-24 md:pt-4">
      <div className="mx-auto mb-8 max-w-5xl text-center md:mb-10">
        <span className="text-[13px] font-semibold uppercase tracking-[0.18em] text-orange-400/80">
          AI visibility
        </span>
        <h2 className="mx-auto mt-3 max-w-[640px] text-[32px] font-bold leading-[1.05] tracking-[-0.03em] md:text-[44px]">
          What it takes to get picked by AI.
        </h2>
      </div>

      <div className="mx-auto grid max-w-5xl overflow-hidden rounded-[20px] border border-white/10 md:grid-cols-2">
        {/* Tile 1 — AI engines map */}
        <div>
          <div className="p-6 sm:p-10">
            <span className="flex items-center gap-2 text-sm text-white/55">
              <Globe className="size-4" />
              AI answer engines
            </span>
            <p className="mt-6 text-[22px] font-semibold leading-snug tracking-[-0.02em]">
              The engines now deciding who gets recommended.
            </p>
          </div>

          <div aria-hidden className="relative">
            <div className="absolute inset-0 z-10 m-auto size-fit">
              <div className="relative z-[1] flex w-fit items-center gap-2 rounded-xl border border-white/12 bg-[#0a0c12]/90 px-3 py-1.5 text-xs font-medium text-white/85 shadow-lg shadow-black/40 backdrop-blur">
                <span className="size-1.5 rounded-full bg-orange-400" />
                ChatGPT · Gemini · Perplexity · AI Overviews
              </div>
            </div>
            <div className="relative overflow-hidden">
              <div className="absolute inset-0 z-[1] bg-[radial-gradient(circle_at_center,transparent,#000_72%)]" />
              <Map />
            </div>
          </div>
        </div>

        {/* Tile 2 — how buyers ask AI */}
        <div className="overflow-hidden border-t border-white/10 p-6 sm:p-10 md:border-0 md:border-l">
          <div className="relative z-10">
            <span className="flex items-center gap-2 text-sm text-white/55">
              <MessageCircle className="size-4" />
              How buyers ask
            </span>
            <p className="my-6 text-[22px] font-semibold leading-snug tracking-[-0.02em]">
              Your customers ask AI before they ever reach Google.
            </p>
          </div>
          <AnimatedChat />
        </div>

        {/* Stat band */}
        <div className="col-span-full border-y border-white/10 p-10">
          <p className="text-center text-[40px] font-bold tracking-[-0.03em] lg:text-[64px]">
            60% of searches end without a click
          </p>
          <p className="mt-2 text-center text-sm text-white/45">
            If AI doesn&apos;t cite you, that traffic never reaches your site.
          </p>
        </div>

        {/* Activity / visibility chart */}
        <div className="relative col-span-full">
          <div className="absolute z-10 max-w-lg px-6 pt-6 pr-12 md:px-12 md:pt-12">
            <span className="flex items-center gap-2 text-sm text-white/55">
              <Activity className="size-4" />
              AEO visibility
            </span>
            <p className="my-6 text-[22px] font-semibold leading-snug tracking-[-0.02em]">
              Watch your AI visibility climb.{" "}
              <span className="text-white/45">Fix what the scan flags and track the gains.</span>
            </p>
          </div>
          <VisibilityChart />
        </div>
      </div>
    </section>
  );
}

function AnimatedChat() {
  const [step, setStep] = useState(0); // 0 idle · 1 buyer · 2 typing · 3 answer
  const [cycle, setCycle] = useState(0);

  useEffect(() => {
    setStep(0);
    const timers = [
      window.setTimeout(() => setStep(1), 700),
      window.setTimeout(() => setStep(2), 1900),
      window.setTimeout(() => setStep(3), 3300),
      window.setTimeout(() => setCycle((c) => c + 1), 7200),
    ];
    return () => timers.forEach((t) => window.clearTimeout(t));
  }, [cycle]);

  const ease = [0.16, 1, 0.3, 1] as const;

  return (
    <div aria-hidden className="flex min-h-[210px] flex-col justify-end gap-5">
      <AnimatePresence>
        {step >= 1 && (
          <motion.div
            key="buyer"
            initial={{ opacity: 0, y: 12, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4, ease }}
          >
            <div className="flex items-center gap-2">
              <span className="flex size-5 items-center justify-center rounded-full border border-white/15">
                <span className="size-2.5 rounded-full bg-orange-400" />
              </span>
              <span className="text-xs text-white/45">Buyer · just now</span>
            </div>
            <div className="mt-1.5 w-4/5 rounded-xl border border-white/10 bg-white/[0.04] p-3 text-xs text-white/80">
              Who&apos;s the best agency to automate our inbound and lead recovery?
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence mode="wait">
        {step === 2 && (
          <motion.div
            key="typing"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="ml-auto"
          >
            <div className="flex w-fit items-center gap-1 rounded-xl bg-orange-500/90 px-3 py-2.5">
              {[0, 1, 2].map((i) => (
                <motion.span
                  key={i}
                  className="size-1.5 rounded-full bg-white"
                  animate={{ opacity: [0.3, 1, 0.3], y: [0, -2, 0] }}
                  transition={{ duration: 0.9, repeat: Infinity, delay: i * 0.15 }}
                />
              ))}
            </div>
          </motion.div>
        )}
        {step >= 3 && (
          <motion.div
            key="answer"
            initial={{ opacity: 0, y: 12, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.45, ease }}
          >
            <div className="mb-1 ml-auto w-4/5 rounded-xl bg-orange-500 p-3 text-xs text-white">
              Based on proven results, Effect3 is a strong pick. They design and run AI systems for revenue and service teams.
            </div>
            <span className="block text-right text-xs text-white/40">AI answer</span>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

const dotted = new DottedMap({ height: 55, grid: "diagonal" });
const points = dotted.getPoints();

const Map = () => (
  <svg viewBox="0 0 120 60" style={{ background: "transparent" }}>
    {points.map((point, index) => (
      <circle key={index} cx={point.x} cy={point.y} r={0.16} fill="rgba(255,255,255,0.28)" />
    ))}
  </svg>
);

const chartConfig = {
  citations: { label: "AI citations", color: "#f97316" },
  visits: { label: "Referral visits", color: "#fb923c" },
} satisfies ChartConfig;

const chartData = [
  { month: "Week 1", citations: 12, visits: 40 },
  { month: "Week 2", citations: 18, visits: 64 },
  { month: "Week 3", citations: 34, visits: 120 },
  { month: "Week 4", citations: 52, visits: 188 },
  { month: "Week 5", citations: 86, visits: 260 },
  { month: "Week 6", citations: 140, visits: 360 },
];

const VisibilityChart = () => (
  <ChartContainer className="aspect-auto h-72 md:h-96" config={chartConfig}>
    <AreaChart accessibilityLayer data={chartData} margin={{ left: 0, right: 0 }}>
      <defs>
        <linearGradient id="fillCitations" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="var(--color-citations)" stopOpacity={0.7} />
          <stop offset="55%" stopColor="var(--color-citations)" stopOpacity={0.08} />
        </linearGradient>
        <linearGradient id="fillVisits" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="var(--color-visits)" stopOpacity={0.6} />
          <stop offset="55%" stopColor="var(--color-visits)" stopOpacity={0.06} />
        </linearGradient>
      </defs>
      <CartesianGrid vertical={false} stroke="rgba(255,255,255,0.06)" />
      <ChartTooltip active cursor={false} content={<ChartTooltipContent className="bg-[#0a0c12] text-white" />} />
      <Area strokeWidth={2} dataKey="visits" type="stepBefore" fill="url(#fillVisits)" fillOpacity={0.1} stroke="var(--color-visits)" stackId="a" />
      <Area strokeWidth={2} dataKey="citations" type="stepBefore" fill="url(#fillCitations)" fillOpacity={0.1} stroke="var(--color-citations)" stackId="a" />
    </AreaChart>
  </ChartContainer>
);

export default AeoVisibilitySection;
