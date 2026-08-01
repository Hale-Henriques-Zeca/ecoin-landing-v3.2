"use client";

import React from "react";
import { useLanguage } from "../../hooks/useLanguage";

export interface LanguageButtonProps
    extends React.ButtonHTMLAttributes<HTMLButtonElement> {

    language: string;

    showFlag?: boolean;

    showName?: boolean;

    className?: string;
}

export function LanguageButton({

    language,

    showFlag = true,

    showName = true,

    className = "",

    ...props

}: LanguageButtonProps) {

    const {

        current,

        available,

        changeLanguage

    } = useLanguage();

    const lang = available.find(l => l.code === language);

    if (!lang) return null;

    const active = current.code === language;

    return (

        <button

            {...props}

            onClick={() => changeLanguage(language)}

            className={`

                flex

                items-center

                gap-2

                rounded-lg

                border

                px-3

                py-2

                transition-all

                ${active

                    ? "border-blue-500 bg-blue-50"

                    : "border-gray-200 hover:bg-gray-100"}

                ${className}

            `}
        >

            {showFlag && (

                <span className="text-xl">

                    {lang.emoji}

                </span>

            )}

            {showName && (

                <span>

                    {lang.nativeName}

                </span>

            )}

        </button>

    );

}

export default LanguageButton;