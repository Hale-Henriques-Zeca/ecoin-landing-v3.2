// ============================================================================
// EDENKINGDOM AI TRANSLATION FRAMEWORK
// Glossary Compiler
// ============================================================================

import { GlossaryTerm } from "../types/Glossary";

export class GlossaryCompiler {

    compile(

        glossary: GlossaryTerm[]

    ): Map<string, GlossaryTerm> {

        const compiled = new Map<string, GlossaryTerm>();

        glossary.forEach(term => {

            compiled.set(

                term.key.toLowerCase(),

                term

            );

        });

        return compiled;

    }

}