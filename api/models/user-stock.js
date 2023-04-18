const ApiError = require('../src/helpers/ApiError');

module.exports = (sequelize, DataTypes) => {
    const Stock = sequelize.define(
        'Stock',
        {
            quantity: {
                type: DataTypes.INTEGER,
                defaultValue: 0,
                validate: {
                    min: {
                        args: -1,
                        msg: 'QUANTITY_MIN',
                    },
                    max: {
                        args: 65535,
                        msg: 'QUANTITY_MAX',
                    },
                },
            },
            shared: {
                type: DataTypes.BOOLEAN,
                allowNull: false,
                defaultValue: true,
            },
            sharedQuantity: {
                type: DataTypes.INTEGER,
                allowNull: false,
                defaultValue: 0,
                field: 'shared_quantity',
                validate: {
                    notEmpty: {
                        msg: 'QUANTITY_EMPTY',
                    },

                    min: {
                        args: -1,
                        msg: 'QUANTITY_MIN',
                    },
                    max: {
                        args: 65535,
                        msg: 'QUANTITY_MAX',
                    },
                },
            },
            deleted: {
                type: DataTypes.BOOLEAN,
                allowNull: false,
                defaultValue: false,
            },
            unit: {
                type: DataTypes.STRING,
                allowNull: false,
                validate: {
                    isIn: [
                        [
                            'gram',
                            'number',
                            'packet',
                            'stolon',
                            'bulb',
                            'plant',
                            'cutting',
                        ],
                    ],
                },
            },
        },
        {
            hooks: {
                afterValidate(stock) {
                    const { quantity, sharedQuantity, shared } = stock;
                    if (sharedQuantity > quantity) {
                        throw new ApiError('SHARED_QUANTITY_ERROR', {
                            type: 'ValidationError',
                            path: 'sharedQuantity',
                        });
                    } else if (sharedQuantity === 0 && shared) {
                        throw new ApiError('SHARED_NULL_QUANTITY', {
                            type: 'ValidationError',
                            path: 'sharedQuantity',
                        });
                    }
                },
            },
        },
    );

    Stock.associate = (models) => {
        Stock.belongsTo(models.User, {
            foreignKey: 'userId',
            as: 'user',
        });
        Stock.belongsTo(models.Variety, {
            foreignKey: 'varietyId',
            as: 'varieties',
        });
    };

    return Stock;
};
