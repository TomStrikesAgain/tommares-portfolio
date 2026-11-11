"use client";

import React, { useRef } from "react";
import { motion, useScroll, useSpring, useTransform } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { useLanguage } from "./LanguageContext";

// Gentle quadratic ease-in (starts moving right away, then accelerates smoothly off-screen so it never sits still while incoming text arrives)
const easeInQuad = (t: number): number => {
  const c = Math.max(0, Math.min(1, t));
  return c * c;
};

// Smooth cubic ease-out (glides in with momentum and settles softly into place)
const easeOutCubic = (t: number): number => {
  const c = Math.max(0, Math.min(1, t));
  return 1 - Math.pow(1 - c, 3);
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

  // Beat 1 ("HI, I'M TOM.") — Starts dead-center (y: +56px to offset the empty subtitle slot below it),
  // then rises mostly out of the way BEFORE Beat 2 fades in so the comma never overlaps Sentence 1.
  const beat1Y = useTransform(
    smoothProgress,
    [0, 0.01, 0.16, 0.26, 0.85, 1],
    [56, 56, -24, -36, -40, -56],
    { ease: easeOutCubic }
  );
  const beat1Scale = useTransform(
    smoothProgress,
    [0, 0.01, 0.16, 0.26, 0.85, 1],
    [1.08, 1.08, 0.9, 0.86, 0.85, 0.82],
    { ease: easeOutCubic }
  );
  const beat1Opacity = useTransform(
    smoothProgress,
    [0, 0.85, 1],
    [1, 0.96, 0.65]
  );

  // Beat 2 (Sentence 1: "I recorded every prompt...")
  // Waits until 6% (once "HI, I'M TOM." has already risen up) to fade/rise in (6%-24%),
  // holds cleanly for reading (24%-34%), then slides off-screen left & fades out (34%-50%) BEFORE Beat 3 enters.
  const beat2Opacity = useTransform(
    smoothProgress,
    [0.06, 0.2, 0.34, 0.48],
    [0, 1, 1, 0],
    { ease: [easeOutCubic, easeInOutCubic, easeInQuad] }
  );
  const beat2Y = useTransform(smoothProgress, [0.06, 0.24], [38, 0], {
    ease: easeOutCubic,
  });
  const beat2X = useTransform(
    smoothProgress,
    [0, 0.34, 0.52],
    ["0vw", "0vw", "-105vw"],
    { ease: [easeInOutCubic, easeInQuad] }
  );
  const beat2Scale = useTransform(
    smoothProgress,
    [0.06, 0.24, 0.34, 0.5],
    [0.95, 1, 1, 0.96],
    { ease: [easeOutCubic, easeInOutCubic, easeInQuad] }
  );

  // Beat 3 (Option B: "Find out what I've been building...")
  // Starts entering at 47% (once Beat 2 has already cleared the center to the left) and settles at 66%.
  const beat3Opacity = useTransform(
    smoothProgress,
    [0.47, 0.62, 0.9, 1],
    [0, 1, 1, 0.85],
    { ease: [easeOutCubic, easeInOutCubic, easeInQuad] }
  );
  const beat3X = useTransform(
    smoothProgress,
    [0, 0.46, 0.66, 1],
    ["105vw", "105vw", "0vw", "0vw"],
    { ease: [easeInOutCubic, easeOutCubic, easeInOutCubic] }
  );
  const beat3Scale = useTransform(
    smoothProgress,
    [0.46, 0.66, 0.9, 1],
    [0.96, 1, 1, 0.98],
    { ease: [easeOutCubic, easeInOutCubic, easeInQuad] }
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
              TOM MARES
            </h2>
          </motion.div>

          {/* Overlapping Stage Slot for Beat 2 (slides left) & Beat 3 (slides in from right) — mt-6/8/10 guarantees vertical clearance below the comma in "HI, I'M TOM." */}
          <div className="relative mt-6 sm:mt-8 md:mt-10 w-full max-w-4xl px-2 sm:px-6 grid grid-cols-1 grid-rows-1 items-center justify-items-center">
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
                  Product Owner AI Native et{" "}
                  <strong
                    className="font-bold text-[#e9d5ff]"
                    style={{
                      textShadow: "0 0 24px rgba(168,85,247,0.55)",
                    }}
                  >
                    Scrum Master (PSM II).
                  </strong>{" "}
                  17 ans de gestion d&apos;équipes, de budgets et de{" "}
                  <span className="font-semibold text-accent underline decoration-[#a855f7] decoration-2 underline-offset-8">
                    projets complexes.
                  </span>
                </p>
              ) : (
                <p className="text-xl sm:text-3xl md:text-4xl lg:text-[2.5rem] font-light tracking-tight leading-[1.35] text-accent/90">
                  AI Native Product Owner and{" "}
                  <strong
                    className="font-bold text-[#e9d5ff]"
                    style={{
                      textShadow: "0 0 24px rgba(168,85,247,0.55)",
                    }}
                  >
                    Scrum Master (PSM II).
                  </strong>{" "}
                  17 years of managing teams, budgets, and{" "}
                  <span className="font-semibold text-accent underline decoration-[#a855f7] decoration-2 underline-offset-8">
                    complex builds.
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
                  Explorez mon parcours, découvrez{" "}
                  <strong
                    className="font-bold text-[#e9d5ff]"
                    style={{
                      textShadow: "0 0 24px rgba(168,85,247,0.55)",
                    }}
                  >
                    ce que j&apos;ai construit,
                  </strong>{" "}
                  et{" "}
                  <span className="font-semibold text-accent underline decoration-[#a855f7] decoration-2 underline-offset-8">
                    interviewez mon jumeau IA ci-dessous.
                  </span>
                </p>
              ) : (
                <p className="text-xl sm:text-3xl md:text-4xl lg:text-[2.5rem] font-light tracking-tight leading-[1.35] text-accent/90">
                  Explore my experience, see{" "}
                  <strong
                    className="font-bold text-[#e9d5ff]"
                    style={{
                      textShadow: "0 0 24px rgba(168,85,247,0.55)",
                    }}
                  >
                    what I&apos;ve been building,
                  </strong>{" "}
                  and{" "}
                  <span className="font-semibold text-accent underline decoration-[#a855f7] decoration-2 underline-offset-8">
                    interview my AI twin below.
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
