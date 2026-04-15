import { forwardRef, useState, useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import SplitText from "./SplitText";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

gsap.registerPlugin(ScrollTrigger);

const financingTypes = [
  "Ground Up Construction", "Commercial Real Estate", "Commercial Bridge Loans",
  "Fix and Flip", "Equity Investments", "Business Acquisition",
  "Securities-Based Lending", "Business Term Loans", "Unsecured Business Loans",
  "Accounts Receivable", "Equipment Financing", "Medical Working Capital",
  "Debt Restructuring", "SBA Loans", "Mezzanine Financing",
  "Joint Venture Equity", "Portfolio Refinance", "Working Capital",
];

const inputClass =
  "w-full bg-transparent font-body font-light text-jwr-text py-4 border-b border-gold/20 focus:border-gold outline-none transition-colors duration-300 placeholder:text-jwr-dim text-[14px]";

const ContactSection = forwardRef<HTMLDivElement>((_, ref) => {
  const [form, setForm] = useState({
    name: "", company: "", phone: "", email: "", type: "", amount: "", description: "",
  });
  const [submitting, setSubmitting] = useState(false);
  const leftRef = useRef<HTMLDivElement>(null);
  const formRef = useRef<HTMLFormElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      if (leftRef.current) {
        gsap.fromTo(leftRef.current,
          { opacity: 0, x: -40 },
          {
            opacity: 1, x: 0, duration: 1.2, ease: "power3.out",
            scrollTrigger: { trigger: leftRef.current, start: "top 75%", once: true },
          }
        );
      }

      if (formRef.current) {
        const fields = formRef.current.children;
        gsap.fromTo(
          Array.from(fields),
          { opacity: 0, y: 25 },
          {
            opacity: 1, y: 0, duration: 0.7, ease: "power3.out",
            stagger: 0.08,
            scrollTrigger: { trigger: formRef.current, start: "top 75%", once: true },
          }
        );
      }
    });
    return () => ctx.revert();
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!form.name.trim() || !form.email.trim()) {
      toast.error("Please fill in your name and email.");
      return;
    }

    setSubmitting(true);

    try {
      const id = crypto.randomUUID();

      const { error } = await supabase.from("contact_submissions").insert({
        id,
        name: form.name.trim(),
        company: form.company.trim() || null,
        phone: form.phone.trim() || null,
        email: form.email.trim(),
        financing_type: form.type || null,
        amount: form.amount.trim() || null,
        description: form.description.trim() || null,
      });

      if (error) throw error;

      // Send notification email to Jeff
      await supabase.functions.invoke("send-transactional-email", {
        body: {
          templateName: "new-lead-notification",
          recipientEmail: "jwinick31@gmail.com",
          idempotencyKey: `lead-notify-${id}`,
          templateData: {
            name: form.name.trim(),
            company: form.company.trim(),
            phone: form.phone.trim(),
            email: form.email.trim(),
            financingType: form.type,
            amount: form.amount.trim(),
            description: form.description.trim(),
          },
        },
      });

      toast.success("Your inquiry has been submitted. We'll be in touch shortly.");
      setForm({ name: "", company: "", phone: "", email: "", type: "", amount: "", description: "" });
    } catch (err) {
      console.error("Submission error:", err);
      toast.error("Something went wrong. Please try again or call us directly.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section ref={ref} id="contact" className="py-[80px] md:py-[160px] px-6 md:px-20 noise-overlay" style={{ background: "#121212" }}>
      <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-20">
        <div ref={leftRef} style={{ opacity: 0 }}>
          <p className="font-body font-light text-[11px] tracking-[0.35em] text-gold mb-4">GET STARTED</p>
          <SplitText as="h2" className="font-display font-light text-[42px] md:text-[80px] text-jwr-text leading-[1.1]" scrub={false} triggerStart="top 80%">
            Tell us about your deal.
          </SplitText>
          <p className="font-body font-light text-[15px] text-jwr-muted mt-6 leading-[1.7]">
            Submit your details and a member of our team will respond within 24 hours.
          </p>
          <p className="font-display font-normal text-[20px] text-gold mt-10">(267) 969-0520</p>
          <p className="font-body font-light text-[14px] text-jwr-muted mt-2">jwinick31@gmail.com</p>
        </div>

        <form ref={formRef} className="flex flex-col gap-2" onSubmit={handleSubmit}>
          <input name="name" placeholder="Full Name" className={inputClass} value={form.name} onChange={handleChange} style={{ opacity: 0 }} required />
          <input name="company" placeholder="Company Name" className={inputClass} value={form.company} onChange={handleChange} style={{ opacity: 0 }} />
          <input name="phone" placeholder="Phone Number" className={inputClass} value={form.phone} onChange={handleChange} style={{ opacity: 0 }} />
          <input name="email" placeholder="Email Address" type="email" className={inputClass} value={form.email} onChange={handleChange} style={{ opacity: 0 }} required />
          <select
            name="type"
            className={`${inputClass} appearance-none cursor-pointer`}
            value={form.type}
            onChange={handleChange}
            style={{ color: form.type ? "#F0EDE6" : "#3A3A3A", opacity: 0 }}
          >
            <option value="" disabled>Financing Type</option>
            {financingTypes.map((t) => (
              <option key={t} value={t} className="bg-jwr-bg text-jwr-text">{t}</option>
            ))}
          </select>
          <input name="amount" placeholder="Loan Amount Requested" className={inputClass} value={form.amount} onChange={handleChange} style={{ opacity: 0 }} />
          <textarea
            name="description"
            placeholder="Brief Project Description"
            rows={4}
            className={`${inputClass} resize-none`}
            value={form.description}
            onChange={handleChange}
            style={{ opacity: 0 }}
          />
          <button
            type="submit"
            disabled={submitting}
            className="w-full bg-gold text-jwr-bg font-display font-normal text-[18px] tracking-[0.15em] py-[18px] mt-6 hover:bg-gold-light transition-colors duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
            style={{ opacity: 0 }}
          >
            {submitting ? "Submitting..." : "Submit"}
          </button>
        </form>
      </div>
    </section>
  );
});

ContactSection.displayName = "ContactSection";
export default ContactSection;
