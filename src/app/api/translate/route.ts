// ============================================================================
// EDENKINGDOM AI TRANSLATION FRAMEWORK
// Translation API Route
// ============================================================================

import {
    NextRequest,
    NextResponse,
} from "next/server";

import { TranslationPipeline } from "@/components/language/i18n/engine/TranslationPipeline";
import { TranslationCache } from "@/components/language/i18n/engine/TranslationCache";
import { GlossaryService } from "@/components/language/i18n/services/GlossaryService";
import { OpenAIProvider } from "@/components/language/i18n/providers/OpenAIProvider";
import { GlossaryRepository } from "@/components/language/i18n/repository/GlossaryRepository";

const provider =
    new OpenAIProvider();

const cache =
    new TranslationCache();

const glossaryRepository =
    new GlossaryRepository();

const glossary =
    new GlossaryService(
        glossaryRepository
    );

let initialized = false;

async function getTranslationPipeline(): Promise<TranslationPipeline> {

    if (!initialized) {

        await glossary.load();

        await provider.initialize();

        initialized = true;

    }

    return new TranslationPipeline({

        provider,

        glossary,

        cache,

    });

}

export async function POST(
    request: NextRequest
) {

    try {

        const body =
            await request.json();

        const {
            text,
            source,
            target,
        } = body;

        if (
            typeof text !== "string" ||
            !text.trim()
        ) {

            return NextResponse.json(
                {
                    error:
                        "Translation text is required.",
                },
                {
                    status: 400,
                }
            );

        }

        if (
            typeof target !== "string" ||
            !target.trim()
        ) {

            return NextResponse.json(
                {
                    error:
                        "Target language is required.",
                },
                {
                    status: 400,
                }
            );

        }

        const pipeline =
            await getTranslationPipeline();

        const translated =
            await pipeline.execute({

                text,

                sourceLanguage:
                    typeof source === "string" &&
                    source.trim()
                        ? source
                        : "auto",

                targetLanguage:
                    target,

            });

        return NextResponse.json({

            translatedText:
                translated,

        });

    } catch (error) {

        console.error(
            "[/api/translate]",
            error
        );

        return NextResponse.json(
            {
                error:
                    "Translation service failed.",
            },
            {
                status: 500,
            }
        );

    }

}