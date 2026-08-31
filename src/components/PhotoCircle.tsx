"use client";

import { motion } from "framer-motion";

export function PhotoCircle() {
  return (
    <motion.div 
      initial={{ scale: 0.8, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      className="relative w-64 h-64 md:w-80 md:h-80 rounded-full border-8 border-accent overflow-hidden shadow-2xl mb-8 flex items-center justify-center bg-secondary"
    >
      {/* Star overlay simulation for the circle background */}
      <div className="absolute inset-0 opacity-30 mix-blend-overlay bg-[url('https://www.transparenttextures.com/patterns/stardust.png')]"></div>
      {/* Placeholder for the user's photo */}
      <span className="font-anton text-4xl text-accent/50 rotate-[-15deg]">ROCK &amp; ROLL<br/>BADASS</span>
    </motion.div>
  );
}
