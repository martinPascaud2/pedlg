const apiErrorMap = require('./apiErrorMap');
const serverErrorMap = require('./serverErrorMap');
const UnmappedError = require('./UnmappedError');

module.exports = {
    serverErrorMap,
    apiErrorMap,
    UnmappedError,
};
