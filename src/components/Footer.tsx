const links = ["Services", "Why JWR", "About", "Contact"];

const Footer = () => {
  const scrollTo = (id: string) => {
    document.querySelector(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <footer style={{ background: "#101010", borderTop: "1px solid rgba(201,168,76,0.1)" }} className="px-6 md:px-20 pt-12 pb-8">
      <div className="max-w-6xl mx-auto grid md:grid-cols-3 gap-10 mb-10">
        <div>
          <p className="font-display font-light text-gold text-[16px] tracking-[0.25em]">JWR FUNDING</p>
          <p className="font-body font-light text-[12px] text-jwr-dim mt-2">Private Capital Advisory</p>
        </div>
        <div className="flex flex-col gap-3">
          {links.map((l) => (
            <button
              key={l}
              onClick={() => scrollTo(`#${l.toLowerCase().replace(" ", "-")}`)}
              className="font-body font-light text-[13px] text-jwr-muted text-left hover:text-jwr-text transition-colors"
            >
              {l}
            </button>
          ))}
        </div>
        <div className="flex flex-col gap-2">
          <p className="font-body font-light text-[13px] text-jwr-muted">(267) 969-0520</p>
          <p className="font-body font-light text-[13px] text-jwr-muted">jwinick31@gmail.com</p>
        </div>
      </div>
      <div className="text-center">
        <p className="font-body font-light text-[11px] text-jwr-dim">
          © 2025 JWR Funding · All rights reserved · Privacy Policy
        </p>
      </div>
    </footer>
  );
};

export default Footer;
