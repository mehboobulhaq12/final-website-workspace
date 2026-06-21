import { useNavigate } from "react-router-dom";
import { Linkedin, Twitter, Mail } from "lucide-react";
import logo from "@/assets/logo.png";

const footerLinks = {
  Solutions: [
    { label: "AI Automation Agency", href: "/ai-automation-agency" },
    { label: "AI Agency", href: "/ai-agency" },
    { label: "AI Inbound Automation", href: "/ai-inbound-automation" },
    { label: "Lead Revival AI", href: "/lead-revival-ai" },
    { label: "AI Call Agent", href: "/ai-call-agent" },
    { label: "Ecommerce Operating System", href: "/ecommerce-operating-system" },
    { label: "Legal AI Automation", href: "/legal-ai-automation" },
  ],
  Expertise: [
    { label: "AEO Scanner", href: "/aeo-scanner" },
    { label: "Claude Automation Agency", href: "/claude-automation-agency" },
    { label: "AI Marketing Agency", href: "/ai-marketing-agency" },
    { label: "AI Automation for D2C Brands", href: "/ai-automation-for-d2c-brands" },
    { label: "SaaS AI Conversion System", href: "/saas-ai-conversion-system" },
    { label: "Ecommerce Ads Agency", href: "/ecommerce-ads-agency" },
    { label: "AI Amazon Agency", href: "/ai-amazon-agency" },
    { label: "ChatGPT SEO Agency", href: "/chatgpt-seo-agency" },
    { label: "AI SEO Agency", href: "/ai-seo-agency" },
    { label: "LLM Visibility Agency", href: "/llm-visibility-agency" },
    { label: "AI Search Monitoring", href: "/ai-search-monitoring" },
    { label: "LLM Rank Tracking", href: "/llm-rank-tracking" },
    { label: "GEO Audit", href: "/geo-audit" },
  ],
  Company: [
    { label: "AI Operating Systems", href: "/ai-operating-systems" },
    { label: "Enterprise AI Operations", href: "/enterprise-ai-operations" },
    { label: "Enterprise AI Solutions", href: "/enterprise-ai-solutions" },
    { label: "AEO Agency", href: "/aeo-agency" },
    { label: "GEO Agency", href: "/geo-agency" },
    { label: "Google AI Overviews Agency", href: "/google-ai-overviews-agency" },
    { label: "Effect3 vs ManyChat", href: "/effect3-vs-manychat" },
    { label: "Effect3 vs Kore.ai", href: "/effect3-vs-kore-ai" },
    { label: "Effect3 vs Yellow.ai", href: "/effect3-vs-yellow-ai" },
    { label: "Effect3 vs Cognigy", href: "/effect3-vs-cognigy" },
    { label: "Company", href: "/company" },
    { label: "Founder", href: "/founder" },
    { label: "FAQ", href: "/faq" },
    { label: "AI Search Prompts", href: "/ai-search-prompts" },
    { label: "Effect3 Agency", href: "/effect3-agency" },
    { label: "Case Studies", href: "/case-studies" },
    { label: "Careers", href: "/careers" },
    { label: "ManyChat Replacement", href: "/manychat-replacement" },
  ],
};

const socials = [
  { icon: Twitter, href: "https://x.com/0xiibrahim", label: "Twitter" },
  { icon: Linkedin, href: "https://www.linkedin.com/in/ibm-fullstackmarketer/", label: "LinkedIn" },
  { icon: Mail, href: "mailto:ibrahim@theeffect3.com", label: "Email" },
];

export default function Footer() {
  const navigate = useNavigate();
  return (
    <footer className="w-full bg-black border-t border-white/5">
      <div className="max-w-7xl mx-auto px-6 md:px-10 lg:px-16 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12">
          {/* Brand */}
          <div className="lg:col-span-2 flex flex-col gap-5">
            <a href="/" className="flex items-center">
              <img src={logo} alt="Company logo" className="h-8 w-auto" />
            </a>
            <p className="text-sm font-light text-white/40 leading-relaxed tracking-tight max-w-xs">
              Effect3 is an AI operating systems company that designs, deploys, and operates production AI systems for revenue and service teams.
            </p>
            <div className="flex items-center gap-3 pt-1">
              {socials.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  aria-label={s.label}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="rounded-full border border-white/10 bg-white/5 p-2 text-white/50 transition-colors duration-200 hover:bg-white/10 hover:text-white"
                >
                  <s.icon size={16} strokeWidth={1.5} />
                </a>
              ))}
            </div>
          </div>

          {/* Link columns */}
          {Object.entries(footerLinks).map(([title, links]) => (
            <div key={title} className="flex flex-col gap-4">
              <span className="text-xs font-medium uppercase tracking-widest text-white/30">
                {title}
              </span>
              <ul className="flex flex-col gap-2.5">
                {links.map((link) => (
                  <li key={link.label}>
                    <a
                      href={link.href}
                      onClick={(e) => {
                        if (link.href.startsWith("/")) {
                          e.preventDefault();
                          navigate(link.href);
                        }
                      }}
                      className="text-sm font-light tracking-tight text-white/50 transition-colors duration-200 hover:text-white"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom bar */}
        <div className="mt-14 pt-6 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between gap-4">
          <span className="text-xs font-light text-white/30 tracking-tight">
            © {new Date().getFullYear()} All rights reserved.
          </span>
          <span className="text-xs font-light text-white/30 tracking-tight">
            Deploy by Effect3.
          </span>
        </div>
      </div>
    </footer>
  );
}
