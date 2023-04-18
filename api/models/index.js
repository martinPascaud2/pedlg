const fs = require('fs');
const path = require('path');
const Sequelize = require('sequelize');

const basename = path.basename(__filename);
const db = {};

let sequelize;
if (process.env.DB_URI) {
    sequelize = new Sequelize(process.env.DB_URI, process.env.DB_DIALECT);
} else {
    sequelize = new Sequelize(
        process.env.DB_NAME,
        process.env.DB_USER,
        process.env.DB_PASSWD,
        {
            host: process.env.DB_HOST,
            dialect: process.env.DB_DIALECT,
        },
    );
}

fs.readdirSync(__dirname)
    .filter(
        (file) => file.indexOf('.') !== 0
            && file !== basename
            && file.slice(-3) === '.js',
    )
    .forEach((file) => {
        const model = sequelize.import(path.join(__dirname, file));
        db[model.name] = model;
    });

Object.keys(db).forEach((modelName) => {
    if (db[modelName].associate) {
        db[modelName].associate(db);
    }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;
