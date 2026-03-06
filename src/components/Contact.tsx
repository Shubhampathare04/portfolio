"use client";

import { useState } from "react";
import { motion } from "framer-motion";

export default function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    suggestion: ""
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const subject = encodeURIComponent(`Portfolio Suggestion from ${formData.name}`);
    const body = encodeURIComponent(
      `Name: ${formData.name}\nEmail: ${formData.email}\n\nSuggestion:\n${formData.suggestion}`
    );
    window.location.href = `mailto:pathareshubham620@gmail.com?subject=${subject}&body=${body}`;
  };

  return (
    <section className="py-24 px-8 md:px-24">
      <div className="max-w-7xl mx-auto">
        <motion.div 
          className="flex items-center gap-6 mb-16"
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
        >
          <h2 className="text-4xl md:text-5xl font-medium text-white tracking-tight">Connect & <span className="text-zinc-500">Suggest</span></h2>
          <div className="h-[1px] flex-grow bg-zinc-800" />
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
          {/* Form Side */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="p-8 md:p-12 rounded-[2.5rem] border border-white/[0.08] bg-white/[0.02] backdrop-blur-xl"
          >
            <form className="space-y-8" onSubmit={handleSubmit}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="relative group">
                  <label className="text-[10px] font-mono uppercase tracking-[0.2em] text-zinc-500 mb-2 block">Your Name</label>
                  <input 
                    type="text" 
                    placeholder="John Doe"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full bg-transparent border-b border-zinc-800 py-3 outline-none focus:border-white transition-colors placeholder:text-zinc-700"
                  />
                </div>
                <div className="relative group">
                  <label className="text-[10px] font-mono uppercase tracking-[0.2em] text-zinc-500 mb-2 block">Email Address</label>
                  <input 
                    type="email" 
                    placeholder="john@example.com"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full bg-transparent border-b border-zinc-800 py-3 outline-none focus:border-white transition-colors placeholder:text-zinc-700"
                  />
                </div>
              </div>
              
              <div className="relative group">
                <label className="text-[10px] font-mono uppercase tracking-[0.2em] text-zinc-500 mb-2 block">Your Suggestion</label>
                <textarea 
                  rows={4}
                  placeholder="What's on your mind?"
                  required
                  value={formData.suggestion}
                  onChange={(e) => setFormData({ ...formData, suggestion: e.target.value })}
                  className="w-full bg-transparent border-b border-zinc-800 py-3 outline-none focus:border-white transition-colors placeholder:text-zinc-700 resize-none"
                />
              </div>

              <motion.button 
                type="submit"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="w-full py-5 bg-zinc-100 text-black font-medium rounded-2xl hover:bg-white transition-colors duration-300"
              >
                Send Message
              </motion.button>
            </form>
          </motion.div>

          {/* Contact Info Side */}
          <div className="space-y-12 h-full flex flex-col justify-center">
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <h3 className="text-3xl font-medium text-white mb-6">Let's build something <span className="text-zinc-500 italic">visionary</span> together.</h3>
              <p className="text-zinc-400 text-lg leading-relaxed max-w-md">
                Whether you have a suggestion for my ideas or want to collaborate on a new project, I'm always open to connecting with fellow innovators.
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <a href="mailto:pathareshubham620@gmail.com" className="group">
                <span className="text-[10px] font-mono uppercase tracking-[0.2em] text-zinc-500 mb-2 block">Email</span>
                <span className="text-xl text-white group-hover:text-zinc-400 transition-colors">pathareshubham620@gmail.com</span>
              </a>
              <a href="https://www.linkedin.com/in/shubham-pathare-67b604231/" target="_blank" className="group">
                <span className="text-[10px] font-mono uppercase tracking-[0.2em] text-zinc-500 mb-2 block">LinkedIn</span>
                <span className="text-xl text-white group-hover:text-zinc-400 transition-colors">shubham-pathare</span>
              </a>
            </div>

            <div className="pt-8">
              <div className="inline-flex items-center gap-4 px-6 py-3 rounded-full border border-white/10 bg-white/5 backdrop-blur-md">
                <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                <span className="text-xs font-mono text-zinc-300 uppercase tracking-widest">Available for Freelance</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
