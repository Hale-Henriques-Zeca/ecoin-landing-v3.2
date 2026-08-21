export class PromptCache {
  private static cache = new Map<string, any>();

  public static get<T>(key: string): T | null {
    return this.cache.get(key) || null;
  }

  public static set<T>(key: string, value: T): void {
    this.cache.set(key, value);
  }
}