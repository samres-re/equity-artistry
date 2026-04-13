import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

interface SplitTextProps {
  children: string;
  className?: string;
  as?: "h1" | "h2" | "h3" | "p" | "span" | "blockquote";
  scrub?: boolean | number;
  triggerStart?: string;
  triggerEnd?: string;
  staggerAmount?: number;
  once?: boolean;
}

/**
 * OVA-style word-by-word text reveal.
 * Each word fades in + translates up, either scrub-linked or trigger-based.
 */
const SplitText = ({
  children,
  className = "",
  as: Tag = "p",
  scrub = true,
  triggerStart = "top 85%",
  triggerEnd = "top 25%",
  staggerAmount = 0.03,
  once = false,
}: SplitTextProps) => {
  const containerRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const words = el.querySelectorAll<HTMLElement>(".split-word");
    if (words.length === 0) return;

    const ctx = gsap.context(() => {
      if (scrub) {
        // Scrub-based: words reveal as user scrolls (OVA style)
        gsap.fromTo(
          words,
          { opacity: 0.15, y: 18 },
          {
            opacity: 1,
            y: 0,
            stagger: staggerAmount,
            ease: "none",
            scrollTrigger: {
              trigger: el,
              start: triggerStart,
              end: triggerEnd,
              scrub: typeof scrub === "number" ? scrub : 1,
              ...(once ? {} : {}),
            },
          }
        );
      } else {
        // Trigger-based entrance
        gsap.fromTo(
          words,
          { opacity: 0, y: 30 },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            stagger: 0.04,
            ease: "power3.out",
            scrollTrigger: {
              trigger: el,
              start: triggerStart,
              once: true,
            },
          }
        );
      }
    });

    return () => ctx.revert();
  }, [children, scrub, triggerStart, triggerEnd, staggerAmount, once]);

  // Split text into words
  const wordsArray = children.split(/(\s+)/);

  return (
    <Tag ref={containerRef as any} className={className} style={{ overflow: "hidden" }}>
      {wordsArray.map((word, i) =>
        word.match(/^\s+$/) ? (
          <span key={i}> </span>
        ) : (
          <span
            key={i}
            className="split-word"
            style={{
              display: "inline-block",
              willChange: "transform, opacity",
            }}
          >
            {word}
          </span>
        )
      )}
    </Tag>
  );
};

export default SplitText;
