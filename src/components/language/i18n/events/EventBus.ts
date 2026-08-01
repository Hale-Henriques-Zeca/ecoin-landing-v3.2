/**
 * ==========================================================
 * EdenKingDom Translation Framework
 * EventBus
 * ==========================================================
 */

export type EventListener<T = any> = (event: T) => void;

export class EventBus {

    private listeners = new Map<string, Set<EventListener>>();

    /**
     * Regista um listener.
     */
    on<T = any>(
        type: string,
        listener: EventListener<T>
    ): () => void {

        if (!this.listeners.has(type)) {

            this.listeners.set(type, new Set());

        }

        this.listeners.get(type)!.add(listener);

        return () => this.off(type, listener);

    }

    /**
     * Executa apenas uma vez.
     */
    once<T = any>(
        type: string,
        listener: EventListener<T>
    ): () => void {

        const unsubscribe = this.on(type, (event: T) => {

            unsubscribe();

            listener(event);

        });

        return unsubscribe;

    }

    /**
     * Remove listener.
     */
    off<T = any>(
        type: string,
        listener: EventListener<T>
    ): void {

        this.listeners.get(type)?.delete(listener);

    }

    /**
     * Dispara um evento.
     */
    emit<T extends { type: string }>(event: T): void {

        const listeners = this.listeners.get(event.type);

        if (!listeners?.size) return;

        listeners.forEach(listener => {

            try {

                listener(event);

            } catch (error) {

                console.error(

                    `[EventBus] Listener error for "${event.type}"`,

                    error

                );

            }

        });

    }

    /**
     * Verifica se existem listeners.
     */
    has(type: string): boolean {

        return this.listeners.has(type);

    }

    /**
     * Número de listeners.
     */
    count(type: string): number {

        return this.listeners.get(type)?.size ?? 0;

    }

    /**
     * Remove listeners.
     */
    clear(type?: string): void {

        if (type) {

            this.listeners.delete(type);

            return;

        }

        this.listeners.clear();

    }

    /**
     * Lista de eventos registados.
     */
    eventNames(): string[] {

        return [...this.listeners.keys()];

    }

}

/**
 * Singleton da framework
 */
export const eventBus = new EventBus();

export default eventBus;