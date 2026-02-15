import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { TextShimmer } from "@/components/ui/text-shimmer";
import aliRazaImg from "@/assets/clients/ali-raza.png";
import hassanAbbasImg from "@/assets/clients/hassan-abbas.png";
import awaisNematImg from "@/assets/clients/awais-nemat.png";
import brunoCasanovasImg from "@/assets/clients/bruno-casanovas.png";
import davidOkonkwoImg from "@/assets/clients/david-okonkwo.png";

gsap.registerPlugin(ScrollTrigger);

interface Testimonial {
  quote: string;
  name: string;
  role: string;
  image: string;
  variant: "orange" | "dark";
}

const GridPattern = () => (
  <svg width="100%" height="100%" viewBox="0 0 240 100" preserveAspectRatio="none" className="opacity-15 text-white">
    {Array.from({ length: 13 }).map((_, i) => (
      <line key={`v-${i}`} x1={i * 20} y1="0" x2={i * 20} y2="100" stroke="currentColor" strokeWidth="0.5" />
    ))}
    {Array.from({ length: 6 }).map((_, i) => (
      <line key={`h-${i}`} x1="0" y1={i * 20} x2="240" y2={i * 20} stroke="currentColor" strokeWidth="0.5" />
    ))}
  </svg>
);

const AnimatedCard = ({
  children,
  index,
  className = "",
  style,
}: {
  children: React.ReactNode;
  index: number;
  className?: string;
  style?: React.CSSProperties;
}) => {
  const ref = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      if (!ref.current) return;
      gsap.set(ref.current, { autoAlpha: 0, y: 40, filter: "blur(8px)" });
      gsap.to(ref.current, {
        autoAlpha: 1,
        y: 0,
        filter: "blur(0px)",
        duration: 0.6,
        delay: index * 0.12,
        ease: "power3.out",
        scrollTrigger: { trigger: ref.current, start: "top 92%", once: true },
      });
    },
    { scope: ref }
  );

  return (
    <div ref={ref} className={className} style={style}>
      {children}
    </div>
  );
};

const cards: Testimonial[] = [
  {
    quote:
      "Effect3 built us an AI HR avatar that conducts candidate interviews autonomously. Their service is top-notch and their team is incredibly responsive.",
    name: "Ali Raza",
    role: "CTO of ConnectA",
    image: aliRazaImg,
    variant: "dark",
  },
  {
    quote:
      "Effect3's AI system transformed how we handle customer inquiries for our signage business. Automated follow-ups on custom sign quotes increased our close rate by 45%. Outstanding results.",
    name: "Hassan Abbas",
    role: "CEO of Precision Media & Sign",
    image: hassanAbbasImg,
    variant: "orange",
  },
  {
    quote:
      "We were converting brands at just 5% manually. Effect3 deployed their AI email system and our conversion rate exploded to 59%. The ROI was immediate.",
    name: "Awais Nemat",
    role: "Head of Growth at Ecufussion",
    image: awaisNematImg,
    variant: "dark",
  },
  {
    quote:
      "We have seen incredible results with Effect3. Their expertise and dedication to reviving our inactive customers is unmatched.",
    name: "Bruno Casanovas",
    role: "Co-CEO of Nude Project",
    image: brunoCasanovasImg,
    variant: "orange",
  },
  {
    quote:
      "Effect3 deployed their AI outreach system for Sintra AI and recovered 38% of our dead leads, turning them into retainer customers. For a SaaS tool like ours, that kind of reactivation is a game-changer.",
    name: "Chris Sidlauskas",
    role: "Co-Founder of Sintra.AI",
    image: davidOkonkwoImg,
    variant: "dark",
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
        <div ref={headingRef} className="flex flex-col gap-4 mb-10 max-w-3xl">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1.5 backdrop-blur-sm">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500" />
              </span>
              <span className="text-xs font-light tracking-tight text-white/80">Client Results</span>
            </div>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extralight tracking-tight leading-[1.1]">
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

        {/* Desktop grid - exact reference layout */}
        <div
          className="hidden md:grid gap-3"
          style={{
            gridTemplateColumns: "1fr 1fr 1fr",
            gridTemplateRows: "180px 180px 180px",
          }}
        >
          {/* Card 1 - Left column, rows 1-2, grid pattern top */}
          <AnimatedCard
            index={0}
            className="rounded-2xl overflow-hidden bg-white/[0.05] border border-white/[0.08] flex flex-col hover:bg-white/[0.08] transition-all duration-500"
            style={{ gridColumn: "1", gridRow: "1 / 3" }}
          >
            <div className="h-[45%] relative">
              <GridPattern />
            </div>
            <div className="flex-1 p-5 flex flex-col justify-between">
              <p className="text-sm font-light leading-relaxed text-white/60">
                "{cards[0].quote}"
              </p>
              <div className="flex items-center justify-between mt-3">
                <div>
                  <p className="text-sm font-semibold text-white/90">{cards[0].name}</p>
                  <p className="text-xs text-white/40">{cards[0].role}</p>
                </div>
                <img src={cards[0].image} alt={cards[0].name} className="w-11 h-11 rounded-full object-cover border border-orange-500/20 flex-shrink-0" />
              </div>
            </div>
          </AnimatedCard>

          {/* Card 2 - Middle column, row 1, orange */}
          <AnimatedCard
            index={1}
            className="rounded-2xl overflow-hidden bg-orange-500 hover:bg-orange-400 transition-all duration-500 p-5 flex flex-col justify-between"
            style={{ gridColumn: "2", gridRow: "1" }}
          >
            <p className="text-sm font-light leading-relaxed text-white/95">
              "{cards[1].quote}"
            </p>
            <div className="flex items-center justify-between mt-3">
              <div>
                <p className="text-sm font-semibold text-white">{cards[1].name}</p>
                <p className="text-xs text-white/70">{cards[1].role}</p>
              </div>
                <img src={cards[1].image} alt={cards[1].name} className="w-11 h-11 rounded-full object-cover border border-white/30 flex-shrink-0" />
            </div>
          </AnimatedCard>

          {/* Card 3 - Right column, rows 1-2, grid pattern bottom */}
          <AnimatedCard
            index={2}
            className="rounded-2xl overflow-hidden bg-white/[0.05] border border-white/[0.08] flex flex-col hover:bg-white/[0.08] transition-all duration-500"
            style={{ gridColumn: "3", gridRow: "1 / 3" }}
          >
            <div className="flex-1 p-5 flex flex-col justify-between">
              <p className="text-sm font-light leading-relaxed text-white/60">
                "{cards[2].quote}"
              </p>
              <div className="flex items-center justify-between mt-3">
                <div>
                  <p className="text-sm font-semibold text-white/90">{cards[2].name}</p>
                  <p className="text-xs text-white/40">{cards[2].role}</p>
                </div>
                <img src={cards[2].image} alt={cards[2].name} className="w-11 h-11 rounded-full object-cover border border-orange-500/20 flex-shrink-0" />
              </div>
            </div>
            <div className="h-[45%] relative">
              <GridPattern />
            </div>
          </AnimatedCard>

          {/* Card 4 - Left column, row 3, orange */}
          <AnimatedCard
            index={3}
            className="rounded-2xl overflow-hidden bg-orange-500 hover:bg-orange-400 transition-all duration-500 p-5 flex flex-col justify-between"
            style={{ gridColumn: "1", gridRow: "3" }}
          >
            <p className="text-sm font-light leading-relaxed text-white/95">
              "{cards[3].quote}"
            </p>
            <div className="flex items-center justify-between mt-3">
              <div>
                <p className="text-sm font-semibold text-white">{cards[3].name}</p>
                <p className="text-xs text-white/70">{cards[3].role}</p>
              </div>
                <img src={cards[3].image} alt={cards[3].name} className="w-11 h-11 rounded-full object-cover border border-white/30 flex-shrink-0" />
            </div>
          </AnimatedCard>

          {/* Card 5 - Middle column, rows 2-3, dark */}
          <AnimatedCard
            index={4}
            className="rounded-2xl overflow-hidden bg-white/[0.05] border border-white/[0.08] hover:bg-white/[0.08] transition-all duration-500 p-5 flex flex-col justify-between"
            style={{ gridColumn: "2", gridRow: "2 / 4" }}
          >
            <p className="text-sm font-light leading-relaxed text-white/60">
              "{cards[4].quote}"
            </p>
            <div className="flex items-center justify-between mt-3">
              <div>
                <p className="text-sm font-semibold text-white/90">{cards[4].name}</p>
                <p className="text-xs text-white/40">{cards[4].role}</p>
              </div>
                <img src={cards[4].image} alt={cards[4].name} className="w-11 h-11 rounded-full object-cover border border-orange-500/20 flex-shrink-0" />
            </div>
          </AnimatedCard>
        </div>

        {/* Mobile stacked */}
        <div className="flex flex-col gap-3 md:hidden">
          {cards.map((card, i) => (
            <AnimatedCard
              key={i}
              index={i}
              className={`rounded-2xl overflow-hidden p-5 flex flex-col justify-between gap-4 transition-all duration-500 ${
                card.variant === "orange"
                  ? "bg-orange-500 hover:bg-orange-400"
                  : "bg-white/[0.05] border border-white/[0.08] hover:bg-white/[0.08]"
              }`}
            >
              <p
                className={`text-sm font-light leading-relaxed ${
                  card.variant === "orange" ? "text-white/95" : "text-white/60"
                }`}
              >
                "{card.quote}"
              </p>
              <div className="flex items-center justify-between">
                <div>
                  <p
                    className={`text-sm font-semibold ${
                      card.variant === "orange" ? "text-white" : "text-white/90"
                    }`}
                  >
                    {card.name}
                  </p>
                  <p
                    className={`text-xs ${
                      card.variant === "orange" ? "text-white/70" : "text-white/40"
                    }`}
                  >
                    {card.role}
                  </p>
                </div>
                <img
                  src={card.image}
                  alt={card.name}
                  className={`w-11 h-11 rounded-full object-cover flex-shrink-0 border ${
                    card.variant === "orange"
                      ? "border-white/30"
                      : "border-orange-500/20"
                  }`}
                />
              </div>
            </AnimatedCard>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TestimonialSection;
