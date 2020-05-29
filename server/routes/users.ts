import { Router, Request, Response } from 'express';
import { asyncWrapper } from '../util';

const router = Router();

router.get(
    '/me',
    asyncWrapper(async (req: Request, res: Response) => {
        res.status(200).json(req.user);
    })
);

export default router;
