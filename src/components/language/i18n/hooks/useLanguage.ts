"use client";

import { useLanguageContext } from "../context/LanguageProvider";

export function useLanguage() {
  const context = useLanguageContext();

  return {
    language: context.language,

    currentLanguage:
      context.currentLanguage,

    locale:
      context.locale,

    availableLanguages:
      context.availableLanguages,

    setLanguage:
      context.setLanguage,

    changeLanguage:
      context.changeLanguage,

    isLoading:
      context.isLoading,

    defaultLanguage:
      context.defaultLanguage,

    activeProvider:
      context.activeProvider,

    cacheHitRate:
      context.cacheHitRate,

    service:
      context.service,

    engine:
      context.engine,
  };
}

export default useLanguage;