"use client";

import React, { useRef, useEffect, useMemo, useState } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Float, MeshDistortMaterial } from "@react-three/drei";
import * as THREE from "three";
import gsap from "gsap";

const LiquidBackground = ({ isDark }: { isDark: boolean }) => {
  const meshRef = useRef<THREE.Mesh>(null);
  const { viewport } = useThree();

  const uniforms = useMemo(
    () => ({
      uTime: { value: 0 },
      uMouse: { value: new THREE.Vector2(0, 0) },
      uColorA: { value: new THREE.Color(isDark ? "#000000" : "#F5EBE0") },
      uColorB: { value: new THREE.Color(isDark ? "#0A0A0A" : "#F59E0B") },
    }),
    []
  );

  // Update uniforms when theme changes
  useEffect(() => {
    uniforms.uColorA.value.set(isDark ? "#000000" : "#F5EBE0");
    uniforms.uColorB.value.set(isDark ? "#0A0A0A" : "#F59E0B");
  }, [isDark, uniforms]);

  useFrame((state) => {
    const { clock, mouse } = state;
    if (meshRef.current) {
      (meshRef.current.material as THREE.ShaderMaterial).uniforms.uTime.value = clock.getElapsedTime();
      (meshRef.current.material as THREE.ShaderMaterial).uniforms.uMouse.value.lerp(mouse, 0.05);
    }
  });

  return (
    <mesh ref={meshRef} scale={[viewport.width, viewport.height, 1]}>
      <planeGeometry args={[1, 1]} />
      <shaderMaterial
        transparent
        uniforms={uniforms}
        vertexShader={`varying vec2 vUv; void main() { vUv = uv; gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0); }`}
        fragmentShader={`
          uniform float uTime; uniform vec2 uMouse; uniform vec3 uColorA; uniform vec3 uColorB; varying vec2 vUv;
          void main() {
            vec2 uv = vUv; float t = uTime * 0.15;
            vec2 m = uMouse * 0.1;
            float color = smoothstep(0.0, 1.0, (sin(uv.x * 8.0 + t + m.x * 12.0) + sin(uv.y * 6.0 - t + m.y * 12.0)) * 0.5 + 0.5);
            gl_FragColor = vec4(mix(uColorA, uColorB, isDark ? color : color * 0.3), 1.0);
          }
        `}
      />
    </mesh>
  );
};

const Monolith = ({ isDark }: { isDark: boolean }) => {
  const meshRef = useRef<THREE.Mesh>(null);
  const { viewport } = useThree();

  const responsiveRadius = useMemo(() => {
    return Math.min(Math.max(viewport.width * 0.18, 5.5), 11.5);
  }, [viewport.width]);

  const responsivePosition = useMemo(() => {
    if (viewport.width < 40) {
      return [0, -3.5, 0] as [number, number, number];
    }
    return [3, 0, 0] as [number, number, number];
  }, [viewport.width]);

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.y = state.clock.getElapsedTime() * 0.25;
    }
  });

  return (
    <Float speed={2} rotationIntensity={0.5} floatIntensity={1}>
      <mesh ref={meshRef} position={responsivePosition}>
        <icosahedronGeometry args={[responsiveRadius, 1]} />
        <MeshDistortMaterial
          color={isDark ? "#0a0a0a" : "#F59E0B"}
          speed={4}
          distort={0.4}
          roughness={isDark ? 0.05 : 0.1}
          metalness={isDark ? 1.0 : 0.9}
        />
      </mesh>
    </Float>
  );
};

export default function Hero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const revealRef = useRef<HTMLDivElement>(null);
  const ctaRef = useRef<HTMLButtonElement>(null);
  const [isDark, setIsDark] = useState(true);

  // Sync theme status dynamically
  useEffect(() => {
    const checkDark = () => {
      setIsDark(document.documentElement.classList.contains("dark"));
    };
    checkDark();
    const observer = new MutationObserver(checkDark);
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ["class"] });
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        revealRef.current,
        { filter: "blur(30px)", opacity: 0, scale: 1.02 },
        { filter: "blur(0px)", opacity: 1, scale: 1, duration: 2.2, ease: "expo.out" }
      );

      gsap.from(".command-cell", {
        x: 60,
        opacity: 0,
        stagger: 0.1,
        duration: 1.5,
        ease: "power4.out",
        delay: 1,
        clearProps: "all",
      });

      const handleMouseMove = (e: MouseEvent) => {
        if (!ctaRef.current) return;
        const rect = ctaRef.current.getBoundingClientRect();
        const dist = Math.hypot(
          e.clientX - (rect.left + rect.width / 2),
          e.clientY - (rect.top + rect.height / 2)
        );
        if (dist < 150) {
          gsap.to(ctaRef.current, {
            x: (e.clientX - (rect.left + rect.width / 2)) * 0.4,
            y: (e.clientY - (rect.top + rect.height / 2)) * 0.4,
            duration: 0.6,
          });
        } else {
          gsap.to(ctaRef.current, {
            x: 0,
            y: 0,
            duration: 0.8,
            ease: "elastic.out(1, 0.3)",
          });
        }
      };
      window.addEventListener("mousemove", handleMouseMove);
      return () => window.removeEventListener("mousemove", handleMouseMove);
    }, containerRef);
    return () => ctx.revert();
  }, []);

  const handleDownloadResume = () => {
    const link = document.createElement("a");
    link.href = "/pandu resume .pdf";
    link.download = "Durga_Prasad_Resume.pdf";
    link.click();
  };

  return (
    <section
      id="home"
      ref={containerRef}
      className="relative min-h-screen w-full flex flex-col selection:bg-cyan-glow/30 selection:text-[#E11D48] overflow-hidden"
    >
      <div className="absolute inset-0 z-0 pointer-events-none">
        <Canvas camera={{ position: [0, 0, 60], fov: 35 }}>
          <ambientLight intensity={isDark ? 0.4 : 0.85} />
          <spotLight position={[50, 50, 50]} intensity={isDark ? 3 : 5.5} />
          <LiquidBackground isDark={isDark} />
          <Monolith isDark={isDark} />
        </Canvas>
      </div>

      <div
        ref={revealRef}
        className="relative z-10 w-full flex flex-col lg:flex-row p-8 md:p-14 lg:p-20 min-h-screen items-center lg:items-stretch gap-10 pt-28 pb-16"
      >
        <div className="flex-1 min-w-0 flex flex-col justify-between pb-12 lg:pb-8 w-full">
          <div className="flex items-center gap-3">
            <div className="relative w-2.5 h-2.5 bg-cyan-glow rounded-full">
              <div className="absolute inset-0 bg-cyan-glow rounded-full animate-ping opacity-30" />
            </div>
            <span className="font-mono text-[11px] font-bold text-[#3C2415] dark:text-white/70 tracking-[0.2em] uppercase">
              DP
            </span>
          </div>

          <div className="max-w-4xl lg:-translate-y-8 pr-12 mt-12 lg:mt-0">
            <h1 className="text-[clamp(2.5rem,7.5vw,9rem)] font-black leading-[0.87] tracking-tighter text-[#3C2415] dark:text-white uppercase italic-none">
              DURGA <br />
              <span
                style={{
                  WebkitTextStroke: isDark ? "1.5px rgba(255, 255, 255, 0.6)" : "1.8px rgba(60, 36, 21, 0.85)",
                  WebkitTextFillColor: "transparent",
                }}
              >
                PRASAD D
              </span>
            </h1>
            <p className="mt-8 font-mono text-[11px] text-[#7A5C4E] dark:text-white/50 uppercase tracking-[0.35em] max-w-sm leading-relaxed">
              Biotechnology student at Amity University. Exploring molecular biology, genomics, and bioinformatics.
            </p>
          </div>

          <button
            ref={ctaRef}
            onClick={handleDownloadResume}
            className="w-fit flex items-center gap-6 group lg:-translate-y-20 cursor-pointer focus:outline-none"
          >
            <div className="w-14 h-14 rounded-full border border-[#3C2415]/15 dark:border-white/15 bg-white/60 dark:bg-transparent flex items-center justify-center group-hover:bg-cyan-glow/10 group-hover:border-cyan-glow transition-all duration-500 overflow-hidden shadow-sm">
              <svg
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="group-hover:stroke-cyan-glow stroke-[#3C2415] dark:stroke-white transition-colors duration-500"
              >
                <path
                  d="M7 17L17 7M17 7H8M17 7V16"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>
            <span className="font-mono text-[11px] font-bold text-[#3C2415] dark:text-white uppercase tracking-[0.2em]">
              Download Resume
            </span>
          </button>
        </div>

        {/* Right Side Deck */}
        <div className="w-full lg:w-80 xl:w-96 flex-shrink-0 flex flex-col gap-4 justify-center z-20">
          {[
            { id: "001", title: "AVAILABILITY", val: "Open", type: "progress" },
            { id: "002", title: "ACADEMIC BASE", val: "Amity Uni", type: "data" },
            { id: "003", title: "RESEARCH CORNER", val: "Biotechnology", type: "text" },
          ].map((item) => (
            <div
              key={item.id}
              className="command-cell glass-panel p-6 sm:p-7 block opacity-1 bg-white/60 dark:bg-[#000000]/40 border border-[#3C2415]/15 dark:border-white/10 rounded-2xl backdrop-blur-md"
            >
              <span className="font-mono text-[9px] text-[#7A5C4E]/70 dark:text-white/25 uppercase tracking-widest block mb-3">
                {item.id} // {item.title}
              </span>
              {item.type === "progress" ? (
                <div className="flex justify-between items-end mt-2">
                  <h4 className="text-2xl sm:text-3xl font-bold text-[#3C2415] dark:text-white tracking-tighter">
                    {item.val}
                  </h4>
                  <div className="h-[2px] w-20 bg-[#3C2415]/15 dark:bg-white/5 rounded-full overflow-hidden">
                    <div className="h-full bg-cyan-glow w-[85%] animate-loading" />
                  </div>
                </div>
              ) : item.type === "data" ? (
                <div className="mt-4 flex flex-col gap-3">
                  <div className="flex justify-between text-[10px] font-mono text-[#7A5C4E] dark:text-white/50">
                    <span>Degree Program</span>
                    <span>B.Tech Biotech</span>
                  </div>
                  <div className="h-[1px] w-full bg-[#3C2415]/15 dark:bg-white/5" />
                  <div className="flex justify-between text-[10px] font-mono text-[#7A5C4E] dark:text-white/50">
                    <span>Current Stage</span>
                    <span>1st Year Pursuing</span>
                  </div>
                </div>
              ) : (
                <h3 className="text-sm font-medium text-[#3C2415]/80 dark:text-white/70 mt-3 leading-snug">
                  Focusing on wet-lab BSL guidelines, sequence retrieval, blast alignments, and PCR primer designs.
                </h3>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
