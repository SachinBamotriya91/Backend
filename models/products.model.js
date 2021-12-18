module.exports=(sequelize,Sequelize)=>{
    let productsTable = sequelize.define('products', {  // table name =CART
        id: {
            primaryKey: true,
            type: Sequelize.INTEGER,
            autoIncrement:true
            
        },
        title: Sequelize.STRING,
        price: Sequelize.NUMBER,
        description: Sequelize.TEXT,
        category: Sequelize.STRING,
        image:Sequelize.STRING,
        rating:Sequelize.INTEGER
        
    }, {
        freezeTableName: true, //avoid extra s in table name
        timestamps: false,     //avoid created at and updated at
    });
    return productsTable;
};