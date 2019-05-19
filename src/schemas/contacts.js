import joi from 'joi';
import Constants from '../../config/constants';
import { status, listOrSearchBasicRequest } from './common';

const _id = joi.any();

const tag = joi.string()
    .default(Constants.SchemaUtils.TypeEnum.WORK)
    .valid(Constants.SchemaUtils.TypeEnum.WORK, Constants.SchemaUtils.TypeEnum.PERSONAL);

const name = joi.object().keys({
    firstName: joi.string().required(),
    middleName: joi.string(),
    lastName: joi.string()
}).label('Name');

const emailInfo = joi.object().keys({
    emailId: joi.string().email().required(),
    tag
});
const phoneInfo = joi.object().keys({
    phoneNo: joi.string().required(),
    tag
});

const email = joi.array().items(emailInfo).label('Email');

const phone = joi.array().items(phoneInfo).label('Phone');

const emailWithIdRequest = joi.array().items(emailInfo.concat(joi.object().keys({ _id ,isDeleted: joi.boolean().default(false)}))).label('Email');
const phoneWithIdRequest = joi.array().items(phoneInfo.concat(joi.object().keys({ _id ,isDeleted: joi.boolean().default(false)}))).label('Phone');

const emailWithId = joi.array().items(emailInfo.concat(joi.object().keys({ _id }))).label('Email');
const phoneWithId = joi.array().items(phoneInfo.concat(joi.object().keys({ _id }))).label('Phone');

const contactInfo = joi.object().keys({
    _id,
    name,
    email: emailWithId,
    phone: phoneWithId,
    isActive: joi.boolean().default(true)
}).label('ContactInfo');

// Create Contact API Schema
const createContactRequest = joi.object().keys({
    name,
    email,
    phone
}).label('CreateContact')
const createContactResponse = status.concat(joi.object().keys({
    data: joi.object().keys({
        contactInfo
    })
})).label('CreateContactResponse');

// ListOrSearch Contact API Schema
const listOrSearchContactRequestPayload = listOrSearchBasicRequest.label('ListOrSearchContactRequestPayload');
const listOrSearchContactResponse = status.concat(joi.object().keys({
    data: joi.object().keys({
        total: joi.number().default(0),
        contactList: joi.array().items(contactInfo)
    }).concat(listOrSearchBasicRequest)
})).label('ListOrSearchContactResponse');

// Get Contact API Schema
const viewContactRequestParams = joi.object().keys({
    _id: joi.string().required() 
}).label('ViewContactRequestParams');
const viewContactResponse = status.concat(joi.object().keys({
    data: joi.object().keys({
        contactInfo
    })
})).label('ViewContactResponse')

// Edit Contact API Schema
const editContactRequestParams = joi.object().keys({
    _id: joi.string().required() 
}).label('EditContactRequestParams');
const editContactRequestPayload = joi.object().keys({
    name,
    email: emailWithIdRequest,
    phone: phoneWithIdRequest
}).label('EditContactRequestPayload');
const editContactResponse = status.concat(joi.object().keys({
    data: joi.object().keys({
        contactInfo
    })
})).label('EditContactResponse')

// Delete Contact API Schema
const deleteContactRequestParams = joi.object().keys({
    _id: joi.string().required() 
}).label('DeleteContactRequestParams');
const deleteContactResponse = status.label('DeleteContactResponse')

export default {
    'post/contact': {
        body: createContactRequest,
        response: createContactResponse
    },
    'post/contact/list': {
        body: listOrSearchContactRequestPayload,
        response: listOrSearchContactResponse
    },
    'get/contact/:_id': {
        params: viewContactRequestParams,
        response: viewContactResponse
    },
    'put/contact/:_id': {
        params: editContactRequestParams,
        body: editContactRequestPayload,
        response: editContactResponse
    },
    'delete/contact/:_id': {
        params: deleteContactRequestParams,
        response: deleteContactResponse
    }
};