"use client";

import { useRef, useState, useEffect } from "react";
import AppleScrollIntro from "@/components/AppleScrollIntro";

// Module-level flag: resets to false on a fresh page load / Cmd+R refresh,
// but stays true across client-side Next.js Navbar navigation (/experience -> /).
let hasCompletedIntroInMemory = false;

export default function Home() {
  const [startAtChat] = useState<boolean>(() => hasCompletedIntroInMemory);
  const lastYRef = useRef<number>(0);
  const isSnappingRef = useRef<boolean>(false);
  const snapRafRef = useRef<number | null>(null);

  useEffect(() => {
    const getMaxScroll = () =>
      Math.max(0, document.documentElement.scrollHeight - window.innerHeight);

    // If returning from another page via Navbar (/experience -> /), start settled at the chat stage
    // while keeping the full 420vh scroll track alive so scrolling UP reverses the choreography!
    if (startAtChat) {
      const maxScroll = getMaxScroll();
      if (maxScroll > 0) {
        window.scrollTo({ top: maxScroll, behavior: "instant" });
        lastYRef.current = maxScroll;
      }
    }

    // Gentle ease-in-out glide: starts slowly when it grabs, builds smooth momentum, and cushions softly into the chat stage
    const easeInOutSine = (x: number): number => -(Math.cos(Math.PI * x) - 1) / 2;

    const startGentleMagneticGlide = (startY: number, targetY: number) => {
      const distance = targetY - startY;
      if (distance <= 4) {
        isSnappingRef.current = false;
        return;
      }
      const durationMs = 1150;
      const startTime = performance.now();

      const step = (now: number) => {
        if (!isSnappingRef.current) return;
        const elapsed = now - startTime;
        const progress = Math.min(1, elapsed / durationMs);
        const eased = easeInOutSine(progress);
        const nextY = startY + distance * eased;
        lastYRef.current = nextY;
        window.scrollTo(0, nextY);

        if (progress < 1) {
          snapRafRef.current = requestAnimationFrame(step);
        } else {
          isSnappingRef.current = false;
          snapRafRef.current = null;
        }
      };

      snapRafRef.current = requestAnimationFrame(step);
    };

    const onWheel = (e: WheelEvent) => {
      // If user intentionally scrolls UP while the glide is happening, cancel the glide and give control right back
      if (isSnappingRef.current && e.deltaY < -4) {
        if (snapRafRef.current !== null) {
          cancelAnimationFrame(snapRafRef.current);
          snapRafRef.current = null;
        }
        isSnappingRef.current = false;
      }
    };

    const onScroll = () => {
      if (isSnappingRef.current) return;
      const y = window.scrollY;
      const prevY = lastYRef.current;
      const scrollingDown = y > prevY;
      lastYRef.current = y;

      const maxScroll = getMaxScroll();
      if (maxScroll <= 0) return;

      // Once user scrolls down past Beat 3 (66% of the unified track, right as Slide 2 starts sliding off left),
      // gently pick up the choreography and glide the Navbar down + TOM MARES up + Chat stage up into place!
      if (scrollingDown && y >= maxScroll * 0.66 && y < maxScroll - 8) {
        isSnappingRef.current = true;
        hasCompletedIntroInMemory = true;
        startGentleMagneticGlide(y, maxScroll);
      }

      if (y >= maxScroll * 0.72) {
        hasCompletedIntroInMemory = true;
      }
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("wheel", onWheel, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("wheel", onWheel);
      if (snapRafRef.current !== null) {
        cancelAnimationFrame(snapRafRef.current);
      }
    };
  }, [startAtChat]);

  return (
    <main className="min-h-dvh bg-sunburst flex flex-col items-center font-inter">
      <AppleScrollIntro startAtChat={startAtChat} />
    </main>
  );
}
