import './env';

import http from 'http';
import app from './app';
import util from './util';

const { logger } = util;

const server = http.createServer(app);

server.listen(8080, () => logger.info(`Started listing on 8080`));
