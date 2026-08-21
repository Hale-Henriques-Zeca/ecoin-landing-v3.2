// ============================================================================
// EDENKINGDOM AI TRANSLATION FRAMEWORK
// Translation Cache
// ============================================================================

import { CacheManager } from "../cache/CacheManager";

export interface TranslationCacheEntry {
  key: string;
  text: string;
  translation: string;
  sourceLanguage: string;
  targetLanguage: string;
  createdAt: number;
}

export class TranslationCache {
  private readonly cache: CacheManager;

  constructor() {
    this.cache = new CacheManager();
  }

  private buildKey(
    text: string,
    sourceLanguage: string,
    targetLanguage: string
  ): string {
    return [
      "translation",
      sourceLanguage,
      targetLanguage,
      text.trim(),
    ].join(":");
  }

  async get(
    text: string,
    sourceLanguage: string,
    targetLanguage: string
  ): Promise<string | null> {
    const key = this.buildKey(
      text,
      sourceLanguage,
      targetLanguage
    );

    const entry =
      await this.cache.get<TranslationCacheEntry>(key);

    return entry?.translation ?? null;
  }

  async set(
    text: string,
    translation: string,
    sourceLanguage: string,
    targetLanguage: string
  ): Promise<void> {
    const key = this.buildKey(
      text,
      sourceLanguage,
      targetLanguage
    );

    const entry: TranslationCacheEntry = {
      key,
      text,
      translation,
      sourceLanguage,
      targetLanguage,
      createdAt: Date.now(),
    };

    await this.cache.set(key, entry);
  }

  async has(key: string): Promise<boolean> {
    return this.cache.has(key);
  }

  async clear(): Promise<void> {
    await this.cache.clear();
  }
}