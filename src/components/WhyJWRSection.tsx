import { forwardRef, useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const differentiators = [
  "Decisions in 24–48 hours",
  "Full project development financing from ground-up to stabilization",
  "Preferred equity and JV structures across all asset classes",
  "$500K to $10B+ ticket sizes — no deal too small or too large",
];

const WhyJWRSection = forwardRef<HTMLDivElement>((_, ref) => {
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      if (!contentRef.current) return;
      const children = contentRef.current.children;
      gsap.fromTo(
        Array.from(children),
        { opacity: 0, y: 60 },
        {
          opacity: 1, y: 0, duration: 1.2, ease: "power3.out",
          stagger: 0.15,
          scrollTrigger: {
            trigger: contentRef.current,
            start: "top 75%",
            once: true,
          },
        }
      );
    });
    return () => ctx.revert();
  }, []);

  return (
    <section ref={ref} id="why-jwr" className="py-[160px] px-6 md:px-20" style={{ background: "#0a0a0a" }}>
      <div ref={contentRef} className="max-w-6xl mx-auto grid md:grid-cols-5 gap-16">
        <div className="md:col-span-2" style={{ opacity: 0 }}>
          <blockquote className="font-display italic font-light text-[42px] text-jwr-text leading-[1.2]">
            "Fast decisions. Creative structures. Access to capital that most lenders won't touch."
          </blockquote>
          <p className="font-body font-light text-[12px] tracking-[0.2em] text-jwr-muted mt-6">— JWR FUNDING</p>
        </div>

        <div className="md:col-span-3" style={{ opacity: 0 }}>
          {differentiators.map((d, i) => (
            <div
              key={i}
              className="py-7 group cursor-default"
              style={{ borderTop: "1px solid rgba(201,168,76,0.1)" }}
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
