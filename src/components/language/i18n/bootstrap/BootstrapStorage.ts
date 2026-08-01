import MemoryStorage from "../storage/MemoryStorage";

import SessionStorage from "../storage/SessionStorage";

import IndexedDBStorage from "../storage/IndexedDBStorage";

import SupabaseStorage from "../storage/SupabaseStorage";

export default class BootstrapStorage {

    static initialize(config: any) {

        const storage = {

            memory: new MemoryStorage(),

            session: new SessionStorage(),

            indexedDB: new IndexedDBStorage(),

            supabase: new SupabaseStorage(),

        };

        return {

            ...storage,

            default:

                storage[

                    config?.cache?.storageDriver ??

                    "memory"

                ],

        };

    }

}