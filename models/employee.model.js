module.exports = (sequelize, Sequelize) => {
    const employeeTable = sequelize.define("employeeTable", {
    id:{
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true
    },
      name: {
        type: Sequelize.STRING
      },
      designation: {
        type: Sequelize.STRING
      },
      department: {
        type: Sequelize.STRING
      }
    });
  
    /*employeeTable.sync({force:true})
    .then( () => {
    console.log ("New Table Employee Table is created...");
    })
    .finally ( () => {
    // sequelize.close();
    });
    
    */
  
  
    return employeeTable;
    
    
  };


 