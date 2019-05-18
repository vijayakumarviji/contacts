import _ from 'lodash';
import joi from 'joi';

import { schemas } from '../schemas';
let Schemas = schemas();

const SchemaValidateMiddleWare = {
    requestSchemaValidator: () => {
        const validateOptions = {
            abortEarly: false,
            allowUnknown: true,
            stripUnknown: true
        };
        return (req, res, next) => {
            const route = req.route.path;
            const method = req.method.toLowerCase();
            const schemaPath = method + route;
            if (_.has(Schemas, schemaPath)) {
                const schema = _.get(Schemas, schemaPath);
                const schemaValidations = [];
                if (schema.body)
                    schemaValidations.push(
                        validate(req, 'body', schema.body, validateOptions, 'Request')
                    );
                if (schema.params)
                    schemaValidations.push(
                        validate(req, 'params', schema.params, validateOptions, 'Request')
                    );
                if (schema.query)
                    schemaValidations.push(
                        validate(req, 'query', schema.query, validateOptions, 'Request')
                    );
                Promise.all(schemaValidations)
                    .then(() => {
                        next();
                    })
                    .catch(err => {
                        res.status(err.responseCode).json(err)
                    });
            } else {
                next();
            }
        }
    },
    responseSchemaValidator: () => {
        const validateOptions = {
            abortEarly: false,
            allowUnknown: true,
            stripUnknown: true
        };
        return async (req, res, next) => {
            const route = req.route.path;
            const method = req.method.toLowerCase();
            const schemaPath = method + route;
            if (_.has(Schemas, schemaPath)) {
                const schema = _.get(Schemas, schemaPath);
                try {
                    let validatedResponse = req.result;
                    if (schema.response)
                        validatedResponse = await validate({ result: JSON.parse(JSON.stringify(req.result)) }, 'result', schema.response, validateOptions, 'Response');
                    res.send(validatedResponse);
                } catch (err) {
                    res.status(err.responseCode).json(err)
                }
            } else {
                console.log(req.result)
                res.send(req.result);
            }
        }
    }
};

const validate = (req, key, schema, validateOptions, requestType) => new Promise((resolve, reject) => {
    joi.validate(
        req[key],
        schema,
        validateOptions,
        (err, validatedResponse) => {
            if (!err) {
                if (requestType == 'Response') {
                    resolve(validatedResponse);
                } else {
                    req[key] = validatedResponse;
                    resolve();
                }
            } else {
                logger.log({
                    level: 'error',
                    message: `${requestType}-validate-${err.message}`,
                })
                reject({
                    responseCode: 400,
                    responseMessageCode: `BadRequest${requestType}ValidationFailed`,
                    responseMessage: `${requestType} Validation Failed`
                });
            }
        }
    );
});

export default SchemaValidateMiddleWare;