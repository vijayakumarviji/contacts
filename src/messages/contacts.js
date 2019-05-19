import {
    buildResponseMessage
} from '../utils/utilities';

const CREATE_CONTACT = {
    RES_SUCCESS: buildResponseMessage('Ok','Ok', 200),
    RES_INTERNAL_SERVER_ERR: buildResponseMessage('Internal Server Error', 'InternalServerError', 500),
    RES_CUSTOM_ERROR: buildResponseMessage
};

const LIST_CONTACT = {
    RES_SUCCESS: buildResponseMessage('Ok','Ok', 200),
    RES_INTERNAL_SERVER_ERR: buildResponseMessage('Internal Server Error', 'InternalServerError', 500),
    RES_CUSTOM_ERROR: buildResponseMessage
};

const VIEW_CONTACT = {
    RES_SUCCESS: buildResponseMessage('Ok','Ok', 200),
    RES_CONTACT_NOT_FOUND: buildResponseMessage('Contact Not Found', 'ContactNotFound', 404),
    RES_INVALID_OBJECT_ID: buildResponseMessage('Bad Request - Invalid ObjectId', 'BadRequestInvalidObjectId', 400),
    RES_INTERNAL_SERVER_ERR: buildResponseMessage('Internal Server Error', 'InternalServerError', 500),
    RES_CUSTOM_ERROR: buildResponseMessage
};

const EDIT_CONTACT = {
    RES_SUCCESS: buildResponseMessage('Ok','Ok', 200),
    RES_CONTACT_NOT_FOUND: buildResponseMessage('Contact Not Found', 'ContactNotFound', 404),
    RES_INVALID_OBJECT_ID: buildResponseMessage('Bad Request - Invalid ObjectId', 'BadRequestInvalidObjectId', 400),
    RES_INTERNAL_SERVER_ERR: buildResponseMessage('Internal Server Error', 'InternalServerError', 500),
    RES_CUSTOM_ERROR: buildResponseMessage
};

const DELETE_CONTACT = {
    RES_SUCCESS: buildResponseMessage('Ok','Ok', 200),
    RES_INTERNAL_SERVER_ERR: buildResponseMessage('Internal Server Error', 'InternalServerError', 500),
    RES_CUSTOM_ERROR: buildResponseMessage
};

export default {
    'post/contact': CREATE_CONTACT,
    'post/contact/list': LIST_CONTACT,
    'get/contact/:_id': VIEW_CONTACT,
    'put/contact/:_id': EDIT_CONTACT,
    'delete/contact/:_id': DELETE_CONTACT
}