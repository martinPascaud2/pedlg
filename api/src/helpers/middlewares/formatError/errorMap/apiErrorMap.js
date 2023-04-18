const { extendMapItem } = require('apollo-error-converter');
const { InvalidFields, ApiError, UserError } = require('./mapItem');

const schemaFormatErrors = (validationError) => {
    const { errors } = validationError;
    if (!errors) return [];
    const fields = errors.map((errorItem) => {
        const {
            path, message, type, validatorArgs, id,
        } = errorItem;
        return {
            path,
            message,
            type,
            validatorArgs,
            id,
        };
    });
    return fields;
};

const apiErrorMap = {
    SequelizeValidationError: extendMapItem(InvalidFields, {
        data: schemaFormatErrors,
    }),
    SequelizeUniqueConstraintError: extendMapItem(InvalidFields, {
        data: schemaFormatErrors,
    }),
    ValidationError: extendMapItem(InvalidFields, {
        data: schemaFormatErrors,
    }),
    UserError: extendMapItem(UserError, {
        data: schemaFormatErrors,
    }),
    ApiError: extendMapItem(ApiError, {
        data: schemaFormatErrors,
    }),
};

module.exports = apiErrorMap;
