
import joi from 'joi';

export const status = joi.object().keys({
    responseCode: joi.number().min(199).required(),
    responseMessageCode: joi.string().required(),
    responseMessage: joi.string().required()
}).label('Status');