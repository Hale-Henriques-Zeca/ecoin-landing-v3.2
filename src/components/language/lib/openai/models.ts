import { OPENAI_CONFIG } from "../../i18n/config/openai.config";

export interface OpenAIModelOptions {
  model: string;
  temperature: number;
  maxTokens: number;
}

export function resolveModelOptions(options?: Partial<OpenAIModelOptions>): OpenAIModelOptions {
  return {
    model: options?.model || OPENAI_CONFIG.defaultModel,
    temperature: options?.temperature ?? OPENAI_CONFIG.temperature,
    maxTokens: options?.maxTokens || OPENAI_CONFIG.maxTokens,
  };
}