"use client";

import { useRef, useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useLanguage } from "@/components/LanguageContext";
import { dict } from "@/lib/i18n";
import PortfolioInterviewer from "@/components/PortfolioInterviewer";
import HumanKpis from "@/components/HumanKpis";
import Navbar from "@/components/Navbar";
import AppleScrollIntro from "@/components/AppleScrollIntro";

// Module-level flag: resets to false on a fresh page load / Cmd+R refresh,
// but stays true across client-side Next.js Navbar navigation (/experience -> /).
let hasCompletedIntroInMemory = false;

export default function Home() {
  const { lang } = useLanguage();
  const t = dict[lang];
  const chatStageRef = useRef<HTMLDivElement>(null);
  const [skipIntro] = useState<boolean>(() => hasCompletedIntroInMemory);
  const lastYRef = useRef<number>(0);
  const isSnappingRef = useRef<boolean>(false);
  const snapRafRef = useRef<number | null>(null);

  useEffect(() => {
    if (skipIntro) return;

    // Gentle ease-in-out glide: starts slowly when it grabs, builds smooth momentum, and cushions softly into the chat stage
    const easeInOutSine = (x: number): number => -(Math.cos(Math.PI * x) - 1) / 2;

    const startGentleMagneticGlide = (startY: number, targetY: number) => {
      const distance = targetY - startY;
      if (distance <= 4) {
        isSnappingRef.current = false;
        return;
      }
      const durationMs = 1150;
      const startTime = performance.now();

      const step = (now: number) => {
        if (!isSnappingRef.current) return;
        const elapsed = now - startTime;
        const progress = Math.min(1, elapsed / durationMs);
        const eased = easeInOutSine(progress);
        const nextY = startY + distance * eased;
        lastYRef.current = nextY;
        window.scrollTo(0, nextY);

        if (progress < 1) {
          snapRafRef.current = requestAnimationFrame(step);
        } else {
          isSnappingRef.current = false;
          snapRafRef.current = null;
        }
      };

      snapRafRef.current = requestAnimationFrame(step);
    };

    const onWheel = (e: WheelEvent) => {
      // If user intentionally scrolls UP while the glide is happening, cancel the glide and give control right back
      if (isSnappingRef.current && e.deltaY < -4) {
        if (snapRafRef.current !== null) {
          cancelAnimationFrame(snapRafRef.current);
          snapRafRef.current = null;
        }
        isSnappingRef.current = false;
      }
    };

    const onScroll = () => {
      if (isSnappingRef.current) return;
      const y = window.scrollY;
      const prevY = lastYRef.current;
      const scrollingDown = y > prevY;
      lastYRef.current = y;

      const stageEl = chatStageRef.current;
      if (!stageEl) return;
      const targetTop = stageEl.offsetTop;

      // Once user scrolls down past Beat 3 (74% of the intro travel, after Beat 3 has fully settled),
      // gently pick up the page and glide down to the chat stage without a jerky browser jump.
      if (scrollingDown && y >= targetTop * 0.74 && y < targetTop - 8) {
        isSnappingRef.current = true;
        hasCompletedIntroInMemory = true;
        startGentleMagneticGlide(y, targetTop);
      }

      if (y >= targetTop * 0.78) {
        hasCompletedIntroInMemory = true;
      }
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("wheel", onWheel, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("wheel", onWheel);
      if (snapRafRef.current !== null) {
        cancelAnimationFrame(snapRafRef.current);
      }
    };
  }, [skipIntro]);

  return (
    <main className="min-h-dvh bg-sunburst flex flex-col items-center px-2 pt-0 pb-2 sm:px-4 sm:pb-4 md:px-6 md:pb-6 font-inter">
      {/* Apple-Style Full-Bleed Sticky 3D Scrollytelling Cold Open (Only shown on initial entry, skipped on return Navbar clicks) */}
      {!skipIntro && <AppleScrollIntro />}

      {/* Bottom Full-Viewport Destination: Navbar + Header + KPIs + Tom LM Chat */}
      <div
        ref={chatStageRef}
        className="w-full flex flex-col items-center h-dvh"
      >
        <Navbar />

        <div className="w-full max-w-5xl flex-1 min-h-0 bg-primary/95 px-2.5 pt-3 pb-2.5 sm:px-5 sm:pt-4 sm:pb-4 md:px-8 md:pt-6 md:pb-5 relative shadow-2xl overflow-hidden flex flex-col">
          {/* Inner Content Area */}
          <div className="p-0 sm:px-2 md:px-6 relative flex-col flex items-center w-full max-w-full min-w-0 flex-1 min-h-0">
          {/* Unified Above-the-Fold Header + KPI Strip */}
          <div className="flex flex-col items-center text-center mt-0.5 sm:mt-1 mb-3 sm:mb-4 w-full max-w-4xl min-w-0 flex-shrink-0">
            <motion.h1
              initial={{ y: 20, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              viewport={{ once: true, amount: 0.4 }}
              transition={{ delay: 0.1, duration: 0.5 }}
              className="font-bungee-hairline text-5xl sm:text-6xl md:text-7xl tracking-[0.08em] text-accent uppercase leading-none drop-shadow-[0_4px_4px_rgba(0,0,0,0.8)]"
            >
              Tom <br className="sm:hidden" />Mares
            </motion.h1>

            <motion.p
              initial={{ y: 20, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              viewport={{ once: true, amount: 0.4 }}
              transition={{ delay: 0.2, duration: 0.5 }}
              className="mt-3 md:mt-4 text-xs sm:text-sm md:text-base font-bold uppercase tracking-widest text-secondary bg-accent px-3 py-1 md:px-4 md:py-1.5 inline-block shadow-lg"
            >
              {t.title}
            </motion.p>

            <motion.div
              initial={{ y: 20, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              viewport={{ once: true, amount: 0.4 }}
              transition={{ delay: 0.3, duration: 0.5 }}
              className="mt-3 md:mt-4 w-full max-w-full min-w-0 flex justify-center"
            >
              <HumanKpis />
            </motion.div>
          </div>

          <PortfolioInterviewer />
          </div>
        </div>
      </div>
    </main>
  );
}
