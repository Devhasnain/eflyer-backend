const express = require("express");
const router = express.Router();
const CheckAuth = require("../../middlewares/Admin/CheckAuth");
const SignIn = require("../../middlewares/Admin/SigIn");
const CreateUser = require("../../middlewares/Admin/CreateUser");
const SignInMiddleware = require("../../middlewares/Admin/SignInMiddleware");
const DeleteAdmin = require("../../middlewares/Admin/DeleteAdmin");

router.post("/signin", SignInMiddleware, SignIn);
router.post("/signup", CheckAuth, CreateUser);
router.post("/delete", CheckAuth, DeleteAdmin);



module.exports=router