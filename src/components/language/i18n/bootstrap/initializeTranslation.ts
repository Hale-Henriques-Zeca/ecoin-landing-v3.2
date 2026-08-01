import bootstrap from "./Bootstrap";
import type { FrameworkContext } from "../types/bootstrap.types";

/**
 * Helper público de conveniência para inicialização rápida da framework i18n/AI.
 * Garante o arranque do motor de tradução, serviços, cache e storage.
 *
 * @param options Definições de runtime personalizadas para o Bootstrap (opcional)
 * @returns Promessa com o Contexto completo da Framework (Engine, Services, Storage, etc.)
 */
export async function initializeTranslation(
  options?: any
): Promise<FrameworkContext> {
  try {
    // Garante que o núcleo do Bootstrap é executado apenas uma vez
    if (!bootstrap.isInitialized()) {
      await bootstrap.initialize(options);
    }

    // Devolve o contexto unificado para a aplicação
    return bootstrap.getContext();
  } catch (error) {
    console.error("[i18n/Bootstrap] Erro na inicialização do serviço de tradução:", error);
    throw error;
  }
}

export default initializeTranslation;