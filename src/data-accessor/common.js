import mongoose from 'mongoose';

var ObjectId = mongoose.Types.ObjectId;

export const validateObjectId = (_id) => ObjectId.isValid(_id);