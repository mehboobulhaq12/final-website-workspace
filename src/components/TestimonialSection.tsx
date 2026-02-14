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
  variant: "orange" | "dark";
  hasGrid?: boolean;
}

const GridPattern = ({ className = "" }: { className?: string }) => (
  <div className={`w-full overflow-hidden rounded-t-xl ${className}`}>
    <svg width="100%" height="100%" viewBox="0 0 200 80" className="opacity-20">
      {Array.from({ length: 11 }).map((_, i) => (
        <line key={`v-${i}`} x1={i * 20} y1="0" x2={i * 20} y2="80" stroke="currentColor" strokeWidth="0.5" />
      ))}
      {Array.from({ length: 5 }).map((_, i) => (
        <line key={`h-${i}`} x1="0" y1={i * 20} x2="200" y2={i * 20} stroke="currentColor" strokeWidth="0.5" />
      ))}
    </svg>
  </div>
);

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
        delay: index * 0.1,
        ease: "power3.out",
        scrollTrigger: { trigger: cardRef.current, start: "top 92%", once: true },
      });
    },
    { scope: cardRef }
  );

  const isOrange = testimonial.variant === "orange";

  return (
    <div
      ref={cardRef}
      className={`rounded-2xl overflow-hidden flex flex-col h-full transition-all duration-500 ${
        isOrange
          ? "bg-orange-500 hover:bg-orange-400"
          : "bg-white/[0.05] border border-white/[0.08] hover:bg-white/[0.08]"
      }`}
    >
      {testimonial.hasGrid && (
        <div className={`h-20 ${isOrange ? "text-white" : "text-white/40"}`}>
          <GridPattern />
        </div>
      )}

      <div className="p-5 sm:p-6 flex flex-col justify-between flex-1 gap-4">
        <p
          className={`text-sm sm:text-[15px] font-light leading-relaxed ${
            isOrange ? "text-white/95" : "text-white/60"
          }`}
        >
          "{testimonial.quote}"
        </p>

        <div className="flex items-center justify-between mt-auto">
          <div>
            <p className={`text-sm font-semibold ${isOrange ? "text-white" : "text-white/90"}`}>
              {testimonial.name}
            </p>
            <p className={`text-xs ${isOrange ? "text-white/70" : "text-white/40"}`}>
              {testimonial.role}
            </p>
          </div>
          <div
            className={`w-11 h-11 rounded-full flex items-center justify-center flex-shrink-0 ${
              isOrange
                ? "bg-white/20 border border-white/30"
                : "bg-orange-500/10 border border-orange-500/20"
            }`}
          >
            <span className={`text-sm font-medium ${isOrange ? "text-white" : "text-orange-300"}`}>
              {testimonial.name.charAt(0)}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

// Exact layout from the reference image
// Row 1-2 left: tall card with grid + testimonial
// Row 1 mid: orange card
// Row 1 right: orange card
// Row 2 mid: dark tall card
// Row 2-3 right: grid + dark card
// Row 3 left: orange card
// Row 3 mid: dark card
// Row 3 right: continues

const cards: Testimonial[] = [
  {
    quote:
      "Effect3 built us an AI HR avatar that conducts candidate interviews autonomously. Their service is top-notch and their team is incredibly responsive.",
    name: "Ahmed Al-Rashid",
    role: "CTO of ConnectA",
    variant: "dark",
    hasGrid: true,
  },
  {
    quote:
      "Their team is highly professional, and their innovative AI solutions have truly transformed the way we operate.",
    name: "Jon Villanueva",
    role: "VP of Revenue at Sintra.AI",
    variant: "orange",
  },
  {
    quote:
      "Effect3 has been a key partner in our growth journey. Their AI system identifies and converts leads automatically.",
    name: "David Okonkwo",
    role: "CEO of NovaBridge",
    variant: "orange",
  },
  {
    quote:
      "We are extremely satisfied with Effect3. Their expertise and dedication have exceeded our expectations.",
    name: "Bruno Casanovas",
    role: "Co-Founder of Nude Project",
    variant: "dark",
  },
  {
    quote:
      "We were converting brands at just 5% manually. Effect3 deployed their AI email system and our conversion rate exploded to 59%.",
    name: "Marco Bellini",
    role: "Head of Growth at Ecomera",
    variant: "dark",
    hasGrid: true,
  },
  {
    quote:
      "We have seen incredible results with Effect3. Their expertise and dedication to our success is unmatched.",
    name: "Elena Petrova",
    role: "CMO of Meridian Labs",
    variant: "orange",
  },
  {
    quote:
      "Their customer support is absolutely exceptional. They are always available, incredibly helpful, and deeply knowledgeable.",
    name: "Liam Torres",
    role: "Director of Ops at ScaleForge",
    variant: "dark",
  },
  {
    quote:
      "Effect3 has been a true game-changer for us. Their exceptional service, combined with their deep expertise and commitment to excellence, has made a significant impact on our business.",
    name: "Paul Brauch",
    role: "CTO of Spectrum",
    variant: "dark",
    hasGrid: true,
  },
];

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
        scrollTrigger: { trigger: sectionRef.current, start: "top 75%", once: true },
      });
    },
    { scope: sectionRef }
  );

  return (
    <section ref={sectionRef} className="w-full py-12 md:py-16 bg-black border-t border-white/5">
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

        {/* Desktop bento grid - exact reference layout */}
        <div className="hidden md:grid grid-cols-3 gap-3" style={{ gridTemplateRows: "auto auto auto" }}>
          {/* Row 1 */}
          <div className="row-span-2">
            <TestimonialCard testimonial={cards[0]} index={0} />
          </div>
          <div>
            <TestimonialCard testimonial={cards[1]} index={1} />
          </div>
          <div>
            <TestimonialCard testimonial={cards[2]} index={2} />
          </div>

          {/* Row 2 */}
          <div className="row-span-2">
            <TestimonialCard testimonial={cards[3]} index={3} />
          </div>
          <div className="row-span-2">
            <TestimonialCard testimonial={cards[4]} index={4} />
          </div>

          {/* Row 3 */}
          <div>
            <TestimonialCard testimonial={cards[5]} index={5} />
          </div>
          <div>
            <TestimonialCard testimonial={cards[6]} index={6} />
          </div>
          <div>
            <TestimonialCard testimonial={cards[7]} index={7} />
          </div>
        </div>

        {/* Mobile stacked */}
        <div className="flex flex-col gap-3 md:hidden">
          {cards.map((card, i) => (
            <TestimonialCard key={i} testimonial={card} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default TestimonialSection;
