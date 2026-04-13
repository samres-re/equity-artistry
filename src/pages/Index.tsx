import { useRef, useEffect, lazy, Suspense } from "react";
import Lenis from "lenis";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import MetricsSection from "@/components/MetricsSection";

// Lazy-load below-fold sections
const ServiceCarousel = lazy(() => import("@/components/ServiceCarousel"));
const ServiceSections = lazy(() => import("@/components/ServiceSections"));
const WhyJWRSection = lazy(() => import("@/components/WhyJWRSection"));
const AboutSection = lazy(() => import("@/components/AboutSection"));
const ContactSection = lazy(() => import("@/components/ContactSection"));
const Footer = lazy(() => import("@/components/Footer"));

gsap.registerPlugin(ScrollTrigger);

const Index = () => {
  const serviceSectionRefs = Array.from({ length: 13 }, () => useRef<HTMLDivElement>(null));

  const heroRef = useRef<HTMLDivElement>(null);
  const metricsRef = useRef<HTMLDivElement>(null);
  const carouselRef = useRef<HTMLDivElement>(null);
  const whyRef = useRef<HTMLDivElement>(null);
  const aboutRef = useRef<HTMLDivElement>(null);
  const contactRef = useRef<HTMLDivElement>(null);

  // Lenis smooth scroll + GSAP ScrollTrigger sync
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.8,
      easing: (t: number) => t === 1 ? 1 : 1 - Math.pow(2, -10 * t),
      smoothWheel: true,
    });

    lenis.on("scroll", ScrollTrigger.update);

    gsap.ticker.add((time) => {
      lenis.raf(time * 1000);
    });
    gsap.ticker.lagSmoothing(0);

    return () => {
      lenis.destroy();
      gsap.ticker.remove(lenis.raf as any);
    };
  }, []);

  return (
    <div className="noise-overlay" style={{ background: "#121212" }}>
      <Navbar />
      <HeroSection ref={heroRef} />
      <MetricsSection ref={metricsRef} />
      <Suspense fallback={null}>
        <ServiceCarousel ref={carouselRef} />
        <ServiceSections sectionRefs={serviceSectionRefs} />
        <WhyJWRSection ref={whyRef} />
        <AboutSection ref={aboutRef} />
        <ContactSection ref={contactRef} />
        <Footer />
      </Suspense>
    </div>
  );
};

export default Index;
