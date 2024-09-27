const mongoose = require("mongoose");

const CategorySchema = mongoose.Schema(
  {
    name: { type: String, required: true },
    img: { type: String, required: true },
  },
  { timestamps: true } //herhangi bir ekleme ve güncellemenin tarihi içinn
);


const Category=mongoose.model("Category",CategorySchema);

module.exports=Category;

