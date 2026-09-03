"use client";

import Link from "next/link";
import { ChevronLeft } from "lucide-react";
import { useLanguage } from "@/components/LanguageContext";
import { dict } from "@/lib/i18n";

const videos = [
  "https://www.youtube.com/embed/Nv2wWNq5MyM",
  "https://www.youtube.com/embed/VrTrPhwDLF4",
  "https://www.youtube.com/embed/_TiAqILfnnY",
  "https://www.youtube.com/embed/a_UbLqPFSfI",
  "https://www.youtube.com/embed/dNkey5ZnJFU",
  "https://www.youtube.com/embed/jWetGNIH4_M",
  "https://player.vimeo.com/video/717062892",
  "https://www.youtube.com/embed/7ndTpuihViw",
  "https://www.youtube.com/embed/H67F8PTbFG0",
  "https://www.youtube.com/embed/LLJTQz26UHo",
  "https://www.youtube.com/embed/PP_sy2iCunU",
  "https://www.youtube.com/embed/WWhk9-676B4",
  "https://www.youtube.com/embed/al2-Z6In15g",
  "https://www.youtube.com/embed/gfA6n3WsJRM",
  "https://www.youtube.com/embed/jLSga0jrztI",
  "https://www.youtube.com/embed/kvfm2SDB5kY",
  "https://www.youtube.com/embed/vWUibV-K26Q"
];

export default function VideoProduction() {
  const { lang } = useLanguage();
  const t = dict[lang];

  return (
    <main className="min-h-screen bg-sunburst flex flex-col items-center p-4 md:p-8 font-inter">
      <div className="w-full max-w-7xl bg-primary border-[12px] border-accent p-4 md:p-8 relative shadow-2xl">
        <div className="border-4 border-accent border-dashed p-6 md:p-12 relative flex flex-col items-center">
          
          <div className="w-full flex justify-start mb-8">
            <Link href="/" className="flex items-center gap-2 text-accent hover:text-secondary transition-colors font-bold uppercase tracking-widest">
              <ChevronLeft /> {t.vault_back}
            </Link>
          </div>

          <h1 className="font-anton text-4xl md:text-6xl tracking-wider text-accent uppercase leading-none drop-shadow-[0_4px_4px_rgba(0,0,0,0.8)] mb-4 text-center">
            {t.vault_title}
          </h1>
          <p className="text-secondary font-bold text-lg md:text-xl uppercase tracking-widest bg-accent px-4 py-2 inline-block shadow-lg mb-12">
            {t.vault_subtitle}
          </p>

          <p className="max-w-2xl text-center text-accent/80 mb-12 text-sm md:text-base">
            {t.vault_intro}
          </p>

          <div className="bg-primary border-4 border-secondary p-6 md:p-10 space-y-4 shadow-[-12px_12px_0_0_#6325a6] mb-16 max-w-4xl w-full">
            <h2 className="font-anton text-2xl md:text-3xl text-secondary mb-4 tracking-wide">{t.vault_ops_title}</h2>
            <p className="text-accent/90 text-xs md:text-base mb-4">
              {t.vault_ops_intro}
            </p>
            <ul className="list-disc list-inside text-accent/90 space-y-3 text-xs md:text-base">
              <li>{t.vault_op1}</li>
              <li>{t.vault_op2}</li>
              <li>{t.vault_op3}</li>
              <li>{t.vault_op4}</li>
            </ul>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 w-full">
            {videos.map((url, i) => (
              <div key={i} className="aspect-video w-full border-4 border-secondary bg-black shadow-[8px_8px_0_0_#f1ecd7] overflow-hidden">
                <iframe 
                  src={url} 
                  className="w-full h-full" 
                  frameBorder="0" 
                  allow="autoplay; fullscreen; picture-in-picture" 
                ></iframe>
              </div>
            ))}
          </div>

        </div>
      </div>
    </main>
  );
}
