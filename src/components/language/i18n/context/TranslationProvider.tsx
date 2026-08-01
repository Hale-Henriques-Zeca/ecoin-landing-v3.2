"use client";

import React, {

    createContext,

    useContext,

    useMemo,

    ReactNode

} from "react";

import { TranslationService } from "../services/TranslationService";

interface TranslationContextType {

    service: TranslationService;

    translate(

        text: string,

        language: string

    ): Promise<string>;

}

const TranslationContext = createContext<TranslationContextType | null>(null);

interface Props {

    children: ReactNode;

}

export function TranslationProvider({

    children

}: Props) {

    const service = useMemo(

        () => new TranslationService(),

        []

    );

    async function translate(

        text: string,

        language: string

    ) {

        return service.translate(

            text,

            language

        );

    }

    return (

        <TranslationContext.Provider

            value={{

                service,

                translate

            }}

        >

            {children}

        </TranslationContext.Provider>

    );

}

export function useTranslationContext() {

    const context = useContext(

        TranslationContext

    );

    if (!context) {

        throw new Error(

            "useTranslationContext deve ser usado dentro do TranslationProvider."

        );

    }

    return context;

}