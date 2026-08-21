// ============================================================================
// EDENKINGDOM AI TRANSLATION FRAMEWORK
// Translation Engine
// OpenAI-only architecture
// ============================================================================

import { TranslationPipeline } from "./TranslationPipeline";
import { TranslationQueue } from "./TranslationQueue";
import { GlossaryService } from "../services/GlossaryService";
import { TranslationCache } from "./TranslationCache";

export class TranslationEngine {
  private readonly glossary: GlossaryService;
  private readonly cache: TranslationCache;
  private readonly queue: TranslationQueue;
  private readonly pipeline: TranslationPipeline;

  private initialized = false;
  private targetLanguage = "pt";

  constructor() {
    this.glossary = new GlossaryService();

    this.cache = new TranslationCache();

    this.queue = new TranslationQueue();

    this.pipeline = new TranslationPipeline({
      glossary: this.glossary,
      cache: this.cache,
    });
  }

  // --------------------------------------------------------------------------
  // Inicialização
  // --------------------------------------------------------------------------

  async initialize(): Promise<void> {
    if (this.initialized) {
      return;
    }

    await this.glossary.load();

    this.initialized = true;

    console.info("[TranslationEngine] initialized");
  }

  // --------------------------------------------------------------------------
  // Shutdown
  // --------------------------------------------------------------------------

  async shutdown(): Promise<void> {
    if (!this.initialized) {
      return;
    }

    this.initialized = false;

    console.info("[TranslationEngine] destroyed");
  }

  // --------------------------------------------------------------------------
  // Idioma
  // --------------------------------------------------------------------------

  setTargetLanguage(language: string): void {
    if (!language?.trim()) {
      return;
    }

    this.targetLanguage = language.trim().toLowerCase();

    console.info(
      `[TranslationEngine] Target language: ${this.targetLanguage}`
    );
  }

  getTargetLanguage(): string {
    return this.targetLanguage;
  }

  // --------------------------------------------------------------------------
  // Tradução
  // --------------------------------------------------------------------------

  async translate(
    text: string,
    targetLanguage = this.targetLanguage,
    sourceLanguage = "auto"
  ): Promise<string> {
    if (!text?.trim()) {
      return "";
    }

    if (!this.initialized) {
      await this.initialize();
    }

    return this.pipeline.execute({
      text,
      sourceLanguage,
      targetLanguage,
    });
  }

  // --------------------------------------------------------------------------
  // Tradução em lote
  // --------------------------------------------------------------------------

  async translateMany(
    texts: string[],
    targetLanguage = this.targetLanguage,
    sourceLanguage = "auto"
  ): Promise<string[]> {
    if (!Array.isArray(texts) || texts.length === 0) {
      return [];
    }

    if (!this.initialized) {
      await this.initialize();
    }

    const results: string[] = [];

    for (const text of texts) {
      results.push(
        await this.translate(
          text,
          targetLanguage,
          sourceLanguage
        )
      );
    }

    return results;
  }

  // --------------------------------------------------------------------------
  // Queue
  // --------------------------------------------------------------------------

  async enqueue(
    text: string,
    targetLanguage = this.targetLanguage,
    priority = 0
  ): Promise<void> {
    if (!text?.trim()) {
      return;
    }

    this.queue.add({
      id: crypto.randomUUID(),
      priority,

      execute: async () => {
        await this.translate(
          text,
          targetLanguage
        );
      },
    });
  }

  async processQueue(): Promise<void> {
    await this.queue.process();
  }

  // --------------------------------------------------------------------------
  // Warmup
  // --------------------------------------------------------------------------

  async warmup(
    texts: string[],
    language = this.targetLanguage
  ): Promise<void> {
    await this.translateMany(
      texts,
      language
    );
  }

  // --------------------------------------------------------------------------
  // Cache
  // --------------------------------------------------------------------------

  async clearCache(): Promise<void> {
    await this.cache.clear();
  }

  async hasCache(key: string): Promise<boolean> {
    return this.cache.has(key);
  }
}

export default TranslationEngine;