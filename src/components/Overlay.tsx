"use client";

import { motion, MotionValue, useTransform } from "framer-motion";

interface OverlayProps {
  scrollYProgress: MotionValue<number>;
}

export default function Overlay({ scrollYProgress }: OverlayProps) {
  // Section 1: 0% to 20%
  const opacity1 = useTransform(scrollYProgress, [0, 0.1, 0.2], [1, 1, 0]);
  const y1 = useTransform(scrollYProgress, [0, 0.2], [0, -100]);

  // Section 2: 30% to 50%
  const opacity2 = useTransform(scrollYProgress, [0.2, 0.3, 0.4, 0.5], [0, 1, 1, 0]);
  const y2 = useTransform(scrollYProgress, [0.2, 0.5], [100, -100]);

  // Section 3: 60% to 80%
  const opacity3 = useTransform(scrollYProgress, [0.5, 0.6, 0.7, 0.8], [0, 1, 1, 0]);
  const y3 = useTransform(scrollYProgress, [0.5, 0.8], [100, -100]);

  return (
    <div className="absolute top-0 left-0 w-full h-full pointer-events-none z-10">
      <div className="sticky top-0 h-screen w-full flex flex-col justify-center overflow-hidden">
        
        {/* Section 1 */}
        <motion.div 
          style={{ opacity: opacity1, y: y1 }}
          className="absolute inset-x-0 flex flex-col items-center justify-center text-center px-4"
        >
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-black tracking-tighter text-white mb-4 drop-shadow-2xl">
            Shubham Pathare
          </h1>
          <p className="text-xl md:text-3xl text-white/80 font-medium tracking-wide">
            Creative Developer.
          </p>
        </motion.div>

        {/* Section 2 */}
        <motion.div 
          style={{ opacity: opacity2, y: y2 }}
          className="absolute left-6 md:left-24 max-w-3xl pr-6"
        >
          <h2 className="text-4xl md:text-6xl lg:text-7xl font-bold text-white leading-tight drop-shadow-xl">
            I build digital <span className="text-indigo-400">experiences</span>.
          </h2>
          <p className="mt-6 text-lg md:text-xl text-white/70 max-w-lg">
            Specializing in high-performance web applications, interactive media, and seamless user interfaces.
          </p>
        </motion.div>

        {/* Section 3 */}
        <motion.div 
          style={{ opacity: opacity3, y: y3 }}
          className="absolute right-6 md:right-24 max-w-3xl pl-6 text-right"
        >
          <h2 className="text-4xl md:text-6xl lg:text-7xl font-bold text-white leading-tight drop-shadow-xl">
            Bridging <span className="text-teal-400">design</span> <br /> and engineering.
          </h2>
          <p className="mt-6 text-lg md:text-xl text-white/70 ml-auto max-w-lg">
            Turning bold creative concepts into robust, scalable code. Functionality that feels like magic.
          </p>
        </motion.div>

      </div>
    </div>
  );
}
