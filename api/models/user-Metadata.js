require('dotenv').config();

const REGEX_DEPARTMENT = /(^(0[1-9]|[1-8][0-9]|9[0-5]|97[1-6]|2[A-B])$)/;

function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

module.exports = (sequelize, DataTypes) => {
    const UserMetadata = sequelize.define(
        'UserMetadata',
        {
            avatar: {
                type: DataTypes.STRING,
                defaultValue: `avatar-pedlg-${getRandomInt(1, 13)}.jpg`,
            },
            description: {
                type: DataTypes.STRING,
                validate: {
                    len: {
                        args: [25, 255],
                        msg: 'PRESENTATION_LEN',
                    },
                },
                defaultValue: null,
            },
            department: {
                type: DataTypes.STRING,
                validate: {
                    hasNoValidDepartment(value) {
                        if (!REGEX_DEPARTMENT.test(value)) throw new Error('DEPARTMENT_INVALID');
                    },
                },
            },
        },
        {},
    );
    UserMetadata.associate = (models) => {
        UserMetadata.belongsTo(models.User, {
            foreignKey: 'userId',
        });
    };
    return UserMetadata;
};
