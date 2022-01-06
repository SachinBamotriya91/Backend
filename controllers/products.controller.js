const db = require("../models");
const Products = db.products;

var express = require("express");
const app = express();
var cors = require('cors');
app.use(cors());

var nodemailer = require('nodemailer');
var mail = require('../service/mail.service');

app.use(function(req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");

    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
    res.setHeader('Access-Control-Allow-Credentials', true);
    next();
});

//find all products
exports.findAll = (req, res) => {
    Products.findAll({ raw: true })
        .then(data => {
            console.log(data);
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "Error Getting Users" + err
            });
        });
};
exports.create = (req, res) => {

    const product = {
        id: req.body.id,
        title: req.body.title,
        price: req.body.price,
        description: req.body.description,
        category: req.body.category,
        image: req.body.image,
        rating: req.body.rating
    };
    Products.create(product)
        .then(data => {
            res.send("Products Added Successfully.");
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "Error Adding new Product."
            });
        });

};