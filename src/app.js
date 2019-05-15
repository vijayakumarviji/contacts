import express from 'express';
const swaggerUi = require('swagger-ui-express');

const app = express();
const router = express.Router();
const swaggerDocument = require('./swagger.json');

import routes from './routes';
import { connectDb } from './data-accessor/connectdb';
import Config from '../config/index';
import log from './utils/logger';

global.logger = log;

export async function main() {
    // Adding Api Documentation
    app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
    // Adding Routes
    app.use(routes(router));
    // Making Connection to DB
    await connectDb();
    app.listen(Config.SERVER.PORT, () => console.log(`App listening on port ${Config.SERVER.PORT}`));
    return {};
}