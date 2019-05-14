import { MessageIndexer } from '../messages';
import { loggers } from 'winston';
const Messages = MessageIndexer();

const contactController = {
    healthCheck: (req, res, next) => {
        let apiId = (req.method + req.url).toLowerCase();
        let ApiMessages = Messages[apiId];
        try {
            logger.log({
                level: 'info',
                message: '200 Success',
            })
            res.send(ApiMessages.RES_SUCCESS);
        } catch (err) {
            logger.log({
                level: 'error',
                message: `${err.responseMessage ? err.responseMessage : err.message}`,
            })
            next(err);
        }
    }
};
export default contactController;