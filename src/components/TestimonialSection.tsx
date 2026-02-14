import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { TextShimmer } from "@/components/ui/text-shimmer";
import { Quote, Star } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

interface Testimonial {
  quote: string;
  name: string;
  role: string;
  company: string;
  highlight?: string;
}

const testimonials: Testimonial[][] = [
  [
    {
      quote:
        "Effect3 built us an AI HR avatar that conducts candidate interviews autonomously. Combined with their email outreach system and AI voice agents, we distribute our product to target leads 24/7 without lifting a finger.",
      name: "Ahmed Al-Rashid",
      role: "CTO",
      company: "ConnectA",
      highlight: "Saudi Tech Firm",
    },
    {
      quote:
        "We were converting wholesale brands at just 5% doing manual outreach. Effect3 deployed their AI email system and our conversion rate exploded to 59%. The ROI paid for itself in the first week.",
      name: "Marco Bellini",
      role: "Head of Growth",
      company: "Ecomera",
      highlight: "5% → 59% conversion",
    },
  ],
  [
    {
      quote:
        "We had thousands of trial users who never converted. Effect3 built a portal with AI agents that re-engaged every single churned lead. The results were immediate and measurable.",
      name: "Jon Villanueva",
      role: "VP of Revenue",
      company: "Sintra.AI",
      highlight: "Churn Recovery",
    },
    {
      quote:
        "Effect3 helped us re-engage ghosted customers by analyzing sentiment, purchase behavior, and running personalized campaigns. Exclusive discounts, founder-perspective messaging, emotional hooks. Our inactive base came back to life.",
      name: "Bruno Casanovas",
      role: "Co-Founder",
      company: "Nude Project",
      highlight: "D2C Clothing Brand",
    },
    {
      quote:
        "Their AI agents replaced our entire manual follow-up process. We went from chasing leads for weeks to closing deals in days. The system just works around the clock.",
      name: "Sarah Chen",
      role: "Managing Partner",
      company: "Apex Consulting",
      highlight: "Management Consulting",
    },
  ],
  [
    {
      quote:
        "Effect3 transformed our client acquisition pipeline. Their AI system identifies, nurtures, and converts leads that our team would have written off completely.",
      name: "David Okonkwo",
      role: "CEO",
      company: "NovaBridge",
      highlight: "SaaS Platform",
    },
    {
      quote:
        "The level of personalization their AI agents deliver is remarkable. Every lead gets a tailored experience, and the conversion numbers speak for themselves. We scaled 3x without adding headcount.",
      name: "Elena Petrova",
      role: "CMO",
      company: "Meridian Labs",
      highlight: "3x scale, 0 hires",
    },
  ],
];

const TestimonialCard = ({
  testimonial,
  index,
}: {
  testimonial: Testimonial;
  index: number;
}) => {
  const cardRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      if (!cardRef.current) return;
      gsap.set(cardRef.current, { autoAlpha: 0, y: 30, filter: "blur(8px)" });
      gsap.to(cardRef.current, {
        autoAlpha: 1,
        y: 0,
        filter: "blur(0px)",
        duration: 0.7,
        delay: index * 0.15,
        ease: "power3.out",
        scrollTrigger: {
          trigger: cardRef.current,
          start: "top 90%",
          once: true,
        },
      });
    },
    { scope: cardRef }
  );

  return (
    <div
      ref={cardRef}
      className="rounded-xl border border-white/10 bg-white/[0.02] p-5 sm:p-6 flex flex-col gap-4 hover:border-orange-500/20 hover:bg-white/[0.04] transition-all duration-500"
    >
      <div className="flex items-center justify-between">
        <Quote className="w-5 h-5 text-orange-500/40" />
        {testimonial.highlight && (
          <span className="text-[10px] font-light tracking-wide text-orange-400/60 bg-orange-500/10 px-2 py-0.5 rounded-full border border-orange-500/15">
            {testimonial.highlight}
          </span>
        )}
      </div>

      <p className="text-sm sm:text-base font-light text-white/70 leading-relaxed">
        "{testimonial.quote}"
      </p>

      <div className="flex items-center gap-1 mt-auto">
        {[...Array(5)].map((_, i) => (
          <Star
            key={i}
            className="w-3 h-3 fill-orange-500/80 text-orange-500/80"
          />
        ))}
      </div>

      <div className="flex items-center gap-3 pt-2 border-t border-white/5">
        <div className="w-8 h-8 rounded-full bg-gradient-to-br from-orange-500/30 to-orange-600/10 flex items-center justify-center border border-orange-500/20">
          <span className="text-xs font-light text-orange-300">
            {testimonial.name.charAt(0)}
          </span>
        </div>
        <div>
          <p className="text-xs font-light text-white/80">
            {testimonial.name}
          </p>
          <p className="text-[10px] text-white/40">
            {testimonial.role}, {testimonial.company}
          </p>
        </div>
      </div>
    </div>
  );
};

const TestimonialSection = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      if (!headingRef.current) return;
      gsap.set(headingRef.current, { autoAlpha: 0, y: 30 });
      gsap.to(headingRef.current, {
        autoAlpha: 1,
        y: 0,
        duration: 0.8,
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

  let globalIndex = 0;

  return (
    <section
      ref={sectionRef}
      className="w-full py-12 md:py-16 bg-black border-t border-white/5"
    >
      <div className="mx-auto max-w-7xl px-6 md:px-10 lg:px-16">
        <div ref={headingRef} className="flex flex-col gap-4 mb-10 max-w-3xl">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1.5 backdrop-blur-sm">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500" />
              </span>
              <span className="text-xs font-light tracking-tight text-white/80">
                Client Results
              </span>
            </div>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extralight tracking-tight leading-[1.1]">
            <span className="text-white/90">Trusted by companies turning </span>
            <TextShimmer
              as="span"
              duration={2}
              spread={4}
              className="italic font-light [--base-color:theme(colors.orange.300)] [--base-gradient-color:theme(colors.orange.100)] dark:[--base-color:theme(colors.orange.300)] dark:[--base-gradient-color:theme(colors.orange.100)]"
            >
              leads into revenue.
            </TextShimmer>
          </h2>
          <p className="text-base sm:text-lg font-light leading-relaxed text-white/40">
            Real results from real businesses. See how our AI systems are
            transforming lead recovery and customer re-engagement across
            industries.
          </p>
        </div>

        <div className="flex flex-col gap-3">
          {testimonials.map((row, rowIndex) => (
            <div
              key={rowIndex}
              className={`grid gap-3 ${
                row.length === 3
                  ? "grid-cols-1 md:grid-cols-3"
                  : "grid-cols-1 md:grid-cols-2"
              }`}
            >
              {row.map((testimonial, colIndex) => {
                const card = (
                  <TestimonialCard
                    key={`${rowIndex}-${colIndex}`}
                    testimonial={testimonial}
                    index={globalIndex}
                  />
                );
                globalIndex++;
                return card;
              })}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TestimonialSection;
