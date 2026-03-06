"use client";

import { motion } from "framer-motion";

const SKILLS = [
  { category: "Languages", items: ["Python", "Java", "C++", "JavaScript", "C"] },
  { category: "Web Tech", items: ["ReactJS", "FastAPI", "Django", "Spring Boot", "Tailwind CSS"] },
  { category: "Databases", items: ["MongoDB", "MySQL", "SQL"] },
  { category: "Cloud & Tools", items: ["AWS", "Firebase", "Git", "GitHub", "Docker"] },
];

const EDUCATION = [
  {
    title: "Bachelor of Engineering",
    institution: "Smt. Kashibai Navale College of Engineering",
    university: "Savitribai Phule Pune University",
    year: "2025",
    grade: "7.59 CGPA"
  },
  {
    title: "Higher Secondary Certificate",
    institution: "St.Saviour’s Highschool & Jr. College",
    year: "2021",
    grade: "79.17%"
  },
  {
    title: "Secondary School Certificate",
    institution: "Shri Chhatrapati Shivaji Vidyalaya Ghogargaon",
    year: "2019",
    grade: "77.40%"
  }
];

export default function Experience() {
  return (
    <section className="w-full bg-[#121212] pb-32 px-8 md:px-24 relative z-10">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
          
          {/* Left Column: Skills & Education */}
          <div className="lg:col-span-8 space-y-16">
            
            {/* Expertise Section */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <h2 className="text-3xl md:text-4xl font-medium text-white mb-10 tracking-tight">Expertise</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                {SKILLS.map((set) => (
                  <div key={set.category} className="space-y-4">
                    <h3 className="text-xs font-mono uppercase tracking-[0.2em] text-zinc-500">{set.category}</h3>
                    <div className="flex flex-wrap gap-2">
                      {set.items.map((skill) => (
                        <span key={skill} className="px-3 py-1 bg-white/[0.03] border border-white/[0.06] rounded-full text-sm text-zinc-300">
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Education Section */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <h2 className="text-3xl md:text-4xl font-medium text-white mb-10 tracking-tight">Education</h2>
              <div className="space-y-8">
                {EDUCATION.map((edu) => (
                  <div key={edu.title} className="relative pl-6 border-l border-zinc-800">
                    <div className="absolute -left-[5px] top-1.5 w-[9px] h-[9px] bg-zinc-700 rounded-full" />
                    <div className="flex flex-col md:flex-row md:justify-between md:items-start gap-2">
                      <div>
                        <h3 className="text-xl font-medium text-white">{edu.title}</h3>
                        <p className="text-zinc-400 text-sm mt-1">{edu.institution}</p>
                        {edu.university && <p className="text-zinc-500 text-xs">{edu.university}</p>}
                      </div>
                      <div className="text-right">
                        <span className="text-zinc-200 font-mono text-sm">{edu.grade}</span>
                        <p className="text-zinc-500 text-xs uppercase tracking-widest mt-1">{edu.year}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Technical Highlights Section */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <h2 className="text-3xl md:text-4xl font-medium text-white mb-10 tracking-tight">Highlights</h2>
              <ul className="space-y-4">
                {[
                  "Experience in Algorithm designing and NoSQL databases (MongoDB).",
                  "Skilled in building responsive web apps using ReactJS and Tailwind CSS.",
                  "Knowledge of Docker, Microservices, and Cloud Deployment (AWS/Firebase).",
                  "Strong analytical and problem-solving skills for complex challenges.",
                  "Experience in writing Automation scripts using Python."
                ].map((highlight, i) => (
                  <li key={i} className="flex gap-4 text-zinc-400 text-sm md:text-base leading-relaxed">
                    <span className="text-zinc-700 mt-1.5">•</span>
                    {highlight}
                  </li>
                ))}
              </ul>
            </motion.div>
          </div>

          {/* Right Column: Profile & Contact */}
          <div className="lg:col-span-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
              className="sticky top-24 p-8 rounded-3xl border border-white/[0.08] bg-white/[0.02] backdrop-blur-xl"
            >
              <h2 className="text-2xl font-medium text-white mb-6">Let's Connect</h2>
              <p className="text-zinc-400 text-sm leading-relaxed mb-8">
                Software Developer passionate about full-stack development, algorithm design, and building scalable digital solutions.
              </p>
              
              <div className="space-y-6">
                <div>
                  <span className="text-[10px] uppercase tracking-widest text-zinc-500 block mb-1">Email</span>
                  <a href="mailto:pathareshubham620@gmail.com" className="text-white hover:text-zinc-300 transition-colors">
                    pathareshubham620@gmail.com
                  </a>
                </div>
                <div>
                  <span className="text-[10px] uppercase tracking-widest text-zinc-500 block mb-1">Phone</span>
                  <a href="tel:9822727389" className="text-white hover:text-zinc-300 transition-colors">
                    +91 9822727389
                  </a>
                </div>
                <div className="pt-4 flex gap-4">
                  <a href="https://github.com/Shubhampathare04" target="_blank" className="px-4 py-2 bg-white/[0.05] hover:bg-white/[0.1] border border-white/[0.1] rounded-xl text-xs text-white transition-all">
                    GitHub
                  </a>
                  <a href="https://www.linkedin.com/in/shubham-pathare-67b604231/" target="_blank" className="px-4 py-2 bg-white/[0.05] hover:bg-white/[0.1] border border-white/[0.1] rounded-xl text-xs text-white transition-all">
                    LinkedIn
                  </a>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
