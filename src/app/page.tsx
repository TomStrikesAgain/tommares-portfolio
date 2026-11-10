"use client";

import { motion } from "framer-motion";
import { useLanguage } from "@/components/LanguageContext";
import { dict } from "@/lib/i18n";
import PortfolioInterviewer from "@/components/PortfolioInterviewer";
import HumanKpis from "@/components/HumanKpis";
import Navbar from "@/components/Navbar";

export default function Home() {
  const { lang } = useLanguage();
  const t = dict[lang];

  return (
    <main className="h-dvh bg-sunburst flex flex-col items-center px-2 pt-0 pb-2 sm:px-4 sm:pb-4 md:px-6 md:pb-6 font-inter overflow-hidden">
      <Navbar />

      {/* Main Content Container */}
      <div className="w-full max-w-5xl bg-primary/95 px-2.5 pt-3 pb-2.5 sm:px-5 sm:pt-4 sm:pb-4 md:px-8 md:pt-6 md:pb-5 relative shadow-2xl overflow-hidden flex-1 min-h-0 flex flex-col">
        {/* Inner Content Area */}
        <div className="p-0 sm:px-2 md:px-6 relative flex-col flex items-center w-full max-w-full min-w-0 flex-1 min-h-0">
          {/* Unified Above-the-Fold Header + KPI Strip */}
          <div className="flex flex-col items-center text-center mt-0.5 sm:mt-1 mb-3 sm:mb-4 w-full max-w-4xl min-w-0 flex-shrink-0">
            <motion.h1
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.15, duration: 0.5 }}
              className="font-bungee-hairline text-5xl sm:text-6xl md:text-7xl tracking-[0.08em] text-accent uppercase leading-none drop-shadow-[0_4px_4px_rgba(0,0,0,0.8)]"
            >
              Tom <br className="sm:hidden" />Mares
            </motion.h1>

            <motion.p
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.25, duration: 0.5 }}
              className="mt-3 md:mt-4 text-xs sm:text-sm md:text-base font-bold uppercase tracking-widest text-secondary bg-accent px-3 py-1 md:px-4 md:py-1.5 inline-block shadow-lg"
            >
              {t.title}
            </motion.p>

            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.35, duration: 0.5 }}
              className="mt-3 md:mt-4 w-full max-w-full min-w-0 flex justify-center"
            >
              <HumanKpis />
            </motion.div>
          </div>

          <PortfolioInterviewer />
        </div>
      </div>
    </main>
  );
}
