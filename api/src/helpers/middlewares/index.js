const {
    isAuthenticate,
    isValidJwtPass,
    isValidJwtMail,
} = require('./authorization');
const formatError = require('./formatError');
const loadStrategyOAuth = require('./loadStrategyOAuth');

module.exports = {
    formatError,
    isAuthenticate,
    isValidJwtPass,
    isValidJwtMail,
    loadStrategyOAuth,
};
