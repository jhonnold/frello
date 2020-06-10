import 'dotenv/config';

import express from 'express';
import bp from 'body-parser';
import compression from 'compression';
import cors from 'cors';
import { logging, errorHandler } from './middleware';
import { authRoutes, usersRoutes } from './routes';

const app = express();

app.use(cors());
app.use(bp.json());
app.use(compression());
app.use(logging);

app.use('/auth', authRoutes);
app.use('/users', usersRoutes);

app.use(errorHandler);

export default app;
