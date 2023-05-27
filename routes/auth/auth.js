const express = require("express");
const autoSignin = require("../../middlewares/Auth/autoSignin");
const Signin = require("../../middlewares/Auth/signIn");
const RegisterUser = require("../../middlewares/Auth/register");
const CheckIfUserAlreadyExists = require("../../middlewares/Auth/checkIfUserExists");
const RemoveAccount = require("../../middlewares/Auth/removeAccount");
const CheckAuth = require("../../middlewares/Auth/CheckAuth.js");
const UpdateUsersCart = require("../../middlewares/Cart/UpdateUserCart");
const getUserById = require("../../middlewares/Auth/getUserById");
const UpdateProfile = require("../../middlewares/Auth/updateProfile");
const ChangePassword = require("../../middlewares/Auth/ChangePassword");
const router = express.Router();

router.get('/',(req,res)=>{
    return res.status(200).json({
        msg:"Auth api"
    })
})
router.get("/user/:id",getUserById)
router.get("/autosignin", autoSignin);
router.post("/signin", Signin);
router.post("/signup", CheckIfUserAlreadyExists, RegisterUser);
router.post("/delete", RemoveAccount);
router.post("/cart/update", CheckAuth, UpdateUsersCart);
router.post('/profile/update',CheckAuth,UpdateProfile);
router.post('/password/update',CheckAuth,ChangePassword);

module.exports = router;
