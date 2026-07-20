import React, { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "motion/react";

export default function CustomCursor() {
  const [isHovered, setIsHovered] = useState(false);
  const [isClicking, setIsClicking] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [isTouchDevice, setIsTouchDevice] = useState(false);

  // Position of outer 24px circle
  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);

  // Spring settings for the delayed cinematic outer ring
  const ringX = useSpring(cursorX, { damping: 30, stiffness: 220, mass: 0.6 });
  const ringY = useSpring(cursorY, { damping: 30, stiffness: 220, mass: 0.6 });

  // Center the 6px dot inside the 24px outer circle (offset by 9px)
  const dotXRaw = useTransform(cursorX, (v) => v + 9);
  const dotYRaw = useTransform(cursorY, (v) => v + 9);

  // Faster spring for the inner pointer to create cohesive physical separation
  const dotX = useSpring(dotXRaw, { damping: 35, stiffness: 450 });
  const dotY = useSpring(dotYRaw, { damping: 35, stiffness: 450 });

  useEffect(() => {
    // Detect touch device or lack of fine pointer to hide cursor gracefully
    const checkTouch = () => {
      const hasTouch =
        "ontouchstart" in window ||
        navigator.maxTouchPoints > 0 ||
        window.matchMedia("(pointer: coarse)").matches;
      setIsTouchDevice(hasTouch);
    };

    checkTouch();
    window.addEventListener("resize", checkTouch);

    if (isTouchDevice) {
      document.body.classList.remove("nocursor");
      return;
    }

    document.body.classList.add("nocursor");

    const moveCursor = (e: MouseEvent) => {
      cursorX.set(e.clientX - 12);
      cursorY.set(e.clientY - 12);
      if (!isVisible) setIsVisible(true);
    };

    const handleMouseDown = () => setIsClicking(true);
    const handleMouseUp = () => setIsClicking(false);

    // Track when mouse leaves the document window
    const handleMouseLeaveWindow = () => setIsVisible(false);
    const handleMouseEnterWindow = () => setIsVisible(true);

    window.addEventListener("mousemove", moveCursor);
    window.addEventListener("mousedown", handleMouseDown);
    window.addEventListener("mouseup", handleMouseUp);
    document.body.addEventListener("mouseleave", handleMouseLeaveWindow);
    document.body.addEventListener("mouseenter", handleMouseEnterWindow);

    // Track hovers dynamically via event delegation on interactive selectors
    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement | null;
      if (!target) return;

      const isInteractive =
        target.tagName === "BUTTON" ||
        target.tagName === "A" ||
        target.closest("button") ||
        target.closest("a") ||
        target.closest(".interactive") ||
        target.getAttribute("role") === "button";

      if (isInteractive) {
        setIsHovered(true);
      } else {
        setIsHovered(false);
      }
    };

    window.addEventListener("mouseover", handleMouseOver);

    return () => {
      document.body.classList.remove("nocursor");
      window.removeEventListener("resize", checkTouch);
      window.removeEventListener("mousemove", moveCursor);
      window.removeEventListener("mousedown", handleMouseDown);
      window.removeEventListener("mouseup", handleMouseUp);
      document.body.removeEventListener("mouseleave", handleMouseLeaveWindow);
      document.body.removeEventListener("mouseenter", handleMouseEnterWindow);
      window.removeEventListener("mouseover", handleMouseOver);
    };
  }, [cursorX, cursorY, isTouchDevice, isVisible]);

  if (isTouchDevice || !isVisible) return null;

  return (
    <>
      {/* Outer cinematic halo ring */}
      <motion.div
        className="fixed top-0 left-0 w-6 h-6 rounded-full border border-white/40 pointer-events-none z-[999] mix-blend-screen"
        style={{
          x: ringX,
          y: ringY,
          scale: isHovered ? 1.5 : isClicking ? 0.8 : 1,
          backgroundColor: isHovered ? "rgba(255, 255, 255, 0.08)" : "transparent",
          borderColor: isHovered ? "rgba(255, 255, 255, 0.8)" : "rgba(255, 255, 255, 0.4)",
          boxShadow: isHovered ? "0 0 12px rgba(255, 255, 255, 0.15)" : "none",
        }}
        transition={{
          scale: { type: "spring", stiffness: 400, damping: 25 },
          backgroundColor: { duration: 0.2 },
          borderColor: { duration: 0.2 },
        }}
      />

      {/* Inner physical laser point */}
      <motion.div
        className="fixed top-0 left-0 w-1 h-1 rounded-full bg-white pointer-events-none z-[999] mix-blend-screen"
        style={{
          x: dotX,
          y: dotY,
          scale: isClicking ? 1.5 : 1,
        }}
        transition={{
          scale: { type: "spring", stiffness: 500, damping: 30 },
        }}
      />
    </>
  );
}
