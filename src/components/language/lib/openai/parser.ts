import { ResponsesAPIRawResponse, ParsedTranslationResponse } from "./responses";
import { UsageTracker } from "./usage";

export class ResponseParser {
  public static parse(rawResponse: ResponsesAPIRawResponse, fallbackText: string): ParsedTranslationResponse {
    let extractedText = "";

    // Extração baseada na estrutura do endpoint /responses
    if (rawResponse.output && Array.isArray(rawResponse.output)) {
      for (const item of rawResponse.output) {
        if (item.content && Array.isArray(item.content)) {
          for (const c of item.content) {
            if (c.text) extractedText += c.text;
          }
        }
      }
    }

    // Fallback de compatibilidade caso o payload retorne choices em vez de output
    if (!extractedText && (rawResponse as any).choices?.[0]?.message?.content) {
      extractedText = (rawResponse as any).choices[0].message.content;
    }

    const tokensUsed = rawResponse.usage?.total_tokens || 0;
    UsageTracker.track({
      promptTokens: rawResponse.usage?.input_tokens || 0,
      completionTokens: rawResponse.usage?.output_tokens || 0,
      totalTokens: tokensUsed,
    });

    const content = extractedText.trim();
    if (!content) {
      return { translatedText: fallbackText, confidence: 0, rawContent: "", tokensUsed };
    }

    try {
      const jsonMatch = content.match(/```(?:json)?\s*([\s\S]*?)\s*```/) || [null, content];
      const parsed = JSON.parse(jsonMatch[1].trim());

      return {
        translatedText: parsed.translatedText || fallbackText,
        confidence: typeof parsed.confidence === "number" ? parsed.confidence : 1,
        rawContent: content,
        tokensUsed,
      };
    } catch {
      return {
        translatedText: content,
        confidence: 0.85,
        rawContent: content,
        tokensUsed,
      };
    }
  }
}