import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { APIError } from '../util';
import { UserModel } from '../model';

interface VerifiedToken {
    username: string;
}

const authenticate = async (req: Request, _: Response, next: NextFunction): Promise<void> => {
    const { authorization } = req.headers;
    if (!authorization) return next(new APIError(401, 'Unauthorized!'));

    // Take off the bearer
    const token = authorization.substring(7);
    const data = jwt.verify(token, process.env['JWT_SECRET']) as VerifiedToken;

    const user = await UserModel.findOne({ username: data.username }).select('-password');
    if (!user) return next(new APIError(401, 'Incorrect authentication!'));

    req.user = user;
    next();
};

export default authenticate;
