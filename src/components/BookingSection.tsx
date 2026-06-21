import { useRef, useEffect } from "react";
import { TextShimmer } from "@/components/ui/text-shimmer";
import { Calendar, Clock, ArrowUpRight, Video, Zap } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { siteMeta } from "@/lib/seo";

gsap.registerPlugin(ScrollTrigger);

const CAL_LINK = siteMeta.bookingUrl;

const meetingDetails = [
  { icon: Clock, label: "Duration", value: "30 minutes" },
  { icon: Video, label: "Format", value: "Video Call" },
  { icon: Zap, label: "Type", value: "System Review" },
];

const slots = [
  "9:00 AM", "10:00 AM", "11:00 AM",
  "1:00 PM", "2:00 PM", "3:00 PM",
  "4:00 PM", "5:00 PM",
];

const days = ["Mon", "Tue", "Wed", "Thu", "Fri"];
const dates = [24, 25, 26, 27, 28];

export default function BookingSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!contentRef.current || !sectionRef.current) return;

    const children = Array.from(contentRef.current.children);
    gsap.fromTo(
      children,
      { autoAlpha: 0, y: 40 },
      {
        autoAlpha: 1,
        y: 0,
        duration: 0.9,
        stagger: 0.15,
        ease: "power2.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 75%",
          once: true,
        },
      }
    );
  }, []);

  return (
    <section
      ref={sectionRef}
      id="book"
      className="relative w-full py-28 sm:py-36 overflow-hidden bg-black"
    >
      {/* Ambient glow */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[420px] h-[420px] sm:w-[600px] sm:h-[600px] rounded-full bg-orange-500/5 blur-[120px]" />
      </div>

      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div ref={contentRef} className="flex flex-col items-center gap-14">

          {/* Header */}
          <div className="flex flex-col items-center text-center gap-5">
            <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1.5 backdrop-blur-sm">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-orange-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-orange-500" />
              </span>
              <span className="text-xs font-light tracking-tight text-white/70">
                Book a System Review
              </span>
            </div>

            <h2 className="text-3xl sm:text-5xl md:text-6xl font-extralight tracking-tight leading-[1.05] text-white">
              Map Your Next{" "}
              <TextShimmer
                as="span"
                duration={2}
                spread={4}
                className="italic font-light [--base-color:theme(colors.orange.300)] [--base-gradient-color:theme(colors.orange.100)] dark:[--base-color:theme(colors.orange.300)] dark:[--base-gradient-color:theme(colors.orange.100)]"
              >
                AI Operating System
              </TextShimmer>
            </h2>

            <p className="text-base font-light text-white/40 max-w-lg leading-relaxed tracking-tight sm:text-lg">
              Pick a time that works for you. In 30 minutes, we will map the highest-value workflow to automate, the system shape it needs, and whether Effect3 is the right deployment partner.
            </p>
          </div>

          {/* Main card */}
          <div className="w-full rounded-2xl border border-white/10 bg-white/[0.03] backdrop-blur-sm overflow-hidden">
            <div className="grid grid-cols-1 lg:grid-cols-2">

              {/* Left panel */}
              <div className="flex flex-col gap-8 p-5 sm:p-6 lg:p-8 border-b lg:border-b-0 lg:border-r border-white/10">
                {/* Meeting info */}
                <div className="flex flex-col gap-2">
                  <span className="text-xs font-medium uppercase tracking-widest text-white/30">
                    The Effect
                  </span>
                  <h3 className="text-2xl font-light tracking-tight text-white">
                    ICP System Review
                  </h3>
                  <p className="text-sm font-light text-white/40 leading-relaxed mt-1">
                    A focused session for qualified teams that need a production AI system for inbound, lead recovery, voice, outreach, or GTM operations.
                  </p>
                </div>

                {/* Details */}
                <div className="flex flex-col gap-3">
                  {meetingDetails.map(({ icon: Icon, label, value }) => (
                    <div key={label} className="flex items-center gap-3">
                      <div className="flex items-center justify-center w-8 h-8 rounded-lg border border-white/10 bg-white/5">
                        <Icon size={14} className="text-orange-400" strokeWidth={1.5} />
                      </div>
                      <span className="text-xs text-white/40 font-light w-20">{label}</span>
                      <span className="text-sm text-white/70 font-light">{value}</span>
                    </div>
                  ))}
                </div>

                {/* What to expect */}
                <div className="flex flex-col gap-3">
                  <span className="text-xs font-medium uppercase tracking-widest text-white/30">
                    What to Expect
                  </span>
                  <ul className="flex flex-col gap-2.5">
                    {[
                      "Workflow review for inbound, voice, lead recovery, or GTM ops",
                      "Recommended system shape and deployment scope",
                      "Fit check for your ICP, channels, and current stack",
                      "Implementation path if Effect3 is the right partner",
                    ].map((item) => (
                      <li key={item} className="flex items-start gap-2.5 text-sm font-light text-white/50 leading-relaxed">
                        <span className="mt-1.5 w-1 h-1 rounded-full bg-orange-400 shrink-0" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Right panel - Visual calendar preview */}
              <div className="flex flex-col gap-6 p-5 sm:p-6 lg:p-8">
                <div className="flex flex-col gap-1">
                  <span className="text-xs font-medium uppercase tracking-widest text-white/30">
                    Select a Time
                  </span>
                  <p className="text-sm font-light text-white/40">Choose a review slot</p>
                </div>

                {/* Day headers */}
                <div className="grid grid-cols-5 gap-2">
                  {days.map((day, i) => (
                    <div key={day} className="flex flex-col items-center gap-2">
                      <span className="text-[10px] font-medium uppercase tracking-wider text-white/30">{day}</span>
                      <div
                        className={`w-full py-2 rounded-xl text-center text-sm font-light transition-colors ${
                          i === 2
                            ? "bg-orange-500/20 border border-orange-500/40 text-orange-300"
                            : "border border-white/10 text-white/40 hover:border-white/20 hover:text-white/60"
                        }`}
                      >
                        {dates[i]}
                      </div>
                    </div>
                  ))}
                </div>

                {/* Time slots */}
                <div className="grid grid-cols-2 gap-2">
                  {slots.map((slot, i) => (
                    <button
                      key={slot}
                      onClick={() => window.open(CAL_LINK, "_blank", "noopener,noreferrer")}
                      className={`py-2.5 px-3 rounded-xl border text-sm font-light tracking-tight transition-all duration-200 text-left ${
                        i === 2
                          ? "border-orange-500/50 bg-orange-500/10 text-orange-300"
                          : "border-white/10 text-white/50 hover:border-white/25 hover:text-white hover:bg-white/5"
                      }`}
                    >
                      {slot}
                    </button>
                  ))}
                </div>

                {/* CTA */}
                <a
                  href={CAL_LINK}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group mt-auto flex items-center justify-center gap-2.5 w-full py-3.5 rounded-2xl bg-white text-black text-sm font-medium tracking-tight transition-all duration-300 hover:bg-white/90"
                >
                  <Calendar size={15} strokeWidth={2} />
                  Book Your System Review
                  <ArrowUpRight
                    size={14}
                    strokeWidth={2}
                    className="transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                  />
                </a>

                <p className="text-center text-xs font-light text-white/25 tracking-tight">
                  Best for enterprise and growth-stage teams with active revenue or service workflows to automate.
                </p>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
