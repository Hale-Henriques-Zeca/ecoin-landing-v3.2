export interface ResponsesAPIOutputItem {
  id: string;
  type: string;
  role?: string;
  content?: Array<{ type: string; text?: string }>;
}

export interface ResponsesAPIRawResponse {
  id: string;
  object: string;
  output: ResponsesAPIOutputItem[];
  usage?: {
    input_tokens: number;
    output_tokens: number;
    total_tokens: number;
  };
}

export interface ParsedTranslationResponse {
  translatedText: string;
  confidence: number;
  rawContent: string;
  tokensUsed: number;
}