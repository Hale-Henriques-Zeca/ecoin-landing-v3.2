"use client";

import React, {
  createContext,
  useContext,
  useMemo,
  useState,
  ReactNode,
} from "react";
import { LanguageService } from "../services/LanguageService";

// Definição do tipo para cada idioma na framework
export interface LanguageDefinition {
  code: string;
  name: string;
  nativeName?: string;
  flag: string;
  locale?: string;
  region?: "África" | "América" | "Europa" | "Ásia" | "Oceania";
  isRTL?: boolean;
  providersSupported?: string[];
  cached?: boolean;
}

export interface LanguageContextType {
  /** Código do idioma atual (ex: "pt") */
  language: string;

  /** Objeto completo do idioma atual */
  currentLanguage: LanguageDefinition;

  /** Locale completo (ex: "pt-MZ") */
  locale: string;

  /** Lista de todos os idiomas suportados */
  availableLanguages: LanguageDefinition[];

  /** Função assíncrona para alterar o idioma */
  setLanguage: (code: string) => Promise<void>;

  /** Alias para setLanguage */
  changeLanguage: (code: string) => Promise<void>;

  /** Estado de carregamento ao trocar de idioma */
  isLoading: boolean;

  /** Idioma padrão da aplicação */
  defaultLanguage: LanguageDefinition;

  /** Provider de IA atualmente ativo na framework */
  activeProvider: string;

  /** Taxa de acerto da cache de traduções */
  cacheHitRate: string;

  /** Instância do LanguageService */
  service: LanguageService;
}

const LanguageContext = createContext<LanguageContextType | null>(null);

interface Props {
  children: ReactNode;
}

export function LanguageProvider({ children }: Props) {
  const service = useMemo(() => new LanguageService(), []);

  // Estados locais da framework
  const [language, setLanguageState] = useState<string>(() => service.getCurrent());
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [activeProvider] = useState<string>("OpenAI");
  const [cacheHitRate] = useState<string>("98%");

  // Obter idiomas do serviço (com fallback seguro caso o método divirja)
  const availableLanguages: LanguageDefinition[] = useMemo(() => {
    if (typeof (service as any).getLanguages === "function") {
      return (service as any).getLanguages();
    }
    // Fallback padrão com metadata enriquecida
    return [
      { code: "pt", name: "Português", nativeName: "Português (MZ)", flag: "mz", locale: "pt-MZ", region: "África", providersSupported: ["OpenAI", "Gemini"], cached: true },
      { code: "en", name: "Inglês", nativeName: "English", flag: "us", locale: "en-US", region: "América", providersSupported: ["OpenAI", "Gemini", "Claude"], cached: true },
      { code: "es", name: "Espanhol", nativeName: "Español", flag: "es", locale: "es-ES", region: "Europa", providersSupported: ["OpenAI"], cached: false },
      { code: "fr", name: "Francês", nativeName: "Français", flag: "fr", locale: "fr-FR", region: "Europa", providersSupported: ["Claude"], cached: true },
      { code: "ja", name: "Japonês", nativeName: "日本語", flag: "jp", locale: "ja-JP", region: "Ásia", providersSupported: ["OpenAI", "Gemini"], cached: false },
      { code: "ar", name: "Árabe", nativeName: "العربية", flag: "sa", locale: "ar-SA", region: "Ásia", isRTL: true, providersSupported: ["OpenAI"], cached: true },
    ];
  }, [service]);

  // Idioma atual (objeto completo)
  const currentLanguage: LanguageDefinition = useMemo(() => {
    return (
      availableLanguages.find((l) => l.code === language) ||
      availableLanguages[0]
    );
  }, [availableLanguages, language]);

  // Idioma padrão
  const defaultLanguage: LanguageDefinition = useMemo(() => {
    return availableLanguages[0];
  }, [availableLanguages]);

  // Locale atual
  const locale = currentLanguage.locale || `${language.toLowerCase()}-${language.toUpperCase()}`;

  // Ação de mudança de idioma assíncrona
  const changeLanguage = async (code: string) => {
    setIsLoading(true);
    try {
      if (typeof service.setCurrent === "function") {
        await service.setCurrent(code);
      }
      setLanguageState(code);
    } catch (error) {
      console.error("Erro ao alterar o idioma na framework:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const contextValue: LanguageContextType = {
    language,
    currentLanguage,
    locale,
    availableLanguages,
    setLanguage: changeLanguage,
    changeLanguage,
    isLoading,
    defaultLanguage,
    activeProvider,
    cacheHitRate,
    service,
  };

  return (
    <LanguageContext.Provider value={contextValue}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguageContext() {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error(
      "useLanguageContext deve ser usado dentro do LanguageProvider."
    );
  }
  return context;
}