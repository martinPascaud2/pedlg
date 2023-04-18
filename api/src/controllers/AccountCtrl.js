const JwtTools = require('../helpers/jwt.utils');
const { User, UserMetadata, Session } = require('../../models');
const {
    sendConfirmationMail,
    sendMailRecoveryPassword,
} = require('./MailCtrl');

const ApiError = require('../helpers/ApiError');
const { error } = require('../constante');

const AccountCtrl = {
    // LOGIN
    async login({ email, password }, res) {
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

        const passwordMatch = await User.comparePasswords(
            password,
            user.password,
        );

        if (!passwordMatch) {
            throw new ApiError(error.password.INVALID, {
                type: 'ValidationError',
            });
        }

        const { register, id } = user;

        if (!register) {
            throw new ApiError(error.user.UNCOMFIRMED, {
                id,
                type: 'UserError',
            });
        }

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
    },

    // REFRESH TOKEN
    async refreshToken({ req }) {
        const { refreshToken } = req.cookies;

        if (!refreshToken) throw new ApiError(error.cookie.FOUND);

        const user = await Session.findOne({ where: { refreshToken } });

        if (!user) {
            throw new ApiError(error.refreshToken.UNVALID, {
                type: 'ValidationError',
            });
        }
        const { userId } = user;

        JwtTools.destroyTokenForUser(userId);

        const token = await JwtTools.generateTokenForUser(userId);

        return token;
    },

    // LOGOUT
    async logout(id, { res, req }) {
        const { refreshToken } = req.cookies;
        const deleted = await Session.destroy({ where: { refreshToken } });
        const [updated] = await User.update(
            { online: false },
            { where: { id }, validate: false },
        );

        JwtTools.destroyTokenForUser(id);
        if (!updated && !deleted) throw new ApiError(error.global.UPDATED);

        res.clearCookie('refreshToken');

        return true;
    },

    // CREATE USER
    async createUser(params) {
        const user = await User.create(
            { ...params },
            { include: 'userMetadata' },
        );
        await user.createUserMetadata();
        await user.reload();

        const { id, email, username } = user;

        await sendConfirmationMail(email, username, id);

        return user;
    },

    // FORGOT PASSWORD
    async forgotPassword({ email }) {
        const user = await User.findOne({
            where: { email },
        });

        if (!user) {
            throw new ApiError(error.user.FOUND, {
                type: 'ValidationError',
                path: 'email',
            });
        }

        const { username, id, hasPassword } = user;

        if (!hasPassword) throw new ApiError(error.password.LOCAL);

        await sendMailRecoveryPassword(email, username, id);

        return true;
    },

    // RECOVERY PASSWORD
    async recoveryPassword({ password }, { res }, id) {
        const user = await User.findByPk(id);
        if (!user) throw new ApiError(error.user.FOUND);

        const [updated] = await User.update({ password }, { where: { id } });
        if (!updated) throw new ApiError(error.global.UPDATED);

        JwtTools.destroyTokenForRecoveryPassword(id);

        const { email } = user;
        return AccountCtrl.login({ email, password }, res);
    },

    // UPDATE USERNAME ACCOUNT
    async updateUser(params, id) {
        const user = await User.findOne({
            where: { id },
            include: 'userMetadata',
        });

        if (!user) throw new ApiError(error.user.FOUND);

        await user.update({ ...params });

        if (params && params.email) {
            const { email, username } = user;

            try {
                await sendConfirmationMail(email, username, id);
                user.register = false;
            } catch (e) {
                user.email = email;
                throw new ApiError(error.email.UNSEND);
            }
            await user.save();
        }
        return user;
    },

    // UPDATE USER WITH PASSWORD
    async updatePassword({ password, newPassword }, id) {
        const user = await User.findOne({
            where: { id },
            include: 'userMetadata',
            hooks: false,
        });

        if (!user) throw new ApiError(error.user.FOUND);

        if (password === newPassword) {
            throw new ApiError(error.password.IDENTICAL, {
                type: 'ValidationError',
                path: 'password',
            });
        }

        if (user.hasPassword) {
            if (!password) {
                throw new ApiError(error.password.MISSING, {
                    type: 'ValidationError',
                    path: 'password',
                });
            }
            const passwordMatch = await User.comparePasswords(
                password,
                user.password,
            );

            if (!passwordMatch) {
                throw new ApiError(error.password.INVALID, {
                    type: 'ValidationError',
                });
            }
        }

        const [updated] = await User.update(
            {
                password: newPassword,
                hasPassword: true,
            },
            { where: { id } },
        );
        if (!updated) {
            throw new ApiError(error.global.UPDATED, {
                type: 'QueryError',
                path: 'field',
            });
        }

        await user.reload();

        return user;
    },

    // UPDATE USERMETADATA ACCOUNT
    async updateUserMetadata(params, id) {
        const user = await UserMetadata.findOne({
            where: { userId: id },
        });

        if (!user) throw new ApiError(error.user.FOUND);

        const updated = await user.update({ ...params });

        if (!updated) throw new ApiError(error.global.UPDATED);

        return user;
    },

    // DELETE USER
    async deleteUser(id) {
        const user = await User.findByPk(id, {
            include: ['session', 'userMetadata', 'stock', 'want'],
        });
        if (!user) throw new ApiError(error.user.FOUND);

        try {
            JwtTools.destroyTokenForUser(id);
            user.destroy();
        } catch (e) {
            return new ApiError(error.global.UPDATED);
        }
        return true;
    },
};

module.exports = AccountCtrl;
