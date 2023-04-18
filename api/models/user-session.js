module.exports = (sequelize, DataTypes) => {
    const Session = sequelize.define(
        'Session',
        {
            id: {
                type: DataTypes.INTEGER,
                allowNull: false,
                primaryKey: true,
                autoIncrement: true,
            },
            refreshToken: { type: DataTypes.STRING },
        },
        {},
    );
    Session.associate = (models) => {
        Session.belongsTo(models.User, {
            foreignKey: 'userId',
            as: 'session',
        });
    };
    return Session;
};
