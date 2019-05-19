import express from 'express';
import swaggerUi from'swagger-ui-express';
import bodyParser from 'body-parser';

const app = express();
const router = express.Router();
const swaggerDocument = require('./swagger.json');

import routes from './routes';
import { connectDb } from './data-accessor/connectdb';
import Config from '../config/index';
import log from './utils/logger';

global.logger = log;

export async function main() {
    // Adding Body Parser
    app.use(bodyParser.json());
    // Adding Api Documentation
    app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
    // Adding Routes
    app.use(routes(router));
    // Making Connection to DB
    await connectDb();
    app.listen(Config.SERVER.PORT, () => console.log(`App listening on port ${Config.SERVER.PORT}`));
    return {};
}