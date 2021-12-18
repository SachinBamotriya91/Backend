module.exports = (sequelize, Sequelize) => {
    let userTable = sequelize.define('user', {
        userId: {
            primaryKey: true,
            type: Sequelize.INTEGER
        },
        firstName: Sequelize.STRING,
        lastName: Sequelize.STRING,
        email: Sequelize.STRING,
        mobile: Sequelize.STRING,
        password: Sequelize.STRING
    }, {
        timestamps: false,
        freezeTableName: true
    });
    return userTable;
};