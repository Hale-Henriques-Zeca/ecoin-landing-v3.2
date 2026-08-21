export interface TranslationRequest {
  text: string;
  sourceLanguage: string;
  targetLanguage: string;
}

export interface TranslationResult {
  translatedText: string;
  sourceLanguage: string;
  targetLanguage: string;
  provider?: string;
  cached?: boolean;
}

export interface TranslationPipelineOptions {
  providers: unknown;
  glossary: unknown;
  cache: unknown;
}