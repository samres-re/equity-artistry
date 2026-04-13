import { useState, useRef, useEffect } from "react";

const serviceItems = [
  "Ground Up Construction",
  "Commercial Real Estate",
  "Commercial Bridge Loans",
  "Fix and Flip",
  "Equity Investments",
  "Business Acquisition",
  "Securities-Based Lending",
  "Business Term Loans",
  "Unsecured Business Loans",
  "Accounts Receivable",
  "Equipment Financing",
  "Medical Working Capital",
  "Debt Restructuring",
];

const links = [
  { label: "Why JWR", href: "#why-jwr" },
  { label: "About", href: "#about" },
  { label: "Contact", href: "#contact" },
];

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);
  const [mobileServicesOpen, setMobileServicesOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const timeoutRef = useRef<ReturnType<typeof setTimeout>>();

  const scrollTo = (href: string) => {
    setOpen(false);
    setServicesOpen(false);
    setMobileServicesOpen(false);
    const el = document.querySelector(href);
    el?.scrollIntoView({ behavior: "smooth" });
  };

  // Close dropdown on outside click
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setServicesOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const handleMouseEnter = () => {
    clearTimeout(timeoutRef.current);
    setServicesOpen(true);
  };

  const handleMouseLeave = () => {
    timeoutRef.current = setTimeout(() => setServicesOpen(false), 200);
  };

  return (
    <>
      <nav
        className="fixed top-0 left-0 right-0 z-50 h-[72px] flex items-center justify-between px-6 md:px-12"
        style={{
          background: "rgba(18,18,18,0.85)",
          backdropFilter: "blur(12px)",
          borderBottom: "1px solid rgba(201,168,76,0.1)",
        }}
      >
        <a href="#" className="font-display font-light text-gold tracking-[0.25em] text-lg">
          JWR FUNDING
        </a>

        <div className="hidden md:flex items-center gap-8">
          {/* Services dropdown */}
          <div
            ref={dropdownRef}
            className="relative"
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
          >
            <button
              onClick={() => scrollTo("#services")}
              className="font-body font-light text-[13px] tracking-[0.12em] text-jwr-muted hover:text-jwr-text transition-colors duration-300 flex items-center gap-1"
            >
              Services
              <svg width="10" height="6" viewBox="0 0 10 6" fill="none" className={`transition-transform duration-200 ${servicesOpen ? "rotate-180" : ""}`}>
                <path d="M1 1L5 5L9 1" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>

            {servicesOpen && (
              <div
                className="absolute top-full left-1/2 -translate-x-1/2 pt-3"
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
              >
                <div
                  className="w-[280px] max-h-[70vh] overflow-y-auto py-3 scrollbar-hide"
                  style={{
                    background: "rgba(18,18,18,0.95)",
                    backdropFilter: "blur(16px)",
                    border: "1px solid rgba(201,168,76,0.12)",
                  }}
                >
                  {serviceItems.map((name, i) => (
                    <button
                      key={i}
                      onClick={() => scrollTo(`#service-section-${i + 1}`)}
                      className="w-full text-left px-5 py-2.5 font-body font-light text-[12px] tracking-[0.08em] text-jwr-muted hover:text-jwr-text hover:bg-gold/5 transition-all duration-200"
                    >
                      {name}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>

          {links.map((l) => (
            <button
              key={l.href}
              onClick={() => scrollTo(l.href)}
              className="font-body font-light text-[13px] tracking-[0.12em] text-jwr-muted hover:text-jwr-text transition-colors duration-300"
            >
              {l.label}
            </button>
          ))}
          <button
            onClick={() => scrollTo("#contact")}
            className="font-display font-normal text-[13px] tracking-[0.1em] text-gold border border-gold px-6 py-2.5 hover:bg-gold hover:text-jwr-bg transition-all duration-300"
          >
            Apply for Financing
          </button>
        </div>

        <button className="md:hidden flex flex-col gap-[6px]" onClick={() => setOpen(!open)}>
          {[0, 1, 2].map((i) => (
            <span key={i} className="block w-6 h-px bg-gold" />
          ))}
        </button>
      </nav>

      {open && (
        <div
          className="fixed inset-0 z-40 flex flex-col items-center justify-center gap-6 transition-opacity overflow-y-auto py-20"
          style={{ background: "rgba(18,18,18,0.97)" }}
        >
          {/* Mobile Services with expandable list */}
          <div className="flex flex-col items-center">
            <button
              onClick={() => setMobileServicesOpen(!mobileServicesOpen)}
              className="font-display font-light text-2xl text-jwr-text tracking-[0.15em] flex items-center gap-2"
            >
              Services
              <svg width="12" height="8" viewBox="0 0 10 6" fill="none" className={`transition-transform duration-200 ${mobileServicesOpen ? "rotate-180" : ""}`}>
                <path d="M1 1L5 5L9 1" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
            {mobileServicesOpen && (
              <div className="flex flex-col items-center gap-3 mt-4 mb-2">
                {serviceItems.map((name, i) => (
                  <button
                    key={i}
                    onClick={() => scrollTo(`#service-section-${i + 1}`)}
                    className="font-body font-light text-[14px] text-jwr-muted hover:text-gold transition-colors duration-200"
                  >
                    {name}
                  </button>
                ))}
              </div>
            )}
          </div>

          {links.map((l) => (
            <button
              key={l.href}
              onClick={() => scrollTo(l.href)}
              className="font-display font-light text-2xl text-jwr-text tracking-[0.15em]"
            >
              {l.label}
            </button>
          ))}
          <button
            onClick={() => scrollTo("#contact")}
            className="font-display font-normal text-lg text-gold border border-gold px-8 py-3 mt-4"
          >
            Apply for Financing
          </button>
        </div>
      )}
    </>
  );
};

export default Navbar;
