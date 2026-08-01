import { normalize } from "../utils/normalize";
import { restorePlaceholders } from "../utils/placeholders";

export class TranslationOptimizer {

    /**
     * Otimiza o texto traduzido.
     */
    async optimize(text: string): Promise<string> {

        let result = text;

        // Normalizar espaços
        result = normalize(result);

        // Restaurar placeholders
        result = restorePlaceholders(result);

        // Corrigir espaços antes da pontuação
        result = result.replace(/\s+([,.;!?])/g, "$1");

        // Remover espaços duplicados
        result = result.replace(/\s{2,}/g, " ");

        // Corrigir quebras excessivas
        result = result.replace(/\n{3,}/g, "\n\n");

        return result.trim();

    }

    /**
     * Score simples de qualidade.
     */
    score(text: string): number {

        let score = 100;

        if (text.length < 3) score -= 20;

        if (text.includes("undefined")) score -= 30;

        if (text.includes("null")) score -= 20;

        if (text.includes("[object Object]")) score -= 50;

        return Math.max(score, 0);

    }

    /**
     * Verifica se a tradução parece válida.
     */
    isValid(text: string): boolean {

        return this.score(text) >= 70;

    }

}