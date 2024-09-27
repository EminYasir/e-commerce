const mongoose = require("mongoose");

const UserSchema = mongoose.Schema(
  {
    name: { type: String, requried: true },
    email: { type: String, requried: true },
    password: { type: String, requried: true },
    role: {
      type: String,
      default: "user",
      enum: ["user", "admin"],
    },
    avatar: { type: String },
  },
  { timestamps: true }
);

const User = mongoose.model("User", UserSchema);
module.exports = User;
