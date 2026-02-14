import { useRef, useState } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { TextShimmer } from "@/components/ui/text-shimmer";
import { Card, CardContent } from "@/components/ui/card";
import {
  ShieldCheck,
  BarChart3,
  Rocket,
  TrendingUp,
  ClipboardCheck,
} from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

/* Interactive chart data for Lead Analysis card */
const chartPoints = [
  { x: 0, y: 55 }, { x: 40, y: 45 }, { x: 80, y: 30 },
  { x: 120, y: 20 }, { x: 160, y: 25 }, { x: 200, y: 5 },
];
const chartPath = "M0 55 Q20 50 40 45 T80 30 T120 20 T160 25 T200 5";

function InteractiveChart() {
  const [hover, setHover] = useState<number | null>(null);

  return (
    <div className="w-full max-w-[200px]">
      <div className="flex items-center justify-between mb-2">
        <span className="text-[10px] text-white/30 flex items-center gap-1">
          <BarChart3 className="w-3 h-3" /> Analysis
        </span>
        <span className="text-[10px] text-orange-400/80 font-mono">
          {hover !== null ? `${(100 - chartPoints[hover].y * 1.5).toFixed(1)}%` : "98.7%"}
        </span>
      </div>
      <svg
        viewBox="0 0 200 60"
        className="w-full h-auto"
        fill="none"
        onMouseLeave={() => setHover(null)}
      >
        <path d={chartPath} stroke="url(#chartGrad)" strokeWidth="1.5" strokeLinecap="round" />
        {/* Hover hit areas + dots + tooltips */}
        {chartPoints.map((pt, i) => (
          <g key={i} onMouseEnter={() => setHover(i)}>
            <rect x={pt.x - 15} y={0} width={30} height={60} fill="transparent" />
            <circle
              cx={pt.x}
              cy={pt.y}
              r={hover === i ? 4 : 2.5}
              fill={hover === i ? "#fb923c" : "rgba(251,146,60,0.5)"}
              className="transition-all duration-200"
            />
            {hover === i && (
              <>
                <line x1={pt.x} y1={pt.y + 5} x2={pt.x} y2={60} stroke="rgba(251,146,60,0.3)" strokeWidth="0.5" strokeDasharray="2 2" />
                <rect x={pt.x - 16} y={pt.y - 18} width={32} height={14} rx={3} fill="rgba(0,0,0,0.7)" stroke="rgba(251,146,60,0.4)" strokeWidth="0.5" />
                <text x={pt.x} y={pt.y - 8} textAnchor="middle" fill="white" fontSize="7" fontFamily="monospace">
                  {(100 - pt.y * 1.5).toFixed(0)}%
                </text>
              </>
            )}
          </g>
        ))}
        <defs>
          <linearGradient id="chartGrad" x1="0" y1="0" x2="200" y2="0">
            <stop offset="0%" stopColor="rgba(255,255,255,0.15)" />
            <stop offset="100%" stopColor="rgba(251,146,60,0.7)" />
          </linearGradient>
        </defs>
      </svg>
    </div>
  );
}

const InfrastructureSection = () => {
  const sectionRef = useRef<HTMLElement | null>(null);
  const headingRef = useRef<HTMLDivElement | null>(null);
  const cardsRef = useRef<HTMLDivElement | null>(null);

  useGSAP(
    () => {
      if (!sectionRef.current) return;

      gsap.set(headingRef.current, { autoAlpha: 0, y: 30 });
      gsap.to(headingRef.current, {
        autoAlpha: 1, y: 0, duration: 0.8, ease: "power3.out",
        scrollTrigger: { trigger: sectionRef.current, start: "top 80%", once: true },
      });

      if (cardsRef.current) {
        const cards = cardsRef.current.querySelectorAll(".step-card");
        gsap.set(cards, { autoAlpha: 0, y: 40 });
        gsap.to(cards, {
          autoAlpha: 1, y: 0, duration: 0.7, stagger: 0.12, ease: "power3.out",
          scrollTrigger: { trigger: cardsRef.current, start: "top 80%", once: true },
        });
      }
    },
    { scope: sectionRef }
  );

  return (
    <section ref={sectionRef} className="w-full py-24 md:py-32 bg-black border-t border-white/5">
      <div className="mx-auto max-w-7xl px-6 md:px-10 lg:px-16">
        {/* Badge & Heading */}
        <div ref={headingRef} className="flex flex-col items-center text-center gap-6 mb-16">
          <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1.5 backdrop-blur-sm">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
            </span>
            <span className="text-xs font-light tracking-tight text-white/80">The Infrastructure</span>
          </div>
          <TextShimmer
            as="span"
            duration={2}
            spread={4}
            className="text-3xl sm:text-4xl md:text-5xl font-extralight tracking-tight leading-[1.1] [--base-color:theme(colors.orange.300)] [--base-gradient-color:theme(colors.orange.100)] dark:[--base-color:theme(colors.orange.300)] dark:[--base-gradient-color:theme(colors.orange.100)]"
          >
            Implement in Your Business in Just 5 Simple Steps
          </TextShimmer>
        </div>

        {/* Bento Grid */}
        <div ref={cardsRef} className="grid grid-cols-1 md:grid-cols-6 gap-4">
          {/* Card 1 — Audit */}
          <Card className="step-card md:col-span-2 border-white/10 bg-white/[0.02] hover:bg-white/[0.04] hover:border-white/15 transition-all duration-300 overflow-hidden group">
            <CardContent className="p-0 flex flex-col h-full">
              <div className="flex items-center justify-center pt-10 pb-6 px-6">
                <div className="relative">
                  <div className="w-40 h-20 rounded-full border border-white/10 flex items-center justify-center bg-white/[0.03] group-hover:border-orange-400/20 transition-colors duration-500">
                    <span className="text-5xl font-extralight text-white tracking-tight group-hover:text-orange-200 transition-colors duration-500">100%</span>
                  </div>
                </div>
              </div>
              <div className="px-6 pb-8 text-center">
                <h3 className="text-xl font-light text-white/90 mb-2">Audit Your Business</h3>
                <p className="text-sm font-light leading-relaxed text-white/40">
                  We begin with a deep audit of your sales funnel, customer lifecycle, churn patterns, and historical lead data.
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Card 2 — Secure Data Integration */}
          <Card className="step-card md:col-span-2 border-white/10 bg-white/[0.02] hover:bg-white/[0.04] hover:border-white/15 transition-all duration-300 overflow-hidden group">
            <CardContent className="p-0 flex flex-col h-full">
              <div className="flex items-center justify-center pt-10 pb-6 px-6">
                <div className="relative w-24 h-24">
                  <ShieldCheck className="w-full h-full text-white/15 stroke-[0.8] group-hover:text-white/25 transition-colors duration-500" />
                  <div className="absolute left-2 right-2 top-1/2 h-px bg-gradient-to-r from-transparent via-orange-400/60 to-transparent animate-[scanLine_2.5s_ease-in-out_infinite]" />
                </div>
              </div>
              <div className="px-6 pb-8 text-center">
                <h3 className="text-xl font-light text-white/90 mb-2">Secure Data Integration</h3>
                <p className="text-sm font-light leading-relaxed text-white/40">
                  You securely connect your CRM or lead database. We ensure privacy, encryption, and full control while enabling intelligent automation.
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Card 3 — Lead Analysis (interactive chart) */}
          <Card className="step-card md:col-span-2 border-white/10 bg-white/[0.02] hover:bg-white/[0.04] hover:border-white/15 transition-all duration-300 overflow-hidden group">
            <CardContent className="p-0 flex flex-col h-full">
              <div className="flex items-center justify-center pt-10 pb-6 px-6">
                <InteractiveChart />
              </div>
              <div className="px-6 pb-8 text-center">
                <h3 className="text-xl font-light text-white/90 mb-2">Lead Analysis & Segmentation</h3>
                <p className="text-sm font-light leading-relaxed text-white/40">
                  Our agents analyze behaviour, sentiment, and purchase history, segmenting leads by buying intent and engagement patterns.
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Card 4 — Strategy & Execution */}
          <Card className="step-card md:col-span-3 border-white/10 bg-white/[0.02] hover:bg-white/[0.04] hover:border-white/15 transition-all duration-300 overflow-hidden group">
            <CardContent className="p-0 flex flex-col sm:flex-row h-full">
              <div className="flex-1 p-6 sm:p-8 flex flex-col justify-center">
                <div className="w-12 h-12 rounded-lg flex items-center justify-center border border-white/10 bg-white/[0.03] mb-5 group-hover:border-orange-400/20 group-hover:bg-orange-500/5 transition-all duration-500">
                  <Rocket className="w-5 h-5 text-white/40 group-hover:text-orange-300/70 transition-colors duration-500" />
                </div>
                <h3 className="text-xl font-light text-white/90 mb-2">Strategy & Campaign Execution</h3>
                <p className="text-sm font-light leading-relaxed text-white/40">
                  AI agents design personalized re-engagement strategies with exclusive offers, free trials, and loyalty incentives. After your approval, campaigns deploy across email, voice, and WhatsApp at scale.
                </p>
              </div>
              <div className="flex-shrink-0 sm:w-48 flex items-end justify-center p-6 sm:pr-8">
                <div className="w-full max-w-[180px] rounded-lg border border-white/10 bg-white/[0.03] p-3 group-hover:border-white/15 transition-colors duration-300">
                  <div className="flex gap-1 mb-3">
                    <span className="w-1.5 h-1.5 rounded-full bg-white/20" />
                    <span className="w-1.5 h-1.5 rounded-full bg-white/20" />
                    <span className="w-1.5 h-1.5 rounded-full bg-white/20" />
                  </div>
                  <svg viewBox="0 0 140 70" className="w-full" fill="none">
                    <path d="M0 65 L10 55 L20 60 L30 40 L40 45 L50 30 L60 35 L70 20 L80 25 L90 15 L100 18 L110 10 L120 12 L130 5 L140 8" stroke="rgba(251,146,60,0.6)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                    <path d="M0 65 L10 55 L20 60 L30 40 L40 45 L50 30 L60 35 L70 20 L80 25 L90 15 L100 18 L110 10 L120 12 L130 5 L140 8 L140 70 L0 70 Z" fill="url(#areaGrad)" />
                    <defs>
                      <linearGradient id="areaGrad" x1="0" y1="0" x2="0" y2="70">
                        <stop offset="0%" stopColor="rgba(251,146,60,0.15)" />
                        <stop offset="100%" stopColor="rgba(251,146,60,0)" />
                      </linearGradient>
                    </defs>
                  </svg>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Card 5 — Revenue Recovery */}
          <Card className="step-card md:col-span-3 border-white/10 bg-white/[0.02] hover:bg-white/[0.04] hover:border-white/15 transition-all duration-300 overflow-hidden group">
            <CardContent className="p-0 flex flex-col sm:flex-row h-full">
              <div className="flex-1 p-6 sm:p-8 flex flex-col justify-center">
                <div className="w-12 h-12 rounded-lg flex items-center justify-center border border-white/10 bg-white/[0.03] mb-5 group-hover:border-orange-400/20 group-hover:bg-orange-500/5 transition-all duration-500">
                  <TrendingUp className="w-5 h-5 text-white/40 group-hover:text-orange-300/70 transition-colors duration-500" />
                </div>
                <h3 className="text-xl font-light text-white/90 mb-2">Measurable Revenue Recovery</h3>
                <p className="text-sm font-light leading-relaxed text-white/40">
                  Track revived leads, reactivated customers, and real conversion impact through clear performance reporting.
                </p>
              </div>
              <div className="flex-shrink-0 sm:w-48 flex items-center justify-center p-6 sm:pr-8">
                <div className="flex flex-col gap-3">
                  <div className="flex items-center gap-2 group-hover:translate-x-1 transition-transform duration-300">
                    <div className="px-3 py-1 rounded-full border border-white/10 bg-white/[0.03] text-[11px] text-white/60 font-light">Leads Revived</div>
                    <div className="w-7 h-7 rounded-full bg-gradient-to-br from-orange-500/40 to-orange-400/20 border border-orange-400/20 flex items-center justify-center">
                      <ClipboardCheck className="w-3.5 h-3.5 text-orange-300/80" />
                    </div>
                  </div>
                  <div className="flex items-center gap-2 ml-4 group-hover:translate-x-2 transition-transform duration-500">
                    <div className="w-7 h-7 rounded-full bg-gradient-to-br from-orange-500/40 to-orange-400/20 border border-orange-400/20 flex items-center justify-center">
                      <TrendingUp className="w-3.5 h-3.5 text-orange-300/80" />
                    </div>
                    <div className="px-3 py-1 rounded-full border border-white/10 bg-white/[0.03] text-[11px] text-white/60 font-light">+68% ROI</div>
                  </div>
                  <div className="flex items-center gap-2 group-hover:translate-x-1 transition-transform duration-300 delay-100">
                    <div className="px-3 py-1 rounded-full border border-white/10 bg-white/[0.03] text-[11px] text-white/60 font-light">Conversions</div>
                    <div className="w-7 h-7 rounded-full bg-gradient-to-br from-orange-500/40 to-orange-400/20 border border-orange-400/20 flex items-center justify-center">
                      <Rocket className="w-3.5 h-3.5 text-orange-300/80" />
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default InfrastructureSection;
