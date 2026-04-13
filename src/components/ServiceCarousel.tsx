import { forwardRef, useRef, useEffect, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import SplitText from "./SplitText";
import { useIsMobile } from "@/hooks/use-mobile";

gsap.registerPlugin(ScrollTrigger);

const services = [
  { name: "Ground Up Construction", tag: "Real Estate", img: "https://images.unsplash.com/photo-1486325212027-8081e485255e?w=400&q=70" },
  { name: "Commercial Real Estate", tag: "Real Estate", img: "https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=400&q=70" },
  { name: "Commercial Bridge Loans", tag: "Real Estate", img: "https://images.unsplash.com/photo-1541888946425-d81bb19240f5?w=400&q=70" },
  { name: "Equity Investments", tag: "Structured Capital", img: "https://images.unsplash.com/photo-1444653614773-995cb1ef9efa?w=400&q=70" },
  { name: "Business Acquisition", tag: "Business Capital", img: "https://images.unsplash.com/photo-1507679799987-c73779587ccf?w=400&q=70" },
  { name: "Securities-Based Lending", tag: "Structured Capital", img: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=400&q=70" },
  { name: "Medical Working Capital", tag: "Business Capital", img: "https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?w=400&q=70" },
  { name: "Debt Restructuring", tag: "Structured Capital", img: "https://images.unsplash.com/photo-1520607162513-77705c0f0d4a?w=400&q=70" },
];

const CARD_W = 260;
const CARD_H = 340;
const CARD_GAP = 30;
const MAX_ROTATE_Y = 40;
const TRANSLATE_Z_FALLOFF = -120;
const VISIBLE_CARDS = 7;

const ServiceCarousel = forwardRef<HTMLDivElement>((_, ref) => {
  const headerRef = useRef<HTMLDivElement>(null);
  const sectionRef = useRef<HTMLElement>(null);
  const arcRef = useRef<HTMLDivElement>(null);
  const progressRef = useRef({ value: 0 });
  const isMobile = useIsMobile();

  const scrollToService = (index: number) => {
    const el = document.getElementById(`service-section-${index + 1}`);
    el?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    if (isMobile) return;

    const ctx = gsap.context(() => {
      // Header entrance
      if (headerRef.current) {
        gsap.fromTo(headerRef.current,
          { opacity: 0, y: 60 },
          { opacity: 1, y: 0, duration: 1.2, ease: "power3.out",
            scrollTrigger: { trigger: headerRef.current, start: "top 85%", once: true }
          }
        );
      }

      // Scroll-linked carousel rotation
      if (sectionRef.current && arcRef.current) {
        const totalCards = services.length;
        // We animate progress from 0 (first card centered) to 1 (last card centered)
        gsap.fromTo(progressRef.current,
          { value: 0 },
          {
            value: 1,
            ease: "none",
            scrollTrigger: {
              trigger: sectionRef.current,
              start: "top 20%",
              end: "bottom 80%",
              scrub: 1.5,
              onUpdate: (self) => {
                progressRef.current.value = self.progress;
                updateCards(self.progress, totalCards);
              },
            },
          }
        );
      }
    });

    return () => ctx.revert();
  }, [isMobile]);

  const updateCards = (progress: number, totalCards: number) => {
    if (!arcRef.current) return;
    const cards = arcRef.current.children;
    // progress 0 = card 0 centered, progress 1 = last card centered
    const centerIndex = progress * (totalCards - 1);

    for (let i = 0; i < cards.length; i++) {
      const offset = i - centerIndex; // negative = left, positive = right
      const absOffset = Math.abs(offset);
      const clampedOffset = Math.max(-4, Math.min(4, offset));
      const rotateY = (clampedOffset / 4) * MAX_ROTATE_Y;
      const translateZ = TRANSLATE_Z_FALLOFF * Math.abs(clampedOffset / 4);
      const translateX = offset * (CARD_W + CARD_GAP);
      const opacity = absOffset > 4.5 ? 0 : 1 - Math.max(0, (absOffset - 3.5));
      const scale = 1 - Math.abs(clampedOffset) * 0.04;

      // Glow intensity peaks at center (offset=0), fades by offset=1.2
      const glowIntensity = Math.max(0, 1 - absOffset / 1.2);
      const goldGlow = `0 0 ${30 * glowIntensity}px rgba(183,150,90,${0.35 * glowIntensity}), 0 40px 80px rgba(0,0,0,0.6)`;
      const borderOpacity = 0.4 * glowIntensity;

      const card = cards[i] as HTMLElement;
      card.style.transform = `translateX(${translateX}px) translateZ(${translateZ}px) rotateY(${rotateY}deg) scale(${scale})`;
      card.style.opacity = String(opacity);
      card.style.zIndex = String(100 - Math.round(absOffset * 10));
      card.style.boxShadow = goldGlow;
      // Update border overlay
      const borderEl = card.querySelector('.card-border-overlay') as HTMLElement;
      if (borderEl) {
        borderEl.style.borderColor = `rgba(183,150,90,${borderOpacity})`;
      }
    }
  };

  // Mobile fallback: standard horizontal scroll
  if (isMobile) {
    return (
      <section ref={ref} id="services" className="py-[60px] noise-overlay" style={{ background: "#121212" }}>
        <div className="px-6 mb-8">
          <p className="font-body font-light text-[11px] tracking-[0.35em] text-gold mb-4">FINANCING SOLUTIONS</p>
          <SplitText as="h2" className="font-display font-light text-[36px] text-jwr-text" scrub={false} triggerStart="top 85%">
            Every capital need. One firm.
          </SplitText>
        </div>
        <div className="flex gap-4 overflow-x-auto px-6 pb-4 scrollbar-hide" style={{ scrollSnapType: "x mandatory" }}>
          {services.map((s, i) => (
            <div
              key={i}
              onClick={() => scrollToService(i)}
              className="flex-shrink-0 relative cursor-pointer group overflow-hidden"
              style={{ width: CARD_W, height: CARD_H, borderRadius: 4, scrollSnapAlign: "start" }}
            >
              <div
                className="absolute inset-0 bg-cover bg-center"
                style={{ backgroundImage: `url(${s.img})` }}
              />
              <div className="absolute inset-0" style={{ background: "linear-gradient(to top, rgba(18,18,18,0.95) 35%, rgba(18,18,18,0.15) 100%)" }} />
              <div className="absolute bottom-5 left-5 right-5">
                <p className="font-body font-light text-[10px] tracking-[0.2em] text-gold mb-1">{s.tag}</p>
                <h3 className="font-display font-normal text-[20px] text-jwr-text leading-tight">{s.name}</h3>
              </div>
            </div>
          ))}
        </div>
      </section>
    );
  }

  return (
    <section
      ref={(el) => {
        sectionRef.current = el;
        if (typeof ref === "function") ref(el as HTMLDivElement);
        else if (ref) (ref as React.MutableRefObject<HTMLDivElement | null>).current = el as HTMLDivElement;
      }}
      id="services"
      className="noise-overlay relative"
      style={{ background: "#121212", height: "250vh" }}
    >
      <div className="sticky top-0 h-screen flex flex-col justify-center overflow-hidden">
        <div ref={headerRef} className="px-6 md:px-12 mb-16" style={{ opacity: 0 }}>
          <p className="font-body font-light text-[11px] tracking-[0.35em] text-gold mb-4">FINANCING SOLUTIONS</p>
          <SplitText as="h2" className="font-display font-light text-[80px] text-jwr-text" scrub={false} triggerStart="top 85%">
            Every capital need. One firm.
          </SplitText>
        </div>

        <div
          className="relative flex items-center justify-center"
          style={{ perspective: "1200px", height: CARD_H + 60 }}
        >
          <div
            ref={arcRef}
            className="relative"
            style={{ transformStyle: "preserve-3d", width: 0, height: CARD_H }}
          >
            {services.map((s, i) => {
              // Initial positions: all cards start spread from center (card 0 centered)
              const offset = i;
              const clampedOffset = Math.max(-4, Math.min(4, offset));
              const rotateY = (clampedOffset / 4) * MAX_ROTATE_Y;
              const translateZ = TRANSLATE_Z_FALLOFF * Math.abs(clampedOffset / 4);
              const translateX = offset * (CARD_W + CARD_GAP);

              return (
                <div
                  key={i}
                  onClick={() => scrollToService(i)}
                  className="absolute cursor-pointer group"
                  style={{
                    width: CARD_W,
                    height: CARD_H,
                    borderRadius: 4,
                    overflow: "hidden",
                    left: -CARD_W / 2,
                    top: 0,
                    transform: `translateX(${translateX}px) translateZ(${translateZ}px) rotateY(${rotateY}deg)`,
                    boxShadow: "0 40px 80px rgba(0,0,0,0.6)",
                    opacity: Math.abs(offset) > 4.5 ? 0 : 1 - Math.max(0, (Math.abs(offset) - 3.5)),
                    transition: "opacity 0.3s",
                    willChange: "transform",
                    backfaceVisibility: "hidden",
                  }}
                >
                  <div
                    className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-110"
                    style={{ backgroundImage: `url(${s.img})` }}
                  />
                  <div
                    className="absolute inset-0"
                    style={{ background: "linear-gradient(to top, rgba(18,18,18,0.95) 35%, rgba(18,18,18,0.15) 100%)" }}
                  />
                  <div className="card-border-overlay absolute inset-0 border border-transparent transition-colors duration-500" style={{ borderRadius: 4 }} />
                  <div className="absolute bottom-5 left-5 right-5">
                    <p className="font-body font-light text-[10px] tracking-[0.2em] text-gold mb-1">{s.tag}</p>
                    <h3 className="font-display font-normal text-[20px] text-jwr-text leading-tight">{s.name}</h3>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
});

ServiceCarousel.displayName = "ServiceCarousel";
export default ServiceCarousel;
