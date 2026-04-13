import { useState } from "react";

const links = [
  { label: "Services", href: "#services" },
  { label: "Why JWR", href: "#why-jwr" },
  { label: "About", href: "#about" },
  { label: "Contact", href: "#contact" },
];

const Navbar = () => {
  const [open, setOpen] = useState(false);

  const scrollTo = (href: string) => {
    setOpen(false);
    const el = document.querySelector(href);
    el?.scrollIntoView({ behavior: "smooth" });
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
          className="fixed inset-0 z-40 flex flex-col items-center justify-center gap-8 transition-opacity"
          style={{ background: "rgba(18,18,18,0.97)" }}
        >
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
