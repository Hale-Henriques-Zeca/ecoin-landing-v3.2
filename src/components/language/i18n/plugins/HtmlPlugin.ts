import { Plugin } from "../types/Plugin";

interface HtmlToken {
  token: string;
  original: string;
}

export default class HtmlPlugin implements Plugin {
  public readonly name = "HtmlPlugin";

  private tokens: HtmlToken[] = [];

  /**
   * Protege todas as tags HTML antes da tradução.
   */
  beforeTranslate(text: string): string {
    this.tokens = [];

    let index = 0;

    return text.replace(/<[^>]+>/g, (match) => {
      const token = `__HTML_TAG_${index++}__`;

      this.tokens.push({
        token,
        original: match,
      });

      return token;
    });
  }

  /**
   * Restaura todas as tags HTML.
   */
  afterTranslate(text: string): string {
    let result = text;

    for (const item of this.tokens) {
      result = result.replaceAll(item.token, item.original);
    }

    return result;
  }

  /**
   * Lista de tags protegidas.
   */
  getTokens(): HtmlToken[] {
    return this.tokens;
  }

  /**
   * Limpa memória.
   */
  clear(): void {
    this.tokens = [];
  }
}