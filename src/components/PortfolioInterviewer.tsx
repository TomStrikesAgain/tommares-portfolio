"use client";

import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Mic, 
  Radio, 
  FileText, 
  Send, 
  CheckCircle2, 
  RefreshCw, 
  Coffee,
  Info,
  X,
  SlidersHorizontal,
  ChevronDown,
  ChevronUp,
  Check
} from "lucide-react";
import { useLanguage } from "./LanguageContext";
import TELEMETRY from "../data/telemetry_kpis.json";

interface Message {
  role: "user" | "assistant";
  content: string;
  mode?: "archivist" | "twin" | "jd_audit";
  engine?: string;
  sig?: string;
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
              // Markdown headings (### Title) -> styled heading line (used by the Fit Audit)
              const heading = line.match(/^#{1,6}\s+(.*)$/);
              if (heading) {
                return (
                  <React.Fragment key={j}>
                    {j > 0 && <br />}
                    <span className="block font-bold uppercase tracking-wide text-[#a855f7] mt-1">
                      {heading[1].replace(/\*\*/g, "")}
                    </span>
                  </React.Fragment>
                );
              }
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
  const fmtNum = (n: number) => n.toLocaleString(lang === "fr" ? "fr-FR" : "en-US");

  // Feature flag to keep Studio Archivist & Fit Audit code intact while hiding the UI controls
  const showAdvancedModes = false;

  // State
  const [persona, setPersona] = useState<"archivist" | "twin">("twin");
  const [activeTab, setActiveTab] = useState<"interview" | "jd_audit">("interview");
  const [inputMessage, setInputMessage] = useState("");
  const [jdText, setJdText] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [showTelemetryInfo, setShowTelemetryInfo] = useState(false);
  const [showOptions, setShowOptions] = useState(false);
  const [copiedAuditEmail, setCopiedAuditEmail] = useState(false);

  const handleCopyAuditEmail = () => {
    const addr = ["portfolio", "tommares.com"].join("@");
    navigator.clipboard.writeText(addr);
    setCopiedAuditEmail(true);
    setTimeout(() => setCopiedAuditEmail(false), 2500);
  };

  const getInitialGreeting = (currentLang: "en" | "fr", currentPersona: "twin" | "archivist"): Message => {
    if (currentPersona === "archivist") {
      return {
        role: "assistant",
        content:
          currentLang === "fr"
            ? "Bonjour. Je suis l'Archiviste du Studio. Tom Marès est Product Owner, Scrum Master (certifié PSM II) et Orchestrateur IA. Au cours des 10 derniers mois, il a conçu et livré BandMath, un écosystème complet de billetterie, d'inventaire et de comptabilité pour l'industrie de la musique live (7 systèmes interconnectés sur 4 dépôts Git). Posez-moi une question factuelle sur son parcours, ou lancez un Fit Audit sur votre offre d'emploi."
            : "Hello. I'm the Studio Archivist. Tom Marès is a Product Owner, Scrum Master (PSM II), and AI Orchestrator. Over the past 10 months, he architected and shipped BandMath, a complete sales, inventory, and accounting ecosystem for the live music industry (7 interconnected systems across 4 Git repositories). Ask me anything about his documented track record, or run a Fit Audit on a job description.",
        mode: "archivist",
      };
    }
    return {
      role: "assistant",
      content:
        currentLang === "fr"
          ? "Salut ! Je suis Tombot, le jumeau IA de Tom. Comme le vrai moi, je suis Product Owner, Scrum Master (PSM II), Orchestrateur IA et musicien depuis toujours. Je viens de passer les 10 derniers mois à construire BandMath, un écosystème complet de billetterie, d'inventaire et de comptabilité pour l'industrie de la musique live, une fonctionnalité à la fois. Posez-moi toutes vos questions !"
          : "Hey! I'm Tombot, Tom's AI twin. Like the real me, I'm a Product Owner, Scrum Master (PSM II), AI Orchestrator, and lifelong musician. I just spent the last 10 months building BandMath, a complete sales, inventory, and accounting ecosystem for the live music industry, one feature at a time. Ask me anything!",
      mode: "twin",
    };
  };

  const [chatHistory, setChatHistory] = useState<Message[]>([]);
  const displayedMessages: Message[] = [getInitialGreeting(lang, persona), ...chatHistory];

  const [jdAuditResult, setJdAuditResult] = useState<string | null>(null);
  const chatContainerRef = useRef<HTMLDivElement>(null);
  const inputTextareaRef = useRef<HTMLTextAreaElement>(null);
  const blurTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const [isInputFocused, setIsInputFocused] = useState(false);
  const [mobileVv, setMobileVv] = useState<{ top: number; height: number } | null>(null);

  // Track mobile Visual Viewport when keyboard opens so the chat + input lock flush between top of screen and keyboard
  useEffect(() => {
    if (typeof window === "undefined") return;

    let rafId: number | null = null;
    const syncViewport = () => {
      if (window.innerWidth >= 768) {
        setMobileVv(null);
        return;
      }
      const vv = window.visualViewport;
      if (!vv) return;
      const keyboardOpen = vv.height < window.innerHeight * 0.85;
      if (isInputFocused || keyboardOpen) {
        setMobileVv({
          top: Math.max(0, Math.round(vv.offsetTop)),
          height: Math.round(vv.height),
        });
        if (chatContainerRef.current) {
          chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
        }
      } else {
        setMobileVv(null);
      }
    };

    syncViewport();

    // Poll via rAF for 350ms on focus transitions so iOS Safari keyboard slide-up is tracked frame-by-frame
    const startTime = performance.now();
    const tick = () => {
      syncViewport();
      if (performance.now() - startTime < 350) {
        rafId = requestAnimationFrame(tick);
      }
    };
    rafId = requestAnimationFrame(tick);

    const vv = window.visualViewport;
    vv?.addEventListener("resize", syncViewport);
    vv?.addEventListener("scroll", syncViewport);
    window.addEventListener("resize", syncViewport);

    return () => {
      if (rafId !== null) cancelAnimationFrame(rafId);
      vv?.removeEventListener("resize", syncViewport);
      vv?.removeEventListener("scroll", syncViewport);
      window.removeEventListener("resize", syncViewport);
    };
  }, [isInputFocused]);

  // Auto-resize the message textarea to fit its content (1 line up to 600 chars)
  useEffect(() => {
    const el = inputTextareaRef.current;
    if (!el) return;
    el.style.height = "auto";
    el.style.height = `${Math.min(el.scrollHeight, 160)}px`;
  }, [inputMessage]);

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
- Deep UX instincts and ability to translate complex business workflows into clear, intuitive user journeys.`;

  // Handle message submit in interview mode
  const handleSendMessage = async (textToSend?: string) => {
    const message = textToSend || inputMessage;
    if (!message.trim() || isLoading) return;

    setError(null);
    setInputMessage("");
    if (typeof window !== "undefined" && window.innerWidth < 768) {
      if (blurTimeoutRef.current) clearTimeout(blurTimeoutRef.current);
      setIsInputFocused(false);
      inputTextareaRef.current?.blur();
      window.scrollTo({ top: 0, behavior: "instant" });
    }

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
          // Only earlier turns (current message is sent separately); assistant turns carry server signatures
          history: chatHistory.slice(-4).map((m) => ({ role: m.role, content: m.content, sig: m.sig })),
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
          sig: typeof data.sig === "string" ? data.sig : undefined,
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
    <section className="w-full max-w-4xl text-left mt-1 mb-1 md:mb-6 font-inter">
      {/* Unboxed Section Container */}
      <div className="text-[#f1ecd7]">
        
        {/* Inline Controls Row (disabled via showAdvancedModes flag to keep UI clean) */}
        {showAdvancedModes && (
        <div className="flex flex-wrap items-center justify-end gap-2 mb-2.5">
          <div className="flex items-center gap-1.5 sm:gap-2">
            {/* Inline Persona Pills */}
            <div className="flex bg-[#120720] border border-[#6325a6] p-0.5 gap-0.5">
              <button
                type="button"
                onClick={() => {
                  setActiveTab("interview");
                  setPersona("twin");
                }}
                className={`py-1 px-2.5 text-xs font-semibold transition-colors cursor-pointer flex items-center gap-1.5 ${
                  activeTab === "interview" && persona === "twin"
                    ? "bg-[#6325a6] text-[#f1ecd7]"
                    : "bg-transparent text-[#f1ecd7]/65 hover:text-[#f1ecd7]"
                }`}
              >
                <Radio className="w-3.5 h-3.5 flex-shrink-0" />
                <span>Tombot</span>
              </button>

              <button
                type="button"
                onClick={() => {
                  setActiveTab("interview");
                  setPersona("archivist");
                }}
                className={`py-1 px-2.5 text-xs font-semibold transition-colors cursor-pointer flex items-center gap-1.5 ${
                  activeTab === "interview" && persona === "archivist"
                    ? "bg-[#6325a6] text-[#f1ecd7]"
                    : "bg-transparent text-[#f1ecd7]/65 hover:text-[#f1ecd7]"
                }`}
              >
                <Mic className="w-3.5 h-3.5 flex-shrink-0" />
                <span>{lang === "fr" ? "Archiviste" : "Studio Archivist"}</span>
              </button>
            </div>

            {/* Settings / Options Drawer Toggle */}
            <button
              type="button"
              onClick={() => setShowOptions((prev) => !prev)}
              aria-expanded={showOptions}
              className={`py-1 px-2.5 text-xs font-medium transition-colors cursor-pointer border flex items-center gap-1 ${
                showOptions || activeTab === "jd_audit"
                  ? "bg-[#6325a6] text-[#f1ecd7] border-[#a855f7]"
                  : "bg-[#120720] text-[#f1ecd7]/75 hover:text-[#f1ecd7] border-[#6325a6]"
              }`}
            >
              <SlidersHorizontal className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">{lang === "fr" ? "Options & Fit Audit" : "Options & Fit Audit"}</span>
              {showOptions ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
            </button>
          </div>
        </div>
        )}

        {/* Unfurling Settings / Options Drawer (FAQs + Mode Switcher) */}
        <AnimatePresence>
          {showOptions && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.2 }}
              className="overflow-hidden"
            >
              <div className="bg-[#120720] border border-[#6325a6] p-3 mb-2.5 space-y-3 text-xs">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-2 border-b border-[#6325a6]/40">
                  <span className="text-[11px] uppercase font-semibold tracking-wider text-[#f1ecd7]/70">
                    {lang === "fr" ? "Mode d'interaction :" : "Interaction Mode:"}
                  </span>
                  <div className="flex gap-1.5">
                    <button
                      type="button"
                      onClick={() => {
                        setActiveTab("interview");
                        setShowOptions(false);
                      }}
                      className={`px-2.5 py-1 text-xs font-medium border transition-colors cursor-pointer flex items-center gap-1.5 ${
                        activeTab === "interview"
                          ? "bg-[#6325a6] text-[#f1ecd7] border-[#a855f7]"
                          : "bg-transparent text-[#f1ecd7]/70 hover:text-[#f1ecd7] border-[#6325a6]/60"
                      }`}
                    >
                      <Radio className="w-3 h-3" />
                      <span>{lang === "fr" ? "Chat (Tombot / Archiviste)" : "Chat (Tombot / Archivist)"}</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        setActiveTab("jd_audit");
                        setShowOptions(false);
                      }}
                      className={`px-2.5 py-1 text-xs font-medium border transition-colors cursor-pointer flex items-center gap-1.5 ${
                        activeTab === "jd_audit"
                          ? "bg-[#6325a6] text-[#f1ecd7] border-[#a855f7]"
                          : "bg-transparent text-[#f1ecd7]/70 hover:text-[#f1ecd7] border-[#6325a6]/60"
                      }`}
                    >
                      <FileText className="w-3 h-3" />
                      <span>{lang === "fr" ? "Coller une offre (Fit Audit)" : "Paste a Job Post (Fit Audit)"}</span>
                    </button>
                  </div>
                </div>

                <div>
                  <div className="text-[11px] uppercase font-semibold tracking-wider text-[#f1ecd7]/70 mb-1.5">
                    {lang === "fr" ? "Questions fréquentes en 1 clic :" : "Frequently Asked Questions:"}
                  </div>
                  <div className="flex flex-wrap gap-1.5">
                    {starterChips.map((chip, idx) => (
                      <button
                        key={idx}
                        type="button"
                        onClick={() => {
                          setActiveTab("interview");
                          setShowOptions(false);
                          handleSendMessage(chip.prompt);
                        }}
                        disabled={isLoading}
                        className="text-left text-xs bg-[#190a2e] hover:bg-[#6325a6] text-[#f1ecd7]/90 hover:text-[#f1ecd7] border border-[#6325a6]/50 px-2.5 py-1 transition-colors cursor-pointer flex items-center gap-1.5 disabled:opacity-50"
                      >
                        <span>{chip.label}</span>
                        <span className="text-[#f1ecd7]/40 text-[10px]">↗</span>
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* TAB 1: INTERVIEW MODE */}
        {activeTab === "interview" && (
          <div
            className={
              mobileVv
                ? "fixed left-0 right-0 z-50 bg-[#050408] px-3 pt-2 pb-1.5 flex flex-col"
                : ""
            }
            style={
              mobileVv
                ? {
                    top: `${mobileVv.top}px`,
                    height: `${mobileVv.height}px`,
                  }
                : undefined
            }
          >
            {/* Conversation Log Box: Distinct Purple Chat Viewport */}
            <div 
              ref={chatContainerRef}
              className={`bg-[#19092d] border border-[#6325a6] p-3.5 md:p-5 overflow-y-auto overscroll-contain space-y-3 text-sm md:text-[15px] ${
                mobileVv
                  ? "flex-1 min-h-0 mb-2"
                  : "h-[360px] sm:h-[450px] md:h-[calc(100vh-370px)] md:min-h-[400px] md:max-h-[560px] mb-2.5"
              }`}
            >
              {displayedMessages.map((msg, index) => (
                <div
                  key={index}
                  className={`flex flex-col ${
                    msg.role === "user" ? "items-end" : "items-start"
                  }`}
                >
                  <div className="flex items-center gap-1 text-[11px] font-semibold uppercase tracking-wider text-[#f1ecd7]/60 mb-1">
                    {msg.role === "user" ? (
                      <span>{lang === "fr" ? "VOUS" : "YOU"}</span>
                    ) : (
                      <span className="text-[#f1ecd7] flex items-center gap-1">
                        {msg.mode === "twin" ? (
                          <>
                            <Radio className="w-3 h-3 text-[#6325a6]" />
                            <span>Tombot</span>
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
                    className={`p-3 sm:p-3.5 max-w-[94%] md:max-w-[85%] leading-relaxed ${
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
                <div className="flex items-center gap-2 text-xs sm:text-sm text-[#f1ecd7]/70 font-mono py-1.5">
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
              className="flex items-end gap-2 flex-shrink-0"
            >
              <textarea
                ref={inputTextareaRef}
                rows={1}
                value={inputMessage}
                onFocus={() => {
                  if (blurTimeoutRef.current) clearTimeout(blurTimeoutRef.current);
                  setIsInputFocused(true);
                }}
                onBlur={() => {
                  blurTimeoutRef.current = setTimeout(() => {
                    setIsInputFocused(false);
                    if (typeof window !== "undefined" && window.innerWidth < 768) {
                      window.scrollTo({ top: 0, behavior: "instant" });
                    }
                  }, 120);
                }}
                onChange={(e) => setInputMessage(e.target.value.slice(0, 600))}
                onKeyDown={(e) => {
                  if (e.key === "Enter" && !e.shiftKey) {
                    e.preventDefault();
                    handleSendMessage();
                  }
                }}
                placeholder={
                  lang === "fr"
                    ? "Posez une question..."
                    : "Ask anything..."
                }
                disabled={isLoading}
                className="flex-1 bg-[#120720] border border-[#6325a6] px-3 py-2.5 text-base sm:text-sm text-[#f1ecd7] focus:outline-none focus:border-[#f1ecd7] placeholder-[#f1ecd7]/40 min-w-0 resize-none overflow-y-auto leading-relaxed max-h-[160px]"
              />
              <button
                type="submit"
                onMouseDown={(e) => e.preventDefault()}
                disabled={isLoading || !inputMessage.trim()}
                className="bg-[#6325a6] hover:bg-[#f1ecd7] text-[#f1ecd7] hover:text-[#050408] px-3.5 sm:px-4 py-2.5 text-sm font-semibold tracking-wide transition-colors cursor-pointer border border-[#6325a6] hover:border-[#f1ecd7] flex items-center gap-1.5 disabled:opacity-50 flex-shrink-0"
              >
                <span>{lang === "fr" ? "Envoyer" : "Send"}</span>
                <Send className="w-3.5 h-3.5" />
              </button>
            </form>
            <div className="text-[10px] text-[#f1ecd7]/50 mt-1 flex items-center justify-end flex-shrink-0">
              {showAdvancedModes && (
              <button
                type="button"
                onClick={() => setShowTelemetryInfo((prev) => !prev)}
                className="flex items-center gap-1 text-[#f1ecd7]/60 hover:text-[#f1ecd7] transition-colors cursor-pointer group mr-auto"
              >
                <Info className="w-3 h-3 text-[#a855f7] flex-shrink-0" />
                <span className="underline decoration-[#6325a6] group-hover:decoration-[#f1ecd7] underline-offset-2">
                  {lang === "fr"
                    ? "D'où viennent ces chiffres ?"
                    : "Where do these numbers come from?"}
                </span>
              </button>
              )}
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
                          ? "Comment les chiffres sont calculés"
                          : "How the numbers are counted"}
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
                          <strong className="text-[#f1ecd7]">1. Journaux bruts, pas d&apos;estimations :</strong> Un script Python lit les journaux horodatés des sessions de travail (fichiers <code>.jsonl</code>) et l&apos;historique Git des dépôts de BandMath ({fmtNum(TELEMETRY.total_files)} fichiers sources, {fmtNum(TELEMETRY.total_net_loc)} lignes de code nettes) depuis le 30 janvier 2026.
                        </p>
                        <p>
                          <strong className="text-[#f1ecd7]">2. Temps actif uniquement ({fmtNum(TELEMETRY.total_verified_hours)} heures) :</strong> Les heures sont calculées à partir des intervalles entre les messages de Tom ({fmtNum(TELEMETRY.total_founder_prompts)} prompts sur {TELEMETRY.active_days} jours actifs). Toute pause de plus de 30 minutes est coupée : une fenêtre laissée ouverte ne compte donc jamais.
                        </p>
                        <p>
                          <strong className="text-[#f1ecd7]">3. Mise à jour chaque soir :</strong> Chaque soir à 23h00, un script compile les commits et les sessions de la journée dans le journal du studio.
                        </p>
                      </div>
                    ) : (
                      <div className="space-y-1.5 leading-relaxed text-[11px] sm:text-xs">
                        <p>
                          <strong className="text-[#f1ecd7]">1. Raw logs, no estimates:</strong> A Python script reads the timestamped work-session logs (<code>.jsonl</code> files) and the Git history of BandMath&apos;s repositories ({fmtNum(TELEMETRY.total_files)} source files, {fmtNum(TELEMETRY.total_net_loc)} net lines of code) since January 30, 2026.
                        </p>
                        <p>
                          <strong className="text-[#f1ecd7]">2. Active time only ({fmtNum(TELEMETRY.total_verified_hours)} hours):</strong> Hours are counted from the gaps between Tom&apos;s messages ({fmtNum(TELEMETRY.total_founder_prompts)} prompts across {TELEMETRY.active_days} active days). Any gap longer than 30 minutes is cut, so a window left open never counts.
                        </p>
                        <p>
                          <strong className="text-[#f1ecd7]">3. Updated every night:</strong> Every night at 11:00 PM, a script rolls the day&apos;s commits and sessions into the studio diary.
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
                ? "Collez une offre et l'outil la compare au parcours vérifié de Tom : le positionnement adapté (ESN ou startup), les preuves sur 3 piliers (UX, livraison avec l'IA, prise en charge de bout en bout) et ce que Tom ne fait pas."
                : "Paste a role and the tool compares it to Tom's verified track record: the framing that fits (enterprise or startup), evidence across 3 pillars (UX, AI-assisted delivery, end-to-end ownership), and what Tom doesn't do."}
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
                    <button
                      type="button"
                      onClick={handleCopyAuditEmail}
                      className="text-xs bg-[#6325a6] hover:bg-[#f1ecd7] text-[#f1ecd7] hover:text-[#050408] px-2.5 py-1 font-medium transition-colors flex items-center gap-1 border border-[#6325a6] cursor-pointer"
                    >
                      {copiedAuditEmail ? (
                        <>
                          <Check className="w-3 h-3" />
                          <span>{lang === "fr" ? "Email copié !" : "Email Copied!"}</span>
                        </>
                      ) : (
                        <>
                          <Coffee className="w-3 h-3" />
                          <span>{lang === "fr" ? "Copier l'email (Café / Visio)" : "Copy Email (Coffee / Call)"}</span>
                        </>
                      )}
                    </button>
                  </div>

                  <div className="max-w-none text-[#f1ecd7]/90 text-xs md:text-sm">
                    <FormattedMessageText content={jdAuditResult} />
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
