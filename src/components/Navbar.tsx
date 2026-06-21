import { useState, useEffect, useCallback } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { ChevronDown, Menu, ScanSearch, X } from "lucide-react";
import logo from "@/assets/logo.png";
import OnboardingModal from "@/components/OnboardingModal";

const navLinks = [
  { label: "Platform", href: "/ai-operating-systems", isRoute: true },
  { label: "Pitch Deck", href: "/assets/effect3-pitch-deck.pdf", isExternal: true, isDownload: true },
  { label: "Case Studies", href: "/case-studies", isRoute: true },
  { label: "About", href: "#about" },
  { label: "Careers", href: "/careers", isRoute: true },
  { label: "Contact", href: "#book" },
];

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [mobileProductsOpen, setMobileProductsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [onboardingOpen, setOnboardingOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const handleClick = useCallback(
    (e: React.MouseEvent<HTMLAnchorElement>, link: typeof navLinks[0]) => {
      if (link.isExternal) {
        setMobileOpen(false);
        setMobileProductsOpen(false);
        return;
      }
      if (link.isRoute) {
        e.preventDefault();
        navigate(link.href);
        setMobileOpen(false);
        setMobileProductsOpen(false);
        return;
      }
      // Hash links: if we're not on /, navigate home first then scroll
      if (link.href.startsWith("#") && location.pathname !== "/") {
        e.preventDefault();
        navigate("/" + link.href);
        setMobileOpen(false);
        setMobileProductsOpen(false);
        return;
      }
      setMobileOpen(false);
      setMobileProductsOpen(false);
    },
    [navigate, location.pathname]
  );

  const handleLogoClick = useCallback(
    (e: React.MouseEvent<HTMLAnchorElement>) => {
      e.preventDefault();
      navigate("/");
    },
    [navigate]
  );

  const handleReviewClick = useCallback(
    (e: React.MouseEvent<HTMLAnchorElement>) => {
      e.preventDefault();
      setOnboardingOpen(true);
      setMobileOpen(false);
    },
    []
  );

  return (
    <>
      <nav className={`fixed top-0 inset-x-0 z-50 w-full transition-all duration-300 ${scrolled ? "bg-black/60 backdrop-blur-lg border-b border-white/5" : ""}`}>
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4 md:px-10 lg:px-16">
          {/* Logo */}
          <a href="/" onClick={handleLogoClick} className="flex items-center">
            <img src={logo} alt="Company logo" className="h-8 w-auto" />
          </a>

          {/* Desktop links */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.slice(0, 1).map((link) => (
              <a
                key={link.label}
                href={link.href}
                onClick={(e) => handleClick(e, link)}
                download={link.isDownload ? "Effect3-Pitch-Deck.pdf" : undefined}
                className="text-sm font-light tracking-tight text-white/70 transition-colors duration-200 hover:text-white"
              >
                {link.label}
              </a>
            ))}
            <div className="group relative">
              <button
                type="button"
                className="flex items-center gap-1.5 text-sm font-light tracking-tight text-white/70 transition-colors duration-200 hover:text-white group-focus-within:text-white"
                aria-haspopup="menu"
              >
                Products
                <ChevronDown
                  size={14}
                  strokeWidth={1.7}
                  className="transition-transform duration-200 group-hover:rotate-180 group-focus-within:rotate-180"
                  aria-hidden="true"
                />
              </button>
              <div className="invisible absolute left-1/2 top-full w-52 -translate-x-1/2 pt-3 opacity-0 transition-all duration-200 group-hover:visible group-hover:opacity-100 group-focus-within:visible group-focus-within:opacity-100">
                <div className="rounded-lg border border-white/10 bg-[#0a0a0a]/95 p-1.5 shadow-2xl shadow-black/50 backdrop-blur-xl" role="menu">
                  <a
                    href="/aeo-scanner"
                    onClick={(e) => handleClick(e, { label: "AEO Scanner", href: "/aeo-scanner", isRoute: true })}
                    className="flex items-center gap-3 rounded-md px-3 py-2.5 text-sm font-light tracking-tight text-white/70 transition-colors duration-200 hover:bg-white/10 hover:text-white focus-visible:bg-white/10 focus-visible:text-white focus-visible:outline-none"
                    role="menuitem"
                  >
                    <ScanSearch size={16} strokeWidth={1.6} aria-hidden="true" />
                    AEO Scanner
                  </a>
                </div>
              </div>
            </div>
            {navLinks.slice(1).map((link) => (
              <a
                key={link.label}
                href={link.href}
                onClick={(e) => handleClick(e, link)}
                download={link.isDownload ? "Effect3-Pitch-Deck.pdf" : undefined}
                className="text-sm font-light tracking-tight text-white/70 transition-colors duration-200 hover:text-white"
              >
                {link.label}
              </a>
            ))}
            <a
              href="#book-system-review"
              onClick={handleReviewClick}
              className="rounded-2xl border border-white/10 bg-white/10 px-4 py-2 text-sm font-light tracking-tight text-white backdrop-blur-sm transition-colors duration-200 hover:bg-white/20"
            >
              Book a system review
            </a>
          </div>

          {/* Mobile toggle */}
          <button
            onClick={() => {
              setMobileOpen(!mobileOpen);
              if (mobileOpen) setMobileProductsOpen(false);
            }}
            className="md:hidden text-white/80 hover:text-white"
            aria-label="Toggle menu"
          >
            {mobileOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>

        {/* Mobile menu */}
        {mobileOpen && (
          <div className="md:hidden border-t border-white/10 bg-black/80 backdrop-blur-md px-6 pb-6 pt-4 flex flex-col gap-4">
            {navLinks.slice(0, 1).map((link) => (
              <a
                key={link.label}
                href={link.href}
                onClick={(e) => handleClick(e, link)}
                download={link.isDownload ? "Effect3-Pitch-Deck.pdf" : undefined}
                className="text-sm font-light tracking-tight text-white/70 hover:text-white"
              >
                {link.label}
              </a>
            ))}
            <div>
              <button
                type="button"
                onClick={() => setMobileProductsOpen((open) => !open)}
                className="flex w-full items-center justify-between text-sm font-light tracking-tight text-white/70 transition-colors hover:text-white"
                aria-expanded={mobileProductsOpen}
                aria-controls="mobile-products-menu"
              >
                Products
                <ChevronDown
                  size={15}
                  strokeWidth={1.7}
                  className={`transition-transform duration-200 ${mobileProductsOpen ? "rotate-180" : ""}`}
                  aria-hidden="true"
                />
              </button>
              {mobileProductsOpen && (
                <div id="mobile-products-menu" className="mt-3 border-l border-white/10 pl-3">
                  <a
                    href="/aeo-scanner"
                    onClick={(e) => handleClick(e, { label: "AEO Scanner", href: "/aeo-scanner", isRoute: true })}
                    className="flex items-center gap-2.5 rounded-md px-2 py-2 text-sm font-light tracking-tight text-white/70 transition-colors hover:bg-white/10 hover:text-white"
                  >
                    <ScanSearch size={15} strokeWidth={1.6} aria-hidden="true" />
                    AEO Scanner
                  </a>
                </div>
              )}
            </div>
            {navLinks.slice(1).map((link) => (
              <a
                key={link.label}
                href={link.href}
                onClick={(e) => handleClick(e, link)}
                download={link.isDownload ? "Effect3-Pitch-Deck.pdf" : undefined}
                className="text-sm font-light tracking-tight text-white/70 hover:text-white"
              >
                {link.label}
              </a>
            ))}
            <a
              href="#book-system-review"
              onClick={handleReviewClick}
              className="rounded-2xl border border-white/10 bg-white/10 px-4 py-2 text-center text-sm font-light tracking-tight text-white backdrop-blur-sm hover:bg-white/20"
            >
              Book a system review
            </a>
          </div>
        )}
      </nav>
      <OnboardingModal
        open={onboardingOpen}
        onClose={() => setOnboardingOpen(false)}
        mode="demo"
      />
    </>
  );
}
