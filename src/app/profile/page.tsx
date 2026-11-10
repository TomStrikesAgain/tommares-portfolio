"use client";

import { useState, type ReactNode } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
  ChevronRight,
  ChevronLeft,
  ChevronDown,
  Mail,
  Check,
  ExternalLink,
  Compass,
  Wrench,
  Handshake,
  Target,
} from "lucide-react";
import { useLanguage } from "@/components/LanguageContext";
import Navbar from "@/components/Navbar";
import { dict } from "@/lib/i18n";

function ProfileAccordionCard({
  title,
  isOpen,
  onToggle,
  children,
}: {
  title: string;
  isOpen: boolean;
  onToggle: () => void;
  children: ReactNode;
}) {
  return (
    <div className="bg-[#0b0514] border-2 border-secondary overflow-hidden">
      <button
        type="button"
        onClick={onToggle}
        aria-expanded={isOpen}
        className="w-full flex items-center justify-between p-4 sm:p-5 md:px-6 md:py-4 hover:bg-secondary/15 transition-colors cursor-pointer text-left gap-3"
      >
        <h3 className="font-anton text-lg sm:text-xl md:text-2xl text-accent tracking-wide uppercase leading-snug">
          {title}
        </h3>
        <motion.div
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.2 }}
          className="text-[#a855f7] flex-shrink-0"
        >
          <ChevronDown className="w-5 h-5" />
        </motion.div>
      </button>
      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25, ease: "easeInOut" }}
          >
            <div className="px-4 pb-4 pt-3 sm:px-6 sm:pb-6 md:px-7 md:pb-7 border-t border-secondary/30 space-y-3 bg-black/30">
              {children}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default function ExecutiveProfilePage() {
  const { lang } = useLanguage();
  const t = dict[lang];
  const [copiedEmail, setCopiedEmail] = useState(false);
  const [openMindsetIdx, setOpenMindsetIdx] = useState<number | null>(null);
  const [openTrenchesIdx, setOpenTrenchesIdx] = useState<number | null>(null);

  const handleCopyEmail = () => {
    const emailAddress = ["portfolio", "tommares.com"].join("@");
    navigator.clipboard.writeText(emailAddress);
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2500);
  };

  return (
    <main className="min-h-screen bg-sunburst flex flex-col items-center px-3 pt-0 pb-3 sm:px-4 sm:pb-4 md:px-6 md:pb-6 font-inter">
      <Navbar />

      <div className="w-full max-w-5xl bg-primary/95 px-3 pt-3 pb-5 sm:px-5 sm:pt-4 sm:pb-6 md:px-8 md:pt-5 md:pb-8 relative shadow-2xl overflow-hidden">
        <div className="p-0 sm:p-2 md:px-6 md:py-2 relative flex flex-col items-center w-full max-w-full min-w-0">
          {/* Header & Source Material */}
          <section className="w-full max-w-4xl text-left space-y-4 md:space-y-6 mt-1 mb-8 md:mb-12">
            <div>
              <h1 className="font-anton text-[1.875rem] leading-[2.25rem] md:text-5xl md:leading-tight text-secondary tracking-wide drop-shadow-md uppercase">
                {lang === "fr"
                  ? "PRODUCTEUR CRÉATIF. BÂTISSEUR DE SYSTÈMES."
                  : "CREATIVE PRODUCER. SYSTEMS BUILDER."}
              </h1>
              <p className="text-xs sm:text-sm uppercase tracking-widest text-accent/70 font-semibold mt-1">
                {lang === "fr"
                  ? "Sous le Capot : 241 Jours de Construction en Public"
                  : "A Look Under the Hood at 241 Days of Building in Public"}
              </p>
            </div>

            {/* Source Material Box */}
            <div className="bg-[#0b0514] border-2 border-secondary p-4 sm:p-6 md:p-8 space-y-3 shadow-[8px_8px_0_0_#6325a6] md:shadow-[12px_12px_0_0_#6325a6]">
              <h2 className="font-bold text-sm sm:text-base md:text-lg uppercase tracking-widest text-accent border-b-2 border-secondary pb-2">
                {lang === "fr" ? "Matériau Source" : "Source Material"}
              </h2>
              {lang === "fr" ? (
                <p className="text-body-standard leading-relaxed">
                  Construit à partir de la télémétrie brute du studio BandMath (
                  <strong className="text-accent">9 160+ prompts dirigés non édités</strong>,{" "}
                  <strong className="text-accent">241 jours actifs · 2,58 Md de tokens</strong> et{" "}
                  <strong className="text-accent">10 vlogs YouTube long format sans script</strong>), combinée à 17 ans
                  d&apos;expérience en production télévisuelle et vidéo, ce profil répond à une question simple : non
                  pas <em>« quelles fonctionnalités a-t-il livrées ? »</em>, mais{" "}
                  <strong className="text-accent">
                    <em>
                      « comment réfléchit-il, comment résout-il les problèmes sous pression, et qu&apos;apporte-t-il à
                      une équipe ? »
                    </em>
                  </strong>
                </p>
              ) : (
                <p className="text-body-standard leading-relaxed">
                  Built from the raw telemetry of the BandMath studio (
                  <strong className="text-accent">9,160+ unedited directed prompts</strong>,{" "}
                  <strong className="text-accent">241 active build days · 2.58B tokens</strong>, and{" "}
                  <strong className="text-accent">10 unscripted long-form YouTube vlogs</strong>), alongside 17 years in
                  television and video production, this profile answers a simple question—not{" "}
                  <em>&ldquo;what features did he ship?&rdquo;</em>, but{" "}
                  <strong className="text-accent">
                    <em>
                      &ldquo;how does he think, how does he solve problems under pressure, and what does he bring to a
                      team?&rdquo;
                    </em>
                  </strong>
                </p>
              )}
            </div>
          </section>

          {/* SECTION 1: MINDSET & CREATIVE DNA */}
          <section className="w-full max-w-4xl text-left space-y-5 md:space-y-6 mb-10 md:mb-14">
            <div className="flex items-center gap-2.5 border-b-2 border-secondary pb-2">
              <Compass className="w-6 h-6 text-[#a855f7] flex-shrink-0" />
              <h2 className="font-anton text-2xl sm:text-3xl md:text-4xl text-secondary uppercase tracking-wide">
                {lang === "fr" ? "État d'Esprit & ADN Créatif" : "Mindset & Creative DNA"}
              </h2>
            </div>

            {lang === "fr" ? (
              <div className="text-body-standard space-y-3 leading-relaxed">
                <p>
                  La plupart des professionnels sont définis par le couloir dans lequel ils ont été formés. Les
                  ingénieurs pensent en compilateurs et en abstractions ; les chefs de projet pensent en tickets et en
                  plannings ; les créatifs pensent en esthétique et en émotion ; les opérationnels pensent en marges et
                  en contrats. Il est très rare que ces langages cohabitent chez une même personne, et encore plus rare
                  qu&apos;un professionnel ait l&apos;humilité de repartir au bas d&apos;une toute nouvelle discipline à
                  mi-carrière pour la maîtriser en public.
                </p>
                <p>
                  Si vous étudiez près de neuf mille interactions spontanées avec Tom (en l&apos;observant lorsqu&apos;il
                  est épuisé à 23h00, lorsqu&apos;un système casse pour la dixième fois, lorsqu&apos;un recruteur
                  interprète mal son parcours, ou lorsqu&apos;un déclic se produit soudainement à 10h00 du matin), un
                  portrait humain d&apos;une grande clarté se dessine.
                </p>
              </div>
            ) : (
              <div className="text-body-standard space-y-3 leading-relaxed">
                <p>
                  Most professionals are defined by the lane they were trained in. Engineers think in compilers and
                  abstractions; project managers think in tickets and timelines; creatives think in aesthetics and
                  emotion; business operators think in margins and contracts. Very rarely do those languages live inside
                  the same person—and even more rarely does someone have the humility to start at the bottom of a
                  brand-new discipline in mid-career and master it in public.
                </p>
                <p>
                  If you study nearly nine thousand unscripted interactions with Tom—watching him when he is exhausted at
                  11:00 PM, when a system breaks for the tenth time, when a recruiter misinterprets his background, or
                  when a breakthrough suddenly clicks at 10:00 AM—a remarkably clear portrait of the human being
                  emerges.
                </p>
              </div>
            )}

            <div className="space-y-3">
              {/* 1.1 */}
              <ProfileAccordionCard
                title={
                  lang === "fr"
                    ? "Vision de Producteur, Réflexes de Bâtisseur"
                    : "Big-Picture Producer, Hands-On Builder"
                }
                isOpen={openMindsetIdx === 0}
                onToggle={() => setOpenMindsetIdx(openMindsetIdx === 0 ? null : 0)}
              >
                <p className="text-body-standard leading-relaxed">
                  {lang === "fr" ? (
                    <>
                      Pendant dix-sept ans, Tom a travaillé comme producteur de télévision commerciale et de vidéo,
                      gérant des budgets à six chiffres, des équipes de tournage, des scripts et des clients. Un grand
                      producteur est quelqu&apos;un qui garde le film terminé en tête tout en résolvant cinquante
                      urgences logistiques sur le terrain. Ce qui rend Tom atypique, c&apos;est qu&apos;il n&apos;a aucun
                      intérêt à être un manager distant qui donne des ordres de loin. Lorsqu&apos;il rencontre une boîte
                      noire (qu&apos;il s&apos;agisse d&apos;une base de données relationnelle, d&apos;une règle fiscale
                      française, d&apos;un script terminal ou d&apos;un réseau de paiement), il ne peut pas s&apos;arrêter
                      avant d&apos;être entré dans la machine, d&apos;avoir touché les engrenages lui-même et
                      d&apos;avoir compris <em>pourquoi</em> cela fonctionne. Une fois qu&apos;il maîtrise le mécanisme
                      en profondeur, il reprend son fauteuil de producteur et conçoit un système pour que plus personne
                      n&apos;ait jamais à trébucher sur ce problème.
                    </>
                  ) : (
                    <>
                      For seventeen years, Tom worked as a commercial television and video producer, managing six-figure
                      budgets, crews, scripts, and clients. A great producer is someone who holds the entire finished
                      film in their head while solving fifty logistical emergencies on the floor. What makes Tom unusual
                      is that he has zero interest in being a &ldquo;hands-off&rdquo; manager who points from a
                      distance. When he encounters a black box—whether it is a relational database, a French tax
                      statute, a terminal script, or a payment network—he cannot rest until he climbs inside the
                      machine, touches the gears himself, and understands <em>why</em> it works. Once he understands the
                      mechanism from the ground up, he steps back into the producer&apos;s chair and designs a system so
                      that nobody ever has to trip over that problem again.
                    </>
                  )}
                </p>
              </ProfileAccordionCard>

              {/* 1.2 */}
              <ProfileAccordionCard
                title={
                  lang === "fr"
                    ? "Assez Humble pour Tout Demander, Obsédé par le Travail Bien Fait"
                    : "Humble Enough to Ask Any Question, Obsessive About Getting It Right"
                }
                isOpen={openMindsetIdx === 1}
                onToggle={() => setOpenMindsetIdx(openMindsetIdx === 1 ? null : 1)}
              >
                {lang === "fr" ? (
                  <>
                    <p className="text-body-standard leading-relaxed">
                      Dans la tech, beaucoup de professionnels expérimentés cachent ce qu&apos;ils ignorent derrière du
                      jargon. Tom fait exactement l&apos;inverse. Lorsqu&apos;il aborde un sujet nouveau, il n&apos;a
                      aucune peur de passer pour un débutant. Il dira :{" "}
                      <em>« Ralentis, allons-y clic par clic »</em>, ou{" "}
                      <em>« J&apos;ai besoin d&apos;explications ultra-simples ici parce que je suis perdu »</em>, ou
                      encore <em>« J&apos;avoue que cette partie me dépasse, détaille-moi les hypothèses. »</em>
                    </p>
                    <p className="text-body-standard leading-relaxed">
                      Parce qu&apos;il ne gaspille aucune énergie à faire semblant de savoir ce qu&apos;il ignore,{" "}
                      <strong className="text-accent">il apprend à une vitesse fulgurante.</strong> Un concept qui lui
                      est étranger le mardi devient un principe qu&apos;il fait appliquer à son équipe le vendredi.
                      Lorsque des trolls sur Reddit ont attaqué son premier prototype en mars (<em>Episode 4</em> &amp;{" "}
                      <em>Tom vs. The Integers</em>), affirmant que <em>« l&apos;interface fait littéralement mal aux yeux »</em>{" "}
                      et demandant <em>« pourquoi n&apos;importe qui ne coderait pas ça lui-même avec une IA ? »</em>, il
                      ne s&apos;est pas braqué. Il a extrait le signal utile de l&apos;insulte (en remplaçant dès la
                      semaine suivante les polices Impact/monospace étroites par une typographie <code>Inter</code>{" "}
                      épurée) tout en formulant calmement la vraie valeur de son travail :{" "}
                      <em>
                        « Le vrai rempart ici, c&apos;est l&apos;épuisement. Un groupe indé de quatre musiciens qui
                        remballe son matériel d&apos;une cave à 2h du matin n&apos;a aucune envie d&apos;apprendre
                        l&apos;architecture de base de données ou le prompting. »
                      </em>{" "}
                      Et lorsque la petite voix du syndrome de l&apos;imposteur s&apos;est fait entendre lors de la
                      semaine 8 (<em>Episode 8</em>, <code>2026-03-28</code>), il a regardé la caméra droit dans les
                      yeux avec une lucidité remarquable :
                    </p>
                    <blockquote className="border-l-4 border-[#a855f7] bg-[#140824] p-4 italic text-accent/90 text-xs sm:text-sm leading-relaxed">
                      « J&apos;ai clairement cette voix du syndrome de l&apos;imposteur dans ma tête qui me dit :
                      &ldquo;Quelles sont tes qualifications pour faire ça ? Pourquoi penses-tu mériter de te lancer dans
                      un projet pareil ?&rdquo; Et je pense que la réponse, c&apos;est que j&apos;ai plus à offrir au
                      monde que d&apos;être simplement monteur vidéo ou musicien. Je mets toutes les compétences que
                      j&apos;ai développées au fil de toutes ces années au travail en même temps... Je suis quelqu&apos;un
                      qui construit des solutions et des systèmes, qui assemble les pièces et qui trouve le moyen de
                      faire exister les choses. »
                    </blockquote>
                  </>
                ) : (
                  <>
                    <p className="text-body-standard leading-relaxed">
                      In tech, many experienced professionals hide what they don&apos;t know behind jargon. Tom does the
                      exact opposite. When he is new to a subject, he is completely unafraid to look like a beginner. He
                      will say, <em>&ldquo;Slow down, take this one click at a time,&rdquo;</em> or{" "}
                      <em>&ldquo;I need dummy-proof instructions here because I&apos;m confused,&rdquo;</em> or{" "}
                      <em>&ldquo;I&apos;ll admit this part is over my head—walk me through the assumptions.&rdquo;</em>
                    </p>
                    <p className="text-body-standard leading-relaxed">
                      Because he wastes zero energy pretending to know things he doesn&apos;t,{" "}
                      <strong className="text-accent">he learns at a blistering speed.</strong> A concept that is
                      foreign to him on a Tuesday becomes a principle he is enforcing on his team by Friday. When
                      internet trolls on Reddit attacked his early prototype in March (<code>Episode 4</code> &amp;{" "}
                      <code>Tom vs. The Integers</code>)—saying <em>&ldquo;the UI literally hurts my eyes&rdquo;</em>{" "}
                      and asking <em>&ldquo;why wouldn&apos;t anyone just vibe-code this themselves?&rdquo;</em>—he
                      didn&apos;t get defensive. He extracted the legitimate signal from the insult (swapping cramped
                      Impact/monospace fonts for clean <code>Inter</code> typography the very next week) while calmly
                      articulating the real-world value of his work:{" "}
                      <em>
                        &ldquo;The moat here is exhaustion. A four-piece indie band loading out of a basement venue at 2
                        a.m. does not want to learn database architecture or prompt AI.&rdquo;
                      </em>{" "}
                      And when the quiet voice of impostor syndrome crept in during Week 8 (<code>Episode 8</code>,{" "}
                      <code>2026-03-28</code>), he looked straight into the camera and answered it with remarkable
                      self-awareness:
                    </p>
                    <blockquote className="border-l-4 border-[#a855f7] bg-[#140824] p-4 italic text-accent/90 text-xs sm:text-sm leading-relaxed">
                      &ldquo;I definitely have that impostor syndrome voice in my head saying: &lsquo;What are your
                      qualifications for this? Why do you think you deserve to take on a project like this?&rsquo; And I
                      think it is that I have more to offer the world than just being a video editor or a musician.
                      I&apos;m putting all of the skills that I&apos;ve developed over the last too many years all to
                      work at the same time... I&apos;m a guy who just makes solutions and systems and puts things
                      together and finds ways to make things happen.&rdquo;
                    </blockquote>
                  </>
                )}
              </ProfileAccordionCard>

              {/* 1.3 */}
              <ProfileAccordionCard
                title={
                  lang === "fr"
                    ? "La Confiance par la Clarté : Démêler les Systèmes Humains Complexes"
                    : "Trust Through Clarity: Untangling Messy Human Systems"
                }
                isOpen={openMindsetIdx === 2}
                onToggle={() => setOpenMindsetIdx(openMindsetIdx === 2 ? null : 2)}
              >
                {lang === "fr" ? (
                  <>
                    <p className="text-body-standard leading-relaxed">
                      Pourquoi Tom a-t-il passé son examen d&apos;agent immobilier à dix-huit ans, consacré deux
                      décennies à gérer des budgets de production complexes et gravité vers les problèmes comptables les
                      plus ardus de la musique live ? Parce que{" "}
                      <strong className="text-accent">
                        son esprit cherche naturellement l&apos;équilibre dans les systèmes humains désordonnés.
                      </strong>
                    </p>
                    <p className="text-body-standard leading-relaxed">
                      Là où la plupart des gens voient une situation chaotique (quatre membres d&apos;un groupe qui se
                      disputent l&apos;argent des t-shirts, une salle et un promoteur qui se partagent une billetterie,
                      ou une répartition complexe de taxes et de royalties multi-devises) et se sentent submergés par la
                      friction, Tom voit un puzzle qui <em>demande</em> à être équilibré. Il pense en termes de{" "}
                      <strong className="text-accent">confiance par la clarté</strong> : si les règles sont justes, si
                      le calcul est transparent au centime près et si l&apos;interface explique <em>pourquoi</em> le
                      chiffre est ce qu&apos;il est, le conflit humain disparaît. Lorsqu&apos;il a rédigé le manifeste
                      d&apos;accueil de BandMath en juin (<code>2026-06-08</code>), il ne l&apos;a pas décrit comme un
                      outil comptable, mais comme{" "}
                      <em>
                        une philosophie de partage des ressources où chaque membre du groupe agit comme une micro-banque
                        accordant sa confiance au collectif, offrant au groupe un sujet de dispute en moins
                      </em>
                      . Et dans la vraie vie, après un concert de <strong className="text-accent">Lynxhead</strong> en
                      septembre (<code>2026-09-11</code>), lorsqu&apos;il a remarqué dans son propre grand livre que
                      deux fans avaient été débités par erreur de 18 € au lieu de 15 € pour un t-shirt, il n&apos;a
                      attendu aucune réclamation : il leur a immédiatement remboursé leurs 3 € en leur écrivant un
                      e-mail d&apos;excuse personnel en français.
                    </p>
                  </>
                ) : (
                  <>
                    <p className="text-body-standard leading-relaxed">
                      Why did Tom pass a real estate licensing exam at eighteen, spend two decades managing complex
                      production budgets, and gravitate toward the hardest accounting problems in live music? Because{" "}
                      <strong className="text-accent">
                        his mind naturally seeks equilibrium in messy human systems.
                      </strong>
                    </p>
                    <p className="text-body-standard leading-relaxed">
                      Where most people look at a chaotic situation—four bandmates arguing over t-shirt money, a venue
                      and a promoter splitting a box office, or a complex multi-currency tax and royalty split—and feel
                      overwhelmed by the friction, Tom sees a puzzle that <em>wants</em> to be balanced. He thinks in
                      terms of <strong className="text-accent">trust through clarity</strong>: if the rules are fair, if
                      the math is transparent down to the last cent, and if the interface explains <em>why</em> the
                      number is what it is, human conflict disappears. When he wrote the welcome manifesto for BandMath
                      in June (<code>2026-06-08</code>), he didn&apos;t describe it as an accounting utility—he
                      described it as{" "}
                      <em>
                        a philosophy of resource sharing where each bandmate acts as a tiny bank extending trust to the
                        group, giving the band one less thing to fight about
                      </em>
                      . And in real life, after a <strong className="text-accent">Lynxhead</strong> concert in September
                      (<code>2026-09-11</code>), when he noticed in his own ledger that two fans had accidentally been
                      charged €18 instead of €15 for a t-shirt, he didn&apos;t wait for anyone to complain—he
                      immediately refunded their €3 and wrote them a personal apology email in French.
                    </p>
                  </>
                )}
              </ProfileAccordionCard>

              {/* 1.4 */}
              <ProfileAccordionCard
                title={
                  lang === "fr"
                    ? "Un Marathonien, Pas un Sprinteur Kamikaze"
                    : "He Is a Marathoner, Not a Binge-and-Burn Sprinter"
                }
                isOpen={openMindsetIdx === 3}
                onToggle={() => setOpenMindsetIdx(openMindsetIdx === 3 ? null : 3)}
              >
                <p className="text-body-standard leading-relaxed">
                  {lang === "fr" ? (
                    <>
                      On en apprend beaucoup sur le tempérament d&apos;une personne en observant son horloge sur 280
                      jours. Tom n&apos;est pas un parieur chaotique de la « hustle culture » à 3h00 du matin qui
                      travaille 72 heures d&apos;affilée avant de disparaître pendant trois semaines. Sur neuf mois de
                      travail autodirigé sans aucun patron derrière son épaule, il a répondu présent{" "}
                      <strong className="text-accent">94,4 % des jours ouvrés</strong> (<code>236</code> jours sur{" "}
                      <code>250</code>), a protégé sa fenêtre de sommeil entre <code>3h00</code> et <code>7h00</code>{" "}
                      avec une discipline proche de 100 %, a atteint son pic cognitif à <code>10h00</code> et{" "}
                      <code>14h00</code> chaque lundi, mardi et jeudi, et a ménagé son rythme avec des mercredis plus
                      légers afin de tenir une <strong className="text-accent">série de 47 jours consécutifs</strong>{" "}
                      sans burn-out. Et lorsqu&apos;il a eu besoin d&apos;une pause en avril pour enregistrer de la
                      musique et jouer en concert avec son groupe, il l&apos;a prise délibérément, pour revenir deux
                      fois plus affûté le lundi matin.
                    </>
                  ) : (
                    <>
                      You can tell a lot about a person&apos;s temperament by looking at their clock over 280 days. Tom
                      is not a chaotic 3:00 AM &ldquo;hustle-culture&rdquo; gambler who works for 72 hours straight and
                      disappears for three weeks. Across nine months of self-directed work with no boss looking over his
                      shoulder, he showed up <strong className="text-accent">94.4% of all working days</strong> (
                      <code>236</code> of <code>250</code> days), protected his sleep window between{" "}
                      <code>3:00 AM</code> and <code>7:00 AM</code> with near-100% discipline, hit his highest cognitive
                      output at <code>10:00 AM</code> and <code>2:00 PM</code> every Monday, Tuesday, and Thursday, and
                      paced himself with lighter Wednesdays so he could sustain a{" "}
                      <strong className="text-accent">47-day consecutive daily streak</strong> without burning out. And
                      when he needed a break in April to record music and play a live show with his band, he took it
                      deliberately—and came back twice as sharp on Monday morning.
                    </>
                  )}
                </p>
              </ProfileAccordionCard>
            </div>
          </section>

          {/* SECTION 2: IN THE TRENCHES */}
          <section className="w-full max-w-4xl text-left space-y-5 md:space-y-6 mb-10 md:mb-14">
            <div className="flex items-center gap-2.5 border-b-2 border-secondary pb-2">
              <Wrench className="w-6 h-6 text-[#a855f7] flex-shrink-0" />
              <h2 className="font-anton text-2xl sm:text-3xl md:text-4xl text-secondary uppercase tracking-wide">
                {lang === "fr"
                  ? "Sur le Terrain : Comment Il Résout les Problèmes"
                  : "In the Trenches: How He Solves Problems"}
              </h2>
            </div>

            <p className="text-body-standard leading-relaxed">
              {lang === "fr"
                ? "Au-delà du domaine spécifique de la musique live, ces dix mois d'archives constituent une évaluation en conditions réelles prouvant six compétences professionnelles à haute valeur ajoutée :"
                : "Strip away the specific domain of music technology, and the ten-month archive serves as a live-fire assessment center proving six high-value professional skills:"}
            </p>

            <div className="space-y-3">
              {/* Capability 1 */}
              <ProfileAccordionCard
                title={
                  lang === "fr"
                    ? "1. Résolution par les Premiers Principes, Ténacité & Recherche de Cause Racine"
                    : "1. First-Principles Problem Solving, Grit & Root-Cause Excavation"
                }
                isOpen={openTrenchesIdx === 0}
                onToggle={() => setOpenTrenchesIdx(openTrenchesIdx === 0 ? null : 0)}
              >
                <p className="text-body-standard leading-relaxed">
                  {lang === "fr" ? (
                    <>
                      Lorsqu&apos;un système échoue sous pression, la moyenne des opérateurs cherche le moyen le plus
                      rapide de faire disparaître le message d&apos;erreur. Tom cherche le{" "}
                      <strong className="text-accent">point de divergence</strong>, et lorsqu&apos;une refonte
                      structurelle s&apos;impose, il a la ténacité de soulever le plancher et d&apos;aller jusqu&apos;au
                      bout.
                    </>
                  ) : (
                    <>
                      When a system fails under pressure, average operators look for the fastest way to make the error
                      message go away. Tom looks for the <strong className="text-accent">moment of divergence</strong>
                      —and when a foundational refactor is required, he has the grit to pull up the floorboards and see
                      it through.
                    </>
                  )}
                </p>
                <ul className="space-y-2.5 text-xs sm:text-sm text-accent/85 leading-relaxed">
                  <li className="flex items-start gap-2">
                    <span className="text-[#a855f7] font-bold mt-0.5">▪</span>
                    <span>
                      {lang === "fr" ? (
                        <>
                          <strong className="text-accent">Le Réflexe de Protéger l&apos;Existant :</strong> L&apos;un de
                          ses réflexes de leadership caractéristiques consiste à empêcher une équipe de réécrire tout un
                          système lorsqu&apos;une régression apparaît. Sa question immédiate est toujours :{" "}
                          <em>
                            « Attendez : ça marchait hier. Avant d&apos;inventer une nouvelle architecture par-dessus un
                            bug, qu&apos;est-ce qui a réellement changé ? »
                          </em>
                        </>
                      ) : (
                        <>
                          <strong className="text-accent">The Reflex to Protect Working Systems:</strong> One of his
                          signature leadership instincts is stopping a team from rewriting a system when a regression
                          appears. His immediate question is always:{" "}
                          <em>
                            &ldquo;Wait—this worked yesterday. Before we invent a brand-new architecture on top of a
                            bug, what actually changed?&rdquo;
                          </em>
                        </>
                      )}
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-[#a855f7] font-bold mt-0.5">▪</span>
                    <span>
                      {lang === "fr" ? (
                        <>
                          <strong className="text-accent">
                            Soulever le Plancher jusqu&apos;à l&apos;Épuisement (21–23 mars) :
                          </strong>{" "}
                          Lorsqu&apos;il a réalisé que les nombres à virgule flottante créaient de microscopiques{" "}
                          <em>« quadrillionièmes de centime »</em> susceptibles de corrompre la TVA et les répartitions
                          de salles, il n&apos;a pas empilé des rustines d&apos;arrondi. Il a estimé un chantier de 13
                          story points (<strong>Integer Cent Refactor</strong>) sur son Kanban Todoist, a repris toute
                          la base de données et l&apos;interface, et lorsqu&apos;un unique paramètre <code>null</code>{" "}
                          mal câblé a bloqué la reconstruction pendant 48 heures, il a isolé les variables une par une
                          jusqu&apos;au dimanche soir, trouvant le coupable exact{" "}
                          <em>allongé à plat ventre sur son canapé, épuisé, juste avant de s&apos;endormir</em>.
                        </>
                      ) : (
                        <>
                          <strong className="text-accent">
                            Pulling Up the Floorboards &amp; Laying Prone on the Couch (March 21–23):
                          </strong>{" "}
                          When he realized floating-point decimals were creating microscopic{" "}
                          <em>&ldquo;quadrillionths of a penny&rdquo;</em> that would corrupt future VAT and venue
                          splits, he didn&apos;t keep taping rounding hacks over the leak. He estimated a
                          13-story-point <strong>Integer Cent Refactor</strong> on his Todoist Kanban board, ripped up
                          the floorboards of the entire database and UI, and when a single miswired <code>null</code>{" "}
                          setting haunted the rebuild for 48 hours, he kept isolating variables one by one until Sunday
                          night—finding the exact culprit while{" "}
                          <em>laying prone on the couch exhausted right before passing out</em>.
                        </>
                      )}
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-[#a855f7] font-bold mt-0.5">▪</span>
                    <span>
                      {lang === "fr" ? (
                        <>
                          <strong className="text-accent">Intuition des Cas Limites (Edge Cases) :</strong> Il possède
                          un flair redoutable pour détecter où un système se ment à lui-même. Il ne teste jamais un
                          parcours avec des chiffres ronds et faciles ; il lui injecte volontairement des nombres
                          premiers, des pourboires impairs, de la ponctuation de claviers étrangers et des clics
                          simultanés pour voir où les coutures lâchent.
                        </>
                      ) : (
                        <>
                          <strong className="text-accent">Adversarial Edge-Case Intuition:</strong> He has an uncanny
                          instinct for where a system is lying to itself. He never tests a workflow with easy, round
                          numbers; he intentionally feeds it awkward primes, odd tips, foreign keyboard punctuation, and
                          simultaneous clicks to see where the seams split.
                        </>
                      )}
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-[#a855f7] font-bold mt-0.5">▪</span>
                    <span>
                      {lang === "fr" ? (
                        <>
                          <strong className="text-accent">
                            Correction de Trajectoire Pragmatique (« Arrêter le Tape-Taupe ») :
                          </strong>{" "}
                          Il est prêt à s&apos;investir à fond dans une idée ambitieuse, mais ne s&apos;entête jamais
                          par orgueil face aux coûts irrécupérables. Lorsqu&apos;il réalise qu&apos;un outil ou un
                          processus tourne au « baby-sitting » ou au jeu du « tape-taupe », il arrête tout, réévalue
                          l&apos;objectif et pivote vers une solution plus sobre.
                        </>
                      ) : (
                        <>
                          <strong className="text-accent">
                            Pragmatic Course Correction (&ldquo;Stopping Whack-a-Mole&rdquo;):
                          </strong>{" "}
                          He is willing to invest deeply in an ambitious idea, but he is not stubborn about sunk costs.
                          When he realizes a tool or a process has turned into &ldquo;babysitting&rdquo; or
                          &ldquo;playing whack-a-mole,&rdquo; he calls a halt in the middle of the room, re-evaluates
                          the goal, and pivots to a leaner path.
                        </>
                      )}
                    </span>
                  </li>
                </ul>
              </ProfileAccordionCard>

              {/* Capability 2 */}
              <ProfileAccordionCard
                title={
                  lang === "fr"
                    ? "2. Design Organisationnel & Leadership Systémique"
                    : "2. Organizational Design & Systems Leadership"
                }
                isOpen={openTrenchesIdx === 1}
                onToggle={() => setOpenTrenchesIdx(openTrenchesIdx === 1 ? null : 1)}
              >
                <p className="text-body-standard leading-relaxed">
                  {lang === "fr" ? (
                    <>
                      La compétence la plus marquante démontrée dans ces archives est sans doute que{" "}
                      <strong className="text-accent">
                        Tom ne se contente pas de faire le travail : il conçoit l&apos;usine qui fait le travail.
                      </strong>
                    </>
                  ) : (
                    <>
                      Perhaps the most impressive skill demonstrated in the archive is that{" "}
                      <strong className="text-accent">
                        Tom does not just do the work—he designs the factory that does the work.
                      </strong>
                    </>
                  )}
                </p>
                <ul className="space-y-2.5 text-xs sm:text-sm text-accent/85 leading-relaxed">
                  <li className="flex items-start gap-2">
                    <span className="text-[#a855f7] font-bold mt-0.5">▪</span>
                    <span>
                      {lang === "fr" ? (
                        <>
                          <strong className="text-accent">Diagnostic des Goulets d&apos;Étrangagement :</strong> Dès que
                          la communication se dégrade (perte de contexte, chevauchement des responsabilités ou frictions
                          de validation répétitives), Tom traite le <em>workflow lui-même</em> comme un produit à
                          ré-architecturer.
                        </>
                      ) : (
                        <>
                          <strong className="text-accent">Diagnosing Team Bottlenecks:</strong> Whenever communication
                          breaks down—whether from context drift, overlapping responsibilities, or repetitive approval
                          bottlenecks—Tom treats the <em>workflow itself</em> as a product to be engineered.
                        </>
                      )}
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-[#a855f7] font-bold mt-0.5">▪</span>
                    <span>
                      {lang === "fr" ? (
                        <>
                          <strong className="text-accent">Juridictions Claires &amp; Portes Qualité :</strong> Il
                          organise naturellement le chaos en départements spécialisés (<code>Architecture</code>,{" "}
                          <code>Backend</code>, <code>Frontend</code>, <code>Juridique</code>,{" "}
                          <code>Documentation</code>, <code>QA</code>, <code>Opérations</code>,{" "}
                          <code>Delivery Agile</code>), définit des périmètres de responsabilité stricts et place des
                          contrôles de vérification automatisés et objectifs à la fin de chaque couloir.
                        </>
                      ) : (
                        <>
                          <strong className="text-accent">Clear Jurisdictions &amp; Quality Gates:</strong> He naturally
                          organizes chaos into specialized departments (<code>Architecture</code>, <code>Backend</code>,{" "}
                          <code>Frontend</code>, <code>Legal</code>, <code>Documentation</code>, <code>QA</code>,{" "}
                          <code>Operations</code>, <code>Agile Delivery</code>), defines clear boundaries of ownership
                          so specialists don&apos;t step on each other&apos;s toes, and puts objective, automated
                          verification gates at the end of every lane.
                        </>
                      )}
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-[#a855f7] font-bold mt-0.5">▪</span>
                    <span>
                      {lang === "fr" ? (
                        <>
                          <strong className="text-accent">Mémoire Institutionnelle :</strong> Il sait que les équipes
                          échouent lorsque la connaissance ne vit que dans la tête des individus. Il impose une
                          documentation vivante, des synthèses de passation structurées et des bilans quotidiens pour
                          que tout nouveau collaborateur puisse comprendre non seulement <em>ce qui</em> a été
                          construit, mais <em>pourquoi</em> chaque décision a été prise.
                        </>
                      ) : (
                        <>
                          <strong className="text-accent">Institutional Memory:</strong> He understands that teams fail
                          when knowledge lives only inside people&apos;s heads. He insists on living documentation,
                          structured handoff briefs, and daily synthesis so that any new collaborator can walk into the
                          room and understand not just <em>what</em> was built, but <em>why</em> every decision was
                          made.
                        </>
                      )}
                    </span>
                  </li>
                </ul>
              </ProfileAccordionCard>

              {/* Capability 3 */}
              <ProfileAccordionCard
                title={
                  lang === "fr"
                    ? "3. Empathie Produit, Direction Design UI/UX & Traduction en Langage Clair"
                    : "3. Product Empathy, Visual Design Ownership & \"Plain-English\" Translation"
                }
                isOpen={openTrenchesIdx === 2}
                onToggle={() => setOpenTrenchesIdx(openTrenchesIdx === 2 ? null : 2)}
              >
                <p className="text-body-standard leading-relaxed">
                  {lang === "fr" ? (
                    <>
                      Tom possède la combinaison la plus rare en gestion de produit :{" "}
                      <strong className="text-accent">
                        il peut penser comme un architecte de base de données à 10h00, ressentir les choses comme un
                        client épuisé et non-technique à 10h01, et diriger chaque pixel de l&apos;interface à 10h02.
                      </strong>
                    </>
                  ) : (
                    <>
                      Tom possesses the rarest combination in product management:{" "}
                      <strong className="text-accent">
                        he can think like a database architect at 10:00 AM, feel like an exhausted, non-technical
                        customer at 10:01 AM, and art-direct every pixel of the UI/UX himself at 10:02 AM.
                      </strong>
                    </>
                  )}
                </p>
                <ul className="space-y-2.5 text-xs sm:text-sm text-accent/85 leading-relaxed">
                  <li className="flex items-start gap-2">
                    <span className="text-[#a855f7] font-bold mt-0.5">▪</span>
                    <span>
                      {lang === "fr" ? (
                        <>
                          <strong className="text-accent">
                            Artisanat UI/UX &amp; Transformation de la Dyslexie en Clarté Visuelle :
                          </strong>{" "}
                          Contrairement aux Product Managers techniques qui délèguent des wireframes et acceptent des
                          templates génériques, Tom a conçu lui-même toute l&apos;interface dark-mode sur-mesure de
                          BandMath (hiérarchie typographique, modales d&apos;onboarding illustrées, cohérence des marges
                          à 20px). Plus révélateur encore : parce que Tom est{" "}
                          <strong className="text-accent">dyslexique</strong>, il savait par expérience à quel point un
                          mur de lignes financières quasi identiques se brouille à l&apos;écran ; il a donc inventé les{" "}
                          <strong className="text-accent">25 Groovatars</strong> pour donner à chaque transaction un
                          ancrage visuel immédiat (qui est d&apos;ailleurs devenu le « canari dans la mine » révélant le
                          bug initial des décimales flottantes !).
                        </>
                      ) : (
                        <>
                          <strong className="text-accent">
                            Full-Stack UI/UX Craftsmanship &amp; Turning Dyslexia into Visual Clarity:
                          </strong>{" "}
                          Unlike technical product managers who hand off wireframes and accept generic templates, Tom
                          designed all of BandMath&apos;s custom dark-mode UI/UX himself—obsessing over typographic
                          hierarchy, custom visual onboarding modals, 20-pixel margin consistency, and custom
                          illustrations so the product looks and feels distinct from anything else on the market. Even
                          more revealing: because Tom is <strong className="text-accent">dyslexic</strong>, he knew from
                          personal experience how easily a wall of nearly identical financial text rows blurs
                          together—so he invented the <strong className="text-accent">25 Groovatars</strong> to give
                          every transaction an instant visual anchor (which in turn became the{" "}
                          <em>&ldquo;canary in the coal mine&rdquo;</em> that exposed the app&apos;s early
                          floating-point bug!).
                        </>
                      )}
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-[#a855f7] font-bold mt-0.5">▪</span>
                    <span>
                      {lang === "fr" ? (
                        <>
                          <strong className="text-accent">ADN PME (« La Leçon Grease Monkey ») :</strong> Avoir grandi
                          en voyant son père posséder et gérer un centre d&apos;entretien automobile{" "}
                          <strong className="text-accent">Grease Monkey</strong> a donné à Tom un respect profond pour
                          les entreprises à taille humaine bien tenues, où chaque système doit fonctionner sur le
                          terrain et où chaque relation client compte.
                        </>
                      ) : (
                        <>
                          <strong className="text-accent">
                            Small-Business DNA (&ldquo;The Grease Monkey Lesson&rdquo;):
                          </strong>{" "}
                          Growing up watching his father own and operate a{" "}
                          <strong className="text-accent">Grease Monkey</strong> oil-change shop gave Tom a lifelong
                          appreciation for small, well-run, human-scale businesses where every system has to work in the
                          real world and every customer relationship matters.
                        </>
                      )}
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-[#a855f7] font-bold mt-0.5">▪</span>
                    <span>
                      {lang === "fr" ? (
                        <>
                          <strong className="text-accent">
                            Concevoir pour la Réalité Humaine, Pas pour un Comportement Idéal :
                          </strong>{" "}
                          La plupart des logiciels échouent parce qu&apos;ils supposent que les utilisateurs sont
                          organisés, patients et assis au calme derrière un bureau. Tom conçoit pour le monde réel : là
                          où une seule personne du groupe est organisée et trois procrastinent (
                          <code>Shadow Profiles</code>), où un administrateur peut accidentellement se retirer ses
                          droits alors qu&apos;un abonnement CB tourne encore (<code>2026-06-01</code>), où le Wi-Fi
                          coupe au fond d&apos;une cave de concert, et où un seul libellé ambigu (<code>-20% ROI</code>{" "}
                          ou <code>&quot;Settle Up&quot;</code>) peut créer un malentendu.
                        </>
                      ) : (
                        <>
                          <strong className="text-accent">Designing for Human Reality, Not Ideal Behavior:</strong> Most
                          software fails because it assumes users are organized, patient, and sitting at a quiet desk.
                          Tom designs for the real world—where one person in a group is organized and three are
                          procrastinating (<code>Shadow Profiles</code>), where an admin might accidentally un-admin
                          themselves while a credit card subscription is still active (<code>2026-06-01</code>), where
                          Wi-Fi drops in a basement venue, and where a single ambiguous label (<code>-20% ROI</code> or{" "}
                          <code>&quot;Settle Up&quot;</code>) can cause a misunderstanding.
                        </>
                      )}
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-[#a855f7] font-bold mt-0.5">▪</span>
                    <span>
                      {lang === "fr" ? (
                        <>
                          <strong className="text-accent">
                            La Documentation comme Stress-Test (« L&apos;Histoire des 40 € ») :
                          </strong>{" "}
                          Il utilise la narration en langage courant pour mettre le design à l&apos;épreuve. Qu&apos;il
                          s&apos;agisse d&apos;expliquer la simplification de dettes par graphe via une histoire simple
                          à quatre personnages (
                          <em>
                            si Tom doit 40 € à Pablo, Pablo doit 40 € à John et John doit 40 € à Ricardo, Tom rembourse
                            directement Ricardo une seule fois
                          </em>
                          ) ou de rédiger les guides utilisateurs <em>pendant</em> qu&apos;il architecture le système, il
                          oblige la logique technique complexe à se justifier en termes humains simples.
                        </>
                      ) : (
                        <>
                          <strong className="text-accent">
                            Documentation-First Thinking (&ldquo;The Story of €40&rdquo;):
                          </strong>{" "}
                          He uses plain-English storytelling as a design stress test. Whether explaining pairwise graph
                          debt simplification through a simple four-person story (
                          <em>
                            if Tom owes Pablo €40, Pablo owes John €40, and John owes Ricardo €40, Tom just pays Ricardo
                            once
                          </em>
                          ) or writing the user guides <em>while</em> architecting the system, he forces complex
                          technical logic to justify itself in simple human terms.
                        </>
                      )}
                    </span>
                  </li>
                </ul>
              </ProfileAccordionCard>

              {/* Capability 4 */}
              <ProfileAccordionCard
                title={
                  lang === "fr"
                    ? "4. Sens Commercial, Juridique & Stratégique"
                    : "4. Commercial, Legal & Strategic Acumen"
                }
                isOpen={openTrenchesIdx === 3}
                onToggle={() => setOpenTrenchesIdx(openTrenchesIdx === 3 ? null : 3)}
              >
                <p className="text-body-standard leading-relaxed">
                  {lang === "fr"
                    ? "Tom ne considère jamais la conformité légale, la psychologie tarifaire ou l'économie unitaire comme le problème d'un autre service."
                    : "Tom does not treat legal compliance, pricing psychology, or unit economics as someone else's department."}
                </p>
                <ul className="space-y-2.5 text-xs sm:text-sm text-accent/85 leading-relaxed">
                  <li className="flex items-start gap-2">
                    <span className="text-[#a855f7] font-bold mt-0.5">▪</span>
                    <span>
                      {lang === "fr" ? (
                        <>
                          <strong className="text-accent">Transformer les Contraintes en Stratégie :</strong> Face à des
                          garde-fous externes exigeants (règles de validation Apple App Store, directives européennes sur
                          la transparence des prix B2B/B2C, plafonds fiscaux français ou commissions des processeurs de
                          paiement), il ne les voit pas comme des blocages. Il étudie les textes jusqu&apos;à trouver le
                          chemin structurel propre et éthique où le modèle économique, la loi et l&apos;intérêt du
                          client s&apos;alignent.
                        </>
                      ) : (
                        <>
                          <strong className="text-accent">Turning Constraints into Strategy:</strong> When faced with
                          formidable external guardrails—Apple&apos;s App Store review rules, European consumer and B2B
                          price-transparency statutes, French tax ceilings, or payment-processor fee structures—he
                          doesn&apos;t view them as roadblocks. He studies the rules until he finds the clean, ethical
                          structural path where the business model, the law, and the customer&apos;s best interest all
                          align.
                        </>
                      )}
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-[#a855f7] font-bold mt-0.5">▪</span>
                    <span>
                      {lang === "fr" ? (
                        <>
                          <strong className="text-accent">Aisance Bilingue &amp; Interculturelle :</strong> Vivant et
                          travaillant à Lyon après une carrière aux États-Unis, il navigue avec la même aisance entre la
                          culture d&apos;entreprise française (<em>AMOA</em>, <em>MOE</em>, <em>Recette</em>,{" "}
                          <em>ESN</em>, <em>Micro-Entreprise</em>) et la vélocité produit américaine.
                        </>
                      ) : (
                        <>
                          <strong className="text-accent">Bilingual Cross-Cultural Fluency:</strong> Living and
                          operating in Lyon, France after a career in the United States, he navigates French enterprise
                          culture (<em>AMOA</em>, <em>MOE</em>, <em>Recette</em>, <em>ESN</em>,{" "}
                          <em>Micro-Entreprise</em>) and American product velocity with equal comfort.
                        </>
                      )}
                    </span>
                  </li>
                </ul>
              </ProfileAccordionCard>

              {/* Capability 5 */}
              <ProfileAccordionCard
                title={
                  lang === "fr"
                    ? "5. Intrépidité Technique & Apprentissage Autopropulsé"
                    : "5. Technical Fearlessness & Self-Propelled Learning"
                }
                isOpen={openTrenchesIdx === 4}
                onToggle={() => setOpenTrenchesIdx(openTrenchesIdx === 4 ? null : 4)}
              >
                <p className="text-body-standard leading-relaxed">
                  {lang === "fr" ? (
                    <>
                      Si Tom n&apos;est pas un diplômé d&apos;informatique traditionnel ayant passé dix ans à optimiser
                      des compilateurs, il a prouvé quelque chose de sans doute plus précieux à l&apos;ère moderne :{" "}
                      <strong className="text-accent">
                        il peut être parachuté dans n&apos;importe quelle stack technique inconnue et devenir
                        opérationnellement redoutable en quelques semaines.
                      </strong>
                    </>
                  ) : (
                    <>
                      While Tom is not a traditional computer-science graduate who spent ten years optimizing compilers,
                      he has proved something arguably more valuable in the modern era:{" "}
                      <strong className="text-accent">
                        he can parachute into any unfamiliar technical stack and become operationally dangerous in
                        weeks.
                      </strong>
                    </>
                  )}
                </p>
                <p className="text-xs sm:text-sm text-accent/85 leading-relaxed">
                  {lang === "fr"
                    ? "Il lit les schémas de données, questionne les modèles relationnels, repère les conditions de concurrence (race conditions) entre applications clientes et webhooks serveur, comprend les pipelines de déploiement CI/CD, construit ses propres outils d'automatisation Python lorsqu'une tâche manuelle l'agace, et sait poser la question architecturale exacte qui évite une catastrophe avant qu'un dossier ne soit renommé ou qu'une branche de production ne soit touchée."
                    : "He reads schemas, questions data models, spots race conditions between client apps and server webhooks, understands CI/CD deployment pipelines, builds his own Python automation tools when a manual process annoys him, and knows how to ask the exact architectural question that prevents a disaster before a folder is renamed or a production branch is touched."}
                </p>
              </ProfileAccordionCard>

              {/* Capability 6 */}
              <ProfileAccordionCard
                title={
                  lang === "fr"
                    ? "6. Authenticité Radicale & Hygiène de Communication"
                    : "6. Radical Authenticity & Communication Hygiene"
                }
                isOpen={openTrenchesIdx === 5}
                onToggle={() => setOpenTrenchesIdx(openTrenchesIdx === 5 ? null : 5)}
              >
                <p className="text-body-standard leading-relaxed">
                  {lang === "fr" ? (
                    <>
                      À une époque où la communication d&apos;entreprise est noyée sous le remplissage généré par
                      l&apos;IA, Tom maintient un engagement féroce à{" "}
                      <strong className="text-accent">parler comme un véritable être humain</strong>.
                    </>
                  ) : (
                    <>
                      In an era where corporate communication is increasingly drowned in AI-generated fluff, Tom has a
                      ferocious commitment to <strong className="text-accent">sounding like a real human being</strong>.
                    </>
                  )}
                </p>
                <ul className="space-y-2.5 text-xs sm:text-sm text-accent/85 leading-relaxed">
                  <li className="flex items-start gap-2">
                    <span className="text-[#a855f7] font-bold mt-0.5">▪</span>
                    <span>
                      {lang === "fr" ? (
                        <>
                          Lorsqu&apos;un brouillon automatisé sonne trop formel, prétentieux ou exagéré, il l&apos;épure
                          immédiatement (
                          <em>« Ça ne me ressemble pas du tout, gardons ça sobre et honnête »</em>).
                        </>
                      ) : (
                        <>
                          When an automated draft sounds overly formal, pretentious, or exaggerated, he strips it back
                          immediately (<em>&ldquo;It just doesn&apos;t sound like me—let&apos;s make it bare-bones and honest&rdquo;</em>).
                        </>
                      )}
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-[#a855f7] font-bold mt-0.5">▪</span>
                    <span>
                      {lang === "fr" ? (
                        <>
                          En adaptant son CV pour des ESN et entreprises tech françaises (<code>Agicap</code>,{" "}
                          <code>Sopra Steria</code>, <code>Devoteam</code>, <code>Klanik</code>), il a systématiquement
                          empêché l&apos;IA d&apos;exagérer ses titres ou de prétendre qu&apos;il animait une équipe
                          Scrum humaine sur BandMath (
                          <em>
                            « Comme je suis le seul humain de l&apos;équipe, je trouve trompeur de parler d&apos;animer
                            les cérémonies de mon équipe... On ne peut clairement pas dire que j&apos;ai été coach
                            Agile, et retirons Scrum Master du titre puisque j&apos;ai déjà précisé au recruteur que je
                            n&apos;avais jamais porté officiellement ce titre même si je faisais ce métier en production
                            vidéo »
                          </em>
                          ).
                        </>
                      ) : (
                        <>
                          When tailoring his CV for French tech consultancies (<code>Agicap</code>,{" "}
                          <code>Sopra Steria</code>, <code>Devoteam</code>, <code>Klanik</code>), he repeatedly stopped
                          the AI from exaggerating his titles or claiming he managed a human Scrum team on BandMath (
                          <em>
                            &ldquo;Since I&apos;m the only human on the team I think it&apos;s misleading to talk about
                            &lsquo;facilitating my team&apos;s ceremonies&rsquo;... We definitely can&apos;t say
                            I&apos;ve been an Agile coach, and let&apos;s drop Scrum Master from the title since I
                            already told the recruiter I&apos;ve never technically held that title even if I was doing
                            the same job in video production&rdquo;
                          </em>
                          ).
                        </>
                      )}
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-[#a855f7] font-bold mt-0.5">▪</span>
                    <span>
                      {lang === "fr"
                        ? "Dans ses échanges d'équipe, son ton est calme, collaboratif, curieux et plein d'humour. Même lorsqu'une erreur survient (qu'il s'agisse d'une faute de frappe de sa part ou d'une régression), il n'y a jamais de recherche de coupable : seulement un sourire, un diagnostic clair et un garde-fou permanent pour que cela ne se reproduise plus."
                        : "In team communication, his tone is calm, collaborative, curious, and witty. Even when a mistake happens—whether it is his own typo or a teammate's regression—there is zero blame-gaming; there is only a quick laugh, a clear diagnosis, and a permanent guardrail so it never happens twice."}
                    </span>
                  </li>
                </ul>
              </ProfileAccordionCard>
            </div>
          </section>

          {/* SECTION 3: WORKING TOGETHER DAY TO DAY */}
          <section className="w-full max-w-4xl text-left space-y-5 md:space-y-6 mb-10 md:mb-14">
            <div className="flex items-center gap-2.5 border-b-2 border-secondary pb-2">
              <Handshake className="w-6 h-6 text-[#a855f7] flex-shrink-0" />
              <h2 className="font-anton text-2xl sm:text-3xl md:text-4xl text-secondary uppercase tracking-wide">
                {lang === "fr"
                  ? "Travailler Ensemble au Quotidien"
                  : "Working Together Day to Day"}
              </h2>
            </div>

            <div className="bg-primary border-4 border-secondary p-4 sm:p-6 md:p-8 space-y-3 shadow-[-8px_8px_0_0_#6325a6] md:shadow-[-12px_12px_0_0_#6325a6]">
              <p className="text-body-standard mb-2">
                {lang === "fr"
                  ? "Pour un recruteur, un dirigeant ou une équipe d'ingénierie qui se demande comment Tom s'intègre dans une organisation au quotidien :"
                  : "For a hiring manager, executive peer, or engineering team wondering how Tom fits into an organization day-to-day:"}
              </p>
              <ul className="space-y-3 text-body-standard leading-relaxed">
                <li className="flex items-start gap-2">
                  <span className="text-[#a855f7] font-bold mt-0.5">▪</span>
                  <span>
                    {lang === "fr" ? (
                      <>
                        <strong className="text-accent">Comment il démarre un projet :</strong> Il commence par demander{" "}
                        <em>pourquoi</em> le problème compte pour l&apos;humain au bout de la chaîne, cartographie le
                        paysage concurrentiel et établit une source unique de vérité propre avant que quiconque ne
                        commence à construire.
                      </>
                    ) : (
                      <>
                        <strong className="text-accent">How He Starts a Project:</strong> He starts by asking{" "}
                        <em>why</em> the problem matters to the human at the end of the chain, mapping the competitive
                        landscape, and establishing a clean single source of truth before anyone starts building.
                      </>
                    )}
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-[#a855f7] font-bold mt-0.5">▪</span>
                  <span>
                    {lang === "fr" ? (
                      <>
                        <strong className="text-accent">Comment il anime une salle :</strong> Il apporte l&apos;autorité
                        calme d&apos;un producteur de télévision expérimenté. Il respecte les spécialistes, pose des
                        questions de clarification précises et maintient l&apos;équipe concentrée sur le chemin critique
                        lorsque des distractions apparaissent.
                      </>
                    ) : (
                      <>
                        <strong className="text-accent">How He Runs a Room:</strong> He brings the calm authority of a
                        veteran film producer. He respects specialists, asks sharp clarifying questions, and keeps the
                        team focused on the critical path when shiny distractions appear.
                      </>
                    )}
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-[#a855f7] font-bold mt-0.5">▪</span>
                  <span>
                    {lang === "fr" ? (
                      <>
                        <strong className="text-accent">Comment il gère les désaccords :</strong> Si vous lui dites{" "}
                        <em>« c&apos;est trop compliqué »</em> ou <em>« c&apos;est comme ça qu&apos;on fait »</em>, il
                        vous demandera poliment de lui montrer la mécanique sous-jacente. Si votre raisonnement est
                        solide, il vous soutiendra à 100 % ; s&apos;il s&apos;agit d&apos;une simple habitude, il
                        retroussera ses manches avec vous pour vérifier s&apos;il existe une meilleure voie.
                      </>
                    ) : (
                      <>
                        <strong className="text-accent">How He Handles Disagreement:</strong> If you tell him{" "}
                        <em>&ldquo;that&apos;s too complicated&rdquo;</em> or{" "}
                        <em>&ldquo;that&apos;s just how it&apos;s done,&rdquo;</em> he will politely ask you to show him
                        the underlying mechanics. If your reasoning is sound, he will back you 100%; if it&apos;s an
                        assumption, he will roll up his sleeves and help you prove whether a better way exists.
                      </>
                    )}
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-[#a855f7] font-bold mt-0.5">▪</span>
                  <span>
                    {lang === "fr" ? (
                      <>
                        <strong className="text-accent">Ce qui l&apos;énergise :</strong> Transformer un flux de travail
                        humain brouillon et plein de frictions en quelque chose de si fluide et intuitif qu&apos;on se
                        demande pourquoi cela n&apos;a pas toujours fonctionné ainsi.
                      </>
                    ) : (
                      <>
                        <strong className="text-accent">What Energizes Him:</strong> Turning a messy, high-friction
                        human workflow into something so clean and intuitive that people wonder why it wasn&apos;t
                        always done that way.
                      </>
                    )}
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-[#a855f7] font-bold mt-0.5">▪</span>
                  <span>
                    {lang === "fr" ? (
                      <>
                        <strong className="text-accent">Ce qui le frustre :</strong> Les buzzwords creux, le fait de
                        masquer les symptômes sans comprendre la cause racine, et le travail désorganisé façon
                        « tape-taupe ».
                      </>
                    ) : (
                      <>
                        <strong className="text-accent">What Frustrates Him:</strong> Dishonest buzzwords, fixing
                        symptoms without understanding the root cause, and &ldquo;playing whack-a-mole&rdquo; with
                        unorganized work.
                      </>
                    )}
                  </span>
                </li>
              </ul>
            </div>
          </section>

          {/* SECTION 4: WHERE HE FITS BEST */}
          <section className="w-full max-w-4xl text-left space-y-5 md:space-y-6 mb-10 md:mb-14">
            <div className="flex items-center gap-2.5 border-b-2 border-secondary pb-2">
              <Target className="w-6 h-6 text-[#a855f7] flex-shrink-0" />
              <h2 className="font-anton text-2xl sm:text-3xl md:text-4xl text-secondary uppercase tracking-wide">
                {lang === "fr"
                  ? "Où Il Apporte le Plus de Valeur"
                  : "Where He Fits Best"}
              </h2>
            </div>

            <div className="bg-[#0b0514] border-2 border-secondary p-4 sm:p-6 md:p-8 space-y-4 shadow-[8px_8px_0_0_#6325a6] md:shadow-[12px_12px_0_0_#6325a6]">
              <p className="text-body-standard leading-relaxed">
                {lang === "fr" ? (
                  <>
                    Tom est un <strong className="text-accent">leader démultiplicateur de forces</strong> taillé pour
                    les organisations qui ont besoin de combler le fossé entre{" "}
                    <strong className="text-accent">
                      la vision métier, l&apos;expérience humaine et l&apos;exécution technique
                    </strong>{" "}
                    :
                  </>
                ) : (
                  <>
                    Tom is a <strong className="text-accent">force-multiplier leader</strong> built for organizations
                    that need someone to bridge the gap between{" "}
                    <strong className="text-accent">vision, human experience, and technical execution</strong>:
                  </>
                )}
              </p>

              <ol className="space-y-3 text-body-standard leading-relaxed list-decimal list-inside">
                <li>
                  {lang === "fr" ? (
                    <>
                      <strong className="text-accent">
                        Technical Product Manager / Senior Product Owner (PM / PO / AMOA) :
                      </strong>{" "}
                      Là où sa combinaison d&apos;empathie utilisateur profonde, de maîtrise financière/contractuelle et
                      de compréhension technique sous le capot lui permet de piloter un produit du tableau blanc
                      jusqu&apos;au lancement en production.
                    </>
                  ) : (
                    <>
                      <strong className="text-accent">
                        Technical Product Manager / Senior Product Owner (PM / PO / AMOA):
                      </strong>{" "}
                      Where his combination of deep user empathy, financial/contract literacy, and under-the-hood
                      technical fluency lets him own a product from whiteboard to production launch.
                    </>
                  )}
                </li>
                <li>
                  {lang === "fr" ? (
                    <>
                      <strong className="text-accent">
                        Delivery Lead / Scrum Master / Technical Program Manager (TPM) :
                      </strong>{" "}
                      Là où ses 17 ans de direction de production et sa discipline de studio multi-départements
                      apportent immédiatement structure, vélocité et portes qualité à des équipes d&apos;ingénierie
                      complexes.
                    </>
                  ) : (
                    <>
                      <strong className="text-accent">
                        Delivery Lead / Scrum Master / Technical Program Manager (TPM):
                      </strong>{" "}
                      Where his 17 years of production management and his battle-tested multi-department studio
                      discipline bring immediate structure, velocity, and quality gates to complex engineering teams.
                    </>
                  )}
                </li>
                <li>
                  {lang === "fr" ? (
                    <>
                      <strong className="text-accent">
                        Architecte de Workflows IA / Directeur des Opérations Augmentées par l&apos;IA :
                      </strong>{" "}
                      Là où il peut former et accompagner les équipes produit, ingénierie et créatives pour transformer
                      l&apos;IA d&apos;un simple gadget conversationnel en un studio de production multi-départements
                      discipliné.
                    </>
                  ) : (
                    <>
                      <strong className="text-accent">
                        AI Workflow Architect / Head of AI-Augmented Operations:
                      </strong>{" "}
                      Where he can teach engineering, product, and creative teams how to transform AI from a chat toy
                      into a disciplined, multi-department production studio.
                    </>
                  )}
                </li>
                <li>
                  {lang === "fr" ? (
                    <>
                      <strong className="text-accent">
                        Founder-in-Residence / General Manager / Bâtisseur 0-to-1 :
                      </strong>{" "}
                      Là où une organisation a besoin d&apos;un entrepreneur autonome capable de partir d&apos;une page
                      blanche et de livrer une plateforme prête à générer du revenu avec la capacité de production
                      d&apos;une équipe de dix personnes.
                    </>
                  ) : (
                    <>
                      <strong className="text-accent">
                        Founder-in-Residence / General Manager / 0-to-1 Builder:
                      </strong>{" "}
                      Where an organization needs a self-starting entrepreneur who can take a blank sheet of paper and
                      deliver a live, revenue-ready platform with the output of a ten-person team.
                    </>
                  )}
                </li>
              </ol>
            </div>
          </section>

          {/* Bottom Navigation & Contact Footer */}
          <div className="flex flex-col items-center gap-4 mt-2 w-full max-w-4xl">
            <div className="flex flex-col sm:flex-row justify-between gap-3 w-full">
              <Link
                href="/experience"
                className="font-anton text-sm md:text-base bg-transparent text-accent border-2 border-secondary px-4 py-2.5 md:px-5 md:py-3 uppercase tracking-widest hover:bg-secondary transition-colors flex items-center justify-center gap-2"
              >
                <ChevronLeft className="w-4 h-4 md:w-5 md:h-5" />
                <span>{t.nav_experience}</span>
              </Link>

              <Link
                href="/bandmath"
                className="font-anton text-sm md:text-base bg-secondary text-accent px-4 py-2.5 md:px-5 md:py-3 uppercase tracking-widest hover:bg-accent hover:text-primary transition-colors flex items-center justify-center gap-2"
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
