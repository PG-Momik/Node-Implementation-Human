import { createLogger, transports, format } from 'winston';

const { printf, timestamp, combine, errors } = format;

/**
 * Log Format
 */
const logFormat = printf(({timestamp: timestamp, level, message, stack }): string => {
    return `${timestamp} [${level}]: ${stack || message}`;
});

const logger = createLogger({
    level: 'info',
    format: combine(
        timestamp(),
        errors({ stack: true }),
        logFormat
    ),
    transports: [
        new transports.Console({
            format: combine(
                format.colorize(),
                format.simple()
            )
        }),
        new transports.File({ filename: 'app.log' })
    ]
});

export default logger;
