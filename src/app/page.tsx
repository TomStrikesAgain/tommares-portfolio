"use client";

import { motion } from "framer-motion";
import { Code, Zap, Briefcase, ChevronRight } from "lucide-react";
import Link from "next/link";
import { useLanguage } from "@/components/LanguageContext";
import { dict } from "@/lib/i18n";

export default function Home() {
  const { lang } = useLanguage();
  const t = dict[lang];

  return (
    <main className="min-h-screen bg-sunburst flex flex-col items-center p-4 md:p-8 font-inter">
      {/* Outer Vintage Poster Frame */}
      <div className="w-full max-w-5xl bg-primary border-[12px] border-accent p-4 md:p-8 relative shadow-2xl">
        {/* Inner Border (simulating the zigzag or inner line frame) */}
        <div className="border-4 border-accent border-dashed p-6 md:p-12 relative flex flex-col items-center">
          
          {/* Header */}
          <div className="flex flex-col items-center text-center mt-12 mb-12">
            <motion.h1 
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.3, duration: 0.8 }}
              className="font-anton text-6xl md:text-8xl lg:text-9xl tracking-wider text-accent uppercase leading-none drop-shadow-[0_4px_4px_rgba(0,0,0,0.8)]"
            >
              Tom
              <br />
              Mares
            </motion.h1>

            <motion.p 
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.5, duration: 0.8 }}
              className="mt-6 text-xl md:text-2xl font-bold uppercase tracking-widest text-secondary bg-accent px-4 py-2 inline-block shadow-lg"
            >
              {t.title}
            </motion.p>
            <motion.p
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.6, duration: 0.8 }}
              className="mt-4 text-lg font-bold uppercase tracking-wider text-accent/80 text-center"
            >
              {t.tagline}
            </motion.p>
          </div>

          <div className="w-full h-1 bg-accent/30 my-8"></div>

          {/* The Pitch */}
          <section className="w-full max-w-3xl text-center space-y-6 mb-16">
            <h2 className="font-anton text-4xl text-secondary mb-6 tracking-wide drop-shadow-md">{t.mission_title}</h2>
            <p className="text-lg md:text-xl leading-relaxed text-accent/90">
              {t.mission_p1}
            </p>
            <p className="text-lg md:text-xl leading-relaxed text-accent/90">
              {t.mission_p2}
            </p>
          </section>

          {/* Value Proposition Grid */}
          <section className="w-full grid md:grid-cols-2 gap-8 mb-16">
            <div className="border-2 border-secondary bg-primary p-6 shadow-[8px_8px_0_0_#6325a6]">
              <div className="text-accent mb-4"><Zap size={40} /></div>
              <h3 className="font-anton text-2xl mb-3 text-accent tracking-wide">{lang === "en" ? "Building WITH AI" : "Construire AVEC l'IA"}</h3>
              <p className="text-accent/80">
                {lang === "en" 
                  ? "I use AI as an exoskeleton to manage, architect, and deliver traditional software at warp speed. I am not an LLM researcher; I am an ultra-efficient orchestrator."
                  : "J'utilise l'IA comme exosquelette pour gérer, concevoir et livrer des logiciels traditionnels à une vitesse fulgurante. Je ne suis pas un chercheur en LLM ; je suis un orchestrateur ultra-efficace."}
              </p>
            </div>
            <div className="border-2 border-secondary bg-primary p-6 shadow-[8px_8px_0_0_#6325a6]">
              <div className="text-accent mb-4"><Briefcase size={40} /></div>
              <h3 className="font-anton text-2xl mb-3 text-accent tracking-wide">{lang === "en" ? "Extreme Ownership" : "Ownership Extrême"}</h3>
              <p className="text-accent/80">
                {lang === "en" 
                  ? "From managing $100k+ commercial television budgets to architecting a full SaaS ecosystem alone. I don't just pass tickets; I own the product from vision to production."
                  : "De la gestion de budgets TV de plus de 100k$ à l'architecture complète d'un SaaS en solo. Je ne me contente pas de traiter des tickets ; je suis responsable du produit, de la vision à la production."}
              </p>
            </div>
            <div className="border-2 border-secondary bg-primary p-6 md:col-span-2 shadow-[8px_8px_0_0_#6325a6]">
              <div className="text-accent mb-4"><Code size={40} /></div>
              <h3 className="font-anton text-2xl mb-3 text-accent tracking-wide">{lang === "en" ? "Frictionless Delivery" : "Delivery Sans Friction"}</h3>
              <p className="text-accent/80">
                {lang === "en" 
                  ? "By leveraging AI for writing specs, documenting architecture, and generating boilerplate, I remove the traditional friction points in the Agile lifecycle."
                  : "En exploitant l'IA pour rédiger des spécifications, documenter l'architecture et générer du code boilerplate, j'élimine les points de friction traditionnels du cycle de vie Agile."}
              </p>
            </div>
          </section>

          <div className="w-full h-1 bg-accent/30 my-8"></div>

          {/* BandMath Proof of Concept */}
          <section className="w-full max-w-4xl text-left space-y-6 mb-16">
            <h2 className="font-anton text-4xl text-secondary mb-6 tracking-wide drop-shadow-md">{t.case_study_title}</h2>
            <div className="bg-primary border-4 border-accent p-6 md:p-10 space-y-4 shadow-[12px_12px_0_0_#f1ecd7]">
              <h4 className="font-bold text-xl uppercase tracking-widest text-accent border-b-2 border-secondary pb-2 mb-4">{t.case_study_subtitle}</h4>
              <p className="text-accent/90 text-lg mb-4">
                {t.case_study_intro}
              </p>
              <ul className="list-disc list-inside text-accent/90 space-y-3 text-lg">
                <li><strong className="text-secondary">{t.cs_arch_title}</strong> {t.cs_arch_desc}</li>
                <li><strong className="text-secondary">{t.cs_admin_title}</strong> {t.cs_admin_desc}</li>
                <li><strong className="text-secondary">{t.cs_portal_title}</strong> {t.cs_portal_desc}</li>
                <li><strong className="text-secondary">{t.cs_ci_title}</strong> {t.cs_ci_desc}</li>
                <li><strong className="text-secondary">{t.cs_qa_title}</strong> {t.cs_qa_desc}</li>
                <li><strong className="text-secondary">{t.cs_support_title}</strong> {t.cs_support_desc}</li>
                <li><strong className="text-secondary">{t.cs_finance_title}</strong> {t.cs_finance_desc}</li>
                <li><strong className="text-secondary">{t.cs_security_title}</strong> {t.cs_security_desc}</li>
                <li><strong className="text-secondary">{t.cs_sdlc_title}</strong> {t.cs_sdlc_desc}</li>
              </ul>
            </div>
          </section>

          {/* Human Proof */}
          <section className="w-full max-w-4xl text-left space-y-6 mb-16">
            <h2 className="font-anton text-4xl text-secondary mb-6 tracking-wide drop-shadow-md text-right">{t.leadership_title}</h2>
            <div className="bg-primary border-4 border-secondary p-6 md:p-10 space-y-4 shadow-[-12px_12px_0_0_#6325a6]">
              <ul className="list-disc list-inside text-accent/90 space-y-3 text-lg">
                <li><strong className="text-accent">{t.ls_servant_title}</strong> {t.ls_servant_desc}</li>
                <li><strong className="text-accent">{t.ls_budget_title}</strong> {t.ls_budget_desc}</li>
                <li><strong className="text-accent">{t.ls_team_title}</strong> {t.ls_team_desc}</li>
                <li><strong className="text-accent">{t.ls_align_title}</strong> {t.ls_align_desc}</li>
              </ul>
            </div>
          </section>

          {/* Call to Actions */}
          <div className="flex flex-col md:flex-row justify-center gap-6 mt-8">
            <Link 
              href="https://itsbandmath.com" 
              className="font-anton text-xl bg-secondary text-accent px-8 py-4 uppercase tracking-widest hover:bg-accent hover:text-primary transition-colors border-2 border-accent flex items-center justify-center gap-2"
            >
              {t.view_bandmath} <ChevronRight />
            </Link>
            <Link 
              href="/video-production" 
              className="font-anton text-xl bg-transparent text-accent border-2 border-secondary px-8 py-4 uppercase tracking-widest hover:bg-secondary transition-colors flex items-center justify-center gap-2"
            >
              {t.view_vault} <ChevronRight />
            </Link>
          </div>
          
        </div>
      </div>
    </main>
  );
}
