"use client";

import React from "react";

import { useLanguage } from "../../i18n/hooks/useLanguage";

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
    currentLanguage,
    availableLanguages,
    changeLanguage,
    isLoading,
  } = useLanguage();

  const lang =
    availableLanguages.find(
      (item) => item.code === language
    );

  if (!lang) return null;

  const active =
    currentLanguage.code === language;

  return (
    <button
      {...props}
      type="button"
      disabled={isLoading}
      onClick={(event) => {
        props.onClick?.(event);

        if (!event.defaultPrevented) {
          void changeLanguage(language);
        }
      }}
      className={`
        flex
        items-center
        gap-2
        rounded-lg
        border
        px-3
        py-2
        transition-all

        ${
          active
            ? "border-blue-500 bg-blue-50"
            : "border-gray-200 hover:bg-gray-100"
        }

        disabled:opacity-50

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