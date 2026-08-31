"use client";
import { useLanguage } from "./LanguageContext";

export function LanguageToggle() {
  const { lang, toggleLang } = useLanguage();
  return (
    <div className="absolute top-4 right-4 md:top-8 md:right-8 z-50">
      <button 
        onClick={toggleLang}
        className="font-anton text-xl bg-secondary text-accent px-4 py-2 uppercase tracking-widest border-2 border-accent hover:bg-accent hover:text-primary transition-colors cursor-pointer shadow-lg"
      >
        {lang === "en" ? "FR" : "EN"}
      </button>
    </div>
  );
}
