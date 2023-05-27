const express=require('express');
const router=express.Router();
const CheckAuth=require('../../middlewares/Auth/CheckAuth');
const Fetchuserorders = require('../../middlewares/Orders/Fetchuserorders');

router.get('/',CheckAuth,Fetchuserorders);

module.exports=router;