import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { TextShimmer } from "@/components/ui/text-shimmer";
import {
  RefreshCw,
  Inbox,
  Phone,
  Layers,
  Trophy,
} from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

interface Feature {
  icon: React.ReactNode;
  number: string;
  title: string;
  body: string[];
  accent?: boolean;
}

const features: Feature[] = [
  {
    icon: <RefreshCw className="w-5 h-5" />,
    number: "01",
    title: "The Lead Reviver",
    body: [
      "Retain your churned customers and bring them back into your business without spending a single dollar on paid ads. This outreach agent runs deep analysis on your leads, reads their sentiments, and opens personalized conversations that sound completely human.",
      "Your prospects get the right message at the right time, and your agents handle the follow-through until the conversion is done.",
    ],
    accent: false,
  },
  {
    icon: <Inbox className="w-5 h-5" />,
    number: "02",
    title: "The Inbound Handler",
    body: [
      "Every lead that comes in through Email, WhatsApp, Meta, X, or LinkedIn gets handled instantly. No manual sorting, no missed messages, no delayed responses.",
      "Your inbound pipeline runs on autopilot so your team can focus on closing, not chasing.",
    ],
    accent: true,
  },
  {
    icon: <Phone className="w-5 h-5" />,
    number: "03",
    title: "AI Call Agent",
    body: [
      "Beyond text, your business now has a voice. Our AI call agent handles both inbound and outreach calls around the clock, so not a single missed call goes unattended.",
      "Your customer support stays active 24/7 without hiring extra staff. Every caller gets a responsive, human-sounding experience from the first ring.",
    ],
    accent: false,
  },
  {
    icon: <Layers className="w-5 h-5" />,
    number: "04",
    title: "Content System",
    body: [
      "Stop wasting time hunting for agencies and waiting months for results. The Effect3 Content System generates D2C and B2B ads built for performance, not just aesthetics.",
      "You design your own content workflow and our team implements it inside the system, so you get consistent output on your schedule.",
    ],
    accent: false,
  },
  {
    icon: <Trophy className="w-5 h-5" />,
    number: "05",
    title: "Rerank System",
    body: [
      "Rank your brand inside large language models and capture the traffic that traditional SEO misses. With Answer Engine Optimization (AEO), your brand becomes the answer customers find when they ask AI.",
      "More visibility in LLMs means more discovery, more trust, and more conversions driven by agents working in your favor.",
    ],
    accent: false,
  },
];

const FeatureCard = ({ feature, index }: { feature: Feature; index: number }) => {
  const cardRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      if (!cardRef.current) return;
      gsap.set(cardRef.current, { autoAlpha: 0, y: 40 });
      gsap.to(cardRef.current, {
        autoAlpha: 1,
        y: 0,
        duration: 0.7,
        delay: (index % 3) * 0.1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: cardRef.current,
          start: "top 88%",
          once: true,
        },
      });
    },
    { scope: cardRef }
  );

  return (
    <div
      ref={cardRef}
      className={`group relative rounded-2xl border p-7 flex flex-col gap-5 transition-all duration-500 overflow-hidden
        ${feature.accent
          ? "border-orange-500/30 bg-gradient-to-br from-orange-500/10 via-orange-500/5 to-transparent hover:border-orange-500/50 hover:from-orange-500/15"
          : "border-white/10 bg-white/[0.02] hover:bg-white/[0.04] hover:border-white/20"
        }`}
    >
      {/* Subtle background glow for accent card */}
      {feature.accent && (
        <div className="absolute top-0 right-0 w-40 h-40 bg-orange-500/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 pointer-events-none" />
      )}

      {/* Top row: number + icon */}
      <div className="flex items-center justify-between">
        <span className={`text-xs font-mono tracking-widest ${feature.accent ? "text-orange-400/60" : "text-white/20"}`}>
          {feature.number}
        </span>
        <div
          className={`w-10 h-10 rounded-xl flex items-center justify-center border transition-all duration-500
            ${feature.accent
              ? "border-orange-400/30 bg-orange-500/15 text-orange-300 group-hover:bg-orange-500/25 group-hover:border-orange-400/50"
              : "border-white/10 bg-white/[0.03] text-white/40 group-hover:border-orange-400/20 group-hover:text-orange-300/70 group-hover:bg-orange-500/5"
            }`}
        >
          {feature.icon}
        </div>
      </div>

      {/* Title */}
      <h3 className={`text-xl sm:text-2xl font-light tracking-tight transition-colors duration-300 ${feature.accent ? "text-white" : "text-white/85 group-hover:text-white"}`}>
        {feature.title}
      </h3>

      {/* Divider */}
      <div className={`w-10 h-px ${feature.accent ? "bg-orange-400/40" : "bg-white/10"}`} />

      {/* Body */}
      <div className="flex flex-col gap-3">
        {feature.body.map((para, i) => (
          <p key={i} className={`text-sm font-light leading-relaxed ${feature.accent ? "text-white/60" : "text-white/40"}`}>
            {para}
          </p>
        ))}
      </div>

      {/* Bottom status pill */}
      <div className="mt-auto pt-2">
        <span
          className={`inline-flex items-center gap-1.5 text-[11px] font-light rounded-full px-3 py-1 border
            ${feature.accent
              ? "border-orange-400/20 bg-orange-500/10 text-orange-300/70"
              : "border-white/8 bg-white/[0.03] text-white/30"
            }`}
        >
          <span className={`w-1.5 h-1.5 rounded-full ${feature.accent ? "bg-orange-400" : "bg-green-400"}`} />
          Active in your system
        </span>
      </div>
    </div>
  );
};

const FeaturesSection = () => {
  const sectionRef = useRef<HTMLElement | null>(null);
  const headingRef = useRef<HTMLDivElement | null>(null);

  useGSAP(
    () => {
      if (!sectionRef.current) return;
      gsap.set(headingRef.current, { autoAlpha: 0, y: 30 });
      gsap.to(headingRef.current, {
        autoAlpha: 1,
        y: 0,
        duration: 0.8,
        ease: "power3.out",
        scrollTrigger: { trigger: sectionRef.current, start: "top 80%", once: true },
      });

      const inner = sectionRef.current.querySelector(".parallax-inner");
      if (inner) {
        gsap.to(inner, {
          yPercent: -4,
          ease: "none",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top bottom",
            end: "bottom top",
            scrub: 0.6,
          },
        });
      }
    },
    { scope: sectionRef }
  );

  return (
    <section
      ref={sectionRef}
      className="w-full py-12 md:py-20 bg-black border-t border-white/5 overflow-hidden"
    >
      <div className="parallax-inner mx-auto max-w-7xl px-6 md:px-10 lg:px-16">
        {/* Badge and Heading */}
        <div ref={headingRef} className="flex flex-col items-center text-center gap-6 mb-16">
          <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1.5 backdrop-blur-sm">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500" />
            </span>
            <span className="text-xs font-light tracking-tight text-white/80">The Agents</span>
          </div>

          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extralight tracking-tight leading-[1.1] max-w-3xl">
            <span className="text-white/90">Five agents. One system. </span>
            <TextShimmer
              as="span"
              duration={2}
              spread={4}
              className="italic font-light [--base-color:theme(colors.orange.300)] [--base-gradient-color:theme(colors.orange.100)] dark:[--base-color:theme(colors.orange.300)] dark:[--base-gradient-color:theme(colors.orange.100)]"
            >
              Infinite leverage.
            </TextShimmer>
          </h2>

          <p className="text-sm sm:text-base font-light text-white/40 max-w-xl leading-relaxed">
            Each agent is purpose-built to handle a specific part of your revenue pipeline. Together, they run your growth on autopilot.
          </p>
        </div>

        {/* Cards grid: 3 top + 2 bottom centered */}
        <div className="flex flex-col gap-4">
          {/* Row 1: 3 cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {features.slice(0, 3).map((feature, i) => (
              <FeatureCard key={i} feature={feature} index={i} />
            ))}
          </div>
          {/* Row 2: 2 cards centered */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:px-[16.67%]">
            {features.slice(3).map((feature, i) => (
              <FeatureCard key={i + 3} feature={feature} index={i + 3} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
