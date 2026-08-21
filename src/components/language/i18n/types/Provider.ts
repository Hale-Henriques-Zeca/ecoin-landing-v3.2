/**
 * ============================================================
 * Provider Types
 * EdenKingDom AI Translation Framework
 * ============================================================
 */

export type ProviderName =
    | "openai"
    | "gemini"
    | "claude"
    | "deepseek"
    | "custom";

export type ProviderStatus =
    | "online"
    | "offline"
    | "maintenance";

export interface Provider {

    id: string;

    name: ProviderName;

    displayName: string;

    enabled: boolean;

    priority: number;

    endpoint?: string;

    apiKey?: string;

    baseUrl: string;
    
    organization?: string;
    
    project?: string;
    
    headers?: Record<string,string>;

    model: string;

    maxTokens: number;

    temperature: number;

    timeout: number;

    retries: number;

    supportsStreaming: boolean;

    supportsMarkdown: boolean;

    supportsHtml: boolean;

    supportsJson: boolean;

    status: ProviderStatus;

    createdAt?: Date;

    updatedAt?: Date;

}