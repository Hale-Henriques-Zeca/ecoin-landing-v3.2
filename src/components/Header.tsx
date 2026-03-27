"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";
import LanguageSelector from "@/components/LanguageSelector";
import {
  Home,
  Download,
  ArrowLeftRight,
  Bot,
  TrendingUp,
  Users,
  Scale,
  HeartHandshake,
  Building2,
  UtensilsCrossed,
  Megaphone,
  Sprout,
  CandlestickChart,
  Crown,
  Repeat2,
  X,
  Menu,
  Zap,
  ExternalLink,
} from "lucide-react";

const navLinks = [
  { name: "Home", href: "/", icon: Home },
  { name: "Importar E-Coin", href: "/Import-E-Coin-Token", icon: Download },
  { name: "MozP2P", href: "https://efte.edenkingdom.org/p2p", external: true, icon: Repeat2 },
  { name: "Converter", href: "/ecoin-converter", icon: ArrowLeftRight },
  { name: "Trading AI", href: "/ecoin-ai-trading", icon: Bot },
  { name: "Investir", href: "/ecoin-rewards", icon: TrendingUp },
  { name: "Acionistas", href: "https://eshare.edenkingdom.org", external: true, icon: Users },
  { name: "Lei", href: "https://elaw.edenkingdom.org", external: true, icon: Scale },
  { name: "Doações", href: "https://esocial.edenkingdom.org", external: true, icon: HeartHandshake },
  { name: "Organização", href: "https://edenkingdom.org", external: true, icon: Building2 },
  { name: "Restaurante", href: "https://efc.edenkingdom.org", external: true, icon: UtensilsCrossed },
  { name: "Marketing", href: "https://emarketing.edenkingdom.org", external: true, icon: Megaphone },
  { name: "Agricultura", href: "https://efarm.edenkingdom.org", external: true, icon: Sprout },
  { name: "Exchange", href: "https://efte.edenkingdom.org/", external: true, icon: CandlestickChart },
  { name: "Líder de equipes", href: "/equipes", icon: Crown },
];

export default function Header() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const lang = localStorage.getItem("EKD_LANG") || "en";
  }, []);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const handleLangChange = (lang: string) => {
    localStorage.setItem("EKD_LANG", lang);
  };

  return (
    <>
      {/* ═══════════════════════════════════════════════
          TOP ACCENT BAR — neural gold pulse line
      ═══════════════════════════════════════════════ */}
      <div className="fixed top-0 left-0 w-full h-[2px] z-[60] bg-gradient-to-r from-transparent via-[#D4AF37] to-transparent opacity-80 pointer-events-none" />

      {/* ═══════════════════════════════════════════════
          MAIN HEADER
      ═══════════════════════════════════════════════ */}
      <header
        className={`w-full fixed top-[2px] z-50 transition-all duration-500 ${
          scrolled
            ? "bg-black/95 backdrop-blur-2xl border-b border-[#D4AF37]/25 shadow-[0_4px_40px_rgba(212,175,55,0.08)]"
            : "bg-black/80 backdrop-blur-xl border-b border-white/8"
        }`}
      >
        {/* Radial glow inside header */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_0%,rgba(212,175,55,0.06),transparent_60%)] pointer-events-none" />

        <div className="relative mx-auto max-w-[1400px] xl:max-w-[1600px] h-16 px-6 flex items-center justify-between gap-6">

          {/* ──────────────────────────────────────
              LEFT — LOGO BLOCK
          ────────────────────────────────────── */}
          <div className="flex items-center min-w-fit">
            <Link href="/" className="flex items-center gap-2.5 group">
              {/* Gold ring around logo */}
              <div className="relative">
                <div className="absolute inset-0 rounded-full bg-[#D4AF37]/20 blur-md group-hover:bg-[#D4AF37]/40 transition-all duration-300" />
                <div className="relative w-9 h-9 rounded-full border border-[#D4AF37]/40 flex items-center justify-center overflow-hidden group-hover:border-[#D4AF37]/80 transition-all">
                  <Image
                    src="/AI-E-Coin-Logo.PNG"
                    alt="E-Coin"
                    width={32}
                    height={32}
                    className="h-8 w-auto object-contain"
                    priority
                  />
                </div>
              </div>

              <div className="flex flex-col leading-none">
                <span className="text-[13px] font-black tracking-tight text-[#D4AF37] group-hover:text-white transition-colors">
                  E-COIN
                </span>
                <span className="text-[8px] font-mono text-white/30 uppercase tracking-[0.25em]">
                  Neural · Web3
                </span>
              </div>
            </Link>
          </div>

          {/* ──────────────────────────────────────
              CENTER — DESKTOP NAV
          ────────────────────────────────────── */}
          <nav className="hidden xl:flex flex-1 justify-start items-center gap-1 overflow-x-auto scrollbar-hide">
            {navLinks.map((link) => {
              const Icon = link.icon;
              const inner = (
                <span className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-[9.5px] font-bold uppercase tracking-wider text-[#D4AF37]/70 hover:text-[#D4AF37] hover:bg-[#D4AF37]/8 border border-transparent hover:border-[#D4AF37]/20 transition-all duration-200 group/link whitespace-nowrap">
                  <Icon size={10} className="shrink-0 opacity-70 group-hover/link:opacity-100 transition-opacity" />
                  {link.name}
                  {link.external && (
                    <ExternalLink size={8} className="shrink-0 opacity-40 group-hover/link:opacity-70 transition-opacity" />
                  )}
                </span>
              );

              return link.external ? (
                <a
                  key={link.name}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {inner}
                </a>
              ) : (
                <Link key={link.name} href={link.href}>
                  {inner}
                </Link>
              );
            })}
          </nav>

          {/* ──────────────────────────────────────
              RIGHT — LANGUAGE + MOBILE TOGGLE
          ────────────────────────────────────── */}
          <div className="flex items-center gap-3 min-w-fit">
            {/* Live dot indicator */}
            <div className="hidden xl:flex items-center gap-1.5 px-2.5 py-1 rounded-full border border-emerald-500/20 bg-emerald-500/5">
              <div className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              <span className="text-[8px] font-mono text-emerald-400/70 uppercase tracking-widest">BSC Live</span>
            </div>

            <div className="border-l border-white/10 pl-3">
              <LanguageSelector onLangChange={handleLangChange} />
            </div>

            {/* Mobile burger — styled */}
            <button
              className="xl:hidden relative w-9 h-9 flex items-center justify-center rounded-xl border border-[#D4AF37]/30 bg-[#D4AF37]/5 text-[#D4AF37] hover:border-[#D4AF37]/60 hover:bg-[#D4AF37]/10 transition-all"
              onClick={() => setOpen(!open)}
              aria-label="Toggle menu"
            >
              {open ? <X size={16} /> : <Menu size={16} />}
            </button>
          </div>
        </div>

        {/* ──────────────────────────────────────────────────
            MOBILE DROPDOWN — full redesign
        ────────────────────────────────────────────────── */}
        {open && (
          <div className="xl:hidden absolute top-16 left-0 w-full bg-black/98 backdrop-blur-2xl border-b border-[#D4AF37]/20 overflow-hidden animate-in fade-in slide-in-from-top-4 duration-200">
            {/* top gold line */}
            <div className="w-full h-px bg-gradient-to-r from-transparent via-[#D4AF37]/50 to-transparent" />

            {/* header inside dropdown */}
            <div className="flex items-center justify-between px-6 pt-5 pb-3">
              <div className="flex items-center gap-2">
                <Zap size={12} className="text-[#D4AF37]" />
                <span className="text-[9px] font-mono text-white/30 uppercase tracking-[0.3em]">
                  E-Coin Navigation
                </span>
              </div>
              <div className="flex items-center gap-1.5">
                <div className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                <span className="text-[8px] font-mono text-emerald-400/60">BSC LIVE</span>
              </div>
            </div>

            {/* grid of links */}
            <div className="grid grid-cols-2 gap-2 px-4 pb-6">
              {navLinks.map((link) => {
                const Icon = link.icon;
                const inner = (
                  <span
                    className="flex items-center gap-2.5 w-full p-3 rounded-xl border border-white/5 bg-white/3 hover:bg-[#D4AF37]/8 hover:border-[#D4AF37]/25 transition-all group/mlink"
                    onClick={() => setOpen(false)}
                  >
                    <span className="w-7 h-7 rounded-lg flex items-center justify-center bg-[#D4AF37]/10 border border-[#D4AF37]/20 group-hover/mlink:bg-[#D4AF37]/20 transition-all shrink-0">
                      <Icon size={13} className="text-[#D4AF37]" />
                    </span>
                    <span className="flex flex-col leading-none min-w-0">
                      <span className="text-[11px] font-bold text-white/80 group-hover/mlink:text-white truncate">
                        {link.name}
                      </span>
                      {link.external && (
                        <span className="text-[8px] text-white/25 font-mono">externo</span>
                      )}
                    </span>
                  </span>
                );

                return link.external ? (
                  <a
                    key={link.name}
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block"
                  >
                    {inner}
                  </a>
                ) : (
                  <Link key={link.name} href={link.href} className="block">
                    {inner}
                  </Link>
                );
              })}
            </div>

            {/* bottom separator */}
            <div className="w-full h-px bg-gradient-to-r from-transparent via-[#D4AF37]/20 to-transparent" />
            <div className="flex justify-center items-center gap-2 py-3">
              <span className="text-[8px] font-mono text-white/15 uppercase tracking-widest">
                EdenKingDom Corporation · Web3 Infrastructure
              </span>
            </div>
          </div>
        )}
      </header>
    </>
  );
}