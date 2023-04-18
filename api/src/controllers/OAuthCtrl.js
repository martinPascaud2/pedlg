const passport = require('passport');
const { Op } = require('sequelize');

const JwtTools = require('../helpers/jwt.utils');
const ApiError = require('../helpers/ApiError');
const { error } = require('../constante');

const { User, Session } = require('../../models');

const { CLIENT_URL } = process.env;

const facebookAuth = passport.authenticate('facebook', {
    failureRedirect: `${CLIENT_URL}/inscription`,
});

const googleAuth = passport.authenticate('google', {
    failureRedirect: `${CLIENT_URL}/inscription`,
});

const generateUsername = async (name) => {
    const splitName = name.split(' ');
    let username = splitName[0];
    let count = -1;
    let nbr = 0;

    username = username.toLowerCase().substr(0, 13);
    /* eslint-disable no-await-in-loop */
    while (count) {
        const tmp = username.concat('', nbr || '');
        count = await User.count({ where: { username: tmp } });
        if (!count) username = username.concat('', nbr || '');
        nbr += 1;
    }
    /* eslint-enable no-await-in-loop */
    return username;
};

const login = async ({ email }, res) => {
    const user = await User.findOne({
        where: { email },
        include: ['session', 'userMetadata'],
    });

    if (!user) {
        throw new ApiError(error.user.FOUND, {
            type: 'ValidationError',
            path: 'email',
        });
    }
    const { id } = user;
    const token = await JwtTools.generateTokenForUser(id);

    const refreshToken = await JwtTools.generateRefreshToken();
    const session = await Session.create({
        refreshToken,
        userId: id,
    });

    if (!session) throw new ApiError(error.session.ERROR);
    res.cookie('refreshToken', refreshToken, {
        httpOnly: true,
        domain: process.env.CLIENT_DOMAIN,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'strict',
    });

    user.online = true;
    user.lastLogin = new Date();
    await user.save({ fields: ['online', 'lastLogin'] });

    return { user, token };
};

const createUser = async (params) => {
    const user = await User.create(
        { ...params, register: true },
        { include: 'userMetadata' },
    );

    await user.createUserMetadata();
    await user.reload();

    return user;
};

const setUserInfos = async (req) => {
    const { user } = req;
    const {
        provider, emails, displayName, id,
    } = user;
    const email = emails && emails[0] && emails[0].value;
    const username = await generateUsername(displayName);
    return {
        hasPassword: false,
        providerId: id,
        username,
        provider,
        email,
    };
};

const providerCallback = async (req, res) => {
    const defaults = await setUserInfos(req);
    const { providerId, provider } = defaults;

    try {
        const user = await User.findOne({
            where: {
                [Op.or]: {
                    [Op.and]: [{ providerId }, { provider }],
                    email: defaults.email,
                },
            },
        });
        if (!user) {
            await createUser({ ...defaults });
            const { token } = await login({ ...defaults }, res);

            res.json({ token, newUser: true });
        } else {
            const { email } = user;

            if (!user.providerId) {
                await user.update({ providerId, provider });
                const { token } = await login({ email }, res);

                res.json({ token });
            } else {
                const { token } = await login({ email }, res);
                res.json({ token });
            }
        }
    } catch (err) {
        console.log(err);
        res.status(500).send({ err });
    }
};

module.exports = {
    facebookAuth,
    googleAuth,
    providerCallback,
};
