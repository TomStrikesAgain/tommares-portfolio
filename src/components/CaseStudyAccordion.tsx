"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Layers, 
  Globe, 
  Wallet, 
  ShieldCheck, 
  Palette, 
  Rocket, 
  Bot, 
  LifeBuoy, 
  Settings, 
  Code,
  ChevronDown
} from "lucide-react";
import { useLanguage } from "@/components/LanguageContext";
import { dict } from "@/lib/i18n";

export default function CaseStudyAccordion() {
  const { lang } = useLanguage();
  const t = dict[lang];

  const items = [
    { icon: <Layers className="w-4 h-4 md:w-5 md:h-5" />, title: t.cs_arch_title, desc: t.cs_arch_desc },
    { icon: <Globe className="w-4 h-4 md:w-5 md:h-5" />, title: t.cs_portal_title, desc: t.cs_portal_desc },
    { icon: <Wallet className="w-4 h-4 md:w-5 md:h-5" />, title: t.cs_finance_title, desc: t.cs_finance_desc },
    { icon: <ShieldCheck className="w-4 h-4 md:w-5 md:h-5" />, title: t.cs_security_title, desc: t.cs_security_desc },
    { icon: <Palette className="w-4 h-4 md:w-5 md:h-5" />, title: t.cs_uiux_title, desc: t.cs_uiux_desc },
    { icon: <Rocket className="w-4 h-4 md:w-5 md:h-5" />, title: t.cs_ci_title, desc: t.cs_ci_desc },
    { icon: <Bot className="w-4 h-4 md:w-5 md:h-5" />, title: t.cs_qa_title, desc: t.cs_qa_desc },
    { icon: <LifeBuoy className="w-4 h-4 md:w-5 md:h-5" />, title: t.cs_support_title, desc: t.cs_support_desc },
    { icon: <Settings className="w-4 h-4 md:w-5 md:h-5" />, title: t.cs_admin_title, desc: t.cs_admin_desc },
    { icon: <Code className="w-4 h-4 md:w-5 md:h-5" />, title: t.cs_sdlc_title, desc: t.cs_sdlc_desc },
  ];

  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggle = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="w-full flex flex-col mt-4 md:mt-6 border-t border-[#a855f7]/35">
      {items.map((item, idx) => {
        const isOpen = openIndex === idx;
        return (
          <div key={idx} className="border-b border-[#a855f7]/35 overflow-hidden">
            <button
              onClick={() => toggle(idx)}
              className="w-full flex items-center justify-between py-3.5 px-2 sm:px-3 hover:bg-[#6325a6]/15 transition-colors cursor-pointer"
            >
              <div
                className={`flex items-center gap-3 md:gap-4 font-bold text-xs sm:text-sm md:text-base text-left transition-colors ${
                  isOpen ? "text-[#e9d5ff]" : "text-accent"
                }`}
                style={isOpen ? { textShadow: "0 0 16px rgba(168,85,247,0.5)" } : undefined}
              >
                <span className="text-[#a855f7] shrink-0">{item.icon}</span>
                <span>{item.title}</span>
              </div>
              <motion.div
                animate={{ rotate: isOpen ? 180 : 0 }}
                transition={{ duration: 0.2 }}
                className="text-[#a855f7] shrink-0 ml-2"
              >
                <ChevronDown className="w-4 h-4 md:w-5 md:h-5" />
              </motion.div>
            </button>
            <AnimatePresence initial={false}>
              {isOpen && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.3, ease: "easeInOut" }}
                >
                  <div className="pl-4 sm:pl-6 pr-2 pb-4 pt-1 border-l-2 border-[#a855f7]/60 ml-2 sm:ml-3 mb-2 text-accent/90 text-xs sm:text-sm md:text-base font-light leading-relaxed">
                    {item.desc}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        );
      })}
    </div>
  );
}
