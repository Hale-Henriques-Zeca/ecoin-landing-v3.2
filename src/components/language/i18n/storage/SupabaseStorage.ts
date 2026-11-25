
import type { SupabaseClient } from "@supabase/supabase-js";
import type { StorageAdapter } from "./StorageAdapter";

export class SupabaseStorage<T = any> implements StorageAdapter<T> {

    private readonly client: SupabaseClient;
    private readonly table: string;

    constructor(
        client: SupabaseClient,
        table = "translation_cache"
    ) {
        this.client = client;
        this.table = table;
    }

    async initialize(): Promise<void> {
        // Supabase client is already initialized.
    }

    private handleError(error: unknown): never {
        console.error("[SupabaseStorage] Error:", error);
        throw error;
    }

    async has(key: string): Promise<boolean> {
        const { data, error } = await this.client
            .from(this.table)
            .select("key")
            .eq("key", key)
            .maybeSingle();

        if (error) this.handleError(error);

        return data !== null;
    }

    async get(key: string): Promise<T | null> {
        const { data, error } = await this.client
            .from(this.table)
            .select("value")
            .eq("key", key)
            .maybeSingle();

        if (error) this.handleError(error);

        return data?.value as T ?? null;
    }

    async set(key: string, value: T): Promise<void> {
        const { error } = await this.client
            .from(this.table)
            .upsert(
                {
                    key,
                    value,
                    updated_at: new Date().toISOString()
                },
                { onConflict: "key" }
            );

        if (error) this.handleError(error);
    }

    async update(key: string, value: T): Promise<void> {
        await this.set(key, value);
    }

    async delete(key: string): Promise<void> {
        const { error } = await this.client
            .from(this.table)
            .delete()
            .eq("key", key);

        if (error) this.handleError(error);
    }

    async clear(): Promise<void> {
        const { error } = await this.client
            .from(this.table)
            .delete()
            .neq("key", "");

        if (error) this.handleError(error);
    }

    async keys(): Promise<string[]> {
        const { data, error } = await this.client
            .from(this.table)
            .select("key");

        if (error) this.handleError(error);

        return (data ?? []).map(item => item.key);
    }

    async values(): Promise<T[]> {
        const { data, error } = await this.client
            .from(this.table)
            .select("value");

        if (error) this.handleError(error);

        return (data ?? []).map(item => item.value as T);
    }

    async entries(): Promise<[string, T][]> {
        const { data, error } = await this.client
            .from(this.table)
            .select("key, value");

        if (error) this.handleError(error);

        return (data ?? []).map(item => [
            item.key,
            item.value as T
        ]);
    }

    async size(): Promise<number> {
        const { count, error } = await this.client
            .from(this.table)
            .select("key", {
                count: "exact",
                head: true
            });

        if (error) this.handleError(error);

        return count ?? 0;
    }
}
