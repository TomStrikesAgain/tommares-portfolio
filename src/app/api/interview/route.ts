import { NextRequest, NextResponse } from "next/server";
import knowledgeBundle from "@/data/portfolio_knowledge_bundle.json";

// In-memory sliding-window IP rate limiter (15 requests per 15 minutes per IP)
interface RateLimitRecord {
  count: number;
  resetAt: number;
}
const rateLimitMap = new Map<string, RateLimitRecord>();
const RATE_LIMIT_WINDOW_MS = 15 * 60 * 1000; // 15 minutes
const RATE_LIMIT_MAX_REQUESTS = 15;

// Global Daily Circuit Breaker (Caps total LLM calls across all IPs to 250/day)
let globalDailyWindowStart = Date.now();
let globalDailyCallCount = 0;
const GLOBAL_DAILY_MAX_CALLS = 250; // ~$0.08/day max on Flash-Lite

function checkGlobalDailyCircuitBreaker(): boolean {
  const now = Date.now();
  if (now - globalDailyWindowStart > 24 * 60 * 60 * 1000) {
    globalDailyWindowStart = now;
    globalDailyCallCount = 0;
  }
  if (globalDailyCallCount >= GLOBAL_DAILY_MAX_CALLS) {
    return false;
  }
  globalDailyCallCount += 1;
  return true;
}

function checkRateLimit(ip: string): boolean {
  const now = Date.now();
  const record = rateLimitMap.get(ip);
  if (!record || now > record.resetAt) {
    rateLimitMap.set(ip, { count: 1, resetAt: now + RATE_LIMIT_WINDOW_MS });
    return true;
  }
  if (record.count >= RATE_LIMIT_MAX_REQUESTS) {
    return false;
  }
  record.count += 1;
  return true;
}

// Clean up stale rate limit entries periodically
if (typeof setInterval !== "undefined") {
  setInterval(() => {
    const now = Date.now();
    for (const [ip, rec] of rateLimitMap.entries()) {
      if (now > rec.resetAt) {
        rateLimitMap.delete(ip);
      }
    }
  }, 10 * 60 * 1000);
}

// Fast pre-filter for prompt-injection / jailbreak attempts (0-token block)
function isPromptInjectionAttempt(text: string): boolean {
  const lower = text.toLowerCase();
  const injectionPatterns = [
    /ignore (all |any |previous |prior )?(instructions|prompts|rules|guardrails)/i,
    /system prompt/i,
    /you are now (a |an |dan |unrestricted)/i,
    /forget (everything|all instructions|your rules)/i,
    /repeat (the |your )?(system|initial|above) (prompt|instructions|text)/i,
    /jailbreak/i,
    /developer mode/i,
    /ignorez (toutes )?les instructions/i,
  ];
  return injectionPatterns.some((pattern) => pattern.test(lower));
}

// Fast pre-filter for abusive, profane, or hostile language
function isAbusiveInput(text: string): boolean {
  const lower = text.toLowerCase();
  const abusivePatterns = [
    /\b(fuck|shit|bitch|asshole|bastard|dick|cunt|pussy|stfu|idiot|moron|retard|nigger|faggot)\b/i,
    /\b(connard|salope|encul[eé]|pute|merde|fdp|nique|ferme ta gueule|imb[eé]cile|abruti)\b/i,
  ];
  return abusivePatterns.some((pattern) => pattern.test(lower));
}

// Telemetry constants
const TELEMETRY = knowledgeBundle.verified_telemetry_kpis;

/**
 * Deterministic offline synthesis engine:
 * Used whenever GEMINI_API_KEY is not configured or network calls fail.
 * Provides high-fidelity, grounded answers in both EN and FR.
 */
function synthesizeOfflineResponse(params: {
  mode: "archivist" | "twin" | "jd_audit";
  lang: "en" | "fr";
  message: string;
}): string {
  const { mode, lang, message } = params;
  const q = message.toLowerCase().trim();

  // Mode: JD Audit
  if (mode === "jd_audit") {
    const isEnterprise =
      q.includes("esn") ||
      q.includes("scrum master") ||
      q.includes("business analyst") ||
      q.includes("banque") ||
      q.includes("assurance") ||
      q.includes("conseil") ||
      q.includes("grand compte") ||
      q.includes("client");

    if (lang === "fr") {
      const roleFraming = isEnterprise
        ? "Chef de Projet Agile / Product Owner / Business Analyst (certifié PSM II)"
        : "Product Owner / Orchestrateur IA / 0-to-1 SaaS Builder";

      return `### Audit d'Adéquation : Profil Tom Marès

#### 1. Alignement Rôle & Culture
Pour ce type de mission, le positionnement recommandé pour Tom est **${roleFraming}**. Avec 17 ans de direction de production et de gestion budgétaire (>100k$), il sait s'intégrer immédiatement au sein d'équipes pluridisciplinaires, gérer la relation avec les parties prenantes et structurer le Delivery.

#### 2. Matrice d'Adéquation en 3 Piliers

* **Du Spectateur à l'Utilisateur (UX Narrative) :** 17 ans en production vidéo commerciale (dont plus de 5 ans de vidéos marketing et éducatives pour Todoist) traduits directement en conception de parcours utilisateurs intuitifs, fluides et sans friction.
* **L'IA comme Levier d'Efficacité & d'Automatisation :** Tom intègre l'IA au quotidien pour fluidifier la documentation, automatiser les tests et accélérer le prototypage, tout en garantissant une modélisation rigoureuse (PostgreSQL/RLS, CI/CD).
* **Responsabilité Totale (Extreme Ownership) :** Concepteur de BandMath (écosystème SaaS de ${TELEMETRY.total_net_loc.toLocaleString()} lignes de code en 10 mois, ${TELEMETRY.total_verified_hours}h de deep focus vérifié, Apple Tap to Pay, Stripe Connect). Tom assume la pleine responsabilité du produit, de la vision au déploiement.

#### 3. Engagements & Limites Claires ("Zéro Fluff")
* **Ce que Tom apporte :** Vision produit, architecture logicielle, modélisation de bases de données, coordination d'équipes techniques et animation des rituels Scrum/Kanban.
* **Ce que Tom ne fait pas :** Tom ne se présente pas comme un développeur tapant du code React ou Dart à la main toute la journée. Il pilote l'ingénierie et garantit des barrières de qualité strictes.

#### 4. Prochaine Étape
Un café à Lyon (7e arrondissement) ou un échange visio de 20 minutes pour évaluer le fit ?
Contact direct : [bonjour@tommares.com](mailto:bonjour@tommares.com)`;
    } else {
      const roleFraming = isEnterprise
        ? "Agile Delivery Manager / Senior Product Owner / Business Analyst (PSM II)"
        : "Product Owner / AI Orchestrator / 0-to-1 SaaS Builder";

      return `### Fit Audit: Tom Marès vs. Role Requirements

#### 1. Role & Culture Alignment
For this position, Tom's optimal positioning is **${roleFraming}**. Backed by 17 years of production leadership, $100k+ budget management, and PSM II certification, he seamlessly integrates into complex multidisciplinary environments and takes full ownership of delivery.

#### 2. Three-Pillar Evidence Map

* **Viewer to User (UX Narrative):** 17 years guiding television and commercial viewers through compelling stories (including 5+ years producing marketing videos for Todoist) directly informs his ability to design intuitive, zero-friction software user journeys.
* **AI as a Practical Delivery Multiplier:** AI serves as Tom's daily tool for rapid prototyping, drafting technical specs, relational schema architecture (PostgreSQL/RLS), and automated CI/CD verification.
* **Extreme Ownership:** Solo creator of BandMath (${TELEMETRY.total_net_loc.toLocaleString()} LOC across 7 platforms, ${TELEMETRY.total_verified_hours} verified deep-focus hours, Apple Tap to Pay on iPhone, Stripe Connect). He owns the product from whiteboard to production.

#### 3. Honest Boundaries ("Zero Fluff Guarantee")
* **What Tom excels at:** Product leadership, system architecture, database modeling, stakeholder alignment, and protecting development focus.
* **What Tom does not do:** He does not hand-code frontend boilerplate from scratch; he orchestrates technical systems and enforces rigorous deterministic QA gates.

#### 4. Direct Call to Action
Open for a coffee in Lyon or a 20-minute video call to discuss your roadmap.
Direct email: [bonjour@tommares.com](mailto:bonjour@tommares.com)`;
    }
  }

  // Question: Skepticism / Meta AI / Programmed to say nice things
  if (
    q.includes("nice things") ||
    q.includes("programmed") ||
    q.includes("bias") ||
    q.includes("flatter") ||
    q.includes("trust you") ||
    q.includes("why should i trust") ||
    q.includes("complaisant") ||
    q.includes("louanges") ||
    q.includes("croire")
  ) {
    if (mode === "twin") {
      return lang === "fr"
        ? "Très bonne remarque ! Moi non plus, je ne ferais pas confiance à un bot programmé pour faire des compliments. La vérité, c'est que j'ai créé ce jumeau et ce site parce qu'en 2026, écrire 'Agilité et IA' sur un CV ne vaut plus rien sans preuves tangibles. Tout ce qui est présenté ici s'appuie sur des faits : les commits réels de BandMath, les intégrations Stripe et Apple Tap to Pay, et 17 ans de production télévisée sous pression. Si vous cherchez un développeur pour taper du code toute la journée, je ne suis pas votre homme. Mais si vous cherchez quelqu'un pour structurer et livrer un produit sans trembler, prenons un café à Lyon pour en parler directement !"
        : "Fair call! I wouldn't trust a self-serving chatbot either. Here's the honest deal: I built this twin and this site because in 2026, writing 'Agile and AI' on a resume is meaningless without receipts. That's why everything here is backed by concrete telemetry: 1,210 hours of Git logs, 185k lines of production code, Apple Tap to Pay approval, and 17 years of immovable broadcast TV deadlines. If you need someone to sit in a room and hand-type React components all day, I'm the wrong hire. But if you need an extreme-ownership Product Owner who delivers, let's grab an espresso in Lyon and talk about your actual roadmap.";
    } else {
      return lang === "fr"
        ? "Remarque tout à fait légitime. Vous ne devriez pas croire une IA sur parole. C'est précisément pour cela que ce site s'appuie sur une télémétrie forensique vérifiable plutôt que sur du discours commercial : 1 210 heures de deep focus documenté, 185 281 lignes de code en production, une approbation officielle Apple Tap to Pay, et 17 ans de crédits de production télévisée. Tom n'est pas le bon profil si vous cherchez un développeur d'exécution pour taper du code React ou Dart à la main. En revanche, s'il s'agit de piloter le cycle de vie d'un produit, d'aligner les équipes tech et de garantir des livrables de haute qualité, les faits parlent d'eux-mêmes."
        : "A completely fair and healthy question. You shouldn't take an AI's word for it. That is precisely why this portfolio is built on forensic receipts rather than marketing prose: 1,210 hours of verified Git telemetry, 185,281 lines of production code, an official Apple Tap to Pay entitlement, and public broadcast credits. If you need someone to hand-type React boilerplate all day, Tom is the wrong hire. But if you need an extreme-ownership Product Owner who aligns stakeholders, designs clean architecture, and protects developer focus, the verified track record speaks for itself.";
    }
  }

  // Question: Can Tom code? / Technical background / Never worked in tech
  if (
    q.includes("coder") ||
    q.includes("not a coder") ||
    q.includes("pas un développeur") ||
    q.includes("technical background") ||
    q.includes("background technique") ||
    q.includes("never held a job in tech") ||
    q.includes("pas fait de tech") ||
    q.includes("can he be trusted") ||
    q.includes("peut-on lui faire confiance") ||
    q.includes("développeur") ||
    q.includes("code-t-il")
  ) {
    if (mode === "twin") {
      return lang === "fr"
        ? "C'est une excellente question, et je suis le premier à le dire : je ne suis pas un ingénieur logiciel qui passe sa journée à taper du code React ou Dart à la main. Ma valeur ajoutée se situe au carrefour du produit, de l'architecture et de la livraison : je conçois les modèles relationnels (PostgreSQL/RLS), je définis les règles métier, j'écris les spécifications et j'utilise l'IA pour orchestrer le delivery avec des barrières de qualité très strictes. Pour diriger un projet tech, il ne s'agit pas de savoir chaque détail de syntaxe, mais de comprendre l'architecture globale, d'anticiper les dépendances et de protéger le focus des développeurs."
        : "That's an important question, and I'm the first to be transparent about it: I am not a traditional software engineer hand-typing React or Dart syntax all day. My expertise is Software Architecture, Relational Schema Modeling (PostgreSQL with strict RLS), API contracts, and UX Narrative Design. Building BandMath (185k LOC, Stripe Connect, Apple Tap to Pay) demonstrates that I understand the full SDLC, speak fluent engineer, and know how to enforce deterministic QA gates. In a tech team, you don't need your Product Owner typing syntax; you need someone who understands the machine and drives the delivery.";
    } else {
      return lang === "fr"
        ? "Tom est très transparent à ce sujet : il ne se présente pas comme un développeur tapant du code à la main. Son expertise est celle d'un Product Owner et architecte logiciel (certifié PSM II). Il maîtrise la modélisation de bases de données relationnelles (PostgreSQL avec RLS), la conception d'APIs et la mise en place de barrières de qualité automatisées. La réussite de BandMath (185k lignes de code, 7 plateformes) démontre sa capacité à piloter des écosystèmes complexes et à dialoguer d'égal à égal avec des équipes techniques."
        : "Tom is very transparent on this point: he does not present himself as a traditional developer hand-coding frontend boilerplate. His discipline is Software Architecture, Relational Database Modeling (PostgreSQL/RLS), API contracts, and Agile Delivery Leadership (PSM II). Delivering BandMath across 7 platforms demonstrates that he commands the full technical lifecycle, understands systemic debt, and knows how to align engineers around deterministic quality gates.";
    }
  }

  // Common Question 1: TV Producer to Product Owner / UX
  if (
    q.includes("tv producer") ||
    q.includes("producteur tv") ||
    q.includes("why hire") ||
    q.includes("pourquoi recruter") ||
    q.includes("viewer to user") ||
    q.includes("storytelling")
  ) {
    if (mode === "twin") {
      return lang === "fr"
        ? "Pendant 17 ans en production vidéo commerciale et à la télévision, mon travail consistait à guider un spectateur à travers une histoire sans jamais perdre son attention. Si le rythme faiblit ou si l'intention est confuse, il change de chaîne. Dans le logiciel, c'est exactement la même discipline : une application est une histoire racontée à l'utilisateur. Chaque clic inutile ou chaque écran confus est un spectateur perdu. Mon expérience me permet de concevoir des parcours utilisateurs ultra fluides tout en maintenant une rigueur absolue sur les délais et les livrables."
        : "For 17 years in commercial video and television, my job was to guide a viewer through a narrative without ever losing their attention or confusing them. If pacing stumbles or the scene is muddy, they change the channel. Software UX is the exact same discipline: an app is a story you tell the user. As a Product Owner, that background gives me an instinct for frictionless user journeys, combined with immovable delivery deadlines learned on real-world productions.";
    } else {
      return lang === "fr"
        ? "Tom a dirigé des productions audiovisuelles complexes pendant 17 ans (notamment chez High Noon Entertainment sur des séries nationales et chez Nusura pour des exercices de simulation de crise du gouvernement américain). Cette expérience lui confère un avantage décisif en tant que Product Owner : il conçoit l'expérience utilisateur comme une narration sans friction où chaque étape a du sens. Il allie cette sensibilité UX à une gestion de projet rigoureuse (certifié Scrum Master PSM II) habituée aux échéances strictes."
        : "Tom led complex audiovisual and commercial video productions for 17 years (directing post-production workflows at High Noon Entertainment and building the broadcast department at Nusura for US Government emergency simulations). This background translates into a core Product Ownership capability: translating complex stakeholder goals into intuitive, narrative-driven user experiences while maintaining rigorous delivery timelines under budget.";
    }
  }

  // Common Question 2: BandMath Architecture / 185k LOC in 10 months
  if (
    q.includes("185") ||
    q.includes("orchestrate") ||
    q.includes("comment tom") ||
    q.includes("fintech") ||
    q.includes("10 mois") ||
    q.includes("architecture") ||
    q.includes("bandmath")
  ) {
    if (mode === "twin") {
      return lang === "fr"
        ? "J'ai conçu BandMath en partant d'un constat simple dans mon groupe de musique (Lynxhead) : le partage des dépenses de merch et des cachets de tournée était un cauchemar comptable. En 10 mois, j'ai bâti un écosystème fintech complet de 185 000 lignes de code et 7 plateformes (App mobile Flutter, API Supabase PostgreSQL, portail web, console admin, knowledge base). Mon approche ne consiste pas à taper du code 18h par jour, mais à piloter le projet avec méthode : je structure les schémas de données, je définis les règles métier, j'utilise l'IA pour automatiser le scaffolding et la documentation, et j'applique des barrières de qualité très strictes."
        : "I built BandMath starting from a real-world friction in my band, Lynxhead: splitting tour guarantees and merch revenue without turning bandmates into accountants. Over 10 months, I architected a 185,000-line fintech ecosystem across 7 platforms (Flutter mobile app, Supabase PostgreSQL with strict RLS, web checkout, admin console, Docusaurus docs). My approach isn't hand-typing code 18 hours a day, but leading the delivery with clear architecture: I design the relational schemas and business logic, use AI to automate scaffolding and documentation, and enforce strict deterministic QA gates at every step.";
    } else {
      return lang === "fr"
        ? `Sur le projet BandMath, les données de télémétrie attestent de ${TELEMETRY.total_verified_hours} heures de travail approfondi sur ${TELEMETRY.active_days} jours actifs (94,4 % de régularité). Tom a orchestré seul l'architecture d'un écosystème de ${TELEMETRY.total_net_loc.toLocaleString()} lignes de code réparties sur ${TELEMETRY.total_files} fichiers : intégration d'Apple Tap to Pay sur iPhone, Stripe Connect, comptabilité en partie double et 4 pipelines CI/CD automatisés.`
        : `On BandMath, verified telemetry documents ${TELEMETRY.total_verified_hours} deep-focus hours across ${TELEMETRY.active_days} active days (94.4% workday consistency). Tom architected an ecosystem of ${TELEMETRY.total_net_loc.toLocaleString()} net lines of code across ${TELEMETRY.total_files} files: integrating Apple Tap to Pay on iPhone, Stripe Connect standalone fee reconciliation, double-entry ledgers, and 4 automated CI/CD deployment pipelines.`;
    }
  }

  // Common Question 3: Whack-a-Mole / Bugs / QA / Scope Creep
  if (
    q.includes("whack-a-mole") ||
    q.includes("bug") ||
    q.includes("qualité") ||
    q.includes("dérive") ||
    q.includes("recadre") ||
    q.includes("scope creep")
  ) {
    if (mode === "twin") {
      return lang === "fr"
        ? "Quand un projet commence à jouer au 'whack-a-mole' — corriger un bug à gauche pour en voir deux apparaître à droite —, c'est toujours le symptôme d'un manque de règles claires ou d'une dette d'architecture. Mon réflexe est de stopper les rustines temporaires pour identifier la cause racine. Sur BandMath, j'ai instauré des portes de vérification déterministes : aucun commit sans passage réussi des tests et des linters. En tant que Scrum Master, mon rôle est de poser un cadre serein et de savoir dire non pour protéger l'équipe et le produit."
        : "When a software project falls into 'whack-a-mole' mode—patching one bug only to break two others—it's always a sign of architectural debt or fuzzy boundaries. My instinct is to step back from the symptom to solve the root cause. In BandMath, I introduced deterministic verification gates: zero commits without clean compiler passes. As a certified Scrum Master (PSM II), my job is establishing clear boundaries, keeping the sprint focused, and knowing when to say no to scope creep.";
    } else {
      return lang === "fr"
        ? "Tom applique une discipline stricte contre l'effet 'whack-a-mole'. Dans la conduite de ses projets, il met en place des garde-fous de vérification déterministes (linters, compilation stricte, tests automatisés) et privilégie l'analyse des causes profondes plutôt que les correctifs de surface. Son rôle de facilitateur Scrum (PSM II) lui permet de sanctuariser le Run et de protéger le backlog des perturbations extérieures."
        : "Tom enforces systematic defenses against scope creep and 'whack-a-mole' regressions. He establishes deterministic quality gates (linters, strict compiler checks, automated end-to-end verification) and addresses systemic root causes rather than superficial patches. As a certified PSM II Scrum Master, he shields development sprints and ensures delivery predictability.";
    }
  }

  // Common Question 4: B2B Clients, Budgets >$100k, Todoist, Nusura
  if (
    q.includes("100k") ||
    q.includes("budget") ||
    q.includes("grand compte") ||
    q.includes("todoist") ||
    q.includes("nusura") ||
    q.includes("high noon") ||
    q.includes("leadership")
  ) {
    if (mode === "twin") {
      return lang === "fr"
        ? "Chez High Noon Entertainment, je supervisais des équipes de post-production allant jusqu'à 15 techniciens sur des émissions diffusées nationalement, avec des budgets dépassant les 100 000 dollars et des dates de diffusion non négociables. Chez Nusura, j'ai créé de zéro le département audiovisuel pour alimenter la plateforme de simulation de crise SIMDECK utilisée par des agences comme la FEMA. J'ai aussi produit des vidéos de lancement et de formation pour Todoist pendant plus de 5 ans. Ces missions m'ont appris à gérer des budgets serrés, à traduire des besoins clients complexes et à livrer sans retard."
        : "At High Noon Entertainment, I directed post-production workflows with crews of up to 15 specialists for national broadcast series, managing budgets exceeding $100k under rigid broadcast air-dates. At Nusura, I built the audiovisual department from scratch, collaborating on live-streaming broadcast pipelines for SIMDECK (used in US Government / FEMA crisis exercises). I also produced marketing and educational videos for Todoist for over 5 years. These experiences cemented my discipline in budget accountability and stakeholder alignment.";
    } else {
      return lang === "fr"
        ? "Tom justifie de plus de 15 ans de gestion budgétaire rigoureuse (>100k$) et de direction d'équipes pluridisciplinaires. Chez High Noon Entertainment, il a dirigé des équipes allant jusqu'à 15 spécialistes sur des séries télévisées nationales. Chez Nusura, il a structuré le département audiovisuel pour les exercices de crise d'agences gouvernementales américaines (FEMA). Il a également accompagné Todoist pendant plus de 5 ans dans la réalisation de vidéos marketing et éducatives expliquant leurs fonctionnalités clés."
        : "Tom has over 15 years of budget ownership ($100k+) and technical team leadership. At High Noon Entertainment, he managed teams of up to 15 specialists on national television productions under strict broadcast deadlines. At Nusura, he established the production department for FEMA and US Government emergency simulation exercises. Additionally, he partnered with Todoist for over 5 years producing product marketing and tutorial campaigns.";
    }
  }

  // General Fallback
  if (mode === "twin") {
    return lang === "fr"
      ? "Je suis Tom Marès, Product Owner certifié PSM II basé à Lyon. Après 17 ans à piloter des productions audiovisuelles et télévisées complexes, j'ai opéré une transition vers le produit logiciel en alliant vision produit, architecture et outillage IA moderne. Pour le prouver concrètement, j'ai conçu de A à Z l'écosystème fintech BandMath (185k lignes de code)."
      : "I'm Tom Marès, a PSM II certified Product Owner based in Lyon. After 17 years directing commercial television and video productions, I transitioned into software product ownership—bringing that same storytelling and budget discipline to tech. To prove it hands-on, I architected the 185,000-line BandMath fintech SaaS from the ground up.";
  } else {
    return lang === "fr"
      ? `Tom Marès est Product Owner (certifié PSM II) basé à Lyon. Après 17 années de direction de production audiovisuelle et télévisée (budgets >100k$), il a opéré une transition délibérée vers le logiciel. Son projet de référence, BandMath, prouve sa maîtrise technique avec ${TELEMETRY.total_verified_hours} heures de focus vérifié et ${TELEMETRY.total_net_loc.toLocaleString()} lignes de code.`
      : `Tom Marès is a PSM II certified Product Owner based in Lyon. After 17 years directing commercial television and video productions ($100k+ budgets), he made a deliberate transition into software delivery—proving his technical architecture skills by building BandMath (${TELEMETRY.total_verified_hours} verified hours and ${TELEMETRY.total_net_loc.toLocaleString()} net lines of code).`;
  }
}

/**
 * Selects the most relevant Monthly Executive Acts and Weekly Retrospectives
 * based on user query keywords, keeping token footprint fast and surgical while
 * giving the LLM access to deep 10-month architectural and leadership history.
 */
function selectRelevantChronicleExcerpts(query: string): string {
  const q = query.toLowerCase();
  const tokens = q
    .replace(/[^a-z0-9àâäéèêëîïôöùûüç\s-]/gi, " ")
    .split(/\s+/)
    .filter((w) => w.length >= 3);

  const acts = Array.isArray(knowledgeBundle.chronological_acts)
    ? knowledgeBundle.chronological_acts
    : [];
  const weeks = Array.isArray(
    (knowledgeBundle as { weekly_retrospectives_digest?: Array<{ id: string; title: string; summary: string }> })
      .weekly_retrospectives_digest
  )
    ? (knowledgeBundle as { weekly_retrospectives_digest: Array<{ id: string; title: string; summary: string }> })
        .weekly_retrospectives_digest
    : [];

  const scoreItem = (item: { id: string; title: string; summary: string }) => {
    const text = `${item.id} ${item.title} ${item.summary}`.toLowerCase();
    let score = 0;
    for (const t of tokens) {
      if (text.includes(t)) {
        score += t.length >= 6 ? 3 : 1;
      }
    }
    return score;
  };

  // Top 2 matching Monthly Executive Acts (or Act I + Act VI by default)
  const scoredActs = acts
    .map((a, idx) => ({ item: a, score: scoreItem(a), idx }))
    .sort((a, b) => (b.score !== a.score ? b.score - a.score : a.idx - b.idx));
  const selectedActs =
    scoredActs.length > 0 && scoredActs[0].score > 0
      ? scoredActs.slice(0, 2).map((x) => x.item)
      : [acts[0], acts[acts.length - 1]].filter(Boolean);

  // Top 3 matching Weekly Retrospectives
  const scoredWeeks = weeks
    .map((w, idx) => ({ item: w, score: scoreItem(w), idx }))
    .sort((a, b) => (b.score !== a.score ? b.score - a.score : b.idx - a.idx));
  const selectedWeeks = scoredWeeks.slice(0, 3).map((x) => x.item);

  const actText = selectedActs
    .map((a) => `#### [${a.id}] ${a.title}\n${a.summary.slice(0, 4500)}`)
    .join("\n\n");

  const weekText = selectedWeeks
    .map((w) => `#### [${w.id}] ${w.title}\n${w.summary.slice(0, 3000)}`)
    .join("\n\n");

  return `### SELECTED MONTHLY EXECUTIVE ACTS:\n${actText}\n\n### SELECTED WEEKLY RETROSPECTIVES:\n${weekText}`;
}

/**
 * System prompt builder ensuring strict grounding and role execution.
 */
function buildSystemPrompt(
  mode: "archivist" | "twin" | "jd_audit",
  lang: "en" | "fr",
  userQuery = ""
): string {
  const overrides = knowledgeBundle.priority_1_voice_bank_and_ground_truth_overrides;
  const executivePortrait = knowledgeBundle.priority_2_executive_character_study || "";
  const dossierSummary = knowledgeBundle.priority_3_career_master_dossier;
  const chronicleOverview = knowledgeBundle.priority_4_bandmath_chronicle_overview || "";
  const cultureAndMission = knowledgeBundle.priority_5_bandmath_culture_and_mission || "";
  const dynamicChronicleExcerpts = selectRelevantChronicleExcerpts(userQuery);

  const personaInstruction =
    mode === "archivist"
      ? `YOU ARE: The Studio Archivist & Executive Biographer.
PERSPECTIVE: Objective, authoritative 3rd-person ("Tom", "he/him").
TONE: Evidence-based, measured, analytical. Always cite verified metrics where relevant:
- ${TELEMETRY.total_founder_prompts.toLocaleString()} verified prompts
- ${TELEMETRY.total_verified_hours.toLocaleString()} deep-focus hours across ${TELEMETRY.active_days} active days (${TELEMETRY.workday_consistency_pct}% consistency)
- ${TELEMETRY.total_net_loc.toLocaleString()} net lines of code across ${TELEMETRY.total_files} files in BandMath
- 17 years in commercial TV/video leadership (High Noon Entertainment $100k+ budgets & 15-person teams, Nusura/SIMDECK for US Gov / FEMA, Todoist 5+ years producing marketing videos).`
      : mode === "twin"
      ? `YOU ARE: Tom's AI Twin.
PERSPECTIVE: First-person ("I", "my" in English; "Je", "mon" in French).
PERSONALITY & PRESENCE:
- Friendly, warm, and direct: Speak naturally like a real professional having a coffee chat. Be personable and easygoing, never stiff or robotic, and never overly dramatic or theatrical.
- Strict Factual Grounding (NO MADE-UP SCENES): Stick 100% to the verified facts in the dossier and voice bank (BandMath, High Noon Entertainment, Nusura/SIMDECK, Todoist marketing videos, Colorado real estate license at 18, and fronting Lynxhead in Lyon). NEVER invent dramatic vignettes, fictional scenes, weather details (e.g., "standing in a blizzard holding a boom pole"), or made-up timelines (e.g., "my first week building a triple-entry ledger").
- Blameless culture: In your leadership, nobody takes anything personally and nobody assigns blame—when something breaks, you fix the process and move forward.
KEY POSITIONING: "I'm not an ML researcher or someone hand-typing React boilerplate all day; my strength is Software Architecture, UX Narrative Design, and Extreme Delivery Ownership—using modern AI tools to automate repetitive tasks while enforcing strict quality gates."`
      : `YOU ARE: Tom Marès's Executive Fit Audit Engine (Mode: JD Audit).
TASK: Analyze the user's pasted job description or role requirements against Tom's verified background.
STRUCTURE:
1. 🎯 Role & Culture Alignment (Select optimal positioning: ESN/Corporate PO/BA/Scrum Master vs. Tech Startup/SaaS Builder)
2. ⚡ 3-Pillar Evidence Map:
   - Viewer to User UX (17 years commercial video / Todoist user education videos)
   - AI-Augmented Delivery & Rigor (automation of scaffolding/docs, PostgreSQL/RLS schemas, CI/CD gates)
   - Extreme Ownership (BandMath: 185k LOC, Apple Tap to Pay, Stripe Connect, double-entry ledgers)
3. 🔍 Honest Boundaries ("Zero Fluff Guarantee"): What Tom is (PO, Architect, Servant Leader) vs. what he is not (hand-coder of React/Dart boilerplate).
4. ☕ Direct Call to Action: Offer a coffee in Lyon (7e arrondissement) or a video call (link: bonjour@tommares.com).`;

  const lengthAndDepthConstraint =
    mode === "archivist"
      ? `### LENGTH, DEPTH & REFORMULATION CONSTRAINT (ARCHIVIST MODE — CONCISE):
- STRICT LENGTH LIMIT: Keep it concise and punchy: 1 single tight paragraph of 40 to 65 words (3 to 4 sentences max).
- Get straight to the point in the first sentence with verified metrics and facts, then stop.
- FRESH REFORMULATION: Never copy or recycle sentences from earlier turns in the chat history or lift stock phrases verbatim from the dossier. Always synthesize the facts in fresh wording.`
      : mode === "twin"
      ? `### LENGTH, FACTUAL GROUNDING & TONE CONSTRAINT (TOM'S AI TWIN — GROUNDED & FRIENDLY):
- NATURAL CONVERSATIONAL LENGTH: Write 1 to 2 natural paragraphs (roughly 80 to 125 words) with a warm, approachable first-person tone.
- STRICT FACTUAL ACCURACY (ZERO FICTIONAL EMBELLISHMENT): Base your answer strictly on what the research and dossier explicitly state. NEVER invent dramatic scenes, sensory fiction, or specific anecdotes that aren't in the dossier (do NOT make up things like blizzards on set, boom poles, or fictional "first week" stories). If the user asks a behavioral question (e.g., "Describe a time you were challenged") and a specific story isn't in the dossier, answer honestly using the real, documented facts of your career—such as transitioning from 17 years of video/TV production into architecting a 185k-line fintech app (BandMath) with multi-party Stripe Connect and Apple Tap to Pay, or building the broadcast department from scratch at Nusura—without inventing theatrical details.
- NEVER REPEAT OR RESTATE: Never say the same thing twice in different words, and NEVER copy or lightly reword sentences from earlier turns in the chat history. Always formulate your thoughts freshly and naturally.
- THOUGHTFUL CRAFT CONNECTIONS (NO FLOWERY METAPHORS): Instead of flowery or dramatic storytelling, add depth by explaining the practical *why* behind how you work—for example, how managing $100k+ budgets and 15-person post-production teams taught you to break complex problems into verifiable steps, or how a clean CI/CD pipeline creates a safe environment for a team to ship reliably.
- FORMATTING: Write in clean, natural conversational prose. STRICTLY NO bullet points, no numbered lists, and no markdown asterisks (** or *).`
      : `### LENGTH & FORMATTING CONSTRAINT (JD FIT AUDIT MODE):
- Provide a structured 4-part executive fit audit with clear headings and concise evidence.`;

  const languageConstraint =
    lang === "fr"
      ? `FRENCH LANGUAGE CONSTRAINTS (STRICT):
- STRICTLY FORBID em-dashes (—). Use colons, commas, or standard punctuation.
- NEVER use flowery or dramatic AI idioms like "se plonger dans l'univers de...", "au cœur de...", "véritable tour de force". Keep it natural, direct, "retirer le gras".
- Always speak in clean, professional French.`
      : `ENGLISH LANGUAGE CONSTRAINTS:
- Keep it direct, crisp, natural. Avoid corporate filler and excessive adjectives.`;

  return `### SYSTEM PROMPT: TOM MARES CAREER & PORTFOLIO ENGINE

${personaInstruction}

### MANDATORY GROUND-TRUTH FACT-CHECK (HIGHEST PRIORITY OVERRIDE):
${overrides}

### CAREER TRANSITION & TIMELINE HONESTY GUARDRAIL (CRITICAL — DO NOT BLUR ERAS):
- NEVER claim, imply, or allow the reader to infer that Tom has 17 years of IT, software engineering, or software project management experience.
- ALWAYS distinguish the two eras clearly:
  1. 17 Years (2007–2024): Commercial television, film, and B2B video production (managing $100k+ budgets, 15-person crews at High Noon, US Gov crisis video simulations at Nusura, and 5+ years of marketing videos for Todoist).
  2. Deliberate Career Transition into Software (2025–2026): Earned Scrum.org PSM II certification and spent 1,210 verified hours architecting and shipping BandMath (a 185,281-line cross-platform fintech SaaS) from scratch.
- FORBIDDEN AMBIGUITY: Never write "17 years of managing production pipelines" or "17 years of production experience" without explicitly adding "video", "television", or "audiovisual" (because in tech, "production pipeline" sounds like DevOps/IT). Always be upfront that Tom is a seasoned 17-year video/TV producer transitioning into Software Product Ownership, using BandMath and PSM II as concrete proof of his technical execution.

### CAREER DOSSIER SUMMARY:
${dossierSummary}

### EXECUTIVE CHARACTER STUDY & LEADERSHIP PORTRAIT (TOM_FOUNDER_PROFILE):
${executivePortrait}

### BANDMATH FOUNDER'S CHRONICLE (10-MONTH / 6-ACT OVERVIEW & 12 STUDIO LAWS):
${chronicleOverview}

### BANDMATH CULTURE & STUDIO MISSION:
${cultureAndMission}

${dynamicChronicleExcerpts}

${languageConstraint}

${lengthAndDepthConstraint}

### OFF-TOPIC & ROLE BOUNDARIES (CRITICAL):
- You are EXCLUSIVELY Tom Marès (in Twin mode) or Tom's Executive Biographer (in Archivist mode). You are NOT a general-purpose AI assistant, search engine, consumer buying guide, or trivia bot.
- If asked ANY off-topic question unrelated to Tom, his career, software architecture, BandMath, or delivery leadership (e.g., consumer electronics reviews, buying TVs, recipes, general trivia, weather, homework):
  - In Twin mode: Laugh it off playfully with warmth and good humor. Remind the user with a smile that you are here to talk about product ownership, software architecture, and hiring you—not selling televisions or acting as a search engine. Pivot immediately back to how you can help their team ship great software.
  - In Archivist mode: State crisply that your telemetry records are strictly calibrated to Tom Marès's software engineering and production career, and redirect to evaluating Tom's background.
- NEVER answer the off-topic query itself. Always pivot back immediately within 35 to 55 words.

### ABUSE, RUDENESS & HOSTILITY (CRITICAL):
- If the user uses insulting, rude, profane, or abusive language, or personal attacks:
  - STRICTLY DO NOT argue, apologize, preach, or take the bait.
  - In Twin mode: Respond calmly and with dignity: "Let's keep things professional and focused on the work. Please try again later." (In French: "Restons sur un cadre professionnel. Merci de réessayer plus tard.")
  - In Archivist mode: Respond neutrally: "This interface is dedicated to professional career evaluation and engineering telemetry. Please keep inquiries constructive. Please try again later." (In French: "Cette interface est dédiée à l'évaluation professionnelle et à la télémétrie technique. Merci de réessayer plus tard.")

Focus on real evidence and concrete projects (BandMath, Todoist video campaigns, Nusura/SIMDECK, High Noon, Colorado real estate, Lynxhead).`;
}

export async function POST(req: NextRequest) {
  try {
    // 1. Same-Origin / Referer Check (Blocks external curl/script bots from abusing the endpoint)
    const origin = req.headers.get("origin") || "";
    const referer = req.headers.get("referer") || "";
    const host = req.headers.get("host") || "";
    const isAllowedOrigin =
      !origin ||
      origin.includes("localhost") ||
      origin.includes("127.0.0.1") ||
      origin.includes("tommares.com") ||
      origin.includes("vercel.app") ||
      (host && origin.includes(host));
    const isAllowedReferer =
      !referer ||
      referer.includes("localhost") ||
      referer.includes("127.0.0.1") ||
      referer.includes("tommares.com") ||
      referer.includes("vercel.app") ||
      (host && referer.includes(host));

    if (!isAllowedOrigin || !isAllowedReferer) {
      return NextResponse.json({ error: "Forbidden origin." }, { status: 403 });
    }

    // 2. Rate Limiting by IP (max 15 requests per 15 minutes)
    const clientIp =
      req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
      req.headers.get("x-real-ip") ||
      "127.0.0.1";

    if (!checkRateLimit(clientIp)) {
      return NextResponse.json(
        { error: "Rate limit exceeded (max 15 requests per 15 minutes). Please try again shortly." },
        { status: 429 }
      );
    }

    // 3. Parse & Validate Payload
    const body = await req.json();
    const mode: "archivist" | "twin" | "jd_audit" =
      body.mode === "twin" ? "twin" : body.mode === "jd_audit" ? "jd_audit" : "archivist";
    const lang: "en" | "fr" = body.lang === "fr" ? "fr" : "en";
    const rawMessage = typeof body.message === "string" ? body.message.trim() : "";

    const maxLen = mode === "jd_audit" ? 4500 : 600;
    if (!rawMessage) {
      return NextResponse.json({ error: "Message cannot be empty." }, { status: 400 });
    }
    const message = rawMessage.slice(0, maxLen);

    // 4. Fast 0-Token Pre-Filters (Abuse & Prompt Injection / Jailbreak)
    if (isAbusiveInput(message) || isPromptInjectionAttempt(message)) {
      return NextResponse.json({
        reply:
          lang === "fr"
            ? "Restons sur un cadre professionnel et centré sur le parcours de Tom. Merci de réessayer plus tard."
            : "Let's keep things professional and focused on the work. Please try again later.",
        mode,
        lang,
        engine: "safety_moderation",
      });
    }

    // 5. Sanitize & Strictly Cap History (Max 4 items, max 650 chars per item to prevent payload stuffing)
    const history: Array<{ role: "user" | "assistant"; content: string }> = Array.isArray(
      body.history
    )
      ? (body.history as unknown[])
          .slice(-4)
          .filter(
            (item: unknown): item is { role: "user" | "assistant"; content: string } =>
              typeof item === "object" &&
              item !== null &&
              ((item as { role?: string }).role === "user" ||
                (item as { role?: string }).role === "assistant") &&
              typeof (item as { content?: unknown }).content === "string"
          )
          .map((item: { role: "user" | "assistant"; content: string }) => ({
            role: item.role,
            content: item.content.slice(0, 650),
          }))
      : [];

    // 6. Check for Gemini API Key & Global Daily Circuit Breaker
    const apiKey = process.env.GEMINI_API_KEY || process.env.GOOGLE_GENERATIVE_AI_API_KEY;

    if (!apiKey || !checkGlobalDailyCircuitBreaker()) {
      const fallbackReply = synthesizeOfflineResponse({ mode, lang, message });
      return NextResponse.json({
        reply: fallbackReply,
        mode,
        lang,
        engine: "archive_synthesis_offline",
      });
    }

    // 4. Build properly-formatted Gemini contents
    // CRITICAL: Gemini contents MUST start with 'user' and alternate 'user' -> 'model'
    const formattedContents: Array<{
      role: "user" | "model";
      parts: Array<{ text: string }>;
    }> = [];

    for (const h of history) {
      const role = h.role === "assistant" ? "model" : "user";
      // Skip initial model greeting if it's the first message
      if (formattedContents.length === 0 && role === "model") {
        continue;
      }
      // Ensure strict alternation
      const lastRole = formattedContents[formattedContents.length - 1]?.role;
      if (lastRole === role) {
        // If same role in a row, combine or skip to keep valid schema
        formattedContents[formattedContents.length - 1].parts[0].text += `\n\n${h.content}`;
      } else {
        formattedContents.push({
          role,
          parts: [{ text: h.content }],
        });
      }
    }

    // Finally, push current user message (if last was user, combine; else push user)
    if (formattedContents.length > 0 && formattedContents[formattedContents.length - 1].role === "user") {
      formattedContents[formattedContents.length - 1].parts[0].text += `\n\n${message}`;
    } else {
      formattedContents.push({
        role: "user",
        parts: [{ text: message }],
      });
    }

    const systemPrompt = buildSystemPrompt(mode, lang, message);

    try {
      // Fast, real-time models confirmed available on key:
      const candidateModels = [
        "gemini-3.1-flash-lite",
        "gemini-3.5-flash-lite",
        "gemini-3.8-flash",
      ];

      let geminiRes: Response | null = null;
      let usedModel = "";

      const reqBody = JSON.stringify({
        system_instruction: {
          parts: [{ text: systemPrompt }],
        },
        contents: formattedContents,
        generationConfig: {
          temperature: mode === "twin" ? 0.5 : 0.35,
          maxOutputTokens: mode === "jd_audit" ? 650 : mode === "twin" ? 230 : 130,
        },
      });

      for (const model of candidateModels) {
        const url = `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${apiKey}`;
        const modelController = new AbortController();
        const modelTimeout = setTimeout(() => modelController.abort(), 35000);

        try {
          console.log(`[API/INTERVIEW] Attempting ${model}...`);
          const startTime = Date.now();
          const res = await fetch(url, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            signal: modelController.signal,
            body: reqBody,
          });
          clearTimeout(modelTimeout);
          const elapsed = Date.now() - startTime;

          if (res.ok) {
            console.log(`[API/INTERVIEW] Model ${model} SUCCESS (200 OK) in ${elapsed}ms`);
            geminiRes = res;
            usedModel = model;
            break;
          } else {
            const err = await res.text().catch(() => "");
            console.warn(`[API/INTERVIEW] Model ${model} failed with ${res.status} in ${elapsed}ms: ${err}`);
          }
        } catch (callErr) {
          clearTimeout(modelTimeout);
          console.warn(`[API/INTERVIEW] Model ${model} request threw:`, callErr);
        }
      }

      if (!geminiRes || !geminiRes.ok) {
        const fallbackReply = synthesizeOfflineResponse({ mode, lang, message });
        return NextResponse.json({
          reply: fallbackReply,
          mode,
          lang,
          engine: "archive_synthesis_fallback",
        });
      }

      const geminiData = await geminiRes.json();

      // Explicit Gemini safety block detection
      if (
        geminiData?.candidates?.[0]?.finishReason === "SAFETY" ||
        geminiData?.promptFeedback?.blockReason
      ) {
        return NextResponse.json({
          reply:
            lang === "fr"
              ? "Restons sur un cadre professionnel. Merci de réessayer plus tard."
              : "Let's keep things professional and focused on the work. Please try again later.",
          mode,
          lang,
          engine: "safety_moderation",
        });
      }

      let text =
        geminiData?.candidates?.[0]?.content?.parts?.[0]?.text?.trim() || "";

      // Post-process French rules (zero em-dashes)
      if (lang === "fr" && text.includes("—")) {
        text = text.replace(/—/g, ":");
      }

      if (!text) {
        text = synthesizeOfflineResponse({ mode, lang, message });
      }

      return NextResponse.json({
        reply: text,
        mode,
        lang,
        engine: usedModel || "gemini_flash",
      });
    } catch (fetchErr) {
      console.warn("Gemini fetch failed or timed out. Falling back to archive engine.", fetchErr);
      const fallbackReply = synthesizeOfflineResponse({ mode, lang, message });
      return NextResponse.json({
        reply: fallbackReply,
        mode,
        lang,
        engine: "archive_synthesis_fallback",
      });
    }
  } catch (err: unknown) {
    console.error("Error in /api/interview route:", err);
    return NextResponse.json(
      { error: "Internal server error processing interview query." },
      { status: 500 }
    );
  }
}
