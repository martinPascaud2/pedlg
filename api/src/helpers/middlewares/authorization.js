const {
    getUserId,
    parseAuthorization,
    verifyJwtRecoveryPassword,
    verifyJwtMail,
} = require('../jwt.utils');

const { error } = require('../../constante');

const ApiError = require('../ApiError');

const isAuthenticate = async ({ req }, cb) => {
    const { authorization } = req.headers || '';
    const token = parseAuthorization(authorization);
    const idUser = await getUserId(token);
    if (!idUser) throw new ApiError(error.auth.AUTHENTICATION);
    return cb(idUser);
};

const isAuthSubcription = async ({ variables: { token } }, cb) => {
    const idUser = await getUserId(token);

    if (!idUser) throw new ApiError(error.auth.AUTHENTICATION);
    return cb(idUser);
};

const isValidJwtPass = async (params, cb) => {
    const { token, guard } = params || '';
    const idUser = await verifyJwtRecoveryPassword(token);
    if (idUser && guard) return true;
    if (!idUser) throw new ApiError(error.auth.AUTHORIZATION);
    return cb(idUser);
};

const isValidJwtMail = async (params, cb) => {
    const { token } = params || '';
    const idUser = await verifyJwtMail(token);
    if (!idUser) throw new ApiError(error.auth.AUTHORIZATION);
    return cb(idUser);
};

module.exports = {
    isAuthenticate,
    isValidJwtPass,
    isValidJwtMail,
    isAuthSubcription,
};
