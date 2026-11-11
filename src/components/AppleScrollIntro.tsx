"use client";

import React, { useRef, useState, useEffect } from "react";
import { motion, useScroll, useSpring, useTransform, useMotionValueEvent } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { useLanguage } from "./LanguageContext";
import Navbar from "./Navbar";
import HumanKpis from "./HumanKpis";
import PortfolioInterviewer from "./PortfolioInterviewer";

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

export default function AppleScrollIntro({ startAtChat = false }: { startAtChat?: boolean }) {
  const { lang } = useLanguage();
  const trackRef = useRef<HTMLDivElement>(null);
  const [chatInteractive, setChatInteractive] = useState<boolean>(startAtChat);
  const [isMobile, setIsMobile] = useState<boolean>(false);

  useEffect(() => {
    const checkViewport = () => setIsMobile(window.innerWidth < 640);
    checkViewport();
    window.addEventListener("resize", checkViewport);
    return () => window.removeEventListener("resize", checkViewport);
  }, []);

  // Track raw scroll progress across a 420vh 4-beat unified stage
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

  useMotionValueEvent(smoothProgress, "change", (latest) => {
    const shouldEnable = latest >= 0.82;
    if (shouldEnable !== chatInteractive) {
      setChatInteractive(shouldEnable);
    }
  });

  // Beat 1 ("TOM MARES") — Stays on screen the ENTIRE time!
  // Uses strictly consistent `vh` units across all keyframes so Framer Motion interpolates smoothly with ZERO unit-switch jump cuts!
  // On mobile: starts dead-center (`43vh`), lifts slightly for Slides 1 & 2 (`33vh`), and settles closer above the KPI ribbon (`9.2vh`).
  // On desktop: starts at `34vh`, lifts to `24vh` for Slides 1 & 2, and parks at `6.5vh`.
  const beat1Y = useTransform(
    smoothProgress,
    [0, 0.02, 0.14, 0.62, 0.94, 1],
    isMobile
      ? ["43vh", "43vh", "33vh", "33vh", "9.2vh", "9.2vh"]
      : ["34vh", "34vh", "24vh", "24vh", "6.5vh", "6.5vh"],
    { ease: [easeInOutCubic, easeOutCubic, easeInOutCubic, easeInOutCubic, easeInOutCubic] }
  );
  const beat1Scale = useTransform(
    smoothProgress,
    [0, 0.02, 0.14, 0.62, 0.94, 1],
    isMobile
      ? [1.04, 1.04, 0.92, 0.92, 0.64, 0.64]
      : [1.06, 1.06, 0.92, 0.92, 0.58, 0.58],
    { ease: [easeInOutCubic, easeOutCubic, easeInOutCubic, easeInOutCubic, easeInOutCubic] }
  );
  const beat1Opacity = useTransform(
    smoothProgress,
    [0, 0.62, 1],
    [1, 1, 0.96]
  );

  // Beat 2 (Slide 1: "AI Native Product Owner and Scrum Master (PSM II)...")
  // Fades/rises in (5% -> 18%), holds (18% -> 30%), then slides off left (30% -> 44%) BEFORE Beat 3 enters.
  const beat2Opacity = useTransform(
    smoothProgress,
    [0.05, 0.17, 0.3, 0.42],
    [0, 1, 1, 0],
    { ease: [easeOutCubic, easeInOutCubic, easeInQuad] }
  );
  const beat2Y = useTransform(smoothProgress, [0.05, 0.18], [34, 0], {
    ease: easeOutCubic,
  });
  const beat2X = useTransform(
    smoothProgress,
    [0, 0.3, 0.45],
    ["0vw", "0vw", "-105vw"],
    { ease: [easeInOutCubic, easeInQuad] }
  );
  const beat2Scale = useTransform(
    smoothProgress,
    [0.05, 0.18, 0.3, 0.44],
    [0.95, 1, 1, 0.96],
    { ease: [easeOutCubic, easeInOutCubic, easeInQuad] }
  );

  // Beat 3 (Slide 2: "Explore my experience, see what I've been building...")
  // Enters from right (41% -> 56%), holds (56% -> 64%), then slides off to the LEFT (64% -> 80%) as the Chat rises up!
  const beat3Opacity = useTransform(
    smoothProgress,
    [0.41, 0.54, 0.64, 0.77],
    [0, 1, 1, 0],
    { ease: [easeOutCubic, easeInOutCubic, easeInQuad] }
  );
  const beat3X = useTransform(
    smoothProgress,
    [0, 0.41, 0.56, 0.64, 0.81],
    ["105vw", "105vw", "0vw", "0vw", "-105vw"],
    { ease: [easeInOutCubic, easeOutCubic, easeInOutCubic, easeInQuad] }
  );
  const beat3Scale = useTransform(
    smoothProgress,
    [0.41, 0.56, 0.64, 0.8],
    [0.96, 1, 1, 0.95],
    { ease: [easeOutCubic, easeInOutCubic, easeInQuad] }
  );

  // Beat 4A: Navbar descends from above the viewport (66% -> 92%)
  const navbarY = useTransform(
    smoothProgress,
    [0, 0.66, 0.92, 1],
    ["-84px", "-84px", "0px", "0px"],
    { ease: [easeInOutCubic, easeOutCubic, easeInOutCubic] }
  );
  const navbarOpacity = useTransform(
    smoothProgress,
    [0, 0.66, 0.88, 1],
    [0, 0, 1, 1]
  );

  // Beat 4B: Open Jazz-Club KPIs + Chat stage slides up from below (68% -> 94%)
  const chatStageY = useTransform(
    smoothProgress,
    [0, 0.68, 0.94, 1],
    ["36vh", "36vh", "0vh", "0vh"],
    { ease: [easeInOutCubic, easeOutCubic, easeInOutCubic] }
  );
  const chatStageOpacity = useTransform(
    smoothProgress,
    [0, 0.68, 0.92, 1],
    [0, 0, 1, 1],
    { ease: [easeInOutCubic, easeOutCubic, easeInOutCubic] }
  );

  // Initial scroll hint at the very bottom (fades out once the chat starts rising)
  const initialScrollHintOpacity = useTransform(
    smoothProgress,
    [0, 0.62, 0.74],
    [0.85, 0.75, 0]
  );

  // Ambient neon purple studio glow behind the stage (stays alive in the room the entire time)
  const glowScale = useTransform(
    smoothProgress,
    [0, 0.3, 0.68, 1],
    [0.95, 1.2, 1.32, 1.25],
    { ease: easeInOutCubic }
  );
  const glowOpacity = useTransform(
    smoothProgress,
    [0, 0.3, 0.68, 1],
    [0.55, 0.78, 0.82, 0.68]
  );

  return (
    <section
      ref={trackRef}
      aria-label={
        lang === "fr" ? "Scène interactive Tom Marès" : "Interactive Tom Marès stage"
      }
      className="relative w-full h-[420vh]"
    >
      {/* Unified Single-Room Sticky Stage: Everything happens in one continuous space */}
      <div className="sticky top-0 h-dvh w-full overflow-hidden flex flex-col items-center px-3 sm:px-6 md:px-12">
        {/* Ambient Neon Purple Backlight (Zero CSS blur() filter — uses soft multi-stop radial gradient for 120fps GPU compositing) */}
        <motion.div
          style={{ scale: glowScale, opacity: glowOpacity }}
          className="pointer-events-none absolute inset-0 flex items-center justify-center transform-gpu"
        >
          <div
            className="w-[540px] h-[540px] sm:w-[920px] sm:h-[740px] rounded-full"
            style={{
              background:
                "radial-gradient(circle, rgba(168,85,247,0.34) 0%, rgba(139,61,255,0.20) 28%, rgba(99,37,166,0.10) 52%, rgba(5,4,8,0) 74%)",
            }}
          />
        </motion.div>

        {/* BEAT 4A: Descending Open Navbar (No Black Box — Hovers above the room and glides down into place on the final swipe) */}
        <motion.div
          style={{ y: navbarY, opacity: navbarOpacity }}
          className={`absolute top-1 sm:top-2 left-0 right-0 z-40 flex justify-center will-change-transform transform-gpu ${
            chatInteractive ? "pointer-events-auto" : "pointer-events-none"
          }`}
        >
          <Navbar variant="transparent" />
        </motion.div>

        {/* BEAT 1: Persistent Glowing Neon Purple Hollow Outline "TOM MARES" (Never leaves the screen — scales down to 60% and parks below Navbar) */}
        <motion.div
          style={{
            y: beat1Y,
            scale: beat1Scale,
            opacity: beat1Opacity,
          }}
          className="pointer-events-none absolute top-0 left-0 right-0 z-20 flex justify-center origin-top will-change-transform transform-gpu select-none"
        >
          <h1
            className="font-anton text-7xl sm:text-8xl md:text-9xl lg:text-[9.5rem] uppercase tracking-[0.06em] leading-none text-center"
            style={{
              color: "transparent",
              WebkitTextStroke: "2.5px #d8b4fe",
              filter:
                "drop-shadow(0 0 8px rgba(216,180,254,0.95)) drop-shadow(0 0 22px rgba(168,85,247,0.85))",
            }}
          >
            TOM MARES
          </h1>
        </motion.div>

        {/* BEATS 2 & 3: Center Scrollytelling Slides (Both slide off to the left when finished) */}
        <div className="pointer-events-none absolute inset-x-0 top-[47vh] sm:top-[48vh] z-20 flex justify-center px-4 sm:px-8 select-none">
          <div className="relative w-full max-w-4xl grid grid-cols-1 grid-rows-1 items-center justify-items-center text-center">
            {/* BEAT 2: Sentence 1 (Pure GPU transform + opacity, slides off left) */}
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

            {/* BEAT 3: Sentence 2 (Slides in from right, then slides off to the left as the chat rises up) */}
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

        {/* BEAT 4B: Rising Jazz-Club KPI Ribbon + Open Bar Chat (Pinned together, slides up beneath the scaled TOM MARES outline) */}
        <motion.div
          style={{
            y: chatStageY,
            opacity: chatStageOpacity,
          }}
          className={`relative z-30 w-full max-w-4xl flex-1 min-h-0 pt-[16.2vh] sm:pt-[19.5vh] md:pt-[21vh] pb-3 sm:pb-5 flex flex-col items-center will-change-transform transform-gpu ${
            chatInteractive ? "pointer-events-auto" : "pointer-events-none"
          }`}
        >
          <div className="w-full flex justify-center mb-2 sm:mb-3 flex-shrink-0">
            <HumanKpis variant="minimal" />
          </div>

          <PortfolioInterviewer />
        </motion.div>

        {/* Minimal Scroll Indicator at Very Bottom */}
        <motion.div
          style={{ opacity: initialScrollHintOpacity }}
          className="absolute bottom-7 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1 text-[#d8b4fe]/60 pointer-events-none select-none"
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
