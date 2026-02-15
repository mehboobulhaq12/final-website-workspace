import { useRef, useEffect, useState } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { TextShimmer } from "@/components/ui/text-shimmer";
import { ArrowRight, TrendingUp, Users, ShoppingCart } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

interface CaseStudy {
  company: string;
  industry: string;
  description: string;
  metrics: {
    label: string;
    before: number;
    after: number;
    suffix: string;
    icon: React.ReactNode;
  }[];
  accent: boolean;
}

const caseStudies: CaseStudy[] = [
  {
    company: "NovaPay",
    industry: "FinTech SaaS",
    description:
      "NovaPay had 12,000+ churned users sitting idle. Within 60 days of deploying our AI agents, they reactivated dormant accounts and turned abandoned trials into paying subscriptions.",
    accent: true,
    metrics: [
      { label: "Conversion Rate", before: 2.1, after: 14.8, suffix: "%", icon: <TrendingUp className="w-3.5 h-3.5" /> },
      { label: "Sales Recovered", before: 18, after: 247, suffix: "K", icon: <ShoppingCart className="w-3.5 h-3.5" /> },
      { label: "Active Leads", before: 340, after: 4120, suffix: "", icon: <Users className="w-3.5 h-3.5" /> },
    ],
  },
  {
    company: "Velora",
    industry: "eCommerce",
    description:
      "Velora's abandoned carts were bleeding $400K/month. Our agents re-engaged shoppers with personalized offers, recovering lost revenue and boosting repeat purchases.",
    accent: false,
    metrics: [
      { label: "Conversion Rate", before: 3.4, after: 19.2, suffix: "%", icon: <TrendingUp className="w-3.5 h-3.5" /> },
      { label: "Sales Recovered", before: 42, after: 410, suffix: "K", icon: <ShoppingCart className="w-3.5 h-3.5" /> },
      { label: "Active Leads", before: 890, after: 6750, suffix: "", icon: <Users className="w-3.5 h-3.5" /> },
    ],
  },
  {
    company: "Meridian Health",
    industry: "Healthcare Services",
    description:
      "Meridian had thousands of patients who dropped off mid-funnel. AI-driven follow-ups brought them back with empathetic, HIPAA-compliant outreach that felt human.",
    accent: true,
    metrics: [
      { label: "Conversion Rate", before: 1.8, after: 11.5, suffix: "%", icon: <TrendingUp className="w-3.5 h-3.5" /> },
      { label: "Sales Recovered", before: 25, after: 189, suffix: "K", icon: <ShoppingCart className="w-3.5 h-3.5" /> },
      { label: "Active Leads", before: 520, after: 3840, suffix: "", icon: <Users className="w-3.5 h-3.5" /> },
    ],
  },
];

const AnimatedNumber = ({ target, suffix, started }: { target: number; suffix: string; started: boolean }) => {
  const [value, setValue] = useState(0);

  useEffect(() => {
    if (!started) return;
    const duration = 2000;
    const steps = 60;
    const increment = target / steps;
    let current = 0;
    let step = 0;
    const timer = setInterval(() => {
      step++;
      current += increment;
      if (step >= steps) {
        setValue(target);
        clearInterval(timer);
      } else {
        setValue(Math.round(current * 10) / 10);
      }
    }, duration / steps);
    return () => clearInterval(timer);
  }, [target, started]);

  const display = target % 1 !== 0 ? value.toFixed(1) : Math.round(value).toLocaleString();
  return <span>{display}{suffix}</span>;
};

const CaseStudiesSection = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const [started, setStarted] = useState(false);
  const [activeCard, setActiveCard] = useState(0);

  useGSAP(() => {
    if (!sectionRef.current) return;
    gsap.set(headingRef.current, { autoAlpha: 0, y: 30 });
    gsap.to(headingRef.current, {
      autoAlpha: 1, y: 0, duration: 0.8, ease: "power3.out",
      scrollTrigger: { trigger: sectionRef.current, start: "top 80%", once: true },
    });

    ScrollTrigger.create({
      trigger: sectionRef.current,
      start: "top 75%",
      once: true,
      onEnter: () => setStarted(true),
    });

    if (trackRef.current) {
      const cards = trackRef.current.querySelectorAll(".case-card");
      gsap.set(cards, { autoAlpha: 0, x: 60 });
      gsap.to(cards, {
        autoAlpha: 1, x: 0, duration: 0.8, stagger: 0.15, ease: "power3.out",
        scrollTrigger: { trigger: trackRef.current, start: "top 80%", once: true },
      });
    }
  }, { scope: sectionRef });

  // Auto-sliding with GSAP for smooth continuous animation
  useEffect(() => {
    if (!trackRef.current) return;
    const track = trackRef.current;
    let paused = false;
    let tween: gsap.core.Tween;

    // Wait a moment for cards to render
    const timeout = setTimeout(() => {
      const maxScroll = track.scrollWidth - track.clientWidth;
      if (maxScroll <= 0) return;

      tween = gsap.to(track, {
        scrollLeft: maxScroll,
        duration: 12,
        ease: "none",
        repeat: -1,
        yoyo: true,
        paused: false,
      });
    }, 1500);

    const onEnter = () => { if (tween) tween.pause(); paused = true; };
    const onLeave = () => { if (tween) tween.resume(); paused = false; };

    track.addEventListener("mouseenter", onEnter);
    track.addEventListener("mouseleave", onLeave);
    track.addEventListener("touchstart", onEnter, { passive: true });
    track.addEventListener("touchend", onLeave);

    return () => {
      clearTimeout(timeout);
      if (tween) tween.kill();
      track.removeEventListener("mouseenter", onEnter);
      track.removeEventListener("mouseleave", onLeave);
      track.removeEventListener("touchstart", onEnter);
      track.removeEventListener("touchend", onLeave);
    };
  }, []);

  // Track which card is most visible
  useEffect(() => {
    if (!trackRef.current) return;
    const track = trackRef.current;
    const onScroll = () => {
      const cards = track.querySelectorAll(".case-card");
      if (!cards.length) return;
      const trackLeft = track.getBoundingClientRect().left;
      const trackCenter = trackLeft + track.clientWidth / 2;
      let closest = 0;
      let minDist = Infinity;
      cards.forEach((card, i) => {
        const rect = card.getBoundingClientRect();
        const cardCenter = rect.left + rect.width / 2;
        const dist = Math.abs(cardCenter - trackCenter);
        if (dist < minDist) { minDist = dist; closest = i; }
      });
      setActiveCard(closest);
    };
    track.addEventListener("scroll", onScroll, { passive: true });
    return () => track.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <section ref={sectionRef} className="w-full py-12 md:py-16 bg-black border-t border-white/5 overflow-hidden">
      <div className="mx-auto max-w-7xl px-6 md:px-10 lg:px-16">
        <div ref={headingRef} className="flex flex-col gap-4 mb-10 max-w-3xl">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1.5 backdrop-blur-sm">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500" />
              </span>
              <span className="text-xs font-light tracking-tight text-white/80">Case Studies</span>
            </div>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extralight tracking-tight leading-[1.1]">
            <span className="text-white/90">Real businesses, </span>
            <TextShimmer
              as="span" duration={2} spread={4}
              className="italic font-light [--base-color:theme(colors.orange.300)] [--base-gradient-color:theme(colors.orange.100)] dark:[--base-color:theme(colors.orange.300)] dark:[--base-gradient-color:theme(colors.orange.100)]"
            >
              real results.
            </TextShimmer>
          </h2>
        </div>

        <div ref={trackRef} className="flex gap-4 overflow-x-auto pb-4 snap-x snap-mandatory scrollbar-hide" style={{ scrollbarWidth: "none" }}>
          {caseStudies.map((cs, i) => (
            <div
              key={i}
              className={`case-card flex-shrink-0 w-[340px] sm:w-[400px] rounded-xl border p-6 flex flex-col gap-5 snap-start ${
                cs.accent
                  ? "bg-orange-500/[0.08] border-orange-500/20"
                  : "bg-white/[0.02] border-white/10"
              }`}
            >
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-lg font-light text-white/90">{cs.company}</h3>
                  <p className="text-[11px] text-white/40 font-light">{cs.industry}</p>
                </div>
                <ArrowRight className={`w-4 h-4 ${cs.accent ? "text-orange-400/60" : "text-white/20"}`} />
              </div>

              <p className="text-sm font-light leading-relaxed text-white/50">{cs.description}</p>

              <div className="flex flex-col gap-3 mt-auto">
                {cs.metrics.map((m, mi) => (
                  <div key={mi} className="flex items-center justify-between">
                    <div className="flex items-center gap-2 text-white/40">
                      {m.icon}
                      <span className="text-xs font-light">{m.label}</span>
                    </div>
                    <div className="flex items-center gap-3 text-xs font-mono">
                      <span className="text-white/30">{m.before}{m.suffix}</span>
                      <ArrowRight className="w-3 h-3 text-orange-400/50" />
                      <span className="text-orange-400">
                        <AnimatedNumber target={m.after} suffix={m.suffix} started={started} />
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Progress dots */}
        <div className="flex items-center justify-center gap-2 mt-6">
          {caseStudies.map((_, i) => (
            <button
              key={i}
              aria-label={`Go to case study ${i + 1}`}
              onClick={() => {
                if (!trackRef.current) return;
                const cards = trackRef.current.querySelectorAll(".case-card");
                if (cards[i]) cards[i].scrollIntoView({ behavior: "smooth", inline: "center", block: "nearest" });
              }}
              className={`rounded-full transition-all duration-500 ${
                activeCard === i
                  ? "w-6 h-2 bg-orange-400"
                  : "w-2 h-2 bg-white/20 hover:bg-white/40"
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default CaseStudiesSection;
