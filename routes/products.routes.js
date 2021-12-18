module.exports = app => {
    const products = require("../controllers/products.controller");
  
    var router = require("express").Router();
  
   router.post("/create", products.create);
    
    //router.put("/update/:id", users.update);


    //router.post("/login", users.login);
    

    router.get("/getAll", products.findAll);
    
    
   // router.get("/getById/:id", users.findByPk);
    
   // router.get("/getByName/:name", users.findByName);
    
   // router.get("/forgetPassword/:email", users.forgetpassword);
    
  //  router.delete("/delete/:id", users.delete);
    
    app.use("/products", router);
  };