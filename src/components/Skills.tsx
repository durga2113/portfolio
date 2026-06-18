"use client";

import React from "react";
import { motion } from "framer-motion";
import { FlaskConical, Code2, Database, HelpCircle } from "lucide-react";

interface SkillItem {
  name: string;
  level: number; // Percentage
}

interface SkillCategory {
  title: string;
  icon: React.ReactNode;
  color: string;
  skills: SkillItem[];
}

const SKILLS_DATA: SkillCategory[] = [
  {
    title: "Laboratory Skills",
    icon: <FlaskConical className="w-5 h-5 text-emerald-green" />,
    color: "emerald-green",
    skills: [
      { name: "Cell Biology Fundamentals", level: 85 },
      { name: "Microbiology Basics", level: 80 },
      { name: "Laboratory Safety Practices", level: 90 },
      { name: "Scientific Data Recording", level: 88 },
      { name: "Basic Molecular Biology Concepts", level: 82 },
    ],
  },
  {
    title: "Computational & Literature Research",
    icon: <Database className="w-5 h-5 text-cyan-glow" />,
    color: "cyan-glow",
    skills: [
      { name: "Internet Research & Literature Search", level: 92 },
      { name: "Basic Bioinformatics Awareness", level: 75 },
      { name: "Scientific Documentation", level: 85 },
    ],
  },
  {
    title: "Digital & Office Tools",
    icon: <Code2 className="w-5 h-5 text-cyan-glow" />,
    color: "cyan-glow",
    skills: [
      { name: "Microsoft Excel (Data Charts)", level: 88 },
      { name: "Microsoft PowerPoint (Research Slides)", level: 90 },
      { name: "Microsoft Word (Documentation)", level: 92 },
    ],
  },
  {
    title: "Soft Skills",
    icon: <HelpCircle className="w-5 h-5 text-emerald-green" />,
    color: "emerald-green",
    skills: [
      { name: "Teamwork & Collaboration", level: 95 },
      { name: "Communication Skills", level: 92 },
      { name: "Problem-Solving", level: 88 },
      { name: "Time Management & Adaptability", level: 90 },
    ],
  },
];

export default function Skills() {
  return (
    <section id="skills" className="py-24 relative overflow-hidden">
      {/* Background glow spot */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full glow-spot-cyan opacity-15 -z-10 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6">
        {/* Section Title */}
        <div className="text-center mb-16">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-3xl md:text-4xl font-bold font-heading mb-3"
          >
            Technical &amp; Scientific <span className="gradient-text">Skills</span>
          </motion.h2>
          <motion.div
            initial={{ width: 0 }}
            whileInView={{ width: 60 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="h-1 bg-gradient-to-r from-emerald-green to-cyan-glow mx-auto rounded-full"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {SKILLS_DATA.map((cat, idx) => (
            <motion.div
              key={cat.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: idx * 0.15 }}
              className={`glass-panel-glow ${
                cat.color === "emerald-green" ? "glass-panel-glow-emerald" : "glass-panel-glow"
              } rounded-2xl p-6 md:p-8 flex flex-col`}
            >
              {/* Category Header */}
              <div className="flex items-center space-x-3 mb-8 pb-4 border-b border-slate-300 dark:border-slate-800">
                <div className="p-2 rounded-xl bg-slate-300/10 dark:bg-slate-800/50">
                  {cat.icon}
                </div>
                <h3 className="text-lg font-bold font-heading text-slate-800 dark:text-[#F8FAFC]">
                  {cat.title}
                </h3>
              </div>

              {/* Grid representation */}
              {idx === 3 ? (
                // Soft Skills: Grid of Circular Progress Gauges
                <div className="grid grid-cols-2 gap-6 my-auto">
                  {cat.skills.map((skill) => {
                    const radius = 32;
                    const circumference = radius * 2 * Math.PI;
                    const strokeOffset = circumference - (skill.level / 100) * circumference;

                    return (
                      <div key={skill.name} className="flex flex-col items-center justify-center text-center">
                        <div className="relative w-20 h-20 flex items-center justify-center mb-3">
                          {/* Outer circular SVG track */}
                          <svg className="w-full h-full transform -rotate-90">
                            <circle
                              className="text-slate-300 dark:text-slate-800"
                              strokeWidth="4"
                              stroke="currentColor"
                              fill="transparent"
                              r={radius}
                              cx="40"
                              cy="40"
                            />
                            <motion.circle
                              className="text-emerald-green"
                              strokeWidth="4"
                              strokeDasharray={circumference}
                              initial={{ strokeDashoffset: circumference }}
                              whileInView={{ strokeDashoffset: strokeOffset }}
                              viewport={{ once: true }}
                              transition={{ duration: 1.2, ease: "easeOut" }}
                              strokeLinecap="round"
                              stroke="currentColor"
                              fill="transparent"
                              r={radius}
                              cx="40"
                              cy="40"
                            />
                          </svg>
                          <span className="absolute text-xs font-mono font-bold text-slate-700 dark:text-[#F8FAFC]">
                            {skill.level}%
                          </span>
                        </div>
                        <span className="text-xs md:text-sm font-semibold text-slate-600 dark:text-slate-300">
                          {skill.name}
                        </span>
                      </div>
                    );
                  })}
                </div>
              ) : (
                // Horizontal Meter Bars for Lab, Computational, and Digital Office
                <div className="space-y-5 flex-1 justify-center flex flex-col">
                  {cat.skills.map((skill) => (
                    <div key={skill.name} className="space-y-2">
                      <div className="flex justify-between items-center text-xs md:text-sm">
                        <span className="font-semibold text-slate-700 dark:text-slate-200">
                          {skill.name}
                        </span>
                        <span className="font-mono font-bold text-cyan-glow">
                          {skill.level}%
                        </span>
                      </div>
                      <div className="w-full h-2 bg-slate-300/40 dark:bg-slate-800/60 rounded-full overflow-hidden relative shadow-inner">
                        <motion.div
                          className={`h-full rounded-full ${
                            cat.color === "emerald-green"
                              ? "bg-gradient-to-r from-emerald-green to-emerald-400"
                              : "bg-gradient-to-r from-cyan-glow to-cyan-400"
                          }`}
                          initial={{ width: 0 }}
                          whileInView={{ width: `${skill.level}%` }}
                          viewport={{ once: true }}
                          transition={{ duration: 1, ease: "easeOut" }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
