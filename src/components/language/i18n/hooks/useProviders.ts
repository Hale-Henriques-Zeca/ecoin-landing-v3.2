"use client";

import { useProviderContext } from "../context/ProviderContext";

export function useProviders() {

    const context = useProviderContext();

    return {

        /**
         * Provider atualmente ativo
         */
        activeProvider: context.activeProvider,

        /**
         * Lista de providers disponíveis
         */
        providers: context.providers,

        /**
         * Alterar provider
         */
        setProvider: context.setProvider,

        /**
         * Recarregar providers
         */
        reload: context.reload,

        /**
         * Serviço
         */
        service: context.service,

    };

}

export default useProviders;