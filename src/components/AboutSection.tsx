import { forwardRef, useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const AboutSection = forwardRef<HTMLDivElement>((_, ref) => {
  const contentRef = useRef<HTMLDivElement>(null);
  const bgRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Parallax background
      const sectionEl = typeof ref === "function" ? null : ref?.current;
      if (bgRef.current && sectionEl) {
        gsap.to(bgRef.current, {
          y: -80,
          ease: "none",
          scrollTrigger: {
            trigger: sectionEl,
            start: "top bottom",
            end: "bottom top",
            scrub: 1.5,
          },
        });
      }

      // Content entrance
      if (contentRef.current) {
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
      }
    });
    return () => ctx.revert();
  }, [ref]);

  return (
    <section
      ref={ref}
      id="about"
      className="relative min-h-[80vh] flex items-center justify-center overflow-hidden"
    >
      <div
        ref={bgRef}
        className="absolute inset-0 bg-cover bg-center will-change-transform"
        style={{ backgroundImage: "url(https://images.unsplash.com/photo-1497366216548-37526070297c?w=1400&q=80)", top: "-40px", bottom: "-40px" }}
      />
      <div className="absolute inset-0" style={{ background: "rgba(8,8,8,0.88)" }} />

      <div ref={contentRef} className="relative z-10 text-center max-w-[720px] px-6">
        <p className="font-body font-light text-[11px] tracking-[0.35em] text-gold mb-6" style={{ opacity: 0 }}>
          ABOUT JWR FUNDING
        </p>
        <h2 className="font-display font-light text-[56px] text-jwr-text leading-[1.1]" style={{ opacity: 0 }}>
          Built for complex deals.
        </h2>
        <p className="font-body font-light text-base text-jwr-muted leading-[1.9] mt-8" style={{ opacity: 0 }}>
          JWR Funding is a private capital advisory firm with 25 years of experience arranging debt and equity across real estate, construction, and business acquisition. We operate where conventional lenders stop — structuring solutions for complex, time-sensitive, and oversized capital needs.
        </p>
      </div>
    </section>
  );
});

AboutSection.displayName = "AboutSection";
export default AboutSection;
