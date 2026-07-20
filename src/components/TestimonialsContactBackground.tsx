import React from "react";
import { motion, useTransform, MotionValue } from "motion/react";

interface TestimonialsContactBackgroundProps {
  scrollYProgress: MotionValue<number>;
}

export default function TestimonialsContactBackground({
  scrollYProgress,
}: TestimonialsContactBackgroundProps) {
  // 1. Zoom-in and Immersive Scroll Animation
  // As scrollYProgress goes from 0.1 to 0.75, the background wrapper scales up from 1.0 to 1.22
  // and gains rounded corners (0px to 32px) and a subtle drift up to increase depth.
  const scale = useTransform(scrollYProgress, [0.1, 0.45, 0.75], [1.0, 1.0, 1.22]);
  const borderRadius = useTransform(
    scrollYProgress,
    [0.1, 0.45, 0.75],
    ["0px", "0px", "32px"]
  );
  const y = useTransform(scrollYProgress, [0.1, 0.45, 0.75], [0, 0, -20]);

  // Smooth cross-fade between the Testimonials seedling video and the new Contact section video.
  // As the user scrolls from Testimonials to Contact (progress 0.35 to 0.55), they transition seamlessly.
  const video1Opacity = useTransform(scrollYProgress, [0.35, 0.55], [1, 0]);
  const video2Opacity = useTransform(scrollYProgress, [0.35, 0.55], [0, 1]);

  return (
    <div className="absolute inset-0 z-0 pointer-events-none select-none">
      {/* Sticky container that keeps the video at exactly 100vh viewport height */}
      <div className="sticky top-0 w-full h-screen overflow-hidden">
        {/* Container with scroll-driven scale, y-drift, and border radius */}
        <motion.div
          style={{ scale, borderRadius, y }}
          className="absolute inset-0 w-full h-full overflow-hidden origin-center bg-black"
        >
          {/* Video 1: Background Looping Video (Seedling growing - Testimonials) */}
          <motion.video
            src="/assets/Coffee_seedling_growing_from_soil_202607161834.mp4"
            autoPlay
            loop
            muted
            playsInline
            style={{ opacity: video1Opacity }}
            className="absolute inset-0 w-full h-full object-cover brightness-[0.45] contrast-[1.05]"
          />

          {/* Video 2: Background Looping Video (Contact Section) */}
          <motion.video
            src="https://flow-content.google/video/8a8d30a1-8c24-4091-8743-c0b576b4933b?Expires=1784590025&KeyName=labs-flow-prod-cdn-key&Signature=uPnQ3bohW-5_9O-UgesrZFPuz44"
            autoPlay
            loop
            muted
            playsInline
            style={{ opacity: video2Opacity }}
            className="absolute inset-0 w-full h-full object-cover brightness-[0.45] contrast-[1.05]"
          />

          {/* Dedicated soft gradient shadows on the top and bottom of the Contact video */}
          <motion.div
            style={{ opacity: video2Opacity }}
            className="absolute inset-0 pointer-events-none z-1"
          >
            {/* Deep, feathered top gradient shadow */}
            <div className="absolute inset-x-0 top-0 h-96 bg-gradient-to-b from-black via-black/80 to-transparent" />
            {/* Deep, feathered bottom gradient shadow */}
            <div className="absolute inset-x-0 bottom-0 h-96 bg-gradient-to-t from-black via-black/80 to-transparent" />
          </motion.div>

          {/* Ambient Dark Overlays to ensure clean text contrast and uniform black blend */}
          <div className="absolute inset-0 bg-gradient-to-b from-black via-transparent to-black" />
          <div className="absolute inset-x-0 top-0 h-40 bg-gradient-to-b from-black to-transparent" />
          <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-black to-transparent" />
          <div className="absolute inset-0 bg-black/30" />
        </motion.div>
      </div>
    </div>
  );
}

