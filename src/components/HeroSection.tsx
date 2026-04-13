import { useState, useEffect, forwardRef } from "react";
import { motion } from "framer-motion";

const words = ["operators.", "sponsors.", "developers.", "investors."];

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.3 } },
};

const itemVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.9, ease: [0.25, 0.1, 0.25, 1] } },
};

const HeroSection = forwardRef<HTMLDivElement>((_, ref) => {
  const [wordIndex, setWordIndex] = useState(0);
  const [visible, setVisible] = useState(true);

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

  const scrollTo = (id: string) => {
    document.querySelector(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section ref={ref} className="relative h-screen flex items-center justify-center noise-overlay" style={{ background: "#080808" }}>
      {/* EST */}
      <div className="absolute top-24 left-6 md:left-12 font-body font-light text-[11px] tracking-[0.2em] text-jwr-dim">
        EST. 2000
      </div>

      <motion.div
        className="text-center px-6 max-w-4xl"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <motion.p variants={itemVariants} className="font-body font-light text-[11px] tracking-[0.35em] text-gold mb-8">
          PRIVATE CAPITAL ADVISORY
        </motion.p>

        <motion.h1
          variants={itemVariants}
          className="font-display font-light text-jwr-text leading-[1.05]"
          style={{ fontSize: "clamp(52px, 7vw, 96px)" }}
        >
          Capital solutions for
          <br />
          serious{" "}
          <span
            className="text-gold inline-block transition-all duration-400"
            style={{
              opacity: visible ? 1 : 0,
              transform: visible ? "translateY(0)" : "translateY(-10px)",
              transition: "opacity 400ms, transform 400ms",
            }}
          >
            {words[wordIndex]}
          </span>
        </motion.h1>

        <motion.p variants={itemVariants} className="font-body font-light text-base text-jwr-muted max-w-[480px] mx-auto mt-8 leading-[1.7]">
          Arranging debt and equity up to $10B+ across real estate, construction, and business capital since 1999.
        </motion.p>

        <motion.div variants={itemVariants} className="flex items-center justify-center gap-4 mt-10">
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
        </motion.div>
      </motion.div>

      {/* Bottom line + scroll indicator */}
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
