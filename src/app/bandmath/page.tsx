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
    <main className="relative min-h-screen bg-sunburst flex flex-col items-center px-3 pt-1 pb-6 sm:px-6 sm:pt-2 sm:pb-8 md:px-10 md:pb-12 font-inter overflow-x-hidden">
      {/* Ambient Neon Purple Lounge Backlight (Fixed in the room so scrolling feels unbounded) */}
      <div className="pointer-events-none fixed inset-0 flex items-center justify-center z-0">
        <div
          className="w-[540px] h-[540px] sm:w-[920px] sm:h-[740px] rounded-full"
          style={{
            background:
              "radial-gradient(circle, rgba(168,85,247,0.28) 0%, rgba(139,61,255,0.16) 30%, rgba(99,37,166,0.08) 54%, rgba(5,4,8,0) 76%)",
          }}
        />
      </div>

      <Navbar variant="transparent" />

      {/* Open Unbounded Content Stage (No outer black box) */}
      <div className="relative z-10 w-full max-w-5xl pt-5 pb-6 sm:pt-7 sm:pb-8 md:pt-10 md:pb-12 flex flex-col items-center">
        {/* BandMath Case Study Section */}
        <section className="w-full max-w-4xl text-left space-y-6 md:space-y-8 mb-12 md:mb-16">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <h1
              className="font-anton text-4xl sm:text-5xl md:text-6xl uppercase tracking-[0.05em] leading-none"
              style={{
                color: "transparent",
                WebkitTextStroke: "2px #d8b4fe",
                filter:
                  "drop-shadow(0 0 8px rgba(216,180,254,0.85)) drop-shadow(0 0 20px rgba(168,85,247,0.75))",
              }}
            >
              {t.case_study_title}
            </h1>
            <Link
              href="https://itsbandmath.com"
              target="_blank"
              rel="noopener noreferrer"
              className="font-anton text-xs sm:text-sm md:text-base bg-[#6325a6]/40 border border-[#a855f7] text-[#e9d5ff] px-3.5 py-2 md:px-5 md:py-2.5 uppercase tracking-widest hover:bg-accent hover:text-primary transition-colors flex items-center gap-2"
              style={{ textShadow: "0 0 16px rgba(168,85,247,0.5)" }}
            >
              <span>{t.view_bandmath}</span>
              <ExternalLink className="w-4 h-4" />
            </Link>
          </div>

          <BandMathGallery />

          {/* Open Editorial Architecture Overview + Accordions */}
          <div className="pt-2 space-y-4 md:space-y-5">
            <div className="border-l-2 border-[#a855f7]/60 pl-4 sm:pl-6 py-1 space-y-2.5">
              <h2
                className="font-bold text-xs sm:text-sm md:text-base uppercase tracking-[0.2em] text-[#e9d5ff]"
                style={{ textShadow: "0 0 18px rgba(168,85,247,0.5)" }}
              >
                {t.case_study_subtitle}
              </h2>
              <p className="text-base sm:text-lg md:text-[19px] font-light tracking-tight leading-[1.6] text-accent/90">
                {t.case_study_intro}
              </p>
            </div>
            <CaseStudyAccordion />
          </div>
        </section>

        {/* Leadership Proof Section */}
        <section className="w-full max-w-4xl text-left space-y-5 md:space-y-6 mb-12 md:mb-16">
          <h2
            className="font-anton text-2xl sm:text-3xl md:text-4xl text-[#e9d5ff] uppercase tracking-wider border-b border-[#a855f7]/40 pb-2.5"
            style={{ textShadow: "0 0 20px rgba(168,85,247,0.5)" }}
          >
            {t.leadership_title}
          </h2>
          <div className="border-l-2 border-[#a855f7]/60 pl-4 sm:pl-6 py-1">
            <ul className="space-y-3.5 text-sm sm:text-base md:text-[17px] font-light text-accent/90 leading-relaxed">
              <li className="flex items-start gap-2.5">
                <span className="text-[#a855f7] font-bold mt-0.5">▪</span>
                <span>
                  <strong
                    className="text-[#e9d5ff] font-semibold"
                    style={{ textShadow: "0 0 18px rgba(168,85,247,0.45)" }}
                  >
                    {t.ls_servant_title}
                  </strong>{" "}
                  {t.ls_servant_desc}
                </span>
              </li>
              <li className="flex items-start gap-2.5">
                <span className="text-[#a855f7] font-bold mt-0.5">▪</span>
                <span>
                  <strong
                    className="text-[#e9d5ff] font-semibold"
                    style={{ textShadow: "0 0 18px rgba(168,85,247,0.45)" }}
                  >
                    {t.ls_budget_title}
                  </strong>{" "}
                  {t.ls_budget_desc}
                </span>
              </li>
              <li className="flex items-start gap-2.5">
                <span className="text-[#a855f7] font-bold mt-0.5">▪</span>
                <span>
                  <strong
                    className="text-[#e9d5ff] font-semibold"
                    style={{ textShadow: "0 0 18px rgba(168,85,247,0.45)" }}
                  >
                    {t.ls_team_title}
                  </strong>{" "}
                  {t.ls_team_desc}
                </span>
              </li>
              <li className="flex items-start gap-2.5">
                <span className="text-[#a855f7] font-bold mt-0.5">▪</span>
                <span>
                  <strong
                    className="text-[#e9d5ff] font-semibold"
                    style={{ textShadow: "0 0 18px rgba(168,85,247,0.45)" }}
                  >
                    {t.ls_align_title}
                  </strong>{" "}
                  {t.ls_align_desc}
                </span>
              </li>
            </ul>
          </div>
        </section>

        {/* Bottom Navigation & Contact Footer */}
        <div className="flex flex-col items-center gap-4 mt-2 w-full max-w-4xl">
          <div className="flex flex-col sm:flex-row justify-between gap-3 w-full">
            <Link
              href="/profile"
              className="font-anton text-sm md:text-base bg-transparent text-accent border border-[#a855f7]/60 px-4 py-2.5 md:px-5 md:py-3 uppercase tracking-widest hover:bg-[#6325a6]/40 transition-colors flex items-center justify-center gap-2"
            >
              <ChevronLeft className="w-4 h-4 md:w-5 md:h-5" />
              <span>{t.nav_profile}</span>
            </Link>

            <Link
              href="/case-studies"
              className="font-anton text-sm md:text-base bg-[#6325a6]/40 border border-[#a855f7] text-[#e9d5ff] px-4 py-2.5 md:px-5 md:py-3 uppercase tracking-widest hover:bg-accent hover:text-primary transition-colors flex items-center justify-center gap-2"
              style={{ textShadow: "0 0 16px rgba(168,85,247,0.5)" }}
            >
              <span>{t.nav_archive}</span>
              <ChevronRight className="w-4 h-4 md:w-5 md:h-5" />
            </Link>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-3 pt-4 border-t border-[#a855f7]/30 w-full text-xs sm:text-sm">
            <button
              type="button"
              onClick={handleCopyEmail}
              className="bg-transparent hover:bg-[#6325a6]/30 text-accent border border-[#a855f7]/60 px-3.5 py-2 font-medium transition-colors cursor-pointer flex items-center gap-2"
            >
              {copiedEmail ? (
                <>
                  <Check className="w-4 h-4 text-emerald-400" />
                  <span>
                    {lang === "fr"
                      ? "Adresse copiée dans le presse-papiers !"
                      : "Email copied to clipboard!"}
                  </span>
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
              className="bg-transparent hover:bg-[#6325a6]/30 text-accent border border-[#a855f7]/60 px-3.5 py-2 font-medium transition-colors flex items-center gap-2"
            >
              <span>LinkedIn</span>
              <ExternalLink className="w-3.5 h-3.5 text-[#a855f7]" />
            </a>
          </div>
        </div>
      </div>
    </main>
  );
}
