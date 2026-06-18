"use client";

import React, { useRef, useState } from "react";
import { twMerge } from "tailwind-merge";
import { Mail } from "lucide-react";

const HeroSection: React.FC = () => {
  return (
    <section className="w-full flex flex-col items-center text-center gap-6">
      <div className="relative mb-2">
        <span className="absolute inset-0 rounded-full bg-gradient-to-tr from-pink-500 via-red-500 to-orange-400 opacity-60 blur-lg animate-pulse" />
        <img
          src="/portrait.png"
          alt="avatar"
          className="relative size-32 rounded-full border-4 border-zinc-800 shadow-xl z-10 object-cover bg-slate-900"
          onError={(e) => {
            // fallback to dicebear seed if local image fails
            e.currentTarget.src = "https://api.dicebear.com/8.x/lorelei-neutral/svg?seed=Durga";
          }}
        />
      </div>
      <h1 className="text-4xl md:text-5xl font-extrabold leading-tight tracking-tight text-white drop-shadow-lg">
        Hi, I&apos;m Durga Prasad D
      </h1>
      <p className="text-lg md:text-xl text-zinc-300 max-w-lg mx-auto font-normal">
        Biotechnology Student | Research Enthusiast | Innovator
      </p>
    </section>
  );
};

interface SocialLink {
  href: string;
  label: string;
  icon: React.ReactNode;
  bg: string;
  text: string;
}

const socialLinks: SocialLink[] = [
  {
    href: 'https://www.linkedin.com/in/durga-prasad-490167391',
    label: 'LinkedIn',
    icon: (
      <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
        <rect width="4" height="12" x="2" y="9" />
        <circle cx="4" cy="4" r="2" />
      </svg>
    ),
    bg: 'bg-[#0077b5] hover:bg-[#006097]',
    text: 'text-white',
  },
  {
    href: 'https://github.com/durga2113',
    label: 'GitHub',
    icon: (
      <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
        <path d="M9 18c-4.51 2-5-2-7-2" />
      </svg>
    ),
    bg: 'bg-zinc-800 hover:bg-zinc-700',
    text: 'text-white',
  },
  {
    href: 'mailto:durgaprasad21508@gmail.com',
    label: 'Email',
    icon: <Mail size={24} />,
    bg: 'bg-emerald-600 hover:bg-emerald-500',
    text: 'text-white',
  },
];

const SocialsBlock: React.FC = () => (
  <div className="flex flex-wrap justify-center gap-4 w-full">
    {socialLinks.map((link) => (
      <a
        key={link.label}
        href={link.href}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={link.label}
        className={twMerge(
          'flex items-center justify-center gap-3 rounded-full border border-zinc-800 px-6 py-3.5 text-sm font-semibold shadow-lg transition-all duration-200 hover:scale-105 hover:shadow-xl hover:border-pink-400 focus:outline-none focus:ring-2 focus:ring-pink-300 bg-opacity-80',
          link.bg,
          link.text,
        )}
        style={{ minWidth: 140, minHeight: 52 }}
        tabIndex={0}
      >
        {link.icon}
        <span>{link.label}</span>
      </a>
    ))}
  </div>
);

const AboutBlock = () => (
  <div className="w-full rounded-2xl border border-zinc-800 bg-zinc-950/80 p-7 shadow-lg text-center">
    <p className="text-base md:text-lg text-zinc-200 font-normal leading-relaxed">
      Passionate about mastering wet-lab techniques, sequence alignment databases, molecular containment rules, and utilizing bioinformatics tools to solve modern healthcare challenges.
    </p>
  </div>
);

const ConnectSection: React.FC = () => {
  const [message, setMessage] = useState("");
  const [showToast, setShowToast] = useState(false);
  const [error, setError] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  const validateMessage = (msg: string) => {
    if (!msg.trim()) return "Message cannot be empty.";
    if (msg.trim().length < 3) return "Message must be at least 3 characters.";
    if (msg.length > 200) return "Message cannot exceed 200 characters.";
    return "";
  };

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    const validationError = validateMessage(message);
    if (validationError) {
      setError(validationError);
      return;
    }
    setShowToast(true);
    setMessage("");
    setError("");
    if (inputRef.current) inputRef.current.blur();
    setTimeout(() => setShowToast(false), 2000);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setMessage(e.target.value);
    if (error) setError("");
  };

  return (
    <section className="w-full flex flex-col items-center text-center gap-4 mt-8 relative">
      {/* Toast Notification */}
      {showToast && (
        <div className="fixed top-6 right-6 z-50 bg-green-600 text-white px-6 py-3 rounded-xl shadow-lg font-semibold text-base animate-fade-in">
          Message sent!
        </div>
      )}
      <p className="text-sm md:text-base text-zinc-400 mb-4 max-w-md mx-auto font-normal">
        Interested in collaborating, chatting about biotech research, or just saying hi? Send me a message below!
      </p>
      <form onSubmit={handleSend} className="flex w-full max-w-md gap-2 items-center justify-center">
        <input
          ref={inputRef}
          type="text"
          value={message}
          onChange={handleInputChange}
          placeholder="Type your message..."
          className={twMerge(
            "flex-1 rounded-full border px-5 py-3 text-base text-zinc-100 placeholder-zinc-500 transition-colors focus:outline-none shadow bg-zinc-900 border-zinc-700 focus:border-pink-400"
          )}
          maxLength={201}
        />
        <button
          type="submit"
          className={twMerge(
            "inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-red-500 via-pink-500 to-orange-400 px-7 py-3 text-base font-semibold text-white shadow-lg focus:outline-none focus:ring-2 focus:ring-pink-300 transition-all",
            message.trim() ? "hover:scale-105 hover:shadow-xl cursor-pointer opacity-100" : "opacity-50 cursor-not-allowed"
          )}
          disabled={!message.trim()}
          aria-disabled={!message.trim()}
        >
          Send
        </button>
      </form>
      {error && (
        <div className="text-red-500 text-sm mt-1 font-medium">{error}</div>
      )}
      <style>{`
        .animate-fade-in {
          animation: fadeIn 0.3s ease;
        }
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(-10px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </section>
  );
};

export const PersonalLanding = () => {
  return (
    <div className="w-full flex items-center justify-center bg-gradient-to-br from-zinc-900 via-zinc-950 to-zinc-900 px-4 py-16 text-zinc-50 relative overflow-hidden rounded-3xl border border-zinc-800">
      {/* Animated background blob */}
      <div className="absolute -top-32 -left-32 w-[500px] h-[500px] bg-gradient-to-tr from-pink-500 via-red-500 to-orange-400 opacity-20 rounded-full blur-3xl animate-pulse z-0" />
      <div className="w-full max-w-2xl flex flex-col items-center gap-12 z-10">
        <HeroSection />
        <AboutBlock />
        <SocialsBlock />
        <ConnectSection />
      </div>
    </div>
  );
};
