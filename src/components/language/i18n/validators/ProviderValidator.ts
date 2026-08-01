// ============================================================================
// EDENKINGDOM AI TRANSLATION FRAMEWORK
// Provider Validator
// ============================================================================

import { PROVIDERS } from "../constants/providers";

export interface ProviderValidation {

    valid: boolean;

    message?: string;

}

export class ProviderValidator {

    /**
     * Existe?
     */
    static exists(name: string): boolean {

        return PROVIDERS.some(

            provider => provider.id === name

        );

    }

    /**
     * Está ativo?
     */
    static enabled(name: string): boolean {

        const provider = PROVIDERS.find(

            p => p.id === name

        );

        return provider?.enabled ?? false;

    }

    /**
     * Possui API Key?
     */
    static hasApiKey(apiKey?: string): boolean {

        return !!apiKey && apiKey.length > 10;

    }

    /**
     * Validação completa.
     */
    static validate(

        provider: string,

        apiKey?: string

    ): ProviderValidation {

        if (!this.exists(provider)) {

            return {

                valid: false,

                message:
                    "Provider not supported."

            };

        }

        if (!this.enabled(provider)) {

            return {

                valid: false,

                message:
                    "Provider disabled."

            };

        }

        if (!this.hasApiKey(apiKey)) {

            return {

                valid: false,

                message:
                    "API Key not configured."

            };

        }

        return {

            valid: true

        };

    }

}