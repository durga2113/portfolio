"use client";

import React from "react";
import { motion } from "framer-motion";
import { BookOpen, Sparkles } from "lucide-react";

export default function Publications() {
  return (
    <section id="publications" className="py-24 relative overflow-hidden">
      {/* Background ambient glow */}
      <div className="absolute top-1/4 right-0 w-96 h-96 rounded-full glow-spot-emerald opacity-15 -z-10 pointer-events-none" />

      <div className="max-w-4xl mx-auto px-6">
        {/* Section Title */}
        <div className="text-center mb-12">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-3xl md:text-4xl font-bold font-heading mb-3 text-slate-800 dark:text-white"
          >
            Academic <span className="gradient-text">Publications</span>
          </motion.h2>
          <motion.div
            initial={{ width: 0 }}
            whileInView={{ width: 60 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="h-1 bg-gradient-to-r from-emerald-green to-cyan-glow mx-auto rounded-full"
          />
        </div>

        {/* Simplified Premium Coming Soon Glass Card */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="glass-panel rounded-3xl p-8 md:p-12 border border-emerald-green/10 shadow-2xl relative overflow-hidden bg-[#F5EBE0]/15 dark:bg-[#000000]/35 backdrop-blur-md text-center"
        >
          {/* Decorative ambient background glows */}
          <div className="absolute -bottom-24 -left-24 w-48 h-48 rounded-full bg-gradient-to-br from-emerald-green/15 to-cyan-glow/15 blur-xl pointer-events-none" />

          {/* Pulsing icon */}
          <div className="relative w-20 h-20 mx-auto mb-6 flex items-center justify-center">
            <div className="absolute inset-0 rounded-full bg-emerald-green/15 blur-md animate-pulse" />
            <div className="relative p-5 rounded-full border border-emerald-green/20 bg-[#F5EBE0]/20 dark:bg-[#000000]/60 text-emerald-green">
              <BookOpen className="w-10 h-10 animate-bounce" style={{ animationDuration: '3.5s' }} />
            </div>
          </div>

          {/* Active status indicator badge */}
          <div className="inline-flex items-center space-x-2 px-3.5 py-1 rounded-full border border-cyan-glow/30 bg-cyan-glow/5 text-cyan-glow text-[10px] font-mono font-bold tracking-wider uppercase mb-4">
            <Sparkles className="w-3.5 h-3.5 animate-spin" style={{ animationDuration: '5s' }} />
            <span>Submission Stage</span>
          </div>

          <h3 className="text-xl md:text-3xl font-extrabold font-heading text-slate-800 dark:text-[#F8FAFC] mb-4">
            Publications — Coming Soon
          </h3>

          <p className="text-sm md:text-base text-slate-500 dark:text-slate-400 max-w-xl mx-auto leading-relaxed">
            Manuscripts covering CRISPR deep learning classification, SARS-CoV-2 protein receptor screening, and automated RNA-Seq bioinformatics pipelines are currently in drafting or undergoing internal faculty approval logs.
          </p>

          {/* Micro-indicator footer */}
          <div className="mt-8 pt-6 border-t border-slate-300/40 dark:border-slate-800/40 flex items-center justify-center space-x-2 text-[10px] font-mono text-slate-400 select-none">
            <span>MANUSCRIPTS: #IN_PREPARATION</span>
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-green animate-pulse" />
          </div>
        </motion.div>
      </div>
    </section>
  );
}
