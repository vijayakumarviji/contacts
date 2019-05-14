import express from 'express';
const app = express();
const router = express.Router();

import routes from './routes';
import { connectDb } from './data-accessor/connectdb';
import Config from '../config/index';

export async function main() {
    app.use(routes(router));
    await connectDb();
    app.listen(Config.SERVER.PORT, () => console.log(`App listening on port ${Config.SERVER.PORT}`));
    return {};
}