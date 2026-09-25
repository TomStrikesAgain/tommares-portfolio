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
    <div className="w-full flex flex-col gap-2 mt-4 md:mt-6">
      {items.map((item, idx) => {
        const isOpen = openIndex === idx;
        return (
          <div key={idx} className="border-2 border-secondary bg-primary/80 overflow-hidden shadow-sm">
            <button
              onClick={() => toggle(idx)}
              className="w-full flex items-center justify-between p-3 md:p-4 hover:bg-secondary/10 transition-colors"
            >
              <div className="flex items-center gap-3 md:gap-4 text-accent font-bold text-xs md:text-base text-left">
                <span className="text-secondary shrink-0">{item.icon}</span>
                <span>{item.title}</span>
              </div>
              <motion.div
                animate={{ rotate: isOpen ? 180 : 0 }}
                transition={{ duration: 0.2 }}
                className="text-secondary shrink-0 ml-2"
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
                  <div className="p-3 md:p-4 pt-0 border-t border-secondary/20 text-accent/90 text-xs md:text-base leading-relaxed bg-black/40">
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
