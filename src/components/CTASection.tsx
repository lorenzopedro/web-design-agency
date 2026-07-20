import React from "react";
import { motion } from "motion/react";
import { ArrowUpRight } from "lucide-react";
import FadingVideo from "./FadingVideo";

interface CTASectionProps {
  onInquireClick: () => void;
}

export default function CTASection({ onInquireClick }: CTASectionProps) {
  return (
    <section
      id="cta"
      className="relative h-screen w-full overflow-hidden bg-transparent flex flex-col justify-between py-16 md:py-24 px-6 md:px-16 lg:px-20 z-10"
    >
      {/* Cinematic Ambient Background */}
      <div className="absolute inset-0 z-0 pointer-events-none select-none overflow-hidden">
        {/* Background Looping Video (Requested by user) */}
        <video
          src="https://flow-content.google/video/8a8d30a1-8c24-4091-8743-c0b576b4933b?Expires=1784590025&KeyName=labs-flow-prod-cdn-key&Signature=uPnQ3bohW-5_9O-UgesrZFPuz44"
          autoPlay
          loop
          muted
          playsInline
          className="absolute inset-0 w-full h-full object-cover brightness-[0.4] contrast-[1.05] z-0"
        />
        {/* Gradient shadows positioned above the video and below the text content */}
        <div className="absolute inset-x-0 top-0 h-48 bg-gradient-to-b from-black/80 to-transparent pointer-events-none z-10" />
        <div className="absolute inset-x-0 bottom-0 h-48 bg-gradient-to-t from-black/80 to-transparent pointer-events-none z-10" />
        {/* Deep Ambient Glow 1 */}
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            x: [0, 40, -30, 0],
            y: [0, -50, 30, 0],
          }}
          transition={{
            duration: 18,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="absolute top-1/4 left-1/4 -translate-x-1/2 -translate-y-1/2 w-[300px] md:w-[600px] h-[300px] md:h-[600px] rounded-full bg-white/[0.03] blur-[100px] md:blur-[160px]"
        />

        {/* Deep Ambient Glow 2 */}
        <motion.div
          animate={{
            scale: [1.1, 0.9, 1.1],
            x: [0, -50, 40, 0],
            y: [0, 60, -40, 0],
          }}
          transition={{
            duration: 22,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="absolute bottom-1/4 right-1/4 translate-x-1/2 translate-y-1/2 w-[350px] md:w-[700px] h-[350px] md:h-[700px] rounded-full bg-white/[0.02] blur-[120px] md:blur-[180px]"
        />

        {/* The Central Cosmic Aura Portal Ring */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex items-center justify-center">
          <motion.div
            initial={{ scale: 0.6, opacity: 0, filter: "blur(40px)" }}
            whileInView={{ scale: 1, opacity: 1, filter: "blur(0px)" }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 1.8, ease: [0.16, 1, 0.3, 1] }}
            className="relative flex items-center justify-center"
          >
            {/* Outer dotted orbit */}
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
              className="absolute w-[280px] h-[280px] sm:w-[450px] sm:h-[450px] md:w-[600px] md:h-[600px] rounded-full border border-dashed border-white/5"
            />

            {/* Middle glowing aura ring */}
            <motion.div
              animate={{
                scale: [1, 1.05, 1],
                borderColor: [
                  "rgba(255, 255, 255, 0.04)",
                  "rgba(255, 255, 255, 0.12)",
                  "rgba(255, 255, 255, 0.04)",
                ],
              }}
              transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
              className="absolute w-[220px] h-[220px] sm:w-[350px] sm:h-[350px] md:w-[480px] md:h-[480px] rounded-full border border-white/10 shadow-[0_0_50px_rgba(255,255,255,0.02)]"
            />

            {/* Inner atmospheric core */}
            <motion.div
              animate={{
                scale: [0.95, 1.02, 0.95],
              }}
              transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
              className="absolute w-[160px] h-[160px] sm:w-[260px] sm:h-[260px] md:w-[360px] md:h-[360px] rounded-full bg-gradient-to-tr from-white/[0.01] to-white/[0.04] backdrop-blur-[2px]"
            />
          </motion.div>
        </div>
      </div>

      {/* Main Focus Centerpiece */}
      <div className="relative z-10 flex-1 flex flex-col items-center justify-center max-w-4xl mx-auto text-center mt-8 md:mt-0">
        
        {/* Subtle Category Tag */}
        <motion.div
          initial={{ opacity: 0, y: 20, filter: "blur(6px)" }}
          whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="mb-6"
        >
          <span className="text-xs font-mono tracking-[0.3em] text-white/50 uppercase">
            // The Encounter
          </span>
        </motion.div>

        {/* Dynamic Header: Cinematic Focus Pull Entrance */}
        <motion.div
          initial={{ opacity: 0, scale: 0.92, filter: "blur(20px)" }}
          whileInView={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 1.2, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          className="mb-8 md:mb-10"
        >
          <h2 className="font-heading italic text-4xl sm:text-6xl md:text-7xl lg:text-8xl tracking-[-2px] leading-[0.9] text-white font-medium">
            Shall we build<br />
            <span className="text-white/60">something singular?</span>
          </h2>
        </motion.div>

        {/* Elegant Context Text */}
        <motion.p
          initial={{ opacity: 0, y: 30, filter: "blur(8px)" }}
          whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 1.0, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
          className="text-sm sm:text-base md:text-lg text-white/70 font-body font-light leading-relaxed max-w-md md:max-w-xl mb-12"
        >
          AURA is a sanctuary for ambitious founders and brands who reject the default. We design and orchestrate experiences that build real value and command attention. Let’s create yours.
        </motion.p>

        {/* Interactive Magical CTA Button */}
        <motion.div
          initial={{ opacity: 0, scale: 0.85, filter: "blur(8px)" }}
          whileInView={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.8, delay: 0.5, ease: "easeOut" }}
          className="relative group"
        >
          {/* Pulsing ring expansions on hover */}
          <div className="absolute inset-0 rounded-full bg-white/20 blur-md opacity-0 group-hover:opacity-100 group-hover:scale-110 transition-all duration-700 pointer-events-none" />
          
          <button
            onClick={onInquireClick}
            className="relative px-8 md:px-10 py-4 sm:py-5 rounded-full bg-white text-black font-semibold text-xs sm:text-sm tracking-wider uppercase flex items-center justify-center gap-3 shadow-[0_0_30px_rgba(255,255,255,0.1)] group-hover:shadow-[0_0_45px_rgba(255,255,255,0.35)] group-hover:bg-white/95 transition-all duration-300 cursor-pointer interactive"
          >
            <span>Initiate Engagement</span>
            <motion.div
              animate={{ x: [0, 3, 0], y: [0, -3, 0] }}
              transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
            >
              <ArrowUpRight size={16} />
            </motion.div>
          </button>
        </motion.div>

      </div>

    </section>
  );
}
