import { RequestHandler } from 'express';

const asyncWrapper = (fn: RequestHandler): RequestHandler => (req, res, next): void => fn(req, res, next).catch(next);

export default asyncWrapper;
