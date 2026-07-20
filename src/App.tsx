import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence, useScroll, useTransform } from "motion/react";
import FadingVideo from "./components/FadingVideo";
import TestimonialsContactBackground from "./components/TestimonialsContactBackground";
import BlurText from "./components/BlurText";
import CustomCursor from "./components/CustomCursor";
import CTASection from "./components/CTASection";
import Footer from "./components/Footer";
import TestimonialCarousel from "./components/TestimonialCarousel";
import {
  ArrowUpRight,
  Play,
  ClockIcon,
  GlobeIcon,
  ImageIcon,
  MovieIcon,
  LightbulbIcon,
} from "./components/Icons";

export default function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [loadingProgress, setLoadingProgress] = useState(0);
  const [loadingStep, setLoadingStep] = useState("Initializing brand environment...");
  const [showContactModal, setShowContactModal] = useState(false);
  const [showShowreel, setShowShowreel] = useState(false);
  const [contactSubmitted, setContactSubmitted] = useState(false);

  // Parallax Scroll Tracking
  const { scrollY, scrollYProgress } = useScroll();

  // Hero parallax: text slowly drifts upwards and fades out
  const heroY = useTransform(scrollY, [0, 600], [0, -100]);
  const heroOpacity = useTransform(scrollY, [0, 500], [1, 0]);

  // Video parallax: scale slightly and move downward to build dimensional deep zoom
  const heroVideoY = useTransform(scrollY, [0, 800], [0, 110]);
  const heroVideoScale = useTransform(scrollY, [0, 1000], [1, 1.06]);

  // Capabilities section scroll ref
  const capabilitiesRef = useRef<HTMLElement>(null);
  const { scrollYProgress: capabilitiesProgress } = useScroll({
    target: capabilitiesRef,
    offset: ["start end", "end start"],
  });

  // Staggered relative parallax velocities for the cards
  const card1Y = useTransform(capabilitiesProgress, [0, 1], [30, -30]);
  const card2Y = useTransform(capabilitiesProgress, [0, 1], [0, 0]); // baseline
  const card3Y = useTransform(capabilitiesProgress, [0, 1], [-30, 30]);

  // Testimonials and Contact shared scroll tracking
  const testimonialsContactRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress: testimonialsContactProgress } = useScroll({
    target: testimonialsContactRef,
    offset: ["start end", "end end"],
  });

  // Cinematic preloader progress simulator + Font Loader Detection
  useEffect(() => {
    // Lock body scroll during loading phase
    document.body.style.overflow = "hidden";

    let progressTimer: NodeJS.Timeout;
    const startTime = Date.now();
    const duration = 2200; // 2.2 seconds minimum loader experience

    const updateProgress = () => {
      const elapsed = Date.now() - startTime;
      const calculatedProgress = Math.min((elapsed / duration) * 100, 100);

      setLoadingProgress(Math.floor(calculatedProgress));

      // Dynamically cycle steps to provide premium polish
      if (calculatedProgress < 25) {
        setLoadingStep("Initializing brand environment...");
      } else if (calculatedProgress < 55) {
        setLoadingStep("Calibrating liquid glass modules...");
      } else if (calculatedProgress < 85) {
        setLoadingStep("Pre-rendering cinematic layout...");
      } else {
        setLoadingStep("Perfecting layout layers...");
      }

      if (calculatedProgress < 100) {
        progressTimer = setTimeout(updateProgress, 30);
      } else {
        // Wait until fonts are loaded and minimum loading time is met
        const checkReady = async () => {
          try {
            if (document.fonts) {
              await document.fonts.ready;
            }
          } catch (e) {
            console.warn("Font loading detection bypassed:", e);
          }
          // Small extra timeout for seamless visual finality
          setTimeout(() => {
            setIsLoading(false);
            document.body.style.overflow = "unset";
          }, 450);
        };
        checkReady();
      }
    };

    updateProgress();

    return () => {
      clearTimeout(progressTimer);
      document.body.style.overflow = "unset";
    };
  }, []);

  // Common motion variant helper for fading/blurring items
  const fadeUpVariant = (delay: number) => ({
    initial: { filter: "blur(10px)", opacity: 0, y: 20 },
    animate: { filter: "blur(0px)", opacity: 1, y: 0 },
    transition: { duration: 0.8, delay, ease: "easeOut" },
  });

  const handleContactSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setContactSubmitted(true);
  };

  const handleScrollToCapabilities = () => {
    const el = document.getElementById("capabilities");
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className="relative bg-black min-h-screen text-white select-none overflow-x-hidden">
      <CustomCursor />
      {/* Sleek Global Scroll Progress Bar (tactile loading feel) */}
      <div className="fixed bottom-0 left-0 right-0 h-[3px] bg-white/10 z-[80] pointer-events-none origin-left">
        <motion.div
          className="h-full bg-gradient-to-r from-white/30 via-white to-white/30 shadow-[0_0_8px_rgba(255,255,255,0.4)] origin-left"
          style={{ scaleX: scrollYProgress }}
        />
      </div>
      {/* ========================================================= */}
      {/* CINEMATIC PRELOADER OVERLAY                               */}
      {/* ========================================================= */}
      <AnimatePresence mode="wait">
        {isLoading && (
          <motion.div
            key="preloader"
            initial={{ opacity: 1 }}
            exit={{
              opacity: 0,
              y: -80,
              filter: "blur(25px)",
              transition: { duration: 1.0, ease: [0.16, 1, 0.3, 1] }
            }}
            className="fixed inset-0 z-[100] bg-black flex flex-col justify-between p-8 md:p-12 select-none"
          >
            {/* Top row branding */}
            <div className="flex justify-between items-center w-full">
              <span className="font-heading italic text-2xl text-white opacity-40">aura</span>
              <span className="font-body text-[10px] text-white/30 uppercase tracking-[0.2em] font-light">
                [ STUDIO INTRO ENGINE ]
              </span>
            </div>

            {/* Middle branding centerpiece */}
            <div className="flex flex-col items-center justify-center text-center">
              <motion.div
                initial={{ scale: 0.94, opacity: 0, filter: "blur(8px)" }}
                animate={{ scale: 1, opacity: 1, filter: "blur(0px)" }}
                transition={{ duration: 1.4, ease: [0.16, 1, 0.3, 1] }}
                className="space-y-4"
              >
                <h1 className="font-heading italic text-7xl sm:text-8xl md:text-9xl text-white tracking-[-4px] select-none leading-none">
                  Aura Studio
                </h1>
                <p className="font-body text-xs tracking-[0.3em] text-white/40 uppercase font-light">
                  Cinematic Web Design Agency
                </p>
              </motion.div>
            </div>

            {/* Bottom Progress details */}
            <div className="max-w-md w-full mx-auto space-y-6">
              {/* Liquid glass-like slim progress track */}
              <div className="relative h-[2px] w-full bg-white/5 rounded-full overflow-hidden">
                <motion.div
                  className="absolute left-0 top-0 h-full bg-gradient-to-r from-white/10 via-white/80 to-white/10 rounded-full"
                  style={{ width: `${loadingProgress}%` }}
                />
              </div>

              {/* Status metrics */}
              <div className="flex justify-between items-center text-xs font-body text-white/55">
                <span className="font-light tracking-wide italic">{loadingStep}</span>
                <span className="font-mono tracking-wider tabular-nums">{loadingProgress}%</span>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ========================================================= */}
      {/* NAVIGATION BAR                                            */}
      {/* ========================================================= */}
      <nav className="fixed top-2 md:top-2.5 left-0 right-0 z-50 flex justify-between items-center px-4 md:px-6 lg:px-12 pointer-events-none">
        {/* Left: Brand mark */}
        <div className="pointer-events-auto">
          <button
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            className="liquid-glass h-8 w-8 rounded-full flex items-center justify-center cursor-pointer hover:scale-105 transition-transform duration-300"
          >
            <span className="font-heading italic text-base text-white">a</span>
          </button>
        </div>

        {/* Center: Interactive navigation capsule */}
        <div className="hidden md:flex items-center gap-0.5 liquid-glass rounded-full px-1.5 py-0.5 pointer-events-auto">
          {[
            { label: "Home", action: () => window.scrollTo({ top: 0, behavior: "smooth" }) },
            { label: "Capabilities", action: handleScrollToCapabilities },
            { label: "Testimonials", action: () => {
              const el = document.getElementById("testimonials");
              if (el) el.scrollIntoView({ behavior: "smooth" });
            }},
            { label: "Contact", action: () => {
              const el = document.getElementById("cta");
              if (el) el.scrollIntoView({ behavior: "smooth" });
            }},
            { label: "GSAP Demo ↗", action: () => window.open("/scroll-transition.html", "_blank") }
          ].map((item) => (
            <button
              key={item.label}
              onClick={item.action}
              className="px-2.5 py-0.5 text-[10px] font-mono tracking-wider uppercase text-white/70 hover:text-white transition-colors cursor-pointer"
            >
              {item.label}
            </button>
          ))}
          <button
            onClick={() => setShowContactModal(true)}
            className="bg-white text-black hover:bg-white/90 rounded-full px-2.5 py-0.5 text-[9px] font-mono tracking-wider uppercase flex items-center gap-1 transition-colors ml-1 cursor-pointer shadow-md"
          >
            <span>Start</span>
            <ArrowUpRight size={10} />
          </button>
        </div>

        {/* Right: Mobile Contact Toggle & Spacer */}
        <div className="pointer-events-auto flex items-center gap-2">
          {/* Mobile project button */}
          <button
            onClick={() => setShowContactModal(true)}
            className="md:hidden bg-white text-black hover:bg-white/90 rounded-full px-2.5 py-0.5 text-[9px] font-mono tracking-wider uppercase flex items-center gap-1 transition-colors cursor-pointer"
          >
            <span>Start</span>
            <ArrowUpRight size={10} />
          </button>
          {/* Anchor spacer */}
          <div className="hidden md:block h-8 w-8" />
        </div>
      </nav>

      {/* ========================================================= */}
      {/* SECTION 1: HERO                                           */}
      {/* ========================================================= */}
      <section className="relative h-screen w-full overflow-hidden bg-black flex flex-col justify-between">
        {/* Background Atmosphere Video with Parallax */}
        <motion.div
          style={{ y: heroVideoY, scale: heroVideoScale }}
          className="absolute inset-0 z-0 pointer-events-none select-none"
        >
          <FadingVideo
            src="https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260619_191346_9d19d66e-86a4-47f7-8dc6-712c1788c3b2.mp4"
            className="absolute left-1/2 top-0 -translate-x-1/2 object-cover object-top"
            style={{ width: "120%", height: "120%" }}
          />
          {/* Subtle dark overlays to ensure readability and cinematic color range */}
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-black/30" />
        </motion.div>

        {/* Hero Content Container with Parallax and Fade */}
        <motion.div
          style={{ y: heroY, opacity: heroOpacity }}
          className="relative z-10 flex flex-col h-full justify-between pt-16 md:pt-20 pb-4 md:pb-6"
        >
          
          {/* Main Visual Centerpiece */}
          <div className="flex-1 flex flex-col items-center justify-center px-4 max-w-5xl mx-auto text-center">
            


            {/* 2. Interactive Large Headline */}
            <div className="max-w-4xl mb-3 md:mb-5">
              <BlurText
                text="Crafted Digital Experiences Built to Outlast Trends"
                className="text-4xl sm:text-5xl md:text-6xl lg:text-[4.5rem] xl:text-[5.2rem] font-heading italic text-white leading-[0.85] tracking-[-2px] md:tracking-[-3px]"
              />
            </div>

            {/* 3. Subtext Paragraph */}
            <motion.p
              {...fadeUpVariant(0.8)}
              className="text-xs sm:text-sm md:text-base text-white/80 max-w-2xl font-body font-light leading-relaxed mb-4 md:mb-6 px-2"
            >
              We are a small studio of designers and engineers shaping brand-defining websites for ambitious companies. Precise typography, cinematic motion, and code you can be proud of.
            </motion.p>

            {/* 4. Action Capsule */}
            <motion.div
              {...fadeUpVariant(1.1)}
              className="flex items-center gap-6 mb-5 md:mb-8"
            >
              <button
                onClick={() => setShowContactModal(true)}
                className="liquid-glass-strong rounded-full px-5 py-2.5 text-xs md:text-sm font-body font-medium flex items-center gap-2 hover:bg-white/[0.04] transition-all duration-300 cursor-pointer shadow-lg hover:scale-[1.02]"
              >
                <span>Start a Project</span>
                <ArrowUpRight size={14} />
              </button>
              <button
                onClick={() => setShowShowreel(true)}
                className="flex items-center gap-2 text-xs md:text-sm text-white/85 hover:text-white font-body tracking-wide font-medium transition-colors cursor-pointer group"
              >
                <div className="h-7 w-7 rounded-full bg-white/10 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                  <Play size={8} className="text-white ml-0.5" />
                </div>
                <span>Watch Showreel</span>
              </button>
            </motion.div>

            {/* 5. Metrics Grid */}
            <div className="flex flex-row gap-3 md:gap-4 justify-center items-center">
              {/* Card 1 */}
              <motion.div
                initial={{ filter: "blur(10px)", opacity: 0, y: 25 }}
                whileInView={{ filter: "blur(0px)", opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.1 }}
                transition={{ duration: 0.8, delay: 1.2, ease: "easeOut" }}
                className="liquid-glass p-3 md:p-4 w-[160px] sm:w-[190px] md:w-[210px] rounded-[1rem] md:rounded-[1.25rem] text-left hover:bg-white/[0.02] transition-colors duration-300 interactive"
              >
                <div className="text-white/60">
                  <ClockIcon size={16} />
                </div>
                <div className="text-2xl md:text-3xl lg:text-4xl font-heading italic tracking-[-1px] leading-none mt-2 md:mt-3 text-white">
                  6 Weeks
                </div>
                <div className="text-[10px] md:text-xs text-white/60 font-body font-light mt-1">
                  Average End-to-End Launch Time
                </div>
              </motion.div>

              {/* Card 2 */}
              <motion.div
                initial={{ filter: "blur(10px)", opacity: 0, y: 25 }}
                whileInView={{ filter: "blur(0px)", opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.1 }}
                transition={{ duration: 0.8, delay: 1.4, ease: "easeOut" }}
                className="liquid-glass p-3 md:p-4 w-[160px] sm:w-[190px] md:w-[210px] rounded-[1rem] md:rounded-[1.25rem] text-left hover:bg-white/[0.02] transition-colors duration-300 interactive"
              >
                <div className="text-white/60">
                  <GlobeIcon size={16} />
                </div>
                <div className="text-2xl md:text-3xl lg:text-4xl font-heading italic tracking-[-1px] leading-none mt-2 md:mt-3 text-white">
                  140+
                </div>
                <div className="text-[10px] md:text-xs text-white/60 font-body font-light mt-1">
                  Brands Shipped Across Four Continents
                </div>
              </motion.div>
            </div>

          </div>

          {/* Bottom Trust/Client Bar */}
          <motion.div
            {...fadeUpVariant(1.4)}
            className="flex flex-col items-center gap-2 px-4 w-full"
          >

            <div className="flex flex-wrap justify-center items-center gap-6 md:gap-12 mt-1 opacity-50 select-none">
              {["Aeon", "Vela", "Apex", "Orbit", "Zeno"].map((logo) => (
                <span
                  key={logo}
                  className="font-heading italic text-xl md:text-2xl tracking-tight text-white hover:opacity-100 transition-opacity duration-300"
                >
                  {logo}
                </span>
              ))}
            </div>


          </motion.div>

        </motion.div>
      </section>

      {/* ========================================================= */}
      {/* SECTION 2: CAPABILITIES                                   */}
      {/* ========================================================= */}
      <section
        id="capabilities"
        ref={capabilitiesRef}
        className="relative h-screen w-full overflow-hidden bg-black flex flex-col justify-between"
      >
        {/* Background Atmospheric Video for Section 2 */}
        <div className="absolute inset-0 z-0 pointer-events-none select-none">
          <FadingVideo
            src="https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260622_093722_ccfc7ebf-182f-419f-8a62-2dc02db7dd9d.mp4"
            className="absolute inset-0 w-full h-full object-cover"
          />
          {/* Vignette & contrast filters */}
          <div className="absolute inset-0 bg-gradient-to-b from-black via-black/50 to-black" />
        </div>

        {/* Section Content */}
        <div className="relative z-10 px-6 md:px-16 lg:px-20 pt-16 md:pt-20 pb-6 md:pb-8 flex flex-col h-full justify-between overflow-y-auto lg:overflow-hidden">
          
          {/* Header Area */}
          <motion.div
            initial={{ filter: "blur(10px)", opacity: 0, y: 30 }}
            whileInView={{ filter: "blur(0px)", opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.1 }}
            transition={{ duration: 0.8 }}
            className="mb-4 lg:mb-6"
          >
            <span className="text-xs font-mono tracking-wider text-white/60 block mb-1 md:mb-2 uppercase">
              // Capabilities
            </span>
            <h2 className="font-heading italic text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-[5.5rem] leading-[0.85] tracking-[-2px] md:tracking-[-3px] text-white whitespace-pre-line">
              {"Studio craft,\nend to end"}
            </h2>
          </motion.div>

          {/* Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6 mt-4 md:mt-6 lg:mt-8 mb-auto">
            
            {/* Card 1: Design */}
            <motion.div
              initial={{ filter: "blur(12px)", opacity: 0, y: 50 }}
              whileInView={{ filter: "blur(0px)", opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.15 }}
              transition={{ duration: 0.9, delay: 0.05, ease: "easeOut" }}
            >
              <motion.div
                style={{ y: card1Y }}
                className="liquid-glass rounded-[1.25rem] p-5 md:p-6 min-h-[220px] sm:min-h-[260px] md:min-h-[280px] lg:min-h-[320px] xl:min-h-[360px] flex flex-col justify-between hover:bg-white/[0.02] transition-colors duration-500 group"
              >
                <div className="flex justify-between items-start w-full gap-4">
                  <div className="liquid-glass h-10 w-10 md:h-11 md:w-11 rounded-[0.75rem] flex items-center justify-center text-white shrink-0">
                    <ImageIcon size={18} />
                  </div>
                  <div className="flex flex-wrap gap-1.5 justify-end">
                    {["Brand Systems", "Art Direction", "Visual Identity", "Motion"].map((tag) => (
                      <span
                        key={tag}
                        className="liquid-glass rounded-full px-2 py-0.5 text-[9px] md:text-[10px] text-white/85 font-body whitespace-nowrap"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
                <div className="mt-4 md:mt-6 lg:mt-8">
                  <h3 className="font-heading italic text-2xl md:text-3xl lg:text-4xl tracking-[-1px] leading-none text-white group-hover:translate-x-1 transition-transform duration-300">
                    Design
                  </h3>
                  <p className="text-xs md:text-sm text-white/80 font-body font-light leading-relaxed max-w-[32ch] mt-2 md:mt-3">
                    We shape identities and interfaces that feel unmistakably yours — typographic systems, component libraries, and art-directed pages that scale without losing soul.
                  </p>
                </div>
              </motion.div>
            </motion.div>
 
            {/* Card 2: Engineering */}
            <motion.div
              initial={{ filter: "blur(12px)", opacity: 0, y: 50 }}
              whileInView={{ filter: "blur(0px)", opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.15 }}
              transition={{ duration: 0.9, delay: 0.15, ease: "easeOut" }}
            >
              <motion.div
                style={{ y: card2Y }}
                className="liquid-glass rounded-[1.25rem] p-5 md:p-6 min-h-[220px] sm:min-h-[260px] md:min-h-[280px] lg:min-h-[320px] xl:min-h-[360px] flex flex-col justify-between hover:bg-white/[0.02] transition-colors duration-500 group"
              >
                <div className="flex justify-between items-start w-full gap-4">
                  <div className="liquid-glass h-10 w-10 md:h-11 md:w-11 rounded-[0.75rem] flex items-center justify-center text-white shrink-0">
                    <MovieIcon size={18} />
                  </div>
                  <div className="flex flex-wrap gap-1.5 justify-end">
                    {["React", "Next.js", "Headless CMS", "Edge-Ready"].map((tag) => (
                      <span
                        key={tag}
                        className="liquid-glass rounded-full px-2 py-0.5 text-[9px] md:text-[10px] text-white/85 font-body whitespace-nowrap"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
                <div className="mt-4 md:mt-6 lg:mt-8">
                  <h3 className="font-heading italic text-2xl md:text-3xl lg:text-4xl tracking-[-1px] leading-none text-white group-hover:translate-x-1 transition-transform duration-300">
                    Engineering
                  </h3>
                  <p className="text-xs md:text-sm text-white/80 font-body font-light leading-relaxed max-w-[32ch] mt-2 md:mt-3">
                    Production-grade front-ends built on modern stacks. Performant, accessible, and instrumented — with code your team will enjoy extending long after launch.
                  </p>
                </div>
              </motion.div>
            </motion.div>
 
            {/* Card 3: Growth */}
            <motion.div
              initial={{ filter: "blur(12px)", opacity: 0, y: 50 }}
              whileInView={{ filter: "blur(0px)", opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.15 }}
              transition={{ duration: 0.9, delay: 0.25, ease: "easeOut" }}
            >
              <motion.div
                style={{ y: card3Y }}
                className="liquid-glass rounded-[1.25rem] p-5 md:p-6 min-h-[220px] sm:min-h-[260px] md:min-h-[280px] lg:min-h-[320px] xl:min-h-[360px] flex flex-col justify-between hover:bg-white/[0.02] transition-colors duration-500 group"
              >
                <div className="flex justify-between items-start w-full gap-4">
                  <div className="liquid-glass h-10 w-10 md:h-11 md:w-11 rounded-[0.75rem] flex items-center justify-center text-white shrink-0">
                    <LightbulbIcon size={18} />
                  </div>
                  <div className="flex flex-wrap gap-1.5 justify-end">
                    {["SEO", "Analytics", "A/B Testing", "Retention"].map((tag) => (
                      <span
                        key={tag}
                        className="liquid-glass rounded-full px-2 py-0.5 text-[9px] md:text-[10px] text-white/85 font-body whitespace-nowrap"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
                <div className="mt-4 md:mt-6 lg:mt-8">
                  <h3 className="font-heading italic text-2xl md:text-3xl lg:text-4xl tracking-[-1px] leading-none text-white group-hover:translate-x-1 transition-transform duration-300">
                    Growth
                  </h3>
                  <p className="text-xs md:text-sm text-white/80 font-body font-light leading-relaxed max-w-[32ch] mt-2 md:mt-3">
                    Launch is the starting line. We partner with your team on conversion, content, and iteration loops that turn a beautiful site into a compounding asset.
                  </p>
                </div>
              </motion.div>
            </motion.div>

          </div>

        </div>
      </section>

      {/* ========================================================= */}
      {/* TESTIMONIALS & CONTACT SECTIONS (WITH SHARED SCROLL BG)   */}
      {/* ========================================================= */}
      <div ref={testimonialsContactRef} className="relative w-full">
        {/* Shared Scroll-Driven Cinematic Background */}
        <TestimonialsContactBackground scrollYProgress={testimonialsContactProgress} />

        <TestimonialCarousel />

        <CTASection onInquireClick={() => setShowContactModal(true)} />
      </div>

      {/* ========================================================= */}
      {/* FOOTER SECTION                                            */}
      {/* ========================================================= */}
      <Footer
        onInquireClick={() => setShowContactModal(true)}
        onScrollToCapabilities={handleScrollToCapabilities}
      />

      {/* ========================================================= */}
      {/* INTERACTIVE MODALS (AnimatePresence)                      */}
      {/* ========================================================= */}
      <AnimatePresence>
        {/* Contact / Start a Project Modal */}
        {showContactModal && (
          <motion.div
            initial={{ opacity: 0, backdropFilter: "blur(0px)" }}
            animate={{ opacity: 1, backdropFilter: "blur(16px)" }}
            exit={{ opacity: 0, backdropFilter: "blur(0px)" }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80"
            style={{ perspective: 1200 }}
            onClick={() => {
              setShowContactModal(false);
              setContactSubmitted(false);
            }}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0, y: 40, rotateX: 10 }}
              animate={{ scale: 1, opacity: 1, y: 0, rotateX: 0 }}
              exit={{ scale: 0.92, opacity: 0, y: 30, rotateX: -6 }}
              transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
              className="liquid-glass-strong w-full max-w-lg rounded-[2.5rem] p-8 md:p-10 relative text-left overflow-hidden border border-white/10 shadow-[0_30px_100px_rgba(0,0,0,0.8)]"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Dynamic cinematic floating ambient orbs for background depth */}
              <div className="absolute top-[-20%] right-[-10%] w-72 h-72 bg-[#5c6c5a]/20 rounded-full filter blur-[60px] pointer-events-none select-none animate-pulse duration-[8000ms]" />
              <div className="absolute bottom-[-15%] left-[-15%] w-60 h-60 bg-white/5 rounded-full filter blur-[50px] pointer-events-none select-none" />

              {/* Close Button */}
              <button
                onClick={() => {
                  setShowContactModal(false);
                  setContactSubmitted(false);
                }}
                className="absolute top-6 right-6 text-white/40 hover:text-white transition-colors h-9 w-9 rounded-full flex items-center justify-center bg-white/5 hover:bg-white/10 border border-white/5 cursor-pointer z-10"
              >
                ✕
              </button>

              {!contactSubmitted ? (
                <motion.div
                  variants={{
                    hidden: { opacity: 0 },
                    visible: {
                      opacity: 1,
                      transition: {
                        staggerChildren: 0.08,
                        delayChildren: 0.15
                      }
                    },
                    exit: {
                      opacity: 0,
                      transition: {
                        staggerChildren: 0.04,
                        staggerDirection: -1
                      }
                    }
                  }}
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                  className="relative z-10 space-y-6"
                >
                  {/* Header Title with custom fade/blur stagger */}
                  <motion.div
                    variants={{
                      hidden: { y: 20, opacity: 0, filter: "blur(6px)" },
                      visible: { y: 0, opacity: 1, filter: "blur(0px)", transition: { type: "spring", stiffness: 100, damping: 15 } },
                      exit: { y: -10, opacity: 0, filter: "blur(4px)" }
                    }}
                  >
                    <h3 className="font-heading italic text-4xl sm:text-5xl text-white tracking-tight leading-none">
                      Start a Project
                    </h3>
                    <p className="text-xs sm:text-sm font-body font-light text-white/60 mt-2">
                      Tell us about your ambition. We respond in under 24 hours.
                    </p>
                  </motion.div>

                  {/* Aesthetic Separation Line */}
                  <motion.div
                    variants={{
                      hidden: { scaleX: 0, opacity: 0 },
                      visible: { scaleX: 1, opacity: 0.2, transition: { duration: 0.8, ease: "circOut" } },
                      exit: { scaleX: 0, opacity: 0 }
                    }}
                    className="h-[1px] w-full bg-gradient-to-r from-transparent via-white to-transparent origin-center"
                  />

                  {/* Form Container with Staggered Inputs */}
                  <form onSubmit={handleContactSubmit} className="space-y-4">
                    {/* Input Block 1: Name */}
                    <motion.div
                      variants={{
                        hidden: { y: 15, opacity: 0, filter: "blur(4px)" },
                        visible: { y: 0, opacity: 1, filter: "blur(0px)", transition: { type: "spring", stiffness: 110, damping: 16 } },
                        exit: { y: -10, opacity: 0, filter: "blur(4px)" }
                      }}
                    >
                      <label className="block text-[10px] font-mono tracking-widest uppercase text-white/50 mb-1">
                        Your Name
                      </label>
                      <input
                        type="text"
                        required
                        className="w-full bg-white/[0.02] hover:bg-white/[0.04] border border-white/10 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-white/30 focus:ring-1 focus:ring-white/10 font-body transition-all duration-300 placeholder-white/20"
                        placeholder="Lorenzo Pedro"
                      />
                    </motion.div>

                    {/* Input Block 2: Email */}
                    <motion.div
                      variants={{
                        hidden: { y: 15, opacity: 0, filter: "blur(4px)" },
                        visible: { y: 0, opacity: 1, filter: "blur(0px)", transition: { type: "spring", stiffness: 110, damping: 16 } },
                        exit: { y: -10, opacity: 0, filter: "blur(4px)" }
                      }}
                    >
                      <label className="block text-[10px] font-mono tracking-widest uppercase text-white/50 mb-1">
                        Email Address
                      </label>
                      <input
                        type="email"
                        required
                        className="w-full bg-white/[0.02] hover:bg-white/[0.04] border border-white/10 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-white/30 focus:ring-1 focus:ring-white/10 font-body transition-all duration-300 placeholder-white/20"
                        placeholder="lorenzo@example.com"
                      />
                    </motion.div>

                    {/* Input Block 3: Budget */}
                    <motion.div
                      variants={{
                        hidden: { y: 15, opacity: 0, filter: "blur(4px)" },
                        visible: { y: 0, opacity: 1, filter: "blur(0px)", transition: { type: "spring", stiffness: 110, damping: 16 } },
                        exit: { y: -10, opacity: 0, filter: "blur(4px)" }
                      }}
                    >
                      <label className="block text-[10px] font-mono tracking-widest uppercase text-white/50 mb-1">
                        Budget Range
                      </label>
                      <div className="relative">
                        <select className="w-full bg-neutral-900 border border-white/10 rounded-xl px-4 py-3 text-sm text-white/90 focus:outline-none focus:border-white/30 focus:ring-1 focus:ring-white/10 font-body transition-all duration-300 appearance-none cursor-pointer">
                          <option value="15-25">$15k – $25k</option>
                          <option value="25-50">$25k – $50k</option>
                          <option value="50-100">$50k – $100k</option>
                          <option value="100+">$100k+</option>
                        </select>
                        <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-white/40 text-xs">
                          ▼
                        </div>
                      </div>
                    </motion.div>

                    {/* Input Block 4: How can we help */}
                    <motion.div
                      variants={{
                        hidden: { y: 15, opacity: 0, filter: "blur(4px)" },
                        visible: { y: 0, opacity: 1, filter: "blur(0px)", transition: { type: "spring", stiffness: 110, damping: 16 } },
                        exit: { y: -10, opacity: 0, filter: "blur(4px)" }
                      }}
                    >
                      <label className="block text-[10px] font-mono tracking-widest uppercase text-white/50 mb-1">
                        How can we help?
                      </label>
                      <textarea
                        required
                        rows={3}
                        className="w-full bg-white/[0.02] hover:bg-white/[0.04] border border-white/10 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-white/30 focus:ring-1 focus:ring-white/10 font-body transition-all duration-300 resize-none placeholder-white/20"
                        placeholder="A brand-defining cinematic web experience for..."
                      />
                    </motion.div>

                    {/* Submit Button Block */}
                    <motion.div
                      variants={{
                        hidden: { y: 20, opacity: 0, filter: "blur(6px)" },
                        visible: { y: 0, opacity: 1, filter: "blur(0px)", transition: { type: "spring", stiffness: 100, damping: 15, delay: 0.1 } },
                        exit: { y: -5, opacity: 0 }
                      }}
                      className="pt-2"
                    >
                      <button
                        type="submit"
                        className="w-full bg-white text-black hover:bg-white/95 rounded-full py-4 text-sm font-semibold flex items-center justify-center gap-2 transition-all duration-300 cursor-pointer hover:scale-[1.01] hover:shadow-[0_0_20px_rgba(255,255,255,0.2)]"
                      >
                        <span className="font-mono uppercase tracking-wider text-xs">Submit Proposal</span>
                        <ArrowUpRight size={15} />
                      </button>
                    </motion.div>
                  </form>
                </motion.div>
              ) : (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9, y: 15, filter: "blur(8px)" }}
                  animate={{ opacity: 1, scale: 1, y: 0, filter: "blur(0px)" }}
                  transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                  className="text-center py-8 space-y-6 relative z-10"
                >
                  {/* Outer circle of confirmation */}
                  <div className="relative h-20 w-20 mx-auto">
                    {/* Ring animation */}
                    <motion.div
                      initial={{ scale: 0.8, opacity: 0 }}
                      animate={{ scale: 1.15, opacity: [0, 0.3, 0] }}
                      transition={{ repeat: Infinity, duration: 2, ease: "easeOut" }}
                      className="absolute inset-0 border border-white/40 rounded-full"
                    />
                    <div className="absolute inset-0 h-20 w-20 bg-white/10 border border-white/10 rounded-full flex items-center justify-center shadow-lg">
                      <svg
                        className="h-10 w-10 text-white"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth="1.5"
                      >
                        <motion.path
                          initial={{ pathLength: 0 }}
                          animate={{ pathLength: 1 }}
                          transition={{ delay: 0.2, duration: 0.6, ease: "easeInOut" }}
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M5 13l4 4L19 7"
                        />
                      </svg>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <h4 className="font-heading italic text-4xl text-white">
                      Proposal Received
                    </h4>
                    <p className="text-sm font-body font-light text-white/70 max-w-sm mx-auto leading-relaxed">
                      Thank you! Your information has been received. Our principal designer will reach out to you within 12 hours.
                    </p>
                  </div>

                  <button
                    onClick={() => {
                      setContactSubmitted(false);
                      setShowContactModal(false);
                    }}
                    className="bg-white/10 hover:bg-white/20 text-white px-8 py-3 rounded-full text-xs font-medium font-mono uppercase tracking-wider border border-white/15 transition-all duration-300 cursor-pointer"
                  >
                    Close Window
                  </button>
                </motion.div>
              )}
            </motion.div>
          </motion.div>
        )}

        {/* Cinematic Showreel Modal */}
        {showShowreel && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/95 backdrop-blur-xl"
            onClick={() => setShowShowreel(false)}
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
              className="liquid-glass-strong w-full max-w-4xl aspect-video rounded-2xl overflow-hidden relative"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Close Button */}
              <button
                onClick={() => setShowShowreel(false)}
                className="absolute top-4 right-4 z-10 text-white/50 hover:text-white transition-colors h-8 w-8 rounded-full flex items-center justify-center bg-black/60 cursor-pointer"
              >
                ✕
              </button>

              {/* Looping beautiful stock showcase */}
              <video
                src="https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260619_191346_9d19d66e-86a4-47f7-8dc6-712c1788c3b2.mp4"
                className="w-full h-full object-cover"
                autoPlay
                controls
                playsInline
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
