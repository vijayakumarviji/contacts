import { MessageIndexer } from '../messages';
import { loggers } from 'winston';
const Messages = MessageIndexer();

const contactController = {
    healthCheck: (req, res, next) => {
        let apiId = (req.method + req.url).toLowerCase();
        let ApiMessages = Messages[apiId];
        try {
            res.send(ApiMessages.RES_SUCCESS);
        } catch (err) {
            next(err);
        }
    }
};
export default contactController;