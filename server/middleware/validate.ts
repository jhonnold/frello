import { validationResult } from 'express-validator';
import { Request, Response, NextFunction } from 'express';
import { APIError } from '../util';

const validate = (req: Request, _: Response, next: NextFunction): void => {
    const validationErrors = validationResult(req);
    if (validationErrors.isEmpty()) return next();

    const errors: string[] = validationErrors.array().map(err => err.msg.toString());
    throw new APIError(400, ...errors);
};

export default validate;
