
import joi from 'joi';

export const status = joi.object().keys({
    responseCode: joi.number().min(199).required(),
    responseMessageCode: joi.string().required(),
    responseMessage: joi.string().required()
}).label('Status');

export const listOrSearchBasicRequest = joi.object().keys({
    index: joi.number().default(0),
    limit: joi.number().default(10),
    searchValue: joi.string()
}).label('ListOrSearchBasicRequest');