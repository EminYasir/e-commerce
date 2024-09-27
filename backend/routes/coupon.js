const express = require("express");
const router = express.Router();
const Coupon = require("../models/Coupon.js");

//Coupon cretate
router.post("/", async (req, res) => {
  try {
    const { code } = req.body;
    const existingCoupon = await Coupon.findOne({ code });
    if (existingCoupon) {
      return res.status(400).json({ error: "Coupon is already exis." });
    }
    const newCoupon = new Coupon(req.body);
    await newCoupon.save();
    res.status(200).json({ message: "Kupon Oluşturuldu.", newCoupon });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Server error" });
  }
});

// Tüm kuponları getirme (Read - All)
router.get("/", async (req, res) => {
  try {
    const coupons = await Coupon.find();
    res.status(200).json(coupons);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Server error." });
  }
});

// Tek kupon getirme BY Coupon Id
router.get("/:couponId", async (req, res) => {
  try {
    const couponId = req.params.couponId;
    const coupon = await Coupon.findById(couponId);
    if (!coupon) {
      return res.status(404).json({ error: "Coupon not found." });
    }
    res.status(200).json(coupon);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Server error." });
  }
});

//tek kupon getirme BY Coupon code
router.get("/code/:couponCode", async (req, res) => {
  try {
    const couponCode = req.params.couponCode;
    const existingCoupon = await Coupon.findOne({ code: couponCode });
    if (!existingCoupon) {
      return res.status(400).json({ error: "Coupon is not found" });
    }
    res.status(200).json({ code:existingCoupon.code , discountPercent: existingCoupon.discountPercent });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Server error." });
  }
});

//güncelleme
router.put("/:couponId", async (req, res) => {
  try {
    const couponId = req.params.couponId;
    const update = req.body;
    const existingCouponId = await Coupon.findById(couponId);
    if (!existingCouponId) {
      return res.status(400).json({ error: "Coupon not found." });
    }
    const updatedCoupon = await Coupon.findByIdAndUpdate(
      existingCouponId,
      update,
      { new: true }
    );
    res.status(200).json(updatedCoupon);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Server error." });
  }
});

//delete
router.delete("/:couponId", async (req, res) => {
  try {
    const couponId = req.params.couponId;
    const existingCouponId = await Coupon.findByIdAndDelete(couponId);
    if (!existingCouponId) {
      return res.status(400).json({ error: "Coupon not found." });
    }
    res.status(200).json({ message: " Başarı ile silindi", existingCouponId });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Server error." });
  }
});

module.exports = router;
