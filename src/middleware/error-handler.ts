import { Request, Response, NextFunction, ErrorRequestHandler } from 'express';
import { APIError, logger } from '../util';

const errorHandler: ErrorRequestHandler = (err: Error, _: Request, res: Response, next: NextFunction) => {
    logger.error(`${err.name} - ${err.message}`);

    if (res.headersSent) return next(err);
    return res.status(err instanceof APIError ? err.status : 500).json(err);
};

export default errorHandler;
