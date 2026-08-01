export interface QueueTask<T = any> {

    id: string;

    priority: number;

    execute: () => Promise<T>;

}

export class TranslationQueue {

    private queue: QueueTask[] = [];

    private running = false;

    /**
     * Adiciona uma tarefa.
     */
    add(task: QueueTask): void {

        this.queue.push(task);

        this.queue.sort(

            (a, b) => b.priority - a.priority

        );

    }

    /**
     * Processa toda a fila.
     */
    async process(): Promise<void> {

        if (this.running) {

            return;

        }

        this.running = true;

        while (this.queue.length > 0) {

            const task = this.queue.shift();

            if (!task) continue;

            try {

                await task.execute();

            }

            catch (error) {

                console.error(

                    "[TranslationQueue]",

                    error

                );

            }

        }

        this.running = false;

    }

    /**
     * Limpa fila.
     */
    clear(): void {

        this.queue = [];

    }

    /**
     * Quantidade de tarefas.
     */
    size(): number {

        return this.queue.length;

    }

    /**
     * Existe processamento?
     */
    isRunning(): boolean {

        return this.running;

    }

    /**
     * Existe fila?
     */
    isEmpty(): boolean {

        return this.queue.length === 0;

    }

}