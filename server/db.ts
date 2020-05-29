import mongoose from 'mongoose';
import { logger } from './util';

export default {
    connect: (cb: Function): void => {
        mongoose.connect(process.env['DB_CONNECTION_STRING'], { useNewUrlParser: true, useUnifiedTopology: true });
        mongoose.connection.on('error', () => logger.error('Mongo connection error!'));
        mongoose.connection.on('connected', () => {
            logger.info('Successfully connected to database!');
            cb();
        });
    },
};
