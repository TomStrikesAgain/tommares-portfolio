"use client";

import React, { useRef } from "react";
import { motion, useScroll, useSpring, useTransform } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { useLanguage } from "./LanguageContext";

// Smooth quintic ease-in (starts gently, accelerates smoothly off-screen without a harsh cliff)
const easeInQuint = (t: number): number => {
  const c = Math.max(0, Math.min(1, t));
  return c * c * c * c * c;
};

// Smooth quintic ease-out (glides in with momentum and settles softly into place)
const easeOutQuint = (t: number): number => {
  const c = Math.max(0, Math.min(1, t));
  return 1 - Math.pow(1 - c, 5);
};

// Smooth cubic ease-in-out (organic S-curve for vertical rises & scale transitions)
const easeInOutCubic = (t: number): number => {
  const c = Math.max(0, Math.min(1, t));
  return c < 0.5 ? 4 * c * c * c : 1 - Math.pow(-2 * c + 2, 3) / 2;
};

export default function AppleScrollIntro() {
  const { lang } = useLanguage();
  const trackRef = useRef<HTMLDivElement>(null);

  // Track raw scroll progress across a 360vh 3-beat stage
  const { scrollYProgress } = useScroll({
    target: trackRef,
    offset: ["start start", "end end"],
  });

  // Responsive, zero-lag spring (mass: 0.25 prevents heavy rubber-banding while smoothing wheel steps)
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 28,
    mass: 0.25,
    restDelta: 0.0005,
  });

  // Beat 1 ("HI, I'M TOM.") — Starts dead-center & huge, then rises smoothly with an S-curve
  const beat1Y = useTransform(
    smoothProgress,
    [0, 0.02, 0.24, 0.85, 1],
    [36, 36, -34, -38, -56],
    { ease: easeInOutCubic }
  );
  const beat1Scale = useTransform(
    smoothProgress,
    [0, 0.02, 0.24, 0.85, 1],
    [1.08, 1.08, 0.88, 0.86, 0.82],
    { ease: easeInOutCubic }
  );
  const beat1Opacity = useTransform(
    smoothProgress,
    [0, 0.85, 1],
    [1, 0.96, 0.65]
  );

  // Beat 2 (Sentence 1: "I recorded every prompt...")
  // Rises & settles in (2%-22%), holds cleanly for reading (22%-34%), then accelerates left with easeInQuint (34%-60%)
  const beat2Opacity = useTransform(
    smoothProgress,
    [0.02, 0.18, 0.38, 0.56],
    [0, 1, 1, 0],
    { ease: [easeOutQuint, easeInOutCubic, easeInQuint] }
  );
  const beat2Y = useTransform(smoothProgress, [0.02, 0.22], [44, 0], {
    ease: easeOutQuint,
  });
  const beat2X = useTransform(
    smoothProgress,
    [0, 0.34, 0.6],
    ["0%", "0%", "-115%"],
    { ease: [easeInOutCubic, easeInQuint] }
  );
  const beat2Scale = useTransform(
    smoothProgress,
    [0.02, 0.22, 0.34, 0.6],
    [0.95, 1, 1, 0.96],
    { ease: [easeOutQuint, easeInOutCubic, easeInQuint] }
  );

  // Beat 3 (Option B: "Find out what I've been building...")
  // Enters from right with quintic deceleration (easeOutQuint, 40%-66%) and holds cleanly (66%-88%)
  const beat3Opacity = useTransform(
    smoothProgress,
    [0.42, 0.62, 0.9, 1],
    [0, 1, 1, 0.85],
    { ease: [easeOutQuint, easeInOutCubic, easeInQuint] }
  );
  const beat3X = useTransform(
    smoothProgress,
    [0, 0.4, 0.66, 1],
    ["115%", "115%", "0%", "0%"],
    { ease: [easeInOutCubic, easeOutQuint, easeInOutCubic] }
  );
  const beat3Scale = useTransform(
    smoothProgress,
    [0.4, 0.66, 0.9, 1],
    [0.96, 1, 1, 0.98],
    { ease: [easeOutQuint, easeInOutCubic, easeInQuint] }
  );

  // Initial scroll hint at the very bottom
  const initialScrollHintOpacity = useTransform(
    smoothProgress,
    [0, 0.72, 0.84],
    [0.85, 0.75, 0]
  );

  // Ambient neon purple studio glow behind the stage (pure GPU transform + opacity)
  const glowScale = useTransform(
    smoothProgress,
    [0, 0.3, 0.68, 0.92],
    [0.95, 1.2, 1.32, 1.38],
    { ease: easeInOutCubic }
  );
  const glowOpacity = useTransform(
    smoothProgress,
    [0, 0.3, 0.68, 0.95],
    [0.55, 0.78, 0.82, 0.55]
  );

  return (
    <section
      ref={trackRef}
      aria-label={
        lang === "fr" ? "Introduction interactive" : "Interactive introduction"
      }
      className="relative w-full h-[360vh] select-none"
    >
      {/* Full-bleed Edge-to-Edge Sticky Stage (No Navbar or Box Borders Containing It) */}
      <div className="sticky top-0 h-dvh w-full overflow-hidden flex flex-col items-center justify-center px-4 sm:px-8 md:px-16">
        {/* Ambient Neon Purple Backlight (Zero CSS blur() filter — uses soft multi-stop radial gradient for 120fps GPU compositing) */}
        <motion.div
          style={{ scale: glowScale, opacity: glowOpacity }}
          className="pointer-events-none absolute inset-0 flex items-center justify-center transform-gpu"
        >
          <div
            className="w-[520px] h-[520px] sm:w-[860px] sm:h-[680px] rounded-full"
            style={{
              background:
                "radial-gradient(circle, rgba(168,85,247,0.34) 0%, rgba(139,61,255,0.20) 28%, rgba(99,37,166,0.10) 52%, rgba(5,4,8,0) 74%)",
            }}
          />
        </motion.div>

        {/* Center Typography Stage */}
        <div className="relative z-10 w-full max-w-5xl flex flex-col items-center text-center">
          {/* BEAT 1: Huge Glowing Neon Purple Hollow Impact Outline "HI, I'M TOM." (Zero Fill / Sharp Corners) */}
          <motion.div
            style={{
              y: beat1Y,
              scale: beat1Scale,
              opacity: beat1Opacity,
            }}
            className="will-change-transform transform-gpu"
          >
            <h2
              className="font-anton text-7xl sm:text-8xl md:text-9xl lg:text-[9.5rem] uppercase tracking-[0.06em] leading-none"
              style={{
                color: "transparent",
                WebkitTextStroke: "2.5px #d8b4fe",
                filter:
                  "drop-shadow(0 0 8px rgba(216,180,254,0.95)) drop-shadow(0 0 22px rgba(168,85,247,0.85))",
              }}
            >
              {lang === "fr" ? "Salut, moi c'est Tom." : "Hi, I'm Tom."}
            </h2>
          </motion.div>

          {/* Overlapping Stage Slot for Beat 2 (slides left) & Beat 3 (slides in from right) */}
          <div className="relative w-full max-w-4xl px-2 sm:px-6 grid grid-cols-1 grid-rows-1 items-center justify-items-center">
            {/* BEAT 2: Sentence 1 (Pure GPU transform + opacity, zero per-frame blur filter) */}
            <motion.div
              style={{
                opacity: beat2Opacity,
                y: beat2Y,
                x: beat2X,
                scale: beat2Scale,
              }}
              className="col-start-1 row-start-1 w-full will-change-transform transform-gpu"
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

            {/* BEAT 3: Sentence 2 (Option B — Pure GPU transform + opacity, slides in from right) */}
            <motion.div
              style={{
                opacity: beat3Opacity,
                x: beat3X,
                scale: beat3Scale,
              }}
              className="col-start-1 row-start-1 w-full will-change-transform transform-gpu"
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
