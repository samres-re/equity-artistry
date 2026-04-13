import { forwardRef, useState } from "react";
import { motion } from "framer-motion";

const financingTypes = [
  "Ground Up Construction", "Commercial Real Estate", "Commercial Bridge Loans",
  "Equity Investments", "Business Acquisition", "Securities-Based Lending",
  "Medical Working Capital", "Debt Restructuring", "SBA Loans",
  "Mezzanine Financing", "Joint Venture Equity", "Portfolio Refinance",
  "Working Capital", "Equipment Financing",
];

const sectionVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.15 } },
};

const itemVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.9, ease: [0.25, 0.1, 0.25, 1] } },
};

const inputClass =
  "w-full bg-transparent font-body font-light text-jwr-text py-4 border-b border-gold/20 focus:border-gold outline-none transition-colors duration-300 placeholder:text-jwr-dim text-[14px]";

const ContactSection = forwardRef<HTMLDivElement>((_, ref) => {
  const [form, setForm] = useState({
    name: "", company: "", phone: "", email: "", type: "", amount: "", description: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  return (
    <section ref={ref} id="contact" className="py-[160px] px-6 md:px-20 noise-overlay" style={{ background: "#080808" }}>
      <motion.div
        className="max-w-6xl mx-auto grid md:grid-cols-2 gap-20"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        variants={sectionVariants}
      >
        {/* Left */}
        <motion.div variants={itemVariants}>
          <p className="font-body font-light text-[11px] tracking-[0.35em] text-gold mb-4">GET STARTED</p>
          <h2 className="font-display font-light text-[48px] text-jwr-text leading-[1.1]">Tell us about your deal.</h2>
          <p className="font-body font-light text-[15px] text-jwr-muted mt-6 leading-[1.7]">
            Submit your details and a member of our team will respond within 24 hours.
          </p>
          <p className="font-display font-normal text-[20px] text-gold mt-10">(267) 969-0520</p>
          <p className="font-body font-light text-[14px] text-jwr-muted mt-2">jwinick31@gmail.com</p>
        </motion.div>

        {/* Right - Form */}
        <motion.form variants={itemVariants} className="flex flex-col gap-2" onSubmit={(e) => e.preventDefault()}>
          <input name="name" placeholder="Full Name" className={inputClass} value={form.name} onChange={handleChange} />
          <input name="company" placeholder="Company Name" className={inputClass} value={form.company} onChange={handleChange} />
          <input name="phone" placeholder="Phone Number" className={inputClass} value={form.phone} onChange={handleChange} />
          <input name="email" placeholder="Email Address" type="email" className={inputClass} value={form.email} onChange={handleChange} />
          <select
            name="type"
            className={`${inputClass} appearance-none cursor-pointer`}
            value={form.type}
            onChange={handleChange}
            style={{ color: form.type ? "#F0EDE6" : "#3A3A3A" }}
          >
            <option value="" disabled>Financing Type</option>
            {financingTypes.map((t) => (
              <option key={t} value={t} className="bg-jwr-bg text-jwr-text">{t}</option>
            ))}
          </select>
          <input name="amount" placeholder="Loan Amount Requested" className={inputClass} value={form.amount} onChange={handleChange} />
          <textarea
            name="description"
            placeholder="Brief Project Description"
            rows={4}
            className={`${inputClass} resize-none`}
            value={form.description}
            onChange={handleChange}
          />
          <button
            type="submit"
            className="w-full bg-gold text-jwr-bg font-display font-normal text-[18px] tracking-[0.15em] py-[18px] mt-6 hover:bg-gold-light transition-colors duration-300"
          >
            Submit
          </button>
        </motion.form>
      </motion.div>
    </section>
  );
});

ContactSection.displayName = "ContactSection";
export default ContactSection;
