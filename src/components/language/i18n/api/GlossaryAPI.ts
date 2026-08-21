import {GlossaryService} from "../services/GlossaryService";

import type {
    GlossaryEntry,
    GlossaryRule,
} from "../types/Glossary";

export default class GlossaryAPI {

    /**
     * Procura um termo no glossário.
     */
    static async find(
        term: string
    ): Promise<GlossaryEntry | null> {

        return GlossaryService.find(term);

    }

    /**
     * Procura correspondências.
     */
    static async match(
        text: string
    ): Promise<GlossaryEntry[]> {

        return GlossaryService.match(text);

    }

    /**
     * Aplica automaticamente as regras do glossário.
     */
    static async replace(
        text: string
    ): Promise<string> {

        return GlossaryService.replace(text);

    }

    /**
     * Obtém todas as regras.
     */
    static rules(): GlossaryRule[] {

        return GlossaryService.rules();

    }

    /**
     * Adiciona um termo.
     */
    static async add(
        entry: GlossaryEntry
    ): Promise<void> {

        await GlossaryService.add(entry);

    }

    /**
     * Remove um termo.
     */
    static async remove(
        key: string
    ): Promise<void> {

        await GlossaryService.remove(key);

    }

    /**
     * Lista todos os termos.
     */
    static async list(): Promise<GlossaryEntry[]> {

        return GlossaryService.list();

    }

    /**
     * Recarrega o glossário.
     */
    static async reload(): Promise<void> {

        await GlossaryService.reload();

    }

}