import _ from 'lodash';

import { getAddedItems, getEditedItems, getDeletedItems } from './common';
import ContactsModel from '../models/contacts';


const contactsAccessor = {
    createContact: (data) => new Promise(async (resolve, reject) => {
        try {
            let newContact = new ContactsModel(data);
            let contactInfo = await newContact.save();
            logger.log({
                level: 'info',
                message: 'contactsAccessor-createContact-Success',
            })
            resolve(contactInfo);
        } catch (err) {
            logger.log({
                level: 'error',
                message: `contactsAccessor-createContact-${err.message}`,
            })
            reject(err);
        }
    }),
    listOrSearchContact: (data = {}) => new Promise(async (resolve, reject) => {
        try {
            let index = data.index || 0,
                limit = data.limit || 10,
                criteria = {
                    isActive: data.isActive || true
                };
            if (data.searchValue)
                criteria = buildSearchQuery(data.searchValue);
            let result = await ContactsModel.find(criteria)
                .sort({
                    lastContacted: -1,
                    createdAt: 1
                })
                .limit(limit)
                .skip(index)
            logger.log({
                level: 'info',
                message: 'contactsAccessor-listOrSearchContact-Success',
            })
            resolve(result);
        } catch (err) {
            logger.log({
                level: 'error',
                message: `contactsAccessor-listOrSearchContact-${err.message}`,
            })
            reject(err);
        }
    }),
    countContact: (data = {}) => new Promise(async (resolve, reject) => {
        try {
            let criteria = {
                isActive: data.isActive || true
            };
            if (data.searchValue)
                criteria = buildSearchQuery(data.searchValue);
            let result = await ContactsModel.countDocuments(criteria);
            resolve(result)
        } catch (err) {
            logger.log({
                level: 'error',
                message: `contactsAccessor-countContact-${err.message}`,
            })
            reject(err);
        }
    }),
    viewContact: (_id) => new Promise(async (resolve, reject) => {
        try {
            let result = await ContactsModel.findOne({ _id, isActive: true });
            logger.log({
                level: 'info',
                message: 'contactsAccessor-viewContact-Success',
            })
            resolve(result);
        } catch (err) {
            logger.log({
                level: 'error',
                message: `contactsAccessor-viewContact-${err.message}`,
            })
            reject(err);
        }
    }),
    editContact: (_id, data) => new Promise(async (resolve, reject) => {
        try {
            let doUpdate = false;;
            let criteria = {
                _id
            };

            const updateData = {
            };
            if (data.name) {
                doUpdate = true;
                updateData.name = data.name;
            }
            if (data.email) {
                let addedItems = getAddedItems(data.email);
                if (addedItems.lineItems && addedItems.lineItems.length) {
                    doUpdate = true;
                    updateData['$push'] = updateData['$push'] || {};
                    updateData['$push'].email = {
                        $each: addedItems.lineItems
                    };
                }
            }
            if (data.phone) {
                let addedItems = getAddedItems(data.phone);
                if (addedItems.lineItems && addedItems.lineItems.length) {
                    doUpdate = true;
                    updateData['$push'] = updateData['$push'] || {};
                    updateData['$push'].phone = {
                        '$each': addedItems.lineItems
                    };
                }
            } 
            let result = {};
            if (doUpdate) {
                result = await ContactsModel.updateOne(criteria, updateData, { new: true });
                delete updateData['$push']
            }

            if (data.email) {
                let deletedItems = getDeletedItems(data.email);
                if (deletedItems._ids && deletedItems._ids.length) {
                    doUpdate = true;
                    updateData['$pull'] = updateData['$pull'] || {};
                    updateData['$pull'].email = {
                        _id: {
                            $in: deletedItems._ids
                        }
                    };
                }
            }
            if (data.phone) {
                let deletedItems = getDeletedItems(data.phone);
                if (deletedItems._ids && deletedItems._ids.length) {
                    doUpdate = true;
                    updateData['$pull'] = updateData['$pull'] || {};
                    updateData['$pull'].phone = {
                        _id: {
                            $in: deletedItems._ids
                        }
                    };
                }
            }
            if (doUpdate)
                result = await ContactsModel.updateOne(criteria, updateData, { new: true });
            
            if(data.email) {
                let editedItems = getEditedItems(data.email);
                _.each(editedItems.lineItems, async (lineItem)=>{
                    let criteria = {
                        _id,
                        email: {
                            $elemMatch: {
                                _id: lineItem._id
                            }
                        }
                    };
        
                    const updateData = { $set: { "email.$" : lineItem } };
                    result = await ContactsModel.updateOne(criteria, updateData, { new: true });
                })
            }
            if(data.phone) {
                let editedItems = getEditedItems(data.phone);
                _.each(editedItems.lineItems, async (lineItem)=>{
                    let criteria = {
                        _id,
                        phone: {
                            $elemMatch: {
                                _id: lineItem._id
                            }
                        }
                    };
        
                    const updateData = { $set: { "phone.$" : lineItem } };
                    result = await ContactsModel.updateOne(criteria, updateData, { new: true });
                })
            }
            logger.log({
                level: 'info',
                message: 'contactsAccessor-editContact-Success',
            })
            resolve(result);
        }
        catch (err) {
            logger.log({
                level: 'error',
                message: `contactsAccessor-editContact-${err.message}`,
            })
            reject(err);
        }
    }),
    deleteContact: (_id) => new Promise(async (resolve, reject) => {
        try {
            let result = await ContactsModel.findByIdAndUpdate(_id, { isActive: false }, { new: true });
            logger.log({
                level: 'info',
                message: 'contactsAccessor-deleteContact-Success',
            })
            resolve(result);
        }
        catch (err) {
            logger.log({
                level: 'error',
                message: `contactsAccessor-deleteContact-${err.message}`,
            })
            reject(err);
        }
    })
};

const buildSearchQuery = (searchValue) => {
    let criteria = [];
    let searchKeys = [
        {
            key: "name.firstName",
            isArrayElement: false
        }, {
            key: "name.middleName",
            isArrayElement: false
        }, {
            key: "name.lastName",
            isArrayElement: false
        }, {
            path: "phone",
            key: "phoneNo",
            isArrayElement: true
        }, {
            path: "email",
            key: "emailId",
            isArrayElement: true
        }
    ]
    _.each(searchKeys, (searchKey) => {
        if (searchKey.isArrayElement) {
            criteria.push({
                [path]: {
                    $elemMatch: {
                        [key]: new RegExp("^" + '.*' + searchValue + '.*', "i")
                    }
                }
            })
        } else {
            criteria.push({
                [searchKey]: new RegExp("^" + '.*' + searchValue + '.*', "i")
            })
        }
    })
    return { '$or': criteria };
};

export default contactsAccessor;