import eventBus from "../events/EventBus";

import {
    LanguageChanged,
    ProviderChanged,
    TranslationCreated,
    TranslationUpdated,
    TranslationDeleted,
    CacheUpdated,
} from "../events";

export default class BootstrapEvents {

    static initialize() {

        eventBus.on(
            LanguageChanged.type,
            () => {}
        );

        eventBus.on(
            ProviderChanged.type,
            () => {}
        );

        eventBus.on(
            TranslationCreated.type,
            () => {}
        );

        eventBus.on(
            TranslationUpdated.type,
            () => {}
        );

        eventBus.on(
            TranslationDeleted.type,
            () => {}
        );

        eventBus.on(
            CacheUpdated.type,
            () => {}
        );

        return eventBus;

    }

}