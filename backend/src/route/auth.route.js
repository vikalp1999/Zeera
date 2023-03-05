const express= require("express");
const { AuthSignup, AuthLogin } = require("../controller/auth.controller");

const Router= express.Router();

Router.route("/signup").post(AuthSignup);
Router.route("/login").post(AuthLogin);

module.exports= Router;
