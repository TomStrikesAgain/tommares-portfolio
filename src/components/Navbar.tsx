"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Mail, Check, ExternalLink, MessageSquare, Briefcase, UserCheck, Layers, Film } from "lucide-react";
import { useLanguage } from "./LanguageContext";
import { dict } from "@/lib/i18n";

export default function Navbar({ variant = "solid" }: { variant?: "solid" | "transparent" }) {
  const { lang, toggleLang } = useLanguage();
  const pathname = usePathname();
  const t = dict[lang];

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [copiedEmail, setCopiedEmail] = useState(false);

  const handleCopyEmail = () => {
    const emailAddress = ["portfolio", "tommares.com"].join("@");
    navigator.clipboard.writeText(emailAddress);
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2500);
  };

  const navItems = [
    {
      href: "/",
      label: t.nav_home,
      icon: MessageSquare,
      active: pathname === "/",
    },
    {
      href: "/experience",
      label: t.nav_experience,
      icon: Briefcase,
      active: pathname === "/experience" || pathname?.startsWith("/experience/"),
    },
    {
      href: "/profile",
      label: t.nav_profile,
      icon: UserCheck,
      active: pathname === "/profile" || pathname?.startsWith("/profile/"),
    },
    {
      href: "/bandmath",
      label: t.nav_bandmath,
      icon: Layers,
      active: pathname === "/bandmath" || pathname?.startsWith("/bandmath/"),
    },
    {
      href: "/case-studies",
      label: t.nav_archive,
      icon: Film,
      active: pathname === "/case-studies" || pathname?.startsWith("/case-studies/"),
    },
  ];

  const isTransparent = variant === "transparent";

  return (
    <header
      className={
        isTransparent
          ? "sticky top-0 z-50 w-full max-w-5xl font-inter bg-transparent"
          : "sticky top-0 z-50 w-full max-w-5xl font-inter bg-[#050408]/95 backdrop-blur-md border-b border-[#6325a6]/60 shadow-lg"
      }
    >
      <nav className="w-full px-2 py-2 sm:px-3 sm:py-2 flex items-center justify-between">
        {/* Left: Desktop Navigation Links / Mobile Active Page Indicator */}
        <div className="hidden md:flex items-center gap-1.5">
          {navItems.map((item) => {
            const Icon = item.icon;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`px-3 py-1.5 text-xs uppercase font-bold tracking-wider transition-colors flex items-center gap-1.5 ${
                  item.active
                    ? "bg-[#6325a6] text-[#f1ecd7]"
                    : "bg-transparent text-[#f1ecd7]/75 hover:text-[#f1ecd7] hover:bg-[#19092d]"
                }`}
              >
                <Icon className="w-3.5 h-3.5 flex-shrink-0" />
                <span>{item.label}</span>
              </Link>
            );
          })}
        </div>

        {/* Mobile Left: Hamburger Drawer Toggle */}
        <div className="flex md:hidden items-center gap-2">
          <button
            type="button"
            onClick={() => setMobileMenuOpen((prev) => !prev)}
            aria-expanded={mobileMenuOpen}
            aria-label="Toggle navigation menu"
            className="bg-[#120720] hover:bg-[#6325a6] text-[#f1ecd7] border border-[#6325a6] px-2.5 py-1.5 text-xs font-bold uppercase tracking-wider flex items-center gap-1.5 cursor-pointer transition-colors"
          >
            {mobileMenuOpen ? (
              <X className="w-4 h-4 text-[#a855f7]" />
            ) : (
              <Menu className="w-4 h-4 text-[#a855f7]" />
            )}
            <span>{lang === "fr" ? "Menu" : "Menu"}</span>
          </button>

          <span className="text-[11px] font-semibold uppercase tracking-wider text-[#f1ecd7]/70 truncate max-w-[170px] sm:max-w-none">
            {navItems.find((item) => item.active)?.label || t.nav_home}
          </span>
        </div>

        {/* Right: Quick Contact Actions + Language Switcher */}
        <div className="flex items-center gap-1.5 sm:gap-2">
          <button
            type="button"
            onClick={handleCopyEmail}
            title={lang === "fr" ? "Copier l'email de Tom" : "Copy Tom's Email"}
            className="hidden sm:flex bg-[#120720] hover:bg-[#6325a6] text-[#f1ecd7] border border-[#6325a6] px-2.5 py-1.5 text-xs font-medium transition-colors cursor-pointer items-center gap-1.5"
          >
            {copiedEmail ? (
              <>
                <Check className="w-3.5 h-3.5 text-emerald-400" />
                <span>{lang === "fr" ? "Email copié !" : "Copied!"}</span>
              </>
            ) : (
              <>
                <Mail className="w-3.5 h-3.5 text-[#a855f7]" />
                <span>{lang === "fr" ? "Email" : "Email"}</span>
              </>
            )}
          </button>

          <a
            href="https://www.linkedin.com/in/tom-mares-projects"
            target="_blank"
            rel="noopener noreferrer"
            className="hidden sm:flex bg-[#120720] hover:bg-[#6325a6] text-[#f1ecd7] border border-[#6325a6] px-2.5 py-1.5 text-xs font-medium transition-colors items-center gap-1"
          >
            <span>LinkedIn</span>
            <ExternalLink className="w-3 h-3 text-[#a855f7]" />
          </a>

          <button
            type="button"
            onClick={toggleLang}
            className="font-anton text-xs sm:text-sm bg-secondary text-accent px-2.5 py-1 sm:px-3 sm:py-1 uppercase tracking-widest hover:bg-accent hover:text-primary transition-colors cursor-pointer"
          >
            {lang === "en" ? "FR" : "EN"}
          </button>
        </div>
      </nav>

      {/* Mobile Slide-Down Drawer */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.2 }}
            className="md:hidden overflow-hidden"
          >
            <div className="bg-[#0b0514] border-x-2 border-b-2 border-[#6325a6] p-3 space-y-2 shadow-xl">
              <div className="flex flex-col gap-1.5">
                {navItems.map((item) => {
                  const Icon = item.icon;
                  return (
                    <Link
                      key={item.href}
                      href={item.href}
                      onClick={() => setMobileMenuOpen(false)}
                      className={`px-3 py-2.5 text-xs uppercase font-bold tracking-wider transition-colors flex items-center justify-between ${
                        item.active
                          ? "bg-[#6325a6] text-[#f1ecd7]"
                          : "bg-[#120720] text-[#f1ecd7]/85 hover:bg-[#19092d] border border-[#6325a6]/50"
                      }`}
                    >
                      <span className="flex items-center gap-2">
                        <Icon className="w-4 h-4 text-[#a855f7]" />
                        <span>{item.label}</span>
                      </span>
                      <span className="text-[10px] text-[#f1ecd7]/50">→</span>
                    </Link>
                  );
                })}
              </div>

              <div className="pt-2 border-t border-[#6325a6]/40 flex items-center gap-2">
                <button
                  type="button"
                  onClick={handleCopyEmail}
                  className="flex-1 bg-[#120720] hover:bg-[#6325a6] text-[#f1ecd7] border border-[#6325a6] px-3 py-2 text-xs font-medium transition-colors cursor-pointer flex items-center justify-center gap-1.5"
                >
                  {copiedEmail ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-emerald-400" />
                      <span>{lang === "fr" ? "Email copié !" : "Email copied!"}</span>
                    </>
                  ) : (
                    <>
                      <Mail className="w-3.5 h-3.5 text-[#a855f7]" />
                      <span>{lang === "fr" ? "Copier l'email" : "Copy Email"}</span>
                    </>
                  )}
                </button>

                <a
                  href="https://www.linkedin.com/in/tom-mares-projects"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 bg-[#120720] hover:bg-[#6325a6] text-[#f1ecd7] border border-[#6325a6] px-3 py-2 text-xs font-medium transition-colors flex items-center justify-center gap-1.5"
                >
                  <span>LinkedIn</span>
                  <ExternalLink className="w-3.5 h-3.5 text-[#a855f7]" />
                </a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
