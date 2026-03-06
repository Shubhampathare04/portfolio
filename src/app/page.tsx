import ScrollyCanvas from "@/components/ScrollyCanvas";
import ParallaxOverlay from "@/components/ParallaxOverlay";
import Projects from "@/components/Projects";
import Experience from "@/components/Experience";
import Navbar from "@/components/Navbar";
import Ideas from "@/components/Ideas";
import Contact from "@/components/Contact";
import AIChatbot from "@/components/AIChatbot";

export default function Home() {
  return (
    <main className="relative min-h-screen text-zinc-50 font-sans selection:bg-zinc-800 selection:text-white">
      <Navbar />
      <AIChatbot />
      
      {/* Fixed Background for all screens */}
      <ScrollyCanvas frameCount={120} />

      {/* Core Content Layer */}
      <div className="relative z-10">
        {/* Home Section Layer */}
        <section id="home" className="relative w-full h-[400vh]">
          {/* Overlay text sections placed structurally along the same scroll height */}
          <ParallaxOverlay />
        </section>
        
        {/* Projects Grid Section */}
        <div id="projects" className="bg-[#121212]/30 backdrop-blur-[2px]">
          <Projects />
        </div>

        {/* Future Ideas Section */}
        <div id="ideas" className="bg-[#121212]/60 backdrop-blur-md">
          <Ideas />
        </div>

        {/* Experience & Skills Section */}
        <div id="experience" className="bg-[#121212]/50 backdrop-blur-sm">
          <Experience />
        </div>

        {/* Contact & Suggestions Section */}
        <div id="connect" className="bg-[#121212]/80 backdrop-blur-lg">
          <Contact />
        </div>
      </div>
    </main>
  );
}
