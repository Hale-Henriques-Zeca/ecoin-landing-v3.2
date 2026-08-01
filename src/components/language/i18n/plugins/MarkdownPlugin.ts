import { Plugin } from "../types/Plugin";

interface MarkdownToken {
  token: string;
  original: string;
}

export default class MarkdownPlugin implements Plugin {
  public readonly name = "MarkdownPlugin";

  private tokens: MarkdownToken[] = [];

  beforeTranslate(text: string): string {
    this.tokens = [];

    let index = 0;

    const patterns = [
      /```[\s\S]*?```/g,          // Code blocks
      /`[^`\n]+`/g,               // Inline code
      /\[[^\]]+\]\([^)]+\)/g,     // Links
      /!\[[^\]]*\]\([^)]+\)/g,    // Images
      /^#{1,6}\s.+$/gm,           // Headers
      /^\s*[-*+]\s.+$/gm,         // Lists
      /^\s*\d+\.\s.+$/gm,         // Ordered lists
      /^\>\s.+$/gm,               // Quotes
      /\*\*[^*]+\*\*/g,           // Bold
      /\*[^*]+\*/g,               // Italic
      /~~[^~]+~~/g,               // Strike
      /^---$/gm,                  // Separator
    ];

    let protectedText = text;

    for (const pattern of patterns) {
      protectedText = protectedText.replace(pattern, (match) => {
        const token = `__MARKDOWN_${index++}__`;

        this.tokens.push({
          token,
          original: match,
        });

        return token;
      });
    }

    return protectedText;
  }

  afterTranslate(text: string): string {
    let result = text;

    for (const item of this.tokens) {
        result = result.replaceAll(
            item.token,
            item.original
        );
    }

    return result;
  }

  getTokens(): MarkdownToken[] {
    return this.tokens;
  }

  clear(): void {
    this.tokens = [];
  }
}