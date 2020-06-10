import { Router, Request, Response } from 'express';
import { asyncWrapper } from '../util';
import { User } from '../model';
import { authenticate } from '../middleware';

const router = Router();
router.use(authenticate);

interface AuthedRequest extends Request {
    user?: User;
}

router.get(
    '/me',
    asyncWrapper(async (req: AuthedRequest, res: Response) => {
        res.status(200).json(req.user);
    })
);

export default router;
