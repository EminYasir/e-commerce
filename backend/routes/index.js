const express=require("express");
const router=express.Router();

//Diğer rota dosyalarını içe aktarıyoruz.
const productRouter=require("./products.js");
const categoryRouter=require("./categories.js")
const authRouter=require("./auth.js")
const couponRouter=require("./coupon.js");
const userRouter=require("./users.js");
const paymentRouter=require("./payment.js");

//Her rotayı ilgili yol altında kullanıyoruz
router.use("/categories", categoryRouter);
router.use("/products",productRouter)
router.use("/auth",authRouter);
router.use("/coupon",couponRouter);
router.use("/users",userRouter);
router.use("/payment",paymentRouter);





module.exports=router;