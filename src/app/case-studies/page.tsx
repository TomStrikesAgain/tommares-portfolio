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
    <main className="min-h-screen bg-sunburst flex flex-col items-center p-3 sm:p-4 md:p-6 font-inter overflow-x-hidden">
      <Navbar />

      <div className="w-full max-w-5xl bg-primary/95 p-3 sm:p-5 md:p-8 relative shadow-2xl overflow-hidden">
        <div className="p-0 sm:p-2 md:px-6 md:py-4 relative flex flex-col items-center w-full max-w-full min-w-0">
          <h1 className="font-anton text-3xl sm:text-4xl md:text-5xl tracking-wider text-accent uppercase leading-none drop-shadow-[0_4px_4px_rgba(0,0,0,0.8)] mb-3 text-center">
            {t.vault_title}
          </h1>
          <p className="text-center text-secondary font-bold text-xs sm:text-sm md:text-base uppercase tracking-widest bg-accent px-3 py-1 md:px-4 md:py-1.5 inline-block shadow-lg mb-8">
            {t.vault_subtitle}
          </p>

          <p className="max-w-4xl text-center mb-10 text-body-hero">
            {t.vault_intro}
          </p>

          <div className="bg-primary border-4 border-secondary p-4 md:p-10 space-y-3 md:space-y-4 shadow-[-8px_8px_0_0_#6325a6] md:shadow-[-12px_12px_0_0_#6325a6] mb-10 md:mb-12 max-w-4xl w-full">
            <h2 className="font-anton text-[1.875rem] leading-[2.25rem] md:text-4xl md:leading-tight text-secondary mb-3 md:mb-6 tracking-wide drop-shadow-md">
              {t.vault_ops_title}
            </h2>
            <p className="text-body-standard mb-3 md:mb-4">
              {t.vault_ops_intro}
            </p>
            <ul className="list-disc list-inside text-body-standard space-y-2 md:space-y-3">
              <li><strong className="text-accent font-bold">{t.vault_op1_title}</strong> {t.vault_op1_desc}</li>
              <li><strong className="text-accent font-bold">{t.vault_op2_title}</strong> {t.vault_op2_desc}</li>
              <li><strong className="text-accent font-bold">{t.vault_op3_title}</strong> {t.vault_op3_desc}</li>
              <li><strong className="text-accent font-bold">{t.vault_op4_title}</strong> {t.vault_op4_desc}</li>
            </ul>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 w-full max-w-4xl mb-8">
            {videos.map((url, i) => (
              <div key={i} className="aspect-video w-full border-2 border-secondary bg-black overflow-hidden">
                <iframe
                  src={url}
                  className="w-full h-full"
                  frameBorder="0"
                  allow="autoplay; fullscreen; picture-in-picture"
                ></iframe>
              </div>
            ))}
          </div>

          <div className="w-full max-w-4xl flex justify-start pt-4 border-t border-secondary/40">
            <Link
              href="/"
              className="font-anton text-sm md:text-base bg-transparent text-accent border-2 border-secondary px-4 py-2.5 md:px-5 md:py-3 uppercase tracking-widest hover:bg-secondary transition-colors flex items-center gap-2"
            >
              <ChevronLeft className="w-4 h-4 md:w-5 md:h-5" />
              <span>{t.vault_back}</span>
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}
