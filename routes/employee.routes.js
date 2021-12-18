module.exports = app => {
    const employees = require("../controllers/employee.controller.js");
  
    var router = require("express").Router();
  

    router.post("/create", employees.create);
  

    router.get("/getAllEmployees", employees.findAll);
  

    router.get("/getEmployeeById/:id", employees.findOne);
  

    router.put("/:id", employees.update);
  

    router.delete("/:id", employees.delete);
  

    router.delete("/", employees.deleteAll);
  
    app.use("/employees", router);
  };