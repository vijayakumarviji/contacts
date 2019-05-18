import {
    Schema,
    model
} from 'mongoose';
import constants from '../../config/constants';

const typeEnum = constants.SchemaUtils.TypeEnum;

const Phone = new Schema({
    phoneNo: String,
    tag: {
        type: String,
        required: true,
        default: typeEnum.WORK,
        enum: [typeEnum.WORK, typeEnum.PERSONAL]
    }
});

const Email = new Schema({
    emailId: String,
    tag: {
        type: String,
        required: true,
        default: typeEnum.WORK,
        enum: [typeEnum.WORK, typeEnum.PERSONAL]
    }
});

const ContactsSchema = new Schema({
    phone: [Phone],
    isActive: {
        type: Boolean,
        default: true
    },
    email: [Email],
    lastContacted: Date,
    name: {
        firstName: {
            type: String,
            required: true
        },
        middleName: String,
        lastName: String
    }
}, {
        collection: 'Contacts',
        timestamps: true
    })

export default model('Contacts', ContactsSchema);