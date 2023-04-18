const { ApolloErrorConverter } = require('apollo-error-converter');
const { apiErrorMap, serverErrorMap, UnmappedError } = require('./errorMap');

// Fallback used for processing unmapped Errors
const fallback = {
    code: 'INTERNAL_SERVER_ERROR',
    message: 'Internal Server Error',
    data: UnmappedError,
};

const formatError = new ApolloErrorConverter({
    errorMap: [apiErrorMap, serverErrorMap],
    fallback,
});

module.exports = formatError;
