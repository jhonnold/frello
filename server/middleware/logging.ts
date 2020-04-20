import { Request, Response, NextFunction } from 'express';
import onFinished from 'on-finished';
import util from '../util';

const { logger } = util;

export = (req: Request, res: Response, next: NextFunction): void => {
    const startTime = new Date().getTime();

    const print = (): void => {
        logger.log({
            message: `${req.method} ${req.originalUrl || req.url} ${req.body.method || '--'} ${res.statusCode} - ${
                new Date().getTime() - startTime
            }ms`,
            level: res.statusCode >= 400 ? 'error' : 'info',
        });
    };

    onFinished(res, print);
    next();
};
