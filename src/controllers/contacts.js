import { MessageIndexer } from '../messages';
const Messages = MessageIndexer();

import contactsAccessor from '../data-accessor/contacts';
import { validateObjectId } from '../data-accessor/common';

const contactsController = {
    createContact: async (req, res, next) => {
        let apiId = (req.method + req.route.path).toLowerCase();
        let ApiMessages = Messages[apiId];
        try {
            let body = req.body;
            let result = await contactsAccessor.createContact(body);
            result = Object.assign({ data: { contactInfo: result } }, ApiMessages.RES_SUCCESS);
            req.result = result;
            logger.log({
                level: 'error',
                message: `contactsController-createContact-success`,
            })
            next();
        } catch (err) {
            logger.log({
                level: 'error',
                message: `contactsController-createContact-${err.message}`,
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
    listOrSearchContact: async (req, res, next) => {
        let apiId = (req.method + req.route.path).toLowerCase();
        let ApiMessages = Messages[apiId];
        try {
            let body = req.body;
            let result = await contactsAccessor.listOrSearchContact(body);
            let total = await contactsAccessor.countContact();
            result = Object.assign(ApiMessages.RES_SUCCESS, {
                data: {
                    index: body.index,
                    limit: result.length,
                    total,
                    contactList: result
                }
            });
            req.result = result;
            logger.log({
                level: 'error',
                message: `contactsController-listOrSearchContact-success`,
            })
            next();
        } catch (err) {
            logger.log({
                level: 'error',
                message: `contactsController-listOrSearchContact-${err.message}`,
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
    viewContact: async (req, res, next) => {
        let apiId = (req.method + req.route.path).toLowerCase();
        let ApiMessages = Messages[apiId];
        try {
            let params = req.params;
            let isValidObejctId = validateObjectId(params._id);
            if (!isValidObejctId) {
                req.result = ApiMessages.RES_INVALID_OBJECT_ID;
                next();
            }
            let contactInfo = await contactsAccessor.viewContact(params._id);
            if (!contactInfo) {
                req.result = ApiMessages.RES_CONTACT_NOT_FOUND;
                next();
            }
            let result = Object.assign(ApiMessages.RES_SUCCESS, { data: { contactInfo } })
            req.result = result;
            logger.log({
                level: 'error',
                message: `contactsController-viewContact-success`,
            })
            next();
        } catch (err) {
            logger.log({
                level: 'error',
                message: `contactsController-viewContact-${err.message}`,
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
    editContact: async (req, res, next) => {
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
            let contactInfo = await contactsAccessor.viewContact(params._id);
            if (!contactInfo) {
                req.result = ApiMessages.RES_CONTACT_NOT_FOUND;
                next();
            }
            let result = await contactsAccessor.editContact(params._id, body);
            req.result = ApiMessages.RES_SUCCESS;
            logger.log({
                level: 'error',
                message: `contactsController-editContact-success`,
            })
            next();
        } catch (err) {
            logger.log({
                level: 'error',
                message: `contactsController-editContact-${err.message}`,
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
    deleteContact: async (req, res, next) => {
        let apiId = (req.method + req.route.path).toLowerCase();
        let ApiMessages = Messages[apiId];
        try {
            let params = req.params;
            await contactsAccessor.deleteContact(params._id);
            let result = ApiMessages.RES_SUCCESS;
            req.result = result;
            logger.log({
                level: 'error',
                message: `contactsController-deleteContact-success`,
            })
            next();
        } catch (err) {
            logger.log({
                level: 'error',
                message: `contactsController-deleteContact-${err.message}`,
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
export default contactsController;