import { Router, Request, Response } from 'express';
import { body } from 'express-validator';
import { validate } from '../middleware';
import { UserModel } from '../model';
import { asyncWrapper, APIError } from '../util';

const router = Router();

const signupValidators = [
    body('username')
        .notEmpty()
        .withMessage('Username is required!')
        .custom(username => UserModel.findOne({ username }).then(u => u && Promise.reject('Username already in use!'))),
    body('password').notEmpty().withMessage('Password is required!'),
];

router.post(
    '/signup',
    signupValidators,
    validate,
    asyncWrapper(async (req: Request, res: Response) => {
        const { username, password } = req.body;

        const user = await UserModel.create({ username, password });
        const token = user.generateToken();

        res.status(201).json({ token });
    })
);

const loginValidators = [
    body('username').notEmpty().withMessage('Username is required!'),
    body('password').notEmpty().withMessage('Password is requierd!'),
];

router.post(
    '/login',
    loginValidators,
    validate,
    asyncWrapper(async (req: Request, res: Response) => {
        const { username, password } = req.body;

        const user = await UserModel.findOne({ username });
        if (!user) throw new APIError(404, 'User not found!');

        const validPassword = await user.validatePassword(password);
        if (!validPassword) throw new APIError(403, 'Incorrect password!');

        const token = user.generateToken();
        res.status(200).json({ token });
    })
);

export default router;
