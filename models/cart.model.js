module.exports = (sequelize, Sequelize) => {
    let Cart = sequelize.define('cart', {
        id: {
            primaryKey: true,
            type: Sequelize.INTEGER,
            autoIncrement: true,
        },
        qnty: Sequelize.INTEGER,
        userId: {
            type: Sequelize.INTEGER,
            references: {
                model: 'user', // <<< Note, its table's name, not object name
                key: 'userId' // <<< Note, its a column name
            }

        },
        productId: {
            type: Sequelize.INTEGER,
            references: {
                model: 'products', // <<< Note, its table's name, not object name
                key: 'id' // <<< Note, its a column name

            }

        }

    }, {
        timestamps: false,
        freezeTableName: true

    });
    /*  Cart.sync({force:true})
    .then( () => {
        console.log ("New Table User Table is created...");
})
.finally ( () => {
// sequelize.close();
});
*/
    return Cart;

};