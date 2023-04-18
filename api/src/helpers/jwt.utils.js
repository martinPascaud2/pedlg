const redis = require('redis');
const JWTR = require('jwt-redis').default;

const randtoken = require('rand-token');

if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config(); /* eslint global-require: 0 */
}

const redisClient = redis.createClient({
    host: process.env.REDIS_HOST,
    port: process.env.REDIS_PORT,
});
const jwt = new JWTR(redisClient);

const JTI_MAIL = 'mail';
const JTI_USER = 'user';
const JTI_PASSWORD = 'password';

const { JWT_SIGN_SECRET, JWT_MAIL_SECRET, JWT_RECOVERY_SECRET } = process.env;

const generateToken = (userId, secret, type, expiresIn = '10m') => {
    const jti = `${type}:${userId}`;
    return jwt.sign({ userId, jti }, secret, {
        algorithm: 'HS256',
        expiresIn,
    });
};

const verifyToken = async (authorization, secret) => {
    let userId = null;
    const token = module.exports.parseAuthorization(authorization);
    if (token) {
        try {
            const jwtToken = await jwt.verify(token, secret);
            if (jwtToken !== null) ({ userId } = jwtToken);
        } catch (err) {
            console.error(`${err.name}: ${err.message}`);
        }
    }
    return userId;
};

const destroyToken = (jti) => {
    try {
        jwt.destroy(jti);
    } catch (err) {
        console.error(`${err.name}: ${err.message}`);
    }
};

const JwtTools = {
    parseAuthorization(authorization) {
        return authorization != null
            ? authorization.replace('Bearer ', '')
            : null;
    },

    generateRefreshToken() {
        return randtoken.uid(254);
    },

    generateTokenForUser(id) {
        const secret = JWT_SIGN_SECRET;
        return generateToken(id, secret, JTI_USER);
    },
    generateTokenForMail(id) {
        const secret = JWT_MAIL_SECRET;
        return generateToken(id, secret, JTI_MAIL, '1h');
    },
    generateTokenForRecoveryPassword(id) {
        const secret = JWT_RECOVERY_SECRET;
        return generateToken(id, secret, JTI_PASSWORD, '1h');
    },

    getUserId(authorization) {
        return verifyToken(authorization, JWT_SIGN_SECRET);
    },
    verifyJwtMail(authorization) {
        return verifyToken(authorization, JWT_MAIL_SECRET);
    },
    verifyJwtRecoveryPassword(authorization) {
        return verifyToken(authorization, JWT_RECOVERY_SECRET);
    },

    destroyTokenForUser(userId) {
        const jti = `${JTI_USER}:${userId}`;
        destroyToken(jti);
    },
    destroyTokenForMail(userId) {
        const jti = `${JTI_MAIL}:${userId}`;
        destroyToken(jti);
    },
    destroyTokenForRecoveryPassword(userId) {
        const jti = `${JTI_PASSWORD}:${userId}`;
        destroyToken(jti);
    },
};

module.exports = JwtTools;
