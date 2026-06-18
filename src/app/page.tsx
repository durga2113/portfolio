"use client";

import React, { useState, useEffect } from "react";
import LoadingScreen from "@/components/LoadingScreen";
import CanvasBackground from "@/components/CanvasBackground";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Skills from "@/components/Skills";
import Projects from "@/components/Projects";
import Publications from "@/components/Publications";
import Certifications from "@/components/Certifications";
import Achievements from "@/components/Achievements";
import Gallery from "@/components/Gallery";
import Hobbies from "@/components/Hobbies";
import { BottomNavBar } from "@/components/ui/bottom-nav-bar";
import Contact from "@/components/Contact";
import Lenis from "lenis";

export default function Home() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (isLoading) return;

    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
    });

    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);
    return () => lenis.destroy();
  }, [isLoading]);

  return (
    <>
      {isLoading ? (
        <LoadingScreen onComplete={() => setIsLoading(false)} />
      ) : (
        <div className="relative min-h-screen">
          {/* Animated interactive DNA/Particle background canvas */}
          <CanvasBackground />

          {/* Floating Navigation Header */}
          <BottomNavBar stickyTop />

          {/* Portfolio content layers */}
          <main className="relative z-10">
            <Hero />
            
            <div className="max-w-7xl mx-auto px-6 space-y-16">
              <About />
              <Skills />
              <Projects />
              <Publications />
              <Certifications />
              <Achievements />
              <Gallery />
              <Hobbies />
              <div id="contact" className="pt-20">
                <Contact />
              </div>
            </div>

            {/* Futuristic Lab Footer */}
            <footer className="py-12 border-t border-slate-300 dark:border-slate-800 bg-[#F8FAFC]/5 dark:bg-[#0B1120]/40 backdrop-blur-md relative z-10 mt-16">
              <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-6 text-xs font-mono text-slate-500 dark:text-slate-400">
                <div className="flex items-center space-x-1.5" />
                <div className="text-center md:text-right">
                  <p>© {new Date().getFullYear()} DURGA PRASAD D. ALL RIGHTS RESERVED.</p>
                  <p className="opacity-60 mt-1">DESIGNED FOR FUTURISTIC BIO-COMPUTATION REPRESENTATION.</p>
                </div>
              </div>
            </footer>
          </main>
        </div>
      )}
    </>
  );
}
