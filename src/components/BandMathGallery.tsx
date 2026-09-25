"use client";

import React, { useState, useCallback, useEffect } from 'react';
import useEmblaCarousel from 'embla-carousel-react';
import Lightbox from "yet-another-react-lightbox";
import Zoom from "yet-another-react-lightbox/plugins/zoom";
import "yet-another-react-lightbox/styles.css";
import Image from 'next/image';
import { ChevronLeft, ChevronRight, Grid, X } from 'lucide-react';

import { useLanguage } from "@/components/LanguageContext";

const IMAGES = [
  "/images/bandmath/01_Mobile_Standings.webp",
  "/images/bandmath/02_Mobile_Settle_Up.webp",
  "/images/bandmath/03_Mobile_Debt_History.webp",
  "/images/bandmath/04_Mobile_Transaction_Feed.webp",
  "/images/bandmath/05_Mobile_Add_Transaction.webp",
  "/images/bandmath/06_Mobile_Merch_Stand.webp",
  "/images/bandmath/07_Mobile_Inventory_Analyzer.webp",
  "/images/bandmath/08_Mobile_Sales_Recommendations.webp",
  "/images/bandmath/09_Mobile_Sales_Stats.webp",
  "/images/bandmath/11_Mobile_Venue_Split.webp",
  "/images/bandmath/12_Mobile_Band_Settings_Roster.webp",
  "/images/bandmath/13_Mobile_Band_Settings_Export.webp",
  "/images/bandmath/14_Mobile_Support_Hub.webp",
  "/images/bandmath/15_Mobile_Support_Contact.webp",
  "/images/bandmath/16_Web_Portal_Login.webp",
  "/images/bandmath/17_Web_Portal_Select_Band.webp",
  "/images/bandmath/18_Web_Portal_Roster.webp",
  "/images/bandmath/19_Web_Portal_Billing.webp",
  "/images/bandmath/20_Web_Portal_Download_Data.webp",
  "/images/bandmath/21_Web_Admin_KPIs.webp",
  "/images/bandmath/22_Web_Admin_Email_Templates.webp",
  "/images/bandmath/23_Web_Admin_CRM.webp",
  "/images/bandmath/24_Web_Admin_Audit_Logs.webp",
  "/images/bandmath/25_Web_Admin_Design_System.webp",
  "/images/bandmath/26_Web_Admin_Push_Notifications.webp",
  "/images/bandmath/27_Web_Admin_Legal_Docs.webp"
];

// Highlight images for the carousel (mix of mobile and desktop)
const HIGHLIGHT_IMAGES = [
  "/images/bandmath/01_Mobile_Standings.webp",
  "/images/bandmath/17_Web_Portal_Select_Band.webp",
  "/images/bandmath/04_Mobile_Transaction_Feed.webp",
  "/images/bandmath/25_Web_Admin_Design_System.webp",
  "/images/bandmath/08_Mobile_Sales_Recommendations.webp",
  "/images/bandmath/27_Web_Admin_Legal_Docs.webp",
  "/images/bandmath/07_Mobile_Inventory_Analyzer.webp",
  "/images/bandmath/19_Web_Portal_Billing.webp"
];

export default function BandMathGallery() {
  const { lang } = useLanguage();
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true });
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [gridOpen, setGridOpen] = useState(false);
  const [photoIndex, setPhotoIndex] = useState(0);

  const scrollPrev = useCallback(() => {
    if (emblaApi) emblaApi.scrollPrev();
  }, [emblaApi]);

  const scrollNext = useCallback(() => {
    if (emblaApi) emblaApi.scrollNext();
  }, [emblaApi]);

  const openLightbox = (index: number) => {
    const realIndex = IMAGES.indexOf(HIGHLIGHT_IMAGES[index]);
    setPhotoIndex(realIndex >= 0 ? realIndex : 0);
    setLightboxOpen(true);
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && gridOpen && !lightboxOpen) {
        setGridOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [gridOpen, lightboxOpen]);

  return (
    <>
      <div className="w-full mt-10 mb-8 border-4 border-secondary relative bg-primary group">
        {/* Embla Carousel */}
        <div className="overflow-hidden relative" ref={emblaRef}>
          <div className="flex touch-pan-y">
            {HIGHLIGHT_IMAGES.map((src, index) => (
              <div 
                className="relative flex-[0_0_100%] min-w-0 cursor-pointer" 
                key={index}
                onClick={() => openLightbox(index)}
              >
                <div className="aspect-video w-full relative">
                  <Image 
                    src={src} 
                    alt={`BandMath Highlight ${index + 1}`}
                    fill
                    className="object-contain"
                    sizes="(max-width: 768px) 100vw, 800px"
                    priority={true}
                    unoptimized={true}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Navigation Controls */}
        <div className="flex flex-row justify-between items-center px-2 py-1.5 md:px-3 md:py-2 bg-secondary border-t-2 md:border-t-[3px] border-secondary gap-2 md:gap-3">
          <button 
            onClick={() => setGridOpen(true)}
            className="flex items-center gap-1 md:gap-1.5 text-[9px] md:text-[11px] font-bold bg-primary text-accent border border-primary hover:border-accent px-1.5 py-0.5 md:px-2 md:py-1 uppercase tracking-wider transition-colors"
          >
            <Grid className="hidden sm:block w-3.5 h-3.5 md:w-3.5 md:h-3.5" />
            {lang === "fr" ? "VOIR TOUT" : "VIEW ALL"} ({IMAGES.length})
          </button>
          
          <div className="flex gap-1.5 md:gap-2">
            <button 
              onClick={scrollPrev} 
              className="bg-accent text-secondary p-0.5 md:p-1 border border-primary hover:bg-primary hover:text-accent transition-colors"
              aria-label="Previous image"
            >
              <ChevronLeft className="w-3.5 h-3.5 md:w-4 md:h-4" />
            </button>
            <button 
              onClick={scrollNext} 
              className="bg-accent text-secondary p-0.5 md:p-1 border border-primary hover:bg-primary hover:text-accent transition-colors"
              aria-label="Next image"
            >
              <ChevronRight className="w-3.5 h-3.5 md:w-4 md:h-4" />
            </button>
          </div>
        </div>
      </div>

      <Lightbox
        open={lightboxOpen}
        close={() => setLightboxOpen(false)}
        index={photoIndex}
        plugins={[Zoom]}
        slides={IMAGES.map(src => ({ src: src.replace('/bandmath/', '/bandmath_raw/') }))}
        styles={{ container: { backgroundColor: "#6325a6" } }}
      />

      {/* Fullscreen Grid Overlay */}
      {gridOpen && (
        <div className="fixed inset-0 h-[100dvh] w-screen z-[100] bg-primary overflow-y-auto p-4 md:p-8">
          <div className="max-w-6xl mx-auto">
            <div className="flex justify-between items-center mb-6 pt-2">
              <h2 className="font-anton text-accent text-xl md:text-3xl tracking-widest uppercase">{lang === "fr" ? "TOUTES LES IMAGES" : "ALL IMAGES"}</h2>
              <button 
                onClick={() => setGridOpen(false)}
                className="flex items-center gap-2 text-secondary bg-accent px-3 py-1.5 md:px-4 md:py-2 text-sm md:text-base font-bold uppercase tracking-wider hover:bg-secondary hover:text-accent border-2 border-transparent hover:border-accent transition-colors"
              >
                <X size={20} />
                {lang === "fr" ? "FERMER" : "CLOSE"}
              </button>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
              {IMAGES.map((src, idx) => (
                <div 
                  key={idx} 
                  className="aspect-video relative cursor-pointer border-2 border-secondary/50 hover:border-accent transition-colors group overflow-hidden bg-secondary"
                  onClick={() => {
                    setPhotoIndex(idx);
                    setLightboxOpen(true);
                  }}
                >
                  <Image 
                    src={src} 
                    alt={`Gallery image ${idx + 1}`} 
                    fill 
                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                    sizes="(max-width: 768px) 50vw, (max-width: 1200px) 33vw, 20vw"
                    unoptimized={true}
                  />
                  <div className="absolute inset-0 bg-primary/0 group-hover:bg-primary/20 transition-colors" />
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
