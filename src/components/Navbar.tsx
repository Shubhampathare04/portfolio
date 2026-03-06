"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { name: "Home", href: "#home" },
    { name: "Projects", href: "#projects" },
    { name: "Ideas", href: "#ideas" },
    { name: "Experience", href: "#experience" },
    { name: "Connect", href: "#connect" },
  ];

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <nav 
      className={`fixed top-0 left-0 w-full z-[100] transition-all duration-500 ${
        isScrolled ? "py-4" : "py-8"
      }`}
    >
      <div className="max-w-7xl mx-auto px-8 md:px-24 flex justify-between items-center">
        {/* Logo / Name */}
        <motion.a 
          href="#home"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          onClick={(e) => handleNavClick(e, "#home")}
          className="text-white font-medium tracking-tighter text-xl flex items-center gap-2 group"
        >
          <div className="w-8 h-8 rounded-full bg-white flex items-center justify-center text-[#121212] font-bold text-sm transform group-hover:rotate-[360deg] transition-transform duration-700">
            S
          </div>
          <span className="hidden sm:inline">Shubham.</span>
        </motion.a>

        {/* Navigation Links */}
        <motion.div 
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
          className="flex items-center gap-1 p-1.5 rounded-full border border-white/[0.08] bg-white/[0.02] backdrop-blur-xl"
        >
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              onClick={(e) => handleNavClick(e, link.href)}
              className="px-5 py-2 rounded-full text-xs md:text-sm font-medium text-zinc-400 hover:text-white hover:bg-white/[0.05] transition-all duration-300"
            >
              {link.name}
            </a>
          ))}
        </motion.div>

        {/* CTA Button / Resume Link */}
        <motion.div
           initial={{ opacity: 0, x: 20 }}
           animate={{ opacity: 1, x: 0 }}
           transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
        >
          <a 
            href="https://wa.me/919822727389?text=Hi%20Shubham,%20I'd%20like%20to%20hire%20you%20for%20a%20project!"
            target="_blank"
            rel="noopener noreferrer"
            className="hidden md:block px-6 py-2.5 rounded-full bg-white text-[#121212] text-xs font-bold uppercase tracking-widest hover:bg-zinc-200 transition-colors shadow-2xl shadow-white/10"
          >
            Hire Me
          </a>
        </motion.div>
      </div>
    </nav>
  );
}
