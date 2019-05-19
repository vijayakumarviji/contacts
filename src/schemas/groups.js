import joi from 'joi';
import { status, listOrSearchBasicRequest } from './common';
import { name } from './contacts';

let _id = joi.any();

let contact = joi.object().keys({
    _id
}).label('Contact')

let groupInfoRequest = joi.object().keys({
    name: joi.string().required(),
    contactsList: joi.array().items(contact)
});

let groupInfo = joi.object().keys({
    _id,
    name: joi.string().required(),
    contactsList: joi.array().items(contact.concat(joi.object().keys({
        name
    })))
});

// Create Group API Schema
const createGroupRequestBody = groupInfoRequest.label('CreateGroupRequest')
const createGroupResponse = status.label('CreateGroupResponse');

//List Group API Schema
const listOrSearchGroupRequestBody = listOrSearchBasicRequest.label('ListGroupRequestBody')
const listOrSearchGroupResponse = status.concat(joi.object().keys({
    data: joi.object().keys({
        groupList: joi.array().items(groupInfo)
    })
})).label('ListGroupResponse');

// Get Group API Schema
const viewGroupRequestParams = joi.object().keys({
    _id
}).label('ViewGroupRequest')
const viewGroupResponse = status.concat(joi.object().keys({
    data: joi.object().keys({
        groupInfo
    })
})).label('CreateGroupResponse');

// Edit Group API Schema
const editGroupRequestParams = joi.object().keys({
    _id
}).label('EditGroupRequestParams');
const editGroupRequestPayload = joi.object().keys({
    name: joi.string(),
    contactsList: joi.array().items(contact.concat(joi.object().keys({
        isDeleted: joi.boolean().default(false)
    })))
}).label('EditGroupRequestParams');
const editGroupResponse = status.concat(joi.object().keys({
    data: joi.object().keys({
        groupInfo
    })
})).label('EditGroupResponse');

// Delete Group API Schema
const deleteGroupRequestParams = joi.object().keys({
    _id
}).label('DeleteGroupRequestParams');
const deleteGroupResponse = status.label('DeleteGroupResponse');

export default {
    'post/group': {
        body: createGroupRequestBody,
        response: createGroupResponse
    },
    'post/group/list' : {
        body: listOrSearchGroupRequestBody,
        response: listOrSearchGroupResponse
    },
    'get/group/:_id': {
        params: viewGroupRequestParams,
        response: viewGroupResponse
    },
    'put/group/:_id': {
        params: editGroupRequestParams,
        body: editGroupRequestPayload,
        response: editGroupResponse
    },
    'delete/group/:_id' : {
        params: deleteGroupRequestParams,
        response: deleteGroupResponse
    }
};