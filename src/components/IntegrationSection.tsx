import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Check } from "lucide-react";
import { TextShimmer } from "@/components/ui/text-shimmer";

import salesforceLogo from "@/assets/logos/salesforce.png";
import slackLogo from "@/assets/logos/slack.png";
import zohoLogo from "@/assets/logos/zoho.png";
import odooLogo from "@/assets/logos/odoo.png";
import airtableLogo from "@/assets/logos/airtable.png";
import whatsappLogo from "@/assets/logos/whatsapp.png";
import hubspotLogo from "@/assets/logos/hubspot.png";
import klaviyoLogo from "@/assets/logos/klaviyo.png";
import excelLogo from "@/assets/logos/excel.png";
import powerpointLogo from "@/assets/logos/powerpoint.png";
import office365Logo from "@/assets/logos/office365.png";
import teamsLogo from "@/assets/logos/teams.png";
import outlookLogo from "@/assets/logos/outlook.png";
import googleSheetsLogo from "@/assets/logos/google-sheets.png";
import googleDocsLogo from "@/assets/logos/google-docs.png";
import googleDriveLogo from "@/assets/logos/google-drive.png";

const logos = [
  { src: salesforceLogo, alt: "Salesforce" },
  { src: excelLogo, alt: "Microsoft Excel" },
  { src: googleSheetsLogo, alt: "Google Sheets" },
  { src: slackLogo, alt: "Slack" },
  { src: powerpointLogo, alt: "PowerPoint" },
  { src: googleDocsLogo, alt: "Google Docs" },
  { src: hubspotLogo, alt: "HubSpot" },
  { src: teamsLogo, alt: "Microsoft Teams" },
  { src: googleDriveLogo, alt: "Google Drive" },
  { src: zohoLogo, alt: "Zoho" },
  { src: office365Logo, alt: "Microsoft 365" },
  { src: whatsappLogo, alt: "WhatsApp" },
  { src: odooLogo, alt: "Odoo" },
  { src: outlookLogo, alt: "Outlook" },
  { src: airtableLogo, alt: "Airtable" },
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
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extralight tracking-tight leading-[1.1]">
            <span className="text-white/90">Deep integration with your </span>
            <TextShimmer
              as="span"
              duration={2}
              spread={4}
              className="italic font-light [--base-color:theme(colors.orange.300)] [--base-gradient-color:theme(colors.orange.100)] dark:[--base-color:theme(colors.orange.300)] dark:[--base-gradient-color:theme(colors.orange.100)]"
            >
              existing stack.
            </TextShimmer>
          </h2>
          <p className="text-base sm:text-lg font-light leading-relaxed text-white/40">
            Our agents connect directly to your systems  -  Microsoft 365, Google Workspace, ERP, CRM, finance tools  -  reading, writing, and executing workflows without migration or platform changes.
          </p>
        </div>
      </div>

      {/* Logo marquee with centered premium check */}
      <div className="relative w-full h-28 sm:h-32 flex items-center">
        {/* Premium animated check in center */}
        <div className="absolute left-1/2 -translate-x-1/2 z-20 flex items-center justify-center">
          <div className="relative flex items-center justify-center">
            {/* Outermost ripple */}
            <div className="absolute w-24 h-24 sm:w-28 sm:h-28 rounded-full border border-orange-400/10 animate-[checkRipple1_3s_ease-out_infinite]" />
            {/* Middle ripple */}
            <div className="absolute w-20 h-20 sm:w-24 sm:h-24 rounded-full border border-orange-400/15 animate-[checkRipple2_3s_ease-out_0.4s_infinite]" />
            {/* Inner ripple */}
            <div className="absolute w-16 h-16 sm:w-20 sm:h-20 rounded-full border border-orange-400/20 animate-[checkRipple3_3s_ease-out_0.8s_infinite]" />
            {/* Glow backdrop */}
            <div className="absolute w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-orange-500/20 blur-xl animate-[checkGlow_2s_ease-in-out_infinite]" />
            {/* Main check circle */}
            <div className="relative w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-gradient-to-br from-orange-400 via-orange-500 to-orange-600 flex items-center justify-center shadow-[0_0_30px_rgba(251,146,60,0.4),0_0_60px_rgba(251,146,60,0.15)] animate-[checkPulse_2s_ease-in-out_infinite]">
              <Check className="w-6 h-6 sm:w-7 sm:h-7 text-white stroke-[3]" />
            </div>
          </div>
        </div>

        {/* Edge fades */}
        <div className="absolute left-0 top-0 bottom-0 w-24 sm:w-40 bg-gradient-to-r from-black to-transparent z-10 pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-24 sm:w-40 bg-gradient-to-l from-black to-transparent z-10 pointer-events-none" />

        {/* Scrolling logos */}
        <div className="flex animate-[scrollLogos_45s_linear_infinite] gap-12 sm:gap-16 items-center">
          {[...logos, ...logos, ...logos].map((logo, i) => (
            <div key={i} className="flex-shrink-0 w-28 h-14 sm:w-36 sm:h-16 flex items-center justify-center">
              <img
                src={logo.src}
                alt={logo.alt}
                loading="lazy"
                decoding="async"
                fetchPriority="low"
                className="max-w-full max-h-full object-contain opacity-80 hover:opacity-100 transition-opacity duration-300"
                style={{ mixBlendMode: "lighten" }}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default IntegrationSection;
