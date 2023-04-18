const bcrypt = require('bcrypt');
const Hashids = require('hashids/cjs');

const REGEX_HAS_NUMBER = /([0-9]+)/;
const REGEX_HAS_LOWERCASE = /([a-z]+)/;
const REGEX_HAS_UPPERCASE = /([A-Z]+)/;

const REGEX_USERNAME = /^([a-z0-9]+[-_]?)+[a-z0-9]$/;

module.exports = (sequelize, DataTypes) => {
    const User = sequelize.define(
        'User',
        {
            id: {
                type: DataTypes.INTEGER,
                autoIncrement: true,
                primaryKey: true,
                allowNull: false,
            },
            username: {
                type: DataTypes.STRING,
                allowNull: false,
                unique: {
                    args: true,
                    msg: 'USERNAME_UNIQUE',
                },
                validate: {
                    len: {
                        args: [3, 15],
                        msg: 'USERNAME_LEN',
                    },
                    is: {
                        args: [REGEX_USERNAME, 'i'],
                        msg: 'USERNAME_FORMAT',
                    },
                },
            },
            email: {
                type: DataTypes.STRING,
                allowNull: false,
                unique: {
                    args: true,
                    msg: 'MAIL_UNIQUE',
                },
                validate: {
                    notEmpty: {
                        msg: 'MAIL_EMPTY',
                    },
                    isEmail: {
                        msg: 'MAIL_FORMAT',
                    },
                    len: {
                        args: [0, 254],
                        msg: 'MAIL_MAX',
                    },
                },
            },
            password: {
                type: DataTypes.STRING(64),
                validate: {
                    notEmpty: {
                        msg: 'PASSWORD_EMPTY',
                    },
                    len: {
                        args: 8,
                        msg: 'PASSWORD_LEN',
                    },
                    hasNoNumber(value) {
                        if (!REGEX_HAS_NUMBER.test(value)) throw new Error('PASSWORD_NO_NUMBER');
                    },
                    hasNoLowerCase(value) {
                        if (!REGEX_HAS_LOWERCASE.test(value)) throw new Error('PASSWORD_NO_LOWERCASE');
                    },
                    hasNoUpperCase(value) {
                        if (!REGEX_HAS_UPPERCASE.test(value)) throw new Error('PASSWORD_NO_UPPERCASE');
                    },
                },
            },
            hasPassword: {
                type: DataTypes.BOOLEAN,
                allowNull: false,
                defaultValue: true,
                field: 'has_password',
            },
            register: {
                type: DataTypes.BOOLEAN,
                allowNull: false,
                defaultValue: false,
            },
            hashId: {
                type: DataTypes.STRING,
                field: 'hash_id',
            },
            online: {
                type: DataTypes.BOOLEAN,
                allowNull: false,
                defaultValue: false,
            },
            lastLogin: {
                type: DataTypes.DATE,
                field: 'last_login',
            },
            provider: {
                type: DataTypes.STRING,
                allowNull: false,
                defaultValue: 'local',
            },
            providerId: {
                type: DataTypes.STRING,
                field: 'provider_id',
            },
        },
        {
            indexes: [
                {
                    unique: true,
                    fields: ['username', 'email', 'id'],
                },
            ],
            hooks: {
                afterValidate: async (user) => {
                    const { password } = user;
                    if (user.changed('password')) {
                        const hashedPassword = await bcrypt.hash(password, 5);
                        await user.set(
                            { password: hashedPassword },
                            { hooks: false },
                        );
                    }
                },
                afterCreate: async (user) => {
                    const { id } = user;
                    if (id) {
                        const hashids = new Hashids(process.SECRET_HASHID);
                        const hashId = hashids.encode(id);
                        await user.update({ hashId }, { hooks: false });
                    }
                },
            },
        },
    );

    User.crypteData = (data) => bcrypt.hash(data, 5);

    User.comparePasswords = (repeatPwd, password) => {
        if (!password) return null;
        return bcrypt.compare(repeatPwd, password);
    };

    User.associate = (models) => {
        User.hasMany(models.Want, {
            foreignKey: 'userId',
            as: 'want',
        });
        User.hasMany(models.Session, {
            foreignKey: 'userId',
            as: 'session',
        });
        User.hasMany(models.Stock, {
            foreignKey: 'userId',
            as: 'stock',
        });
        User.hasOne(models.UserMetadata, {
            foreignKey: 'userId',
            as: 'userMetadata',
        });
        User.hasMany(models.Message, {
            foreignKey: 'senderId',
            as: 'sender',
        });
        User.hasMany(models.Message, {
            foreignKey: 'receiverId',
            as: 'receiver',
        });
        // User.belongsToMany(models.Relation, {
        //     through: 'Membership',
        //     as: 'relations',
        //     foreignKey: 'userId',
        //     otherKey: 'relationId',
        // });
    };

    return User;
};
