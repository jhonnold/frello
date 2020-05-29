import './env';

import http from 'http';
import app from './app';
import db from './db';
import { logger } from './util';

const server = http.createServer(app);

db.connect(() => {
    server.listen(8080, () => logger.info(`Started listing on 8080`));
});
