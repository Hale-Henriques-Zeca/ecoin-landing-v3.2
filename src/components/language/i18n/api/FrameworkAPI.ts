import TranslationAPI from "./TranslationAPI";
import LanguageAPI from "./LanguageAPI";
import ProviderAPI from "./ProviderAPI";
import CacheAPI from "./CacheAPI";
import GlossaryAPI from "./GlossaryAPI";

export default class FrameworkAPI {

    /**
     * APIs públicas da framework.
     */
    static readonly translation = TranslationAPI;

    static readonly language = LanguageAPI;

    static readonly provider = ProviderAPI;

    static readonly cache = CacheAPI;

    static readonly glossary = GlossaryAPI;

    /**
     * Atalhos de tradução.
     */
    static translate = TranslationAPI.translate;

    static translateHtml = TranslationAPI.translateHtml;

    static translateMarkdown = TranslationAPI.translateMarkdown;

    static translateJson = TranslationAPI.translateJson;

    static batchTranslate = TranslationAPI.batchTranslate;

    static preview = TranslationAPI.preview;

    /**
     * Idiomas.
     */
    static getLanguage = LanguageAPI.getLanguage;

    static setLanguage = LanguageAPI.setLanguage;

    static detectLanguage = LanguageAPI.detectLanguage;

    static availableLanguages = LanguageAPI.availableLanguages;

    static resetLanguage = LanguageAPI.resetLanguage;

    /**
     * Providers.
     */
    static getProvider = ProviderAPI.getProvider;

    static setProvider = ProviderAPI.setProvider;

    static providers = ProviderAPI.providers;

    static providerHealth = ProviderAPI.health;

    static providerPriority = ProviderAPI.priority;

    /**
     * Cache.
     */
    static cacheGet = CacheAPI.get;

    static cacheSet = CacheAPI.set;

    static cacheRemove = CacheAPI.remove;

    static clearCache = CacheAPI.clear;

    static cacheStatistics = CacheAPI.statistics;

    /**
     * Glossário.
     */
    static glossaryFind = GlossaryAPI.find;

    static glossaryMatch = GlossaryAPI.match;

    static glossaryReplace = GlossaryAPI.replace;

    static glossaryRules = GlossaryAPI.rules;

    static glossaryAdd = GlossaryAPI.add;

    static glossaryRemove = GlossaryAPI.remove;

    static glossaryList = GlossaryAPI.list;

}