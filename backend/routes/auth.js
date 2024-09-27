const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const User = require("../models/User");

const generateRandomAvatar = () => {
  const randomAvatar = Math.floor(Math.random() * 71);
  return `https://i.pravatar.cc/300?img=${randomAvatar}`;
};

//Kullanıcı Oluşturma (Create - Register)
router.post("/register", async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const user = await User.findOne({ email }); //email değişkeni tüm userlarda arıyor var mı yok mu ?
    if (user) {
      return res
        .status(400)
        .json({ error: "Girilen email için kayıtlı bir hesap bulunmaktadır" });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const defaultAvatar = generateRandomAvatar();
    const newUser = await new User({
      name,
      email,
      password: hashedPassword,
      avatar: defaultAvatar,
    });
    await newUser.save();
    res.status(201).json(newUser);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Server error" });
  }
});

router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ error: "User is not found !" });
    }
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ error: "User password is false !" });
    }
    res.status(200).json({
      id: user._id,
      email: user.email,
      name: user.name,
      role: user.role,
      avatar: user.avatar,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Server error" });
  }
});


module.exports = router;
