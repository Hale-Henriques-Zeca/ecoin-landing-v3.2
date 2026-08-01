"use client";

import { useTranslation } from "./useTranslation";
import { useLanguage } from "./useLanguage";

export function useTranslator() {

    const translation = useTranslation();

    const language = useLanguage();

    /**
     * Traduz utilizando o idioma atual.
     */
    async function translate(

        text: string

    ) {

        return translation.t(text);

    }

    /**
     * Traduz para um idioma específico.
     */
    async function translateTo(

        text: string,

        targetLanguage: string

    ) {

        return translation.translate(

            text,

            targetLanguage

        );

    }

    /**
     * Traduz vários textos.
     */
    async function translateMany(

        texts: string[],

        targetLanguage?: string

    ) {

        return Promise.all(

            texts.map(

                item => translation.translate(

                    item,

                    targetLanguage ?? language.language

                )

            )

        );

    }

    /**
     * Traduz HTML.
     */
    async function translateHtml(

        html: string,

        targetLanguage?: string

    ) {

        return translation.service.translateHtml(

            html,

            targetLanguage ?? language.language

        );

    }

    /**
     * Traduz Markdown.
     */
    async function translateMarkdown(

        markdown: string,

        targetLanguage?: string

    ) {

        return translation.service.translateMarkdown(

            markdown,

            targetLanguage ?? language.language

        );

    }

    /**
     * Traduz JSON.
     */
    async function translateJson(

        json: unknown,

        targetLanguage?: string

    ) {

        return translation.service.translateJson(

            json,

            targetLanguage ?? language.language

        );

    }

    return {

        language: language.language,

        translate,

        translateTo,

        translateMany,

        translateHtml,

        translateMarkdown,

        translateJson,

        service: translation.service

    };

}

export default useTranslator;