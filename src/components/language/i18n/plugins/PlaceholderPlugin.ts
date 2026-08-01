import { Plugin } from "../types/Plugin";

interface PlaceholderMap {
  token: string;
  value: string;
}

export default class PlaceholderPlugin implements Plugin {
  public readonly name = "PlaceholderPlugin";

  private placeholders: PlaceholderMap[] = [];

  /**
   * Protege placeholders antes da tradução.
   */
  beforeTranslate(text: string): string {
    this.placeholders = [];

    let index = 0;

    const protectedText = text.replace(
      /\{[^}]+\}|\$\{[^}]+\}|%\w|:\w+/g,
      (match) => {
        const token = `__PLACEHOLDER_${index++}__`;

        this.placeholders.push({
          token,
          value: match,
        });

        return token;
      }
    );

    return protectedText;
  }

  /**
   * Restaura os placeholders após a tradução.
   */
  afterTranslate(translated: string): string {
    let result = translated;

    for (const item of this.placeholders) {
      result = result.replaceAll(item.token, item.value);
    }

    return result;
  }

  /**
   * Lista de placeholders protegidos.
   */
  getPlaceholders() {
    return this.placeholders;
  }

  /**
   * Limpa memória.
   */
  clear() {
    this.placeholders = [];
  }
}