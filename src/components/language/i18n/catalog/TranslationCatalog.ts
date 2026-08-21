import { pt } from "./pt";
import { en } from "./en";
import { fr } from "./fr";

export const TRANSLATION_CATALOG = {
  pt,
  en,
  fr,
} as const;

export type SupportedLanguage =
  keyof typeof TRANSLATION_CATALOG;

export type TranslationKey =
  keyof typeof pt;