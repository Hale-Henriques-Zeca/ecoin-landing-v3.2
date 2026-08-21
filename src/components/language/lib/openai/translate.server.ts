import { OpenAIClient } from "./client";

import { buildSystemPrompt }
  from "./prompts/system.prompt";

import { buildTranslationPrompt }
  from "./prompts/translation.prompt";

import { buildGlossaryPrompt }
  from "./prompts/glossary.prompt";

import { buildHtmlPrompt }
  from "./prompts/html.prompt";

import { buildMarkdownPrompt }
  from "./prompts/markdown.prompt";

import { ResponseParser }
  from "./parser";

import { ParsedTranslationResponse }
  from "./responses";

import { resolveModelOptions }
  from "./models";

import { withRetry }
  from "./retries";

export interface TranslateParams {
  text: string;
  source: string;
  target: string;
  model?: string;
  temperature?: number;
  glossary?: Record<string, string>;
  preserveHtml?: boolean;
  preserveMarkdown?: boolean;
}

export async function executeOpenAITranslationServer(
  params: TranslateParams
): Promise<ParsedTranslationResponse> {

  const options = resolveModelOptions({
    model: params.model,
    temperature: params.temperature,
  });

  const systemPrompt =
    buildSystemPrompt();

  const userPromptParts = [
    buildTranslationPrompt({
      text: params.text,
      source: params.source,
      target: params.target,
    }),

    buildGlossaryPrompt(
      params.glossary
    ),

    buildHtmlPrompt(
      params.preserveHtml
    ),

    buildMarkdownPrompt(
      params.preserveMarkdown
    ),
  ]
    .filter(Boolean)
    .join("\n\n");

  const payload = {
    model: options.model,

    input: [
      {
        role: "system",
        content: systemPrompt,
      },

      {
        role: "user",
        content: userPromptParts,
      },
    ],

    max_output_tokens:
      options.maxTokens,
  };

  return withRetry(async () => {

    const rawResponse =
      await OpenAIClient.post(
        "/responses",
        payload
      );

    return ResponseParser.parse(
      rawResponse,
      params.text
    );
  });
}

export default
  executeOpenAITranslationServer;