"use client";

import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Dna, Terminal } from "lucide-react";

interface LoadingScreenProps {
  onComplete: () => void;
}

const TELEMETRY_LINES = [
  "SYSTEM INIT: Bio-Telemetry Pipeline V4.9...",
  "ESTABLISHING CONTEXT: Chromosome 21 alignment...",
  "SEQUENCING: Isolating nucleotide patterns...",
  "PROCESSING: Accelerating molecular dynamics simulations...",
  "DOCKING: Predicting protein ligand binding energies...",
  "OPTIMIZING: Resolving grid parameters...",
  "COMPLETED: Render canvas sequence ready...",
];

export default function LoadingScreen({ onComplete }: LoadingScreenProps) {
  const [progress, setProgress] = useState(0);
  const [telemetryIndex, setTelemetryIndex] = useState(0);
  const [isDone, setIsDone] = useState(false);

  useEffect(() => {
    // Increment progress
    const progressInterval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(progressInterval);
          return 100;
        }
        // Increment faster or slower randomly
        const next = prev + Math.floor(Math.random() * 8) + 4;
        return next > 100 ? 100 : next;
      });
    }, 120);

    return () => clearInterval(progressInterval);
  }, []);

  useEffect(() => {
    // Increment telemetry index based on progress
    if (progress < 15) setTelemetryIndex(0);
    else if (progress < 30) setTelemetryIndex(1);
    else if (progress < 50) setTelemetryIndex(2);
    else if (progress < 70) setTelemetryIndex(3);
    else if (progress < 85) setTelemetryIndex(4);
    else if (progress < 98) setTelemetryIndex(5);
    else setTelemetryIndex(6);

    if (progress === 100) {
      const timeout = setTimeout(() => {
        setIsDone(true);
        setTimeout(onComplete, 800); // Allow fadeout animation to complete
      }, 700);
      return () => clearTimeout(timeout);
    }
  }, [progress, onComplete]);

  return (
    <AnimatePresence>
      {!isDone && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.6, ease: "easeInOut" }}
          className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-[#0B1120] text-[#F8FAFC]"
        >
          {/* Glowing particle background behind loader */}
          <div className="absolute inset-0 glow-spot-cyan pointer-events-none opacity-40" />

          <div className="relative z-10 w-full max-w-lg px-6 flex flex-col items-center text-center">
            {/* Spinning DNA Icon */}
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ repeat: Infinity, duration: 3, ease: "linear" }}
              className="mb-8 p-4 rounded-full border border-cyan-glow/20 bg-cyan-glow/5 relative shadow-[0_0_30px_rgba(6,182,212,0.15)]"
            >
              <Dna className="w-12 h-12 text-cyan-glow" />
              {/* Outer pulsing ring */}
              <span className="absolute inset-0 rounded-full border border-emerald-green/40 animate-ping opacity-75" />
            </motion.div>

            {/* Title / Name */}
            <motion.h1
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-2xl md:text-3xl font-bold font-heading uppercase tracking-widest text-[#F8FAFC]"
            >
              DURGA <span className="gradient-text">BIOLABS</span>
            </motion.h1>
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.7 }}
              transition={{ delay: 0.4 }}
              className="text-xs uppercase tracking-[0.25em] text-emerald-green mt-1 mb-8"
            >
              Quantum Bioinformatics Platform
            </motion.p>

            {/* Glassmorphism Telemetry panel */}
            <div className="w-full h-32 rounded-lg bg-black/45 border border-white-slate/5 p-4 mb-6 font-mono text-left text-[11px] overflow-hidden flex flex-col justify-end shadow-inner">
              <div className="flex items-center text-cyan-glow mb-2 space-x-1.5 opacity-90 border-b border-white-slate/5 pb-1">
                <Terminal className="w-3 h-3" />
                <span className="font-bold tracking-wider">TELEMETRY_LOG</span>
              </div>
              <div className="space-y-1 text-slate-400 select-none">
                {TELEMETRY_LINES.slice(0, telemetryIndex).map((line, i) => (
                  <div key={i} className="opacity-40 line-clamp-1">
                    &gt; {line}
                  </div>
                ))}
                <div className="text-emerald-green font-semibold animate-pulse line-clamp-1">
                  &gt; {TELEMETRY_LINES[telemetryIndex]}
                </div>
              </div>
            </div>

            {/* Loader bar container */}
            <div className="w-full flex items-center justify-between text-xs font-mono mb-2 text-slate-400">
              <span className="tracking-wide">ANALYSIS PIPELINE</span>
              <span className="text-cyan-glow font-semibold">{progress}%</span>
            </div>

            {/* Loading Bar */}
            <div className="w-full h-1 bg-slate-800/60 rounded-full overflow-hidden border border-white-slate/5 relative shadow-inner">
              <motion.div
                className="h-full bg-gradient-to-r from-emerald-green to-cyan-glow rounded-full shadow-[0_0_12px_rgba(6,182,212,0.6)]"
                initial={{ width: 0 }}
                animate={{ width: `${progress}%` }}
                transition={{ duration: 0.1 }}
              />
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
