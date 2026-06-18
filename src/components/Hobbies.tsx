"use client";

import React from "react";
import { motion } from "framer-motion";
import { BookOpen, Microscope, Cpu, Users, Film, Sparkles } from "lucide-react";

export default function Hobbies() {
  const hobbiesList = [
    {
      icon: BookOpen,
      title: "Science & Tech Reading",
      desc: "Keeping up with the latest scientific literature, breakthroughs, and digital technology updates to build a broad base of technical knowledge.",
      tag: "LITERATURE",
      glowColor: "from-amber-500/20 to-crimson/10",
      iconColor: "text-amber-500",
      direction: -30
    },
    {
      icon: Microscope,
      title: "Exploring Bio-Innovations",
      desc: "Following groundbreaking trends in biotechnology, genetics, healthcare innovations, and clinical research developments.",
      tag: "BIO-INNOVATION",
      glowColor: "from-emerald-green/20 to-cyan-glow/10",
      iconColor: "text-emerald-500",
      direction: 30
    },
    {
      icon: Cpu,
      title: "Learning Digital Technologies",
      desc: "Exploring new software tools, bioinformatics platforms, and coding environments to bridge the gap between biology and computing.",
      tag: "COMPUTATION",
      glowColor: "from-cyan-glow/20 to-amber-500/10",
      iconColor: "text-cyan-glow",
      direction: -30
    },
    {
      icon: Users,
      title: "Team Collaboration",
      desc: "Participating actively in group learning sessions, brainstorming ideas, and coordinating with peers in academic science forums.",
      tag: "COLLABORATION",
      glowColor: "from-crimson/20 to-emerald-green/10",
      iconColor: "text-[#E11D48]", // Crimson red
      direction: 30
    },
    {
      icon: Film,
      title: "Watching Documentaries",
      desc: "Expanding intellectual horizons by exploring highly detailed documentaries focused on science, nature, and future technologies.",
      tag: "EXPLORATION",
      glowColor: "from-purple-500/20 to-cyan-glow/10",
      iconColor: "text-purple-400",
      direction: -30
    }
  ];

  return (
    <section id="hobbies" className="py-24 relative overflow-hidden">
      {/* Top ambient glow */}
      <div className="absolute top-10 left-1/2 -translate-x-1/2 w-[500px] h-[500px] rounded-full bg-gradient-to-tr from-cyan-glow/10 to-amber-500/5 blur-3xl -z-10 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6">
        
        {/* Section Header */}
        <div className="text-center mb-16">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, amount: 0.2 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-3xl md:text-5xl font-extrabold font-heading text-[#3C2415] dark:text-white mb-4"
          >
            Beyond the <span className="gradient-text">Lab</span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, amount: 0.2 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-sm md:text-base text-slate-500 dark:text-slate-400 max-w-xl mx-auto leading-relaxed"
          >
            Cultivating curiosity, collaborative synergy, and a drive for continuous learning outside the molecular laboratory.
          </motion.p>
        </div>

        {/* 5 Hobbies Layout (Responsive, centered Flex-wrap grid) */}
        <div className="flex flex-wrap justify-center gap-6 max-w-6xl mx-auto">
          {hobbiesList.map((hobby, index) => {
            const IconComponent = hobby.icon;

            return (
              <motion.div
                key={index}
                custom={index}
                initial={{ opacity: 0, y: 50, x: hobby.direction }}
                whileInView={{ opacity: 1, y: 0, x: 0 }}
                viewport={{ once: false, amount: 0.15 }}
                transition={{ 
                  type: "spring",
                  stiffness: 70,
                  damping: 15,
                  delay: (index % 3) * 0.1,
                  duration: 0.7 
                }}
                className="w-full md:w-[calc(50%-12px)] lg:w-[calc(33.33%-16px)] max-w-md lg:max-w-sm xl:max-w-[350px] group"
              >
                <div className="h-full relative glass-panel rounded-3xl p-6 md:p-8 border border-white-slate/10 dark:border-white/5 shadow-xl hover:shadow-2xl hover:border-cyan-glow/20 bg-[#F5EBE0]/10 dark:bg-[#000000]/30 backdrop-blur-md transition-all duration-300 flex flex-col justify-between overflow-hidden">
                  
                  {/* Hover background glow ring */}
                  <div className={`absolute -bottom-16 -right-16 w-32 h-32 rounded-full bg-gradient-to-br ${hobby.glowColor} blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none`} />

                  <div>
                    {/* Header: Icon & Protocol Tag */}
                    <div className="flex items-center justify-between mb-6">
                      <div className={`p-3.5 rounded-2xl border border-slate-300/60 dark:border-slate-800/40 bg-[#F5EBE0]/20 dark:bg-[#000000]/60 ${hobby.iconColor} group-hover:scale-110 transition-transform duration-300`}>
                        <IconComponent className="w-5 h-5" />
                      </div>
                      <span className="text-[9px] font-mono font-bold tracking-wider text-slate-400 border border-slate-300 dark:border-slate-800/60 px-2 py-0.5 rounded-md">
                        {hobby.tag}
                      </span>
                    </div>

                    {/* Content */}
                    <h3 className="text-base md:text-lg font-bold font-heading text-slate-800 dark:text-[#F8FAFC] mb-3 group-hover:text-cyan-glow transition-colors">
                      {hobby.title}
                    </h3>
                    
                    <p className="text-xs md:text-sm text-slate-500 dark:text-slate-400 leading-relaxed mb-4">
                      {hobby.desc}
                    </p>
                  </div>

                </div>
              </motion.div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
