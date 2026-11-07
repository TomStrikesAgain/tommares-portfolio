"use client";

import React, { useState } from "react";
import { Cpu, Code2, Clapperboard, Award, Info, X } from "lucide-react";
import { useLanguage } from "./LanguageContext";

export default function HumanKpis() {
  const { lang } = useLanguage();
  const [activeKpi, setActiveKpi] = useState<number | null>(null);

  const kpis = [
    {
      icon: Award,
      value: "PSM II",
      label: lang === "fr" ? "Certifié" : "Certified",
      title: lang === "fr" ? "Certifié Professional Scrum Master II (Scrum.org)" : "Professional Scrum Master II (PSM II — Scrum.org)",
      desc:
        lang === "fr"
          ? "Certification avancée de Scrum.org (détenue par une minorité de praticiens Agile dans le monde). Contrairement au niveau I basé sur la théorie, le PSM II valide la résolution de problèmes complexes en conditions réelles, le servant leadership et la livraison produit à grande échelle."
          : "Scrum.org's advanced, scenario-based Agile mastery certification. Unlike entry-level certifications that test rote terminology, PSM II validates real-world complex problem solving, servant leadership, and removing systemic bottlenecks in software delivery.",
    },
    {
      icon: Code2,
      value: "185k+",
      label: lang === "fr" ? "Lignes de Code" : "Net LOC",
      title: lang === "fr" ? "185 281 Lignes de Code Nettes en Production (Net LOC)" : "185,281 Net Lines of Production Code (Net LOC)",
      desc:
        lang === "fr"
          ? "Le 'Net LOC' correspond au total des lignes ajoutées moins les lignes supprimées (449k insérées - 264k supprimées), en excluant strictement les fichiers auto-générés, les dépendances (node_modules) et les fichiers lock. Couvre Flutter, PostgreSQL/Supabase, React 19 et Next.js."
          : "'Net Lines of Code' is total code additions minus deletions (449k added − 264k removed), strictly excluding auto-generated lockfiles, third-party dependencies, and build artifacts across the 4-repo BandMath ecosystem (Flutter, PostgreSQL/Supabase, React 19, and Next.js).",
    },
    {
      icon: Cpu,
      value: "8,839",
      label: "Prompts",
      title: lang === "fr" ? "8 839 Directives d'Architecture & Produit (1 210h de Focus)" : "8,839 Architectural & Product Prompts (1,210h Deep Focus)",
      desc:
        lang === "fr"
          ? "Chaque prompt est une spécification produit écrite, une directive d'architecture, une revue de schéma SQL ou un audit QA envoyé par Tom aux 11 départements IA spécialisés du studio sur 1 210 heures d'ingénierie vérifiées lors de la création de BandMath."
          : "Every prompt represents a written product spec, architectural directive, SQL schema review, or QA gate command issued by Tom across his 11-department AI software studio over 1,210 verified engineering hours while building BandMath.",
    },
    {
      icon: Clapperboard,
      value: lang === "fr" ? "17 Ans" : "17 Yrs",
      label: lang === "fr" ? "Direction Créative & TV" : "Creative & TV Prod",
      title: lang === "fr" ? "17 Ans en Production Télévisuelle & Direction Créative (2007–2024)" : "17 Years in Commercial TV & Video Production (2007–2024)",
      desc:
        lang === "fr"
          ? "Avant sa transition vers le Product Ownership logiciel, Tom a passé 17 ans à diriger des productions vidéo et télévisuelles à fort enjeu (budgets >100 k$, équipes créatives de 10+ personnes chez High Noon Entertainment et Nusura), forgeant sa rigueur de livraison."
          : "Before transitioning into software Product Ownership, Tom spent 17 years leading high-stakes commercial video and broadcast television production (managing $100k+ budgets and 10+ person creative crews at High Noon Entertainment and Nusura)—where he forged his delivery discipline.",
    },
  ];

  const toggleKpi = (idx: number) => {
    setActiveKpi((prev) => (prev === idx ? null : idx));
  };

  return (
    <div className="w-full max-w-full min-w-0 flex flex-col items-center">
      {/* KPI Strip */}
      <div className="w-full max-w-full min-w-0 bg-[#120720]/90 border border-[#6325a6] shadow-sm overflow-x-auto [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden px-2 py-1.5">
        <div className="flex items-center justify-start md:justify-center gap-2 sm:gap-4 min-w-max mx-auto text-[#f1ecd7]">
          {kpis.map((kpi, idx) => {
            const Icon = kpi.icon;
            const isSelected = activeKpi === idx;
            return (
              <React.Fragment key={idx}>
                {idx > 0 && <span className="text-[#6325a6] select-none text-xs">•</span>}
                <button
                  type="button"
                  onClick={() => toggleKpi(idx)}
                  aria-expanded={isSelected}
                  className={`flex items-center gap-1.5 whitespace-nowrap text-xs sm:text-sm px-2.5 py-1 transition-all cursor-pointer border ${
                    isSelected
                      ? "bg-[#6325a6] text-[#f1ecd7] border-[#a855f7]"
                      : "bg-transparent hover:bg-[#190a2e] text-[#f1ecd7] border-transparent hover:border-[#6325a6]/60"
                  }`}
                >
                  <Icon
                    className={`w-3.5 h-3.5 sm:w-4 sm:h-4 flex-shrink-0 ${
                      isSelected ? "text-[#f1ecd7]" : "text-[#a855f7]"
                    }`}
                  />
                  <span>
                    <strong className="text-[#f1ecd7] font-bold mr-1">{kpi.value}</strong>
                    <span className={isSelected ? "text-[#f1ecd7] font-medium" : "text-[#f1ecd7]/80 font-normal"}>
                      {kpi.label}
                    </span>
                  </span>
                  <Info
                    className={`w-3 h-3 flex-shrink-0 transition-opacity ${
                      isSelected ? "text-[#f1ecd7] opacity-100" : "text-[#a855f7]/70 opacity-75"
                    }`}
                  />
                </button>
              </React.Fragment>
            );
          })}
        </div>
      </div>

      {/* Expandable Info Callout Drawer */}
      {activeKpi !== null && (
        <div className="w-full bg-[#19092d] border-x border-b border-[#6325a6] p-3 sm:p-3.5 text-left text-xs text-[#f1ecd7]/90 leading-relaxed shadow-lg">
          <div className="flex items-start justify-between gap-3">
            <div className="space-y-1">
              <div className="font-bold text-[#a855f7] uppercase tracking-wider text-[11px] flex items-center gap-1.5">
                {React.createElement(kpis[activeKpi].icon, { className: "w-3.5 h-3.5 flex-shrink-0" })}
                <span>{kpis[activeKpi].title}</span>
              </div>
              <p className="text-[#f1ecd7]/85 text-[11px] sm:text-xs leading-relaxed">
                {kpis[activeKpi].desc}
              </p>
            </div>
            <button
              type="button"
              onClick={() => setActiveKpi(null)}
              className="text-[#f1ecd7]/50 hover:text-[#f1ecd7] p-1 cursor-pointer flex-shrink-0"
              aria-label="Close KPI info"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
