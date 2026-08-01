// ============================================================================
// EDENKINGDOM AI TRANSLATION FRAMEWORK
// Storage Adapter Interface
// ============================================================================

export interface StorageAdapter<T = any> {

    /**
     * Inicializa o armazenamento.
     */
    initialize(): Promise<void>;

    /**
     * Verifica se existe.
     */
    has(key: string): Promise<boolean>;

    /**
     * Obtém.
     */
    get(key: string): Promise<T | null>;

    /**
     * Guarda.
     */
    set(key: string, value: T): Promise<void>;

    /**
     * Atualiza.
     */
    update(key: string, value: T): Promise<void>;

    /**
     * Remove.
     */
    delete(key: string): Promise<void>;

    /**
     * Remove tudo.
     */
    clear(): Promise<void>;

    /**
     * Lista todas as chaves.
     */
    keys(): Promise<string[]>;

    /**
     * Lista todos os valores.
     */
    values(): Promise<T[]>;

    /**
     * Lista todos os registos.
     */
    entries(): Promise<[string, T][]>;

    /**
     * Total armazenado.
     */
    size(): Promise<number>;

}