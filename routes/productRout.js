const express= require("express");
const { addProduct, showpdct, showpdById, updatePrd, dltprd,} = require("../controllers/productController");
const checkValidation = require("../middleware/checkValidation");


const productRouts = express.Router();

productRouts.route("/add/product").post(checkValidation,addProduct);
productRouts.route("/show/pdct").get(checkValidation,showpdct);
productRouts.route("/showww/:id").get(checkValidation,showpdById);
productRouts.route("/update/product").put(checkValidation,updatePrd);
productRouts.route("/dltprd/:id").delete(checkValidation,dltprd);




module.exports=productRouts;
