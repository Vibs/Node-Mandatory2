import express from "express";
const router = express.Router();

import nodemailer from "nodemailer";

router.post("/api/contact", (req, res) => {

    let status = 200;
    
    let transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
          user: process.env.EMAIL_NODEMAILER,
          pass: process.env.PASS_NODEMAILER,
        },
        tls:{
            rejectUnauthorized: false
        }
    });

    let mailOptions = {
        from: process.env.EMAIL_NODEMAILER, // sender address
        to: [process.env.EMAIL, req.body.email, "vibej@hotmail.com"], // sender mail til mig selv OG til bruger
        subject: `Hej ${req.body.name}`, // Subject line
        text: `Jeg har modtaget diun besked, og svarer snart: ${req.body.message}` // plain text body
    }

    transporter.sendMail(mailOptions, function(error, success){
       if(error){
            console.log(error);
            status = 500;
        }
    });

    res.sendStatus(status);
});



export default {
    router
};