"use client";

import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Mic, 
  Radio, 
  FileText, 
  Send, 
  Sparkles, 
  CheckCircle2, 
  RefreshCw, 
  Coffee,
  MessageSquare,
  Info,
  X
} from "lucide-react";
import { useLanguage } from "./LanguageContext";

interface Message {
  role: "user" | "assistant";
  content: string;
  mode?: "archivist" | "twin" | "jd_audit";
  engine?: string;
}

function FormattedMessageText({ content }: { content: string }) {
  // Pre-normalize inline bullets (e.g. "...end. * **Point:**" -> "...end.\n\n• **Point:**")
  const normalized = content
    .replace(/([.!?])\s*[\*\-]\s+(\*\*|[A-Z])/g, "$1\n\n• $2")
    .replace(/^[\*\-]\s+/gm, "• ");

  const paragraphs = normalized.split(/\n\s*\n/);
  return (
    <div className="space-y-2">
      {paragraphs.map((para, i) => {
        const lines = para.split("\n");
        return (
          <div key={i} className="leading-relaxed">
            {lines.map((line, j) => {
              const cleanLine = line.replace(/^[\*\-]\s+/, "• ");
              // Split by bold (**...**) or italic (*...*)
              const parts = cleanLine.split(/(\*\*.*?\*\*|\*[^\*]+?\*)/g);
              return (
                <React.Fragment key={j}>
                  {j > 0 && <br />}
                  {parts.map((part, k) => {
                    if (part.startsWith("**") && part.endsWith("**") && part.length > 4) {
                      return (
                        <strong key={k} className="font-bold text-[#f1ecd7]">
                          {part.slice(2, -2)}
                        </strong>
                      );
                    }
                    if (part.startsWith("*") && part.endsWith("*") && part.length > 2 && !part.startsWith("**")) {
                      return (
                        <em key={k} className="italic text-[#f1ecd7]">
                          {part.slice(1, -1)}
                        </em>
                      );
                    }
                    return part;
                  })}
                </React.Fragment>
              );
            })}
          </div>
        );
      })}
    </div>
  );
}

export default function PortfolioInterviewer() {
  const { lang } = useLanguage();

  // State
  const [persona, setPersona] = useState<"archivist" | "twin">("twin");
  const [activeTab, setActiveTab] = useState<"interview" | "jd_audit">("interview");
  const [inputMessage, setInputMessage] = useState("");
  const [jdText, setJdText] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [showTelemetryInfo, setShowTelemetryInfo] = useState(false);

  const [chatHistory, setChatHistory] = useState<Message[]>([
    {
      role: "assistant",
      content:
        lang === "fr"
          ? "Salut ! Je suis le Jumeau IA de Tom. Après 17 ans à diriger des productions TV et vidéo commerciales, j'ai opéré une transition vers le Product Ownership logiciel (certifié PSM II) et conçu de A à Z l'écosystème fintech BandMath (185 000 lignes de code, 1 210 heures de focus vérifié). Posez-moi vos questions, ou basculez sur l'Archiviste du Studio pour une synthèse objective !"
          : "Hey there! I'm Tom's AI Twin. After 17 years directing commercial television and video productions, I made a dedicated transition into Software Product Ownership (PSM II) and built the 185,000-line BandMath fintech SaaS from the ground up across 1,210 verified hours. Ask me anything about my work, or switch to the Studio Archivist for a concise, data-driven brief!",
      mode: "twin",
    },
  ]);

  const [jdAuditResult, setJdAuditResult] = useState<string | null>(null);
  const chatContainerRef = useRef<HTMLDivElement>(null);

  // Auto-scroll ONLY inside the chat container without moving the browser window
  useEffect(() => {
    if (activeTab === "interview" && chatContainerRef.current) {
      chatContainerRef.current.scrollTo({
        top: chatContainerRef.current.scrollHeight,
        behavior: "smooth",
      });
    }
  }, [chatHistory, activeTab]);

  // Bilingual starter chips
  const starterChips = lang === "fr" ? [
    {
      label: "Du Spectateur à l'Utilisateur",
      prompt: "Pourquoi recruter un ancien Producteur TV comme Product Owner ?",
    },
    {
      label: "BandMath : 185k LOC en 10 mois",
      prompt: "Comment Tom a-t-il conçu un SaaS fintech de 185 000 lignes en 10 mois ?",
    },
    {
      label: "Gestion du Bug & Qualité",
      prompt: "Racontez-moi comment Tom gère un bug critique ou recadre un projet qui dérape.",
    },
    {
      label: "Budgets >100k$ & Grands Comptes",
      prompt: "Quelle est son expérience avec les grands comptes, les budgets >100k$ et les équipes tech ?",
    },
  ] : [
    {
      label: "Viewer to User UX",
      prompt: "Why hire a former TV Producer as a Senior Product Owner?",
    },
    {
      label: "BandMath: 185k LOC in 10 Mos",
      prompt: "How did Tom orchestrate a 185,000-line fintech SaaS in 10 months?",
    },
    {
      label: "Bug Triage & QA Defense",
      prompt: "Tell me about a time Tom caught a major bug or stopped 'whack-a-mole' scope creep.",
    },
    {
      label: "Budgets >$100k & Leadership",
      prompt: "What is Tom's experience with B2B clients, budgets >$100k, and engineering teams?",
    },
  ];

  // Sample JD for testing
  const sampleJd = lang === "fr" 
    ? `Poste : Product Owner / Delivery Manager Senior (SaaS & Mobile)
Entreprise : Éditeur SaaS B2B & B2C en forte croissance
Missions :
- Piloter le cycle de vie complet de l'application mobile et du portail web (backlog, user stories, sprints).
- Travailler étroitement avec les Lead Techs pour anticiper les dépendances et garantir la qualité du code.
- Fluidifier la communication entre les parties prenantes métier et les équipes de développement.
- Expérience exigée en méthodologies Agiles (Scrum / Kanban), idéalement certifié PSM.
- Forte sensibilité UX et capacité à concevoir des parcours utilisateurs intuitifs.`
    : `Position: Senior Product Owner / Delivery Manager (SaaS & Mobile)
Company: High-growth B2B & B2C SaaS Scaleup
Responsibilities:
- Own the end-to-end lifecycle for our mobile application and web portals (backlog, user stories, sprint cadence).
- Partner with technical leads to manage dependencies, architect clean data models, and safeguard delivery quality.
- Act as the bridge between executive stakeholders and multidisciplinary developer squads.
- Proven Agile mastery (Scrum/Kanban), PSM certification strongly preferred.
- Deep UX instincts and ability to translate complex business workflows into frictionless user journeys.`;

  // Handle message submit in interview mode
  const handleSendMessage = async (textToSend?: string) => {
    const message = textToSend || inputMessage;
    if (!message.trim() || isLoading) return;

    setError(null);
    setInputMessage("");

    const newHistory: Message[] = [
      ...chatHistory,
      { role: "user", content: message },
    ];
    setChatHistory(newHistory);
    setIsLoading(true);

    try {
      const res = await fetch("/api/interview", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          mode: persona,
          lang,
          message,
          history: newHistory.slice(-4),
        }),
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || "Failed to fetch response");
      }

      setChatHistory([
        ...newHistory,
        {
          role: "assistant",
          content: data.reply,
          mode: persona,
          engine: data.engine,
        },
      ]);
    } catch (err: unknown) {
      console.error(err);
      setError(
        lang === "fr"
          ? "Une erreur est survenue lors de la communication avec le moteur d'entretien."
          : "An error occurred while connecting to the interview engine."
      );
    } finally {
      setIsLoading(false);
    }
  };

  // Handle JD Audit submit
  const handleRunJdAudit = async () => {
    if (!jdText.trim() || isLoading) return;

    setError(null);
    setIsLoading(true);

    try {
      const res = await fetch("/api/interview", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          mode: "jd_audit",
          lang,
          message: jdText,
        }),
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || "Failed to analyze job description");
      }

      setJdAuditResult(data.reply);
    } catch (err: unknown) {
      console.error(err);
      setError(
        lang === "fr"
          ? "Impossible d'analyser l'offre pour le moment. Veuillez réessayer."
          : "Unable to audit this job description right now. Please try again."
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section className="w-full max-w-4xl text-left mt-0 mb-4 md:mb-6 font-inter">
      {/* Clean Flat Container (No heavy offset shadows, crisp 2px border) */}
      <div className="bg-[#050408] border-2 border-[#6325a6] p-3 sm:p-4 md:p-5 text-[#f1ecd7]">
        
        {/* Header Section */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-[#6325a6]/60 pb-2.5 mb-2.5 gap-2 sm:gap-3">
          <div>
            <div className="flex items-center gap-1.5 mb-0.5">
              <Sparkles className="w-3.5 h-3.5 text-[#6325a6]" />
              <span className="text-[10px] sm:text-[11px] font-semibold uppercase tracking-widest text-[#f1ecd7]/70">
                {lang === "fr" ? "IA CONVERSATIONNELLE & AUDIT DE FIT" : "CONVERSATIONAL AI & FIT AUDIT"}
              </span>
            </div>
            <h2 className="font-anton text-xl sm:text-2xl md:text-3xl text-[#f1ecd7] uppercase tracking-wide leading-tight sm:leading-none">
              {lang === "fr" ? "ÉCHANGER AVEC TOM : JUMEAU IA & ARCHIVISTE DU STUDIO" : "TALK TO TOM: AI TWIN & STUDIO ARCHIVIST"}
            </h2>
            <p className="text-[11px] sm:text-xs text-[#f1ecd7]/70 mt-1 max-w-2xl leading-snug">
              {lang === "fr"
                ? "Échangez avec mon Jumeau IA sur ma façon de concevoir des produits et de diriger des équipes, consultez l'Archiviste pour les faits bruts, ou collez une offre d'emploi pour un audit de fit honnête."
                : "Interview my AI Twin about how I build software and lead teams, get the hard facts from the Studio Archivist, or paste a job post for an honest fit audit."}
            </p>
          </div>

          {/* Mode Tabs: Clean Segmented Switcher (No drop shadows) */}
          <div className="flex bg-[#120720] border border-[#6325a6] p-0.5 gap-1 self-start sm:self-auto flex-shrink-0">
            <button
              onClick={() => setActiveTab("interview")}
              className={`text-xs px-2.5 sm:px-3 py-1.5 font-medium tracking-wide transition-colors cursor-pointer flex items-center gap-1.5 ${
                activeTab === "interview"
                  ? "bg-[#6325a6] text-[#f1ecd7]"
                  : "bg-transparent text-[#f1ecd7]/70 hover:text-[#f1ecd7]"
              }`}
            >
              <MessageSquare className="w-3.5 h-3.5" />
              <span>{lang === "fr" ? "Entretien" : "Interview"}</span>
            </button>
            <button
              onClick={() => setActiveTab("jd_audit")}
              className={`text-xs px-2.5 sm:px-3 py-1.5 font-medium tracking-wide transition-colors cursor-pointer flex items-center gap-1.5 ${
                activeTab === "jd_audit"
                  ? "bg-[#6325a6] text-[#f1ecd7]"
                  : "bg-transparent text-[#f1ecd7]/70 hover:text-[#f1ecd7]"
              }`}
            >
              <FileText className="w-3.5 h-3.5" />
              <span>{lang === "fr" ? "Tester une offre" : "Fit Audit"}</span>
            </button>
          </div>
        </div>

        {/* TAB 1: INTERVIEW MODE */}
        {activeTab === "interview" && (
          <div>
            {/* Spokesperson Toggle: Clean segmented bar with legible Inter font */}
            <div className="mb-2.5">
              <div className="mb-1 text-xs text-[#f1ecd7]/70">
                <span className="font-semibold uppercase tracking-wider text-[11px]">
                  {lang === "fr" ? "Porte-parole :" : "Spokesperson:"}
                </span>
              </div>

              {/* Segmented Button Bar (Tom's AI Twin on left as default, Studio Archivist on right) */}
              <div className="grid grid-cols-2 gap-1 bg-[#120720] border border-[#6325a6] p-1">
                <button
                  type="button"
                  onClick={() => setPersona("twin")}
                  className={`py-1.5 px-2 sm:px-3 text-xs sm:text-sm font-semibold tracking-normal transition-all cursor-pointer flex items-center justify-center gap-1.5 sm:gap-2 ${
                    persona === "twin"
                      ? "bg-[#6325a6] text-[#f1ecd7]"
                      : "bg-transparent text-[#f1ecd7]/60 hover:text-[#f1ecd7]"
                  }`}
                >
                  <Radio className="w-3.5 h-3.5 sm:w-4 sm:h-4 flex-shrink-0" />
                  <span className="truncate">
                    <span className="hidden sm:inline">{lang === "fr" ? "Le Jumeau IA de Tom" : "Tom's AI Twin"}</span>
                    <span className="sm:hidden">{lang === "fr" ? "Jumeau IA" : "AI Twin"}</span>
                  </span>
                </button>

                <button
                  type="button"
                  onClick={() => setPersona("archivist")}
                  className={`py-1.5 px-2 sm:px-3 text-xs sm:text-sm font-semibold tracking-normal transition-all cursor-pointer flex items-center justify-center gap-1.5 sm:gap-2 ${
                    persona === "archivist"
                      ? "bg-[#6325a6] text-[#f1ecd7]"
                      : "bg-transparent text-[#f1ecd7]/60 hover:text-[#f1ecd7]"
                  }`}
                >
                  <Mic className="w-3.5 h-3.5 sm:w-4 sm:h-4 flex-shrink-0" />
                  <span className="truncate">
                    <span className="hidden sm:inline">{lang === "fr" ? "L'Archiviste du Studio" : "The Studio Archivist"}</span>
                    <span className="sm:hidden">{lang === "fr" ? "Archiviste" : "Archivist"}</span>
                  </span>
                </button>
              </div>
            </div>

            {/* Starter Chips: Single horizontally scrollable strip on mobile, wrapping on desktop */}
            <div className="mb-2.5 w-full max-w-full min-w-0">
              <div className="text-[10px] sm:text-[11px] uppercase font-semibold tracking-wider text-[#f1ecd7]/70 mb-1">
                {lang === "fr" ? "Questions fréquentes en 1 clic :" : "Frequently asked questions:"}
              </div>
              <div className="flex flex-nowrap sm:flex-wrap gap-1.5 overflow-x-auto pb-1 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden w-full max-w-full min-w-0">
                {starterChips.map((chip, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => handleSendMessage(chip.prompt)}
                    disabled={isLoading}
                    className="text-left text-xs bg-[#190a2e] hover:bg-[#6325a6] text-[#f1ecd7]/90 hover:text-[#f1ecd7] border border-[#6325a6]/50 px-2.5 py-1 transition-colors cursor-pointer flex items-center gap-1.5 disabled:opacity-50 whitespace-nowrap flex-shrink-0"
                  >
                    <span>{chip.label}</span>
                    <span className="text-[#f1ecd7]/40 text-[10px]">↗</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Conversation Log Box: Distinct Purple Chat Viewport */}
            <div 
              ref={chatContainerRef}
              className="bg-[#19092d] border border-[#6325a6] p-3 md:p-3.5 h-[220px] sm:h-[240px] md:h-[260px] overflow-y-auto space-y-3 mb-2.5 text-xs md:text-sm"
            >
              {chatHistory.map((msg, index) => (
                <div
                  key={index}
                  className={`flex flex-col ${
                    msg.role === "user" ? "items-end" : "items-start"
                  }`}
                >
                  <div className="flex items-center gap-1 text-[10px] font-semibold uppercase tracking-wider text-[#f1ecd7]/60 mb-1">
                    {msg.role === "user" ? (
                      <span>{lang === "fr" ? "VOUS" : "YOU"}</span>
                    ) : (
                      <span className="text-[#f1ecd7] flex items-center gap-1">
                        {msg.mode === "twin" ? (
                          <>
                            <Radio className="w-3 h-3 text-[#6325a6]" />
                            <span>{lang === "fr" ? "Tom (Jumeau IA)" : "Tom (AI Twin)"}</span>
                          </>
                        ) : (
                          <>
                            <Mic className="w-3 h-3 text-[#6325a6]" />
                            <span>{lang === "fr" ? "L'Archiviste du Studio" : "The Studio Archivist"}</span>
                          </>
                        )}
                      </span>
                    )}
                  </div>
                  <div
                    className={`p-3 max-w-[92%] md:max-w-[85%] leading-relaxed ${
                      msg.role === "user"
                        ? "bg-[#6325a6] text-[#f1ecd7] font-medium"
                        : "bg-[#0b0514] border-l-2 border-[#6325a6] text-[#f1ecd7]"
                    }`}
                  >
                    <FormattedMessageText content={msg.content} />
                  </div>
                </div>
              ))}

              {isLoading && (
                <div className="flex items-center gap-2 text-xs text-[#f1ecd7]/70 font-mono py-1.5">
                  <RefreshCw className="w-3.5 h-3.5 animate-spin text-[#6325a6]" />
                  <span>
                    {lang === "fr"
                      ? "Consultation des archives télémétriques..."
                      : "Scanning telemetry records & archives..."}
                  </span>
                </div>
              )}
            </div>

            {/* Error Message */}
            {error && (
              <div className="mb-2 text-xs bg-red-950/60 border border-red-500/50 p-2 text-red-200">
                {error}
              </div>
            )}

            {/* Message Input Box */}
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleSendMessage();
              }}
              className="flex gap-2"
            >
              <input
                type="text"
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value.slice(0, 600))}
                placeholder={
                  lang === "fr"
                    ? "Posez une question à Tom..."
                    : "Ask Tom anything..."
                }
                disabled={isLoading}
                className="flex-1 bg-[#120720] border border-[#6325a6] px-3 py-2 text-xs md:text-sm text-[#f1ecd7] focus:outline-none focus:border-[#f1ecd7] placeholder-[#f1ecd7]/40 min-w-0"
              />
              <button
                type="submit"
                disabled={isLoading || !inputMessage.trim()}
                className="bg-[#6325a6] hover:bg-[#f1ecd7] text-[#f1ecd7] hover:text-[#050408] px-3.5 sm:px-4 py-2 text-xs md:text-sm font-semibold tracking-wide transition-colors cursor-pointer border border-[#6325a6] hover:border-[#f1ecd7] flex items-center gap-1.5 disabled:opacity-50 flex-shrink-0"
              >
                <span>{lang === "fr" ? "Envoyer" : "Send"}</span>
                <Send className="w-3.5 h-3.5" />
              </button>
            </form>
            <div className="text-[10px] text-[#f1ecd7]/50 mt-1.5 flex items-center justify-between">
              <button
                type="button"
                onClick={() => setShowTelemetryInfo((prev) => !prev)}
                className="flex items-center gap-1 text-[#f1ecd7]/60 hover:text-[#f1ecd7] transition-colors cursor-pointer group"
              >
                <Info className="w-3 h-3 text-[#a855f7] flex-shrink-0" />
                <span className="underline decoration-[#6325a6] group-hover:decoration-[#f1ecd7] underline-offset-2">
                  {lang === "fr"
                    ? "Données vérifiées par télémétrie forensique"
                    : "Verified by forensic telemetry records"}
                </span>
              </button>
              <span>{inputMessage.length}/600</span>
            </div>

            <AnimatePresence>
              {showTelemetryInfo && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.2 }}
                  className="overflow-hidden"
                >
                  <div className="mt-2.5 bg-[#120720] border border-[#6325a6] p-3 text-xs text-[#f1ecd7]/85 space-y-2 relative">
                    <div className="flex items-center justify-between border-b border-[#6325a6]/50 pb-1.5">
                      <span className="font-semibold uppercase tracking-wider text-[11px] text-[#f1ecd7] flex items-center gap-1.5">
                        <Info className="w-3.5 h-3.5 text-[#a855f7]" />
                        {lang === "fr"
                          ? "Comment la télémétrie forensique est collectée"
                          : "How Forensic Telemetry Is Collected"}
                      </span>
                      <button
                        type="button"
                        onClick={() => setShowTelemetryInfo(false)}
                        className="text-[#f1ecd7]/60 hover:text-[#f1ecd7] p-0.5 cursor-pointer"
                        aria-label="Close telemetry info"
                      >
                        <X className="w-3.5 h-3.5" />
                      </button>
                    </div>
                    {lang === "fr" ? (
                      <div className="space-y-1.5 leading-relaxed text-[11px] sm:text-xs">
                        <p>
                          <strong className="text-[#f1ecd7]">1. Journaux IDE & Git bruts (zéro estimation) :</strong> Un script Python automatisé analyse les journaux d&apos;activité horodatés de l&apos;IDE (fichiers <code>.jsonl</code>) et l&apos;historique Git à travers les dépôts de production de BandMath (704 fichiers sources, 185 281 lignes de code nettes) depuis le 30 janvier 2026.
                        </p>
                        <p>
                          <strong className="text-[#f1ecd7]">2. Calcul strict du temps de focus (1 210 heures) :</strong> Les heures de concentration sont calculées uniquement à partir des séquences actives de prompts humains (8 839 prompts vérifiés). Toute pause supérieure à 30 minutes est automatiquement coupée afin de ne jamais compter une fenêtre laissée ouverte.
                        </p>
                        <p>
                          <strong className="text-[#f1ecd7]">3. Audit nocturne automatisé :</strong> Chaque soir à 23h00, un pipeline compile les commits, les tickets Jira et les sessions techniques pour mettre à jour cette archive vérifiable.
                        </p>
                      </div>
                    ) : (
                      <div className="space-y-1.5 leading-relaxed text-[11px] sm:text-xs">
                        <p>
                          <strong className="text-[#f1ecd7]">1. Raw IDE & Git Logs (Zero Estimates):</strong> An automated Python harvester parses timestamped IDE session transcripts (<code>.jsonl</code> logs) and Git commit histories across BandMath&apos;s production repositories (704 source files, 185,281 net lines of code) from January 30, 2026 to present.
                        </p>
                        <p>
                          <strong className="text-[#f1ecd7]">2. Zero Idle-Time Inflation (1,210 Hours):</strong> Deep-focus hours (across 236 active days) are calculated strictly from active human prompt intervals (8,839 verbatim prompts). Any gap longer than 30 minutes is automatically capped so open or idle windows are never counted.
                        </p>
                        <p>
                          <strong className="text-[#f1ecd7]">3. Nightly Automated Audit:</strong> Every night at 11:00 PM, an automated pipeline cross-checks Git commits, Jira tickets, and session logs to update the studio&apos;s verifiable engineering archive.
                        </p>
                      </div>
                    )}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        )}

        {/* TAB 2: JD FIT AUDIT MODE */}
        {activeTab === "jd_audit" && (
          <div>
            <div className="text-[11px] uppercase font-semibold tracking-wider text-[#f1ecd7]/70 mb-1.5">
              {lang === "fr" 
                ? "Collez une offre d'emploi ou un descriptif de mission :"
                : "Paste a job description or role brief:"}
            </div>

            <p className="text-xs text-[#f1ecd7]/80 mb-2 leading-relaxed">
              {lang === "fr"
                ? "Le moteur évalue les prérequis et génère un audit de fit immédiat : positionnement adapté (ESN vs Startup), cartographie des preuves sur 3 piliers (UX, Delivery IA, Responsabilité), et limites honnêtes."
                : "The engine maps your role requirements to Tom's verified receipts: recommended framing (Enterprise ESN vs Startup), 3-pillar evidence map (UX, AI-Augmented Delivery, Extreme Ownership), and honest boundaries."}
            </p>

            <div className="relative mb-2">
              <textarea
                value={jdText}
                onChange={(e) => setJdText(e.target.value.slice(0, 4500))}
                rows={6}
                placeholder={
                  lang === "fr"
                    ? "Collez ici l'intitulé de poste, les responsabilités et les compétences recherchées..."
                    : "Paste job title, key responsibilities, and required qualifications here..."
                }
                disabled={isLoading}
                className="w-full bg-[#120720] border border-[#6325a6] p-3 text-xs text-[#f1ecd7] focus:outline-none focus:border-[#f1ecd7] placeholder-[#f1ecd7]/40 leading-relaxed font-mono"
              />
              <div className="flex justify-between items-center text-[10px] text-[#f1ecd7]/50 mt-1">
                <button
                  type="button"
                  onClick={() => setJdText(sampleJd)}
                  className="underline hover:text-[#f1ecd7] cursor-pointer"
                >
                  {lang === "fr" ? "Charger un exemple d'offre type" : "Load sample Job Description"}
                </button>
                <span>{jdText.length}/4500</span>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-2 mb-4">
              <button
                type="button"
                onClick={handleRunJdAudit}
                disabled={isLoading || !jdText.trim()}
                className="bg-[#6325a6] hover:bg-[#f1ecd7] text-[#f1ecd7] hover:text-[#050408] px-5 py-2 text-xs md:text-sm font-semibold tracking-wide transition-colors cursor-pointer border border-[#6325a6] hover:border-[#f1ecd7] flex items-center justify-center gap-1.5 disabled:opacity-50"
              >
                {isLoading ? (
                  <>
                    <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                    <span>{lang === "fr" ? "Analyse en cours..." : "Auditing fit..."}</span>
                  </>
                ) : (
                  <>
                    <FileText className="w-3.5 h-3.5" />
                    <span>{lang === "fr" ? "Lancer l'audit de fit" : "Run Fit Audit"}</span>
                  </>
                )}
              </button>

              {jdAuditResult && (
                <button
                  type="button"
                  onClick={() => {
                    setJdAuditResult(null);
                    setJdText("");
                  }}
                  className="bg-transparent hover:bg-[#6325a6]/30 text-[#f1ecd7] px-3 py-2 text-xs font-medium tracking-wide transition-colors cursor-pointer border border-[#6325a6]/60 text-center"
                >
                  {lang === "fr" ? "Réinitialiser" : "Reset"}
                </button>
              )}
            </div>

            {/* Audit Result Display */}
            <AnimatePresence>
              {jdAuditResult && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  className="bg-[#19092d] border border-[#6325a6] p-4 md:p-5 text-xs md:text-sm leading-relaxed space-y-3"
                >
                  <div className="flex items-center justify-between border-b border-[#6325a6]/60 pb-2">
                    <span className="text-sm font-semibold text-[#f1ecd7] flex items-center gap-1.5">
                      <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                      {lang === "fr" ? "Résultat de l'Audit d'Adéquation" : "Role Fit Audit Results"}
                    </span>
                    <a
                      href="mailto:bonjour@tommares.com"
                      className="text-xs bg-[#6325a6] hover:bg-[#f1ecd7] text-[#f1ecd7] hover:text-[#050408] px-2.5 py-1 font-medium transition-colors flex items-center gap-1 border border-[#6325a6]"
                    >
                      <Coffee className="w-3 h-3" />
                      {lang === "fr" ? "Café à Lyon / Visio" : "Coffee in Lyon / Call"}
                    </a>
                  </div>

                  <div className="prose prose-invert max-w-none text-[#f1ecd7]/90 text-xs md:text-sm whitespace-pre-line">
                    {jdAuditResult}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        )}

      </div>
    </section>
  );
}
