import TranslationService from "../services/TranslationService";

import LanguageService from "../services/LanguageService";

import ProviderService from "../services/ProviderService";

import CacheService from "../services/CacheService";

import GlossaryService from "../services/GlossaryService";

export default class BootstrapServices {

    static initialize(context: any) {

        const language = new LanguageService();

        const translation = new TranslationService();

        const provider = new ProviderService();

        const cache = new CacheService();

        const glossary = new GlossaryService();

        return {

            language,

            translation,

            provider,

            cache,

            glossary,

            context,

        };

    }

}