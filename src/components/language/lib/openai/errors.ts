export class OpenAIAPIError extends Error {
  constructor(public statusCode: number, message: string, public rawError?: any) {
    super(`[OpenAI API Error ${statusCode}] ${message}`);
    this.name = "OpenAIAPIError";
  }
}

export class OpenAITimeoutError extends Error {
  constructor(timeoutMs: number) {
    super(`[OpenAI Timeout] Operational request timed out after ${timeoutMs}ms`);
    this.name = "OpenAITimeoutError";
  }
}