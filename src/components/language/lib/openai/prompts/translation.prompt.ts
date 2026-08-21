export interface TranslationPromptInput {
  text: string;
  source: string;
  target: string;
}

export function buildTranslationPrompt({ text, source, target }: TranslationPromptInput): string {
  return [
    `Translate the following text from source language '${source}' to target language '${target}'.`,
    `Text to translate:\n"""\n${text}\n"""`,
    "Strict Output Format (JSON only):",
    `{\n  "translatedText": "translated string here",\n  "confidence": 0.99\n}`
  ].join("\n\n");
}