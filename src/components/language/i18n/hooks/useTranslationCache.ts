"use client";

import { useCacheContext } from "../context/CacheContext";

export function useTranslationCache() {

    const context = useCacheContext();

    return {

        /**
         * Estatísticas
         */
        stats: context.stats,

        /**
         * Limpar cache
         */
        clear: context.clear,

        /**
         * Atualizar cache
         */
        refresh: context.refresh,

        /**
         * Serviço
         */
        service: context.service,

    };

}

export default useTranslationCache;