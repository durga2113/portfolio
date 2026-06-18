"use client";

import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Mail, Send, CheckCircle, Loader2 } from "lucide-react";

interface FormFields {
  name: string;
  email: string;
  subject: string;
  message: string;
}

interface FormErrors {
  name?: string;
  email?: string;
  subject?: string;
  message?: string;
}

export default function Contact() {
  const [fields, setFields] = useState<FormFields>({
    name: "",
    email: "",
    subject: "Project Discussion",
    message: "",
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  // Eye tracking refs
  const eye1Ref = useRef<HTMLDivElement>(null);
  const eye2Ref = useRef<HTMLDivElement>(null);
  const pupil1Ref = useRef<HTMLDivElement>(null);
  const pupil2Ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const updateEye = (clientX: number, clientY: number, eyeEl: HTMLDivElement | null, pupilEl: HTMLDivElement | null) => {
      if (!eyeEl || !pupilEl) return;
      const rect = eyeEl.getBoundingClientRect();
      const eyeX = rect.left + rect.width / 2;
      const eyeY = rect.top + rect.height / 2;

      const dx = clientX - eyeX;
      const dy = clientY - eyeY;
      const angle = Math.atan2(dy, dx);

      const maxDist = 5; // pupil translation boundary limit
      const px = Math.cos(angle) * maxDist;
      const py = Math.sin(angle) * maxDist;

      pupilEl.style.transform = `translate(${px}px, ${py}px)`;
    };

    const handleMouseMove = (e: MouseEvent) => {
      updateEye(e.clientX, e.clientY, eye1Ref.current, pupil1Ref.current);
      updateEye(e.clientX, e.clientY, eye2Ref.current, pupil2Ref.current);
    };

    const handleTouchMove = (e: TouchEvent) => {
      if (e.touches.length === 0) return;
      const touch = e.touches[0];
      updateEye(touch.clientX, touch.clientY, eye1Ref.current, pupil1Ref.current);
      updateEye(touch.clientX, touch.clientY, eye2Ref.current, pupil2Ref.current);
    };

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("touchmove", handleTouchMove, { passive: true });
    window.addEventListener("touchstart", handleTouchMove, { passive: true });
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("touchmove", handleTouchMove);
      window.removeEventListener("touchstart", handleTouchMove);
    };
  }, []);

  const validate = () => {
    const newErrors: FormErrors = {};
    if (!fields.name.trim()) newErrors.name = "Name is required.";
    
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!fields.email.trim()) {
      newErrors.email = "Email is required.";
    } else if (!emailRegex.test(fields.email)) {
      newErrors.email = "Please specify a valid email address.";
    }

    if (!fields.subject.trim()) newErrors.subject = "Subject is required.";
    if (fields.message.trim().length < 10) {
      newErrors.message = "Message must be at least 10 characters long.";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFields((prev) => ({ ...prev, [name]: value }));
    if (errors[name as keyof FormErrors]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setIsSubmitting(true);
    // Simulate API delivery
    await new Promise((resolve) => setTimeout(resolve, 1800));
    setIsSubmitting(false);
    setSubmitSuccess(true);
    
    // Clear success banner after 5s
    setTimeout(() => {
      setSubmitSuccess(false);
      setFields({ name: "", email: "", subject: "Project Discussion", message: "" });
    }, 5000);
  };

  return (
    <section id="contact" className="py-24 relative overflow-hidden">
      {/* Background ambient glow */}
      <div className="absolute bottom-1/4 left-1/4 w-[400px] h-[400px] rounded-full glow-spot-cyan opacity-20 -z-10 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-stretch">
          {/* Left Column: Get In Touch header block, Info Cards, and social icons */}
          <div className="lg:col-span-5 flex flex-col justify-between space-y-8">
            
            {/* Header Area */}
            <div className="flex flex-col">
              <div className="flex items-center flex-wrap gap-4">
                <h2 className="text-5xl md:text-6xl font-cursive font-normal text-slate-800 dark:text-white leading-none">
                  Get In Touch
                </h2>
                {/* Floating Tracking Eyes */}
                <div className="flex items-center space-x-1.5 bg-[#fbf6ee]/50 dark:bg-slate-900/35 px-2 py-1.5 rounded-full border border-slate-300/20 shadow-sm backdrop-blur-xs select-none">
                  <div ref={eye1Ref} className="w-8 h-8 rounded-full bg-white flex items-center justify-center shadow-[inset_0_2px_4px_rgba(0,0,0,0.2)] border border-slate-300 relative">
                    <div ref={pupil1Ref} className="w-3.5 h-3.5 rounded-full bg-slate-950 transition-transform duration-75 ease-out" />
                  </div>
                  <div ref={eye2Ref} className="w-8 h-8 rounded-full bg-white flex items-center justify-center shadow-[inset_0_2px_4px_rgba(0,0,0,0.2)] border border-slate-300 relative">
                    <div ref={pupil2Ref} className="w-3.5 h-3.5 rounded-full bg-slate-950 transition-transform duration-75 ease-out" />
                  </div>
                </div>
              </div>
              <span className="text-xs font-mono font-bold tracking-[0.25em] text-[#8E2DE2] dark:text-[#a855f7] mt-3">
                LET&apos;S BUILD SOMETHING GREAT
              </span>
              <p className="text-xs md:text-sm text-slate-500 dark:text-slate-400 mt-6 leading-relaxed max-w-sm">
                Whether it&apos;s a project, collaboration or opportunity — let&apos;s build something great together.
              </p>
            </div>

            {/* Info Cards Column */}
            <div className="space-y-4 flex-1 py-4 justify-center flex flex-col">
              {/* Location Card */}
              <div className="flex items-center space-x-4 p-5 rounded-2xl glass-panel bg-slate-300/5 dark:bg-slate-800/10 border-slate-300/50 dark:border-slate-800/40">
                <div className="flex items-center justify-center w-12 h-12 rounded-xl bg-cyan-glow/5 border border-cyan-glow/20 text-cyan-glow">
                  <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" />
                    <circle cx="12" cy="10" r="3" />
                  </svg>
                </div>
                <div>
                  <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-cyan-glow/80">Location</span>
                  <p className="text-sm font-semibold text-slate-700 dark:text-[#F8FAFC]">India</p>
                </div>
              </div>

              {/* Phone Card */}
              <a href="tel:9494229216" className="flex items-center space-x-4 p-5 rounded-2xl glass-panel bg-slate-300/5 dark:bg-slate-800/10 border-slate-300/50 dark:border-slate-800/40 hover:border-cyan-glow/30 hover:bg-slate-300/10 dark:hover:bg-slate-800/20 transition-all group">
                <div className="flex items-center justify-center w-12 h-12 rounded-xl bg-cyan-glow/5 border border-cyan-glow/20 text-cyan-glow group-hover:scale-105 transition-transform">
                  <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 11.24z" />
                  </svg>
                </div>
                <div>
                  <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-cyan-glow/80">Phone</span>
                  <p className="text-sm font-semibold text-slate-700 dark:text-[#F8FAFC]">9494229216</p>
                </div>
              </a>

              {/* Email Card */}
              <a href="mailto:durgaprasad21508@gmail.com" className="flex items-center space-x-4 p-5 rounded-2xl glass-panel bg-slate-300/5 dark:bg-slate-800/10 border-slate-300/50 dark:border-slate-800/40 hover:border-cyan-glow/30 hover:bg-slate-300/10 dark:hover:bg-slate-800/20 transition-all group">
                <div className="flex items-center justify-center w-12 h-12 rounded-xl bg-cyan-glow/5 border border-cyan-glow/20 text-cyan-glow group-hover:scale-105 transition-transform">
                  <Mail className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-cyan-glow/80">Email</span>
                  <p className="text-sm font-semibold text-slate-700 dark:text-[#F8FAFC] truncate">durgaprasad21508@gmail.com</p>
                </div>
              </a>
            </div>

            {/* Social Links at Bottom Left */}
            <div className="flex items-center space-x-4 pt-4">
              <a
                href="https://www.linkedin.com/in/durga-prasad-490167391"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center w-12 h-12 rounded-full border border-slate-300 dark:border-slate-800 bg-slate-300/5 dark:bg-slate-800/20 text-slate-500 dark:text-slate-300 hover:text-cyan-glow hover:border-cyan-glow hover:shadow-[0_0_15px_rgba(6,182,212,0.4)] transition-all cursor-pointer"
                aria-label="LinkedIn Profile"
              >
                <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
                  <rect width="4" height="12" x="2" y="9" />
                  <circle cx="4" cy="4" r="2" />
                </svg>
              </a>

              <a
                href="https://github.com/durga2113"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center w-12 h-12 rounded-full border border-slate-300 dark:border-slate-800 bg-slate-300/5 dark:bg-slate-800/20 text-slate-500 dark:text-slate-300 hover:text-cyan-glow hover:border-cyan-glow hover:shadow-[0_0_15px_rgba(6,182,212,0.4)] transition-all cursor-pointer"
                aria-label="GitHub Profile"
              >
                <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
                  <path d="M9 18c-4.51 2-5-2-7-2" />
                </svg>
              </a>

              <a
                href="#home"
                className="flex items-center justify-center w-12 h-12 rounded-full border border-slate-300 dark:border-slate-800 bg-slate-300/5 dark:bg-slate-800/20 text-slate-500 dark:text-slate-300 hover:text-cyan-glow hover:border-cyan-glow hover:shadow-[0_0_15px_rgba(6,182,212,0.4)] transition-all cursor-pointer"
                aria-label="Website Link"
              >
                <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="12" cy="12" r="10" />
                  <path d="M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20" />
                  <path d="M2 12h20" />
                </svg>
              </a>
            </div>

          </div>

          {/* Right Column: Contact form container */}
          <div className="lg:col-span-7">
            <div className="glass-panel rounded-2xl p-6 md:p-8 h-full flex flex-col justify-center bg-slate-900/10 dark:bg-slate-950/20">
              <form onSubmit={handleSubmit} className="space-y-6">
                
                {/* Name and Email Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Name field */}
                  <div className="space-y-2">
                    <label htmlFor="name" className="text-xs font-semibold text-slate-700 dark:text-slate-300">
                      Name
                    </label>
                    <input
                      id="name"
                      type="text"
                      name="name"
                      value={fields.name}
                      onChange={handleInputChange}
                      className={`w-full px-4 py-3 rounded-xl border bg-slate-300/5 dark:bg-slate-900/40 text-sm outline-none transition-all text-slate-800 dark:text-slate-100 ${
                        errors.name
                          ? "border-red-400 focus:border-red-500 text-red-500"
                          : "border-slate-300 dark:border-slate-800 focus:border-cyan-glow/40"
                      }`}
                      placeholder="Your name"
                    />
                    {errors.name && <p className="text-[10px] text-red-400 font-mono">{errors.name}</p>}
                  </div>

                  {/* Email field */}
                  <div className="space-y-2">
                    <label htmlFor="email" className="text-xs font-semibold text-slate-700 dark:text-slate-300">
                      Email
                    </label>
                    <input
                      id="email"
                      type="email"
                      name="email"
                      value={fields.email}
                      onChange={handleInputChange}
                      className={`w-full px-4 py-3 rounded-xl border bg-slate-300/5 dark:bg-slate-900/40 text-sm outline-none transition-all text-slate-800 dark:text-slate-100 ${
                        errors.email
                          ? "border-red-400 focus:border-red-500 text-red-500"
                          : "border-slate-300 dark:border-slate-800 focus:border-cyan-glow/40"
                      }`}
                      placeholder="your@email.com"
                    />
                    {errors.email && <p className="text-[10px] text-red-400 font-mono">{errors.email}</p>}
                  </div>
                </div>

                {/* Subject Dropdown Field */}
                <div className="space-y-2">
                  <label htmlFor="subject" className="text-xs font-semibold text-slate-700 dark:text-slate-300">
                    Subject
                  </label>
                  <div className="relative">
                    <select
                      id="subject"
                      name="subject"
                      value={fields.subject}
                      onChange={handleInputChange}
                      className={`w-full px-4 py-3 rounded-xl border bg-slate-300/5 dark:bg-slate-900/40 text-sm outline-none transition-all appearance-none text-slate-800 dark:text-slate-100 ${
                        errors.subject
                          ? "border-red-400 focus:border-red-500 text-red-500"
                          : "border-slate-300 dark:border-slate-800 focus:border-cyan-glow/40"
                      }`}
                    >
                      <option value="Project Discussion" className="bg-[#fbf6ee] dark:bg-[#0B1120] text-slate-800 dark:text-slate-200">Project Discussion</option>
                      <option value="Research Collaboration" className="bg-[#fbf6ee] dark:bg-[#0B1120] text-slate-800 dark:text-slate-200">Research Collaboration</option>
                      <option value="General Inquiry" className="bg-[#fbf6ee] dark:bg-[#0B1120] text-slate-800 dark:text-slate-200">General Inquiry</option>
                    </select>
                    {/* Custom Dropdown Arrow */}
                    <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-slate-400 dark:text-slate-500">
                      <svg className="w-4 h-4" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                      </svg>
                    </div>
                  </div>
                  {errors.subject && <p className="text-[10px] text-red-400 font-mono">{errors.subject}</p>}
                </div>

                {/* Message field */}
                <div className="space-y-2">
                  <label htmlFor="message" className="text-xs font-semibold text-slate-700 dark:text-slate-300">
                    Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    rows={5}
                    value={fields.message}
                    onChange={handleInputChange}
                    className={`w-full px-4 py-3 rounded-xl border bg-slate-300/5 dark:bg-slate-900/40 text-sm outline-none transition-all resize-none text-slate-800 dark:text-slate-100 ${
                      errors.message
                        ? "border-red-400 focus:border-red-500 text-red-500"
                        : "border-slate-300 dark:border-slate-800 focus:border-cyan-glow/40"
                    }`}
                    placeholder="Tell me about your project..."
                  />
                  {errors.message && <p className="text-[10px] text-red-400 font-mono">{errors.message}</p>}
                </div>

                {/* Submit button / success alerts */}
                <div className="flex flex-col space-y-4 pt-2">
                  <AnimatePresence>
                    {submitSuccess && (
                      <motion.div
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -10 }}
                        className="flex items-center space-x-2 text-emerald-green font-mono text-xs font-bold"
                      >
                        <CheckCircle className="w-4 h-4 text-emerald-green" />
                        <span>INQUIRY TRANSMITTED SUCCESSFULLY.</span>
                      </motion.div>
                    )}
                  </AnimatePresence>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full py-3.5 rounded-xl text-sm font-bold text-white bg-gradient-to-r from-[#00A3FF] to-[#8E2DE2] hover:shadow-[0_0_20px_rgba(142,45,226,0.4)] transition-all transform hover:-translate-y-0.5 disabled:opacity-60 disabled:pointer-events-none flex items-center justify-center space-x-2 cursor-pointer"
                  >
                    {isSubmitting ? (
                      <>
                        <Loader2 className="w-4 h-4 animate-spin" />
                        <span>Sending...</span>
                      </>
                    ) : (
                      <>
                        <Send className="w-4 h-4" />
                        <span>Send Message &rarr;</span>
                      </>
                    )}
                  </button>
                </div>
              </form>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
