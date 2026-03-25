"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";
import LanguageSelector from "@/components/LanguageSelector";

export default function Header() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const lang = localStorage.getItem("EKD_LANG") || "en";
  }, []);

  const handleLangChange = (lang: string) => {
    localStorage.setItem("EKD_LANG", lang);
  };

  const navLinks = [
    { name: "Home", href: "/" },
    { name: "MozP2P", href: "https://efte.edenkingdom.org/p2p", external: true },
    { name: "Converter E-Coin", href: "/ecoin-converter" },
    { name: "E-Coin Trading AI", href: "/ecoin-ai-trading" },
    { name: "Investir E-Coin", href: "/ecoin-rewards" },
    { name: "Acionistas", href: "https://eshare.edenkingdom.org", external: true },
    { name: "Lei", href: "https://elaw.edenkingdom.org", external: true },
    { name: "Doações", href: "https://esocial.edenkingdom.org", external: true },
    { name: "Organização", href: "https://edenkingdom.org", external: true },
    { name: "Restaurante", href: "https://efc.edenkingdom.org", external: true },
    { name: "Marketing", href: "https://emarketing.edenkingdom.org", external: true },
    { name: "Agricultura", href: "https://efarm.edenkingdom.org", external: true },
    { name: "Exchange", href: "https://efte.edenkingdom.org/", external: true },
    { name: "Líder de equipes", href: "/equipes" },
  ];

  return (
    <header className="w-full fixed top-0 z-50 bg-black/80 backdrop-blur-xl border-b border-white/10">
      <div className="mx-auto max-w-[1400px] xl:max-w-[1600px] h-16 px-6 flex items-center justify-center gap-10">
        
        {/* LEFT — LOGO */}
        <div className="flex items-center min-w-fit">
          <Link href="/" className="flex items-center gap-2">
            <Image 
  src="/ecoin-logo.png" 
  alt="E-Coin" 
  width={32} 
  height={32} 
  className="h-8 w-auto"
  priority 
/>
            <span className="text-sm font-semibold text-[#F9D13E]">E-Coin</span>
          </Link>
        </div>

        {/* CENTER — NAV (DESKTOP) */}
        <nav className="hidden xl:flex flex-1 justify-center items-center gap-6 text-[10px] font-bold text-[#F9D13E]">
          {navLinks.map((link) => (
            link.external ? (
              <a 
                key={link.name} 
                href={link.href} 
                target="_blank" 
                rel="noopener noreferrer" 
                className="hover:text-white transition-colors"
              >
                {link.name}
              </a>
            ) : (
              <Link key={link.name} href={link.href} className="hover:text-white transition-colors">
                {link.name}
              </Link>
            )
          ))}
        </nav>

        {/* RIGHT — LANGUAGE & MOBILE BUTTON */}
        <div className="flex items-center gap-4">
          <LanguageSelector onLangChange={handleLangChange} />
          <button 
            className="xl:hidden text-[#F9D13E] text-2xl"
            onClick={() => setOpen(!open)}
          >
            {open ? "✕" : "☰"}
          </button>
        </div>
      </div>

      {/* MOBILE DROPDOWN */}
      {open && (
        <div className="xl:hidden absolute top-16 left-0 w-full bg-black/95 backdrop-blur-2xl border-b border-[#F9D13E]/20 flex flex-col items-center py-6 gap-4 animate-in fade-in slide-in-from-top-4">
          {navLinks.map((link) => (
            link.external ? (
              <a 
                key={link.name} 
                href={link.href} 
                target="_blank" 
                rel="noopener noreferrer" 
                className="text-[#F9D13E] text-sm font-bold"
                onClick={() => setOpen(false)}
              >
                {link.name}
              </a>
            ) : (
              <Link 
                key={link.name} 
                href={link.href} 
                className="text-[#F9D13E] text-sm font-bold"
                onClick={() => setOpen(false)}
              >
                {link.name}
              </Link>
            )
          ))}
        </div>
      )}
    </header>
  );
}
