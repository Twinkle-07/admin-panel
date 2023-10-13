const express = require("express");

const { addUser, showData, showById, update, dltt, login, lgn, otpGen, checkOtp, logout } = require("../controllers/userController");
const checkValidation = require("../middleware/checkValidation");


const userRoutes = express.Router();

userRoutes.route("/add/user").post(addUser)    // abb jis ka user verified vhi add hoga
userRoutes.route("/show/data").get(showData)
userRoutes.route("/shhowc/:id").get(showById)
userRoutes.route("/updatee/login").put(update)
userRoutes.route("/dlt/:id").get(dltt)
userRoutes.route("/user/log").post(login)
userRoutes.route("/otp/gen").post(otpGen)
userRoutes.route("/check/otp").get(checkOtp)
userRoutes.route("/user/logout").put(checkValidation,logout)



module.exports=userRoutes;