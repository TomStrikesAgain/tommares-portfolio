"use client";

import React, { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { useLanguage } from "./LanguageContext";

export default function AppleScrollIntro() {
  const { lang } = useLanguage();
  const trackRef = useRef<HTMLDivElement>(null);

  // Track scroll progress across the 250vh 3-beat intro container
  const { scrollYProgress } = useScroll({
    target: trackRef,
    offset: ["start start", "end end"],
  });

  // Beat 1 ("HI, I'M TOM.") — Starts dead-center & huge, then rises to the top of the stage and holds across Beats 2 & 3
  const beat1Y = useTransform(
    scrollYProgress,
    [0, 0.03, 0.24, 0.85, 1],
    [36, 36, -34, -38, -58]
  );
  const beat1Scale = useTransform(
    scrollYProgress,
    [0, 0.03, 0.24, 0.85, 1],
    [1.08, 1.08, 0.88, 0.86, 0.8]
  );
  const beat1Opacity = useTransform(
    scrollYProgress,
    [0, 0.82, 1],
    [1, 0.96, 0.55]
  );

  // Beat 2 (Sentence 1: "I recorded every prompt...") — Rises in at 3%-22%, holds until 38%, then slides off-screen left (38%-54%)
  const beat2Opacity = useTransform(
    scrollYProgress,
    [0.03, 0.2, 0.38, 0.52],
    [0, 1, 1, 0]
  );
  const beat2Y = useTransform(scrollYProgress, [0.03, 0.22], [52, 0]);
  const beat2X = useTransform(
    scrollYProgress,
    [0, 0.38, 0.54],
    ["0vw", "0vw", "-105vw"]
  );
  const beat2Scale = useTransform(
    scrollYProgress,
    [0.03, 0.22, 0.38, 0.54],
    [0.94, 1, 1, 0.96]
  );
  const beat2Blur = useTransform(
    scrollYProgress,
    [0.03, 0.18, 0.38, 0.52],
    ["blur(10px)", "blur(0px)", "blur(0px)", "blur(8px)"]
  );

  // Beat 3 (Option B: "Find out what I've been building...") — Slides in from off-screen right (42%-58%) and holds in place
  const beat3Opacity = useTransform(
    scrollYProgress,
    [0.42, 0.56, 0.88, 1],
    [0, 1, 1, 0.85]
  );
  const beat3X = useTransform(
    scrollYProgress,
    [0, 0.42, 0.58, 1],
    ["105vw", "105vw", "0vw", "0vw"]
  );
  const beat3Scale = useTransform(
    scrollYProgress,
    [0.42, 0.58, 0.88, 1],
    [0.96, 1, 1, 0.97]
  );
  const beat3Blur = useTransform(
    scrollYProgress,
    [0.42, 0.56, 0.9, 1],
    ["blur(8px)", "blur(0px)", "blur(0px)", "blur(2px)"]
  );

  // Initial scroll hint at the very bottom
  const initialScrollHintOpacity = useTransform(
    scrollYProgress,
    [0, 0.7, 0.82],
    [0.85, 0.75, 0]
  );

  // Ambient neon purple studio glow behind the stage
  const glowScale = useTransform(
    scrollYProgress,
    [0, 0.3, 0.65, 0.9],
    [0.95, 1.25, 1.4, 1.48]
  );
  const glowOpacity = useTransform(
    scrollYProgress,
    [0, 0.3, 0.65, 0.95],
    [0.5, 0.75, 0.8, 0.5]
  );

  return (
    <section
      ref={trackRef}
      aria-label={
        lang === "fr" ? "Introduction interactive" : "Interactive introduction"
      }
      className="relative w-full h-[250vh] select-none"
    >
      {/* Full-bleed Edge-to-Edge Sticky Stage (No Navbar or Box Borders Containing It) */}
      <div className="sticky top-0 h-dvh w-full overflow-hidden flex flex-col items-center justify-center px-4 sm:px-8 md:px-16">
        {/* Ambient Neon Purple Backlight */}
        <motion.div
          style={{ scale: glowScale, opacity: glowOpacity }}
          className="pointer-events-none absolute inset-0 flex items-center justify-center"
        >
          <div
            className="w-[380px] h-[380px] sm:w-[640px] sm:h-[480px] rounded-full blur-[125px]"
            style={{
              background:
                "radial-gradient(circle, rgba(168,85,247,0.42) 0%, rgba(99,37,166,0.24) 45%, rgba(5,4,8,0) 75%)",
            }}
          />
        </motion.div>

        {/* Center Typography Stage */}
        <div className="relative z-10 w-full max-w-5xl flex flex-col items-center text-center">
          {/* BEAT 1: Huge Glowing Neon Purple Hollow Impact Outline "HI, I'M TOM." (Zero Inline / Sharp Corners) */}
          <motion.div
            style={{
              y: beat1Y,
              scale: beat1Scale,
              opacity: beat1Opacity,
            }}
            className="will-change-transform"
          >
            <h2
              className="font-anton text-7xl sm:text-8xl md:text-9xl lg:text-[9.5rem] uppercase tracking-[0.06em] leading-none"
              style={{
                color: "transparent",
                WebkitTextStroke: "2.5px #d8b4fe",
                filter:
                  "drop-shadow(0 0 8px rgba(216,180,254,0.95)) drop-shadow(0 0 22px rgba(168,85,247,0.9)) drop-shadow(0 0 48px rgba(139,61,255,0.75))",
              }}
            >
              {lang === "fr" ? "Salut, moi c'est Tom." : "Hi, I'm Tom."}
            </h2>
          </motion.div>

          {/* Overlapping Stage Slot for Beat 2 (slides left) & Beat 3 (slides in from right) */}
          <div className="relative w-full max-w-4xl px-2 sm:px-6 grid grid-cols-1 grid-rows-1 items-center justify-items-center">
            {/* BEAT 2: Sentence 1 */}
            <motion.div
              style={{
                opacity: beat2Opacity,
                y: beat2Y,
                x: beat2X,
                scale: beat2Scale,
                filter: beat2Blur,
              }}
              className="col-start-1 row-start-1 w-full will-change-transform"
            >
              {lang === "fr" ? (
                <p className="text-xl sm:text-3xl md:text-4xl lg:text-[2.5rem] font-light tracking-tight leading-[1.35] text-accent/90">
                  J&apos;ai enregistré chaque prompt de{" "}
                  <strong
                    className="font-bold text-[#e9d5ff]"
                    style={{
                      textShadow: "0 0 24px rgba(168,85,247,0.55)",
                    }}
                  >
                    10 mois de création d&apos;un SaaS avec l&apos;IA
                  </strong>{" "}
                  pour en faire{" "}
                  <span className="font-semibold text-accent underline decoration-[#a855f7] decoration-2 underline-offset-8">
                    un chatbot que vous pouvez interviewer.
                  </span>
                </p>
              ) : (
                <p className="text-xl sm:text-3xl md:text-4xl lg:text-[2.5rem] font-light tracking-tight leading-[1.35] text-accent/90">
                  I recorded every prompt from{" "}
                  <strong
                    className="font-bold text-[#e9d5ff]"
                    style={{
                      textShadow: "0 0 24px rgba(168,85,247,0.55)",
                    }}
                  >
                    10 months of building a SaaS with AI
                  </strong>
                  —and turned it into{" "}
                  <span className="font-semibold text-accent underline decoration-[#a855f7] decoration-2 underline-offset-8">
                    a chatbot you can interview.
                  </span>
                </p>
              )}
            </motion.div>

            {/* BEAT 3: Sentence 2 (Option B — Slides in from right as Sentence 1 exits left) */}
            <motion.div
              style={{
                opacity: beat3Opacity,
                x: beat3X,
                scale: beat3Scale,
                filter: beat3Blur,
              }}
              className="col-start-1 row-start-1 w-full will-change-transform"
            >
              {lang === "fr" ? (
                <p className="text-xl sm:text-3xl md:text-4xl lg:text-[2.5rem] font-light tracking-tight leading-[1.35] text-accent/90">
                  Découvrez{" "}
                  <strong
                    className="font-bold text-[#e9d5ff]"
                    style={{
                      textShadow: "0 0 24px rgba(168,85,247,0.55)",
                    }}
                  >
                    ce que j&apos;ai construit
                  </strong>
                  , explorez mon parcours, ou{" "}
                  <span className="font-semibold text-accent underline decoration-[#a855f7] decoration-2 underline-offset-8">
                    mettez mon profil à l&apos;épreuve.
                  </span>
                </p>
              ) : (
                <p className="text-xl sm:text-3xl md:text-4xl lg:text-[2.5rem] font-light tracking-tight leading-[1.35] text-accent/90">
                  Find out{" "}
                  <strong
                    className="font-bold text-[#e9d5ff]"
                    style={{
                      textShadow: "0 0 24px rgba(168,85,247,0.55)",
                    }}
                  >
                    what I&apos;ve been building
                  </strong>
                  , explore my track record, or{" "}
                  <span className="font-semibold text-accent underline decoration-[#a855f7] decoration-2 underline-offset-8">
                    put my profile to the test.
                  </span>
                </p>
              )}
            </motion.div>
          </div>
        </div>

        {/* Minimal Scroll Indicator at Very Bottom */}
        <motion.div
          style={{ opacity: initialScrollHintOpacity }}
          className="absolute bottom-7 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1 text-[#d8b4fe]/60 pointer-events-none"
        >
          <span className="text-[10px] uppercase tracking-[0.3em] font-semibold">
            {lang === "fr" ? "Faire défiler" : "Scroll"}
          </span>
          <ChevronDown className="w-4 h-4 animate-bounce text-[#a855f7]" />
        </motion.div>
      </div>
    </section>
  );
}
