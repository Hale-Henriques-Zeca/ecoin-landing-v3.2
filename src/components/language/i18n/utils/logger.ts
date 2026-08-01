// ============================================================================
// EDENKINGDOM AI TRANSLATION FRAMEWORK
// Logger
// ============================================================================

export enum LogLevel {

    DEBUG = "DEBUG",

    INFO = "INFO",

    WARN = "WARN",

    ERROR = "ERROR"
}

export interface LogOptions {

    context?: string;

    data?: unknown;
}

class Logger {

    private enabled = true;

    enable() {
        this.enabled = true;
    }

    disable() {
        this.enabled = false;
    }

    private write(
        level: LogLevel,
        message: string,
        options?: LogOptions
    ) {

        if (!this.enabled) return;

        const now = new Date().toISOString();

        const prefix = `[${now}] [${level}]`;

        if (options?.context) {

            console.log(
                `${prefix} [${options.context}] ${message}`,
                options.data ?? ""
            );

            return;
        }

        console.log(
            `${prefix} ${message}`,
            options?.data ?? ""
        );
    }

    debug(message: string, options?: LogOptions) {
        this.write(LogLevel.DEBUG, message, options);
    }

    info(message: string, options?: LogOptions) {
        this.write(LogLevel.INFO, message, options);
    }

    warn(message: string, options?: LogOptions) {
        this.write(LogLevel.WARN, message, options);
    }

    error(message: string, options?: LogOptions) {
        this.write(LogLevel.ERROR, message, options);
    }
}

export const logger = new Logger();

export default logger;