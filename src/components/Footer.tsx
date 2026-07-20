import React from "react";
import { motion } from "motion/react";
import { ArrowUpRight, ArrowUp } from "lucide-react";

interface FooterProps {
  onInquireClick: () => void;
  onScrollToCapabilities: () => void;
}

export default function Footer({ onInquireClick, onScrollToCapabilities }: FooterProps) {
  const currentYear = new Date().getFullYear();

  const navLinks = [
    { label: "Home", action: () => window.scrollTo({ top: 0, behavior: "smooth" }) },
    { label: "Capabilities", action: onScrollToCapabilities },
    { label: "Studio", action: () => window.scrollTo({ top: 0, behavior: "smooth" }) },
    { label: "Journal", action: () => {} },
    { label: "Contact", action: onInquireClick },
  ];

  const socialLinks = [
    { label: "Twitter", href: "https://twitter.com", handle: "@aurastudio" },
    { label: "Instagram", href: "https://instagram.com", handle: "@aura.design" },
    { label: "LinkedIn", href: "https://linkedin.com", handle: "aura-studio" },
    { label: "Dribbble", href: "https://dribbble.com", handle: "aura" },
  ];

  const studioLocations = [
    { city: "New York", tz: "EST (UTC-5)", active: true },
    { city: "Berlin", tz: "CET (UTC+1)", active: false },
    { city: "Tokyo", tz: "JST (UTC+9)", active: false },
  ];

  return (
    <footer className="relative bg-black border-t border-white/5 pt-16 pb-12 px-6 md:px-16 lg:px-20 z-10 w-full overflow-hidden">
      {/* Decorative subtle ambient ring fragment in the corner */}
      <div className="absolute right-0 bottom-0 pointer-events-none select-none translate-x-1/3 translate-y-1/3 opacity-30">
        <div className="w-[300px] h-[300px] rounded-full border border-white/5" />
      </div>

      <div className="max-w-7xl mx-auto">
        {/* Main Grid: Info columns */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 md:gap-8 pb-16">
          
          {/* Brand Vision Column */}
          <div className="md:col-span-5 space-y-6">
            <div className="flex items-center gap-2">
              <span className="font-heading italic text-3xl text-white tracking-tighter">aura</span>
              <span className="font-mono text-[8px] tracking-[0.2em] uppercase text-white/40 border border-white/10 rounded-full px-2 py-0.5">
                est. 2026
              </span>
            </div>
            <p className="text-xs sm:text-sm text-white/60 font-body font-light leading-relaxed max-w-sm">
              We orchestrate highly-polished, cinematic interfaces for forward-thinking builders. Crafting digital presence that rejects the default and commands authority.
            </p>
            {/* Status light */}
            <div className="flex items-center gap-2 pt-2">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white/40 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-white"></span>
              </span>
              <span className="font-mono text-[10px] tracking-widest text-white/50 uppercase">
                Available for Q3-Q4 2026 Projects
              </span>
            </div>
          </div>

          {/* Quick Links Column */}
          <div className="md:col-span-3 space-y-4">
            <h4 className="font-mono text-[10px] tracking-[0.3em] uppercase text-white/30">
              / Navigation
            </h4>
            <ul className="space-y-2.5">
              {navLinks.map((link) => (
                <li key={link.label}>
                  <button
                    onClick={link.action}
                    className="text-xs text-white/50 font-body hover:text-white transition-colors cursor-pointer flex items-center gap-1 group interactive"
                  >
                    <span>{link.label}</span>
                    <span className="opacity-0 group-hover:opacity-100 transition-opacity text-[8px] font-mono text-white/40">
                      →
                    </span>
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Social Links Column */}
          <div className="md:col-span-2 space-y-4">
            <h4 className="font-mono text-[10px] tracking-[0.3em] uppercase text-white/30">
              / Connect
            </h4>
            <ul className="space-y-2.5">
              {socialLinks.map((social) => (
                <li key={social.label}>
                  <a
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs text-white/50 font-body hover:text-white transition-colors cursor-pointer flex items-center gap-1.5 group interactive"
                  >
                    <span>{social.label}</span>
                    <ArrowUpRight size={10} className="opacity-40 group-hover:opacity-100 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Locations Column */}
          <div className="md:col-span-2 space-y-4">
            <h4 className="font-mono text-[10px] tracking-[0.3em] uppercase text-white/30">
              / Global Presence
            </h4>
            <ul className="space-y-3 font-body font-light text-xs text-white/50">
              {studioLocations.map((loc) => (
                <li key={loc.city} className="flex flex-col">
                  <span className="text-white/70 flex items-center gap-1.5">
                    {loc.city}
                    {loc.active && (
                      <span className="text-[8px] font-mono text-white/40 px-1 border border-white/15 rounded">
                        HQ
                      </span>
                    )}
                  </span>
                  <span className="text-[10px] text-white/30 font-mono mt-0.5">{loc.tz}</span>
                </li>
              ))}
            </ul>
          </div>

        </div>

        {/* Bottom Bar: Copyright and back-to-top */}
        <div className="border-t border-white/5 pt-8 flex flex-col sm:flex-row justify-between items-center text-xs text-white/40 font-body gap-4">
          <div className="flex flex-col sm:flex-row items-center gap-1 sm:gap-3 text-center sm:text-left">
            <span>© {currentYear} AURA Studio. All rights reserved.</span>
            <span className="hidden sm:inline text-white/10">|</span>
            <span className="text-[10px] font-mono tracking-wider text-white/30 uppercase">
              Singular Design & Code
            </span>
          </div>

          {/* Back to Top */}
          <motion.button
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            whileHover={{ scale: 1.05, backgroundColor: "rgba(255, 255, 255, 0.05)" }}
            whileTap={{ scale: 0.98 }}
            className="flex items-center gap-2 px-3 py-2 rounded-full border border-white/10 hover:border-white/35 transition-colors cursor-pointer interactive text-[11px] font-mono uppercase tracking-widest text-white/50 hover:text-white"
            aria-label="Scroll back to top"
          >
            <span>Back to top</span>
            <ArrowUp size={12} />
          </motion.button>
        </div>
      </div>
    </footer>
  );
}
