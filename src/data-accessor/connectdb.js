import mongoose from 'mongoose';

import Config from '../../config/index';
import {
    promiseWrapper
} from '../utils/utilities';

export const connectDb = () => {
    return new Promise(async (resolve, reject) => {
        try {
            let {
                error,
                data
            } = await promiseWrapper(mongoose.connect(Config.DB.CONNECTION_STRING, {
                useNewUrlParser: true
            }));
            if (error) {
                reject(new Error('DB_Connection_Error'));
            } else {
                resolve(data);
            }
        } catch (err) {
            reject(new Error(err.message));
        }
    });
}