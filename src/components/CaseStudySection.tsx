import { useRef, useEffect, useState } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import CountUp from "react-countup";
import { TextShimmer } from "@/components/ui/text-shimmer";
import connectaImg from "@/assets/case-studies/connecta-dashboard.jpg";
import ecomeraImg from "@/assets/case-studies/ecomera-dashboard.jpg";
import sintraImg from "@/assets/case-studies/sintra-dashboard.jpg";

gsap.registerPlugin(ScrollTrigger);

function usePrefersReducedMotion() {
  const [reduced, setReduced] = useState(false);
  useEffect(() => {
    if (typeof window === "undefined" || !("matchMedia" in window)) return;
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReduced(mq.matches);
    const onChange = (e: MediaQueryListEvent) => setReduced(e.matches);
    mq.addEventListener?.("change", onChange);
    return () => mq.removeEventListener?.("change", onChange);
  }, []);
  return reduced;
}

function parseMetricValue(raw: string) {
  const value = (raw ?? "").toString().trim();
  const m = value.match(/^([^\d\-+]*?)\s*([\-+]?\d{1,3}(?:,\d{3})*(?:\.\d+)?)\s*([^\d\s]*)$/);
  if (!m) return { prefix: "", end: 0, suffix: value, decimals: 0 };
  const [, prefix, num, suffix] = m;
  const normalized = num.replace(/,/g, "");
  const end = parseFloat(normalized);
  const decimals = normalized.split(".")[1]?.length ?? 0;
  return { prefix: prefix ?? "", end: isNaN(end) ? 0 : end, suffix: suffix ?? "", decimals };
}

function MetricStat({ value, label, sub }: { value: string; label: string; sub?: string }) {
  const reduceMotion = usePrefersReducedMotion();
  const { prefix, end, suffix, decimals } = parseMetricValue(value);
  const ref = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    if (!ref.current) return;
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setInView(true); },
      { threshold: 0.5 }
    );
    observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={ref} className="flex flex-col gap-1">
      <span className="text-3xl md:text-4xl font-extralight tracking-tight text-white/90">
        {prefix}
        {reduceMotion || !inView ? (
          <span>{end.toLocaleString(undefined, { minimumFractionDigits: decimals, maximumFractionDigits: decimals })}</span>
        ) : (
          <CountUp end={end} decimals={decimals} duration={1.6} separator="," />
        )}
        {suffix}
      </span>
      <span className="text-sm font-semibold text-white/80">{label}</span>
      {sub && <span className="text-xs text-white/40">{sub}</span>}
    </div>
  );
}

interface CaseStudy {
  id: number;
  title: string;
  quote: string;
  name: string;
  role: string;
  image: string;
  metrics: { value: string; label: string; sub?: string }[];
}

const caseStudies: CaseStudy[] = [
  {
    id: 1,
    title: "AI HR Avatar + Lead Distribution",
    quote:
      "Effect3 built us an AI HR avatar that conducts candidate interviews autonomously, plus a full email web system and AI voice agent to distribute our product to target leads. The real-time AI avatar changed our hiring process completely.",
    name: "Ahmed Al-Rashid",
    role: "CTO of ConnectA",
    image: connectaImg,
    metrics: [
      { value: "3x", label: "Faster Hiring", sub: "Interview-to-offer cycle" },
      { value: "85%", label: "Lead Reach Rate", sub: "Across target segments" },
    ],
  },
  {
    id: 2,
    title: "AI Email Outreach System",
    quote:
      "We were converting wholesale brands at just 5% manually. Effect3 deployed their AI email system and our conversion rate exploded to 59%. The ROI was immediate and undeniable.",
    name: "Marco Bellini",
    role: "Head of Growth at Ecomera",
    image: ecomeraImg,
    metrics: [
      { value: "59%", label: "Conversion Rate", sub: "Up from 5% manual" },
      { value: "11.8x", label: "ROI Increase", sub: "In first 90 days" },
    ],
  },
  {
    id: 3,
    title: "Churn Recovery Portal",
    quote:
      "Effect3 built us an AI system with a full portal to re-engage every churned trial lead that never signed up. We recovered revenue we thought was gone forever.",
    name: "Jon Villanueva",
    role: "VP of Revenue at Sintra.AI",
    image: sintraImg,
    metrics: [
      { value: "42%", label: "Leads Recovered", sub: "From churned trials" },
      { value: "2.5x", label: "Signup Lift", sub: "Post-trial conversion" },
    ],
  },
];

const CaseStudySection = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    if (!headingRef.current) return;
    gsap.set(headingRef.current, { autoAlpha: 0, y: 30 });
    gsap.to(headingRef.current, {
      autoAlpha: 1, y: 0, duration: 0.8, ease: "power3.out",
      scrollTrigger: { trigger: sectionRef.current, start: "top 75%", once: true },
    });
  }, { scope: sectionRef });

  return (
    <section ref={sectionRef} className="w-full py-16 md:py-24 bg-black border-t border-white/5">
      <div className="mx-auto max-w-7xl px-6 md:px-10 lg:px-16">
        {/* Heading */}
        <div ref={headingRef} className="flex flex-col gap-4 mb-14 max-w-3xl">
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
            <span className="text-white/90">Real results with </span>
            <TextShimmer
              as="span"
              duration={2}
              spread={4}
              className="italic font-light [--base-color:theme(colors.orange.300)] [--base-gradient-color:theme(colors.orange.100)] dark:[--base-color:theme(colors.orange.300)] dark:[--base-gradient-color:theme(colors.orange.100)]"
            >
              Effect3 AI.
            </TextShimmer>
          </h2>
          <p className="text-sm sm:text-base font-light text-white/40">
            From hiring automation to revenue recovery — Effect3 powers businesses with custom AI systems.
          </p>
        </div>

        {/* Case Studies */}
        <div className="flex flex-col gap-0">
          {caseStudies.map((study, idx) => {
            const reversed = idx % 2 === 1;
            return <CaseStudyCard key={study.id} study={study} index={idx} reversed={reversed} />;
          })}
        </div>
      </div>
    </section>
  );
};

const CaseStudyCard = ({ study, index, reversed }: { study: CaseStudy; index: number; reversed: boolean }) => {
  const ref = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    if (!ref.current) return;
    gsap.set(ref.current, { autoAlpha: 0, y: 40, filter: "blur(8px)" });
    gsap.to(ref.current, {
      autoAlpha: 1, y: 0, filter: "blur(0px)", duration: 0.7,
      ease: "power3.out",
      scrollTrigger: { trigger: ref.current, start: "top 88%", once: true },
    });
  }, { scope: ref });

  return (
    <div ref={ref} className={`border-t border-white/[0.06] py-12 md:py-16 ${index === caseStudies.length - 1 ? "border-b" : ""}`}>
      <div className={`grid grid-cols-1 md:grid-cols-[280px_1fr_240px] gap-8 md:gap-10 items-start ${reversed ? "md:grid-cols-[240px_1fr_280px]" : ""}`}>
        {/* Image */}
        <div className={`${reversed ? "md:order-3" : "md:order-1"} order-1`}>
          <div className="rounded-xl overflow-hidden border border-white/[0.08] bg-white/[0.03]">
            <img src={study.image} alt={study.title} className="w-full h-auto object-cover" loading="lazy" />
          </div>
        </div>

        {/* Quote + Attribution */}
        <div className={`${reversed ? "md:order-2" : "md:order-2"} order-2 flex flex-col justify-between gap-6 min-h-[200px]`}>
          <div>
            <h3 className="text-base font-semibold text-white/90 mb-3">{study.title}</h3>
            <p className="text-sm font-light leading-relaxed text-white/50">{study.quote}</p>
          </div>
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-full bg-orange-500/10 border border-orange-500/20 flex items-center justify-center flex-shrink-0">
              <span className="text-xs font-medium text-orange-300">{study.name.charAt(0)}</span>
            </div>
            <div>
              <p className="text-sm font-semibold text-white/90">{study.name}</p>
              <p className="text-xs text-white/40">{study.role}</p>
            </div>
          </div>
        </div>

        {/* Metrics */}
        <div className={`${reversed ? "md:order-1" : "md:order-3"} order-3 flex flex-col gap-8`}>
          {study.metrics.map((metric, i) => (
            <MetricStat key={i} value={metric.value} label={metric.label} sub={metric.sub} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default CaseStudySection;
