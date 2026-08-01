"use client";

import React from "react";
import { Globe, CheckCircle } from "lucide-react";
import { useLanguage } from "../../i18n/hooks";

export interface CurrentLanguageProps {
  className?: string;
  showFlag?: boolean;
  showLocale?: boolean;
  showNativeName?: boolean;
  variant?: "default" | "compact" | "pill";
}

export default function CurrentLanguage({
  className = "",
  showFlag = true,
  showLocale = true,
  showNativeName = true,
  variant = "default",
}: CurrentLanguageProps) {
  const {
    currentLanguage,
    activeProvider,
  } = useLanguage();

  if (!currentLanguage) return null;

  const base =
    "flex items-center gap-3 border border-[#D4AF37]/30 bg-black/70 backdrop-blur-xl text-white";

  const variants = {
    default: "px-4 py-2 rounded-xl",
    compact: "px-2 py-1 rounded-lg text-sm",
    pill: "px-5 py-2 rounded-full",
  };

  return (
    <div className={`${base} ${variants[variant]} ${className}`}>
      {showFlag && (
        <img
          src={`https://flagcdn.com/w40/${currentLanguage.flag}.png`}
          alt={currentLanguage.nativeName}
          className="w-6 h-4 rounded-sm border border-black"
        />
      )}

      <div className="flex flex-col">
        <span className="font-semibold text-[#D4AF37]">
          {showNativeName
            ? currentLanguage.nativeName
            : currentLanguage.code.toUpperCase()}
        </span>

        {showLocale && (
          <span className="text-xs text-gray-400">
            {currentLanguage.locale}
          </span>
        )}
      </div>

      <div className="ml-auto flex items-center gap-2 text-green-400">
        <CheckCircle size={15} />
        <span className="text-xs">
          {activeProvider}
        </span>
      </div>
    </div>
  );
}