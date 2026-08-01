import { TranslationRequest } from '../types/Translation';

export function buildTranslationPrompt(
  request: TranslationRequest,
  glossaryPromptRules: string
): string {
  return `You are the Official Translation Engine for EdenKingDom.
Your task is to translate the user text accurately while maintaining context, formatting, variables, HTML/Markdown tags, and brand terminology.

${glossaryPromptRules}

SOURCE LANGUAGE: ${request.sourceLanguage || 'Auto-detect'}
TARGET LANGUAGE CODE: ${request.targetLanguage}
CATEGORY/CONTEXT: ${request.category || 'General'}

STRICT RULES:
1. Return ONLY the translated string without any quotes, explanations, or wrapper JSON.
2. Preserve all variables like {{variable_name}}, {0}, %s, or :var_name exactly as they are.
3. Preserve HTML and Markdown formatting tags intact.
4. Keep EdenKingDom ecosystem terms untouched according to glossary rules.

TEXT TO TRANSLATE:
${request.text}`;
}