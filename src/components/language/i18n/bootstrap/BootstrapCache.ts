import CacheManager from "../cache/CacheManager";

import MemoryCache from "../cache/MemoryCache";

import LocalStorageCache from "../cache/LocalStorageCache";

import SupabaseCache from "../cache/SupabaseCache";

export default class BootstrapCache {

    static initialize(config: any) {

        const cache = new CacheManager({

            ttl: config?.cache?.ttl,

            maxEntries: config?.cache?.maxEntries,

        });

        cache.register(

            "memory",

            new MemoryCache()

        );

        cache.register(

            "local",

            new LocalStorageCache()

        );

        cache.register(

            "supabase",

            new SupabaseCache()

        );

        cache.setDefault(

            config?.cache?.defaultDriver ?? "memory"

        );

        return cache;

    }

}