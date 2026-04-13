import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const services = [
  { name: "Ground Up Construction Leasing", desc: "Full-cycle financing for ground-up development projects. We structure debt and equity from site acquisition through vertical construction and certificate of occupancy.", img: "https://images.unsplash.com/photo-1486325212027-8081e485255e?w=1400&q=80" },
  { name: "Commercial Real Estate Financing", desc: "Senior debt, bridge, and permanent financing across multifamily, industrial, office, and mixed-use assets. Competitive terms from $1M to $500M+.", img: "https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=1400&q=80" },
  { name: "Commercial Bridge Loans", desc: "Short-term bridge capital for acquisitions, recapitalizations, and transitional assets. Fast closings, flexible structures, and certainty of execution.", img: "https://images.unsplash.com/photo-1541888946425-d81bb19240f5?w=1400&q=80" },
  { name: "Equity Investments", desc: "Preferred equity and JV structures for sponsors who need capital above the senior debt but below common equity. We invest where conventional lenders won't.", img: "https://images.unsplash.com/photo-1444653614773-995cb1ef9efa?w=1400&q=80" },
  { name: "Business Acquisition Financing", desc: "Structured capital solutions for acquisitions of operating businesses. We arrange senior debt, mezzanine, and equity co-investment for qualified buyers.", img: "https://images.unsplash.com/photo-1507679799987-c73779587ccf?w=1400&q=80" },
  { name: "Securities-Based Lending", desc: "Leverage your liquid portfolio without triggering a taxable event. We arrange non-purpose loans against publicly traded securities, private equity interests, and alternatives.", img: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=1400&q=80" },
  { name: "Medical Working Capital", desc: "Revenue-based working capital for medical practices, outpatient facilities, and healthcare operators. Fast approvals, minimal documentation.", img: "https://images.unsplash.com/photo-1565514020179-026b92b2d70b?w=1400&q=80" },
  { name: "Debt Restructuring", desc: "Distressed debt advisory and recapitalization for borrowers facing maturity defaults, covenant breaches, or over-leveraged capital stacks. Discreet, experienced, results-driven.", img: "https://images.unsplash.com/photo-1520607162513-77705c0f0d4a?w=1400&q=80" },
];

interface Props {
  sectionRefs: React.RefObject<HTMLDivElement | null>[];
}

const ServiceSections = ({ sectionRefs }: Props) => {
  const bgRefs = useRef<(HTMLDivElement | null)[]>([]);
  const textBlockRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      services.forEach((_, i) => {
        const sectionEl = sectionRefs[i]?.current;
        const bgEl = bgRefs.current[i];
        const textEl = textBlockRefs.current[i];

        if (!sectionEl) return;

        // Parallax on background image
        if (bgEl) {
          gsap.to(bgEl, {
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

        // Text entrance with stagger
        if (textEl) {
          const children = textEl.children;
          gsap.fromTo(
            Array.from(children),
            { opacity: 0, y: 60 },
            {
              opacity: 1, y: 0, duration: 1.2, ease: "power3.out",
              stagger: 0.15,
              scrollTrigger: {
                trigger: sectionEl,
                start: "top 70%",
                once: true,
              },
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
          ? "linear-gradient(to right, rgba(8,8,8,0.97) 45%, rgba(8,8,8,0.4) 100%)"
          : "linear-gradient(to left, rgba(8,8,8,0.97) 45%, rgba(8,8,8,0.4) 100%)";

        return (
          <section
            key={i}
            id={`service-section-${i + 1}`}
            ref={sectionRefs[i]}
            className="relative min-h-screen flex items-center overflow-hidden"
          >
            <div
              ref={(el) => { bgRefs.current[i] = el; }}
              className="absolute inset-0 bg-cover bg-center will-change-transform"
              style={{ backgroundImage: `url(${s.img})`, top: "-40px", bottom: "-40px" }}
            />
            <div className="absolute inset-0" style={{ background: gradient }} />

            <div className={`relative z-10 w-full flex ${isOdd ? "justify-start" : "justify-end"}`}>
              <div
                ref={(el) => { textBlockRefs.current[i] = el; }}
                className="px-8 md:px-20 py-20 max-w-[560px]"
              >
                <p className="font-display font-light text-[13px] tracking-[0.3em] text-gold" style={{ opacity: 0 }}>
                  {num}
                </p>
                <h2
                  className="font-display font-light text-jwr-text leading-[1.1] mt-4"
                  style={{ fontSize: "clamp(36px, 4vw, 64px)", opacity: 0 }}
                >
                  {s.name}
                </h2>
                <div className="w-12 h-px bg-gold my-6" style={{ opacity: 0 }} />
                <p className="font-body font-light text-base text-jwr-muted leading-[1.8] max-w-[440px]" style={{ opacity: 0 }}>
                  {s.desc}
                </p>
                <button
                  className="mt-8 font-body font-light text-[13px] tracking-[0.15em] text-gold hover:tracking-[0.25em] transition-all duration-300"
                  style={{ opacity: 0 }}
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
