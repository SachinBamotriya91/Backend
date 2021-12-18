module.exports = app => {
    const users = require("../controllers/user.controller.js");
  
    var router = require("express").Router();
  
    router.post("/create", users.create);
    
    router.put("/update/:id", users.update);
    //login
    router.get("/findByEmail/:email/:password", users.findByEmail);
    
    router.get("/getAll", users.findAll);
    
    router.get("/getById/:id", users.findByPk);
    
    router.get("/getByName/:name/:password", users.findByName);
    
    router.get("/forgetPassword/:email", users.forgetpassword);
    
    router.delete("/delete/:id", users.delete);
    
    app.use("/users", router);
  };
  