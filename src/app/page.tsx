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
    <main className="min-h-screen bg-sunburst flex flex-col items-center p-3 sm:p-4 md:p-6 font-inter overflow-x-hidden">
      <Navbar />

      {/* Main Content Container */}
      <div className="w-full max-w-5xl bg-primary/95 p-3 sm:p-5 md:p-8 relative shadow-2xl overflow-hidden">
        {/* Inner Content Area */}
        <div className="p-0 sm:p-2 md:px-6 md:py-2 relative flex flex-col items-center w-full max-w-full min-w-0">
          {/* Unified Above-the-Fold Header + KPI Strip */}
          <div className="flex flex-col items-center text-center mt-1 sm:mt-2 mb-3 sm:mb-4 w-full max-w-4xl min-w-0">
            <motion.h1
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.15, duration: 0.5 }}
              className="font-fascinate text-4xl sm:text-5xl md:text-6xl tracking-wider text-accent uppercase leading-none drop-shadow-[0_4px_4px_rgba(0,0,0,0.8)]"
            >
              Tom <br className="sm:hidden" />Mares
            </motion.h1>

            <motion.p
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.25, duration: 0.5 }}
              className="mt-2.5 md:mt-3 text-xs sm:text-sm md:text-base font-bold uppercase tracking-widest text-secondary bg-accent px-3 py-1 md:px-4 md:py-1.5 inline-block shadow-lg"
            >
              {t.title}
            </motion.p>

            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.35, duration: 0.5 }}
              className="mt-2.5 md:mt-3 w-full max-w-full min-w-0 flex justify-center"
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
