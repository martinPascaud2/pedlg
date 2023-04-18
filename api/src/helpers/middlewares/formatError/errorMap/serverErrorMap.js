const { extendMapItem } = require('apollo-error-converter');
const { UnsentMail } = require('./mapItem');

const formatMailError = (mailError) => {
    const { message, code } = mailError;
    if (!message) return [];
    return [{ message, type: code }];
};

const serverErrorMap = {
    EENVELOPE: extendMapItem(UnsentMail, { data: formatMailError }),
    ENOTFOUND: extendMapItem(UnsentMail, { data: formatMailError }),
};

module.exports = serverErrorMap;
