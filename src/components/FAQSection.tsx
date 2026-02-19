import { useRef, useState } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { TextShimmer } from "@/components/ui/text-shimmer";
import { Plus, Minus } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

interface FAQItem {
  question: string;
  answer: string;
}

const faqs: FAQItem[] = [
  {
    question: "What exactly does Effect3 do?",
    answer:
      "We deploy custom AI agents that reactivate your dead leads, recover churned customers, and automate repetitive outreach — turning cold contacts into paying customers again. Our systems handle everything from personalized email sequences to intelligent follow-ups at scale.",
  },
  {
    question: "How long does it take to see results?",
    answer:
      "Most clients see measurable results within the first 30 days. Our AI agents start engaging your leads immediately after deployment, and conversion metrics typically improve within the first 2 to 4 weeks. Full ROI realization usually happens within 60 days.",
  },
  {
    question: "Do I need any technical knowledge to get started?",
    answer:
      "Not at all. We handle the entire setup, integration, and deployment process. You just give us access to your CRM or lead data, and we take care of everything — from building custom AI workflows to monitoring performance and optimizing results.",
  },
  {
    question: "How does pricing work?",
    answer:
      "We offer performance-based and retainer models depending on your business size and goals. Every engagement starts with a strategy call where we assess your pipeline and recommend the best approach. There are no long-term lock-in contracts.",
  },
  {
    question: "Will the AI outreach feel robotic to my customers?",
    answer:
      "No. Our AI agents are trained to write with empathy, context-awareness, and personalization. Every message is tailored to the recipient's history, behavior, and preferences — making it indistinguishable from a human-written message.",
  },
  {
    question: "What integrations do you support?",
    answer:
      "We integrate with all major CRMs (HubSpot, Salesforce, Zoho), email platforms, Slack, WhatsApp, and custom APIs. If you use a tool, chances are we can plug right into it without disrupting your existing workflow.",
  },
];

const FAQItem = ({
  item,
  index,
  isOpen,
  onToggle,
}: {
  item: FAQItem;
  index: number;
  isOpen: boolean;
  onToggle: () => void;
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      if (!ref.current) return;
      gsap.set(ref.current, { autoAlpha: 0, y: 30 });
      gsap.to(ref.current, {
        autoAlpha: 1,
        y: 0,
        duration: 0.6,
        delay: index * 0.08,
        ease: "power3.out",
        scrollTrigger: { trigger: ref.current, start: "top 92%", once: true },
      });
    },
    { scope: ref }
  );

  return (
    <div
      ref={ref}
      className={`border-b border-white/[0.06] transition-colors duration-300 ${
        isOpen ? "bg-white/[0.02]" : ""
      }`}
    >
      <button
        onClick={onToggle}
        className="w-full flex items-center justify-between py-5 px-1 text-left group"
      >
        <span className="text-sm sm:text-base font-light text-white/80 group-hover:text-white/95 transition-colors duration-300 pr-4">
          {item.question}
        </span>
        <span className="flex-shrink-0 w-7 h-7 rounded-full border border-white/10 bg-white/5 flex items-center justify-center transition-all duration-300 group-hover:border-orange-500/30 group-hover:bg-orange-500/10">
          {isOpen ? (
            <Minus className="w-3.5 h-3.5 text-orange-400" />
          ) : (
            <Plus className="w-3.5 h-3.5 text-white/50" />
          )}
        </span>
      </button>
      <div
        ref={contentRef}
        className="overflow-hidden transition-all duration-500 ease-out"
        style={{
          maxHeight: isOpen ? "200px" : "0px",
          opacity: isOpen ? 1 : 0,
        }}
      >
        <p className="text-sm font-light leading-relaxed text-white/45 pb-5 px-1 pr-12">
          {item.answer}
        </p>
      </div>
    </div>
  );
};

const FAQSection = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLDivElement>(null);
  const [openIndex, setOpenIndex] = useState<number | null>(0);

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
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.2fr] gap-12 lg:gap-20">
          {/* Left — Heading */}
          <div ref={headingRef} className="flex flex-col gap-4 max-w-md">
            <div>
              <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1.5 backdrop-blur-sm">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75" />
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500" />
                </span>
                <span className="text-xs font-light tracking-tight text-white/80">FAQ</span>
              </div>
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-extralight tracking-tight leading-[1.1]">
              <span className="text-white/90">Questions? </span>
              <TextShimmer
                as="span"
                duration={2}
                spread={4}
                className="italic font-light [--base-color:theme(colors.orange.300)] [--base-gradient-color:theme(colors.orange.100)] dark:[--base-color:theme(colors.orange.300)] dark:[--base-gradient-color:theme(colors.orange.100)]"
              >
                Answered.
              </TextShimmer>
            </h2>
            <p className="text-sm sm:text-base font-light text-white/40">
              Everything you need to know about how Effect3 works and what to expect.
            </p>
          </div>

          {/* Right — Accordion */}
          <div className="border-t border-white/[0.06]">
            {faqs.map((faq, i) => (
              <FAQItem
                key={i}
                item={faq}
                index={i}
                isOpen={openIndex === i}
                onToggle={() => setOpenIndex(openIndex === i ? null : i)}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default FAQSection;
