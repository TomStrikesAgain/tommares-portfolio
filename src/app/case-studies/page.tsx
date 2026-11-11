"use client";

import Link from "next/link";
import { ChevronLeft } from "lucide-react";
import { useLanguage } from "@/components/LanguageContext";
import Navbar from "@/components/Navbar";
import { dict } from "@/lib/i18n";

const videos = [
  "https://www.youtube.com/embed/al2-Z6In15g", // 1. Nusura
  "https://www.youtube.com/embed/kvfm2SDB5kY", // 2. Juntos
  "https://www.youtube.com/embed/vWUibV-K26Q", // 3. Todoist (Get Focused Fast)
  "https://www.youtube.com/embed/gfA6n3WsJRM", // 4. Zcash
  "https://www.youtube.com/embed/7ndTpuihViw", // 5. TJX / Prévention des Pertes
  "https://www.youtube.com/embed/H67F8PTbFG0", // 6. Crispy Crunchy Chicken
  "https://player.vimeo.com/video/717062892",  // 7. VCA
  "https://www.youtube.com/embed/WWhk9-676B4", // 8. tomList
  "https://www.youtube.com/embed/Nv2wWNq5MyM", // 9. Building Resilience
  "https://www.youtube.com/embed/_TiAqILfnnY", // 10. The Abbey Collection
  "https://www.youtube.com/embed/PP_sy2iCunU", // 11. Photoroom
  "https://www.youtube.com/embed/VrTrPhwDLF4", // 12. Hamburger
  "https://www.youtube.com/embed/a_UbLqPFSfI", // 13. Nickel
  "https://www.youtube.com/embed/dNkey5ZnJFU", // 14. Family Rides
  "https://www.youtube.com/embed/jWetGNIH4_M", // 15. House In Order
  "https://www.youtube.com/embed/LLJTQz26UHo", // 16. Porsches
  "https://www.youtube.com/embed/jLSga0jrztI"  // 17. Eastwood
];

export default function VideoProduction() {
  const { lang } = useLanguage();
  const t = dict[lang];

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
        {/* Header & Editorial Lead-In */}
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
              {t.vault_title}
            </h1>
            <p className="text-xs sm:text-sm uppercase tracking-[0.2em] text-[#e9d5ff]/75 font-semibold mt-2.5">
              {t.vault_subtitle}
            </p>
          </div>

          <div className="border-l-2 border-[#a855f7]/60 pl-4 sm:pl-6 py-1">
            <p className="text-base sm:text-lg md:text-[19px] font-light tracking-tight leading-[1.6] text-accent/90">
              {t.vault_intro}
            </p>
          </div>
        </section>

        {/* Operational Excellence & Leadership Section (Unboxed Open Spine) */}
        <section className="w-full max-w-4xl text-left space-y-5 md:space-y-6 mb-12 md:mb-16">
          <h2
            className="font-anton text-2xl sm:text-3xl md:text-4xl text-[#e9d5ff] uppercase tracking-wider border-b border-[#a855f7]/40 pb-2.5"
            style={{ textShadow: "0 0 20px rgba(168,85,247,0.5)" }}
          >
            {t.vault_ops_title}
          </h2>
          <div className="border-l-2 border-[#a855f7]/60 pl-4 sm:pl-6 py-1 space-y-4">
            <p className="text-base sm:text-lg font-light text-accent/90 leading-relaxed">
              {t.vault_ops_intro}
            </p>
            <ul className="space-y-3 text-sm sm:text-base font-light text-accent/90 leading-relaxed">
              <li className="flex items-start gap-2.5">
                <span className="text-[#a855f7] font-bold mt-0.5">▪</span>
                <span>
                  <strong
                    className="text-[#e9d5ff] font-semibold"
                    style={{ textShadow: "0 0 18px rgba(168,85,247,0.45)" }}
                  >
                    {t.vault_op1_title}
                  </strong>{" "}
                  {t.vault_op1_desc}
                </span>
              </li>
              <li className="flex items-start gap-2.5">
                <span className="text-[#a855f7] font-bold mt-0.5">▪</span>
                <span>
                  <strong
                    className="text-[#e9d5ff] font-semibold"
                    style={{ textShadow: "0 0 18px rgba(168,85,247,0.45)" }}
                  >
                    {t.vault_op2_title}
                  </strong>{" "}
                  {t.vault_op2_desc}
                </span>
              </li>
              <li className="flex items-start gap-2.5">
                <span className="text-[#a855f7] font-bold mt-0.5">▪</span>
                <span>
                  <strong
                    className="text-[#e9d5ff] font-semibold"
                    style={{ textShadow: "0 0 18px rgba(168,85,247,0.45)" }}
                  >
                    {t.vault_op3_title}
                  </strong>{" "}
                  {t.vault_op3_desc}
                </span>
              </li>
              <li className="flex items-start gap-2.5">
                <span className="text-[#a855f7] font-bold mt-0.5">▪</span>
                <span>
                  <strong
                    className="text-[#e9d5ff] font-semibold"
                    style={{ textShadow: "0 0 18px rgba(168,85,247,0.45)" }}
                  >
                    {t.vault_op4_title}
                  </strong>{" "}
                  {t.vault_op4_desc}
                </span>
              </li>
            </ul>
          </div>
        </section>

        {/* Video Grid (Borderless) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 w-full max-w-4xl mb-10">
          {videos.map((url, i) => (
            <div
              key={i}
              className="aspect-video w-full bg-black overflow-hidden transition-transform hover:scale-[1.01]"
              style={{ boxShadow: "0 12px 30px -12px rgba(168,85,247,0.45)" }}
            >
              <iframe
                src={url}
                className="w-full h-full"
                frameBorder="0"
                allow="autoplay; fullscreen; picture-in-picture"
              ></iframe>
            </div>
          ))}
        </div>

        <div className="w-full max-w-4xl flex justify-start pt-4 border-t border-[#a855f7]/30">
          <Link
            href="/"
            className="font-anton text-sm md:text-base bg-transparent text-accent border border-[#a855f7]/60 px-4 py-2.5 md:px-5 md:py-3 uppercase tracking-widest hover:bg-[#6325a6]/40 transition-colors flex items-center gap-2"
          >
            <ChevronLeft className="w-4 h-4 md:w-5 md:h-5" />
            <span>{t.vault_back}</span>
          </Link>
        </div>
      </div>
    </main>
  );
}
