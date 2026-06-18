"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  Home,
  User,
  Trophy,
  Database,
  Heart,
  MessageCircle,
} from "lucide-react";
import { cn } from "@/lib/utils";
import Switch from "@/components/ui/sky-toggle";

const navItems = [
  { label: "Home", icon: Home },
  { label: "About", icon: User },
  { label: "Skills", icon: Trophy },
  { label: "Projects", icon: Database },
  { label: "Hobbies", icon: Heart },
  { label: "Contact", icon: MessageCircle },
];

const MOBILE_LABEL_WIDTH = 72;

type BottomNavBarProps = {
  className?: string;
  defaultIndex?: number;
  stickyBottom?: boolean;
  stickyTop?: boolean;
};

export function BottomNavBar({
  className,
  defaultIndex = 0,
  stickyBottom = false,
  stickyTop = false,
}: BottomNavBarProps) {
  const [activeIndex, setActiveIndex] = useState(defaultIndex);
  const [theme, setTheme] = useState<"dark" | "light">("dark");

  // Load and sync theme state
  useEffect(() => {
    const savedTheme = localStorage.getItem("theme") as "dark" | "light" | null;
    if (savedTheme === "light") {
      setTheme("light");
      document.documentElement.classList.remove("dark");
    } else {
      setTheme("dark");
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

  // Scroll spy to highlight active section in navbar automatically
  useEffect(() => {
    const sections = navItems.map((item) => item.label.toLowerCase());
    const observerOptions = {
      root: null,
      rootMargin: "-45% 0px -45% 0px", // triggers when center of section crosses center of screen
      threshold: 0,
    };

    const observerCallback = (entries: IntersectionObserverEntry[]) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const id = entry.target.id;
          const idx = sections.indexOf(id);
          if (idx !== -1) {
            setActiveIndex(idx);
          }
        }
      });
    };

    const observer = new IntersectionObserver(observerCallback, observerOptions);

    sections.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => {
      sections.forEach((id) => {
        const el = document.getElementById(id);
        if (el) observer.unobserve(el);
      });
    };
  }, []);

  const handleNavClick = (idx: number, label: string) => {
    setActiveIndex(idx);
    const targetId = label.toLowerCase();
    const element = document.getElementById(targetId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <motion.nav
      initial={{ scale: 0.9, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ type: "spring", stiffness: 300, damping: 26 }}
      role="navigation"
      aria-label="Navigation Header"
      className={cn(
        "bg-white/90 dark:bg-[#000000]/90 border border-slate-300 dark:border-slate-800/80 rounded-full flex items-center p-2 shadow-xl space-x-1 min-w-[340px] max-w-[95vw] h-[52px] backdrop-blur-md",
        stickyBottom && "fixed inset-x-0 bottom-4 mx-auto z-40 w-fit",
        stickyTop && "fixed inset-x-0 top-4 mx-auto z-40 w-fit",
        className,
      )}
    >
      {navItems.map((item, idx) => {
        const Icon = item.icon;
        const isActive = activeIndex === idx;

        return (
          <motion.button
            key={item.label}
            whileTap={{ scale: 0.97 }}
            className={cn(
              "flex items-center gap-0 px-3 py-2 rounded-full transition-colors duration-200 relative h-10 min-w-[44px] min-h-[40px] max-h-[44px] cursor-pointer",
              isActive
                ? "bg-cyan-glow/10 dark:bg-cyan-glow/15 text-cyan-glow gap-2"
                : "bg-transparent text-slate-500 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-800/60",
              "focus:outline-none focus-visible:ring-0",
            )}
            onClick={() => handleNavClick(idx, item.label)}
            aria-label={item.label}
            type="button"
          >
            <Icon
              size={20}
              strokeWidth={2}
              aria-hidden
              className="transition-colors duration-200"
            />

            <motion.div
              initial={false}
              animate={{
                width: isActive ? `${MOBILE_LABEL_WIDTH}px` : "0px",
                opacity: isActive ? 1 : 0,
                marginLeft: isActive ? "8px" : "0px",
              }}
              transition={{
                width: { type: "spring", stiffness: 350, damping: 32 },
                opacity: { duration: 0.19 },
                marginLeft: { duration: 0.19 },
              }}
              className={cn("overflow-hidden flex items-center max-w-[72px]")}
            >
              <span
                className={cn(
                  "font-medium text-xs whitespace-nowrap select-none transition-opacity duration-200 overflow-hidden text-ellipsis text-[clamp(0.625rem,0.5263rem+0.5263vw,1rem)] leading-[1.9]",
                  isActive ? "text-cyan-glow" : "opacity-0",
                )}
                title={item.label}
              >
                {item.label}
              </span>
            </motion.div>
          </motion.button>
        );
      })}

      {/* Vertical divider separating switch */}
      <div className="w-[1px] h-6 bg-slate-300 dark:bg-slate-800 mx-1 self-center" />

      {/* Theme toggle switch */}
      <div className="flex items-center pl-1 pr-1.5">
        <Switch checked={theme === "light"} onChange={toggleTheme} />
      </div>
    </motion.nav>
  );
}

export default BottomNavBar;
