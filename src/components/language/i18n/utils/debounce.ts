// ============================================================================
// EDENKINGDOM AI TRANSLATION FRAMEWORK
// Debounce Utilities
// ============================================================================

export interface DebounceOptions {

    leading?: boolean;

    trailing?: boolean;

}

export function debounce<T extends (...args: any[]) => any>(

    callback: T,

    delay = 300,

    options: DebounceOptions = {}

) {

    let timer: ReturnType<typeof setTimeout> | null = null;

    let invoked = false;

    return (...args: Parameters<T>) => {

        const { leading = false, trailing = true } = options;

        if (timer) {

            clearTimeout(timer);

        }

        if (leading && !invoked) {

            callback(...args);

            invoked = true;

        }

        timer = setTimeout(() => {

            if (trailing) {

                callback(...args);

            }

            invoked = false;

        }, delay);

    };

}

/**
 * Aguarda um determinado tempo.
 */

export function sleep(ms: number) {

    return new Promise(resolve => setTimeout(resolve, ms));

}

/**
 * Throttle
 */

export function throttle<T extends (...args: any[]) => any>(

    callback: T,

    delay = 300

) {

    let waiting = false;

    return (...args: Parameters<T>) => {

        if (waiting) return;

        callback(...args);

        waiting = true;

        setTimeout(() => {

            waiting = false;

        }, delay);

    };

}