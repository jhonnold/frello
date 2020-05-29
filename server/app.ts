import 'dotenv/config';

import express from 'express';
import bp from 'body-parser';
import compression from 'compression';
import { logging, errorHandler, authenticate } from './middleware';
import { authRoutes, usersRoutes } from './routes';

const app = express();

app.use(logging);
app.use(bp.json());
app.use(compression());

app.use('/auth', authRoutes);
app.use('/users', authenticate, usersRoutes);

app.use(errorHandler);

export default app;
