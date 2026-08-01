// ============================================================================
// EDENKINGDOM AI TRANSLATION FRAMEWORK
// Supabase Storage
// ============================================================================

import { StorageAdapter } from "./StorageAdapter";

import { createClient, SupabaseClient } from "@supabase/supabase-js";

export class SupabaseStorage<T = any> implements StorageAdapter<T> {

    private client: SupabaseClient;

    private table: string;

    constructor(

        table = "translation_cache",

        url = process.env.NEXT_PUBLIC_SUPABASE_URL!,

        key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

    ) {

        this.table = table;

        this.client = createClient(url, key);

    }

    async initialize(): Promise<void> {

        return;

    }

    async has(key: string): Promise<boolean> {

        const { data } = await this.client

            .from(this.table)

            .select("key")

            .eq("key", key)

            .maybeSingle();

        return !!data;

    }

    async get(key: string): Promise<T | null> {

        const { data } = await this.client

            .from(this.table)

            .select("value")

            .eq("key", key)

            .maybeSingle();

        if (!data) {

            return null;

        }

        return data.value as T;

    }

    async set(key: string, value: T): Promise<void> {

        await this.client

            .from(this.table)

            .upsert({

                key,

                value,

                updated_at: new Date().toISOString()

            });

    }

    async update(key: string, value: T): Promise<void> {

        await this.set(key, value);

    }

    async delete(key: string): Promise<void> {

        await this.client

            .from(this.table)

            .delete()

            .eq("key", key);

    }

    async clear(): Promise<void> {

        await this.client

            .from(this.table)

            .delete()

            .neq("key", "");

    }

    async keys(): Promise<string[]> {

        const { data } = await this.client

            .from(this.table)

            .select("key");

        return (data ?? []).map(item => item.key);

    }

    async values(): Promise<T[]> {

        const { data } = await this.client

            .from(this.table)

            .select("value");

        return (data ?? []).map(item => item.value as T);

    }

    async entries(): Promise<[string, T][]> {

        const { data } = await this.client

            .from(this.table)

            .select("key,value");

        return (data ?? []).map(item => [

            item.key,

            item.value as T

        ]);

    }

    async size(): Promise<number> {

        const { count } = await this.client

            .from(this.table)

            .select("*", {

                count: "exact",

                head: true

            });

        return count ?? 0;

    }

}