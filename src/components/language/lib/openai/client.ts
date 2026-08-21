// ============================================================================
// EDENKINGDOM AI TRANSLATION FRAMEWORK
// OpenAI Client
// ============================================================================

import { OPENAI_CONFIG } from "../../i18n/config/openai.config";

import {
  OpenAIAPIError,
  OpenAITimeoutError,
} from "./errors";

import { RateLimiter } from "./rateLimiter";

export class OpenAIClient {
  private static getHeaders(): Record<string, string> {
    const apiKey = OPENAI_CONFIG.apiKey;

    if (!apiKey) {
      throw new Error(
        "[OpenAIClient] OPENAI_API_KEY environment variable is not defined."
      );
    }

    const headers: Record<string, string> = {
      "Content-Type": "application/json",
      Authorization: `Bearer ${apiKey}`,
    };

    if (OPENAI_CONFIG.organization) {
      headers["OpenAI-Organization"] =
        OPENAI_CONFIG.organization;
    }

    if (OPENAI_CONFIG.project) {
      headers["OpenAI-Project"] =
        OPENAI_CONFIG.project;
    }

    return headers;
  }

  public static async post<T = unknown>(
    endpoint: string,
    payload: unknown
  ): Promise<T> {
    await RateLimiter.throttle();

    const baseUrl =
      OPENAI_CONFIG.endpoint.replace(/\/$/, "");

    const url = `${baseUrl}${endpoint}`;

    const controller = new AbortController();

    const timeoutId = setTimeout(
      () => controller.abort(),
      OPENAI_CONFIG.timeout
    );

    try {
      const response = await fetch(
        url,
        {
          method: "POST",

          headers: this.getHeaders(),

          body: JSON.stringify(payload),

          signal: controller.signal,
        }
      );

      clearTimeout(timeoutId);

      if (!response.ok) {
        const errorData =
          await response
            .json()
            .catch(() => ({}));

        throw new OpenAIAPIError(
          response.status,

          errorData?.error?.message ??
            response.statusText,

          errorData
        );
      }

      return (await response.json()) as T;
    } catch (error: unknown) {
      clearTimeout(timeoutId);

      if (
        error instanceof Error &&
        error.name === "AbortError"
      ) {
        throw new OpenAITimeoutError(
          OPENAI_CONFIG.timeout
        );
      }

      throw error;
    }
  }
}

export default OpenAIClient;