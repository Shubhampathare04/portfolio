"use client";

import { useEffect, useRef, useState } from "react";
import { useScroll, useTransform, useMotionValueEvent, MotionValue } from "framer-motion";
import { preloadImages } from "@/utils/preloadImages";

interface ScrollyCanvasProps {
  frameCount?: number;
  scrollYProgress?: MotionValue<number>;
}

export default function ScrollyCanvas({ frameCount = 120, scrollYProgress }: ScrollyCanvasProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const imagesRef = useRef<HTMLImageElement[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);
  const [loadProgress, setLoadProgress] = useState(0);
  const [currentFrame, setCurrentFrame] = useState(0);

  // Map scroll progress to frame index
  const { scrollY } = useScroll();
  const [scrollRange, setScrollRange] = useState(3000);

  useEffect(() => {
    const handleResize = () => {
      setScrollRange(window.innerHeight * 3);
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const frameIndexValue = useTransform(scrollY, [0, scrollRange], [0, frameCount - 1], {
    clamp: true 
  });

  // Utility to find the nearest loaded frame if the target isn't ready
  const findNearestLoadedFrame = (index: number) => {
    if (imagesRef.current[index]?.complete) return index;
    
    // Search outwards from the target index
    for (let i = 1; i < frameCount; i++) {
      if (index + i < frameCount && imagesRef.current[index + i]?.complete) return index + i;
      if (index - i >= 0 && imagesRef.current[index - i]?.complete) return index - i;
    }
    return -1;
  };

  // Utility to draw a specific frame on the canvas
  const drawFrame = (index: number) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    
    const clampedIndex = Math.max(0, Math.min(Math.floor(index), frameCount - 1));
    const nearestIndex = findNearestLoadedFrame(clampedIndex);
    
    if (nearestIndex !== -1) {
      const img = imagesRef.current[nearestIndex];
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
      if (currentFrame !== nearestIndex) {
        setCurrentFrame(nearestIndex);
      }
    }
  };

  useEffect(() => {
    let active = true;
    const PRIORITY_FRAMES = 15; // Load first 15 frames immediately
    
    const allUrls = Array.from({ length: frameCount }, (_, i) => {
      const num = String(i + 1).padStart(3, "0");
      return `/sequence/ezgif-frame-${num}.png`; 
    });

    const priorityUrls = allUrls.slice(0, PRIORITY_FRAMES);
    const backgroundUrls = allUrls.slice(PRIORITY_FRAMES);

    console.log(`[ScrollyCanvas] Loading priority batch (${PRIORITY_FRAMES} frames)...`);
    
    // Step 1: Load priority frames
    preloadImages(priorityUrls, (loaded, total) => {
      if (!active) return;
      const progress = Math.round((loaded / PRIORITY_FRAMES) * 100);
      // Only show up to 100% of priority for the loader
      setLoadProgress(Math.min(progress, 100));
    }).then((priorityImages) => {
      if (!active) return;
      
      // Store priority images in the main array
      priorityImages.forEach((img, i) => {
        imagesRef.current[i] = img;
      });

      setIsLoaded(true);
      console.log(`[ScrollyCanvas] Priority reveal! Loading remaining ${backgroundUrls.length} in background.`);
      
      // Draw first frame immediately
      requestAnimationFrame(() => drawFrame(0));

      // Step 2: Load background frames
      preloadImages(backgroundUrls).then((remainingImages) => {
        if (!active) return;
        remainingImages.forEach((img, i) => {
          imagesRef.current[i + PRIORITY_FRAMES] = img;
        });
        console.log(`[ScrollyCanvas] All ${frameCount} frames loaded.`);
      });
    }).catch(err => {
      console.error("[ScrollyCanvas] Init Error:", err);
      // Fallback: reveal even if error
      setIsLoaded(true);
    });
    
    return () => { active = false; };
  }, [frameCount]);

  // Sync scroll to frame
  useMotionValueEvent(frameIndexValue, "change", (latest) => {
    if (!isLoaded) return;
    drawFrame(latest);
  });

  return (
    <div className="fixed inset-0 w-full h-screen overflow-hidden bg-[#121212] z-0">
      {!isLoaded && (
        <div className="absolute inset-0 flex flex-col items-center justify-center bg-[#121212] z-50">
          <div className="relative w-24 h-24 mb-8">
            <svg className="w-full h-full transform -rotate-90">
              <circle
                cx="48"
                cy="48"
                r="45"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                className="text-zinc-800"
              />
              <circle
                cx="48"
                cy="48"
                r="45"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeDasharray={283}
                strokeDashoffset={283 - (283 * loadProgress) / 100}
                className="text-zinc-200 transition-all duration-300 ease-out"
              />
            </svg>
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="text-zinc-200 font-mono text-sm">{loadProgress}%</span>
            </div>
          </div>
          <p className="text-zinc-500 font-mono text-xs uppercase tracking-[0.3em] flex items-center gap-2">
            <span className="w-1 h-1 bg-zinc-500 rounded-full animate-pulse" />
            Initializing Sequence
          </p>
        </div>
      )}
      
      <canvas
        ref={canvasRef}
        width={1920}
        height={1080}
        className="w-full h-full object-cover block"
        style={{ 
          opacity: isLoaded ? 1 : 0,
          transition: "opacity 0.8s ease-in-out" 
        }}
      />
      
      {/* Cinematic Vignette */}
      <div className="absolute inset-0 pointer-events-none bg-gradient-to-b from-black/60 via-transparent to-black/60 z-10 opacity-60" />
    </div>
  );
}
