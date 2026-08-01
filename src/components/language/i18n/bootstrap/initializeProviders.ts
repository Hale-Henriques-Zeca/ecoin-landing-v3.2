import { BootstrapProviders } from "./BootstrapProviders";
import type { IProviderConfig, IProviderRegistryResult } from "../types/provider.types";

/**
 * Helper especializado para inicialização e registo
 * dos motores de Inteligência Artificial da framework.
 *
 * @param config Configurações opcionais dos provedores ou chaves de API
 * @returns Instância/Resultado do registo dos provedores no ProviderManager
 */
export function initializeProviders(
  config?: Record<string, Partial<IProviderConfig>> | any
): IProviderRegistryResult {
  try {
    // Delega a instanciação e registo dos providers para o sub-bootstrap dedicado
    return BootstrapProviders.initialize(config);
  } catch (error) {
    console.error("[i18n/Bootstrap] Falha ao inicializar os IA Providers:", error);
    throw error;
  }
}

export default initializeProviders;