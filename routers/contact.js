const router = require("express").Router();

const nodemailer = require("nodemailer");

router.post("/api/contact", (req, res) => {
    // send email



    // midlertidig
    res.status().send({message: "OK"});
});


module.exports = {
    router
};