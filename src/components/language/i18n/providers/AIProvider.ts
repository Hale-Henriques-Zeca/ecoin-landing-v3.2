
// ============================================================================
// EDENKINGDOM AI TRANSLATION FRAMEWORK
// AI PROVIDER CONTRACT
//
// Architecture: OPENAI ONLY
// ============================================================================

import type { Translation } from "../types/Translation";
import type { TranslationOptions } from "../types/Config";

// ============================================================================
// PROVIDER CAPABILITIES
// ============================================================================

export interface ProviderCapabilities {

    translate: boolean;

    glossary: boolean;

    html: boolean;

    markdown: boolean;

    json: boolean;

    streaming: boolean;

    functions: boolean;

    vision: boolean;

}

// ============================================================================
// PROVIDER HEALTH
// ============================================================================

export interface ProviderHealthStatus {

    healthy: boolean;

    latency: number;

    lastCheck: number;

    message?: string;

}

// ============================================================================
// AI PROVIDER CONTRACT
// ============================================================================

export interface AIProvider {

    readonly id: string;

    readonly name: string;

    readonly version: string;

    readonly priority: number;

    readonly capabilities: ProviderCapabilities;

    readonly enabled: boolean;

    initialize(): Promise<void>;

    destroy(): Promise<void>;

    translate(
        text: string,
        source: string,
        target: string,
        options?: TranslationOptions
    ): Promise<Translation>;

    health(): Promise<ProviderHealthStatus>;

    supports(
        feature: keyof ProviderCapabilities
    ): boolean;

}
