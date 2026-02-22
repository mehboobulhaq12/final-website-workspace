import { useRef, useEffect, useState } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { TextShimmer } from "@/components/ui/text-shimmer";
import {
  Mail, MessageSquare, Twitter, Linkedin, Bot,
  Mic, PhoneCall, PhoneIncoming, Sparkles, BarChart3,
} from "lucide-react";
import leadReviverImg from "@/assets/agents/lead-reviver.png";
import inboundHandlerImg from "@/assets/agents/inbound-handler.png";
import aiCallAgentImg from "@/assets/agents/ai-call-agent.png";
import contentSystemImg from "@/assets/agents/content-system.png";
import rerankSystemImg from "@/assets/agents/rerank-system.png";

gsap.registerPlugin(ScrollTrigger);

/* ─── 1. Lead Reviver: sentiment radar animation ─── */
const LeadReviverViz = () => {
  const [pulse, setPulse] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const startedRef = useRef(false);

  useEffect(() => {
    const trigger = ScrollTrigger.create({
      trigger: containerRef.current,
      start: "top 88%",
      once: true,
      onEnter: () => {
        if (startedRef.current) return;
        startedRef.current = true;
        let frame = 0;
        const tick = () => {
          frame++;
          setPulse(frame);
          requestAnimationFrame(tick);
        };
        requestAnimationFrame(tick);
      },
    });
    return () => trigger.kill();
  }, []);

  const leads = [
    { label: "Sarah K.", score: 87, angle: 30 },
    { label: "James R.", score: 62, angle: 105 },
    { label: "Mei L.", score: 94, angle: 185 },
    { label: "Tom A.", score: 45, angle: 260 },
  ];

  return (
    <div ref={containerRef} className="relative flex items-center justify-center w-full h-36">
      {/* Radar rings */}
      {[40, 28, 16].map((r, i) => (
        <div
          key={i}
          className="absolute rounded-full border border-white/8"
          style={{ width: r * 2, height: r * 2 }}
        />
      ))}
      {/* Center AI dot */}
      <div className="absolute w-6 h-6 rounded-full bg-orange-500/20 border border-orange-400/40 flex items-center justify-center z-10">
        <Bot className="w-3 h-3 text-orange-300" />
      </div>
      {/* Lead dots */}
      {leads.map((lead, i) => {
        const rad = (lead.angle * Math.PI) / 180;
        const dist = 34 + Math.sin((pulse / 60 + i) * 0.8) * 4;
        const x = Math.cos(rad) * dist;
        const y = Math.sin(rad) * dist;
        const active = Math.floor(pulse / 90) % leads.length === i;
        return (
          <div
            key={i}
            className="absolute transition-all duration-300"
            style={{ transform: `translate(${x}px, ${y}px)` }}
          >
            <div
              className={`w-2 h-2 rounded-full transition-all duration-300 ${
                active ? "bg-orange-400 scale-150 shadow-[0_0_8px_rgba(251,146,60,0.6)]" : "bg-white/30"
              }`}
            />
            {active && (
              <div className="absolute left-3 -top-1 bg-white/8 border border-white/10 rounded px-1.5 py-0.5 whitespace-nowrap">
                <span className="text-[9px] text-orange-300">{lead.label}</span>
                <span className="text-[9px] text-white/40 ml-1">{lead.score}%</span>
              </div>
            )}
          </div>
        );
      })}
      {/* Sweep line */}
      <div
        className="absolute w-px bg-gradient-to-t from-orange-400/40 to-transparent origin-bottom"
        style={{
          height: 40,
          bottom: "50%",
          left: "50%",
          transform: `translateX(-50%) rotate(${(pulse * 1.2) % 360}deg)`,
          transformOrigin: "50% 100%",
        }}
      />
    </div>
  );
};

/* ─── 2. Inbound Handler: multi-channel message stream ─── */
const InboundViz = () => {
  const [stage, setStage] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const startedRef = useRef(false);

  useEffect(() => {
    const trigger = ScrollTrigger.create({
      trigger: containerRef.current,
      start: "top 88%",
      once: true,
      onEnter: () => {
        if (startedRef.current) return;
        startedRef.current = true;
        const timers: ReturnType<typeof setTimeout>[] = [];
        const cycle = (offset = 0) => {
          [0, 600, 1200, 1800, 2400, 3000].forEach((t, i) => {
            timers.push(setTimeout(() => setStage(i), offset + t));
          });
        };
        cycle(0); cycle(4000); cycle(8000);
        return () => timers.forEach(clearTimeout);
      },
    });
    return () => trigger.kill();
  }, []);

  const channels = [
    { icon: <Mail className="w-3 h-3" />, label: "Email", color: "text-blue-400/70", msg: "New inquiry received" },
    { icon: <MessageSquare className="w-3 h-3" />, label: "WhatsApp", color: "text-green-400/70", msg: "Lead replied" },
    { icon: <Twitter className="w-3 h-3" />, label: "X (Twitter)", color: "text-sky-400/70", msg: "DM inbound" },
    { icon: <Linkedin className="w-3 h-3" />, label: "LinkedIn", color: "text-blue-500/70", msg: "Connection message" },
    { icon: <MessageSquare className="w-3 h-3" />, label: "Meta", color: "text-purple-400/70", msg: "Ad form submission" },
  ];

  return (
    <div ref={containerRef} className="w-full flex flex-col gap-1.5">
      {channels.map((ch, i) => (
        <div
          key={i}
          className={`flex items-center gap-2 rounded-lg border px-3 py-2 transition-all duration-500 ${
            stage >= i + 1
              ? "border-white/15 bg-white/[0.04] opacity-100 translate-x-0"
              : "border-transparent bg-transparent opacity-0 -translate-x-3"
          }`}
          style={{ transitionDelay: `${i * 40}ms` }}
        >
          <span className={ch.color}>{ch.icon}</span>
          <span className="text-[10px] text-white/50 font-light flex-1">{ch.msg}</span>
          <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
        </div>
      ))}
    </div>
  );
};

/* ─── 3. AI Call Agent: waveform animation ─── */
const CallAgentViz = () => {
  const [active, setActive] = useState(false);
  const [bars, setBars] = useState<number[]>(Array(20).fill(0.1));
  const containerRef = useRef<HTMLDivElement>(null);
  const startedRef = useRef(false);
  const frameRef = useRef(0);

  useEffect(() => {
    const trigger = ScrollTrigger.create({
      trigger: containerRef.current,
      start: "top 88%",
      once: true,
      onEnter: () => {
        if (startedRef.current) return;
        startedRef.current = true;
        setTimeout(() => setActive(true), 600);
        const animate = () => {
          setBars(prev =>
            prev.map((_, i) => 0.1 + Math.abs(Math.sin(Date.now() / 200 + i * 0.5)) * 0.9)
          );
          frameRef.current = requestAnimationFrame(animate);
        };
        setTimeout(() => { animate(); }, 600);
      },
    });
    return () => { trigger.kill(); cancelAnimationFrame(frameRef.current); };
  }, []);

  return (
    <div ref={containerRef} className="flex flex-col items-center gap-4 py-2">
      {/* Phone icon with ring */}
      <div className="relative">
        <div className={`absolute inset-0 rounded-full transition-all duration-700 ${active ? "scale-150 opacity-0 bg-orange-400/20 animate-ping" : "scale-100 opacity-0"}`} />
        <div className={`w-12 h-12 rounded-full border flex items-center justify-center transition-all duration-700 ${
          active ? "border-orange-400/50 bg-orange-500/15 shadow-[0_0_20px_rgba(251,146,60,0.2)]" : "border-white/15 bg-white/[0.03]"
        }`}>
          {active ? (
            <PhoneCall className="w-5 h-5 text-orange-300" />
          ) : (
            <PhoneIncoming className="w-5 h-5 text-white/40" />
          )}
        </div>
      </div>

      {/* Status */}
      <div className="flex items-center gap-1.5">
        <span className={`w-1.5 h-1.5 rounded-full transition-colors duration-700 ${active ? "bg-green-400 animate-pulse" : "bg-white/20"}`} />
        <span className={`text-[10px] font-light transition-colors duration-700 ${active ? "text-green-400/80" : "text-white/30"}`}>
          {active ? "Live Call Active" : "Waiting..."}
        </span>
      </div>

      {/* Waveform */}
      <div className="flex items-center gap-px h-10 w-full max-w-[160px]">
        {bars.map((h, i) => (
          <div
            key={i}
            className={`flex-1 rounded-full transition-all duration-75 ${active ? "bg-orange-400/60" : "bg-white/10"}`}
            style={{ height: `${active ? h * 100 : 10}%` }}
          />
        ))}
      </div>

      <div className="flex items-center gap-2">
        <Mic className="w-3 h-3 text-white/30" />
        <span className="text-[9px] text-white/25 font-light">AI voice is active</span>
      </div>
    </div>
  );
};

/* ─── 4. Content System: ad generation typing animation ─── */
const ContentSystemViz = () => {
  const [step, setStep] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const startedRef = useRef(false);

  useEffect(() => {
    const trigger = ScrollTrigger.create({
      trigger: containerRef.current,
      start: "top 88%",
      once: true,
      onEnter: () => {
        if (startedRef.current) return;
        startedRef.current = true;
        const timers: ReturnType<typeof setTimeout>[] = [];
        [0, 800, 1600, 2500, 3500, 4500].forEach((t, i) => {
          timers.push(setTimeout(() => setStep(i + 1), t));
        });
        return () => timers.forEach(clearTimeout);
      },
    });
    return () => trigger.kill();
  }, []);

  const pipeline = [
    { label: "Brief received", done: step >= 1 },
    { label: "Audience mapped", done: step >= 2 },
    { label: "Copy generated", done: step >= 3 },
    { label: "Creative variant A", done: step >= 4 },
    { label: "Creative variant B", done: step >= 5 },
    { label: "Ready to deploy", done: step >= 6 },
  ];

  return (
    <div ref={containerRef} className="w-full flex flex-col gap-2">
      <div className="flex items-center gap-2 mb-1">
        <Sparkles className="w-3.5 h-3.5 text-orange-300/70" />
        <span className="text-[10px] text-orange-300/60 font-light tracking-wider">Content Pipeline</span>
      </div>
      {pipeline.map((item, i) => (
        <div
          key={i}
          className={`flex items-center gap-2 transition-all duration-500 ${
            item.done ? "opacity-100" : "opacity-25"
          }`}
          style={{ transitionDelay: `${i * 50}ms` }}
        >
          <div className={`w-3.5 h-3.5 rounded-full border flex items-center justify-center flex-shrink-0 transition-all duration-500 ${
            item.done ? "border-orange-400/50 bg-orange-500/20" : "border-white/15 bg-transparent"
          }`}>
            {item.done && <div className="w-1.5 h-1.5 rounded-full bg-orange-400" />}
          </div>
          <div className={`h-px flex-1 transition-all duration-700 ${item.done ? "bg-orange-400/20" : "bg-white/8"}`} />
          <span className={`text-[10px] font-light transition-colors duration-500 ${item.done ? "text-white/60" : "text-white/25"}`}>
            {item.label}
          </span>
        </div>
      ))}
    </div>
  );
};

/* ─── 5. Rerank System: LLM ranking bars animation ─── */
const RerankViz = () => {
  const [progress, setProgress] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const startedRef = useRef(false);

  useEffect(() => {
    let animFrame: number;
    const trigger = ScrollTrigger.create({
      trigger: containerRef.current,
      start: "top 88%",
      once: true,
      onEnter: () => {
        if (startedRef.current) return;
        startedRef.current = true;
        const start = performance.now();
        const duration = 4000;
        const animate = (now: number) => {
          const t = Math.min((now - start) / duration, 1);
          const eased = 1 - Math.pow(1 - t, 3);
          setProgress(eased);
          if (t < 1) animFrame = requestAnimationFrame(animate);
        };
        animFrame = requestAnimationFrame(animate);
      },
    });
    return () => { trigger.kill(); cancelAnimationFrame(animFrame); };
  }, []);

  const llms = [
    { name: "ChatGPT", before: 12, after: 94 },
    { name: "Claude", before: 8, after: 88 },
    { name: "Gemini", before: 15, after: 91 },
    { name: "Perplexity", before: 6, after: 85 },
  ];

  return (
    <div ref={containerRef} className="w-full flex flex-col gap-2">
      <div className="flex items-center justify-between mb-1">
        <span className="text-[10px] text-white/30 flex items-center gap-1">
          <BarChart3 className="w-3 h-3" /> Brand visibility in LLMs
        </span>
        <span className="text-[10px] text-orange-400/80 font-mono">{Math.round(progress * 91)}%</span>
      </div>
      {llms.map((llm, i) => {
        const current = llm.before + (llm.after - llm.before) * progress;
        return (
          <div key={i} className="flex items-center gap-2">
            <span className="text-[9px] text-white/35 w-16 text-right font-light">{llm.name}</span>
            <div className="flex-1 h-2 rounded-full bg-white/[0.04] border border-white/8 overflow-hidden">
              <div
                className="h-full rounded-full bg-gradient-to-r from-orange-500/60 to-orange-400/80 transition-all duration-100"
                style={{ width: `${current}%` }}
              />
            </div>
            <span className="text-[9px] text-orange-400/60 w-6 font-mono">{Math.round(current)}</span>
          </div>
        );
      })}
    </div>
  );
};

/* ─── Feature data ─── */
interface Feature {
  icon: React.ReactNode;
  number: string;
  title: string;
  body: string[];
  viz: React.ReactNode;
  accent?: boolean;
  wide?: boolean;
}

const features: Feature[] = [
  {
    icon: <img src={leadReviverImg} alt="Lead Reviver" className="w-8 h-8 rounded-lg object-cover" />,
    number: "01",
    title: "The Lead Reviver",
    body: [
      "Retain your churned customers and bring them back into your business without spending a single dollar on paid ads. This outreach agent runs deep analysis on your leads, reads their sentiments, and opens personalized conversations that sound completely human.",
      "Your prospects get the right message at the right time, and your agents handle the follow-through until the conversion is done.",
    ],
    viz: <LeadReviverViz />,
    accent: false,
    wide: false,
  },
  {
    icon: <img src={inboundHandlerImg} alt="Inbound Handler" className="w-8 h-8 rounded-lg object-cover" />,
    number: "02",
    title: "The Inbound Handler",
    body: [
      "Every lead that comes in through Email, WhatsApp, Meta, X, or LinkedIn gets handled instantly. No manual sorting, no missed messages, no delayed responses.",
      "Your inbound pipeline runs on autopilot so your team can focus on closing, not chasing.",
    ],
    viz: <InboundViz />,
    accent: true,
    wide: false,
  },
  {
    icon: <img src={aiCallAgentImg} alt="AI Call Agent" className="w-8 h-8 rounded-lg object-cover" />,
    number: "03",
    title: "AI Call Agent",
    body: [
      "Beyond text, your business now has a voice. Our AI call agent handles both inbound and outreach calls around the clock, so not a single missed call goes unattended.",
      "Your customer support stays active 24/7 without hiring extra staff. Every caller gets a responsive, human-sounding experience from the first ring.",
    ],
    viz: <CallAgentViz />,
    accent: false,
    wide: false,
  },
  {
    icon: <img src={contentSystemImg} alt="Content System" className="w-8 h-8 rounded-lg object-cover" />,
    number: "04",
    title: "Content System",
    body: [
      "Stop wasting time hunting for agencies and waiting months for results. The Effect3 Content System generates D2C and B2B ads built for performance, not just aesthetics.",
      "You design your own content workflow and our team implements it inside the system, so you get consistent output on your schedule.",
    ],
    viz: <ContentSystemViz />,
    accent: false,
    wide: true,
  },
  {
    icon: <img src={rerankSystemImg} alt="Rerank System" className="w-8 h-8 rounded-lg object-cover" />,
    number: "05",
    title: "Rerank System",
    body: [
      "Rank your brand inside large language models and capture the traffic that traditional SEO misses. With Answer Engine Optimization (AEO), your brand becomes the answer customers find when they ask AI.",
      "More visibility in LLMs means more discovery, more trust, and more conversions driven by agents working in your favor.",
    ],
    viz: <RerankViz />,
    accent: false,
    wide: true,
  },
];

/* ─── Card ─── */
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
          ? "border-orange-500/30 bg-gradient-to-br from-orange-500/10 via-orange-500/5 to-transparent hover:border-orange-500/50"
          : "border-white/10 bg-white/[0.02] hover:bg-white/[0.04] hover:border-white/20"
        }`}
    >
      {feature.accent && (
        <div className="absolute top-0 right-0 w-40 h-40 bg-orange-500/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 pointer-events-none" />
      )}

      {/* Top row */}
      <div className="flex items-center justify-between">
        <span className={`text-xs font-mono tracking-widest ${feature.accent ? "text-orange-400/60" : "text-white/20"}`}>
          {feature.number}
        </span>
        <div className={`w-10 h-10 rounded-xl flex items-center justify-center border transition-all duration-500
          ${feature.accent
            ? "border-orange-400/30 bg-orange-500/15 text-orange-300 group-hover:bg-orange-500/25 group-hover:border-orange-400/50"
            : "border-white/10 bg-white/[0.03] text-white/40 group-hover:border-orange-400/20 group-hover:text-orange-300/70 group-hover:bg-orange-500/5"
          }`}
        >
          {feature.icon}
        </div>
      </div>

      {/* Visualization */}
      <div className={`rounded-xl border p-4 ${feature.accent ? "border-orange-500/15 bg-black/30" : "border-white/6 bg-white/[0.02]"}`}>
        {feature.viz}
      </div>

      {/* Title */}
      <h3 className={`text-xl sm:text-2xl font-light tracking-tight transition-colors duration-300 ${feature.accent ? "text-white" : "text-white/85 group-hover:text-white"}`}>
        {feature.title}
      </h3>

      <div className={`w-10 h-px ${feature.accent ? "bg-orange-400/40" : "bg-white/10"}`} />

      {/* Body */}
      <div className="flex flex-col gap-3">
        {feature.body.map((para, i) => (
          <p key={i} className={`text-sm font-light leading-relaxed ${feature.accent ? "text-white/60" : "text-white/40"}`}>
            {para}
          </p>
        ))}
      </div>

      {/* Status pill */}
      <div className="mt-auto pt-2">
        <span className={`inline-flex items-center gap-1.5 text-[11px] font-light rounded-full px-3 py-1 border
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

/* ─── Section ─── */
const FeaturesSection = () => {
  const sectionRef = useRef<HTMLElement | null>(null);
  const headingRef = useRef<HTMLDivElement | null>(null);

  useGSAP(
    () => {
      if (!sectionRef.current) return;
      gsap.set(headingRef.current, { autoAlpha: 0, y: 30 });
      gsap.to(headingRef.current, {
        autoAlpha: 1, y: 0, duration: 0.8, ease: "power3.out",
        scrollTrigger: { trigger: sectionRef.current, start: "top 80%", once: true },
      });

      const inner = sectionRef.current.querySelector(".parallax-inner");
      if (inner) {
        gsap.to(inner, {
          yPercent: -4,
          ease: "none",
          scrollTrigger: { trigger: sectionRef.current, start: "top bottom", end: "bottom top", scrub: 0.6 },
        });
      }
    },
    { scope: sectionRef }
  );

  return (
    <section id="solutions" ref={sectionRef} className="w-full py-12 md:py-20 bg-black border-t border-white/5 overflow-hidden">
      <div className="parallax-inner mx-auto max-w-7xl px-6 md:px-10 lg:px-16">
        {/* Heading */}
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

        {/* Bento grid: 3 top + 2 bottom */}
        <div className="flex flex-col gap-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {features.slice(0, 3).map((f, i) => (
              <FeatureCard key={i} feature={f} index={i} />
            ))}
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:px-[16.67%]">
            {features.slice(3).map((f, i) => (
              <FeatureCard key={i + 3} feature={f} index={i + 3} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
