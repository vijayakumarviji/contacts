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
                        validate(req, 'body', schema.body, validateOptions)
                    );
                if (schema.params)
                    schemaValidations.push(
                        validate(req, 'params', schema.params, validateOptions)
                    );
                if (schema.query)
                    schemaValidations.push(
                        validate(req, 'query', schema.query, validateOptions)
                    );
                Promise.all(schemaValidations)
                    .then(() => {
                        next();
                    })
                    .catch(err => {
                        next(err);
                    });
            } else {
                next();
            }
        }
    }
};

const validate = (req, key, schema, validateOptions) => new Promise((resolve, reject) => {
    joi.validate(
        req[key],
        schema,
        validateOptions,
        (err, validatedResponse) => {
            if (!err) {
                req[key] = validatedResponse;
                resolve();
            } else {
                Logger.error(
                    'error',
                    'schemaValidator',
                    'validate',
                    'validate Error',
                    err
                );
                reject(err);
            }
        }
    );
});

export default SchemaValidateMiddleWare;