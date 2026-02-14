import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { TextShimmer } from "@/components/ui/text-shimmer";

gsap.registerPlugin(ScrollTrigger);

interface Testimonial {
  quote: string;
  name: string;
  role: string;
  company: string;
  variant: "orange" | "dark";
}

const testimonials: Testimonial[] = [
  {
    quote:
      "Effect3 built us an AI HR avatar that conducts candidate interviews autonomously. Combined with their email outreach and AI voice agents, we now distribute our product to leads 24/7.",
    name: "Ahmed Al-Rashid",
    role: "CTO",
    company: "ConnectA",
    variant: "dark",
  },
  {
    quote:
      "Their team is highly professional, and their innovative AI solutions have truly transformed the way we recover churned leads.",
    name: "Jon Villanueva",
    role: "VP of Revenue",
    company: "Sintra.AI",
    variant: "orange",
  },
  {
    quote:
      "Effect3 has been a key partner in our growth journey. Their AI system identifies and converts leads we would have written off.",
    name: "David Okonkwo",
    role: "CEO",
    company: "NovaBridge",
    variant: "orange",
  },
  {
    quote:
      "We were converting wholesale brands at just 5% doing manual outreach. Effect3 deployed their AI email system and our conversion rate exploded to 59%. The ROI paid for itself in the first week.",
    name: "Marco Bellini",
    role: "Head of Growth",
    company: "Ecomera",
    variant: "dark",
  },
  {
    quote:
      "We are extremely satisfied with Effect3. Their expertise and dedication have exceeded our expectations in every way.",
    name: "Bruno Casanovas",
    role: "Co-Founder",
    company: "Nude Project",
    variant: "dark",
  },
  {
    quote:
      "Their AI agents replaced our entire manual follow-up process. We went from chasing leads for weeks to closing deals in days.",
    name: "Sarah Chen",
    role: "Managing Partner",
    company: "Apex Consulting",
    variant: "dark",
  },
  {
    quote:
      "We have seen incredible results with Effect3. Their expertise and dedication to our success is unmatched.",
    name: "Elena Petrova",
    role: "CMO",
    company: "Meridian Labs",
    variant: "orange",
  },
  {
    quote:
      "Their customer support is absolutely exceptional. They are always available, incredibly helpful, and deeply knowledgeable.",
    name: "Liam Torres",
    role: "Director of Ops",
    company: "ScaleForge",
    variant: "dark",
  },
  {
    quote:
      "Effect3 has been a true game-changer for us. Their exceptional service, combined with their deep expertise and commitment to excellence, has made a significant impact on our business.",
    name: "Paul Brauch",
    role: "CTO",
    company: "Spectrum",
    variant: "dark",
  },
];

// Grid positions mirroring the reference layout (3 columns, staggered rows)
// Each item: [gridColumn, gridRow, colSpan, rowSpan]
const gridPositions = [
  { col: "1 / 2", row: "1 / 3", area: "a" },       // tall left card
  { col: "2 / 3", row: "1 / 2", area: "b" },       // mid-top
  { col: "3 / 4", row: "1 / 2", area: "c" },       // right-top
  { col: "1 / 2", row: "3 / 4", area: "d" },       // left-mid  
  { col: "2 / 3", row: "2 / 4", area: "e" },       // mid-tall
  { col: "3 / 4", row: "2 / 4", area: "f" },       // right-tall
  { col: "1 / 2", row: "4 / 5", area: "g" },       // left-bottom
  { col: "2 / 3", row: "4 / 5", area: "h" },       // mid-bottom
  { col: "3 / 4", row: "4 / 5", area: "i" },       // right-bottom
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
      gsap.set(cardRef.current, { autoAlpha: 0, y: 40, filter: "blur(8px)" });
      gsap.to(cardRef.current, {
        autoAlpha: 1,
        y: 0,
        filter: "blur(0px)",
        duration: 0.6,
        delay: index * 0.12,
        ease: "power3.out",
        scrollTrigger: {
          trigger: cardRef.current,
          start: "top 92%",
          once: true,
        },
      });
    },
    { scope: cardRef }
  );

  const isOrange = testimonial.variant === "orange";

  return (
    <div
      ref={cardRef}
      className={`rounded-2xl p-5 sm:p-6 flex flex-col justify-between gap-4 transition-all duration-500 ${
        isOrange
          ? "bg-orange-500 text-white hover:bg-orange-400"
          : "bg-white/[0.06] border border-white/10 text-white/80 hover:bg-white/[0.1]"
      }`}
    >
      <p
        className={`text-sm sm:text-[15px] font-light leading-relaxed ${
          isOrange ? "text-white/95" : "text-white/70"
        }`}
      >
        "{testimonial.quote}"
      </p>

      <div className="flex items-center justify-between mt-auto pt-2">
        <div>
          <p
            className={`text-sm font-medium ${
              isOrange ? "text-white" : "text-white/90"
            }`}
          >
            {testimonial.name}
          </p>
          <p
            className={`text-xs ${
              isOrange ? "text-white/70" : "text-white/40"
            }`}
          >
            {testimonial.role} of {testimonial.company}
          </p>
        </div>
        <div
          className={`w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 ${
            isOrange
              ? "bg-white/20 border border-white/30"
              : "bg-orange-500/15 border border-orange-500/25"
          }`}
        >
          <span
            className={`text-sm font-light ${
              isOrange ? "text-white" : "text-orange-300"
            }`}
          >
            {testimonial.name.charAt(0)}
          </span>
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

  return (
    <section
      ref={sectionRef}
      className="w-full py-12 md:py-16 bg-black border-t border-white/5"
    >
      <div className="mx-auto max-w-7xl px-6 md:px-10 lg:px-16">
        {/* Heading */}
        <div ref={headingRef} className="text-center mb-10 max-w-2xl mx-auto">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extralight tracking-tight leading-[1.1] mb-3">
            <span className="text-white/90">Trusted by startups and </span>
            <TextShimmer
              as="span"
              duration={2}
              spread={4}
              className="italic font-light [--base-color:theme(colors.orange.300)] [--base-gradient-color:theme(colors.orange.100)] dark:[--base-color:theme(colors.orange.300)] dark:[--base-gradient-color:theme(colors.orange.100)]"
            >
              industry leaders.
            </TextShimmer>
          </h2>
          <p className="text-sm sm:text-base font-light text-white/40">
            See how Effect3 clients feel about our AI systems
          </p>
        </div>

        {/* Desktop bento grid */}
        <div
          className="hidden md:grid gap-3"
          style={{
            gridTemplateColumns: "1fr 1fr 1fr",
            gridTemplateRows: "auto auto auto auto",
          }}
        >
          {testimonials.map((testimonial, i) => (
            <div
              key={i}
              style={{
                gridColumn: gridPositions[i].col,
                gridRow: gridPositions[i].row,
              }}
            >
              <TestimonialCard testimonial={testimonial} index={i} />
            </div>
          ))}
        </div>

        {/* Mobile stacked */}
        <div className="flex flex-col gap-3 md:hidden">
          {testimonials.map((testimonial, i) => (
            <TestimonialCard key={i} testimonial={testimonial} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default TestimonialSection;
