import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { APIError } from '../util';
import { UserModel, User } from '../model';

interface VerifiedToken {
    username: string;
}

export interface AuthedRequest extends Request {
    user?: User;
}

const authenticate = async (req: AuthedRequest, _: Response, next: NextFunction): Promise<void> => {
    const { authorization } = req.headers;
    if (!authorization) return next(new APIError(401, 'Unauthorized!'));

    // Take off the bearer
    const token = authorization.substring(7);

    const secret = process.env['JWT_SECRET'];
    if (!secret) return next(new APIError(500, 'Unable to authenticate!'));
    const data = jwt.verify(token, secret) as VerifiedToken;

    const user = await UserModel.findOne({ username: data.username }).select('-password');
    if (!user) return next(new APIError(401, 'Incorrect authentication!'));

    req.user = user;
    next();
};

export default authenticate;
