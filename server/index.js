require('dotenv').config();

const http = require('http');
const app = require('./app');
const { logger } = require('./util');

const server = http.createServer(app);

server.listen(8080, () => logger.info(`Started listing on 8080`));
