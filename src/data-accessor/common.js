import mongoose from 'mongoose';
import _ from 'lodash';

var ObjectId = mongoose.Types.ObjectId;

export const validateObjectId = (_id) => ObjectId.isValid(_id);

export const getAddedItems = (data) => {
    let lineItems = _.filter(data, function (lineItem) {
        return (!lineItem.isDeleted && !lineItem._id);
    });
    return {
        lineItems
    }
}
export const getEditedItems = (data) => {
    let lineItems = _.filter(data, function (lineItem) {
        return (!lineItem.isDeleted && lineItem._id);
    });
    return {
        _ids: _.map(lineItems, '_id'),
        lineItems
    }
}
export const getDeletedItems = (data) => {
    let lineItems = _.filter(data, function (lineItem) {
        return lineItem.isDeleted;
    });
    return {
        _ids: _.map(lineItems, '_id')
    }
}