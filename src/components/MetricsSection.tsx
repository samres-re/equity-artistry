import { forwardRef, useRef, useEffect, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const metrics = [
  { value: 10, prefix: "$", suffix: "B+", label: "Capital Arranged" },
  { value: 500, prefix: "", suffix: "+", label: "Deals Funded" },
  { value: 25, prefix: "", suffix: "+", label: "Years In Business" },
];

function CountUp({ target, prefix, suffix, triggered }: { target: number; prefix: string; suffix: string; triggered: boolean }) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!triggered) return;
    const duration = 2000;
    const startTime = performance.now();
    const tick = (now: number) => {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(Math.round(eased * target));
      if (progress < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  }, [triggered, target]);

  return (
    <span className="font-display font-light text-[32px] md:text-[56px] text-gold tracking-[-0.02em]">
      {prefix}{count}{suffix}
    </span>
  );
}

const MetricsSection = forwardRef<HTMLDivElement>((_, ref) => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [triggered, setTriggered] = useState(false);
  const columnsRef = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      if (!sectionRef.current) return;

      // Trigger counter on enter
      ScrollTrigger.create({
        trigger: sectionRef.current,
        start: "top 80%",
        once: true,
        onEnter: () => setTriggered(true),
      });

      // Stagger column reveals
      const cols = columnsRef.current.filter(Boolean);
      gsap.fromTo(
        cols,
        { opacity: 0, y: 30 },
        {
          opacity: 1, y: 0, duration: 1, ease: "power3.out", stagger: 0.2,
          scrollTrigger: { trigger: sectionRef.current, start: "top 80%", once: true },
        }
      );
    });
    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={(el: HTMLDivElement | null) => {
        sectionRef.current = el;
        if (typeof ref === "function") ref(el);
        else if (ref) (ref as React.MutableRefObject<HTMLDivElement | null>).current = el;
      }}
      className="h-auto min-h-[120px] md:h-[180px] flex items-center py-6 md:py-0"
      style={{
        background: "#141414",
        borderTop: "1px solid rgba(201,168,76,0.1)",
        borderBottom: "1px solid rgba(201,168,76,0.1)",
      }}
    >
      <div className="w-full grid grid-cols-3 h-full">
        {metrics.map((m, i) => (
          <div
            key={i}
            ref={(el) => { columnsRef.current[i] = el; }}
            className="flex flex-col items-center justify-center"
            style={{ borderRight: i < 2 ? "1px solid rgba(201,168,76,0.1)" : "none", opacity: 0 }}
          >
            <CountUp target={m.value} prefix={m.prefix} suffix={m.suffix} triggered={triggered} />
            <span className="font-body font-light text-[9px] md:text-[11px] tracking-[0.25em] text-jwr-muted mt-1 md:mt-2">{m.label}</span>
          </div>
        ))}
      </div>
    </section>
  );
});

MetricsSection.displayName = "MetricsSection";
export default MetricsSection;
