import { createLogger, format, transports, Logger as WinstonLogger } from "winston";
import chalk from "chalk";

export class LoggerService implements Logger {
    private readonly logger: WinstonLogger;

    constructor(private readonly context?: string) {
        this.logger = createLogger({
            level: "info",
            format: format.combine(
                format.timestamp(),
                format.printf(({ timestamp, level, message }) => {
                    return `[${chalk.gray(timestamp)}] ${this.colorizeLevel(level)} ${message}`;
                })
            ),
            transports: [new transports.Console()],
        });
    }

    log(message: string, context?: string) {
        this.logger.info(this.buildMessage(message, context));
    }

    error(message: string, trace?: string, context?: string) {
        this.logger.error(this.buildMessage(`${message} - ${trace}`, context));
    }

    warn(message: string, context?: string) {
        this.logger.warn(this.buildMessage(message, context));
    }

    debug(message: string, context?: string) {
        this.logger.debug(this.buildMessage(message, context));
    }

    verbose(message: string, context?: string) {
        this.logger.verbose(this.buildMessage(message, context));
    }

    private buildMessage(message: string, context?: string): string {
        const ctx = context || this.context;
        return ctx ? `[${chalk.cyan(ctx)}] ${message}` : message;
    }

    private colorizeLevel(level: string): string {
        switch (level) {
            case "error":
                return chalk.red(`[${level.toUpperCase()}]`);
            case "warn":
                return chalk.yellow(`[${level.toUpperCase()}]`);
            case "info":
                return chalk.green(`[${level.toUpperCase()}]`);
            case "debug":
                return chalk.blue(`[${level.toUpperCase()}]`);
            case "verbose":
                return chalk.magenta(`[${level.toUpperCase()}]`);
            default:
                return `[${level.toUpperCase()}]`;
        }
    }

    static withContext(context: string): LoggerService {
        return new LoggerService(context);
    }
}
