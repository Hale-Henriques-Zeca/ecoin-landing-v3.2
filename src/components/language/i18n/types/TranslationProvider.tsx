"use client";

import React, {
  createContext,
  ReactNode,
  useCallback,
  useContext,
  useMemo,
  useState,
} from "react";

import { useLanguage } from "../hooks/useLanguage";

interface TranslationContextType {
  t: (
    key: string,
    fallback?: string
  ) => string;

  translate: (
    text: string,
    target?: string
  ) => Promise<string>;

  translations: Record<
    string,
    string
  >;

  loading: boolean;
}

const TranslationContext =
  createContext<TranslationContextType | null>(
    null
  );

interface Props {
  children: ReactNode;
}

export function TranslationProvider({
  children,
}: Props) {
  const {
    language,
    engine,
  } = useLanguage();

  const [
    translations,
    setTranslations,
  ] = useState<Record<string, string>>({});

  const [loading, setLoading] =
    useState(false);

  const t = useCallback(
    (
      key: string,
      fallback?: string
    ) => {
      return (
        translations[key] ??
        fallback ??
        key
      );
    },
    [translations]
  );

  const translate = useCallback(
    async (
      text: string,
      target = language
    ) => {
      return engine.translate(
        text,
        target
      );
    },
    [engine, language]
  );

  const value =
    useMemo<TranslationContextType>(
      () => ({
        t,
        translate,
        translations,
        loading,
      }),
      [
        t,
        translate,
        translations,
        loading,
      ]
    );

  return (
    <TranslationContext.Provider
      value={value}
    >
      {children}
    </TranslationContext.Provider>
  );
}

export function useTranslationContext() {
  const context =
    useContext(
      TranslationContext
    );

  if (!context) {
    throw new Error(
      "useTranslationContext deve ser usado dentro do TranslationProvider."
    );
  }

  return context;
}