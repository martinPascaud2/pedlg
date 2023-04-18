module.exports = (sequelize, DataTypes) => {
    const Feedback = sequelize.define(
        'Feedback',
        {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: DataTypes.INTEGER,
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
            message: {
                type: DataTypes.STRING,
                allowNull: false,
                validate: {
                    len: {
                        args: [16, 512],
                        msg: 'MESSAGE_LEN',
                    },
                },
            },
            rating: {
                type: DataTypes.INTEGER,
                allowNull: false,
                validate: {
                    min: {
                        args: -1,
                        msg: 'RATING_MIN',
                    },
                    max: {
                        args: 6,
                        msg: 'RATING_MAX',
                    },
                },
            },
            subject: {
                type: DataTypes.STRING,
                allowNull: false,
                validate: {
                    notEmpty: {
                        msg: 'SUBJECT_EMPTY',
                    },
                    len: {
                        args: [1, 20],
                        msg: 'SUBJECT_LEN',
                    },
                },
            },
        },
        {},
    );

    Feedback.associate = () => {};

    return Feedback;
};
