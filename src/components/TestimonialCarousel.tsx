import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { ChevronLeft, ChevronRight, Quote } from "lucide-react";
import FadingVideo from "./FadingVideo";

interface Testimonial {
  id: number;
  quote: string;
  author: string;
  role: string;
  company: string;
  tags: string[];
}

const testimonials: Testimonial[] = [
  {
    id: 1,
    quote: "AURA transformed our platform from a standard SaaS interface into a breathtaking digital experience. Their precision in typography and physical layout created a cohesive system our users absolutely love.",
    author: "Elena Rostova",
    role: "VP of Product",
    company: "Aeon Labs",
    tags: ["Brand System", "UI/UX", "Component Library"],
  },
  {
    id: 2,
    quote: "Working with AURA was a revelation. They don't just write code; they orchestrate a cinematic journey. Their engineering speed matched with an absolute refusal to compromise on design is singular.",
    author: "Marcus Vance",
    role: "Founder & CEO",
    company: "Orbit Decentered",
    tags: ["Full-Stack", "Art Direction", "Next.js"],
  },
  {
    id: 3,
    quote: "The interactive detail they put into our branding systems has set a new benchmark in our industry. Every transition, every micro-interaction feels deliberate, weights perfectly, and commands attention.",
    author: "Sora Takahashi",
    role: "Creative Director",
    company: "Vela Studio",
    tags: ["Motion Design", "Visual Identity", "React"],
  },
  {
    id: 4,
    quote: "AURA didn't build a website for us; they designed a compounding visual asset. Our conversions doubled, but more importantly, our brand positioning shifted into an entirely different caliber.",
    author: "Jordan Blake",
    role: "Chief Marketing Officer",
    company: "Zeno Technologies",
    tags: ["Growth", "SEO & Analytics", "Interactive Site"],
  },
];

export default function TestimonialCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(0); // -1 for left, 1 for right

  const slideVariants = {
    enter: (dir: number) => ({
      x: dir > 0 ? 120 : -120,
      opacity: 0,
      filter: "blur(12px)",
    }),
    center: {
      x: 0,
      opacity: 1,
      filter: "blur(0px)",
      transition: {
        duration: 0.7,
        ease: [0.16, 1, 0.3, 1],
      },
    },
    exit: (dir: number) => ({
      x: dir > 0 ? -120 : 120,
      opacity: 0,
      filter: "blur(12px)",
      transition: {
        duration: 0.5,
        ease: [0.16, 1, 0.3, 1],
      },
    }),
  };

  const handleNext = () => {
    setDirection(1);
    setCurrentIndex((prevIndex) => (prevIndex + 1) % testimonials.length);
  };

  const handlePrev = () => {
    setDirection(-1);
    setCurrentIndex((prevIndex) => (prevIndex - 1 + testimonials.length) % testimonials.length);
  };

  return (
    <section
      id="testimonials"
      className="relative h-screen w-full overflow-hidden bg-black flex flex-col justify-center px-6 md:px-16 lg:px-20 z-10"
    >
      {/* Background Atmosphere Image */}
      <div className="absolute inset-0 z-0 pointer-events-none select-none overflow-hidden">
        <motion.img
          src="https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=1920&q=80"
          alt="Atmospheric Testimonials Background"
          className="absolute inset-0 w-full h-full object-cover opacity-25 mix-blend-screen"
          initial={{ scale: 1.15 }}
          whileInView={{ scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1.6, ease: [0.16, 1, 0.3, 1] }}
          referrerPolicy="no-referrer"
        />
        {/* Cinematic dark overlays to ensure readability */}
        <div className="absolute inset-0 bg-gradient-to-b from-black via-black/80 to-black" />
      </div>

      {/* Decorative vertical lines for structured Swiss grid feel */}
      <div className="absolute inset-y-0 left-10 md:left-20 w-px bg-white/[0.02] pointer-events-none z-10" />
      <div className="absolute inset-y-0 right-10 md:right-20 w-px bg-white/[0.02] pointer-events-none z-10" />

      <div className="max-w-5xl w-full mx-auto relative z-10">
        
        {/* Scroll-Triggered Section Title */}
        <motion.div
          initial={{ opacity: 0, y: 30, filter: "blur(6px)" }}
          whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.8 }}
          className="flex flex-col mb-12 md:mb-20"
        >
          <span className="text-xs font-mono tracking-[0.3em] text-white/50 uppercase mb-3">
            // Dialogue & Feedback
          </span>
          <h2 className="font-heading italic text-3xl sm:text-4xl md:text-5xl tracking-[-1.5px] leading-tight text-white">
            Partners in singular craft.
          </h2>
        </motion.div>

        {/* Carousel Container */}
        <div className="relative min-h-[380px] sm:min-h-[340px] md:min-h-[300px] flex flex-col justify-between">
          <AnimatePresence initial={false} custom={direction} mode="wait">
            <motion.div
              key={currentIndex}
              custom={direction}
              variants={slideVariants}
              initial="enter"
              animate="center"
              exit="exit"
              className="w-full grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-12 items-start"
            >
              {/* Quote Mark Icon & Main Quote Body (8 cols on desktop) */}
              <div className="md:col-span-8 flex flex-col gap-6">
                <div className="text-white/20">
                  <Quote size={40} strokeWidth={1} className="transform rotate-180" />
                </div>
                <blockquote className="font-body text-lg sm:text-xl md:text-2xl font-light text-white/90 leading-relaxed tracking-tight">
                  "{testimonials[currentIndex].quote}"
                </blockquote>
                
                {/* Meta Tags */}
                <div className="flex flex-wrap gap-2 mt-2">
                  {testimonials[currentIndex].tags.map((tag) => (
                    <span
                      key={tag}
                      className="liquid-glass rounded-full px-2.5 py-0.5 text-[9px] md:text-[10px] text-white/60 font-body uppercase tracking-wider"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              {/* Author Info Panel (4 cols on desktop) */}
              <div className="md:col-span-4 flex flex-col md:border-l md:border-white/5 md:pl-8 md:py-2">
                <div className="font-heading italic text-xl md:text-2xl text-white tracking-tight">
                  {testimonials[currentIndex].author}
                </div>
                <div className="text-xs text-white/50 font-body mt-1">
                  {testimonials[currentIndex].role}
                </div>
                <div className="text-[11px] font-mono uppercase tracking-[0.15em] text-white/40 mt-3 border-t border-white/5 pt-3">
                  {testimonials[currentIndex].company}
                </div>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Lower interactive row: Navigation controls and slide indicators */}
          <div className="flex flex-col sm:flex-row justify-between items-center gap-6 mt-12 md:mt-16 pt-8 border-t border-white/5">
            
            {/* Visual Indicators (Dynamic Line) */}
            <div className="flex items-center gap-4">
              <span className="font-mono text-[10px] text-white/30">
                0{currentIndex + 1}
              </span>
              <div className="w-24 md:w-36 h-[2px] bg-white/10 rounded-full overflow-hidden relative">
                <motion.div
                  layoutId="activeBar"
                  className="absolute h-full bg-white top-0 left-0"
                  style={{
                    width: `${((currentIndex + 1) / testimonials.length) * 100}%`,
                  }}
                  transition={{ type: "spring", stiffness: 300, damping: 30 }}
                />
              </div>
              <span className="font-mono text-[10px] text-white/30">
                0{testimonials.length}
              </span>
            </div>

            {/* Prev/Next Magnetic Navigation Buttons */}
            <div className="flex items-center gap-3">
              <motion.button
                onClick={handlePrev}
                whileHover={{ scale: 1.05, backgroundColor: "rgba(255, 255, 255, 0.05)" }}
                whileTap={{ scale: 0.95 }}
                className="liquid-glass h-10 w-10 md:h-12 md:w-12 rounded-full flex items-center justify-center text-white/75 hover:text-white border border-white/10 hover:border-white/25 transition-all cursor-pointer interactive"
                aria-label="Previous testimonial"
              >
                <ChevronLeft size={18} />
              </motion.button>
              
              <motion.button
                onClick={handleNext}
                whileHover={{ scale: 1.05, backgroundColor: "rgba(255, 255, 255, 0.05)" }}
                whileTap={{ scale: 0.95 }}
                className="liquid-glass h-10 w-10 md:h-12 md:w-12 rounded-full flex items-center justify-center text-white/75 hover:text-white border border-white/10 hover:border-white/25 transition-all cursor-pointer interactive"
                aria-label="Next testimonial"
              >
                <ChevronRight size={18} />
              </motion.button>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
}
