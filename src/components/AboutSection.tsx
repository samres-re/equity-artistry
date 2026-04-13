import { forwardRef } from "react";
import { motion } from "framer-motion";

const sectionVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.15 } },
};

const itemVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.9, ease: [0.25, 0.1, 0.25, 1] } },
};

const AboutSection = forwardRef<HTMLDivElement>((_, ref) => {
  return (
    <section
      ref={ref}
      id="about"
      className="relative min-h-[80vh] flex items-center justify-center"
    >
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: "url(https://images.unsplash.com/photo-1497366216548-37526070297c?w=1400&q=80)" }}
      />
      <div className="absolute inset-0" style={{ background: "rgba(8,8,8,0.88)" }} />

      <motion.div
        className="relative z-10 text-center max-w-[720px] px-6"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        variants={sectionVariants}
      >
        <motion.p variants={itemVariants} className="font-body font-light text-[11px] tracking-[0.35em] text-gold mb-6">
          ABOUT JWR FUNDING
        </motion.p>
        <motion.h2 variants={itemVariants} className="font-display font-light text-[56px] text-jwr-text leading-[1.1]">
          Built for complex deals.
        </motion.h2>
        <motion.p variants={itemVariants} className="font-body font-light text-base text-jwr-muted leading-[1.9] mt-8">
          JWR Funding is a private capital advisory firm with 25 years of experience arranging debt and equity across real estate, construction, and business acquisition. We operate where conventional lenders stop — structuring solutions for complex, time-sensitive, and oversized capital needs.
        </motion.p>
      </motion.div>
    </section>
  );
});

AboutSection.displayName = "AboutSection";
export default AboutSection;
