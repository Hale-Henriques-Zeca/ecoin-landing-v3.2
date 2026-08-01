"use client";

import React from "react";

import { useLanguage } from "../../hooks/useLanguage";

export interface LanguageMenuProps {

    className?: string;

    onSelect?: (language: string) => void;

}

export function LanguageMenu({

    className = "",

    onSelect

}: LanguageMenuProps) {

    const {

        available,

        current,

        changeLanguage

    } = useLanguage();

    async function select(code: string) {

        await changeLanguage(code);

        onSelect?.(code);

    }

    return (

        <div
            className={`
                w-full
                rounded-xl
                border
                bg-white
                shadow-lg
                overflow-hidden
                ${className}
            `}
        >

            {

                available.map(language => (

                    <button

                        key={language.code}

                        onClick={() => select(language.code)}

                        className={`
                            w-full
                            flex
                            items-center
                            justify-between
                            px-4
                            py-3
                            transition
                            hover:bg-gray-100

                            ${current.code === language.code
                                ? "bg-blue-50"
                                : ""}
                        `}

                    >

                        <div className="flex items-center gap-3">

                            <span className="text-xl">

                                {language.emoji}

                            </span>

                            <div className="text-left">

                                <div>

                                    {language.nativeName}

                                </div>

                                <div className="text-xs text-gray-500">

                                    {language.locale}

                                </div>

                            </div>

                        </div>

                        {

                            current.code === language.code && (

                                <span>

                                    ✓

                                </span>

                            )

                        }

                    </button>

                ))

            }

        </div>

    );

}

export default LanguageMenu;