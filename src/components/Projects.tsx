"use client";

import { motion } from "framer-motion";

const PROJECTS = [
  {
    id: 1,
    title: "Tesla Academy",
    category: "Full Stack / Client Project",
    description: "Developed a modern e-learning platform using ReactJS, FastAPI, and MongoDB. Implemented secure REST APIs.",
    link: "https://www.tesla-academy.in/",
    image: "/projects/tesla.png"
  },
  {
    id: 2,
    title: "Rui Gavhan",
    category: "Client Project",
    description: "A tailored digital experience built for a client, focusing on seamless performance and modern aesthetics.",
    link: "https://ruigavhan.netlify.app/",
    image: "/projects/ruigavhan.png"
  },
  {
    id: 3,
    title: "Mugdha Calsy",
    category: "Personal Banking System",
    description: "A specialized financial tool designed for a banking professional to streamline personal workflows and calculations.",
    link: "https://mugdhacalsy.netlify.app/",
    image: "/projects/mugdhacalsy.png"
  },
  {
    id: 4,
    title: "Gym Fit Club",
    category: "Full Stack / Management",
    description: "A comprehensive fitness management system with admin/user portals and automated email marketing.",
    link: "https://github.com/Shubhampathare04",
    image: "/projects/gym.png"
  },
  {
    id: 5,
    title: "Car Rental System",
    category: "Java / OOP",
    description: "Designed a Java-based console application using OOP principles for efficient rental management.",
    link: "https://github.com/Shubhampathare04",
    image: "/projects/car.png"
  },
  {
    id: 6,
    title: "Airawat Logistics",
    category: "Client Project / Logistics",
    description: "A premium logistics and supply chain management dashboard for real-time fleet tracking and analytics.",
    link: "https://airawatlogistics.netlify.app/",
    image: "/projects/airawat.png"
  }
];

export default function Projects() {
  return (
    <section className="w-full bg-[#121212] py-32 px-8 md:px-24 object-cover relative z-10">
      <div className="max-w-7xl mx-auto">
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
          className="mb-16"
        >
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-medium tracking-tight text-white mb-6">Selected Work</h2>
          <div className="w-16 h-[1px] bg-zinc-700" />
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-10">
          {PROJECTS.map((project, index) => (
            <motion.a
              key={project.id}
              href={project.link}
              target="_blank"
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="group relative h-[450px] rounded-[2.5rem] overflow-hidden border border-white/[0.08] bg-white/[0.02] backdrop-blur-xl flex flex-col justify-end cursor-pointer"
            >
              {/* Project Hero Image */}
              {project.image ? (
                <div className="absolute inset-0 z-0 overflow-hidden">
                  <img 
                    src={project.image} 
                    alt={project.title}
                    className="w-full h-full object-cover transform group-hover:scale-110 group-hover:rotate-1 transition-transform duration-1000 ease-out"
                  />
                  {/* Dark overlay that lightens/reveals on hover */}
                  <div className="absolute inset-0 bg-black/80 group-hover:bg-black/40 transition-colors duration-700 z-10" />
                </div>
              ) : (
                <div className="absolute inset-0 z-0 bg-gradient-to-br from-zinc-900 to-black group-hover:from-zinc-800 transition-colors duration-1000" />
              )}

              {/* Card Vignette Bottom */}
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent z-10" />
              
              <div className="relative z-20 p-10 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-700 ease-[0.16,1,0.3,1]">
                <div className="flex justify-between items-start mb-4">
                  <span className="text-[10px] md:text-xs font-mono tracking-[0.2em] text-zinc-300 uppercase">
                    {project.category}
                  </span>
                  <div className="w-10 h-10 rounded-full border border-white/20 bg-black/40 backdrop-blur-md flex items-center justify-center opacity-0 group-hover:opacity-100 transform translate-x-4 group-hover:translate-x-0 transition-all duration-500">
                    <svg width="14" height="14" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M1 11L11 1M11 1H1M11 1V11" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </div>
                </div>
                <h3 className="text-3xl md:text-4xl font-medium text-white mb-4 tracking-tight">
                  {project.title}
                </h3>
                <p className="text-zinc-400 text-sm leading-relaxed opacity-0 group-hover:opacity-100 transition-opacity duration-700 delay-100 line-clamp-2 max-w-[90%]">
                  {project.description}
                </p>
              </div>
            </motion.a>
          ))}
        </div>
      </div>
    </section>
  );
}
