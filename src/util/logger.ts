import { createLogger, format, transports } from 'winston';
import chalk from 'chalk';

const { combine, timestamp, printf } = format;

export default createLogger({
    level: 'debug',
    transports: [new transports.Console()],
    exitOnError: false,
    format: combine(
        timestamp({ format: 'HH:mm:ss.SSS' }),
        printf(info => {
            const color = info.level === 'error' ? 'red' : info.level === 'warn' ? 'yellow' : 'cyan';

            return `${chalk.gray(info.timestamp)} [${chalk[color](info.level.toUpperCase())}]: ${info.message}`;
        })
    ),
});
