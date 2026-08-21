import bootstrap, { type BootstrapContext } from "./Bootstrap";

/**
 * Helper público de conveniência para inicialização rápida da framework i18n/AI.
 *
 * Garante o arranque do motor de tradução,
 * serviços, cache e storage.
 *
 * @returns Contexto completo da Framework
 */
export async function initializeTranslation(): Promise<BootstrapContext> {

    try {

        // Garante que o núcleo do Bootstrap é executado apenas uma vez.
        if (!bootstrap.isInitialized()) {

            bootstrap.initialize();

        }

        // Devolve o contexto unificado para a aplicação.
        return bootstrap.getContext();

    } catch (error) {

        console.error(
            "[i18n/Bootstrap] Erro na inicialização do serviço de tradução:",
            error
        );

        throw error;

    }

}

export default initializeTranslation;