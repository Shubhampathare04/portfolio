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
  const [currentFrame, setCurrentFrame] = useState(0);

  // Map scroll progress to frame index
  // We'll use the first 300vh of the page for the animation
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

  // Utility to draw a specific frame on the canvas
  const drawFrame = (index: number) => {
    const canvas = canvasRef.current;
    if (!canvas || imagesRef.current.length === 0) return;
    
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    
    const clampedIndex = Math.max(0, Math.min(Math.floor(index), imagesRef.current.length - 1));
    const img = imagesRef.current[clampedIndex];
    
    if (img && (img.complete || img.width > 0)) {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
      if (currentFrame !== clampedIndex) {
        setCurrentFrame(clampedIndex);
      }
    }
  };

  useEffect(() => {
    let active = true;
    
    const urls = Array.from({ length: frameCount }, (_, i) => {
      const num = String(i + 1).padStart(3, "0");
      return `/sequence/ezgif-frame-${num}.png`; 
    });

    console.log(`[ScrollyCanvas] Starting preloader for ${frameCount} frames...`);
    preloadImages(urls).then((loadedImages) => {
      if (!active) return;
      imagesRef.current = loadedImages;
      setIsLoaded(true);
      console.log(`[ScrollyCanvas] Preload complete: ${loadedImages.length} images.`);
      
      // Force initial frames
      requestAnimationFrame(() => {
        drawFrame(0);
        // Sometimes one RAF isn't enough for mobile safari paint
        setTimeout(() => drawFrame(0), 100);
      });
    }).catch(err => {
      console.error("[ScrollyCanvas] Global Preload Error:", err);
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
          <div className="w-10 h-10 border-2 border-zinc-700 border-t-zinc-200 rounded-full animate-spin mb-4" />
          <p className="text-zinc-500 font-mono text-xs uppercase tracking-[0.3em]">
            Initializing Sequence...
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
