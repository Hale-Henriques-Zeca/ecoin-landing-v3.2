"use client";

import { useTranslationContext } from "../context/TranslationProvider";
import { useLanguage } from "./useLanguage";

export function useTranslation() {

    const translation = useTranslationContext();

    const {

        language

    } = useLanguage();

    async function t(

        text: string

    ) {

        return translation.translate(

            text,

            language

        );

    }

    async function translate(

        text: string,

        targetLanguage?: string

    ) {

        return translation.translate(

            text,

            targetLanguage ?? language

        );

    }

    return {

        t,

        translate,

        service: translation.service,

        language,

    };

}

export default useTranslation;