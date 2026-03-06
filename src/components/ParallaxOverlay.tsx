"use client";

import { motion } from "framer-motion";

export default function ParallaxOverlay() {
  return (
    <div className="absolute top-0 left-0 w-full h-[400vh] pointer-events-none z-10">
      {/* Scroll indicator - fixed while scrolling */}
      <div className="sticky top-0 h-screen w-full">
        <div className="absolute bottom-12 right-6 md:right-12 flex flex-col items-center gap-3 opacity-60">
          <span className="text-[10px] md:text-xs tracking-[0.2em] font-medium text-zinc-300 uppercase rotate-90 origin-right translate-x-2 translate-y-2">Scroll</span>
          <div className="w-[1px] h-12 md:h-16 bg-zinc-700 relative overflow-hidden">
            <motion.div
              className="w-full h-1/3 bg-zinc-200 absolute top-0"
              animate={{ top: ["-33%", "100%"] }}
              transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
            />
          </div>
        </div>
      </div>

      {/* Content Sections positioned absolutely along the 500vh container */}

      {/* Section 1: 0% scroll. Side-aligned Hero composition */}
      <div className="absolute top-0 left-0 w-full h-screen flex items-center justify-start px-8 md:px-24">
        <motion.div 
          className="max-w-4xl text-left pointer-events-auto"
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
        >
          <div className="flex flex-col gap-2">
            <motion.span 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.8 }}
              className="text-amber-200/80 font-mono text-xs md:text-sm uppercase tracking-[0.4em] mb-2 block"
            >
              Available for Projects
            </motion.span>
            
            <h1 className="text-6xl md:text-8xl lg:text-9xl font-bold tracking-tighter leading-[0.9] mb-4">
              <span className="block text-white">Shubham</span>
              <span className="block bg-gradient-to-r from-zinc-200 via-white to-zinc-500 bg-clip-text text-transparent">
                Pathare
              </span>
            </h1>
            
            <div className="flex items-center gap-6 mt-4">
              <div className="h-[1px] w-12 bg-amber-200/30" />
              <p className="text-xl md:text-2xl font-light text-zinc-400 tracking-wide">
                Creative <span className="text-zinc-100 font-medium">Developer</span>
              </p>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Section 2: ~30% scroll. visually appears around 120vh. Left aligned. */}
      <div className="absolute top-[120vh] left-0 w-full h-screen flex items-center justify-start px-8 md:px-24">
        <motion.div
          className="max-w-2xl text-left pointer-events-auto"
          initial={{ opacity: 0, y: 80 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, amount: 0.5, margin: "-10%" }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
        >
          <h2 className="text-4xl md:text-6xl lg:text-7xl font-semibold tracking-tight text-white drop-shadow-lg leading-tight">
            I build digital<br />experiences.
          </h2>
        </motion.div>
      </div>

      {/* Section 3: ~60% scroll. visually appears around 240vh. Right aligned. */}
      <div className="absolute top-[240vh] left-0 w-full h-screen flex items-center justify-end px-8 md:px-24">
        <motion.div
          className="max-w-2xl text-right pointer-events-auto"
          initial={{ opacity: 0, y: 80 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, amount: 0.5, margin: "-10%" }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
        >
          <h2 className="text-4xl md:text-6xl lg:text-7xl font-semibold tracking-tight text-white drop-shadow-lg leading-tight">
            Bridging design<br />and engineering.
          </h2>
        </motion.div>
      </div>
    </div>
  );
}
