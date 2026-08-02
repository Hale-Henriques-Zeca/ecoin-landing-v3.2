"use client";

import React, { useState, useRef, useEffect, useMemo } from "react";
import { 
  Globe, 
  Search, 
  Star, 
  Clock, 
  Check, 
  Zap, 
  Cpu, 
  X, 
  ChevronDown,
  Layers
} from "lucide-react";
import { useLanguage } from "../../i18n/hooks";
import {
    LANGUAGES_ULTRA,
    type LanguageDefinition,
} from "../../i18n/constants/languages";

/* ==========================================================
 * TYPES
 * ========================================================== */
export type LanguageOption = LanguageDefinition;

export interface LanguageSelectorProps {
  className?: string;
  onLangChange?: (code: string) => void;
  showStats?: boolean;
  showProviders?: boolean;
}

/* ==========================================================
 * COMPONENT
 * ========================================================== */
export default function LanguageSelector({
  className = "",
  onLangChange,
  showStats = true,
  showProviders = true,
}: LanguageSelectorProps) {
  // --------------------------------------------------------
  // 1. HOOKS & FRAMEWORK INTEGRATION
  // --------------------------------------------------------
  const { 
    currentLanguage, 
    availableLanguages, 
    changeLanguage, 
    isLoading,
    activeProvider = "OpenAI", 
    cacheHitRate = "98%"
  } = useLanguage();


  // --------------------------------------------------------
  // 2. LOCAL STATES
  // --------------------------------------------------------
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [favorites, setFavorites] = useState<string[]>(["pt", "en"]);
  const [recents, setRecents] = useState<string[]>(["pt", "en", "fr"]);
  const [selectedRegion, setSelectedRegion] = useState<string | null>(null);

  const containerRef = useRef<HTMLDivElement>(null);
  const searchInputRef = useRef<HTMLInputElement>(null);

  // Fallback seguro caso availableLanguages venha do hook como undefined
  const languagesList: LanguageOption[] =
    availableLanguages?.length > 0
        ? availableLanguages
        : LANGUAGES_ULTRA;

  // --------------------------------------------------------
  // 3. EFFECTS (Outside Click, ESC, Focus)
  // --------------------------------------------------------
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setOpen(false);
      }
    }
    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") setOpen(false);
    }

    window.addEventListener("mousedown", handleClickOutside);
    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("mousedown", handleClickOutside);
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  useEffect(() => {
    if (open) {
      setTimeout(() => searchInputRef.current?.focus(), 100);
    }
  }, [open]);

  // --------------------------------------------------------
  // 4. MEMOIZED DATA & FILTERS
  // --------------------------------------------------------
  const filteredLanguages = useMemo(() => {
    return languagesList.filter((lang) => {
      const matchesSearch =
  (lang.nativeName ?? "")
    .toLowerCase()
    .includes(query.toLowerCase()) ||

  (lang.code ?? "")
    .toLowerCase()
    .includes(query.toLowerCase()) ||

  (lang.nativeName ?? "")
    .toLowerCase()
    .includes(query.toLowerCase());
      
      const matchesRegion = selectedRegion ? lang.region === selectedRegion : true;
      
      return matchesSearch && matchesRegion;
    });
  }, [languagesList, query, selectedRegion]);

  const favoriteLanguages = useMemo(() => {
    return languagesList.filter((l) => favorites.includes(l.code));
  }, [languagesList, favorites]);

  const recentLanguages = useMemo(() => {
    return languagesList.filter((l) => recents.includes(l.code) && !favorites.includes(l.code));
  }, [languagesList, recents, favorites]);

  const groupedByRegion = useMemo(() => {
    const groups: Record<string, LanguageOption[]> = {};
    filteredLanguages.forEach((lang) => {
      const region = lang.region || "Outros";
      if (!groups[region]) groups[region] = [];
      groups[region].push(lang);
    });
    return groups;
  }, [filteredLanguages]);

  // --------------------------------------------------------
  // 5. ACTIONS
  // --------------------------------------------------------
  const handleSelectLanguage = async (code: string) => {
    try {
      // Sincroniza via Hook da Framework
      await changeLanguage(code);
      
      // Callback externo
      if (onLangChange) onLangChange(code);

      // Atualiza lista de recentes
      setRecents((prev) => Array.from(new Set([code, ...prev])).slice(0, 4));
      
      setOpen(false);
    } catch (err) {
      console.error("Erro ao alterar idioma:", err);
    }
  };

  const toggleFavorite = (e: React.MouseEvent, code: string) => {
    e.stopPropagation();
    setFavorites((prev) => 
      prev.includes(code) ? prev.filter((c) => c !== code) : [...prev, code]
    );
  };

  // --------------------------------------------------------
  // RENDER
  // --------------------------------------------------------
  const currentLangObj = currentLanguage;

  return (
    <div ref={containerRef} className={`relative inline-block ${className}`}>
      {/* 🌍 BOTÃO PRINCIPAL (Preserva a UI Luxury EdenKingDom) */}
      <button
        onClick={() => setOpen(!open)}
        className="flex items-center gap-2.5 bg-black/80 border border-[#D4AF37] rounded-full px-5 py-2.5 text-[#D4AF37] hover:bg-[#D4AF37] hover:text-black transition-all shadow-lg backdrop-blur-xl group"
      >
        <img
    src={`https://flagcdn.com/w40/${currentLanguage.flag}.png`}
    alt={currentLanguage.nativeName}
    className="w-5 h-4 rounded-sm object-cover"
/>

        <ChevronDown size={14} className={`transition-transform duration-300 ${open ? "rotate-180" : ""}`} />
      </button>

      {/* 🔽 DROPDOWN MENU ENTERPRISE */}
      {open && (
  <div
    className="
absolute
top-full
mt-3

right-0

md:right-0

max-md:fixed
max-md:left-1/2
max-md:-translate-x-1/2
max-md:top-[72px]

w-[94vw]
max-w-[420px]
md:w-96

bg-blue/90
backdrop-blur-xl

rounded-2xl
shadow-2xl

border
border-[#D4AF37]/40
border-t-2
border-t-[#D4AF37]

p-4

z-[9999]

text-slate-800
animate-fadeIn
"
  >
          
          {/* 1. CABEÇALHO COM STATS */}
          <div className="flex items-center justify-between pb-3 border-b border-[#D4AF37]/20 mb-3">
            <div className="flex items-center gap-2">
              <Globe size={16} className="text-[#D4AF37]" />
              <span className="text-xs font-bold uppercase tracking-wider text-[#D4AF37]">
                Seletor de Idiomas
              </span>
            </div>
            {showStats && (
              <div className="flex items-center gap-2 text-[10px] text-gray-400">
                <span className="bg-[#D4AF37]/10 text-[#D4AF37] px-2 py-0.5 rounded-full border border-[#D4AF37]/30">
                  {languagesList.length} Idiomas
                </span>
                <span className="flex items-center gap-1 text-green-400">
                  <Zap size={10} /> Cache: {cacheHitRate}
                </span>
              </div>
            )}
          </div>

          {/* 2. BARRA DE PESQUISA */}
          <div className="flex items-center gap-2 bg-black/60 px-3 py-2 rounded-xl border border-[#D4AF37]/40 mb-3 focus-within:border-[#D4AF37] transition-colors">
            <Search size={16} className="text-[#D4AF37]" />
            <input
              ref={searchInputRef}
              type="text"
              placeholder="Pesquisar idioma ou código..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="bg-transparent text-sm text-white placeholder-gray-500 outline-none flex-1"
            />
            {query && (
              <button onClick={() => setQuery("")} className="text-gray-400 hover:text-white">
                <X size={14} />
              </button>
            )}
          </div>

          {/* 3. FILTRO POR REGIÃO */}
          <div className="flex items-center gap-1 overflow-x-auto pb-2 mb-2 no-scrollbar text-[11px]">
            <button
              onClick={() => setSelectedRegion(null)}
              className={`px-2.5 py-1 rounded-lg border whitespace-nowrap transition ${
                selectedRegion === null
                  ? "bg-[#D4AF37] text-black font-semibold border-[#D4AF37]"
                  : "bg-black/40 text-gray-400 border-gray-800 hover:border-[#D4AF37]/50"
              }`}
            >
              Todos
            </button>
            {["Africa", "Americas", "Europa", "Asia"].map((reg) => (
              <button
                key={reg}
                onClick={() => setSelectedRegion(selectedRegion === reg ? null : reg)}
                className={`px-2.5 py-1 rounded-lg border whitespace-nowrap transition ${
                  selectedRegion === reg
                    ? "bg-[#D4AF37] text-black font-semibold border-[#D4AF37]"
                    : "bg-black/40 text-gray-400 border-gray-800 hover:border-[#D4AF37]/50"
                }`}
              >
                {reg}
              </button>
            ))}
          </div>

          {/* LISTA CONTAINER COM SCROLL */}
          <div className="max-h-72 overflow-y-auto pr-1 space-y-4 custom-scrollbar">
            
            {/* 4. SEÇÃO FAVORITOS (Se não houver query ativa) */}
            {!query && favoriteLanguages.length > 0 && (
              <div>
                <div className="flex items-center gap-1.5 text-[11px] text-[#D4AF37] font-semibold mb-1.5 uppercase">
                  <Star size={12} className="fill-[#D4AF37]" />
                  <span>Favoritos</span>
                </div>
                <div className="grid grid-cols-2 gap-1.5">
                  {favoriteLanguages.map((lang) => (
                    <LanguageItem
                      key={`fav-${lang.code}`}
                      lang={lang}
                      isActive={currentLanguage.code === lang.code}
                      isFavorite={true}
                      onSelect={() => handleSelectLanguage(lang.code)}
                      onToggleFav={(e) => toggleFavorite(e, lang.code)}
                    />
                  ))}
                </div>
              </div>
            )}

            {/* 5. SEÇÃO RECENTES */}
            {!query && recentLanguages.length > 0 && (
              <div>
                <div className="flex items-center gap-1.5 text-[11px] text-gray-400 font-semibold mb-1.5 uppercase">
                  <Clock size={12} />
                  <span>Recentes</span>
                </div>
                <div className="space-y-1">
                  {recentLanguages.map((lang) => (
                    <LanguageItem
                      key={`rec-${lang.code}`}
                      lang={lang}
                      isActive={currentLanguage.code === lang.code}
                      isFavorite={favorites.includes(lang.code)}
                      onSelect={() => handleSelectLanguage(lang.code)}
                      onToggleFav={(e) => toggleFavorite(e, lang.code)}
                    />
                  ))}
                </div>
              </div>
            )}

            {/* 6. GRUPOS POR REGIÃO / LISTA COMPLETA */}
            {Object.keys(groupedByRegion).length === 0 ? (
              <div className="text-center py-6 text-gray-500 text-xs">
                Nenhum idioma encontrado.
              </div>
            ) : (
              Object.entries(groupedByRegion).map(([region, langs]) => (
                <div key={region}>
                  <div className="text-[10px] font-bold text-gray-500 tracking-wider uppercase mb-1.5 pl-1 border-b border-gray-800/60 pb-0.5">
                    {region}
                  </div>
                  <div className="space-y-1">
                    {langs.map((lang) => (
                      <LanguageItem
                        key={lang.code}
                        lang={lang}
                        isActive={currentLanguage.code === lang.code}
                        isFavorite={favorites.includes(lang.code)}
                        onSelect={() => handleSelectLanguage(lang.code)}
                        onToggleFav={(e) => toggleFavorite(e, lang.code)}
                      />
                    ))}
                  </div>
                </div>
              ))
            )}
          </div>

          {/* 7. RODAPÉ INFORMATIVO E PROVIDER */}
          <div className="mt-3 pt-2.5 border-t border-[#D4AF37]/20 flex items-center justify-between text-[11px] text-gray-400">
            <div className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
              <span>Motor AI: <strong className="text-white">{activeProvider}</strong></span>
            </div>
            <div className="flex items-center gap-2 text-[10px] text-gray-500">
              {isLoading && <span className="text-[#D4AF37] animate-pulse">Traduzindo...</span>}
              <span>Locale: {currentLanguage.code.toUpperCase()}</span>
            </div>
          </div>

        </div>
      )}
    </div>
  );
}

/* ==========================================================
 * SUBCOMPONENT: LANGUAGE ITEM
 * ========================================================== */
interface LanguageItemProps {
  lang: LanguageOption;
  isActive: boolean;
  isFavorite: boolean;
  onSelect: () => void;
  onToggleFav: (e: React.MouseEvent) => void;
}

function LanguageItem({
  lang,
  isActive,
  isFavorite,
  onSelect,
  onToggleFav,
}: LanguageItemProps) {
  return (
    <div
      onClick={onSelect}
      className={`group relative flex items-center justify-between p-2 rounded-xl cursor-pointer transition-all ${
        isActive
          ? "bg-[#D4AF37]/20 border border-[#D4AF37]/60 text-white"
          : "hover:bg-[#D4AF37]/10 border border-transparent text-gray-300 hover:text-white"
      }`}
    >
      <div className="flex items-center gap-2.5 min-w-0">
        {/* Bandeira FlagCDN ou Emoji */}
        {lang.flag.length <= 2 ? (
          <img
            src={`https://flagcdn.com/w40/${lang.flag.toLowerCase()}.png`}
            alt={lang.nativeName}
            className="w-5 h-3.5 object-cover rounded-sm border border-black/40 shadow-sm"
            onError={(e) => {
              // Fallback para não quebrar UI
              (e.target as HTMLElement).style.display = 'none';
            }}
          />
        ) : (
          <span className="text-base">{lang.flag}</span>
        )}

        {/* Nomes */}
        <div className="flex flex-col min-w-0">
          <div className="flex items-center gap-1.5">
            <span className="text-xs font-medium truncate">{lang.nativeName}</span>
            {lang.rtl && (
              <span className="text-[9px] px-1 bg-red-950/60 text-red-400 border border-red-800/40 rounded">
                RTL
              </span>
            )}
          </div>
          {lang.nativeName && (
            <span className="text-[10px] text-gray-500 truncate">{lang.nativeName}</span>
          )}
        </div>
      </div>

      {/* Ações & Badges */}
      <div className="flex items-center gap-1.5">
        {/* Badge de Cache */}
        {lang.cached && (
          <span title="Tradução Instantânea em Cache" className="text-green-400 opacity-70 group-hover:opacity-100">
            <Zap size={11} />
          </span>
        )}

        {/* Botão de Favorito */}
        <button
          onClick={onToggleFav}
          className="p-1 hover:text-[#D4AF37] text-gray-600 transition-colors"
          title="Favoritar"
        >
          <Star size={12} className={isFavorite ? "fill-[#D4AF37] text-[#D4AF37]" : ""} />
        </button>

        {/* Check de Ativo */}
        {isActive && (
          <div className="w-4 h-4 rounded-full bg-[#D4AF37] text-black flex items-center justify-center">
            <Check size={10} strokeWidth={3} />
          </div>
        )}
      </div>
    </div>
  );
}