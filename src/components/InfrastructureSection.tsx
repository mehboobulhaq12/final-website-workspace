import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { TextShimmer } from "@/components/ui/text-shimmer";
import { Card, CardContent } from "@/components/ui/card";
import {
  ClipboardCheck,
  ShieldCheck,
  BarChart3,
  Rocket,
  TrendingUp,
} from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

const steps = [
  {
    number: "01",
    title: "Audit Your Business",
    description:
      "We begin with a deep audit of your sales funnel, customer lifecycle, churn patterns, and historical lead data. Our AI maps behavioural signals, identifies revenue leaks, and pinpoints where and why leads went inactive.",
    Icon: ClipboardCheck,
  },
  {
    number: "02",
    title: "Secure Data Integration",
    description:
      "You securely connect your CRM or lead database with our system. We integrate your data into your custom AI agents, ensuring privacy, encryption, and full control while enabling intelligent automation.",
    Icon: ShieldCheck,
  },
  {
    number: "03",
    title: "Lead Analysis & Segmentation",
    description:
      "Our agents analyze each lead's behaviour, sentiment, feedback, and purchase history. They automatically segment leads into strategic groups based on buying intent, inactivity triggers, psychology, and engagement patterns.",
    Icon: BarChart3,
  },
  {
    number: "04",
    title: "Strategy Creation & Campaign Execution",
    description:
      "AI agents design personalized re-engagement strategies, including exclusive offers, free trials, discounts, premium upgrades, or loyalty incentives. After your approval, agents deploy campaigns across email, voice, and WhatsApp to revive conversations at scale.",
    Icon: Rocket,
  },
  {
    number: "05",
    title: "Measurable Revenue Recovery",
    description:
      "Track revived leads, reactivated customers, and real conversion impact through clear performance reporting.",
    Icon: TrendingUp,
  },
];

const InfrastructureSection = () => {
  const sectionRef = useRef<HTMLElement | null>(null);
  const headingRef = useRef<HTMLDivElement | null>(null);
  const cardsRef = useRef<HTMLDivElement | null>(null);

  useGSAP(
    () => {
      if (!sectionRef.current) return;

      gsap.set(headingRef.current, { autoAlpha: 0, y: 30 });
      gsap.to(headingRef.current, {
        autoAlpha: 1,
        y: 0,
        duration: 0.8,
        ease: "power3.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 80%",
          once: true,
        },
      });

      if (cardsRef.current) {
        const cards = cardsRef.current.querySelectorAll(".step-card");
        gsap.set(cards, { autoAlpha: 0, y: 40 });
        gsap.to(cards, {
          autoAlpha: 1,
          y: 0,
          duration: 0.7,
          stagger: 0.12,
          ease: "power3.out",
          scrollTrigger: {
            trigger: cardsRef.current,
            start: "top 80%",
            once: true,
          },
        });
      }
    },
    { scope: sectionRef }
  );

  return (
    <section
      ref={sectionRef}
      className="w-full py-24 md:py-32 bg-black border-t border-white/5"
    >
      <div className="mx-auto max-w-7xl px-6 md:px-10 lg:px-16">
        {/* Badge & Heading */}
        <div ref={headingRef} className="flex flex-col items-center text-center gap-6 mb-16">
          <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1.5 backdrop-blur-sm">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
            </span>
            <span className="text-xs font-light tracking-tight text-white/80">
              The Infrastructure
            </span>
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

        {/* Cards Grid */}
        <div ref={cardsRef} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {steps.map((step) => (
            <Card
              key={step.number}
              className="step-card border-white/10 bg-white/[0.02] backdrop-blur-sm hover:bg-white/[0.05] transition-colors duration-300 group"
            >
              <CardContent className="p-6 flex flex-col gap-4">
                {/* Step number + icon */}
                <div className="flex items-center justify-between">
                  <span className="text-xs font-mono tracking-[0.2em] text-orange-400/80 uppercase">
                    Step {step.number}
                  </span>
                  <div className="w-10 h-10 rounded-lg flex items-center justify-center border border-orange-400/30 bg-gradient-to-br from-orange-500/20 to-orange-400/10 group-hover:from-orange-500/30 group-hover:to-orange-400/20 transition-colors duration-300">
                    <step.Icon className="w-5 h-5 text-orange-400/80" />
                  </div>
                </div>

                {/* Title */}
                <h3 className="text-lg sm:text-xl font-light tracking-tight text-white/90">
                  {step.title}
                </h3>

                {/* Description */}
                <p className="text-sm font-light leading-relaxed tracking-tight text-white/50">
                  {step.description}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default InfrastructureSection;
