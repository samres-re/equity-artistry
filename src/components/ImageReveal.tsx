import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

interface ImageRevealProps {
  src: string;
  alt?: string;
  className?: string;
  parallax?: boolean;
  parallaxAmount?: number;
  scaleReveal?: boolean;
}

/**
 * OVA-style image reveal with clip-path + scale + parallax
 */
const ImageReveal = ({
  src,
  alt = "",
  className = "",
  parallax = true,
  parallaxAmount = 80,
  scaleReveal = true,
}: ImageRevealProps) => {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const imgRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const wrapper = wrapperRef.current;
      const img = imgRef.current;
      if (!wrapper || !img) return;

      // Clip-path reveal
      if (scaleReveal) {
        gsap.fromTo(
          wrapper,
          { clipPath: "inset(100% 0% 0% 0%)" },
          {
            clipPath: "inset(0% 0% 0% 0%)",
            duration: 1.4,
            ease: "power4.inOut",
            scrollTrigger: {
              trigger: wrapper,
              start: "top 85%",
              once: true,
            },
          }
        );

        gsap.fromTo(
          img,
          { scale: 1.3 },
          {
            scale: 1,
            duration: 1.8,
            ease: "power3.out",
            scrollTrigger: {
              trigger: wrapper,
              start: "top 85%",
              once: true,
            },
          }
        );
      }

      // Parallax
      if (parallax) {
        gsap.to(img, {
          y: -parallaxAmount,
          ease: "none",
          scrollTrigger: {
            trigger: wrapper,
            start: "top bottom",
            end: "bottom top",
            scrub: 1.5,
          },
        });
      }
    });

    return () => ctx.revert();
  }, [parallax, parallaxAmount, scaleReveal]);

  return (
    <div ref={wrapperRef} className={`overflow-hidden ${className}`}>
      <div
        ref={imgRef}
        className="w-full h-full bg-cover bg-center will-change-transform"
        style={{
          backgroundImage: `url(${src})`,
          height: parallax ? `calc(100% + ${parallaxAmount * 2}px)` : "100%",
          marginTop: parallax ? `-${parallaxAmount}px` : undefined,
        }}
      >
        <img src={src} alt={alt} className="sr-only" />
      </div>
    </div>
  );
};

export default ImageReveal;
