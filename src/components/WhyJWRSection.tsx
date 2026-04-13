import { forwardRef, useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import SplitText from "./SplitText";

gsap.registerPlugin(ScrollTrigger);

const differentiators = [
  "Decisions in 24–48 hours",
  "Full project development financing from ground-up to stabilization",
  "Preferred equity and JV structures across all asset classes",
  "$500K to $10B+ ticket sizes — no deal too small or too large",
];

const WhyJWRSection = forwardRef<HTMLDivElement>((_, ref) => {
  const quoteRef = useRef<HTMLQuoteElement>(null);
  const rowRefs = useRef<(HTMLDivElement | null)[]>([]);
  const attrRef = useRef<HTMLParagraphElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Quote entrance
      if (quoteRef.current) {
        gsap.fromTo(quoteRef.current,
          { opacity: 0, x: -40 },
          {
            opacity: 1, x: 0, duration: 1.4, ease: "power3.out",
            scrollTrigger: { trigger: quoteRef.current, start: "top 75%", once: true },
          }
        );
      }

      if (attrRef.current) {
        gsap.fromTo(attrRef.current,
          { opacity: 0 },
          {
            opacity: 1, duration: 1, ease: "power2.out", delay: 0.5,
            scrollTrigger: { trigger: quoteRef.current, start: "top 75%", once: true },
          }
        );
      }

      // Stagger rows with clip-path reveal
      rowRefs.current.forEach((row, i) => {
        if (!row) return;
        gsap.fromTo(row,
          { opacity: 0, y: 30, clipPath: "inset(0% 0% 100% 0%)" },
          {
            opacity: 1, y: 0, clipPath: "inset(0% 0% 0% 0%)",
            duration: 0.9, ease: "power3.out",
            delay: i * 0.12,
            scrollTrigger: { trigger: row, start: "top 85%", once: true },
          }
        );
      });
    });
    return () => ctx.revert();
  }, []);

  return (
    <section ref={ref} id="why-jwr" className="py-[160px] px-6 md:px-20" style={{ background: "#0a0a0a" }}>
      <div className="max-w-6xl mx-auto grid md:grid-cols-5 gap-16">
        <div className="md:col-span-2">
          <blockquote ref={quoteRef} className="font-display italic font-light text-[42px] text-jwr-text leading-[1.2]" style={{ opacity: 0 }}>
            "Fast decisions. Creative structures. Access to capital that most lenders won't touch."
          </blockquote>
          <p ref={attrRef} className="font-body font-light text-[12px] tracking-[0.2em] text-jwr-muted mt-6" style={{ opacity: 0 }}>— JWR FUNDING</p>
        </div>

        <div className="md:col-span-3">
          {differentiators.map((d, i) => (
            <div
              key={i}
              ref={(el) => { rowRefs.current[i] = el; }}
              className="py-7 group cursor-default"
              style={{ borderTop: "1px solid rgba(201,168,76,0.1)", opacity: 0 }}
            >
              <div className="border-l-2 border-transparent group-hover:border-gold pl-4 transition-colors duration-300">
                <p className="font-body font-light text-[15px] text-jwr-text">{d}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
});

WhyJWRSection.displayName = "WhyJWRSection";
export default WhyJWRSection;
