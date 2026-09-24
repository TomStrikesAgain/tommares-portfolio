"use client";

import { motion } from "framer-motion";
import { Code, Zap, Briefcase, ChevronRight, Film } from "lucide-react";
import Link from "next/link";
import { useLanguage } from "@/components/LanguageContext";
import BandMathGallery from "@/components/BandMathGallery";
import { dict } from "@/lib/i18n";

export default function Home() {
  const { lang } = useLanguage();
  const t = dict[lang];

  return (
    <main className="min-h-screen bg-sunburst flex flex-col items-center p-4 md:p-8 font-inter">
      {/* Outer Vintage Poster Frame */}
      <div className="w-full max-w-5xl bg-primary border-[8px] md:border-[12px] border-accent p-2 md:p-8 relative shadow-2xl">
        {/* Inner Content Area */}
        <div className="p-4 md:p-12 relative flex flex-col items-center">
          
          {/* Header */}
          <div className="flex flex-col items-center text-center mt-6 mb-8 md:mt-12 md:mb-12">
            <motion.h1 
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.3, duration: 0.8 }}
              className="font-fascinate text-5xl md:text-7xl lg:text-8xl tracking-wider text-accent uppercase leading-none drop-shadow-[0_4px_4px_rgba(0,0,0,0.8)]"
            >
              Tom
              <br />
              Mares
            </motion.h1>

            <motion.p 
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.5, duration: 0.8 }}
              className="mt-4 md:mt-6 text-sm sm:text-base md:text-xl font-bold uppercase tracking-widest text-secondary bg-accent px-3 py-1.5 md:px-4 md:py-2 inline-block shadow-lg"
            >
              {t.title}
            </motion.p>
            <motion.p
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.6, duration: 0.8 }}
              className="mt-3 md:mt-4 text-xs sm:text-sm md:text-lg font-bold uppercase tracking-wider text-accent/80 text-center px-2"
            >
              {t.tagline}
            </motion.p>
          </div>

          <div className="w-full h-1 bg-accent/30 my-6 md:my-8"></div>

          {/* The Pitch */}
          <section className="w-full max-w-3xl text-center space-y-4 md:space-y-6 mb-12 md:mb-16">
            <h2 className="font-anton text-2xl md:text-4xl text-secondary mb-4 md:mb-6 tracking-wide drop-shadow-md">{t.mission_title}</h2>
            <p className="text-xs sm:text-sm md:text-lg leading-relaxed text-accent/90">
              {t.mission_p1}
            </p>
            <p className="text-xs sm:text-sm md:text-lg leading-relaxed text-accent/90">
              {t.mission_p2}
            </p>
          </section>

          {/* Value Proposition Grid */}
          <section className="w-full grid md:grid-cols-2 gap-4 md:gap-8 mb-12 md:mb-16">
            <div className="border-2 border-secondary bg-primary p-4 md:p-6 shadow-[4px_4px_0_0_#6325a6] md:shadow-[8px_8px_0_0_#6325a6]">
              <h3 className="flex items-center gap-2 font-anton text-lg md:text-2xl mb-2 md:mb-3 text-accent tracking-wide">
                <Zap className="w-5 h-5 md:w-6 md:h-6 flex-shrink-0" />
                {lang === "en" ? "Building WITH AI" : "Construire AVEC l'IA"}
              </h3>
              <p className="text-xs md:text-base text-accent/80">
                {lang === "en" 
                  ? "I use AI as an exoskeleton to manage, architect, and deliver traditional software at warp speed. I am not an LLM researcher; I am an ultra-efficient orchestrator."
                  : "J'utilise l'IA comme exosquelette pour gérer, concevoir et livrer des logiciels traditionnels à une vitesse fulgurante. Je ne suis pas un chercheur en LLM ; je suis un orchestrateur ultra-efficace."}
              </p>
            </div>
            <div className="border-2 border-secondary bg-primary p-4 md:p-6 shadow-[4px_4px_0_0_#6325a6] md:shadow-[8px_8px_0_0_#6325a6]">
              <h3 className="flex items-center gap-2 font-anton text-lg md:text-2xl mb-2 md:mb-3 text-accent tracking-wide">
                <Briefcase className="w-5 h-5 md:w-6 md:h-6 flex-shrink-0" />
                {lang === "en" ? "Extreme Ownership" : "Responsabilité Absolue"}
              </h3>
              <p className="text-xs md:text-base text-accent/80">
                {lang === "en" 
                  ? "From managing $100k+ commercial television budgets to architecting a full SaaS ecosystem alone. I don't just pass tickets; I own the product from vision to production."
                  : "De la gestion de budgets TV de plus de 100k$ à l'architecture complète d'un SaaS en solo. Mon rôle va bien au-delà de la simple gestion de tickets ; j'assume la pleine responsabilité du produit, de sa vision jusqu'à sa mise en production."}
              </p>
            </div>
            <div className="border-2 border-secondary bg-primary p-4 md:p-6 md:col-span-2 shadow-[4px_4px_0_0_#6325a6] md:shadow-[8px_8px_0_0_#6325a6]">
              <h3 className="flex items-center gap-2 font-anton text-lg md:text-2xl mb-2 md:mb-3 text-accent tracking-wide">
                <Film className="w-5 h-5 md:w-6 md:h-6 flex-shrink-0" />
                {lang === "en" ? "Narrative-Driven Production" : "Production Guidée par le Récit"}
              </h3>
              <p className="text-xs md:text-base text-accent/80">
                {lang === "en" 
                  ? "For 17 years in video production, my job was to guide viewers through a compelling narrative without losing their attention. An exceptional application is simply a great story told to a user. My superpower is designing those intuitive, frictionless UX journeys while maintaining rigorous, battle-tested accountability on the back end."
                  : "Pendant 17 ans en production vidéo, mon rôle était de guider les spectateurs à travers un récit sans perdre leur attention. Une excellente application n'est rien d'autre qu'une belle histoire racontée à l'utilisateur. Ma force est de concevoir des parcours UX fluides et intuitifs, tout en garantissant une rigueur absolue envers les parties prenantes."}
              </p>
            </div>
          </section>

          <div className="w-full h-1 bg-accent/30 my-6 md:my-8"></div>

          {/* BandMath Proof of Concept */}
          <section className="w-full max-w-4xl text-left space-y-4 md:space-y-6 mb-12 md:mb-16">
            <h2 className="font-anton text-2xl md:text-4xl text-secondary mb-4 md:mb-6 tracking-wide drop-shadow-md">{t.case_study_title}</h2>
            <BandMathGallery />
            <div className="bg-primary border-4 border-accent p-4 md:p-10 space-y-3 md:space-y-4">
              <h4 className="font-bold text-base md:text-xl uppercase tracking-widest text-accent border-b-2 border-secondary pb-2 mb-3 md:mb-4">{t.case_study_subtitle}</h4>
              <p className="text-accent/90 text-xs md:text-base mb-3 md:mb-4">
                {t.case_study_intro}
              </p>
              <ul className="list-disc list-inside text-accent/90 space-y-2 md:space-y-3 text-xs md:text-base">
                <li><strong className="text-accent font-bold">{t.cs_arch_title}</strong> {t.cs_arch_desc}</li>
                <li><strong className="text-accent font-bold">{t.cs_portal_title}</strong> {t.cs_portal_desc}</li>
                <li><strong className="text-accent font-bold">{t.cs_finance_title}</strong> {t.cs_finance_desc}</li>
                <li><strong className="text-accent font-bold">{t.cs_security_title}</strong> {t.cs_security_desc}</li>
                <li><strong className="text-accent font-bold">{t.cs_uiux_title}</strong> {t.cs_uiux_desc}</li>
                <li><strong className="text-accent font-bold">{t.cs_ci_title}</strong> {t.cs_ci_desc}</li>
                <li><strong className="text-accent font-bold">{t.cs_qa_title}</strong> {t.cs_qa_desc}</li>
                <li><strong className="text-accent font-bold">{t.cs_support_title}</strong> {t.cs_support_desc}</li>
                <li><strong className="text-accent font-bold">{t.cs_admin_title}</strong> {t.cs_admin_desc}</li>
                <li><strong className="text-accent font-bold">{t.cs_sdlc_title}</strong> {t.cs_sdlc_desc}</li>
              </ul>
            </div>
          </section>

          {/* Human Proof */}
          <section className="w-full max-w-4xl text-left space-y-4 md:space-y-6 mb-12 md:mb-16">
            <h2 className="font-anton text-2xl md:text-4xl text-secondary mb-4 md:mb-6 tracking-wide drop-shadow-md text-right">{t.leadership_title}</h2>
            <div className="bg-primary border-4 border-secondary p-4 md:p-10 space-y-3 md:space-y-4 shadow-[-8px_8px_0_0_#6325a6] md:shadow-[-12px_12px_0_0_#6325a6]">
              <ul className="list-disc list-inside text-accent/90 space-y-2 md:space-y-3 text-xs md:text-base">
                <li><strong className="text-accent font-bold">{t.ls_servant_title}</strong> {t.ls_servant_desc}</li>
                <li><strong className="text-accent font-bold">{t.ls_budget_title}</strong> {t.ls_budget_desc}</li>
                <li><strong className="text-accent font-bold">{t.ls_team_title}</strong> {t.ls_team_desc}</li>
                <li><strong className="text-accent font-bold">{t.ls_align_title}</strong> {t.ls_align_desc}</li>
              </ul>
            </div>
          </section>

          {/* Call to Actions */}
          <div className="flex flex-col md:flex-row justify-center gap-4 md:gap-6 mt-4 md:mt-8">
            <Link 
              href="https://itsbandmath.com" 
              className="font-anton text-base md:text-lg bg-secondary text-accent px-4 py-3 md:px-6 md:py-3 uppercase tracking-widest hover:bg-accent hover:text-primary transition-colors border-2 border-accent flex items-center justify-center gap-2"
            >
              {t.view_bandmath} <ChevronRight className="w-5 h-5 md:w-6 md:h-6" />
            </Link>
            <Link 
              href="/video-production" 
              className="font-anton text-base md:text-lg bg-transparent text-accent border-2 border-secondary px-4 py-3 md:px-6 md:py-3 uppercase tracking-widest hover:bg-secondary transition-colors flex items-center justify-center gap-2"
            >
              {t.view_vault} <ChevronRight className="w-5 h-5 md:w-6 md:h-6" />
            </Link>
          </div>
          
        </div>
      </div>
    </main>
  );
}
