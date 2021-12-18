const db = require("../models");
const Cart = db.cart;
const Product=db.products;
const Op = db.Sequelize.Op;

const Sequelize=db.Sequelize;
const sequelize=db.sequelize;


var express = require("express");
const app = express();
var cors = require('cors');
app.use(cors());

app.use(function (req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");

    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
    res.setHeader('Access-Control-Allow-Credentials', true);
    next();
});

exports.addToCart = (req, res) => {
    console.log("hello")
    const item = {
        userId: req.body.userId,
        productId: req.body.productId,
    };
    console.log(item);
    Cart.create(item)
        .then(data => {
            res.status(200).send({"Item  Added Successfully In Cart.":data});
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Error Adding new Item in Cart."+err
            });
        });
};

exports.deleteProduct=(req,res)=>{
    var userId = req.params.userId;
    var productId = req.params.productId;
    
    Cart.destroy({
        where: { userId: userId, productId: productId }
    })
        .then(num => {
            if (num == 1) {
                res.send({
                    message: "Product deleted successfully!"
                });
            } else {
                res.send({
                    message: `Cannot delete product with id=.`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Can't Delete User with id=" 
            });
        });
};

//deleting cart
exports.deleteCart=(req,res)=>{
    
    console.log("deleteCart started");
    var userId = req.params.userId;    
    const data= Cart.destroy({where:{userId:userId}})
    if(!data){
        res.status(400).send("error while deleting  cart")
    }
    res.status(200).send("Deleted Cart");
}

// gettiing all products of cart
    
exports.getCart=(req,res)=>{
    
 
    var userId=req.params.userId;
    const tempSQL = sequelize.dialect.queryGenerator.selectQuery('cart',{
        attributes: ['productId'],
        where: {
              userId:userId
        }})
        .slice(0,-1);
        
        Product.findAll({where: {id: {[Sequelize.Op.in]: sequelize.literal(`(${tempSQL})`)}},raw: true 
        }).
        then ( data => {
                res.status (200).send (data)
        }).catch (err => {

            console.error("There is an error getting data from db: "+err); 
            res.status (400).send (err);
        })
}


