import { forwardRef, useRef } from "react";
import { motion } from "framer-motion";

const services = [
  { name: "Ground Up Construction", tag: "Real Estate", img: "https://images.unsplash.com/photo-1486325212027-8081e485255e?w=640&q=80" },
  { name: "Commercial Real Estate", tag: "Real Estate", img: "https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=640&q=80" },
  { name: "Commercial Bridge Loans", tag: "Real Estate", img: "https://images.unsplash.com/photo-1541888946425-d81bb19240f5?w=640&q=80" },
  { name: "Equity Investments", tag: "Structured Capital", img: "https://images.unsplash.com/photo-1444653614773-995cb1ef9efa?w=640&q=80" },
  { name: "Business Acquisition", tag: "Business Capital", img: "https://images.unsplash.com/photo-1507679799987-c73779587ccf?w=640&q=80" },
  { name: "Securities-Based Lending", tag: "Structured Capital", img: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=640&q=80" },
  { name: "Medical Working Capital", tag: "Business Capital", img: "https://images.unsplash.com/photo-1565514020179-026b92b2d70b?w=640&q=80" },
  { name: "Debt Restructuring", tag: "Structured Capital", img: "https://images.unsplash.com/photo-1520607162513-77705c0f0d4a?w=640&q=80" },
];

const sectionVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.9, ease: [0.25, 0.1, 0.25, 1] } },
};

const ServiceCarousel = forwardRef<HTMLDivElement>((_, ref) => {
  const scrollRef = useRef<HTMLDivElement>(null);

  const scrollToService = (index: number) => {
    const el = document.getElementById(`service-section-${index + 1}`);
    el?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section ref={ref} id="services" className="py-[120px] noise-overlay" style={{ background: "#080808" }}>
      <motion.div
        className="px-6 md:px-12 mb-12"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        variants={sectionVariants}
      >
        <p className="font-body font-light text-[11px] tracking-[0.35em] text-gold mb-4">FINANCING SOLUTIONS</p>
        <h2 className="font-display font-light text-[48px] text-jwr-text">Every capital need. One firm.</h2>
      </motion.div>

      <div ref={scrollRef} className="flex gap-6 overflow-x-auto px-6 md:px-12 pb-4 scrollbar-hide" style={{ scrollSnapType: "x mandatory" }}>
        {services.map((s, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1, duration: 0.7 }}
            onClick={() => scrollToService(i)}
            className="flex-shrink-0 w-[280px] md:w-[320px] h-[420px] relative cursor-pointer group overflow-hidden"
            style={{ scrollSnapAlign: "start", border: "1px solid transparent" }}
          >
            <div
              className="absolute inset-0 bg-cover bg-center transition-transform duration-300 group-hover:scale-105"
              style={{ backgroundImage: `url(${s.img})` }}
            />
            <div
              className="absolute inset-0"
              style={{ background: "linear-gradient(to top, rgba(8,8,8,0.95) 40%, rgba(8,8,8,0.2) 100%)" }}
            />
            <div className="absolute inset-0 border border-transparent group-hover:border-gold/40 transition-colors duration-300" />
            <div className="absolute bottom-6 left-6 right-6">
              <h3 className="font-display font-normal text-[22px] text-jwr-text">{s.name}</h3>
              <p className="font-body font-light text-[10px] tracking-[0.2em] text-gold mt-1">{s.tag}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
});

ServiceCarousel.displayName = "ServiceCarousel";
export default ServiceCarousel;
