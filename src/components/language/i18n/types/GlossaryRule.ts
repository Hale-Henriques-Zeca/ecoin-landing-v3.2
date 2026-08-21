/**
 * ============================================================
 * Glossary Rule
 * EdenKingDom AI Translation Framework
 * ============================================================
 */

import { GlossaryAction } from "../constants/actions";

export interface GlossaryRule {

    /**
     * Identificador único.
     */
    id: string;

    /**
     * Nome da regra.
     */
    name: string;

    /**
     * Descrição.
     */
    description?: string;

    /**
     * Aplicação.
     * Ex: eCoin, eSocial, ePay...
     */
    application?: string;

    /**
     * Idioma origem.
     */
    sourceLanguage?: string;

    /**
     * Idioma destino.
     */
    targetLanguage?: string;

    /**
     * Ação aplicada.
     */
    action: GlossaryAction;

    /**
     * Expressão (texto ou regex).
     */
    pattern: string;

    /**
     * Valor de substituição.
     */
    replacement?: string;

    /**
     * Utiliza expressão regular?
     */
    regex?: boolean;

    /**
     * Diferencia maiúsculas/minúsculas?
     */
    caseSensitive?: boolean;

    /**
     * Aplica somente palavras completas?
     */
    wholeWord?: boolean;

    /**
     * Prioridade.
     */
    priority?: number;

    /**
     * Regra ativa?
     */
    enabled: boolean;

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