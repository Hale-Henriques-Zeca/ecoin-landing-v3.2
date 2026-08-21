// ======================================================
// Translation APIs
// ======================================================

export { default as TranslationAPI } from "./TranslationAPI";
export { default as LanguageAPI } from "./LanguageAPI";
export { default as ProviderAPI } from "./ProviderAPI";
export { default as CacheAPI } from "./CacheAPI";
export { default as GlossaryAPI } from "./GlossaryAPI";


// ======================================================
// Framework Facade
// ======================================================

export { default as FrameworkAPI } from "./FrameworkAPI";


// ======================================================
// Convenience Exports
// ======================================================

// Translation

export const translate = TranslationAPI.translate;

export const translateHtml = TranslationAPI.translateHtml;

export const translateMarkdown = TranslationAPI.translateMarkdown;

export const translateJson = TranslationAPI.translateJson;

export const batchTranslate = TranslationAPI.batchTranslate;

export const preview = TranslationAPI.preview;


// Language

export const getLanguage = LanguageAPI.getLanguage;

export const setLanguage = LanguageAPI.setLanguage;

export const detectLanguage = LanguageAPI.detectLanguage;

export const availableLanguages = LanguageAPI.availableLanguages;

export const resetLanguage = LanguageAPI.resetLanguage;


// Provider

export const getProvider = ProviderAPI.getProvider;

export const setProvider = ProviderAPI.setProvider;

export const providers = ProviderAPI.providers;

export const providerHealth = ProviderAPI.health;

export const providerPriority = ProviderAPI.priority;


// Cache

export const cacheGet = CacheAPI.get;

export const cacheSet = CacheAPI.set;

export const cacheRemove = CacheAPI.remove;

export const clearCache = CacheAPI.clear;

export const cacheStatistics = CacheAPI.statistics;


// Glossary

export const glossaryFind = GlossaryAPI.find;

export const glossaryMatch = GlossaryAPI.match;

export const glossaryReplace = GlossaryAPI.replace;

export const glossaryRules = GlossaryAPI.rules;

export const glossaryAdd = GlossaryAPI.add;

export const glossaryRemove = GlossaryAPI.remove;

export const glossaryList = GlossaryAPI.list;

export const glossaryReload = GlossaryAPI.reload;