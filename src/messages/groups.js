import {
    buildResponseMessage
} from '../utils/utilities';

const CREATE_GROUP = {
    RES_SUCCESS: buildResponseMessage('Ok','Ok', 200),
    RES_INTERNAL_SERVER_ERR: buildResponseMessage('Internal Server Error', 'InternalServerError', 500),
    RES_CUSTOM_ERROR: buildResponseMessage
};

const LIST_GROUP = {
    RES_SUCCESS: buildResponseMessage('Ok','Ok', 200),
    RES_INTERNAL_SERVER_ERR: buildResponseMessage('Internal Server Error', 'InternalServerError', 500),
    RES_CUSTOM_ERROR: buildResponseMessage
};

const VIEW_GROUP = {
    RES_SUCCESS: buildResponseMessage('Ok','Ok', 200),
    RES_GROUP_NOT_FOUND: buildResponseMessage('Group Not Found', 'GroupNotFound', 404),
    RES_INVALID_OBJECT_ID: buildResponseMessage('Bad Request - Invalid ObjectId', 'BadRequestInvalidObjectId', 400),
    RES_INTERNAL_SERVER_ERR: buildResponseMessage('Internal Server Error', 'InternalServerError', 500),
    RES_CUSTOM_ERROR: buildResponseMessage
};

const EDIT_GROUP = {
    RES_SUCCESS: buildResponseMessage('Ok','Ok', 200),
    RES_GROUP_NOT_FOUND: buildResponseMessage('Group Not Found', 'GroupNotFound', 404),
    RES_INVALID_OBJECT_ID: buildResponseMessage('Bad Request - Invalid ObjectId', 'BadRequestInvalidObjectId', 400),
    RES_INTERNAL_SERVER_ERR: buildResponseMessage('Internal Server Error', 'InternalServerError', 500),
    RES_CUSTOM_ERROR: buildResponseMessage
};

const DELETE_GROUP = {
    RES_SUCCESS: buildResponseMessage('Ok','Ok', 200),
    RES_GROUP_NOT_FOUND: buildResponseMessage('Group Not Found', 'GroupNotFound', 404),
    RES_INVALID_OBJECT_ID: buildResponseMessage('Bad Request - Invalid ObjectId', 'BadRequestInvalidObjectId', 400),
    RES_INTERNAL_SERVER_ERR: buildResponseMessage('Internal Server Error', 'InternalServerError', 500),
    RES_CUSTOM_ERROR: buildResponseMessage
};

export default {
    'post/group': CREATE_GROUP,
    'post/group/list': LIST_GROUP,
    'get/group/:_id': VIEW_GROUP,
    'put/group/:_id': EDIT_GROUP,
    'delete/group/:_id': DELETE_GROUP
}