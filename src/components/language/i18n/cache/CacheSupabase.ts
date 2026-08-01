// ============================================================================
// EDENKINGDOM AI TRANSLATION FRAMEWORK
// Supabase Translation Cache
// ============================================================================

import { supabase } from "../../lib/supabase";
import { CacheEntry } from "../types/Cache";

export class CacheSupabase {

    /**
     * Procura uma tradução.
     */
    async get(
        application: string,
        language: string,
        hash: string
    ): Promise<CacheEntry | null> {

        const { data, error } = await supabase
            .from("language_translations")
            .select("*")
            .eq("application", application)
            .eq("language_code", language)
            .eq("hash", hash)
            .single();

        if (error || !data) {

            return null;

        }

        return data as CacheEntry;

    }

    /**
     * Guarda uma tradução.
     */
    async save(
        entry: CacheEntry
    ): Promise<void> {

        await supabase
            .from("language_translations")
            .upsert(entry);

    }

    /**
     * Atualiza uma tradução.
     */
    async update(
        id: string,
        values: Partial<CacheEntry>
    ): Promise<void> {

        await supabase
            .from("language_translations")
            .update(values)
            .eq("id", id);

    }

    /**
     * Remove uma tradução.
     */
    async delete(id: string): Promise<void> {

        await supabase
            .from("language_translations")
            .delete()
            .eq("id", id);

    }

    /**
     * Existe?
     */
    async exists(
        application: string,
        language: string,
        hash: string
    ): Promise<boolean> {

        const result = await this.get(

            application,

            language,

            hash

        );

        return result !== null;

    }

}