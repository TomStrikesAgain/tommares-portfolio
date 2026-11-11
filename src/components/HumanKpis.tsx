"use client";

import React, { useState, useEffect } from "react";
import { Cpu, Code2, Clapperboard, Award, Zap, Info, X } from "lucide-react";
import { useLanguage } from "./LanguageContext";
import TELEMETRY from "../data/telemetry_kpis.json";

export default function HumanKpis({ variant = "boxed" }: { variant?: "boxed" | "minimal" }) {
  const { lang } = useLanguage();
  const [activeKpi, setActiveKpi] = useState<number | null>(null);
  const [sessionTokens, setSessionTokens] = useState<number>(0);

  useEffect(() => {
    const onTokens = (e: Event) => {
      const custom = e as CustomEvent<{ tokensUsed?: number }>;
      const added = Number(custom?.detail?.tokensUsed || 0);
      if (added > 0) {
        setSessionTokens((prev) => prev + added);
      }
    };
    window.addEventListener("tombot-tokens", onTokens);
    return () => window.removeEventListener("tombot-tokens", onTokens);
  }, []);

  // Single source of truth: src/data/telemetry_kpis.json (written by export_portfolio_knowledge.py)
  const fmt = (n: number) => n.toLocaleString(lang === "fr" ? "fr-FR" : "en-US");
  const prompts = fmt(TELEMETRY.total_founder_prompts);
  const activeDays = fmt((TELEMETRY as { active_days?: number }).active_days || 241);
  const loc = fmt(TELEMETRY.total_net_loc);

  const baseTokens = (TELEMETRY as { total_tokens?: number }).total_tokens || 2417749249;
  const liveTotalTokens = baseTokens + sessionTokens;
  const exactTokensFormatted = fmt(liveTotalTokens);
  const inputM = (((TELEMETRY as { total_input_tokens?: number }).total_input_tokens || 207148688) / 1_000_000).toFixed(1);
  const outputM = (((TELEMETRY as { total_output_tokens?: number }).total_output_tokens || 11565676) / 1_000_000).toFixed(1);
  const cacheB = (((TELEMETRY as { total_cache_read_tokens?: number }).total_cache_read_tokens || 2199034885) / 1_000_000_000).toFixed(2);
  const compactTokens =
    lang === "fr"
      ? `${(liveTotalTokens / 1_000_000_000).toFixed(2).replace(".", ",")} Md`
      : `${(liveTotalTokens / 1_000_000_000).toFixed(2)}B`;

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
      title: lang === "fr" ? `${loc} Lignes de Code Nettes (Net LOC)` : `${loc} Net Lines of Code (Net LOC)`,
      desc:
        lang === "fr"
          ? "Le 'Net LOC' correspond au total des lignes ajoutées moins les lignes supprimées (449k insérées - 264k supprimées), sans les fichiers auto-générés, les dépendances (node_modules) ni les fichiers lock. 7 systèmes répartis sur 4 dépôts Git : Flutter, PostgreSQL/Supabase, React 19 et Next.js."
          : "'Net Lines of Code' is total code additions minus deletions (449k added − 264k removed), excluding auto-generated lockfiles, third-party dependencies, and build artifacts. 7 systems across 4 Git repositories: Flutter, PostgreSQL/Supabase, React 19, and Next.js.",
    },
    {
      icon: Cpu,
      value: prompts,
      label: "Prompts",
      title: lang === "fr" ? `${prompts} Prompts Dirigés (Depuis le 30 janv. 2026)` : `${prompts} Prompts Directed (Since Jan 30, 2026)`,
      desc:
        lang === "fr"
          ? `Chaque prompt est une instruction que Tom a adressée à son équipe de développement IA pendant la création de BandMath (principalement dictée en voice-to-text, complétée par écrit) : specs, demandes de fonctionnalités, rapports de bugs, retours design et relectures. Compté directement à partir des journaux de session sur ${activeDays} jours actifs de construction.`
          : `Each prompt is a direction Tom gave his AI development team while building BandMath (spoken primarily via voice-to-text alongside written specs): feature architecture, bug reports, design feedback, and code reviews. Counted directly from the session logs across ${activeDays} active build days.`,
    },
    {
      icon: Zap,
      value: compactTokens,
      label: "Tokens",
      title:
        lang === "fr"
          ? `${exactTokensFormatted} Tokens Consommés${sessionTokens > 0 ? ` (+${fmt(sessionTokens)} en direct dans ce chat !)` : ""}`
          : `${exactTokensFormatted} Tokens Consumed${sessionTokens > 0 ? ` (+${fmt(sessionTokens)} live in this chat!)` : ""}`,
      desc:
        lang === "fr"
          ? `Total cumulé des tokens traités dans les journaux de session du studio depuis l'activation du comptage exact en octobre 2026 (${inputM} M tokens en entrée, ${outputM} M tokens générés en sortie et ${cacheB} Md de tokens de contexte en lecture cache), mis à jour automatiquement chaque soir à 23h00 — et incrémenté en direct à chaque message que vous échangez avec Tom LM ci-dessous !`
          : `Cumulative tokens processed across the studio's session logs since exact token telemetry was enabled in October 2026 (${inputM}M input tokens, ${outputM}M generated output tokens, and ${cacheB}B cached context-read tokens), harvested every night at 11:00 PM—plus a live odometer that ticks up with every message you send to Tom LM below!`,
    },
    {
      icon: Clapperboard,
      value: lang === "fr" ? "17 Ans" : "17 Yrs",
      label: lang === "fr" ? "Gestion de Projet" : "Project Management",
      title: lang === "fr" ? "17 Ans en Gestion de Production Télévisée & Vidéo Commerciale" : "17 Years in TV and Commercial Video Production Management",
      desc:
        lang === "fr"
          ? "Avant le logiciel, Tom a passé 17 ans en production télé et vidéo : monteur broadcast (100+ épisodes), superviseur de post-production chez High Noon Entertainment (équipe d'environ 15 personnes, livraisons sur bande pour les chaînes), un studio TriCaster de plus de 100 k$ chez Nusura, et des tournages avec des équipes allant jusqu'à 20 personnes."
          : "Before software, Tom spent 17 years in TV and video production: broadcast editor (100+ episodes), post-production supervisor at High Noon Entertainment (a post team of about 15, tape deliverables to the networks), a $100k+ TriCaster studio build at Nusura, and shoots with crews of up to 20.",
    },
  ];

  const toggleKpi = (idx: number) => {
    setActiveKpi((prev) => (prev === idx ? null : idx));
  };

  const isMinimal = variant === "minimal";

  return (
    <div className="w-full max-w-4xl min-w-0 flex flex-col items-center">
      {/* KPI Strip: Boxed or Open Minimal Lounge Ribbon */}
      <div
        className={
          isMinimal
            ? "w-full max-w-full min-w-0 bg-transparent border-b border-[#6325a6]/35 overflow-x-auto no-scrollbar px-1.5 sm:px-2 py-1.5"
            : "w-full max-w-full min-w-0 bg-[#120720]/90 border border-[#6325a6] shadow-sm overflow-x-auto no-scrollbar px-1.5 sm:px-2 py-1.5"
        }
      >
        <div className="flex items-center justify-start md:justify-center gap-1 sm:gap-2 min-w-max mx-auto text-[#f1ecd7]">
          {kpis.map((kpi, idx) => {
            const Icon = kpi.icon;
            const isSelected = activeKpi === idx;
            return (
              <React.Fragment key={idx}>
                {idx > 0 && <span className="text-[#a855f7]/50 select-none text-xs">•</span>}
                <button
                  type="button"
                  onClick={() => toggleKpi(idx)}
                  aria-expanded={isSelected}
                  className={`flex items-center gap-1.5 whitespace-nowrap text-xs sm:text-[13px] px-1.5 sm:px-2 py-1 transition-all cursor-pointer border ${
                    isSelected
                      ? "bg-[#6325a6]/40 text-[#e9d5ff] border-[#a855f7]/60"
                      : "bg-transparent hover:bg-[#6325a6]/20 text-[#f1ecd7]/85 hover:text-[#f1ecd7] border-transparent"
                  }`}
                >
                  <Icon
                    className={`w-3.5 h-3.5 sm:w-4 sm:h-4 flex-shrink-0 ${
                      isSelected ? "text-[#e9d5ff]" : "text-[#a855f7]"
                    }`}
                  />
                  <span>
                    <strong className="text-[#f1ecd7] font-semibold mr-1">{kpi.value}</strong>
                    <span className={isSelected ? "text-[#e9d5ff] font-medium" : "text-[#f1ecd7]/70 font-light"}>
                      {kpi.label}
                    </span>
                  </span>
                  <Info
                    className={`w-3 h-3 flex-shrink-0 transition-opacity ${
                      isSelected ? "text-[#e9d5ff] opacity-100" : "text-[#a855f7]/60 opacity-70"
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
        <div className="w-full bg-[#0b0514]/90 backdrop-blur-md border-b border-[#a855f7]/40 p-3 sm:p-4 text-left text-xs text-[#f1ecd7]/90 leading-relaxed">
          <div className="flex items-start justify-between gap-3">
            <div className="space-y-1">
              <div className="font-bold text-[#e9d5ff] uppercase tracking-wider text-[11px] flex items-center gap-1.5">
                {React.createElement(kpis[activeKpi].icon, { className: "w-3.5 h-3.5 flex-shrink-0 text-[#a855f7]" })}
                <span>{kpis[activeKpi].title}</span>
              </div>
              <p className="text-[#f1ecd7]/85 text-xs sm:text-sm font-light leading-relaxed">
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
