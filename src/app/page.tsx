"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { ChevronRight, Mail, Check, ExternalLink } from "lucide-react";
import Link from "next/link";
import { useLanguage } from "@/components/LanguageContext";
import BandMathGallery from "@/components/BandMathGallery";
import CaseStudyAccordion from "@/components/CaseStudyAccordion";
import { dict } from "@/lib/i18n";
import PortfolioInterviewer from "@/components/PortfolioInterviewer";
import HumanKpis from "@/components/HumanKpis";

export default function Home() {
  const { lang } = useLanguage();
  const t = dict[lang];
  const [copiedEmail, setCopiedEmail] = useState(false);

  // Runtime assembly prevents static HTML email-harvester bots from scraping the address
  const handleCopyEmail = () => {
    const emailAddress = ["portfolio", "tommares.com"].join("@");
    navigator.clipboard.writeText(emailAddress);
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2500);
  };

  return (
    <main className="min-h-screen bg-sunburst flex flex-col items-center p-3 sm:p-4 md:p-6 font-inter overflow-x-hidden">
      {/* Main Content Container (Outer cream poster border removed for clean breathing room) */}
      <div className="w-full max-w-5xl bg-primary/95 p-3 sm:p-5 md:p-8 relative shadow-2xl overflow-hidden">
        {/* Inner Content Area */}
        <div className="p-0 sm:p-2 md:px-6 md:py-2 relative flex flex-col items-center w-full max-w-full min-w-0">
          
          {/* Unified Above-the-Fold Header + KPI Strip */}
          <div className="flex flex-col items-center text-center mt-1 sm:mt-2 mb-3 sm:mb-4 w-full max-w-4xl min-w-0">
            <motion.h1 
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.2, duration: 0.6 }}
              className="font-fascinate text-4xl sm:text-5xl md:text-6xl tracking-wider text-accent uppercase leading-none drop-shadow-[0_4px_4px_rgba(0,0,0,0.8)]"
            >
              Tom <br className="sm:hidden" />Mares
            </motion.h1>

            <motion.p 
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.35, duration: 0.6 }}
              className="mt-2.5 md:mt-3 text-xs sm:text-sm md:text-base font-bold uppercase tracking-widest text-secondary bg-accent px-3 py-1 md:px-4 md:py-1.5 inline-block shadow-lg"
            >
              {t.title}
            </motion.p>
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.5, duration: 0.6 }}
              className="mt-2.5 md:mt-3 w-full max-w-full min-w-0 flex justify-center"
            >
              <HumanKpis />
            </motion.div>
          </div>

          <PortfolioInterviewer />

          <div className="w-full h-1 bg-accent/30 my-6 md:my-8"></div>

          {/* BandMath Proof of Concept */}
          <section className="w-full max-w-4xl text-left space-y-4 md:space-y-6 mb-12 md:mb-16">
            <h2 className="font-anton text-[1.875rem] leading-[2.25rem] md:text-5xl md:leading-tight text-secondary mb-4 md:mb-8 tracking-wide drop-shadow-md">{t.case_study_title}</h2>
            <BandMathGallery />
            <div className="bg-primary border-4 border-accent p-4 md:p-10 space-y-3 md:space-y-4">
              <h4 className="font-bold text-base md:text-xl uppercase tracking-widest text-accent border-b-2 border-secondary pb-2 mb-3 md:mb-4">{t.case_study_subtitle}</h4>
              <p className="text-body-standard mb-3 md:mb-4">
                {t.case_study_intro}
              </p>
              <CaseStudyAccordion />
            </div>
          </section>

          {/* Human Proof */}
          <section className="w-full max-w-4xl text-left space-y-4 md:space-y-6 mb-12 md:mb-16">
            <h2 className="font-anton text-[1.875rem] leading-[2.25rem] md:text-5xl md:leading-tight text-secondary mb-4 md:mb-8 tracking-wide drop-shadow-md text-right">{t.leadership_title}</h2>
            <div className="bg-primary border-4 border-secondary p-4 md:p-10 space-y-3 md:space-y-4 shadow-[-8px_8px_0_0_#6325a6] md:shadow-[-12px_12px_0_0_#6325a6]">
              <ul className="list-disc list-inside text-body-standard space-y-2 md:space-y-3">
                <li><strong className="text-accent font-bold">{t.ls_servant_title}</strong> {t.ls_servant_desc}</li>
                <li><strong className="text-accent font-bold">{t.ls_budget_title}</strong> {t.ls_budget_desc}</li>
                <li><strong className="text-accent font-bold">{t.ls_team_title}</strong> {t.ls_team_desc}</li>
                <li><strong className="text-accent font-bold">{t.ls_align_title}</strong> {t.ls_align_desc}</li>
              </ul>
            </div>
          </section>

          {/* Call to Actions & Direct Contact */}
          <div className="flex flex-col items-center gap-4 md:gap-5 mt-4 md:mt-8 w-full max-w-4xl">
            <div className="flex flex-col sm:flex-row justify-center gap-4 md:gap-6 w-full">
              <Link 
                href="https://itsbandmath.com" 
                className="font-anton text-base md:text-lg bg-secondary text-accent px-4 py-3 md:px-6 md:py-3 uppercase tracking-widest hover:bg-accent hover:text-primary transition-colors border-2 border-accent flex items-center justify-center gap-2"
              >
                {t.view_bandmath} <ChevronRight className="w-5 h-5 md:w-6 md:h-6" />
              </Link>
              <Link 
                href="/case-studies" 
                className="font-anton text-base md:text-lg bg-transparent text-accent border-2 border-secondary px-4 py-3 md:px-6 md:py-3 uppercase tracking-widest hover:bg-secondary transition-colors flex items-center justify-center gap-2"
              >
                {t.view_vault} <ChevronRight className="w-5 h-5 md:w-6 md:h-6" />
              </Link>
            </div>

            {/* Anti-Scraper Contact Bar: Copy Email + LinkedIn */}
            <div className="flex flex-wrap items-center justify-center gap-3 pt-2 border-t border-secondary/40 w-full text-xs sm:text-sm">
              <button
                type="button"
                onClick={handleCopyEmail}
                className="bg-[#120720] hover:bg-secondary text-accent border border-secondary px-3.5 py-2 font-medium transition-colors cursor-pointer flex items-center gap-2"
              >
                {copiedEmail ? (
                  <>
                    <Check className="w-4 h-4 text-emerald-400" />
                    <span>{lang === "fr" ? "Adresse copiée dans le presse-papiers !" : "Email copied to clipboard!"}</span>
                  </>
                ) : (
                  <>
                    <Mail className="w-4 h-4 text-[#a855f7]" />
                    <span>{lang === "fr" ? "Copier l'email de Tom" : "Copy Tom's Email"}</span>
                  </>
                )}
              </button>

              <a
                href="https://www.linkedin.com/in/tom-mares-projects"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-[#120720] hover:bg-secondary text-accent border border-secondary px-3.5 py-2 font-medium transition-colors flex items-center gap-2"
              >
                <span>LinkedIn</span>
                <ExternalLink className="w-3.5 h-3.5 text-[#a855f7]" />
              </a>
            </div>
          </div>
          
        </div>
      </div>
    </main>
  );
}
