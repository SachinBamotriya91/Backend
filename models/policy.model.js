


module.exports = (sequelize, Sequelize) => {
    const policyTable = sequelize.define("policyTable", {
      number: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      name: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      amount: {
        type: Sequelize.STRING,
        allowNull: false
      },
      matAmount: {
        type: Sequelize.STRING,
        allowNull: false,
        },
      nominee:{
            type: Sequelize.STRING,
            allowNull: false,
        }
    });
  
    return policyTable;
  };


