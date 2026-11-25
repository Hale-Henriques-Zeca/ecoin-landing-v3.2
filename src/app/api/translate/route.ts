
// ============================================================================
// EDENKINGDOM AI TRANSLATION FRAMEWORK
// Translation API Route
//
// Architecture: OPENAI + PRIVATE SUPABASE GLOSSARY
// Layer: Backend / Next.js API
//
// Responsibilities:
// - Receive translation requests
// - Initialize private Supabase storage
// - Initialize GlossaryRepository
// - Initialize GlossaryService
// - Initialize OpenAIProvider
// - Reuse TranslationPipeline
//
// Security:
// - OpenAI API key stays on the server
// - Supabase Service Role stays on the server
// - No public glossary access
// - RLS remains enabled
// - Request validation and payload limits
// ============================================================================

import "server-only";

import {
    NextRequest,
    NextResponse,
} from "next/server";

import { createClient } from "@supabase/supabase-js";

import { TranslationPipeline } from
    "@/components/language/i18n/engine/TranslationPipeline";

import { TranslationCache } from
    "@/components/language/i18n/engine/TranslationCache";

import { GlossaryService } from
    "@/components/language/i18n/services/GlossaryService";

import { OpenAIProvider } from
    "@/components/language/i18n/providers/OpenAIProvider";

import { GlossaryRepository } from
    "@/components/language/i18n/repository/GlossaryRepository";

import { SupabaseStorage } from
    "@/components/language/i18n/storage/SupabaseStorage";

import type { GlossaryTerm } from
    "@/components/language/i18n/types/Glossary";

// ============================================================================
// RUNTIME CONFIGURATION
// ============================================================================

export const runtime = "nodejs";

export const dynamic = "force-dynamic";

// Maximum accepted translation input.
const MAX_TEXT_LENGTH = 20_000;

// Maximum accepted JSON request size.
const MAX_REQUEST_BYTES = 64 * 1024;

// ============================================================================
// DEPENDENCIES
// ============================================================================

const provider = new OpenAIProvider();

const cache = new TranslationCache();

// ============================================================================
// SINGLETON STATE
// ============================================================================

let pipelinePromise: Promise<TranslationPipeline> | null = null;

// ============================================================================
// SUPABASE PRIVATE STORAGE
// ============================================================================

function createSupabaseStorage():
    SupabaseStorage<GlossaryTerm> {

    const supabaseUrl =
        process.env.SUPABASE_URL ??
        process.env.NEXT_PUBLIC_SUPABASE_URL;

    // IMPORTANT:
    // Never use ANON or NEXT_PUBLIC keys for this private glossary.

    const supabaseServiceRoleKey =
        process.env.SUPABASE_SERVICE_ROLE_KEY;

    const glossaryTable =
        process.env.TRANSLATION_GLOSSARY_TABLE;

    // ------------------------------------------------------------------------
    // Validate server configuration
    // ------------------------------------------------------------------------

    if (
        !supabaseUrl ||
        !supabaseServiceRoleKey
    ) {

        throw new Error(
            "Supabase server configuration is missing."
        );

    }

    if (!glossaryTable) {

        throw new Error(
            "TRANSLATION_GLOSSARY_TABLE is not configured."
        );

    }

    // ------------------------------------------------------------------------
    // Initialize private Supabase client
    // ------------------------------------------------------------------------

    const supabase = createClient(
        supabaseUrl,
        supabaseServiceRoleKey,
        {
            auth: {
                persistSession: false,
                autoRefreshToken: false,
            },
        }
    );

    console.info(
        "[TranslationAPI] Private Supabase storage configured."
    );

    return new SupabaseStorage<GlossaryTerm>(
        supabase,
        glossaryTable
    );

}

// ============================================================================
// TRANSLATION PIPELINE INITIALIZATION
// ============================================================================

async function getTranslationPipeline():
    Promise<TranslationPipeline> {

    if (!pipelinePromise) {

        pipelinePromise = (async () => {

            // ----------------------------------------------------------------
            // 1. Supabase Storage
            // ----------------------------------------------------------------

            const storage =
                createSupabaseStorage();

            await storage.initialize();

            // ----------------------------------------------------------------
            // 2. Glossary Repository
            // ----------------------------------------------------------------

            const glossaryRepository =
                new GlossaryRepository(storage);

            // ----------------------------------------------------------------
            // 3. Glossary Service
            // ----------------------------------------------------------------

            const glossary =
                new GlossaryService(
                    glossaryRepository
                );

            await glossary.load();

            console.info(
                "[TranslationAPI] Glossary loaded successfully."
            );

            // ----------------------------------------------------------------
            // 4. OpenAI Provider
            // ----------------------------------------------------------------

            await provider.initialize();

            // ----------------------------------------------------------------
            // 5. Translation Pipeline
            // ----------------------------------------------------------------

            const pipeline =
                new TranslationPipeline({
                    provider,
                    glossary,
                    cache,
                });

            console.info(
                "[TranslationAPI] Pipeline initialized successfully."
            );

            return pipeline;

        })().catch(error => {

            // Allow retry after initialization failure.
            pipelinePromise = null;

            throw error;

        });

    }

    return pipelinePromise;

}

// ============================================================================
// REQUEST VALIDATION
// ============================================================================

interface TranslationRequestBody {

    text: string;

    source?: string;

    target: string;

}

// ============================================================================
// POST /api/translate
// ============================================================================

export async function POST(
    request: NextRequest
) {

    try {

        // --------------------------------------------------------------------
        // 1. Validate request size
        // --------------------------------------------------------------------

        const contentLength =
            Number(
                request.headers.get("content-length") ?? 0
            );

        if (
            Number.isFinite(contentLength) &&
            contentLength > MAX_REQUEST_BYTES
        ) {

            return NextResponse.json(
                {
                    error: "Request payload is too large.",
                },
                {
                    status: 413,
                }
            );

        }

        // --------------------------------------------------------------------
        // 2. Parse JSON
        // --------------------------------------------------------------------

        let body: TranslationRequestBody;

        try {

            const parsed: unknown =
                await request.json();

            if (
                typeof parsed !== "object" ||
                parsed === null ||
                Array.isArray(parsed)
            ) {

                throw new Error("Invalid request body.");

            }

            body = parsed as TranslationRequestBody;

        } catch {

            return NextResponse.json(
                {
                    error: "Invalid JSON request.",
                },
                {
                    status: 400,
                }
            );

        }

        // --------------------------------------------------------------------
        // 3. Validate text
        // --------------------------------------------------------------------

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
                    error: "Translation text is required.",
                },
                {
                    status: 400,
                }
            );

        }

        if (text.length > MAX_TEXT_LENGTH) {

            return NextResponse.json(
                {
                    error: "Translation text exceeds the allowed limit.",
                },
                {
                    status: 413,
                }
            );

        }

        // --------------------------------------------------------------------
        // 4. Validate target language
        // --------------------------------------------------------------------

        if (
            typeof target !== "string" ||
            !target.trim() ||
            target.length > 64
        ) {

            return NextResponse.json(
                {
                    error: "A valid target language is required.",
                },
                {
                    status: 400,
                }
            );

        }

        // --------------------------------------------------------------------
        // 5. Resolve source language
        // --------------------------------------------------------------------

        if (
            source !== undefined &&
            (
                typeof source !== "string" ||
                source.length > 64
            )
        ) {

            return NextResponse.json(
                {
                    error: "Invalid source language.",
                },
                {
                    status: 400,
                }
            );

        }

        const sourceLanguage =
            typeof source === "string" && source.trim()
                ? source.trim()
                : "auto";

        const targetLanguage =
            target.trim();

        // --------------------------------------------------------------------
        // 6. Get shared pipeline
        // --------------------------------------------------------------------

        const pipeline =
            await getTranslationPipeline();

        // --------------------------------------------------------------------
        // 7. Execute translation
        // --------------------------------------------------------------------

        const translatedText =
            await pipeline.execute({

                text: text.trim(),

                sourceLanguage,

                targetLanguage,

            });

        // --------------------------------------------------------------------
        // 8. Return result
        // --------------------------------------------------------------------

        return NextResponse.json(
            {
                translatedText,

                sourceLanguage,

                targetLanguage,

            },
            {
                status: 200,

                headers: {
                    "Cache-Control": "no-store",
                },
            }
        );

    } catch (error) {

        console.error(
            "[TranslationAPI] Translation failed:",
            error
        );

        return NextResponse.json(
            {
                error: "Translation service failed.",
            },
            {
                status: 500,
            }
        );

    }

}

// ============================================================================
// END OF TRANSLATION API ROUTE
// ============================================================================
