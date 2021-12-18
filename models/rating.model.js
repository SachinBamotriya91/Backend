
module.exports = (sequelize, Sequelize) => {

let ratingtable=sequelize.define('rating',
    {
        rate:Sequelize.STRING,
        count:Sequelize.INTEGER

    },
    {
        freezeTableName: true, //avoid extra s in table name
        timestamps: false,     //avoid created at and updated at
    }
    );
    return ratingtable;
};