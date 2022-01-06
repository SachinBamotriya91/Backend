const dbConfig = require("./config/db.config");

const Sequelize = require("sequelize");
const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
    host: dbConfig.HOST,
    dialect: dbConfig.dialect,
    logging: false,

    pool: {
        max: dbConfig.pool.max,
        min: dbConfig.pool.min,
        acquire: dbConfig.pool.acquire,
        idle: dbConfig.pool.idle
    }
});

const db = {};
db.Sequelize = Sequelize;
db.sequelize = sequelize;
db.sequelize.sync();
//db.employees = require("./employee.model")(sequelize, Sequelize);
//db.policies = require("./policy.model.js")(sequelize, Sequelize);
db.users = require("./user.model")(sequelize, Sequelize);
db.products = require("./products.model")(sequelize, Sequelize);
db.cart = require("./cart.model")(sequelize, Sequelize);

module.exports = db;