import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { CheckCircle2 } from "lucide-react";

import salesforceLogo from "@/assets/logos/salesforce.png";
import slackLogo from "@/assets/logos/slack.png";
import zohoLogo from "@/assets/logos/zoho.png";
import odooLogo from "@/assets/logos/odoo.png";
import airtableLogo from "@/assets/logos/airtable.png";
import whatsappLogo from "@/assets/logos/whatsapp.png";
import hubspotLogo from "@/assets/logos/hubspot.png";
import klaviyoLogo from "@/assets/logos/klaviyo.png";

gsap.registerPlugin(ScrollTrigger);

const logos = [
  { src: salesforceLogo, alt: "Salesforce" },
  { src: slackLogo, alt: "Slack", invert: true },
  { src: zohoLogo, alt: "Zoho" },
  { src: odooLogo, alt: "Odoo" },
  { src: airtableLogo, alt: "Airtable", invert: true },
  { src: whatsappLogo, alt: "WhatsApp" },
  { src: hubspotLogo, alt: "HubSpot" },
  { src: klaviyoLogo, alt: "Klaviyo" },
];

const IntegrationSection = () => {
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
    },
    { scope: sectionRef }
  );

  return (
    <section ref={sectionRef} className="w-full py-12 md:py-16 bg-black border-t border-white/5 overflow-hidden">
      <div className="mx-auto max-w-7xl px-6 md:px-10 lg:px-16">
        {/* Badge & Heading */}
        <div ref={headingRef} className="flex flex-col gap-4 mb-14 max-w-2xl">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1.5 backdrop-blur-sm">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
              </span>
              <span className="text-xs font-light tracking-tight text-white/80">Integrations</span>
            </div>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extralight tracking-tight leading-[1.1] text-white/90">
            Deep integration with your existing stack.
          </h2>
          <p className="text-base sm:text-lg font-light leading-relaxed text-white/40">
            Our agents connect directly to your systems — ERP, CRM, finance tools — reading, writing, and executing workflows without migration or platform changes.
          </p>
        </div>
      </div>

      {/* Logo marquee with centered checkmark */}
      <div className="relative w-full h-28 sm:h-32 flex items-center">
        {/* Animated check circle in center */}
        <div className="absolute left-1/2 -translate-x-1/2 z-20 flex items-center justify-center">
          <div className="relative">
            {/* Glow rings */}
            <div className="absolute inset-0 w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-orange-400/10 animate-[checkRing_2.5s_ease-in-out_infinite]" />
            <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-gradient-to-br from-orange-500 to-orange-600 flex items-center justify-center shadow-lg shadow-orange-500/30 animate-[checkPop_2.5s_ease-in-out_infinite]">
              <CheckCircle2 className="w-8 h-8 sm:w-10 sm:h-10 text-white" />
            </div>
          </div>
        </div>

        {/* Edge fades */}
        <div className="absolute left-0 top-0 bottom-0 w-24 sm:w-40 bg-gradient-to-r from-black to-transparent z-10 pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-24 sm:w-40 bg-gradient-to-l from-black to-transparent z-10 pointer-events-none" />

        {/* Scrolling logos */}
        <div className="flex animate-[scrollLogos_25s_linear_infinite] gap-12 sm:gap-16 items-center">
          {[...logos, ...logos, ...logos].map((logo, i) => (
            <div key={i} className="flex-shrink-0 w-24 h-12 sm:w-32 sm:h-14 flex items-center justify-center">
              <img
                src={logo.src}
                alt={logo.alt}
                className={`max-w-full max-h-full object-contain opacity-50 hover:opacity-80 transition-opacity duration-300 ${logo.invert ? "brightness-0 invert" : ""}`}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default IntegrationSection;
