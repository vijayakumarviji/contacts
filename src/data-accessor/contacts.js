import ContactsModel from '../models/contacts';
import _ from 'lodash';

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
    viewContact: (_id) => new Promise(async (resolve, reject) => {
        try {
            let result = await ContactsModel.findById(_id);
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
            let result = await ContactsModel.findByIdAndUpdate(_id, data, { new: true });
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
}

export default contactsAccessor;