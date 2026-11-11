"use client";

import { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
  ChevronRight,
  ChevronLeft,
  ChevronDown,
  Mail,
  Check,
  ExternalLink,
  Award,
  GraduationCap,
  MapPin,
  Calendar,
  Layers,
  Film,
} from "lucide-react";
import { useLanguage } from "@/components/LanguageContext";
import Navbar from "@/components/Navbar";
import { dict } from "@/lib/i18n";

interface ExperienceRole {
  company: string;
  role: string;
  period: string;
  duration: string;
  location: string;
  eraTag: string;
  summary: string;
  highlights: Array<{ label: string; text: string }>;
  cta?: {
    href: string;
    label: string;
    external?: boolean;
    icon: "bandmath" | "archive";
  };
}

export default function ExperiencePage() {
  const { lang } = useLanguage();
  const t = dict[lang];
  const [copiedEmail, setCopiedEmail] = useState(false);
  const [openRoleIdx, setOpenRoleIdx] = useState<number | null>(null);
  const [eduOpen, setEduOpen] = useState(false);

  const handleCopyEmail = () => {
    const emailAddress = ["portfolio", "tommares.com"].join("@");
    navigator.clipboard.writeText(emailAddress);
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2500);
  };

  const roles: ExperienceRole[] =
    lang === "fr"
      ? [
          {
            company: "BandMath",
            role: "Product Owner / AI Orchestrator",
            period: "Novembre 2025 - Aujourd'hui",
            duration: "En cours",
            location: "Lyon, Auvergne-Rhône-Alpes, France",
            eraTag: "SaaS Fintech & Orchestration IA",
            summary:
              "Direction produit, architecture fonctionnelle et livraison de bout en bout de BandMath, une plateforme SaaS et fintech dédiée à l'industrie du spectacle vivant (billetterie en ligne, terminaux d'encaissement Tap to Pay, gestion d'inventaire et comptabilité analytique pour groupes, salles de concert, promoteurs et tour managers). Pilotage du cycle complet de développement via un studio d'ingénierie IA structuré en 11 départements (185 000+ lignes de code nettes sur 7 systèmes interconnectés et 4 dépôts Git), de la modélisation métier jusqu'au lancement commercial.",
            highlights: [
              {
                label: "Product Ownership & UI/UX Design :",
                text: "Conception intégrale des parcours utilisateurs et d'une interface sur-mesure (sans templates génériques) pensée pour le terrain, à l'entrée d'une salle ou derrière un stand de merch.",
              },
              {
                label: "Architecture Globale :",
                text: "Création d'un écosystème modulaire cross-platform (iOS, Android, Web), backend PostgreSQL Supabase, portail de billetterie web, site marketing, Knowledge Base et console d'administration.",
              },
              {
                label: "Ingénierie Financière :",
                text: "Modélisation comptable en partie double (au centime entier), intégration omnicanale (Stripe Connect, Apple Tap to Pay sur iPhone, Google Pay, et suivi 100 % gratuit des espèces), et création d'un portail web d'abonnement autonome contournant la taxe de 30 % des App Stores.",
              },
              {
                label: "DevOps & Industrialisation :",
                text: "Mise en place de 4 pipelines CI/CD distincts (GitHub Actions, Fastlane, Vercel) avec contrôles compilateur et linter obligatoires avant chaque déploiement.",
              },
              {
                label: "QA & Support Automatisés :",
                text: "Implémentation de tests End-to-End générant automatiquement les captures d'écran de la Knowledge Base, et synchronisation directe du support client par e-mail avec le Kanban Jira.",
              },
              {
                label: "Sécurité & Gouvernance :",
                text: "Mise en place de politiques d'accès strictes (Row Level Security), d'authentification OAuth (Apple, Google), et de webhooks idempotents pour les transactions financières.",
              },
            ],
            cta: {
              href: "/bandmath",
              label: "Voir l'Étude de Cas BandMath",
              icon: "bandmath",
            },
          },
          {
            company: "Independent (Clients : Bananabones, Todoist, Zcash, SC Dept. of Public Health, etc.)",
            role: "Creative Consultant | Project Manager",
            period: "Juin 2020 - Novembre 2025",
            duration: "5 ans 6 mois",
            location: "Denver / Lyon, France",
            eraTag: "Conseil Créatif, SaaS & Gestion de Projet",
            summary:
              "Direction de projets transverses et de campagnes de communication vidéo stratégiques pour des acteurs Tech (SaaS) et gouvernementaux. Accompagnement sur la mise en récit de nouvelles fonctionnalités, l'éducation utilisateur (notamment plus de 5 ans de vidéos marketing et pédagogiques pour Todoist) et l'adoption d'outils B2B.",
            highlights: [
              {
                label: "Lancements Produits & Éducation Utilisateur (Todoist, 5+ ans) :",
                text: "Collaboration au long cours avec les équipes marketing et produit de Doist pour scénariser, réaliser et livrer à distance des vidéos explicatives et campagnes de lancement de fonctionnalités pour des millions d'utilisateurs.",
              },
              {
                label: "Pilotage de Campagnes Tech & Secteur Public :",
                text: "Gestion de projet de bout en bout (cadrage du besoin, budget, planning, livrables) pour des clients tels que Zcash, Bananabones et le Département de la Santé Publique de Caroline du Sud.",
              },
              {
                label: "Du Spectateur à l'Utilisateur (Narrative UX) :",
                text: "Traduction de fonctionnalités techniques complexes en récits visuels immédiats, posant les bases de ma pratique actuelle du Product Ownership logiciel.",
              },
            ],
            cta: {
              href: "/case-studies",
              label: "Explorer les Archives Clients",
              icon: "archive",
            },
          },
          {
            company: "Nusura",
            role: "Consulting Creative | Head of Video Production",
            period: "Février 2017 - Juin 2020",
            duration: "3 ans 5 mois",
            location: "Denver, Colorado, États-Unis",
            eraTag: "Direction de Production, Studio Live >100k$ & SaaS SIMDECK",
            summary:
              "Structuration de A à Z du département de production vidéo pour accompagner les solutions technologiques de l'agence, notamment autour de la plateforme SaaS de simulation de crise SIMDECK à destination du gouvernement américain (FEMA, Défense).",
            highlights: [
              {
                label: "Architecture Studio Live & Intégration SaaS (SIMDECK) :",
                text: "Collaboration étroite avec l'équipe de développement pour concevoir, budgéter (>100 000 $) et mettre en production un studio de diffusion en direct (NewTek TriCaster) intégré à SIMDECK pour les exercices fédéraux de gestion de crise.",
              },
              {
                label: "Management & Structuration d'Équipe :",
                text: "Recrutement, formation et encadrement d'une équipe de profils juniors pour les faire monter en compétences et les rendre autonomes sur l'exploitation du studio et du SaaS interne.",
              },
              {
                label: "Pilotage de Projets Tech, FinTech & IA :",
                text: "Rôle de consultant et producteur traduisant les objectifs stratégiques des clients en livrables concrets pour des acteurs innovants comme Juntos (plateforme IA conversationnelle par SMS en marque blanche pour les banques), Zcash ou TrackTek.",
              },
              {
                label: "Impact Business :",
                text: "Développement commercial et sécurisation de nouveaux contrats ayant généré des centaines de milliers de dollars de revenus grâce à des solutions de production et de conseil à haute valeur ajoutée.",
              },
            ],
            cta: {
              href: "/case-studies",
              label: "Voir les Études de Cas (Nusura, Juntos, Zcash)",
              icon: "archive",
            },
          },
          {
            company: "Various Clients (High Noon Entertainment, Bananabones Media, Dorsey Pictures, etc.)",
            role: "Post-Production Manager / Project Coordinator",
            period: "Septembre 2007 - Février 2017",
            duration: "9 ans 6 mois",
            location: "Denver, Colorado, États-Unis",
            eraTag: "Télévision Nationale US, Pipelines Techniques & Supervision d'Équipes",
            summary:
              "Pilotage de plannings complexes, d'équipes de post-production et de flux de travail techniques pour la production de plus de 100 épisodes diffusés à l'international sur les grands réseaux américains (notamment comme Post-Production Supervisor chez High Noon Entertainment sur Prospectors et Taco Trip).",
            highlights: [
              {
                label: "Management d'Équipes Pluridisciplinaires (Scale) :",
                text: "Encadrement direct d'équipes techniques et créatives (jusqu'à 15 monteurs, assistants, étalonneurs et ingénieurs du son) dans un environnement de livraison sous haute pression.",
              },
              {
                label: "Ingénierie de Pipelines & Serveurs NAS :",
                text: "Conception des workflows de post-production de bout en bout, configuration de serveurs de stockage partagés (NAS), stratégies de sauvegarde redondantes et contrôle qualité strict (QC) pour la livraison des masters aux chaînes.",
              },
              {
                label: "Opérations & Gestion Budgétaire :",
                text: "Planification budgétaire, gestion des relations fournisseurs et allocation stratégique des ressources sur de multiples productions menées de front avec des dates de diffusion incompressibles.",
              },
            ],
          },
        ]
      : [
          {
            company: "BandMath",
            role: "Product Owner / AI Orchestrator",
            period: "November 2025 – Present",
            duration: "Current",
            location: "Lyon, Auvergne-Rhône-Alpes, France",
            eraTag: "FinTech SaaS Architecture & AI Studio Orchestration",
            summary:
              "End-to-end Product Ownership, systems architecture, and delivery of BandMath, a commercial SaaS and fintech platform built for the live music industry (online ticketing, Tap to Pay POS terminals, inventory management, and double-entry settlement accounting for bands, venues, promoters, and tour managers). Directing the full product lifecycle across an 11-department AI engineering studio (185,000+ net lines of production code across 7 interconnected systems and 4 Git repositories), from domain modeling through commercial launch.",
            highlights: [
              {
                label: "Product Ownership & Bespoke UI/UX:",
                text: "Designed end-to-end user journeys and a custom interface from scratch (no generic SaaS templates) built for real-world speed at a venue door or merch table.",
              },
              {
                label: "Global Multi-Platform Architecture:",
                text: "Architected a modular cross-platform ecosystem (iOS, Android, Web), Supabase PostgreSQL backend, Fan Web Ticketing Checkout, Marketing Site, Knowledge Base, and Admin Console.",
              },
              {
                label: "Financial Engineering:",
                text: "Modeled strict integer-cent double-entry accounting, integrated omnichannel payments (Stripe Connect, Apple Tap to Pay on iPhone, Google Pay, plus 100% free Cash tracking), and built an autonomous web billing portal to bypass the 30% App Store tax.",
              },
              {
                label: "DevOps & CI/CD Automation:",
                text: "Deployed and maintained 4 distinct automated CI/CD pipelines (GitHub Actions, Fastlane, Vercel) guarded by deterministic compiler and linter gates.",
              },
              {
                label: "Automated QA & Support Pipeline:",
                text: "Engineered E2E test suites that automatically capture and update Knowledge Base screenshots on build, and wired incoming user support emails directly into the Jira Kanban board.",
              },
              {
                label: "Security & Governance:",
                text: "Enforced strict PostgreSQL Row Level Security (RLS) policies, Apple and Google OAuth sign-in, and idempotent financial webhooks.",
              },
            ],
            cta: {
              href: "/bandmath",
              label: "Explore BandMath Case Study",
              icon: "bandmath",
            },
          },
          {
            company: "Independent (Clients: Bananabones, Todoist, Zcash, SC Dept. of Public Health, etc.)",
            role: "Creative Consultant | Project Manager",
            period: "June 2020 – November 2025",
            duration: "5 yrs 6 mos",
            location: "Denver / Lyon, France",
            eraTag: "SaaS Video Strategy, User Education & Project Management",
            summary:
              "Directed cross-functional creative campaigns and strategic video communications for SaaS technology companies and government agencies—partnering on feature launches, user education (including 5+ years producing marketing and instructional videos for Todoist), and B2B tool adoption.",
            highlights: [
              {
                label: "SaaS Feature Launches & User Education (Todoist, 5+ Years):",
                text: "Partnered long-term with Doist's marketing and product teams to script, direct, and deliver remote video campaigns that explained new Todoist features and workflows to millions of users.",
              },
              {
                label: "Tech & Public-Sector Project Delivery:",
                text: "Led end-to-end project scoping, budgeting, scheduling, and remote production for B2B and public-sector clients including Zcash, Bananabones, and the South Carolina Department of Public Health.",
              },
              {
                label: "The 'Viewer to User' Bridge:",
                text: "Honed the narrative design discipline that now shapes my software Product Ownership: guiding a user through an application with the same clarity required to keep a viewer engaged on screen.",
              },
            ],
            cta: {
              href: "/case-studies",
              label: "Browse Client Success Archive",
              icon: "archive",
            },
          },
          {
            company: "Nusura",
            role: "Consulting Creative | Head of Video Production",
            period: "February 2017 – June 2020",
            duration: "3 yrs 5 mos",
            location: "Denver, Colorado, United States",
            eraTag: "$100k+ Live Broadcast Studio Build & SIMDECK SaaS Integration",
            summary:
              "Built and led the agency's video production department from the ground up to support Nusura's technology platforms—most notably SIMDECK, an internal crisis-simulation SaaS platform used for US government and military training exercises.",
            highlights: [
              {
                label: "Live-Streaming Studio Architecture (SIMDECK):",
                text: "Partnered closely with the software engineering team to design, budget ($100k+), and deploy a live-streaming broadcast studio (NewTek TriCaster) integrated directly into SIMDECK for FEMA and federal crisis-training simulations.",
              },
              {
                label: "Team Building & Mentorship:",
                text: "Recruited, trained, and managed a team of junior creatives and technicians so they could autonomously operate the studio and internal SaaS platform during live exercises.",
              },
              {
                label: "Tech, FinTech & AI Client Consulting:",
                text: "Served as client-facing consultant and producer translating executive objectives into technical and creative deliverables for innovative clients including Juntos (white-label conversational AI SMS platform for retail banks), Zcash, and TrackTek.",
              },
              {
                label: "Commercial Impact:",
                text: "Contributed directly to business development and pitched technical production solutions that secured hundreds of thousands of dollars in client revenue.",
              },
            ],
            cta: {
              href: "/case-studies",
              label: "View Case Studies (Nusura, Juntos, Zcash)",
              icon: "archive",
            },
          },
          {
            company: "Various Clients (High Noon Entertainment, Bananabones Media, Dorsey Pictures, etc.)",
            role: "Post-Production Manager / Project Coordinator",
            period: "September 2007 – February 2017",
            duration: "9 yrs 6 mos",
            location: "Denver, Colorado, United States",
            eraTag: "Network Television Delivery, Technical Pipelines & Team Supervision",
            summary:
              "Directed complex post-production schedules, technical workflows, and delivery pipelines across 100+ episodes of national and international broadcast television—rising to Post-Production Supervisor at High Noon Entertainment on network series including Prospectors (The Weather Channel) and Taco Trip (Cooking Channel).",
            highlights: [
              {
                label: "Multidisciplinary Team Leadership (Scale):",
                text: "Directly supervised post-production teams of up to 15 editors, assistant editors, colorists, and audio engineers in high-pressure broadcast delivery environments.",
              },
              {
                label: "Technical Pipeline & NAS Server Architecture:",
                text: "Engineered end-to-end post-production workflows, configured shared NAS storage servers and redundant backup systems ('protecting the film negatives'), and ran strict network QC for physical tape and digital masters.",
              },
              {
                label: "Operations & P&L Resource Planning:",
                text: "Managed budgets, vendor relationships, and resource allocation across multiple concurrent television productions with immovable network air dates.",
              },
            ],
          },
        ];

  const certifications = [
    "Professional Scrum Master™ II (PSM II)",
    "IT Scrum Master Certification — IBM",
  ];

  const topSkills =
    lang === "fr"
      ? [
          "User Experience (UX)",
          "Product Development",
          "Agile",
          "Orchestration d'Agents IA",
          "Architecture SaaS & Fintech",
        ]
      : [
          "User Experience (UX)",
          "Product Development",
          "Agile",
          "AI Agent Orchestration",
          "SaaS & Fintech Architecture",
        ];

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
        {/* Header & Open Editorial Lead-In */}
        <section className="w-full max-w-4xl text-left space-y-5 md:space-y-7 mb-12 md:mb-16">
          <div>
            <h1
              className="font-anton text-4xl sm:text-5xl md:text-6xl uppercase tracking-[0.05em] leading-none"
              style={{
                color: "transparent",
                WebkitTextStroke: "2px #d8b4fe",
                filter:
                  "drop-shadow(0 0 8px rgba(216,180,254,0.85)) drop-shadow(0 0 20px rgba(168,85,247,0.75))",
              }}
            >
              {lang === "fr" ? "PARCOURS & EXPÉRIENCE" : "EXPERIENCE & TIMELINE"}
            </h1>
            <p className="text-xs sm:text-sm uppercase tracking-[0.2em] text-[#e9d5ff]/75 font-semibold mt-2.5">
              {lang === "fr"
                ? "Direction Produit & Orchestration IA : De la Vision à la Mise en Production"
                : "Product Leadership & AI Orchestration: From Vision to Live Production"}
            </p>
          </div>

          {/* Open Editorial Intro (No Box — Expressive Jazz-Club Typography) */}
          <div className="space-y-4 border-l-2 border-[#a855f7]/60 pl-4 sm:pl-6 py-1">
            {lang === "fr" ? (
              <div className="text-base sm:text-lg md:text-[19px] font-light tracking-tight leading-[1.6] text-accent/90 space-y-3.5">
                <p>
                  Je conçois, architecture et livre des logiciels en production en combinant{" "}
                  <strong
                    className="font-bold text-[#e9d5ff]"
                    style={{ textShadow: "0 0 22px rgba(168,85,247,0.55)" }}
                  >
                    Product Ownership senior (PSM II)
                  </strong>{" "}
                  et orchestration d&apos;agents IA. Je dirige actuellement{" "}
                  <strong
                    className="font-bold text-[#e9d5ff]"
                    style={{ textShadow: "0 0 22px rgba(168,85,247,0.55)" }}
                  >
                    BandMath
                  </strong>
                  , une plateforme SaaS et fintech (
                  <span className="font-semibold text-accent underline decoration-[#a855f7] decoration-2 underline-offset-4">
                    185 000+ lignes de code en production
                  </span>{" "}
                  sur mobile, web et cloud) bâtie de zéro à la tête d&apos;un studio d&apos;ingénierie IA de 11
                  départements. Du design UX/UI et de la modélisation PostgreSQL jusqu&apos;aux flux financiers Stripe
                  Connect et aux pipelines CI/CD, je pilote le système de bout en bout.
                </p>
                <p>
                  Cette capacité d&apos;exécution repose sur{" "}
                  <strong
                    className="font-bold text-[#e9d5ff]"
                    style={{ textShadow: "0 0 22px rgba(168,85,247,0.55)" }}
                  >
                    17 ans de direction de productions complexes
                  </strong>{" "}
                  : télévision commerciale aux États-Unis, simulateurs de crise gouvernementaux (FEMA / Défense) et
                  campagnes produit pour des leaders SaaS comme Todoist. J&apos;aborde le logiciel comme un réalisateur
                  aborde un direct :{" "}
                  <span className="font-semibold text-accent underline decoration-[#a855f7] decoration-2 underline-offset-4">
                    chaque écran doit guider l&apos;utilisateur sans effort, et chaque pipeline doit livrer à l&apos;heure.
                  </span>
                </p>
              </div>
            ) : (
              <div className="text-base sm:text-lg md:text-[19px] font-light tracking-tight leading-[1.6] text-accent/90 space-y-3.5">
                <p>
                  I architect and ship production software by combining{" "}
                  <strong
                    className="font-bold text-[#e9d5ff]"
                    style={{ textShadow: "0 0 22px rgba(168,85,247,0.55)" }}
                  >
                    senior Product Ownership (PSM II)
                  </strong>{" "}
                  with multi-agent AI orchestration. Right now, I lead{" "}
                  <strong
                    className="font-bold text-[#e9d5ff]"
                    style={{ textShadow: "0 0 22px rgba(168,85,247,0.55)" }}
                  >
                    BandMath
                  </strong>
                  , a commercial SaaS and fintech platform (
                  <span className="font-semibold text-accent underline decoration-[#a855f7] decoration-2 underline-offset-4">
                    185,000+ lines of production code
                  </span>{" "}
                  across mobile, web, and cloud) that I built from the ground up by designing and directing an
                  11-department AI engineering studio. From bespoke UX and database schema modeling to Stripe Connect
                  payment flows and automated CI/CD pipelines, I own the system from whiteboard to live release.
                </p>
                <p>
                  That execution model is built on{" "}
                  <strong
                    className="font-bold text-[#e9d5ff]"
                    style={{ textShadow: "0 0 22px rgba(168,85,247,0.55)" }}
                  >
                    17 years of directing high-pressure commercial television
                  </strong>
                  , government crisis simulations (FEMA / Department of Defense), and product campaigns for global SaaS
                  leaders like Todoist. I treat software the way a showrunner treats a broadcast:{" "}
                  <span className="font-semibold text-accent underline decoration-[#a855f7] decoration-2 underline-offset-4">
                    every screen has to earn the user&apos;s attention, and every pipeline has to deliver on schedule.
                  </span>
                </p>
              </div>
            )}

            {/* Open Top Skills Strip */}
            <div className="pt-4 border-t border-[#a855f7]/30 flex flex-wrap items-center gap-2">
              <span className="text-xs uppercase font-bold tracking-widest text-[#e9d5ff]/70 mr-1">
                {lang === "fr" ? "Principales compétences :" : "Top Skills:"}
              </span>
              {topSkills.map((skill, idx) => (
                <span
                  key={idx}
                  className="bg-[#6325a6]/25 border border-[#a855f7]/50 text-[#e9d5ff] text-xs font-medium px-3 py-1"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>
        </section>

        {/* Vertical Career Timeline (Unboxed Open Spine) */}
        <section className="w-full max-w-4xl text-left mb-12 md:mb-16">
          <h2
            className="font-anton text-2xl sm:text-3xl md:text-4xl text-[#e9d5ff] uppercase tracking-wider mb-6 md:mb-8"
            style={{ textShadow: "0 0 20px rgba(168,85,247,0.5)" }}
          >
            {lang === "fr" ? "EXPÉRIENCE PROFESSIONNELLE" : "PROFESSIONAL EXPERIENCE"}
          </h2>

          <div className="relative border-l-2 border-[#a855f7]/55 pl-5 sm:pl-8 md:pl-10 space-y-8 md:space-y-10">
            {roles.map((item, idx) => {
              const isOpen = openRoleIdx === idx;
              return (
                <div
                  key={idx}
                  className="relative pb-6 md:pb-8 border-b border-[#a855f7]/25 last:border-b-0 last:pb-0"
                >
                  {/* Glowing Timeline Node Marker */}
                  <div
                    className={`absolute -left-[27px] sm:-left-[39px] md:-left-[47px] top-2 w-3.5 h-3.5 border-2 transition-colors ${
                      isOpen
                        ? "bg-[#e9d5ff] border-[#e9d5ff]"
                        : "bg-[#19092d] border-[#a855f7]"
                    }`}
                    style={{ boxShadow: "0 0 14px rgba(168,85,247,0.9)" }}
                  />

                  {/* Clickable Role Header Summary (Era Tag, Dates, Location, Title, Company + Accordion Toggle) */}
                  <button
                    type="button"
                    onClick={() => setOpenRoleIdx(isOpen ? null : idx)}
                    aria-expanded={isOpen}
                    className="w-full text-left group cursor-pointer focus:outline-none py-1 px-2 -mx-2 hover:bg-[#6325a6]/15 transition-colors"
                  >
                    {/* Era Tag + Date Pill */}
                    <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
                      <span className="bg-[#6325a6]/40 border border-[#a855f7]/60 text-[#e9d5ff] text-[11px] sm:text-xs font-bold uppercase tracking-wider px-2.5 py-0.5">
                        {item.eraTag}
                      </span>
                      <div className="flex flex-wrap items-center gap-3 text-xs text-accent/75 font-medium">
                        <span className="flex items-center gap-1">
                          <Calendar className="w-3.5 h-3.5 text-[#a855f7]" />
                          <span>{item.period}</span>
                          <span className="text-accent/50">({item.duration})</span>
                        </span>
                        <span className="flex items-center gap-1">
                          <MapPin className="w-3.5 h-3.5 text-[#a855f7]" />
                          <span>{item.location}</span>
                        </span>
                      </div>
                    </div>

                    {/* Role & Company + Chevron */}
                    <div className="flex items-start justify-between gap-3">
                      <div>
                        <h3
                          className={`font-anton text-2xl sm:text-3xl md:text-4xl tracking-wide uppercase leading-snug transition-colors ${
                            isOpen ? "text-[#e9d5ff]" : "text-accent group-hover:text-[#e9d5ff]"
                          }`}
                          style={isOpen ? { textShadow: "0 0 18px rgba(168,85,247,0.5)" } : undefined}
                        >
                          {item.role}
                        </h3>
                        <div
                          className="text-base sm:text-lg font-bold text-[#e9d5ff] mt-0.5"
                          style={{ textShadow: "0 0 18px rgba(168,85,247,0.45)" }}
                        >
                          {item.company}
                        </div>
                      </div>
                      <motion.div
                        animate={{ rotate: isOpen ? 180 : 0 }}
                        transition={{ duration: 0.2 }}
                        className="text-[#a855f7] group-hover:text-[#e9d5ff] mt-2 flex-shrink-0"
                      >
                        <ChevronDown className="w-5 h-5 sm:w-6 sm:h-6" />
                      </motion.div>
                    </div>
                  </button>

                  {/* Roll-Up Accordion Body: Description + Key Achievements + Case Study Link */}
                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.28, ease: "easeInOut" }}
                        className="overflow-hidden"
                      >
                        <div className="pt-4 mt-3 border-t border-[#a855f7]/25">
                          {/* Role Summary */}
                          <p className="text-base sm:text-lg font-light text-accent/90 mb-5 leading-relaxed">
                            {item.summary}
                          </p>

                          {/* Key Achievements */}
                          <div className="space-y-3 border-t border-[#a855f7]/25 pt-4">
                            <div className="text-xs uppercase font-bold tracking-widest text-[#e9d5ff]/75">
                              {lang === "fr" ? "Principales réalisations :" : "Key Achievements:"}
                            </div>
                            <ul className="space-y-2.5 text-sm sm:text-base font-light text-accent/85 leading-relaxed">
                              {item.highlights.map((h, hIdx) => (
                                <li key={hIdx} className="flex items-start gap-2.5">
                                  <span className="text-[#a855f7] font-bold mt-0.5">▪</span>
                                  <span>
                                    <strong className="font-semibold text-[#e9d5ff]">{h.label}</strong> {h.text}
                                  </span>
                                </li>
                              ))}
                            </ul>
                          </div>

                          {/* Direct Cross-Link to Case Study / Archive */}
                          {item.cta && (
                            <div className="mt-5 pt-3 flex justify-start">
                              <Link
                                href={item.cta.href}
                                className="bg-[#6325a6]/30 hover:bg-[#6325a6] text-[#e9d5ff] border border-[#a855f7]/70 px-4 py-2 text-xs font-bold uppercase tracking-widest transition-all inline-flex items-center gap-2"
                                style={{ textShadow: "0 0 14px rgba(168,85,247,0.45)" }}
                              >
                                {item.cta.icon === "bandmath" ? (
                                  <Layers className="w-3.5 h-3.5 text-[#e9d5ff]" />
                                ) : (
                                  <Film className="w-3.5 h-3.5 text-[#e9d5ff]" />
                                )}
                                <span>{item.cta.label}</span>
                                <ChevronRight className="w-3.5 h-3.5" />
                              </Link>
                            </div>
                          )}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}

            {/* Timeline Foundation Node: Education & Certifications (Accordion) */}
            <div className="relative pt-1">
              <div
                className={`absolute -left-[27px] sm:-left-[39px] md:-left-[47px] top-3 w-3.5 h-3.5 border-2 transition-colors ${
                  eduOpen
                    ? "bg-[#e9d5ff] border-[#e9d5ff]"
                    : "bg-[#19092d] border-[#a855f7]"
                }`}
                style={{ boxShadow: "0 0 14px rgba(168,85,247,0.9)" }}
              />

              <button
                type="button"
                onClick={() => setEduOpen((prev) => !prev)}
                aria-expanded={eduOpen}
                className="w-full text-left group cursor-pointer focus:outline-none py-1 px-2 -mx-2 hover:bg-[#6325a6]/15 transition-colors"
              >
                <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
                  <span className="bg-[#6325a6]/40 border border-[#a855f7]/60 text-[#e9d5ff] text-[11px] sm:text-xs font-bold uppercase tracking-wider px-2.5 py-0.5 flex items-center gap-1.5">
                    <GraduationCap className="w-3.5 h-3.5" />
                    <span>{lang === "fr" ? "Formation & Certifications" : "Education & Certifications"}</span>
                  </span>
                  <div className="flex flex-wrap items-center gap-3 text-xs text-accent/75 font-medium">
                    <span className="flex items-center gap-1">
                      <Calendar className="w-3.5 h-3.5 text-[#a855f7]" />
                      <span>2004 – 2007</span>
                    </span>
                  </div>
                </div>

                <div className="flex items-start justify-between gap-3">
                  <div>
                    <h3
                      className={`font-anton text-2xl sm:text-3xl md:text-4xl tracking-wide uppercase leading-snug transition-colors ${
                        eduOpen ? "text-[#e9d5ff]" : "text-accent group-hover:text-[#e9d5ff]"
                      }`}
                      style={eduOpen ? { textShadow: "0 0 18px rgba(168,85,247,0.5)" } : undefined}
                    >
                      {lang === "fr"
                        ? "BFA (Bachelor of Fine Arts), Études de Cinéma"
                        : "BFA, Film Studies"}
                    </h3>
                    <div
                      className="text-base sm:text-lg font-bold text-[#e9d5ff] mt-0.5"
                      style={{ textShadow: "0 0 18px rgba(168,85,247,0.45)" }}
                    >
                      University of Colorado at Boulder
                    </div>
                  </div>
                  <motion.div
                    animate={{ rotate: eduOpen ? 180 : 0 }}
                    transition={{ duration: 0.2 }}
                    className="text-[#a855f7] group-hover:text-[#e9d5ff] mt-2 flex-shrink-0"
                  >
                    <ChevronDown className="w-5 h-5 sm:w-6 sm:h-6" />
                  </motion.div>
                </div>
              </button>

              <AnimatePresence initial={false}>
                {eduOpen && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.28, ease: "easeInOut" }}
                    className="overflow-hidden"
                  >
                    <div className="space-y-3 border-t border-[#a855f7]/25 pt-4 mt-3">
                      <div className="text-xs uppercase font-bold tracking-widest text-[#e9d5ff]/75 flex items-center gap-1.5">
                        <Award className="w-3.5 h-3.5 text-[#a855f7]" />
                        <span>{lang === "fr" ? "Certifications :" : "Certifications:"}</span>
                      </div>
                      <ul className="space-y-2 text-sm sm:text-base font-light text-accent/85 leading-relaxed">
                        {certifications.map((cert, idx) => (
                          <li key={idx} className="flex items-start gap-2.5">
                            <span className="text-[#a855f7] font-bold mt-0.5">▪</span>
                            <span className="text-[#e9d5ff] font-medium">{cert}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </section>

        {/* Bottom Navigation & Contact Footer */}
        <div className="flex flex-col items-center gap-4 mt-2 w-full max-w-4xl">
          <div className="flex flex-col sm:flex-row justify-between gap-3 w-full">
            <Link
              href="/"
              className="font-anton text-sm md:text-base bg-transparent text-accent border border-[#a855f7]/60 px-4 py-2.5 md:px-5 md:py-3 uppercase tracking-widest hover:bg-[#6325a6]/40 transition-colors flex items-center justify-center gap-2"
            >
              <ChevronLeft className="w-4 h-4 md:w-5 md:h-5" />
              <span>{t.nav_home}</span>
            </Link>

            <Link
              href="/profile"
              className="font-anton text-sm md:text-base bg-[#6325a6]/40 border border-[#a855f7] text-[#e9d5ff] px-4 py-2.5 md:px-5 md:py-3 uppercase tracking-widest hover:bg-accent hover:text-primary transition-colors flex items-center justify-center gap-2"
              style={{ textShadow: "0 0 16px rgba(168,85,247,0.5)" }}
            >
              <span>{t.nav_profile}</span>
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
