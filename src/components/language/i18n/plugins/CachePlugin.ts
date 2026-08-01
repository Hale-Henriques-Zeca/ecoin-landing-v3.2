import { Plugin } from "../types/Plugin";
import CacheManager from "../cache/CacheManager";

export interface CachePluginOptions {
  sourceLanguage: string;
  targetLanguage: string;
}

export default class CachePlugin implements Plugin {
  public readonly name = "CachePlugin";

  private cache: CacheManager;

  constructor(cache?: CacheManager) {
    this.cache = cache ?? new CacheManager();
  }

  /**
   * Verifica se existe tradução em cache.
   * Caso exista devolve-a imediatamente.
   */
  async beforeTranslate(
    text: string,
    options: CachePluginOptions
  ): Promise<string> {
    const cached = await this.cache.get({
      text,
      sourceLanguage: options.sourceLanguage,
      targetLanguage: options.targetLanguage,
    });

    if (cached) {
      return cached.translation;
    }

    return text;
  }

  /**
   * Guarda a tradução no cache.
   */
  async afterTranslate(
    original: string,
    translated: string,
    options: CachePluginOptions
  ): Promise<string> {
    await this.cache.set({
      original,
      translated,
      sourceLanguage: options.sourceLanguage,
      targetLanguage: options.targetLanguage,
      provider: "AUTO",
    });

    return translated;
  }
}