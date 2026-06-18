"use client";

import React from "react";
import { motion } from "framer-motion";
import { GraduationCap, Award, Compass, Languages, Globe } from "lucide-react";

interface TimelineItem {
  year: string;
  title: string;
  institution: string;
  description: string;
  icon: React.ReactNode;
}

const TIMELINE_DATA: TimelineItem[] = [
  {
    year: "2024 - Present",
    title: "B.Tech in Biotechnology (Currently in 1st Year)",
    institution: "Amity University",
    description: "Developing foundational knowledge in biochemistry, microbiology, genetics, and cell biology. Actively learning laboratory safety practices.",
    icon: <GraduationCap className="w-5 h-5 text-cyan-glow" />,
  },
  {
    year: "2022 - 2024",
    title: "Intermediate Board (Higher Secondary Education)",
    institution: "Visakhapatnam Science Academy",
    description: "Completed higher secondary curriculum with focus on physics, chemistry, and biology. Graduated with top marks.",
    icon: <Award className="w-5 h-5 text-emerald-green" />,
  },
  {
    year: "2022",
    title: "Secondary School Certification",
    institution: "Visakhapatnam High School",
    description: "Excelled in natural sciences and biology courses, fostering a lifelong passion for life sciences and biotechnological advancements.",
    icon: <GraduationCap className="w-5 h-5 text-cyan-glow" />,
  },
];

export default function About() {
  return (
    <section id="about" className="py-24 relative overflow-hidden">
      {/* Glow backgrounds */}
      <div className="absolute top-1/3 right-10 w-96 h-96 rounded-full glow-spot-emerald opacity-20 -z-10 pointer-events-none" />

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
            About <span className="gradient-text">Me</span>
          </motion.h2>
          <motion.div
            initial={{ width: 0 }}
            whileInView={{ width: 60 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="h-1 bg-gradient-to-r from-emerald-green to-cyan-glow mx-auto rounded-full"
          />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Left Column: Intro, Interests, Goals */}
          <div className="lg:col-span-6 space-y-6">
            <motion.div
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="glass-panel rounded-2xl p-6 md:p-8"
            >
              <h3 className="text-xl font-bold font-heading text-cyan-glow mb-4 flex items-center space-x-2">
                <Compass className="w-5 h-5" />
                <span>Biography & Vision</span>
              </h3>
              <p className="text-sm md:text-base text-slate-600 dark:text-slate-300 leading-relaxed mb-4">
                I am a motivated and enthusiastic first-year Biotechnology student at Amity University. I am deeply passionate about exploring the intersections of molecular biology, genetics, and bioinformatics to contribute to medical advancements.
              </p>
              <p className="text-sm md:text-base text-slate-600 dark:text-slate-300 leading-relaxed">
                My immediate goal is to master practical laboratory skills, study gene expression, and explore bioinformatics tools. I aim to contribute to research, innovation, and advancements in biotechnology while continuously learning and growing as a future biotechnology professional.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.15 }}
              className="grid grid-cols-1 md:grid-cols-2 gap-6"
            >
              {/* Research Interests Card */}
              <div className="glass-panel rounded-xl p-6">
                <h4 className="font-heading font-bold text-sm text-slate-800 dark:text-[#F8FAFC] uppercase tracking-wider mb-3">
                  Research Interests
                </h4>
                <ul className="space-y-2 text-xs md:text-sm text-slate-500 dark:text-slate-400">
                  <li>• Molecular Biology Concepts</li>
                  <li>• Cellular Biology Fundamentals</li>
                  <li>• Genetics Fundamentals</li>
                  <li>• Microbiology Basics</li>
                </ul>
              </div>

              {/* Hobbies & Interests Card */}
              <div className="glass-panel rounded-xl p-6">
                <h4 className="font-heading font-bold text-sm text-slate-800 dark:text-[#F8FAFC] uppercase tracking-wider mb-3">
                  Hobbies &amp; Interests
                </h4>
                <ul className="space-y-2 text-xs md:text-sm text-slate-500 dark:text-slate-400">
                  <li>• Science &amp; Tech Articles</li>
                  <li>• Biotechnology Innovations</li>
                  <li>• Learning Digital Tools</li>
                  <li>• Scientific Documentaries</li>
                </ul>
              </div>
            </motion.div>

            {/* Languages Card */}
            <motion.div
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="glass-panel rounded-xl p-6 flex items-center justify-between"
            >
              <div className="flex items-center space-x-3 text-cyan-glow">
                <Languages className="w-5 h-5" />
                <span className="font-heading font-bold text-sm text-slate-800 dark:text-[#F8FAFC]">Spoken Languages</span>
              </div>
              <div className="flex items-center space-x-4 text-xs md:text-sm text-slate-600 dark:text-slate-300">
                <span className="flex items-center space-x-1.5 bg-slate-300/10 dark:bg-slate-800/40 px-3 py-1 rounded-full border border-slate-300 dark:border-slate-800">
                  <Globe className="w-3.5 h-3.5 text-emerald-green" />
                  <span>English (Professional)</span>
                </span>
                <span className="flex items-center space-x-1.5 bg-slate-300/10 dark:bg-slate-800/40 px-3 py-1 rounded-full border border-slate-300 dark:border-slate-800">
                  <Globe className="w-3.5 h-3.5 text-emerald-green" />
                  <span>Telugu (Native)</span>
                </span>
              </div>
            </motion.div>
          </div>

          {/* Right Column: Academic Journey Timeline */}
          <div className="lg:col-span-6">
            <h3 className="text-xl font-bold font-heading mb-8 flex items-center space-x-2 text-slate-800 dark:text-[#F8FAFC]">
              <GraduationCap className="w-6 h-6 text-cyan-glow" />
              <span>Academic Journey</span>
            </h3>

            {/* Timeline Tree */}
            <div className="relative border-l border-slate-300 dark:border-slate-800 ml-4 pl-8 space-y-8">
              {TIMELINE_DATA.map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: 25 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.15 }}
                  className="relative"
                >
                  {/* Timeline Dot Node */}
                  <span className="absolute -left-[42px] top-1.5 flex items-center justify-center w-8 h-8 rounded-full border border-slate-300 dark:border-slate-800 bg-[#F8FAFC] dark:bg-[#0B1120] shadow-md z-10">
                    {item.icon}
                  </span>

                  {/* Timeline Card */}
                  <div className="glass-panel-glow rounded-xl p-5 relative">
                    <span className="text-[10px] font-mono font-bold text-emerald-green uppercase tracking-widest block mb-1">
                      {item.year}
                    </span>
                    <h4 className="text-sm md:text-base font-bold font-heading text-slate-800 dark:text-white-slate">
                      {item.title}
                    </h4>
                    <p className="text-xs font-semibold text-cyan-glow mt-0.5 mb-2">
                      {item.institution}
                    </p>
                    <p className="text-xs md:text-sm text-slate-500 dark:text-slate-400 leading-relaxed">
                      {item.description}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
