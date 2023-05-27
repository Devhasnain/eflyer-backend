const express=require('express');
const CheckAuth = require('../../middlewares/Auth/CheckAuth.js');
const CheckOut = require('../../middlewares/Stripe/Checkout');
const WebHook = require('../../middlewares/Stripe/Weebhook');
const router=express.Router();

router.post('/checkout',CheckAuth,CheckOut);
router.post('/webhook',WebHook);


module.exports=router;