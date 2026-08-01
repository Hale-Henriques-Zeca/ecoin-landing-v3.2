"use client";

import React, { useState } from "react";

import { useTranslation } from "../../hooks/useTranslation";

export interface TranslateButtonProps {

    text: string;

    target: string;

    className?: string;

    children?: React.ReactNode;

    onTranslated?: (translation: string) => void;

}

export function TranslateButton({

    text,

    target,

    className = "",

    children,

    onTranslated

}: TranslateButtonProps) {

    const { translate } = useTranslation();

    const [loading, setLoading] = useState(false);

    async function handleTranslate() {

        setLoading(true);

        try {

            const result = await translate(text, target);

            onTranslated?.(result);

        }

        finally {

            setLoading(false);

        }

    }

    return (

        <button

            onClick={handleTranslate}

            disabled={loading}

            className={`

                rounded-lg

                bg-indigo-600

                px-4

                py-2

                text-white

                transition

                hover:bg-indigo-700

                disabled:opacity-50

                ${className}

            `}
        >

            {

                loading

                    ? "Traduzindo..."

                    : children ?? "Traduzir"

            }

        </button>

    );

}

export default TranslateButton;