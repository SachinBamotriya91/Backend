const db = require("../models");
const User = db.users;
const Op = db.Sequelize.Op;

//jwt and redis

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




var transporter = mail.transporter;;
//Register User and sending email
exports.create = (req, res) => {

    const user = {
        userId: req.body.userId,
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        mobile: req.body.mobile,
        password: req.body.password,
    };
    User.create(user)
        .then(data => {
            res.send("User Registered Successfully.");
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "Error Creating new User."
            });
        });
    mailOptions = mail.createEmailMsg(user.email, user.firstName);

    transporter.sendMail(mailOptions, (error, info) => {
        if (error)
            console.log(error);
        else
            console.log('Email sent: ' + info.response);
    });
};


//login
exports.findByEmail = (req, resp) => {

        var email = req.params.email;
        var password = req.params.password;

        User.findAll({ where: { email: email, password: password }, raw: true })
            .then(data => {
                if (data.length == 0)
                    resp.status(400).send("User not found")
                else {
                    resp.status(200).send(data)
                }
            })
    }
    //find all users
exports.findAll = (req, res) => {
    //const name = req.query.name;
    // var condition = name ? { name: { [Op.iLike]: `%${name}%` } } : null;

    User.findAll({ raw: true })
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "Error Getting Users"
            });
        });
};

// finding user by user id 

exports.findByPk = (req, resp) => {
        var id = req.params.id;
        User.findByPk(id)
            .then((data) => {
                resp.status(200).send(data);
            })
            .catch((err) => {
                console.error(err);
            })
    }
    //finding User  by Name
exports.findByName = (req, resp) => {
    var name = req.params.name;
    User.findOne({
            where: {
                [Op.or]: [{ firstName: name }, { lastName: name }]
            }
        })
        .then((data) => {
            resp.status(200).send(data);
        })
        .catch((err) => {
            console.error(err);
        })
}

// forgetPassword 
exports.forgetpassword = (req, resp) => {
    var email = req.params.email;
    console.log(email)
    User.findAll({ where: { email: email }, raw: true })
        .then((data) => {
            if (data.length == 0)
                resp.status(400).send("User not found")
            else {
                console.log(data[0].firstName + data[0].password)
                mailOptions = mail.forgetPasswordEmailMsg(data[0].email, data[0].firstName, data[0].password);

                transporter.sendMail(mailOptions, (error, info) => {
                    if (error)
                        console.log(error);
                    else
                        console.log('Email sent: ' + info.response);
                });
                resp.status(200).send(data)
            }
        })
        .catch((err) => {
            console.error(err);
        })
}

// Update a User by the id 
exports.update = (req, res) => {
    const id = req.params.id;
    User.update(req.body, {
            where: { userId: id }
        })
        .then(num => {
            if (num == 1) {
                console.log(req.body.email)

                res.send({

                    message: "User updated successfully." + req.body.email
                });
            } else {
                res.send({
                    message: `Cannot update User with id=${id}.`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Error updating User with id=" + id + err
            });
            console.log(req.body.email)
            mailOptions = mail.updateEmailMsg(req.body.email, req.body.firstName);

            transporter.sendMail(mailOptions, (error, info) => {
                if (error)
                    console.log(error);
                else
                    console.log('Email sent: ' + info.response);
            });
        });
};


// Delete a user from the database with id.
exports.delete = (req, res) => {
    const userId = req.params.id;

    User.destroy({
            where: { userId: userId }
        })
        .then(num => {
            if (num == 1) {
                res.send({
                    message: "User deleted successfully!"
                });
            } else {
                res.send({
                    message: `Cannot delete User with id=${id}.`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Can't Delete User with id=" + id
            });
        });
};

//login user
exports.login = (req, res) => {
    User.findOne({
            where: {
                name: req.body.name,
                password: req.body.password
            }
        }).then(user => {
            if (!user) {
                return res.status(404).send({
                    message: "User Not Found"
                });
            } else {
                if (user.role === "admin" || user.role === "user") {
                    const token = jwt.sign({ id: user.id }, 'secret', {
                        expiresIn: 86400 // expires in 24 hours
                    });
                    return res.status(200).send({
                        message: "Logged in Successfully",
                        token: token,
                        user: user.name,
                        id: user.id,
                        success: true,
                        expiresIn: 86400
                    });
                }
            }
        })
        .catch(err => {
            if (err.kind === "ObjectId") {
                return res.status(404).send({
                    message: "Server error"
                });
            }
            return res.status(500).send({
                message: "Error retrieving User with id " + req.params.id
            });
        });
};