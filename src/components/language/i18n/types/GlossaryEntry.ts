/**
 * ============================================================
 * Glossary Entry
 * EdenKingDom AI Translation Framework
 * ============================================================
 */

import { GlossaryAction } from "../constants/actions";

export interface GlossaryEntry {

    /**
     * Identificador único.
     */
    id: string;

    /**
     * Aplicação.
     * Ex: eSocial, eCoin, ePay...
     */
    application?: string;

    /**
     * Palavra ou expressão original.
     */
    key: string;

    /**
     * Tradução preferencial.
     */
    value: string;

    /**
     * Ação aplicada.
     */
    action: GlossaryAction;

    /**
     * Texto de substituição quando
     * action === REPLACE.
     */
    replacement?: string;

    /**
     * Idioma de origem.
     */
    sourceLanguage: string;

    /**
     * Idioma de destino.
     */
    targetLanguage: string;

    /**
     * Categoria.
     */
    category?: string;

    /**
     * Prioridade da regra.
     */
    priority?: number;

    /**
     * Ativo?
     */
    enabled: boolean;

    /**
     * Comentários internos.
     */
    description?: string;

    /**
     * Tags.
     */
    tags?: string[];

    /**
     * Datas.
     */
    createdAt?: Date;

    updatedAt?: Date;

}