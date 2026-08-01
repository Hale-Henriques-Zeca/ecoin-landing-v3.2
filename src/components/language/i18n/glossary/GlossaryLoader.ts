// ============================================================================
// EDENKINGDOM AI TRANSLATION FRAMEWORK
// Glossary Loader
// ============================================================================

import { GlossaryRepository } from "../repository/GlossaryRepository";
import { GlossaryTerm } from "../types/Glossary";

export class GlossaryLoader {

    constructor(

        private repository: GlossaryRepository

    ) {}

    async load(): Promise<GlossaryTerm[]> {

        return this.repository.values();

    }

    async reload(): Promise<GlossaryTerm[]> {

        return this.load();

    }

}