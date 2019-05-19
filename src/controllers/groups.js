import _ from 'lodash';
import groupsAccessor from '../data-accessor/groups';
import { validateObjectId } from '../data-accessor/common';
import { MessageIndexer } from '../messages';
const Messages = MessageIndexer();

const groupsController = {
    createGroup: async (req, res, next) => {
        let apiId = (req.method + req.route.path).toLowerCase();
        let ApiMessages = Messages[apiId];
        try {
            let body = req.body;
            body.contactsList = _.map(body.contactsList, '_id');
            let result = await groupsAccessor.createGroup(body);
            result = Object.assign({ data: { contactInfo: result } }, ApiMessages.RES_SUCCESS);
            req.result = result;
            logger.log({
                level: 'error',
                message: `groupsController-createGroup-success`,
            })
            next();
        } catch (err) {
            logger.log({
                level: 'error',
                message: `groupsController-createGroup-${err.message}`,
            })
            if (err.isError) {
                req.result = err;
                next();
            } else {
                req.result = ApiMessages.RES_INTERNAL_SERVER_ERR;
                next();
            }
        }
    },
    listOrSearchGroup: async (req, res, next) => {
        let apiId = (req.method + req.route.path).toLowerCase();
        let ApiMessages = Messages[apiId];
        try {
            let body = req.body;
            let result = await groupsAccessor.listOrSearchGroup(body);
            let total = await groupsAccessor.countGroup();
            result = Object.assign(ApiMessages.RES_SUCCESS, {
                data: {
                    index: body.index,
                    limit: result.length,
                    total,
                    groupList: result
                }
            });
            req.result = result;
            logger.log({
                level: 'error',
                message: `groupsController-listOrSearchGroup-success`,
            })
            next();
        } catch (err) {
            logger.log({
                level: 'error',
                message: `groupsController-listOrSearchGroup-${err.message}`,
            })
            if (err.isError) {
                req.result = err;
                next();
            } else {
                req.result = ApiMessages.RES_INTERNAL_SERVER_ERR;
                next();
            }
        }
    },
    viewGroup: async (req, res, next) => {
        let apiId = (req.method + req.route.path).toLowerCase();
        let ApiMessages = Messages[apiId];
        try {
            let params = req.params;
            let isValidObejctId = validateObjectId(params._id);
            if (!isValidObejctId) {
                req.result = ApiMessages.RES_INVALID_OBJECT_ID;
                next();
            }
            let groupInfo = await groupsAccessor.viewGroup(params._id);
            if (!groupInfo) {
                req.result = ApiMessages.RES_GROUP_NOT_FOUND;
                next();
            }
            let result = Object.assign(ApiMessages.RES_SUCCESS, { data: { groupInfo } });
            req.result = result;
            logger.log({
                level: 'error',
                message: `groupsController-viewGroup-success`,
            })
            next();
        } catch (err) {
            logger.log({
                level: 'error',
                message: `groupsController-viewGroup-${err.message}`,
            })
            if (err.isError) {
                req.result = err;
                next();
            } else {
                req.result = ApiMessages.RES_INTERNAL_SERVER_ERR;
                next();
            }
        }
    },
    editGroup: async (req, res, next) => {
        let apiId = (req.method + req.route.path).toLowerCase();
        let ApiMessages = Messages[apiId];
        try {
            let params = req.params,
                body = req.body;
            let isValidObejctId = validateObjectId(params._id);
            if (!isValidObejctId) {
                req.result = ApiMessages.RES_INVALID_OBJECT_ID;
                next();
            }
            let groupInfo = await groupsAccessor.viewGroup(params._id);
            if (!groupInfo) {
                req.result = ApiMessages.RES_GROUP_NOT_FOUND;
                next();
            }
            let result = await groupsAccessor.editGroup(params._id, body);
            req.result =  Object.assign(ApiMessages.RES_SUCCESS, { data: { groupInfo: result } });
            logger.log({
                level: 'error',
                message: `groupsController-editGroup-success`,
            })
            next();
        } catch (err) {
            logger.log({
                level: 'error',
                message: `groupsController-editGroup-${err.message}`,
            })
            if (err.isError) {
                req.result = err;
                next();
            } else {
                req.result = ApiMessages.RES_INTERNAL_SERVER_ERR;
                next();
            }
        }
    },
    deleteGroup: async (req, res, next) => {
        let apiId = (req.method + req.route.path).toLowerCase();
        let ApiMessages = Messages[apiId];
        try {
            let params = req.params;
            let isValidObejctId = validateObjectId(params._id);
            if (!isValidObejctId) {
                req.result = ApiMessages.RES_INVALID_OBJECT_ID;
                next();
            }
            let groupInfo = await groupsAccessor.deleteGroup(params._id);
            if (!groupInfo) {
                req.result = ApiMessages.RES_GROUP_NOT_FOUND;
                next();
            }
            req.result = ApiMessages.RES_SUCCESS;
            logger.log({
                level: 'error',
                message: `groupsController-deleteGroup-success`,
            })
            next();
        } catch (err) {
            logger.log({
                level: 'error',
                message: `groupsController-deleteGroup-${err.message}`,
            })
            if (err.isError) {
                req.result = err;
                next();
            } else {
                req.result = ApiMessages.RES_INTERNAL_SERVER_ERR;
                next();
            }
        }
    }
};
export default groupsController;