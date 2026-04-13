import { useRef } from "react";
import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import MetricsSection from "@/components/MetricsSection";
import ServiceCarousel from "@/components/ServiceCarousel";
import ServiceSections from "@/components/ServiceSections";
import WhyJWRSection from "@/components/WhyJWRSection";
import AboutSection from "@/components/AboutSection";
import ContactSection from "@/components/ContactSection";
import Footer from "@/components/Footer";

const Index = () => {
  const sectionRef1 = useRef<HTMLDivElement>(null);
  const sectionRef2 = useRef<HTMLDivElement>(null);
  const sectionRef3 = useRef<HTMLDivElement>(null);
  const sectionRef4 = useRef<HTMLDivElement>(null);
  const sectionRef5 = useRef<HTMLDivElement>(null);
  const sectionRef6 = useRef<HTMLDivElement>(null);
  const sectionRef7 = useRef<HTMLDivElement>(null);
  const sectionRef8 = useRef<HTMLDivElement>(null);

  const heroRef = useRef<HTMLDivElement>(null);
  const metricsRef = useRef<HTMLDivElement>(null);
  const carouselRef = useRef<HTMLDivElement>(null);
  const whyRef = useRef<HTMLDivElement>(null);
  const aboutRef = useRef<HTMLDivElement>(null);
  const contactRef = useRef<HTMLDivElement>(null);

  const sectionRefs = [sectionRef1, sectionRef2, sectionRef3, sectionRef4, sectionRef5, sectionRef6, sectionRef7, sectionRef8];

  return (
    <div className="noise-overlay" style={{ background: "#080808" }}>
      <Navbar />
      <HeroSection ref={heroRef} />
      <MetricsSection ref={metricsRef} />
      <ServiceCarousel ref={carouselRef} />
      <ServiceSections sectionRefs={sectionRefs} />
      <WhyJWRSection ref={whyRef} />
      <AboutSection ref={aboutRef} />
      <ContactSection ref={contactRef} />
      <Footer />
    </div>
  );
};

export default Index;
