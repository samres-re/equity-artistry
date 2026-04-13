import { forwardRef } from "react";
import { motion, useInView } from "framer-motion";
import { useRef, useEffect, useState } from "react";

const metrics = [
  { value: 10, prefix: "$", suffix: "B+", label: "Capital Arranged" },
  { value: 500, prefix: "", suffix: "+", label: "Deals Funded" },
  { value: 25, prefix: "", suffix: " Years", label: "In Business" },
];

function CountUp({ target, prefix, suffix, inView }: { target: number; prefix: string; suffix: string; inView: boolean }) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!inView) return;
    let start = 0;
    const duration = 2000;
    const startTime = performance.now();

    const tick = (now: number) => {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      start = Math.round(eased * target);
      setCount(start);
      if (progress < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  }, [inView, target]);

  return (
    <span className="font-display font-light text-[56px] text-gold tracking-[-0.02em]">
      {prefix}{count}{suffix}
    </span>
  );
}

const MetricsSection = forwardRef<HTMLDivElement>((_, ref) => {
  const viewRef = useRef<HTMLDivElement>(null);
  const inView = useInView(viewRef, { once: true, margin: "-100px" });

  return (
    <section
      ref={ref}
      className="h-[180px] flex items-center"
      style={{
        background: "#0a0a0a",
        borderTop: "1px solid rgba(201,168,76,0.1)",
        borderBottom: "1px solid rgba(201,168,76,0.1)",
      }}
    >
      <div ref={viewRef} className="w-full grid grid-cols-3 h-full">
        {metrics.map((m, i) => (
          <div
            key={i}
            className="flex flex-col items-center justify-center"
            style={{ borderRight: i < 2 ? "1px solid rgba(201,168,76,0.1)" : "none" }}
          >
            <CountUp target={m.value} prefix={m.prefix} suffix={m.suffix} inView={inView} />
            <span className="font-body font-light text-[11px] tracking-[0.25em] text-jwr-muted mt-2">{m.label}</span>
          </div>
        ))}
      </div>
    </section>
  );
});

MetricsSection.displayName = "MetricsSection";
export default MetricsSection;
