"use client";

import { useState } from "react";
import Link from "next/link";
import {
  ChevronRight,
  ChevronLeft,
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
            company: "BandMath (SaaS)",
            role: "Product Owner / AI Orchestrator",
            period: "Novembre 2025 - Aujourd'hui",
            duration: "En cours",
            location: "Lyon, Auvergne-Rhône-Alpes, France",
            eraTag: "SaaS Fintech & Orchestration IA",
            summary:
              "Conception, architecture et développement de bout en bout de BandMath, un écosystème SaaS de billetterie, d'inventaire et de comptabilité pour l'industrie de la musique live (185 000+ lignes de code nettes, 7 systèmes interconnectés sur 4 dépôts Git). J'ai piloté ce projet avec l'exigence d'un Product Owner travaillant pour son client le plus intraitable : moi-même. En utilisant un studio de développement IA structuré en 11 départements, j'ai supervisé l'intégralité du cycle produit, de la modélisation de données jusqu'à la mise en production.",
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
            company: "BandMath (SaaS)",
            role: "Product Owner / AI Orchestrator",
            period: "November 2025 – Present",
            duration: "Current",
            location: "Lyon, Auvergne-Rhône-Alpes, France",
            eraTag: "FinTech SaaS Architecture & AI Studio Orchestration",
            summary:
              "End-to-end product design, system architecture, and delivery of BandMath, a complete live-music sales, inventory, and accounting SaaS ecosystem (185,000+ net lines of code, 7 interconnected systems across 4 Git repositories). Directed the project with the standards of a Product Owner working for his toughest client—himself—orchestrating an 11-department AI engineering workflow from relational schema design to production release.",
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
    <main className="min-h-screen bg-sunburst flex flex-col items-center p-3 sm:p-4 md:p-6 font-inter overflow-x-hidden">
      <Navbar />

      <div className="w-full max-w-5xl bg-primary/95 p-3 sm:p-5 md:p-8 relative shadow-2xl overflow-hidden">
        <div className="p-0 sm:p-2 md:px-6 md:py-2 relative flex flex-col items-center w-full max-w-full min-w-0">
          {/* Header & Executive Profile */}
          <section className="w-full max-w-4xl text-left space-y-4 md:space-y-6 mt-1 mb-8 md:mb-12">
            <div>
              <h1 className="font-anton text-[1.875rem] leading-[2.25rem] md:text-5xl md:leading-tight text-secondary tracking-wide drop-shadow-md uppercase">
                {lang === "fr" ? "PARCOURS & EXPÉRIENCE" : "EXPERIENCE & TIMELINE"}
              </h1>
              <p className="text-xs sm:text-sm uppercase tracking-widest text-accent/70 font-semibold mt-1">
                {lang === "fr"
                  ? "2007 – Aujourd'hui · De la Production Télévisée à l'Architecture SaaS"
                  : "2007 – Present · From Network Television Pipelines to SaaS Product Ownership"}
              </p>
            </div>

            {/* Executive Summary */}
            <div className="bg-primary border-4 border-accent p-4 sm:p-6 md:p-8 space-y-3 shadow-[8px_8px_0_0_#6325a6] md:shadow-[12px_12px_0_0_#6325a6]">
              <h2 className="font-bold text-sm sm:text-base md:text-lg uppercase tracking-widest text-accent border-b-2 border-secondary pb-2">
                {lang === "fr"
                  ? "Direction Produit & Orchestration IA : De la Vision à la Mise en Production"
                  : "Product Leadership & AI Orchestration: From Vision to Live Production"}
              </h2>
              {lang === "fr" ? (
                <div className="text-body-standard space-y-2.5 leading-relaxed">
                  <p>
                    Je conçois, architecture et livre des logiciels en production en combinant{" "}
                    <strong className="text-accent">Product Ownership senior (PSM II)</strong> et orchestration
                    d&apos;agents IA. Je dirige actuellement <strong className="text-accent">BandMath</strong>, une
                    plateforme SaaS et fintech (<strong className="text-accent">185 000+ lignes de code</strong> en
                    production sur mobile, web et cloud) bâtie de zéro à la tête d&apos;un studio d&apos;ingénierie IA
                    de 11 départements. Du design UX/UI et de la modélisation PostgreSQL jusqu&apos;aux flux financiers
                    Stripe Connect et aux pipelines CI/CD, je pilote le système de bout en bout.
                  </p>
                  <p>
                    Cette capacité d&apos;exécution repose sur{" "}
                    <strong className="text-accent">17 ans de direction de productions complexes</strong> : télévision
                    commerciale aux États-Unis, simulateurs de crise gouvernementaux (FEMA / Défense) et campagnes
                    produit pour des leaders SaaS comme Todoist. J&apos;aborde le logiciel comme un réalisateur aborde
                    un direct : chaque écran doit guider l&apos;utilisateur sans effort, et chaque pipeline doit livrer
                    à l&apos;heure.
                  </p>
                </div>
              ) : (
                <div className="text-body-standard space-y-2.5 leading-relaxed">
                  <p>
                    I architect and ship production software by combining{" "}
                    <strong className="text-accent">senior Product Ownership (PSM II)</strong> with multi-agent AI
                    orchestration. Right now, I lead <strong className="text-accent">BandMath</strong>, a commercial
                    SaaS and fintech platform (<strong className="text-accent">185,000+ lines of production code</strong>{" "}
                    across mobile, web, and cloud) that I built from the ground up by designing and directing an
                    11-department AI engineering studio. From bespoke UX and database schema modeling to Stripe Connect
                    payment flows and automated CI/CD pipelines, I own the system from whiteboard to live release.
                  </p>
                  <p>
                    That execution model is built on{" "}
                    <strong className="text-accent">17 years of directing high-pressure commercial television</strong>,
                    government crisis simulations (FEMA / Department of Defense), and product campaigns for global SaaS
                    leaders like Todoist. I treat software the way a showrunner treats a broadcast: every screen has to
                    earn the user&apos;s attention, and every pipeline has to deliver on schedule.
                  </p>
                </div>
              )}

              {/* Top Skills Strip from LinkedIn */}
              <div className="pt-3 mt-3 border-t border-secondary/50 flex flex-wrap items-center gap-2">
                <span className="text-xs uppercase font-bold tracking-wider text-accent/70 mr-1">
                  {lang === "fr" ? "Principales compétences :" : "Top Skills:"}
                </span>
                {topSkills.map((skill, idx) => (
                  <span
                    key={idx}
                    className="bg-[#19092d] border border-secondary text-accent text-xs font-semibold px-2.5 py-1"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          </section>

          {/* Vertical Career Timeline */}
          <section className="w-full max-w-4xl text-left mb-10 md:mb-14">
            <h2 className="font-anton text-2xl sm:text-3xl md:text-4xl text-secondary uppercase tracking-wide mb-5 md:mb-6">
              {lang === "fr" ? "EXPÉRIENCE PROFESSIONNELLE" : "PROFESSIONAL EXPERIENCE"}
            </h2>

            <div className="relative border-l-4 border-secondary pl-4 sm:pl-6 md:pl-8 space-y-8 md:space-y-10">
              {roles.map((item, idx) => (
                <div key={idx} className="relative bg-[#0b0514] border-2 border-secondary p-4 sm:p-6 md:p-7">
                  {/* Timeline Node Marker */}
                  <div className="absolute -left-[26px] sm:-left-[34px] md:-left-[42px] top-5 w-4 h-4 bg-accent border-4 border-secondary" />

                  {/* Era Tag + Date Pill */}
                  <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
                    <span className="bg-secondary text-accent text-[11px] sm:text-xs font-bold uppercase tracking-wider px-2.5 py-0.5">
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

                  {/* Role & Company */}
                  <h3 className="font-anton text-xl sm:text-2xl md:text-3xl text-accent tracking-wide uppercase leading-snug">
                    {item.role}
                  </h3>
                  <div className="text-sm sm:text-base font-bold text-[#a855f7] mb-3">
                    {item.company}
                  </div>

                  {/* Role Summary */}
                  <p className="text-body-standard mb-4 leading-relaxed">
                    {item.summary}
                  </p>

                  {/* Key Achievements */}
                  <div className="space-y-2.5 border-t border-secondary/40 pt-3.5">
                    <div className="text-xs uppercase font-bold tracking-wider text-accent/70">
                      {lang === "fr" ? "Principales réalisations :" : "Key Achievements:"}
                    </div>
                    <ul className="space-y-2 text-xs sm:text-sm text-accent/85 leading-relaxed">
                      {item.highlights.map((h, hIdx) => (
                        <li key={hIdx} className="flex items-start gap-2">
                          <span className="text-[#a855f7] font-bold mt-0.5">▪</span>
                          <span>
                            <strong className="text-accent">{h.label}</strong> {h.text}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Direct Cross-Link to Case Study / Archive */}
                  {item.cta && (
                    <div className="mt-4 pt-3 border-t border-secondary/30 flex justify-end">
                      <Link
                        href={item.cta.href}
                        className="bg-[#19092d] hover:bg-secondary text-accent border border-secondary px-3.5 py-1.5 text-xs font-bold uppercase tracking-wider transition-colors inline-flex items-center gap-1.5"
                      >
                        {item.cta.icon === "bandmath" ? (
                          <Layers className="w-3.5 h-3.5 text-[#a855f7]" />
                        ) : (
                          <Film className="w-3.5 h-3.5 text-[#a855f7]" />
                        )}
                        <span>{item.cta.label}</span>
                        <ChevronRight className="w-3.5 h-3.5" />
                      </Link>
                    </div>
                  )}
                </div>
              ))}

              {/* Timeline Foundation Node: Education & Certifications */}
              <div className="relative bg-[#0b0514] border-2 border-secondary p-4 sm:p-6 md:p-7">
                <div className="absolute -left-[26px] sm:-left-[34px] md:-left-[42px] top-5 w-4 h-4 bg-accent border-4 border-secondary" />

                <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
                  <span className="bg-secondary text-accent text-[11px] sm:text-xs font-bold uppercase tracking-wider px-2.5 py-0.5 flex items-center gap-1.5">
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

                <h3 className="font-anton text-xl sm:text-2xl md:text-3xl text-accent tracking-wide uppercase leading-snug">
                  {lang === "fr"
                    ? "BFA (Bachelor of Fine Arts), Études de Cinéma"
                    : "BFA, Film Studies"}
                </h3>
                <div className="text-sm sm:text-base font-bold text-[#a855f7] mb-4">
                  University of Colorado at Boulder
                </div>

                <div className="space-y-2.5 border-t border-secondary/40 pt-3.5">
                  <div className="text-xs uppercase font-bold tracking-wider text-accent/70 flex items-center gap-1.5">
                    <Award className="w-3.5 h-3.5 text-[#a855f7]" />
                    <span>{lang === "fr" ? "Certifications :" : "Certifications:"}</span>
                  </div>
                  <ul className="space-y-2 text-xs sm:text-sm text-accent/85 leading-relaxed">
                    {certifications.map((cert, idx) => (
                      <li key={idx} className="flex items-start gap-2">
                        <span className="text-[#a855f7] font-bold mt-0.5">▪</span>
                        <span className="text-accent font-medium">{cert}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </section>

          {/* Bottom Navigation & Contact Footer */}
          <div className="flex flex-col items-center gap-4 mt-2 w-full max-w-4xl">
            <div className="flex flex-col sm:flex-row justify-between gap-3 w-full">
              <Link
                href="/"
                className="font-anton text-sm md:text-base bg-transparent text-accent border-2 border-secondary px-4 py-2.5 md:px-5 md:py-3 uppercase tracking-widest hover:bg-secondary transition-colors flex items-center justify-center gap-2"
              >
                <ChevronLeft className="w-4 h-4 md:w-5 md:h-5" />
                <span>{t.nav_home}</span>
              </Link>

              <Link
                href="/bandmath"
                className="font-anton text-sm md:text-base bg-secondary text-accent border-2 border-accent px-4 py-2.5 md:px-5 md:py-3 uppercase tracking-widest hover:bg-accent hover:text-primary transition-colors flex items-center justify-center gap-2"
              >
                <span>{t.nav_bandmath}</span>
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
