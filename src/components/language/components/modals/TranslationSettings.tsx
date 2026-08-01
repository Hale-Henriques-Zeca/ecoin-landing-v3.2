"use client";

import React, { useState } from "react";
import {
  Globe,
  Cpu,
  Zap,
  BookOpen,
  RefreshCw,
  Sliders,
  Check,
  Save,
  RotateCcw,
  X,
  Sparkles,
  ShieldCheck,
} from "lucide-react";
import { useLanguage } from "../../hooks/useLanguage";
import { useProviders } from "../../hooks/useProviders";
import { useTranslationCache } from "../../hooks/useTranslationCache";
import { useGlossary } from "../../hooks/useGlossary";
import { useTranslation } from "../../hooks/useTranslation";

export interface TranslationSettingsProps {
  isOpen: boolean;
  onClose: () => void;
  className?: string;
}

export default function TranslationSettings({
  isOpen,
  onClose,
  className = "",
}: TranslationSettingsProps) {
  // Arquitetura de Hooks Desacoplados
  const { currentLanguage, availableLanguages, changeLanguage, savePreferences } = useLanguage();
  const { providers, activeProvider, setProvider } = useProviders();
  const cache = useTranslationCache();
  const glossary = useGlossary();
  const translator = useTranslation();

  // Estados locais sincronizados com a camada de Hooks
  const [selectedProvider, setSelectedProvider] = useState<string>(activeProvider?.id || "OpenAI");
  const [enableCache, setEnableCache] = useState<boolean>(cache?.isEnabled ?? true);
  const [enableGlossary, setEnableGlossary] = useState<boolean>(glossary?.isEnabled ?? true);
  const [autoDetectLanguage, setAutoDetectLanguage] = useState<boolean>(true);
  const [autoTranslate, setAutoTranslate] = useState<boolean>(false);
  const [isSaving, setIsSaving] = useState<boolean>(false);
  const [saveSuccess, setSaveSuccess] = useState<boolean>(false);

  if (!isOpen) return null;

  const handleSave = async () => {
    setIsSaving(true);
    try {
      // Alteração do provider ativo via Hook/Service
      if (selectedProvider !== activeProvider?.id) {
        await setProvider(selectedProvider);
      }

      // Persistência de preferências no Storage através do Service do Tradutor e Idioma
      await Promise.all([
        translator.saveSettings({
          enableCache,
          enableGlossary,
          autoDetectLanguage,
          autoTranslate,
        }),
        savePreferences({
          language: currentLanguage.code,
        }),
      ]);

      setSaveSuccess(true);
      setTimeout(() => setSaveSuccess(false), 2000);
    } catch (err) {
      console.error("Erro ao guardar definições de tradução:", err);
    } finally {
      setIsSaving(false);
    }
  };

  const handleReset = () => {
    if (providers.length > 0) {
      setSelectedProvider(providers[0].id);
    }
    setEnableCache(true);
    setEnableGlossary(true);
    setAutoDetectLanguage(true);
    setAutoTranslate(false);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fadeIn">
      <div
        className={`relative w-full max-w-2xl bg-black/90 border border-[#D4AF37]/80 rounded-3xl p-6 md:p-8 shadow-2xl text-white backdrop-blur-2xl border-t-2 border-t-[#D4AF37] overflow-hidden ${className}`}
      >
        {/* Fundo Glow decorativo */}
        <div className="absolute -top-24 -right-24 w-60 h-60 bg-[#D4AF37]/10 rounded-full blur-3xl pointer-events-none" />

        {/* CABEÇALHO */}
        <div className="flex items-center justify-between pb-4 border-b border-[#D4AF37]/20 mb-6">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-2xl bg-[#D4AF37]/10 border border-[#D4AF37]/30 text-[#D4AF37]">
              <Sliders size={22} />
            </div>
            <div>
              <h2 className="text-lg md:text-xl font-bold tracking-wide text-white flex items-center gap-2">
                Definições de Tradução & i18n
                <Sparkles size={16} className="text-[#D4AF37]" />
              </h2>
              <p className="text-xs text-gray-400">
                Configurações avançadas do motor de tradução e otimização por IA
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 text-gray-400 hover:text-white hover:bg-[#D4AF37]/10 rounded-full transition"
          >
            <X size={20} />
          </button>
        </div>

        {/* CORPO DO MODAL */}
        <div className="space-y-6 max-h-[60vh] overflow-y-auto pr-1 custom-scrollbar">
          
          {/* SEÇÃO 1: IDIOMA PRINCIPAL */}
          <div className="bg-black/60 border border-[#D4AF37]/20 p-4 rounded-2xl">
            <label className="flex items-center gap-2 text-xs font-bold text-[#D4AF37] uppercase tracking-wider mb-2">
              <Globe size={14} /> Idioma Ativo do Sistema
            </label>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
              {availableLanguages.slice(0, 6).map((lang) => (
                <button
                  key={lang.code}
                  onClick={() => changeLanguage(lang.code)}
                  className={`flex items-center justify-between p-2.5 rounded-xl border text-xs transition-all ${
                    currentLanguage.code === lang.code
                      ? "bg-[#D4AF37]/20 border-[#D4AF37] text-white font-semibold"
                      : "bg-black/40 border-gray-800 text-gray-400 hover:border-[#D4AF37]/40 hover:text-white"
                  }`}
                >
                  <span className="truncate">{lang.name}</span>
                  <span className="text-[10px] text-[#D4AF37] uppercase bg-[#D4AF37]/10 px-1.5 py-0.5 rounded border border-[#D4AF37]/30">
                    {lang.code}
                  </span>
                </button>
              ))}
            </div>
          </div>

          {/* SEÇÃO 2: PROVIDER DE IA (Obtido dinamicamente via ProviderManager) */}
          <div className="bg-black/60 border border-[#D4AF37]/20 p-4 rounded-2xl">
            <label className="flex items-center justify-between text-xs font-bold text-[#D4AF37] uppercase tracking-wider mb-3">
              <span className="flex items-center gap-2">
                <Cpu size={14} /> Provedor de IA Preferencial
              </span>
              <span className="text-[10px] text-gray-400 normal-case font-normal">
                Ativo: <strong className="text-white">{selectedProvider}</strong>
              </span>
            </label>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
              {providers.map((provider) => (
                <button
                  key={provider.id}
                  onClick={() => setSelectedProvider(provider.id)}
                  className={`p-2.5 rounded-xl border text-center text-xs font-medium transition ${
                    selectedProvider === provider.id
                      ? "bg-[#D4AF37] text-black border-[#D4AF37] font-bold shadow-lg"
                      : "bg-black/40 border-gray-800 text-gray-300 hover:border-[#D4AF37]/50"
                  }`}
                >
                  {provider.name}
                </button>
              ))}
            </div>
          </div>

          {/* SEÇÃO 3: OTIMIZAÇÕES & SWITCHES */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            
            {/* TOGGLE CACHE */}
            <div className="flex items-center justify-between p-3.5 bg-black/60 border border-[#D4AF37]/20 rounded-2xl">
              <div className="flex items-center gap-2.5">
                <Zap size={18} className="text-green-400" />
                <div>
                  <div className="text-xs font-medium text-white">Cache Inteligente</div>
                  <div className="text-[10px] text-gray-400">
                    Hit Rate: {cache?.hitRate ?? "0%"}
                  </div>
                </div>
              </div>
              <button
                onClick={() => setEnableCache(!enableCache)}
                className={`w-11 h-6 flex items-center rounded-full p-1 transition-colors ${
                  enableCache ? "bg-[#D4AF37]" : "bg-gray-800"
                }`}
              >
                <div
                  className={`w-4 h-4 rounded-full bg-black shadow-md transform transition-transform ${
                    enableCache ? "translate-x-5" : "translate-x-0"
                  }`}
                />
              </button>
            </div>

            {/* TOGGLE GLOSSÁRIO */}
            <div className="flex items-center justify-between p-3.5 bg-black/60 border border-[#D4AF37]/20 rounded-2xl">
              <div className="flex items-center gap-2.5">
                <BookOpen size={18} className="text-blue-400" />
                <div>
                  <div className="text-xs font-medium text-white">Glossário EdenKingDom</div>
                  <div className="text-[10px] text-gray-400">Preserva termos Web3/Crypto</div>
                </div>
              </div>
              <button
                onClick={() => setEnableGlossary(!enableGlossary)}
                className={`w-11 h-6 flex items-center rounded-full p-1 transition-colors ${
                  enableGlossary ? "bg-[#D4AF37]" : "bg-gray-800"
                }`}
              >
                <div
                  className={`w-4 h-4 rounded-full bg-black shadow-md transform transition-transform ${
                    enableGlossary ? "translate-x-5" : "translate-x-0"
                  }`}
                />
              </button>
            </div>

            {/* TOGGLE DETEÇÃO AUTOMÁTICA */}
            <div className="flex items-center justify-between p-3.5 bg-black/60 border border-[#D4AF37]/20 rounded-2xl">
              <div className="flex items-center gap-2.5">
                <ShieldCheck size={18} className="text-[#D4AF37]" />
                <div>
                  <div className="text-xs font-medium text-white">Deteção por Geolocalização</div>
                  <div className="text-[10px] text-gray-400">Ajusta idioma pelo Browser</div>
                </div>
              </div>
              <button
                onClick={() => setAutoDetectLanguage(!autoDetectLanguage)}
                className={`w-11 h-6 flex items-center rounded-full p-1 transition-colors ${
                  autoDetectLanguage ? "bg-[#D4AF37]" : "bg-gray-800"
                }`}
              >
                <div
                  className={`w-4 h-4 rounded-full bg-black shadow-md transform transition-transform ${
                    autoDetectLanguage ? "translate-x-5" : "translate-x-0"
                  }`}
                />
              </button>
            </div>

            {/* TOGGLE TRADUÇÃO AUTOMÁTICA */}
            <div className="flex items-center justify-between p-3.5 bg-black/60 border border-[#D4AF37]/20 rounded-2xl">
              <div className="flex items-center gap-2.5">
                <RefreshCw size={18} className="text-purple-400" />
                <div>
                  <div className="text-xs font-medium text-white">Tradução em Tempo Real</div>
                  <div className="text-[10px] text-gray-400">Traduz componentes dinâmicos</div>
                </div>
              </div>
              <button
                onClick={() => setAutoTranslate(!autoTranslate)}
                className={`w-11 h-6 flex items-center rounded-full p-1 transition-colors ${
                  autoTranslate ? "bg-[#D4AF37]" : "bg-gray-800"
                }`}
              >
                <div
                  className={`w-4 h-4 rounded-full bg-black shadow-md transform transition-transform ${
                    autoTranslate ? "translate-x-5" : "translate-x-0"
                  }`}
                />
              </button>
            </div>

          </div>

        </div>

        {/* RODAPÉ DO MODAL */}
        <div className="mt-6 pt-4 border-t border-[#D4AF37]/20 flex items-center justify-between">
          <button
            onClick={handleReset}
            className="flex items-center gap-1.5 text-xs text-gray-400 hover:text-white transition"
          >
            <RotateCcw size={14} /> Restaurar Padrões
          </button>

          <div className="flex items-center gap-3">
            <button
              onClick={onClose}
              className="px-4 py-2 text-xs font-medium text-gray-300 hover:text-white transition"
            >
              Cancelar
            </button>

            <button
              onClick={handleSave}
              disabled={isSaving}
              className="flex items-center gap-2 bg-[#D4AF37] hover:bg-[#b5922f] text-black font-bold px-5 py-2.5 rounded-full text-xs transition shadow-lg disabled:opacity-50"
            >
              {isSaving ? (
                <>
                  <RefreshCw size={14} className="animate-spin" /> Guardando...
                </>
              ) : saveSuccess ? (
                <>
                  <Check size={14} /> Guardado com Sucesso!
                </>
              ) : (
                <>
                  <Save size={14} /> Guardar Preferências
                </>
              )}
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}