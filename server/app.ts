import express, { Request, Response } from 'express';
import bp from 'body-parser';
import compression from 'compression';
import middleware from './middleware';

const { logging } = middleware;

const app = express();

app.use(logging);
app.use(bp.json());
app.use(compression());

app.get('/', (_: Request, res: Response): void => {
    res.send('<h1>Hello, World!</h1>');
});

export = app;
