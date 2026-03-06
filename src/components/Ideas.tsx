"use client";

import { motion } from "framer-motion";

const IDEAS = [
  {
    id: 1,
    title: "Carbon Credit Brokerage",
    subtitle: "Eco-Tech Concept",
    description: "A digital marketplace connecting eco-conscious corporations with certified carbon offset projects. Streamlining transparency in the green economy.",
    accent: "bg-emerald-500/20",
    glow: "group-hover:bg-emerald-500/10"
  },
  {
    id: 2,
    title: "Consistency Streak App",
    subtitle: "Productivity Solution",
    description: "A habit-builder inspired by gamified consistency loops. Includes premium tiers for collaborative streaks and cross-platform accountability.",
    accent: "bg-indigo-500/20",
    glow: "group-hover:bg-indigo-500/10"
  }
];

export default function Ideas() {
  return (
    <section className="py-24 px-8 md:px-24">
      <div className="max-w-7xl mx-auto">
        <motion.div 
          className="flex items-center gap-6 mb-16"
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
        >
          <h2 className="text-4xl md:text-5xl font-medium text-white tracking-tight">Future <span className="text-zinc-500">Concepts</span></h2>
          <div className="h-[1px] flex-grow bg-zinc-800" />
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
          {IDEAS.map((idea, index) => (
            <motion.div
              key={idea.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: index * 0.2 }}
              className="group relative p-10 rounded-[2.5rem] border border-white/[0.08] bg-white/[0.02] backdrop-blur-2xl overflow-hidden cursor-default transition-all duration-500 hover:border-white/20"
            >
              {/* Animated Glow */}
              <div className={`absolute top-0 right-0 w-64 h-64 blur-[100px] rounded-full -translate-y-1/2 translate-x-1/2 transition-colors duration-700 ${idea.accent} ${idea.glow}`} />
              
              <div className="relative z-10">
                <span className="text-xs font-mono tracking-[0.3em] text-zinc-500 uppercase mb-4 block">
                  {idea.subtitle}
                </span>
                <h3 className="text-3xl md:text-4xl font-medium text-white mb-6 group-hover:text-zinc-100 transition-colors">
                  {idea.title}
                </h3>
                <p className="text-zinc-400 text-lg leading-relaxed max-w-lg transition-colors group-hover:text-zinc-300">
                  {idea.description}
                </p>
                
                <div className="mt-12 flex items-center gap-4 group/btn">
                  <div className="w-12 h-[1px] bg-zinc-700 group-hover/btn:w-16 transition-all duration-500" />
                  <span className="text-xs font-mono text-zinc-500 uppercase tracking-widest group-hover/btn:text-white transition-colors">Visionary Piece</span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
