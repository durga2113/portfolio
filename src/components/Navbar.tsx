"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Beaker, Home, User, FlaskConical, Database, BookOpen, Award, Trophy, Image as ImageIcon, Heart, Mail } from "lucide-react";
import { LimelightNav } from "@/components/ui/limelight-nav";
import Switch from "@/components/ui/sky-toggle";

const MOBILE_NAV_ITEMS = [
  { label: "Home", href: "#home" },
  { label: "About", href: "#about" },
  { label: "Skills", href: "#skills" },
  { label: "Projects", href: "#projects" },
  { label: "Publications", href: "#publications" },
  { label: "Certifications", href: "#certifications" },
  { label: "Achievements", href: "#achievements" },
  { label: "Gallery", href: "#gallery" },
  { label: "Hobbies", href: "#hobbies" },
  { label: "Contact", href: "#contact" },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [theme, setTheme] = useState<"dark" | "light">("dark");

  useEffect(() => {
    // Detect scroll position to shrink nav
    const handleScroll = () => {
      if (window.scrollY > 40) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    // Load theme from local storage
    const savedTheme = localStorage.getItem("theme") as "dark" | "light" | null;
    if (savedTheme) {
      setTheme(savedTheme);
      if (savedTheme === "dark") {
        document.documentElement.classList.add("dark");
      } else {
        document.documentElement.classList.remove("dark");
      }
    } else {
      // Default to dark mode
      document.documentElement.classList.add("dark");
    }
  }, []);

  const toggleTheme = () => {
    const nextTheme = theme === "dark" ? "light" : "dark";
    setTheme(nextTheme);
    localStorage.setItem("theme", nextTheme);
    if (nextTheme === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  };

  const customNavItems = [
    { id: 'home', icon: <Home />, label: 'Home', onClick: () => window.location.hash = '#home' },
    { id: 'about', icon: <User />, label: 'About', onClick: () => window.location.hash = '#about' },
    { id: 'skills', icon: <FlaskConical />, label: 'Skills', onClick: () => window.location.hash = '#skills' },
    { id: 'projects', icon: <Database />, label: 'Projects', onClick: () => window.location.hash = '#projects' },
    { id: 'publications', icon: <BookOpen />, label: 'Publications', onClick: () => window.location.hash = '#publications' },
    { id: 'certifications', icon: <Award />, label: 'Certifications', onClick: () => window.location.hash = '#certifications' },
    { id: 'achievements', icon: <Trophy />, label: 'Achievements', onClick: () => window.location.hash = '#achievements' },
    { id: 'gallery', icon: <ImageIcon />, label: 'Gallery', onClick: () => window.location.hash = '#gallery' },
    { id: 'hobbies', icon: <Heart />, label: 'Hobbies', onClick: () => window.location.hash = '#hobbies' },
    { id: 'contact', icon: <Mail />, label: 'Contact', onClick: () => window.location.hash = '#contact' },
  ];

  return (
    <>
      <header
        className={`fixed top-0 left-0 w-full z-40 transition-all duration-300 ${
          scrolled ? "py-2" : "py-4"
        }`}
      >
        <div className="max-w-7xl mx-auto px-6">
          <nav
            className={`w-full flex items-center justify-between px-6 py-2 rounded-full transition-all duration-300 ${
              scrolled
                ? "glass-panel bg-white/70 dark:bg-deep-navy/80 shadow-lg"
                : "border border-transparent bg-transparent"
            }`}
          >
            {/* Logo */}
            <a href="#home" className="flex items-center space-x-2 group">
              <div className="relative p-1.5 rounded-lg border border-cyan-glow/30 bg-cyan-glow/5 group-hover:bg-cyan-glow/10 transition-colors">
                <Beaker className="w-5 h-5 text-cyan-glow group-hover:scale-110 transition-transform" />
              </div>
              <span className="font-heading font-bold tracking-widest text-sm md:text-base text-slate-800 dark:text-[#F8FAFC]">
                DP<span className="text-cyan-glow">.</span>LAB
              </span>
            </a>

            {/* Desktop Nav: LimelightNav integration */}
            <div className="hidden lg:flex items-center justify-center">
              <LimelightNav 
                items={customNavItems} 
                className="border-none bg-transparent h-12" 
                iconContainerClassName="p-3.5"
                iconClassName="w-4.5 h-4.5 text-slate-600 dark:text-slate-300"
              />
            </div>

            {/* SkyToggle & Mobile Menu Trigger */}
            <div className="flex items-center space-x-4">
              {/* SkyToggle Theme Switch */}
              <div className="flex items-center">
                <Switch checked={theme === "light"} onChange={toggleTheme} />
              </div>

              {/* Mobile Menu Toggle */}
              <button
                onClick={() => setIsOpen(!isOpen)}
                aria-label="Toggle Navigation Menu"
                className="lg:hidden p-2 rounded-full border border-slate-300 dark:border-slate-800 text-slate-600 dark:text-slate-300 hover:bg-cyan-glow/5 transition-all cursor-pointer"
              >
                {isOpen ? <X className="w-4.5 h-4.5" /> : <Menu className="w-4.5 h-4.5" />}
              </button>
            </div>
          </nav>
        </div>
      </header>

      {/* Mobile Drawer Navigation Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-x-0 top-[72px] mx-6 z-40 glass-panel bg-white/95 dark:bg-[#0B1120]/95 rounded-2xl p-6 shadow-xl lg:hidden flex flex-col space-y-3"
          >
            {MOBILE_NAV_ITEMS.map((item) => (
              <a
                key={item.label}
                href={item.href}
                onClick={() => setIsOpen(false)}
                className="w-full py-2 px-4 rounded-xl text-sm font-semibold tracking-wider uppercase text-slate-700 dark:text-slate-300 hover:text-cyan-glow dark:hover:text-cyan-glow hover:bg-cyan-glow/5 transition-all"
              >
                {item.label}
              </a>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
