import {
    Schema,
    model
} from 'mongoose';

const GroupSchema = new Schema({
    name: String,
    isActive: {
        type: Boolean,
        default: true
    },
    contactsList: [{
        type: Schema.Types.ObjectId,
        ref: 'Contacts'
    }]
}, {
        collection: 'Groups',
        timestamps: true
    })

export default model('Groups', GroupSchema);