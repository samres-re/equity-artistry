import { forwardRef, useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import SplitText from "./SplitText";

gsap.registerPlugin(ScrollTrigger);

const bankingProblems = [
  "They lend when you don't need it — and stall when you do.",
  "Fine print can box you out of future options.",
  "Endless paperwork and slow timelines.",
  "By the time you get funding, your competitors have left you in the dust.",
  "If your industry is \"non-standard,\" they often pass.",
];

const useCases = [
  "Launch a startup or new product line",
  "Purchase equipment, technology, or vehicles",
  "Invest in real estate or improvements",
  "Hire and scale your team",
  "Fund sales and marketing",
  "Acquire a competitor or buy out a partner",
];

const quotes = [
  "My banker turned me down for a line of credit and my clients slow-pay me.",
  "I want to buy a business but my bank won't fund the deal.",
  "I need to acquire a company or buy out my partner — bank said no.",
  "I can't get funding due to credit blemishes or limited collateral.",
  "I need cash out of my building for growth but the bank says I'm over-extended.",
  "My bank won't fund my startup.",
];

const WhyJWRSection = forwardRef<HTMLDivElement>((_, ref) => {
  const heroRef = useRef<HTMLDivElement>(null);
  const problemHeaderRef = useRef<HTMLDivElement>(null);
  const problemListRef = useRef<HTMLDivElement>(null);
  const differenceRef = useRef<HTMLDivElement>(null);
  const useCaseRef = useRef<HTMLDivElement>(null);
  const quotesRef = useRef<HTMLDivElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Animate each block on scroll
      const animateIn = (el: HTMLElement | null, opts?: { x?: number }) => {
        if (!el) return;
        gsap.fromTo(el,
          { opacity: 0, y: 40, ...(opts?.x ? { x: opts.x } : {}) },
          {
            opacity: 1, y: 0, x: 0, duration: 1.2, ease: "power3.out",
            scrollTrigger: { trigger: el, start: "top 80%", once: true },
          }
        );
      };

      animateIn(heroRef.current);
      animateIn(problemHeaderRef.current);

      // Stagger problem list items
      if (problemListRef.current) {
        const items = problemListRef.current.children;
        gsap.fromTo(Array.from(items),
          { opacity: 0, x: -20 },
          {
            opacity: 1, x: 0, duration: 0.7, ease: "power3.out", stagger: 0.1,
            scrollTrigger: { trigger: problemListRef.current, start: "top 80%", once: true },
          }
        );
      }

      animateIn(differenceRef.current);

      // Stagger use case items
      if (useCaseRef.current) {
        const items = useCaseRef.current.children;
        gsap.fromTo(Array.from(items),
          { opacity: 0, y: 20 },
          {
            opacity: 1, y: 0, duration: 0.6, ease: "power3.out", stagger: 0.08,
            scrollTrigger: { trigger: useCaseRef.current, start: "top 80%", once: true },
          }
        );
      }

      // Stagger quote cards
      if (quotesRef.current) {
        const items = quotesRef.current.children;
        gsap.fromTo(Array.from(items),
          { opacity: 0, y: 30 },
          {
            opacity: 1, y: 0, duration: 0.8, ease: "power3.out", stagger: 0.12,
            scrollTrigger: { trigger: quotesRef.current, start: "top 80%", once: true },
          }
        );
      }

      animateIn(ctaRef.current);
    });
    return () => ctx.revert();
  }, []);

  return (
    <section ref={ref} id="why-jwr" style={{ background: "#141414" }}>

      {/* ── Hero intro ── */}
      <div className="py-[80px] md:py-[140px] px-6 md:px-20">
        <div className="max-w-5xl mx-auto text-center" ref={heroRef} style={{ opacity: 0 }}>
          <p className="font-body font-light text-[11px] tracking-[0.35em] text-gold mb-6">WHY JWR FUNDING</p>
          <SplitText
            as="h2"
            className="font-display font-light text-[36px] md:text-[72px] text-jwr-text leading-[1.1]"
            scrub={false}
            triggerStart="top 80%"
          >
            Capital that helps you get ahead.
          </SplitText>
          <p className="font-body font-light text-[15px] md:text-[17px] text-jwr-muted leading-[1.8] mt-8 max-w-[680px] mx-auto">
            Most business owners get stuck in a cash-flow grind and never hit their full potential — not because their ideas are weak, but because the funding path is stacked against them.
          </p>
        </div>
      </div>

      {/* ── The problem with traditional banking ── */}
      <div className="py-[60px] md:py-[100px] px-6 md:px-20" style={{ background: "#121212" }}>
        <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-12 md:gap-20">
          <div ref={problemHeaderRef} style={{ opacity: 0 }}>
            <div className="w-[2px] h-[40px] bg-gold mb-6" />
            <h3 className="font-display font-light text-[28px] md:text-[44px] text-jwr-text leading-[1.15]">
              The problem with traditional banking.
            </h3>
          </div>
          <div ref={problemListRef} className="flex flex-col gap-0">
            {bankingProblems.map((p, i) => (
              <div
                key={i}
                className="py-5 group"
                style={{ borderBottom: "1px solid rgba(201,168,76,0.1)", opacity: 0 }}
              >
                <div className="flex items-start gap-4">
                  <span className="font-display text-gold text-[14px] mt-0.5 shrink-0">✗</span>
                  <p className="font-body font-light text-[15px] text-jwr-muted leading-[1.7]">{p}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── Our difference ── */}
      <div className="py-[80px] md:py-[120px] px-6 md:px-20">
        <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-12 md:gap-20 items-center" ref={differenceRef} style={{ opacity: 0 }}>
          <div>
            <p className="font-body font-light text-[11px] tracking-[0.35em] text-gold mb-4">OUR DIFFERENCE</p>
            <h3 className="font-display italic font-light text-[32px] md:text-[56px] text-jwr-text leading-[1.15]">
              We say yes when banks say no.
            </h3>
          </div>
          <div>
            <p className="font-body font-light text-[15px] md:text-[16px] text-jwr-muted leading-[1.8]">
              We have access to hundreds of millions in capital specifically earmarked for small and mid-sized businesses. With more than 40 years of experience, we move fast, structure deals around your reality — not the bank's — and help you get ahead and stay ahead.
            </p>
            <div className="flex flex-wrap gap-6 mt-8">
              <div className="text-center">
                <span className="font-display font-light text-[36px] md:text-[44px] text-gold">24h</span>
                <p className="font-body font-light text-[11px] tracking-[0.2em] text-jwr-muted mt-1">DECISIONS</p>
              </div>
              <div className="text-center">
                <span className="font-display font-light text-[36px] md:text-[44px] text-gold">40+</span>
                <p className="font-body font-light text-[11px] tracking-[0.2em] text-jwr-muted mt-1">YEARS EXP</p>
              </div>
              <div className="text-center">
                <span className="font-display font-light text-[36px] md:text-[44px] text-gold">$10B+</span>
                <p className="font-body font-light text-[11px] tracking-[0.2em] text-jwr-muted mt-1">ARRANGED</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ── We should talk if… ── */}
      <div className="py-[60px] md:py-[100px] px-6 md:px-20" style={{ background: "#121212" }}>
        <div className="max-w-5xl mx-auto">
          <p className="font-body font-light text-[11px] tracking-[0.35em] text-gold mb-4">USE CASES</p>
          <h3 className="font-display font-light text-[28px] md:text-[44px] text-jwr-text leading-[1.15] mb-10">
            We should talk if you want to:
          </h3>
          <div ref={useCaseRef} className="grid sm:grid-cols-2 md:grid-cols-3 gap-4">
            {useCases.map((u, i) => (
              <div
                key={i}
                className="border border-gold/10 hover:border-gold/40 px-6 py-5 transition-colors duration-300 group"
                style={{ opacity: 0 }}
              >
                <div className="flex items-start gap-3">
                  <span className="font-display text-gold text-[16px] mt-0.5 shrink-0">→</span>
                  <p className="font-body font-light text-[14px] text-jwr-text leading-[1.6]">{u}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── Sound familiar? ── */}
      <div className="py-[80px] md:py-[120px] px-6 md:px-20">
        <div className="max-w-5xl mx-auto">
          <p className="font-body font-light text-[11px] tracking-[0.35em] text-gold mb-4">SOUND FAMILIAR?</p>
          <h3 className="font-display italic font-light text-[28px] md:text-[44px] text-jwr-text leading-[1.15] mb-10">
            You're not alone.
          </h3>
          <div ref={quotesRef} className="grid sm:grid-cols-2 gap-4">
            {quotes.map((q, i) => (
              <div
                key={i}
                className="border-l-2 border-gold/20 hover:border-gold pl-6 py-4 transition-colors duration-300"
                style={{ opacity: 0 }}
              >
                <p className="font-body font-light italic text-[14px] text-jwr-muted leading-[1.7]">"{q}"</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── CTA ── */}
      <div className="py-[60px] md:py-[80px] px-6 md:px-20" style={{ background: "#121212" }}>
        <div className="max-w-3xl mx-auto text-center" ref={ctaRef} style={{ opacity: 0 }}>
          <p className="font-body font-light text-[15px] md:text-[17px] text-jwr-muted leading-[1.8] mb-8">
            Things have changed — but you still have options. Contact us and we'll review your goals, outline your choices, and guide you through a simple, no-pressure process to secure the capital your business needs.
          </p>
          <button
            onClick={() => document.querySelector("#contact")?.scrollIntoView({ behavior: "smooth" })}
            className="font-display font-normal text-[14px] md:text-[15px] tracking-[0.12em] bg-gold text-jwr-bg px-10 py-4 hover:bg-gold-light transition-colors duration-300"
          >
            Get Started
          </button>
        </div>
      </div>

    </section>
  );
});

WhyJWRSection.displayName = "WhyJWRSection";
export default WhyJWRSection;
