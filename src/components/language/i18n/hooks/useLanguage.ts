"use client";

import { useLanguageContext } from "../context/LanguageProvider";

/**
 * Hook de Fachada (Facade) para consumo da Framework de Tradução e i18n
 */
export function useLanguage() {
  const context = useLanguageContext();

  return {
    /** 
     * Código do idioma atual (ex: "pt") 
     */
    language: context.language,

    /** 
     * Objeto completo com os metadados do idioma atual 
     */
    currentLanguage: context.currentLanguage,

    /** 
     * Locale formatado completo (ex: "pt-MZ") 
     */
    locale: context.locale,

    /** 
     * Lista completa de todos os idiomas suportados na aplicação 
     */
    availableLanguages: context.availableLanguages,

    /** 
     * Função principal para alterar o idioma 
     */
    setLanguage: context.setLanguage,

    /** 
     * Alias mais intuitivo para alteração de idioma 
     */
    changeLanguage: context.changeLanguage,

    /** 
     * Estado de carregamento/processamento da tradução 
     */
    isLoading: context.isLoading,

    /** 
     * Idioma predefinido (default) do sistema 
     */
    defaultLanguage: context.defaultLanguage,

    /** 
     * Motor/Fornecedor de IA atualmente ativo na framework 
     */
    activeProvider: context.activeProvider,

    /** 
     * Percentagem/Métricas de eficiência da cache de traduções 
     */
    cacheHitRate: context.cacheHitRate,

    /** 
     * Instância direta do serviço core de idioma 
     */
    service: context.service,
  };
}

export default useLanguage;