import { Linkedin, Twitter, Mail } from "lucide-react";
import logo from "@/assets/logo.png";

const footerLinks = {
  Solutions: [
    { label: "Lead Recovery", href: "#solutions" },
    { label: "AI Agents", href: "#solutions" },
    { label: "Integrations", href: "#integrations" },
    { label: "Infrastructure", href: "#infrastructure" },
  ],
  Company: [
    { label: "About", href: "#about" },
    { label: "Case Studies", href: "#case-studies" },
    { label: "Careers", href: "#careers" },
    { label: "Contact", href: "#contact" },
  ],
};

const socials = [
  { icon: Twitter, href: "https://x.com/0xiibrahim", label: "Twitter" },
  { icon: Linkedin, href: "https://www.linkedin.com/in/ibm-fullstackmarketer/", label: "LinkedIn" },
  { icon: Mail, href: "mailto:ibrahim@theeffect3.com", label: "Email" },
];

export default function Footer() {
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
              We deploy custom AI agents that revive your dead leads and bring your customers back to life.
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
