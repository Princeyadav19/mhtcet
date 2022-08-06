const mongoose = require('mongoose');
//hashing
const bcrypt = require('bcrypt');
//env files
const dotenv = require('dotenv');
dotenv.config();
//email sender
const transporter = require('../config/emailconfig.js');
const user_datamodel = require('../model/user_model.js');


class userController{
    
    static home = (req, res) => {
        res.render('home')
    }

    static register = (req, res, next) => {
        res.render("user_register", { otp_error: null, email: "" });
    }

    static getotp = (req, res) => {
        res.render("otp_email", { otp_error: null, email: "" });
    }

    static login = (req, res) => {
        res.render("user_login", { title: "login Page", msg: null });
    }

    static isAuth = (req, res, next) => {
        if (req.session.isAuth) {
            next();
        } else {
            res.redirect('/login')
        }
    }

    //send mail
    static get_otp = (req, res) => {
        global.otp = Math.floor((Math.random() * 999999) + 1)
        otp = global.otp;
        console.log(process.env.EMAIL_FROM);
        const mailoption = {
            from: process.env.EMAIL_FROM,
            to: req.body.email,
            subject: `the otp is ${otp}`,
            html: `<a>we have sended the emails</a>`
        }
        transporter.sendMail(mailoption, (error, info) => {
            if (error) {
                console.log(error);
            } else {
                console.log('email sent ' + info.response);
                res.render('user_register', { otp_error: null, email: req.body.email })
            }
        })

    }

    static registerUser = async (req, res) => {
        try {
            const { name, email, password } = req.body
            const user = await user_datamodel.findOne({ email })
            if (user != null) {
                res.send("this is a registered user")
            } else {
                if (name && email && password) {
                    const hashpass = await bcrypt.hash(req.body.password, 10);

                    const newdata = new user_datamodel({
                        email: email,
                        name: name,
                        password: hashpass,
                    });
                    
                    if (req.body.otp == otp) {
                        await newdata.save();
                        res.redirect('/login')
                    }
                    else {
                        res.render("user_register", { otp_error: "otp is not matched try again", email: req.body.email })
                    }
                }
            }
        } catch (error) {
            res.send("user is not register")
        }
    }

    static loginuser = async (req, res) => {
        try {
            const { email, password } = req.body;
            if (email && password) {
                const user = await user_datamodel.findOne({ email: email });
                // console.log(user);
                if (user != null) {
                    const hashcompare = await bcrypt.compare(password, user.password);
                    if (hashcompare) {
                        req.session.username = email;
                        req.session.isAuth = true;
                        res.redirect('/dashboard')
                    } else {
                        res.render("user_login", { title: "login Page", msg: "email or password not matched" });
                    }
                }
                else {
                    res.render("user_login", { title: "login Page", msg: "this email is not registered" });
                }
            }
            else {
                res.render("user_login", { title: "login Page", msg: "all feild are required" });
            }
        } catch (error) {
            console.log(error);
            res.render("user_login", { title: "login Page", msg: "there is some issue" });
        }
    }

    static logout = async(req,res)=>{
        await req.session.destroy((err)=>{
            if(err) {throw err}
            else{
                res.redirect('/')
            }
        })
    }

}

module.exports = userController;
