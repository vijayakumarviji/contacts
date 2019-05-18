import { MessageIndexer } from '../messages';
const Messages = MessageIndexer();
import dbAccessor from '../data-accessor/contacts';

const healthCheckController = {
    healthCheck: async (req, res, next) => {
        let apiId = (req.method + req.url).toLowerCase();
        let ApiMessages = Messages[apiId];
        try {
            logger.log({
                level: 'info',
                message: '200 Success',
            })
            req.result = ApiMessages.RES_SUCCESS;
        } catch (err) {
            logger.log({
                level: 'error',
                message: `${err.responseMessage ? err.responseMessage : err.message}`,
            })
            res.status(ApiMessages.RES_INTERNAL_SERVER_ERR.responseCode).send(ApiMessages.RES_INTERNAL_SERVER_ERR);
        }
        next();
    }
};
export default healthCheckController;