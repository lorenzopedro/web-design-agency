import React, { useEffect, useRef, useState } from "react";

interface FadingVideoProps {
  src: string | string[];
  className?: string;
  style?: React.CSSProperties;
}

export default function FadingVideo({ src, className, style }: FadingVideoProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const fadeAnimationRef = useRef<number | null>(null);
  const isFadingOut = useRef(false);
  const currentOpacityRef = useRef(0);

  const currentSrc = Array.isArray(src) ? src[currentIndex] : src;

  // Helper to change style opacity directly
  const setVideoOpacity = (val: number) => {
    currentOpacityRef.current = val;
    if (videoRef.current) {
      videoRef.current.style.opacity = val.toString();
    }
  };

  const fadeTo = (targetOpacity: number, duration: number, callback?: () => void) => {
    if (fadeAnimationRef.current) {
      cancelAnimationFrame(fadeAnimationRef.current);
    }
    const startOpacity = currentOpacityRef.current;
    const startTime = performance.now();

    const animate = (now: number) => {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const currentOpacity = startOpacity + (targetOpacity - startOpacity) * progress;
      setVideoOpacity(currentOpacity);

      if (progress < 1) {
        fadeAnimationRef.current = requestAnimationFrame(animate);
      } else {
        fadeAnimationRef.current = null;
        if (callback) callback();
      }
    };

    fadeAnimationRef.current = requestAnimationFrame(animate);
  };

  // Clean up animation frame on unmount
  useEffect(() => {
    return () => {
      if (fadeAnimationRef.current) {
        cancelAnimationFrame(fadeAnimationRef.current);
      }
    };
  }, []);

  // When source index changes, reset video opacity and properties
  useEffect(() => {
    setVideoOpacity(0);
    isFadingOut.current = false;
  }, [currentIndex, currentSrc]);

  const handleLoadedData = () => {
    isFadingOut.current = false;
    fadeTo(1, 500);
  };

  const handleTimeUpdate = () => {
    const video = videoRef.current;
    if (!video) return;

    const remaining = video.duration - video.currentTime;
    if (remaining <= 0.55 && !isFadingOut.current && video.duration > 0) {
      isFadingOut.current = true;
      fadeTo(0, 550);
    }
  };

  const handleEnded = () => {
    const video = videoRef.current;
    if (!video) return;

    if (Array.isArray(src)) {
      // Advance to next index (cycling)
      const nextIndex = (currentIndex + 1) % src.length;
      setCurrentIndex(nextIndex);
    } else {
      // If single source: resets currentTime to 0, replays, fades back in
      video.currentTime = 0;
      video.play().catch((err) => console.log("Video playback interrupted:", err));
      isFadingOut.current = false;
      fadeTo(1, 500);
    }
  };

  return (
    <video
      ref={videoRef}
      id={`bg-video-${Array.isArray(src) ? currentIndex : "single"}`}
      src={currentSrc}
      className={className}
      style={{
        ...style,
        opacity: 0, // Starts with opacity: 0
      }}
      autoPlay
      muted
      playsInline
      preload="auto"
      onLoadedData={handleLoadedData}
      onTimeUpdate={handleTimeUpdate}
      onEnded={handleEnded}
    />
  );
}
