module.exports = app => {
    const products = require("../controllers/products.controller");

    var router = require("express").Router();

    router.post("/create", products.create);



    router.get("/getAll", products.findAll);

    app.use("/products", router);
};