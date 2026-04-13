import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import SplitText from "./SplitText";

gsap.registerPlugin(ScrollTrigger);

const services = [
  { name: "Ground Up Construction Leasing", desc: "Full-cycle financing for ground-up development projects. We structure debt and equity from site acquisition through vertical construction and certificate of occupancy.", img: "https://images.unsplash.com/photo-1486325212027-8081e485255e?w=800&q=70" },
  { name: "Commercial Real Estate Financing", desc: "Senior debt, bridge, and permanent financing across multifamily, industrial, office, and mixed-use assets. Competitive terms from $1M to $500M+.", img: "https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=800&q=70" },
  { name: "Commercial Bridge Loans", desc: "Short-term bridge capital for acquisitions, recapitalizations, and transitional assets. Fast closings, flexible structures, and certainty of execution.", img: "https://images.unsplash.com/photo-1541888946425-d81bb19240f5?w=800&q=70" },
  { name: "Equity Investments", desc: "Preferred equity and JV structures for sponsors who need capital above the senior debt but below common equity. We invest where conventional lenders won't.", img: "https://images.unsplash.com/photo-1444653614773-995cb1ef9efa?w=800&q=70" },
  { name: "Business Acquisition Financing", desc: "Structured capital solutions for acquisitions of operating businesses. We arrange senior debt, mezzanine, and equity co-investment for qualified buyers.", img: "https://images.unsplash.com/photo-1507679799987-c73779587ccf?w=800&q=70" },
  { name: "Securities-Based Lending", desc: "Leverage your liquid portfolio without triggering a taxable event. We arrange non-purpose loans against publicly traded securities, private equity interests, and alternatives.", img: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=800&q=70" },
  { name: "Medical Working Capital", desc: "Revenue-based working capital for medical practices, outpatient facilities, and healthcare operators. Fast approvals, minimal documentation.", img: "https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?w=800&q=70" },
  { name: "Debt Restructuring", desc: "Distressed debt advisory and recapitalization for borrowers facing maturity defaults, covenant breaches, or over-leveraged capital stacks. Discreet, experienced, results-driven.", img: "https://images.unsplash.com/photo-1520607162513-77705c0f0d4a?w=800&q=70" },
];

interface Props {
  sectionRefs: React.RefObject<HTMLDivElement | null>[];
}

const ServiceSections = ({ sectionRefs }: Props) => {
  const bgRefs = useRef<(HTMLDivElement | null)[]>([]);
  const dividerRefs = useRef<(HTMLDivElement | null)[]>([]);
  const numberRefs = useRef<(HTMLParagraphElement | null)[]>([]);
  const ctaRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const headlineRefs = useRef<(HTMLHeadingElement | null)[]>([]);
  const lineRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      services.forEach((s, i) => {
        const sectionEl = sectionRefs[i]?.current;
        const bgEl = bgRefs.current[i];
        const divider = dividerRefs.current[i];
        const num = numberRefs.current[i];
        const cta = ctaRefs.current[i];
        const headline = headlineRefs.current[i];
        const line = lineRefs.current[i];

        if (!sectionEl) return;

        // Parallax + scale on background — scrub 2.5, y -120, scale 1.15
        if (bgEl) {
          gsap.fromTo(bgEl,
            { scale: 1.15 },
            {
              scale: 1,
              y: -120,
              ease: "none",
              scrollTrigger: {
                trigger: sectionEl,
                start: "top bottom",
                end: "bottom top",
                scrub: 2.5,
              },
            }
          );
        }

        // Vertical gold line — animate-line-grow on scroll entry
        if (line) {
          gsap.fromTo(line,
            { scaleY: 0, transformOrigin: "top" },
            {
              scaleY: 1, duration: 1.2, ease: "cubic-bezier(0.76, 0, 0.24, 1)",
              scrollTrigger: { trigger: sectionEl, start: "top 65%", once: true },
            }
          );
        }

        // Section number entrance
        if (num) {
          gsap.fromTo(num,
            { opacity: 0, x: -20 },
            {
              opacity: 1, x: 0, duration: 1, ease: "power3.out",
              scrollTrigger: { trigger: sectionEl, start: "top 60%", once: true },
            }
          );
        }

        // OVA word-by-word headline entrance with perspective + rotateX
        if (headline) {
          const words = headline.querySelectorAll<HTMLElement>(".word-span");
          if (words.length > 0) {
            gsap.fromTo(words,
              { opacity: 0, y: 80, rotateX: -40 },
              {
                opacity: 1, y: 0, rotateX: 0,
                duration: 1.4, ease: "power4.out",
                stagger: 0.06,
                scrollTrigger: { trigger: sectionEl, start: "top 65%", once: true },
              }
            );
          }
        }

        // Gold divider width animation
        if (divider) {
          gsap.fromTo(divider,
            { width: 0 },
            {
              width: 48, duration: 1.2, ease: "power3.inOut",
              scrollTrigger: { trigger: sectionEl, start: "top 55%", once: true },
            }
          );
        }

        // CTA entrance
        if (cta) {
          gsap.fromTo(cta,
            { opacity: 0, y: 20 },
            {
              opacity: 1, y: 0, duration: 0.8, ease: "power3.out",
              scrollTrigger: { trigger: sectionEl, start: "top 45%", once: true },
            }
          );
        }
      });
    });

    return () => ctx.revert();
  }, [sectionRefs]);

  return (
    <>
      {services.map((s, i) => {
        const isOdd = i % 2 === 0;
        const num = String(i + 1).padStart(2, "0");
        const gradient = isOdd
          ? "linear-gradient(to right, rgba(18,18,18,0.97) 45%, rgba(18,18,18,0.4) 100%)"
          : "linear-gradient(to left, rgba(18,18,18,0.97) 45%, rgba(18,18,18,0.4) 100%)";
        const mobileGradient = "linear-gradient(to top, rgba(18,18,18,0.95) 60%, rgba(18,18,18,0.5) 100%)";

        // Split headline into words for OVA-style animation
        const headlineWords = s.name.split(/\s+/);

        return (
          <section
            key={i}
            id={`service-section-${i + 1}`}
            ref={sectionRefs[i]}
            className="relative min-h-screen flex items-center overflow-hidden"
          >
            <div
              ref={(el) => { bgRefs.current[i] = el; }}
              className="absolute bg-cover bg-center will-change-transform"
              style={{
                backgroundImage: `url(${s.img})`,
                top: "-120px", bottom: "-120px", left: 0, right: 0,
              }}
            />
            <div className="absolute inset-0 hidden md:block" style={{ background: gradient }} />
            <div className="absolute inset-0 md:hidden" style={{ background: mobileGradient }} />

            <div className={`relative z-10 w-full flex justify-start md:${isOdd ? "justify-start" : "justify-end"}`}>
              <div className="px-6 md:px-20 py-20 max-w-[560px]">
                {/* Vertical gold line — OVA signature section marker */}
                <div
                  ref={(el) => { lineRefs.current[i] = el; }}
                  className="w-[2px] h-[60px] bg-gold mb-4"
                  style={{ transform: "scaleY(0)", transformOrigin: "top" }}
                />

                <p
                  ref={(el) => { numberRefs.current[i] = el; }}
                  className="font-display font-light text-[13px] tracking-[0.3em] text-gold"
                  style={{ opacity: 0 }}
                >
                  {num}
                </p>

                <h2
                  ref={(el) => { headlineRefs.current[i] = el; }}
                  className="font-display font-light text-[40px] md:text-[72px] text-jwr-text leading-[1.1] mt-4"
                  style={{ perspective: "1000px" }}
                >
                  {headlineWords.map((word, wi) => (
                    <span
                      key={wi}
                      className="word-span"
                      style={{
                        display: "inline-block",
                        willChange: "transform, opacity",
                        opacity: 0,
                        marginRight: "0.3em",
                      }}
                    >
                      {word}
                    </span>
                  ))}
                </h2>

                <div
                  ref={(el) => { dividerRefs.current[i] = el; }}
                  className="h-px bg-gold my-6"
                  style={{ width: 0 }}
                />

                <SplitText
                  as="p"
                  className="font-body font-light text-base text-jwr-muted leading-[1.8] max-w-[440px]"
                  scrub={1.5}
                  triggerStart="top 65%"
                  triggerEnd="top 30%"
                >
                  {s.desc}
                </SplitText>

                <button
                  ref={(el) => { ctaRefs.current[i] = el; }}
                  className="mt-8 font-body font-light text-[13px] tracking-[0.15em] text-gold hover:tracking-[0.25em] transition-all duration-300"
                  style={{ opacity: 0 }}
                  onClick={() => document.querySelector("#contact")?.scrollIntoView({ behavior: "smooth" })}
                >
                  Learn More →
                </button>
              </div>
            </div>
          </section>
        );
      })}
    </>
  );
};

export default ServiceSections;
