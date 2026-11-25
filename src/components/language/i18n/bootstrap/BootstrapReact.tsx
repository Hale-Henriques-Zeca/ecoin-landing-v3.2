import React from "react";

import { LanguageProvider } from "../context/LanguageProvider";

import { TranslationProvider } from "../context/TranslationProvider";

export interface BootstrapReactContext {

    engine: any;

    services: any;

    events: any;

}

export default class BootstrapReact {

    static initialize(context: BootstrapReactContext) {

        return {

            engine: context.engine,

            services: context.services,

            events: context.events,

            providers: {

                LanguageProvider,

                TranslationProvider,

            },

            wrap(children: React.ReactNode) {

                return (

                    <LanguageProvider>

                        <TranslationProvider>

                            {children}

                        </TranslationProvider>

                    </LanguageProvider>

                );

            },

        };

    }

}