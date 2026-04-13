import { forwardRef } from "react";
import { motion } from "framer-motion";

const differentiators = [
  "Decisions in 24–48 hours",
  "Full project development financing from ground-up to stabilization",
  "Preferred equity and JV structures across all asset classes",
  "$500K to $10B+ ticket sizes — no deal too small or too large",
];

const sectionVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.15 } },
};

const itemVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.9, ease: [0.25, 0.1, 0.25, 1] } },
};

const WhyJWRSection = forwardRef<HTMLDivElement>((_, ref) => {
  return (
    <section ref={ref} id="why-jwr" className="py-[160px] px-6 md:px-20" style={{ background: "#0a0a0a" }}>
      <motion.div
        className="max-w-6xl mx-auto grid md:grid-cols-5 gap-16"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        variants={sectionVariants}
      >
        {/* Left quote */}
        <motion.div variants={itemVariants} className="md:col-span-2">
          <blockquote className="font-display italic font-light text-[42px] text-jwr-text leading-[1.2]">
            "Fast decisions. Creative structures. Access to capital that most lenders won't touch."
          </blockquote>
          <p className="font-body font-light text-[12px] tracking-[0.2em] text-jwr-muted mt-6">— JWR FUNDING</p>
        </motion.div>

        {/* Right differentiators */}
        <div className="md:col-span-3">
          {differentiators.map((d, i) => (
            <motion.div
              key={i}
              variants={itemVariants}
              className="py-7 group cursor-default"
              style={{ borderTop: "1px solid rgba(201,168,76,0.1)" }}
            >
              <div className="border-l-2 border-transparent group-hover:border-gold pl-4 transition-colors duration-300">
                <p className="font-body font-light text-[15px] text-jwr-text">{d}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  );
});

WhyJWRSection.displayName = "WhyJWRSection";
export default WhyJWRSection;
