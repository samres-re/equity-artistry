import { useState, useEffect, forwardRef, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const words = ["operators.", "sponsors.", "developers.", "investors."];

const HeroSection = forwardRef<HTMLDivElement>((_, ref) => {
  const [wordIndex, setWordIndex] = useState(0);
  const [visible, setVisible] = useState(true);
  const contentRef = useRef<HTMLDivElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    const interval = setInterval(() => {
      setVisible(false);
      setTimeout(() => {
        setWordIndex((i) => (i + 1) % words.length);
        setVisible(true);
      }, 400);
    }, 2500);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Entrance stagger animation
      const children = contentRef.current?.children;
      if (children) {
        gsap.fromTo(
          Array.from(children),
          { opacity: 0, y: 40 },
          { opacity: 1, y: 0, duration: 0.9, ease: "power3.out", stagger: 0.3 }
        );
      }

      // Pin hero
      const sectionEl = typeof ref === "function" ? null : ref?.current;
      if (sectionEl) {
        ScrollTrigger.create({
          trigger: sectionEl,
          start: "top top",
          end: "40% top",
          pin: true,
          pinSpacing: true,
        });
      }

      // Scrub headline
      if (headlineRef.current && sectionEl) {
        gsap.to(headlineRef.current, {
          y: -30,
          ease: "none",
          scrollTrigger: {
            trigger: sectionEl,
            start: "top top",
            end: "40% top",
            scrub: true,
          },
        });
      }
    });

    return () => ctx.revert();
  }, [ref]);

  const scrollTo = (id: string) => {
    document.querySelector(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section ref={ref} className="relative h-screen flex items-center justify-center noise-overlay" style={{ background: "#080808" }}>
      <div className="absolute top-24 left-6 md:left-12 font-body font-light text-[11px] tracking-[0.2em] text-jwr-dim">
        EST. 2000
      </div>

      <div ref={contentRef} className="text-center px-6 max-w-4xl">
        <p className="font-body font-light text-[11px] tracking-[0.35em] text-gold mb-8">
          PRIVATE CAPITAL ADVISORY
        </p>

        <h1
          ref={headlineRef}
          className="font-display font-light text-jwr-text leading-[1.05]"
          style={{ fontSize: "clamp(52px, 7vw, 96px)" }}
        >
          Capital solutions for
          <br />
          serious{" "}
          <span
            className="text-gold inline-block"
            style={{
              opacity: visible ? 1 : 0,
              transform: visible ? "translateY(0)" : "translateY(-10px)",
              transition: "opacity 400ms, transform 400ms",
            }}
          >
            {words[wordIndex]}
          </span>
        </h1>

        <p className="font-body font-light text-base text-jwr-muted max-w-[480px] mx-auto mt-8 leading-[1.7]">
          Arranging debt and equity up to $10B+ across real estate, construction, and business capital since 1999.
        </p>

        <div className="flex items-center justify-center gap-4 mt-10">
          <button
            onClick={() => scrollTo("#contact")}
            className="font-display font-normal text-[15px] tracking-[0.12em] bg-gold text-jwr-bg px-8 py-3.5 hover:bg-gold-light transition-colors duration-300"
          >
            Apply for Financing
          </button>
          <button
            onClick={() => scrollTo("#services")}
            className="font-display font-normal text-[15px] tracking-[0.12em] text-jwr-muted border border-jwr-dim px-8 py-3.5 hover:border-gold hover:text-jwr-text transition-all duration-300"
          >
            Explore Services
          </button>
        </div>
      </div>

      <div className="absolute bottom-0 left-0 right-0">
        <div className="w-full h-px" style={{ background: "rgba(201,168,76,0.15)" }} />
        <div className="flex flex-col items-center py-6">
          <span className="font-body font-light text-[10px] tracking-[0.3em] text-jwr-dim">SCROLL</span>
          <div className="w-px h-6 bg-jwr-dim mt-2 animate-scroll-line" />
        </div>
      </div>
    </section>
  );
});

HeroSection.displayName = "HeroSection";
export default HeroSection;
