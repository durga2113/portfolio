"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, ChevronLeft, ChevronRight, Image as ImageIcon } from "lucide-react";
import Image from "next/image";

interface GalleryItem {
  id: string;
  title: string;
  category: string;
  image: string;
  description: string;
}

const CATEGORIES = ["All", "Laboratory", "Conferences", "Workshops", "Research", "Team Activities"];

const GALLERY_DATA: GalleryItem[] = [
  {
    id: "g-1",
    title: "Pipetting under Laminar Flow Hood",
    category: "Laboratory",
    image: "/gallery_lab.png",
    description: "Preparing clinical samples for PCR sequencing analysis in a sterile environment."
  },
  {
    id: "g-2",
    title: "Research Presentation at Biotech Expo",
    category: "Conferences",
    image: "/gallery_conference.png",
    description: "Presenting the CRISPR off-target predictor model poster to computational scientists."
  },
  {
    id: "g-3",
    title: "Bioinformatics Pipeline Training Session",
    category: "Workshops",
    image: "/gallery_workshop.png",
    description: "Demonstrating RNA-Seq snakemake pipeline setup to master's students."
  },
  {
    id: "g-4",
    title: "Recombinant DNA Extraction under Microscope",
    category: "Research",
    image: "/gallery_research.png",
    description: "Detailed visualization of genetic materials isolated for therapeutic synthesis."
  },
  {
    id: "g-5",
    title: "Collaborating in the Compute Core Lab",
    category: "Team Activities",
    image: "/gallery_team.png",
    description: "Reviewing molecular dynamics simulation results with lab team members."
  }
];

export default function Gallery() {
  const [activeCategory, setActiveCategory] = useState("All");
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  // Filter items
  const filteredItems = activeCategory === "All"
    ? GALLERY_DATA
    : GALLERY_DATA.filter(item => item.category === activeCategory);

  const handleNext = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (lightboxIndex === null) return;
    setLightboxIndex((lightboxIndex + 1) % filteredItems.length);
  };

  const handlePrev = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (lightboxIndex === null) return;
    setLightboxIndex((lightboxIndex - 1 + filteredItems.length) % filteredItems.length);
  };

  return (
    <section id="gallery" className="py-24 relative overflow-hidden">
      {/* Ambient background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full glow-spot-cyan opacity-10 -z-10 pointer-events-none" />

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
            Research <span className="gradient-text">Gallery</span>
          </motion.h2>
          <motion.div
            initial={{ width: 0 }}
            whileInView={{ width: 60 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="h-1 bg-gradient-to-r from-emerald-green to-cyan-glow mx-auto rounded-full"
          />
        </div>

        {/* Categories Tab Selector */}
        <div className="flex flex-wrap items-center justify-center gap-3 mb-12">
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-4 py-2 rounded-full text-xs font-bold uppercase tracking-wider border transition-all cursor-pointer ${
                activeCategory === cat
                  ? "bg-gradient-to-r from-emerald-green to-cyan-glow border-transparent text-white shadow-md"
                  : "border-slate-300 dark:border-slate-800 text-slate-600 dark:text-slate-400 hover:text-cyan-glow hover:border-cyan-glow/30 hover:bg-cyan-glow/5"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Gallery Masonry Layout Grid */}
        <motion.div
          layout
          className="columns-1 sm:columns-2 lg:columns-3 gap-6 space-y-6"
        >
          <AnimatePresence mode="popLayout">
            {filteredItems.map((item, idx) => (
              <motion.div
                key={item.id}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.4 }}
                className="break-inside-avoid glass-panel rounded-2xl overflow-hidden group cursor-pointer relative"
                onClick={() => setLightboxIndex(idx)}
              >
                {/* Image */}
                <div className="relative overflow-hidden bg-slate-900">
                  <Image
                    src={item.image}
                    alt={item.title}
                    width={500}
                    height={380}
                    className="w-full h-auto object-cover group-hover:scale-105 transition-transform duration-500 brightness-90 contrast-105"
                  />
                  {/* Hover Overlay */}
                  <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
                </div>

                {/* Caption Card Body */}
                <div className="p-5">
                  <span className="text-[9px] font-mono font-bold text-emerald-green uppercase tracking-widest block mb-1">
                    {item.category}
                  </span>
                  <h3 className="text-sm md:text-base font-bold font-heading text-slate-800 dark:text-[#F8FAFC] leading-snug">
                    {item.title}
                  </h3>
                  <p className="text-xs text-slate-500 dark:text-slate-400 mt-2 leading-relaxed">
                    {item.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>

      {/* Lightbox Fullscreen Modal */}
      <AnimatePresence>
        {lightboxIndex !== null && (
          <div className="fixed inset-0 z-50 flex flex-col items-center justify-center p-4">
            {/* Dark Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setLightboxIndex(null)}
              className="absolute inset-0 bg-black/90 backdrop-blur-md"
            />

            {/* Navigation buttons */}
            <button
              onClick={handlePrev}
              aria-label="Previous image"
              className="absolute left-4 p-2.5 rounded-full border border-slate-700 bg-black/40 text-white hover:text-cyan-glow hover:bg-black/80 transition-colors cursor-pointer z-10"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>
            <button
              onClick={handleNext}
              aria-label="Next image"
              className="absolute right-4 p-2.5 rounded-full border border-slate-700 bg-black/40 text-white hover:text-cyan-glow hover:bg-black/80 transition-colors cursor-pointer z-10"
            >
              <ChevronRight className="w-6 h-6" />
            </button>

            {/* Close Button */}
            <button
              onClick={() => setLightboxIndex(null)}
              aria-label="Close lightbox"
              className="absolute top-4 right-4 p-2 rounded-full border border-slate-700 bg-black/40 text-white hover:text-red-400 hover:bg-black/80 transition-colors cursor-pointer z-10"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Lightbox Image Box */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.3 }}
              className="relative w-full max-w-4xl max-h-[70vh] aspect-video rounded-xl overflow-hidden shadow-2xl border border-white/10 z-10"
            >
              <Image
                src={filteredItems[lightboxIndex].image}
                alt={filteredItems[lightboxIndex].title}
                fill
                className="object-contain bg-slate-950"
                sizes="(max-width: 1200px) 100vw, 1200px"
              />
            </motion.div>

            {/* Text details in lightbox */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 10 }}
              transition={{ delay: 0.1 }}
              className="max-w-2xl text-center mt-6 text-white z-10 px-4"
            >
              <div className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-full bg-cyan-glow/10 border border-cyan-glow/20 text-[10px] font-mono text-cyan-glow uppercase tracking-wider mb-2">
                <ImageIcon className="w-3.5 h-3.5" />
                <span>{filteredItems[lightboxIndex].category}</span>
              </div>
              <h3 className="text-base md:text-lg font-bold font-heading mb-1.5">
                {filteredItems[lightboxIndex].title}
              </h3>
              <p className="text-xs md:text-sm text-slate-300 leading-relaxed">
                {filteredItems[lightboxIndex].description}
              </p>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
}
