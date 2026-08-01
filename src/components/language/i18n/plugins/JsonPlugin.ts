import { Plugin } from "../types/Plugin";

interface JsonToken {
    token: string;
    original: string;
}

export default class JsonPlugin implements Plugin {

    public readonly name = "JsonPlugin";

    private tokens: JsonToken[] = [];

    /**
     * Protege estruturas JSON antes da tradução.
     */
    beforeTranslate(text: string): string {

        this.tokens = [];

        let index = 0;

        return text.replace(
            /"(.*?)"\s*:/g,
            (match) => {

                const token = `__JSON_KEY_${index++}__`;

                this.tokens.push({
                    token,
                    original: match
                });

                return token;

            }
        );

    }

    /**
     * Restaura as chaves JSON.
     */
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

    getTokens(): JsonToken[] {

        return this.tokens;

    }

    clear() {

        this.tokens = [];

    }

}