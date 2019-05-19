import _ from 'lodash';

import GroupsModel from '../models/group';
import { getDeletedItems } from './common';

const groupsAccessor = {
    createGroup: (data) => new Promise(async (resolve, reject) => {
        try {
            let newGroup = new GroupsModel(data);
            let groupInfo = await newGroup.save();
            logger.log({
                level: 'info',
                message: 'groupsAccessor-createGroup-Success',
            })
            resolve(groupInfo);
        } catch (err) {
            logger.log({
                level: 'error',
                message: `groupsAccessor-createGroup-${err.message}`,
            })
            reject(err);
        }
    }),
    listOrSearchGroup: (data = {}) => new Promise(async (resolve, reject) => {
        try {
            let index = data.index || 0,
                limit = data.limit || 10,
                criteria = {
                    isActive: data.isActive || true
                };
            if (data.searchValue)
                criteria = buildSearchQuery(data.searchValue);
            let result = await GroupsModel.find(criteria)
                .sort({
                    createdAt: 1
                })
                .populate('contactsList', 'name')
                .limit(limit)
                .skip(index)
            logger.log({
                level: 'info',
                message: 'groupsAccessor-listOrSearchGroup-Success',
            })
            resolve(result);
        } catch (err) {
            logger.log({
                level: 'error',
                message: `groupsAccessor-listOrSearchGroup-${err.message}`,
            })
            reject(err);
        }
    }),
    countGroup: (data = {}) => new Promise(async (resolve, reject) => {
        try {
            let criteria = {
                isActive: data.isActive || true
            };
            if (data.searchValue)
                criteria = buildSearchQuery(data.searchValue);
            let result = await GroupsModel.countDocuments(criteria);
            logger.log({
                level: 'info',
                message: 'groupsAccessor-countGroup-Success',
            })
            resolve(result)
        } catch (err) {
            logger.log({
                level: 'error',
                message: `groupsAccessor-countGroup-${err.message}`,
            })
            reject(err);
        }
    }),
    viewGroup: (_id) => new Promise(async (resolve, reject) => {
        try {
            let result = await GroupsModel.findOne({ _id, isActive: true }).populate('contactsList', 'name');
            logger.log({
                level: 'info',
                message: 'groupsAccessor-viewGroup-Success',
            })
            resolve(result);
        } catch (err) {
            logger.log({
                level: 'error',
                message: `groupsAccessor-viewGroup-${err.message}`,
            })
            reject(err);
        }
    }),
    editGroup: (_id, data) => new Promise(async (resolve, reject) => {
        try {
            let doUpdate = false;;
            let criteria = {
                _id
            };
            const updateData = {};
            if (data.name) {
                doUpdate = true;
                updateData.name = data.name;
            }
            if (data.contactsList) {
                let addedItems = getAddedItems(data.contactsList);
                console.log(addedItems)
                if (addedItems.lineItems && addedItems.lineItems.length) {
                    doUpdate = true;
                    updateData['$push'] = updateData['$push'] || {};
                    updateData['$push'].contactsList = {
                        $each: addedItems.lineItems
                    };
                }
            }

            let result = {};
            if (doUpdate) {
                result = await GroupsModel.findOneAndUpdate(criteria, updateData, { new: true })
                    .populate('contactsList', 'name');
                console.log(criteria, updateData)
                delete updateData['$push']
            }

            if (data.contactsList) {
                let deletedItems = getDeletedItems(data.contactsList);
                console.log('---',deletedItems)
                if (deletedItems._ids && deletedItems._ids.length) {
                    doUpdate = true;
                    updateData['$pull'] = updateData['$pull'] || {};
                    updateData['$pull'].contactsList = {
                            $in: deletedItems._ids
                    };
                }
            }
            if (doUpdate)
                result = await GroupsModel.findOneAndUpdate(criteria, updateData, { new: true })
                    .populate('contactsList', 'name');
            logger.log({
                level: 'info',
                message: 'groupsAccessor-editGroup-Success',
            })
            resolve(result);
        }
        catch (err) {
            logger.log({
                level: 'error',
                message: `groupsAccessor-editGroup-${err.message}`,
            })
            reject(err);
        }
    }),
    deleteGroup: (_id) => new Promise(async (resolve, reject) => {
        try {
            let result = await GroupsModel.findByIdAndUpdate(_id, { isActive: false }, { new: true });
            logger.log({
                level: 'info',
                message: 'groupsAccessor-deleteGroup-Success',
            })
            resolve(result);
        }
        catch (err) {
            logger.log({
                level: 'error',
                message: `groupsAccessor-deleteGroup-${err.message}`,
            })
            reject(err);
        }
    })
};

const buildSearchQuery = (searchValue) => {
    let criteria = [];
    let searchKeys = [
        {
            key: "name",
            isArrayElement: false
        }
    ]
    _.each(searchKeys, (searchKey) => {
        criteria.push({
            [searchKey]: new RegExp("^" + '.*' + searchValue + '.*', "i")
        })
    })
    return { '$or': criteria };
};

export const getAddedItems = (data) => {
    let lineItems = _.filter(data, function (lineItem) {
        return !lineItem.isDeleted;
    });
    return {
        lineItems
    }
}

export default groupsAccessor;