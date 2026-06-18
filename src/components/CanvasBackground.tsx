"use client";

import React, { useEffect, useRef } from "react";

export default function CanvasBackground() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    // Mouse coordinates
    const mouse = {
      x: -1000,
      y: -1000,
      radius: 150,
    };

    // DNA strand config
    const dnaConfig = {
      nodesCount: 35,
      amplitude: 70,
      frequency: 0.007,
      speed: 0.02,
      baseRadius: 4,
      spacing: 40,
    };

    let dnaAngle = 0;

    // Background particles config
    const particles: Particle[] = [];
    const particleCount = 45;

    class Particle {
      x: number;
      y: number;
      vx: number;
      vy: number;
      radius: number;
      color: string;
      alpha: number;

      constructor() {
        this.x = Math.random() * width;
        this.y = Math.random() * height;
        this.vx = (Math.random() - 0.5) * 0.4;
        this.vy = (Math.random() - 0.5) * 0.4;
        this.radius = Math.random() * 3 + 1;
        this.alpha = Math.random() * 0.5 + 0.15;
        this.color = Math.random() > 0.5 ? "#F59E0B" : "#E11D48"; // Sunset Gold or Crimson Red
      }

      draw(c: CanvasRenderingContext2D, isDark: boolean) {
        c.save();
        c.globalAlpha = this.alpha;
        c.shadowBlur = this.radius * 2;
        c.shadowColor = this.color;
        c.fillStyle = isDark ? this.color : this.color === "#F59E0B" ? "#D97706" : "#BE123C";
        c.beginPath();
        c.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        c.fill();
        c.restore();
      }

      update() {
        this.x += this.vx;
        this.y += this.vy;

        // Interactive mouse push
        const dx = this.x - mouse.x;
        const dy = this.y - mouse.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < mouse.radius) {
          const force = (mouse.radius - dist) / mouse.radius;
          const angle = Math.atan2(dy, dx);
          this.x += Math.cos(angle) * force * 1.5;
          this.y += Math.sin(angle) * force * 1.5;
        }

        // Boundary wrap
        if (this.x < 0) this.x = width;
        if (this.x > width) this.x = 0;
        if (this.y < 0) this.y = height;
        if (this.y > height) this.y = 0;
      }
    }

    // Initialize particles
    for (let i = 0; i < particleCount; i++) {
      particles.push(new Particle());
    }

    // Handles resizing
    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };

    // Tracks mouse
    const handleMouseMove = (e: MouseEvent) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
    };

    const handleMouseLeave = () => {
      mouse.x = -1000;
      mouse.y = -1000;
    };

    window.addEventListener("resize", handleResize);
    window.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseleave", handleMouseLeave);

    // Render loop
    const render = () => {
      const isDark = document.documentElement.classList.contains("dark");
      
      // Clean background transparently so CSS backgrounds can render
      ctx.clearRect(0, 0, width, height);

      // Draw floating particles
      particles.forEach((p) => {
        p.update();
        p.draw(ctx, isDark);
      });

      // Draw DNA Helix
      dnaAngle += dnaConfig.speed;
      const dnaX = width * 0.85; // Align to the right side of the screen
      const startY = 100;
      const endY = height - 100;

      ctx.lineWidth = 1.5;

      for (let y = startY; y < endY; y += dnaConfig.spacing) {
        // Calculate offset wave for two strands
        const offsetAngle = y * dnaConfig.frequency + dnaAngle;
        const offset1 = Math.sin(offsetAngle) * dnaConfig.amplitude;
        const offset2 = Math.sin(offsetAngle + Math.PI) * dnaConfig.amplitude;

        const x1 = dnaX + offset1;
        const x2 = dnaX + offset2;

        // Handle mouse interaction on DNA strands
        const dx1 = x1 - mouse.x;
        const dy1 = y - mouse.y;
        const dist1 = Math.sqrt(dx1 * dx1 + dy1 * dy1);
        let shiftX1 = 0;
        if (dist1 < mouse.radius) {
          const force = (mouse.radius - dist1) / mouse.radius;
          shiftX1 = Math.cos(Math.atan2(dy1, dx1)) * force * 15;
        }

        const dx2 = x2 - mouse.x;
        const dy2 = y - mouse.y;
        const dist2 = Math.sqrt(dx2 * dx2 + dy2 * dy2);
        let shiftX2 = 0;
        if (dist2 < mouse.radius) {
          const force = (mouse.radius - dist2) / mouse.radius;
          shiftX2 = Math.cos(Math.atan2(dy2, dx2)) * force * 15;
        }

        const finalX1 = x1 + shiftX1;
        const finalX2 = x2 + shiftX2;

        // Draw connector ladder step (bond)
        ctx.beginPath();
        ctx.moveTo(finalX1, y);
        ctx.lineTo(finalX2, y);
        // Fade the rung based on cosine to give 3D rotation depth
        const depth = Math.cos(offsetAngle);
        const rungAlpha = Math.abs(depth) * 0.4 + 0.1;
        ctx.strokeStyle = isDark
          ? `rgba(248, 250, 252, ${rungAlpha * 0.4})`
          : `rgba(15, 23, 42, ${rungAlpha * 0.3})`;
        ctx.stroke();

        // Draw strand nodes
        // Strand 1 node (Cyan)
        ctx.save();
        ctx.beginPath();
        const baseColor1 = "#06B6D4";
        ctx.arc(finalX1, y, dnaConfig.baseRadius + (depth > 0 ? 1.5 : -1), 0, Math.PI * 2);
        ctx.fillStyle = baseColor1;
        if (isDark) {
          ctx.shadowBlur = 10;
          ctx.shadowColor = baseColor1;
        }
        ctx.fill();
        ctx.restore();

        // Strand 2 node (Emerald)
        ctx.save();
        ctx.beginPath();
        const baseColor2 = "#10B981";
        ctx.arc(finalX2, y, dnaConfig.baseRadius + (depth < 0 ? 1.5 : -1), 0, Math.PI * 2);
        ctx.fillStyle = baseColor2;
        if (isDark) {
          ctx.shadowBlur = 10;
          ctx.shadowColor = baseColor2;
        }
        ctx.fill();
        ctx.restore();
      }

      animationId = requestAnimationFrame(render);
    };

    render();

    // Cleanups
    return () => {
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseleave", handleMouseLeave);
      cancelAnimationFrame(animationId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 w-full h-full -z-10 pointer-events-none transition-colors duration-500"
    />
  );
}
