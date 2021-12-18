module.exports = app => {
    const cart = require("../controllers/cart.controller");
  
    var router = require("express").Router();
  
    router.post("/addToCart", cart.addToCart);
    
   router.get("/getCart/:userId", cart.getCart);
   
   router.delete("/deleteProduct/:userId/:productId", cart.deleteProduct);
   
   router.delete("/deleteCart/:userId", cart.deleteCart);
   
   //router.delete("/test/:userId",cart.test);
    app.use("/cart", router);
  };
