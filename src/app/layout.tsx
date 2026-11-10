import type { Metadata } from "next";
import { Inter, Anton, Rye, Sancreek, Bungee_Hairline } from "next/font/google";
import "./globals.css";
import { LanguageProvider } from "@/components/LanguageContext";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const anton = Anton({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-anton",
  display: "swap",
});

const rye = Rye({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-rye",
  display: "swap",
});

const sancreek = Sancreek({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-sancreek",
  display: "swap",
});

const bungeeHairline = Bungee_Hairline({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-bungee-hairline",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Tom Mares - Product & Delivery Manager",
  description: "Portfolio of Tom Mares, Agile Delivery Manager, AI Orchestrator, and Entrepreneur.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${inter.variable} ${anton.variable} ${rye.variable} ${sancreek.variable} ${bungeeHairline.variable} antialiased bg-primary text-accent selection:bg-secondary selection:text-accent relative`}
      >
        <LanguageProvider>
          {children}
        </LanguageProvider>
      </body>
    </html>
  );
}
