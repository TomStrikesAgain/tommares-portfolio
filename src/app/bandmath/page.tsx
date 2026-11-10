"use client";

import { useState } from "react";
import Link from "next/link";
import { ChevronRight, ChevronLeft, Mail, Check, ExternalLink } from "lucide-react";
import { useLanguage } from "@/components/LanguageContext";
import BandMathGallery from "@/components/BandMathGallery";
import CaseStudyAccordion from "@/components/CaseStudyAccordion";
import Navbar from "@/components/Navbar";
import { dict } from "@/lib/i18n";

export default function BandMathCaseStudyPage() {
  const { lang } = useLanguage();
  const t = dict[lang];
  const [copiedEmail, setCopiedEmail] = useState(false);

  const handleCopyEmail = () => {
    const emailAddress = ["portfolio", "tommares.com"].join("@");
    navigator.clipboard.writeText(emailAddress);
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2500);
  };

  return (
    <main className="min-h-screen bg-sunburst flex flex-col items-center px-3 pt-0 pb-3 sm:px-4 sm:pb-4 md:px-6 md:pb-6 font-inter">
      <Navbar />

      <div className="w-full max-w-5xl bg-primary/95 px-3 pt-3 pb-5 sm:px-5 sm:pt-4 sm:pb-6 md:px-8 md:pt-5 md:pb-8 relative shadow-2xl overflow-hidden">
        <div className="p-0 sm:p-2 md:px-6 md:py-2 relative flex flex-col items-center w-full max-w-full min-w-0">
          {/* BandMath Case Study Section */}
          <section className="w-full max-w-4xl text-left space-y-4 md:space-y-6 mt-1 mb-10 md:mb-14">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <h1 className="font-anton text-[1.875rem] leading-[2.25rem] md:text-5xl md:leading-tight text-secondary tracking-wide drop-shadow-md">
                {t.case_study_title}
              </h1>
              <Link
                href="https://itsbandmath.com"
                target="_blank"
                rel="noopener noreferrer"
                className="font-anton text-xs sm:text-sm md:text-base bg-secondary text-accent px-3.5 py-2 md:px-5 md:py-2.5 uppercase tracking-widest hover:bg-accent hover:text-primary transition-colors flex items-center gap-1.5"
              >
                <span>{t.view_bandmath}</span>
                <ExternalLink className="w-4 h-4" />
              </Link>
            </div>

            <BandMathGallery />

            <div className="bg-[#0b0514] border-2 border-secondary p-4 md:p-10 space-y-3 md:space-y-4">
              <h2 className="font-bold text-base md:text-xl uppercase tracking-widest text-accent border-b-2 border-secondary pb-2 mb-3 md:mb-4">
                {t.case_study_subtitle}
              </h2>
              <p className="text-body-standard mb-3 md:mb-4">
                {t.case_study_intro}
              </p>
              <CaseStudyAccordion />
            </div>
          </section>

          {/* Leadership Proof Section */}
          <section className="w-full max-w-4xl text-left space-y-4 md:space-y-6 mb-10 md:mb-12">
            <h2 className="font-anton text-[1.875rem] leading-[2.25rem] md:text-5xl md:leading-tight text-secondary mb-4 md:mb-6 tracking-wide drop-shadow-md text-right">
              {t.leadership_title}
            </h2>
            <div className="bg-primary border-4 border-secondary p-4 md:p-10 space-y-3 md:space-y-4 shadow-[-8px_8px_0_0_#6325a6] md:shadow-[-12px_12px_0_0_#6325a6]">
              <ul className="list-disc list-inside text-body-standard space-y-2 md:space-y-3">
                <li>
                  <strong className="text-accent font-bold">{t.ls_servant_title}</strong> {t.ls_servant_desc}
                </li>
                <li>
                  <strong className="text-accent font-bold">{t.ls_budget_title}</strong> {t.ls_budget_desc}
                </li>
                <li>
                  <strong className="text-accent font-bold">{t.ls_team_title}</strong> {t.ls_team_desc}
                </li>
                <li>
                  <strong className="text-accent font-bold">{t.ls_align_title}</strong> {t.ls_align_desc}
                </li>
              </ul>
            </div>
          </section>

          {/* Bottom Navigation & Contact Footer */}
          <div className="flex flex-col items-center gap-4 mt-2 w-full max-w-4xl">
            <div className="flex flex-col sm:flex-row justify-between gap-3 w-full">
              <Link
                href="/profile"
                className="font-anton text-sm md:text-base bg-transparent text-accent border-2 border-secondary px-4 py-2.5 md:px-5 md:py-3 uppercase tracking-widest hover:bg-secondary transition-colors flex items-center justify-center gap-2"
              >
                <ChevronLeft className="w-4 h-4 md:w-5 md:h-5" />
                <span>{t.nav_profile}</span>
              </Link>

              <Link
                href="/case-studies"
                className="font-anton text-sm md:text-base bg-secondary text-accent px-4 py-2.5 md:px-5 md:py-3 uppercase tracking-widest hover:bg-accent hover:text-primary transition-colors flex items-center justify-center gap-2"
              >
                <span>{t.nav_archive}</span>
                <ChevronRight className="w-4 h-4 md:w-5 md:h-5" />
              </Link>
            </div>

            <div className="flex flex-wrap items-center justify-center gap-3 pt-3 border-t border-secondary/40 w-full text-xs sm:text-sm">
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
