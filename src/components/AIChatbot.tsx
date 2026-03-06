"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";

const SHUBHAM_KNOWLEDGE = {
  skills: "I'm proficient in ReactJS, Next.js, Python (FastAPI, Django), Java (Spring Boot), and databases like MongoDB and SQL. I also work with AWS and Docker.",
  education: "I have successfully completed my education with a strong academic background and I'm now a fully qualified Software Developer.",
  projects: "I've built several high-end projects like Tesla Academy, Airawat Logistics, a Consistency Streak App, and a Carbon Credit Brokerage concept.",
  contact: "You can reach out via email at pathareshubham620@gmail.com, connect on LinkedIn, or even chat with me on WhatsApp using the Hire Me button!",
  background: "I'm a Software Developer focused on building premium, high-performance digital experiences that bridge design and engineering. I have successfully completed my academic journey.",
  default: "I'm not sure about that, but you can ask me about my skills, projects, education, or how to contact me!"
};

const getResponse = (query: string) => {
  const lowQuery = query.toLowerCase();
  if (lowQuery.includes("skill") || lowQuery.includes("know") || lowQuery.includes("tech")) return SHUBHAM_KNOWLEDGE.skills;
  if (lowQuery.includes("project") || lowQuery.includes("work") || lowQuery.includes("build")) return SHUBHAM_KNOWLEDGE.projects;
  if (lowQuery.includes("education") || lowQuery.includes("college") || lowQuery.includes("degree")) return SHUBHAM_KNOWLEDGE.education;
  if (lowQuery.includes("contact") || lowQuery.includes("email") || lowQuery.includes("reach") || lowQuery.includes("hire")) return SHUBHAM_KNOWLEDGE.contact;
  if (lowQuery.includes("who") || lowQuery.includes("you") || lowQuery.includes("about")) return SHUBHAM_KNOWLEDGE.background;
  return SHUBHAM_KNOWLEDGE.default;
};

export default function AIChatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<{ role: "user" | "ai"; content: string }[]>([
    { role: "ai", content: "Hi! I'm Shubham's AI assistant. Ask me anything about his work or skills!" }
  ]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);
  const recognitionRef = useRef<any>(null);

  const handleSendRef = useRef<any>(null);
  handleSendRef.current = (customInput?: string) => {
    const textToSend = customInput || input;
    if (!textToSend.trim()) return;
    
    setInput("");
    setMessages(prev => [...prev, { role: "user", content: textToSend }]);
    
    setIsTyping(true);
    setTimeout(() => {
      const aiResponse = getResponse(textToSend);
      setMessages(prev => [...prev, { role: "ai", content: aiResponse }]);
      setIsTyping(false);
      speak(aiResponse);
    }, 1000);
  };

  const handleSend = (customInput?: string) => handleSendRef.current(customInput);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
      if (SpeechRecognition) {
        recognitionRef.current = new SpeechRecognition();
        recognitionRef.current.continuous = false;
        recognitionRef.current.interimResults = false;
        recognitionRef.current.lang = "en-US";

        recognitionRef.current.onresult = (event: any) => {
          const transcript = event.results[0][0].transcript;
          setIsListening(false);
          if (transcript.trim()) {
            handleSendRef.current(transcript);
          }
        };

        recognitionRef.current.onerror = (event: any) => {
          console.error("Speech recognition error:", event.error);
          setIsListening(false);
        };

        recognitionRef.current.onend = () => {
          setIsListening(false);
        };
      }
    }
  }, []);

  const toggleListening = () => {
    if (isListening) {
      recognitionRef.current?.stop();
    } else {
      setIsListening(true);
      recognitionRef.current?.start();
    }
  };

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isTyping]);

  const speak = (text: string) => {
    if (!window.speechSynthesis) return;
    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(text);
    const voices = window.speechSynthesis.getVoices();
    // Try to find a good male voice
    const maleVoice = voices.find(v => 
      v.name.toLowerCase().includes("male") || 
      v.name.toLowerCase().includes("david") || 
      v.name.toLowerCase().includes("google uk english male")
    );
    if (maleVoice) utterance.voice = maleVoice;
    utterance.pitch = 1;
    utterance.rate = 1;
    window.speechSynthesis.speak(utterance);
  };

  return (
    <div className="fixed bottom-8 right-8 z-[100]">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className="absolute bottom-20 right-0 w-[350px] md:w-[400px] h-[500px] bg-[#121212]/90 backdrop-blur-2xl border border-white/10 rounded-[2.5rem] flex flex-col overflow-hidden shadow-2xl"
          >
            {/* Header */}
            <div className="p-6 border-b border-white/5 flex justify-between items-center bg-white/[0.02]">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-zinc-200 flex items-center justify-center text-black font-bold text-xs">S</div>
                <div>
                  <h3 className="text-white font-medium text-sm">Shubham AI</h3>
                  <div className="flex items-center gap-1.5">
                    <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                    <span className="text-[10px] text-zinc-500 uppercase tracking-widest">Online</span>
                  </div>
                </div>
              </div>
              <button onClick={() => setIsOpen(false)} className="text-zinc-500 hover:text-white transition-colors">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M18 6L6 18M6 6l12 12"/></svg>
              </button>
            </div>

            {/* Chat Area */}
            <div ref={scrollRef} className="flex-grow p-6 overflow-y-auto space-y-4 custom-scrollbar">
              {messages.map((m, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: m.role === "user" ? 10 : -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  className={`flex ${m.role === "user" ? "justify-end" : "justify-start"}`}
                >
                  <div className={`max-w-[80%] p-4 rounded-3xl text-sm leading-relaxed ${
                    m.role === "user" 
                      ? "bg-white text-black font-medium" 
                      : "bg-white/5 border border-white/10 text-zinc-300"
                  }`}>
                    {m.content}
                  </div>
                </motion.div>
              ))}
              {isTyping && (
                <div className="flex justify-start">
                  <div className="bg-white/5 border border-white/10 px-4 py-3 rounded-full flex gap-1 items-center">
                    <span className="w-1 h-1 bg-zinc-500 rounded-full animate-bounce" />
                    <span className="w-1 h-1 bg-zinc-500 rounded-full animate-bounce delay-100" />
                    <span className="w-1 h-1 bg-zinc-500 rounded-full animate-bounce delay-200" />
                  </div>
                </div>
              )}
            </div>

            {/* Input */}
            <div className="p-6 bg-white/[0.02] border-t border-white/5">
              <div className="flex gap-2">
                <div className="relative flex-grow">
                  <input 
                    type="text"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyDown={(e) => e.key === "Enter" && handleSend()}
                    placeholder={isListening ? "Listening..." : "Ask me something..."}
                    className="w-full bg-white/[0.05] border border-white/10 rounded-full py-3 px-6 pr-12 text-sm text-white outline-none focus:border-white/30 transition-all placeholder:text-zinc-600"
                  />
                  <button 
                    onClick={() => handleSend()}
                    className="absolute right-2 top-1.5 w-9 h-9 bg-white rounded-full flex items-center justify-center text-black hover:scale-105 transition-transform"
                  >
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
                  </button>
                </div>
                
                <button
                  onClick={toggleListening}
                  className={`w-12 h-12 rounded-full flex items-center justify-center border transition-all duration-300 ${
                    isListening 
                      ? "bg-red-500/20 border-red-500 text-red-500 animate-pulse shadow-[0_0_15px_rgba(239,68,68,0.4)]" 
                      : "bg-white/[0.05] border-white/10 text-zinc-400 hover:border-white/30 hover:text-white"
                  }`}
                >
                  {isListening ? (
                    <div className="flex gap-1">
                      <motion.div animate={{ height: [4, 12, 4] }} transition={{ repeat: Infinity, duration: 0.6 }} className="w-1 bg-red-500 rounded-full" />
                      <motion.div animate={{ height: [8, 16, 8] }} transition={{ repeat: Infinity, duration: 0.6, delay: 0.1 }} className="w-1 bg-red-500 rounded-full" />
                      <motion.div animate={{ height: [4, 12, 4] }} transition={{ repeat: Infinity, duration: 0.6, delay: 0.2 }} className="w-1 bg-red-500 rounded-full" />
                    </div>
                  ) : (
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 1a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3z"/><path d="M19 10v2a7 7 0 0 1-14 0v-2"/><line x1="12" y1="19" x2="12" y2="23"/><line x1="8" y1="23" x2="16" y2="23"/></svg>
                  )}
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Toggle Button */}
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setIsOpen(!isOpen)}
        className="w-16 h-16 bg-white rounded-full flex items-center justify-center shadow-2xl relative group"
      >
        <div className="absolute inset-0 rounded-full bg-white blur-lg opacity-20 group-hover:opacity-40 transition-opacity" />
        <svg 
          width="28" height="28" 
          viewBox="0 0 24 24" 
          fill="none" 
          stroke="black" 
          strokeWidth="2" 
          className={`transition-transform duration-500 ${isOpen ? "rotate-90" : "rotate-0"}`}
        >
          {isOpen ? (
            <path d="M18 6L6 18M6 6l12 12"/>
          ) : (
            <path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z"/>
          )}
        </svg>
      </motion.button>
    </div>
  );
}
