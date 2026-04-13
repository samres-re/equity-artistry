import { forwardRef, useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import SplitText from "./SplitText";
import { useIsMobile } from "@/hooks/use-mobile";

gsap.registerPlugin(ScrollTrigger);

const AboutSection = forwardRef<HTMLDivElement>((_, ref) => {
  const bgRef = useRef<HTMLDivElement>(null);
  const overlineRef = useRef<HTMLParagraphElement>(null);
  const isMobile = useIsMobile();

  const imgUrl = `https://images.unsplash.com/photo-1497366216548-37526070297c?w=${isMobile ? 600 : 800}&q=${isMobile ? 50 : 70}&auto=format&fit=crop`;

  useEffect(() => {
    const ctx = gsap.context(() => {
      const sectionEl = typeof ref === "function" ? null : ref?.current;

      // Skip parallax on mobile
      if (bgRef.current && sectionEl && !isMobile) {
        gsap.fromTo(bgRef.current,
          { scale: 1.15 },
          {
            scale: 1, y: -80, ease: "none",
            scrollTrigger: {
              trigger: sectionEl,
              start: "top bottom",
              end: "bottom top",
              scrub: 1.5,
            },
          }
        );
      }

      if (overlineRef.current) {
        gsap.fromTo(overlineRef.current,
          { opacity: 0, y: 20 },
          {
            opacity: 1, y: 0, duration: 1, ease: "power3.out",
            scrollTrigger: { trigger: overlineRef.current, start: "top 80%", once: true },
          }
        );
      }
    });
    return () => ctx.revert();
  }, [ref, isMobile]);

  return (
    <section
      ref={ref}
      id="about"
      className="relative min-h-[80vh] flex items-center justify-center overflow-hidden"
    >
      <div
        ref={bgRef}
        className="absolute bg-cover bg-center will-change-transform"
        style={{
          backgroundImage: `url(${imgUrl})`,
          top: isMobile ? 0 : "-80px",
          bottom: isMobile ? 0 : "-80px",
          left: 0, right: 0,
        }}
      />
      <div className="absolute inset-0" style={{ background: "rgba(18,18,18,0.88)" }} />

      <div className="relative z-10 text-center max-w-[720px] px-6">
        <p ref={overlineRef} className="font-body font-light text-[11px] tracking-[0.35em] text-gold mb-6" style={{ opacity: 0 }}>
          ABOUT JWR FUNDING
        </p>

        <SplitText
          as="h2"
          className="font-display font-light text-[42px] md:text-[84px] text-jwr-text leading-[1.1]"
          scrub={isMobile ? false : 1.5}
          triggerStart="top 75%"
          triggerEnd="top 35%"
        >
          Built for complex deals.
        </SplitText>

        <SplitText
          as="p"
          className="font-body font-light text-base text-jwr-muted leading-[1.9] mt-8"
          scrub={isMobile ? false : 1.5}
          triggerStart="top 70%"
          triggerEnd="top 25%"
        >
          JWR Funding is a private capital advisory firm with 25 years of experience arranging debt and equity across real estate, construction, and business acquisition. We operate where conventional lenders stop — structuring solutions for complex, time-sensitive, and oversized capital needs.
        </SplitText>
      </div>
    </section>
  );
});

AboutSection.displayName = "AboutSection";
export default AboutSection;
