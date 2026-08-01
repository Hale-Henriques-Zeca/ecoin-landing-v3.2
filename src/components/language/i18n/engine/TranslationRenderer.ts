export type RenderFormat =
    | "text"
    | "html"
    | "markdown"
    | "json";

export class TranslationRenderer {

    /**
     * Renderização principal.
     */
    async render(

        content: string,

        format: RenderFormat = "text"

    ): Promise<string> {

        switch (format) {

            case "html":
                return this.renderHtml(content);

            case "markdown":
                return this.renderMarkdown(content);

            case "json":
                return this.renderJson(content);

            default:
                return this.renderText(content);

        }

    }

    /**
     * Texto simples.
     */
    private renderText(text: string): string {

        return text.trim();

    }

    /**
     * HTML.
     */
    private renderHtml(html: string): string {

        return html;

    }

    /**
     * Markdown.
     */
    private renderMarkdown(markdown: string): string {

        return markdown;

    }

    /**
     * JSON.
     */
    private renderJson(json: string): string {

        return json;

    }

}