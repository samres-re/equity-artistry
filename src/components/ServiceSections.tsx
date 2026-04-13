import { forwardRef } from "react";
import { motion } from "framer-motion";

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

const sectionVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.15 } },
};

const itemVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.9, ease: [0.25, 0.1, 0.25, 1] } },
};

const ServiceSections = ({ sectionRefs }: Props) => {
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
            className="relative min-h-screen flex items-center"
          >
            <div
              className="absolute inset-0 bg-cover bg-center"
              style={{ backgroundImage: `url(${s.img})` }}
            />
            <div className="absolute inset-0" style={{ background: gradient }} />

            <motion.div
              className={`relative z-10 w-full flex ${isOdd ? "justify-start" : "justify-end"}`}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              variants={sectionVariants}
            >
              <div className="px-8 md:px-20 py-20 max-w-[560px]">
                <motion.p variants={itemVariants} className="font-display font-light text-[13px] tracking-[0.3em] text-gold">
                  {num}
                </motion.p>
                <motion.h2
                  variants={itemVariants}
                  className="font-display font-light text-jwr-text leading-[1.1] mt-4"
                  style={{ fontSize: "clamp(36px, 4vw, 64px)" }}
                >
                  {s.name}
                </motion.h2>
                <motion.div variants={itemVariants} className="w-12 h-px bg-gold my-6" />
                <motion.p variants={itemVariants} className="font-body font-light text-base text-jwr-muted leading-[1.8] max-w-[440px]">
                  {s.desc}
                </motion.p>
                <motion.button
                  variants={itemVariants}
                  className="mt-8 font-body font-light text-[13px] tracking-[0.15em] text-gold hover:tracking-[0.25em] transition-all duration-300"
                >
                  Learn More →
                </motion.button>
              </div>
            </motion.div>
          </section>
        );
      })}
    </>
  );
};

export default ServiceSections;
