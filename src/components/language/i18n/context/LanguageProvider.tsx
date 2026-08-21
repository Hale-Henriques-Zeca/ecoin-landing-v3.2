"use client";

import React, {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
  ReactNode,
} from "react";

import { LanguageService } from "../services/LanguageService";
import {
  LANGUAGES_ULTRA,
  type LanguageDefinition,
} from "../constants/languages";

import { TranslationEngine } from "../engine/TranslationEngine";

export interface LanguageContextType {
  language: string;
  currentLanguage: LanguageDefinition;
  locale: string;

  availableLanguages: LanguageDefinition[];

  setLanguage: (code: string) => Promise<void>;
  changeLanguage: (code: string) => Promise<void>;

  isLoading: boolean;

  defaultLanguage: LanguageDefinition;

  activeProvider: string;

  cacheHitRate: string;

  service: LanguageService;

  engine: TranslationEngine;
}

const LanguageContext =
  createContext<LanguageContextType | null>(null);

interface LanguageProviderProps {
  children: ReactNode;
}

export function LanguageProvider({
  children,
}: LanguageProviderProps) {
  const service = useMemo(
    () => new LanguageService(),
    []
  );

  const engine = useMemo(
    () => new TranslationEngine(),
    []
  );

  const [language, setLanguageState] = useState<string>(
    () => service.getCurrent()
  );

  const [isLoading, setIsLoading] =
    useState<boolean>(false);

  const [activeProvider] =
    useState<string>("OpenAI");

  const [cacheHitRate] =
    useState<string>("98%");

  const availableLanguages =
    useMemo<LanguageDefinition[]>(() => {
      if (
        typeof (service as any).getLanguages ===
        "function"
      ) {
        return (service as any).getLanguages();
      }

      return LANGUAGES_ULTRA;
    }, [service]);

  const currentLanguage =
    useMemo<LanguageDefinition>(() => {
      return (
        availableLanguages.find(
          (item) => item.code === language
        ) ??
        availableLanguages[0]
      );
    }, [availableLanguages, language]);

  const defaultLanguage =
    useMemo<LanguageDefinition>(() => {
      return availableLanguages[0];
    }, [availableLanguages]);

  const locale =
    currentLanguage?.locale ??
    `${language.toLowerCase()}-${language.toUpperCase()}`;

  /**
   * Inicializa o TranslationEngine.
   */
  React.useEffect(() => {
    let mounted = true;

    async function initialize() {
      try {
        await engine.initialize();

        if (!mounted) return;

        console.info(
          "[LanguageProvider] TranslationEngine initialized"
        );
      } catch (error) {
        console.error(
          "[LanguageProvider] Failed to initialize TranslationEngine:",
          error
        );
      }
    }

    initialize();

    return () => {
      mounted = false;

      engine.shutdown().catch((error) => {
        console.error(
          "[LanguageProvider] Failed to shutdown TranslationEngine:",
          error
        );
      });
    };
  }, [engine]);

  /**
   * Altera o idioma atual.
   */
  const changeLanguage = useCallback(
    async (code: string): Promise<void> => {
      if (!code) return;

      if (
        !availableLanguages.some(
          (item) => item.code === code
        )
      ) {
        console.warn(
          `[LanguageProvider] Unsupported language: ${code}`
        );

        return;
      }

      if (code === language) {
        return;
      }

      setIsLoading(true);

      try {
        /**
         * 1. Persistir idioma.
         */
        await service.setCurrent(code);

        /**
         * 2. Atualizar estado React.
         */
        setLanguageState(code);

        /**
         * 3. Informar o TranslationEngine.
         *
         * O engine poderá posteriormente
         * carregar/preencher o catálogo.
         */
        await engine.setTargetLanguage(code);

        console.info(
          `[LanguageProvider] Language changed to ${code}`
        );
      } catch (error) {
        console.error(
          "[LanguageProvider] Error changing language:",
          error
        );

        throw error;
      } finally {
        setIsLoading(false);
      }
    },
    [
      availableLanguages,
      language,
      service,
      engine,
    ]
  );

  const contextValue =
    useMemo<LanguageContextType>(
      () => ({
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
        engine,
      }),
      [
        language,
        currentLanguage,
        locale,
        availableLanguages,
        changeLanguage,
        isLoading,
        defaultLanguage,
        activeProvider,
        cacheHitRate,
        service,
        engine,
      ]
    );

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