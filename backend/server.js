const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
dotenv.config();
const cors = require("cors");
const logger = require("morgan");
const app = express();
const mainRoute = require("./routes/index.js");
const port = 5000;

const connect = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI); //db bağlanma
    console.log("Connected to mongoDb");
  } catch (error) {
    throw error;
  }
};
//middleware
app.use(logger("dev")); //consolda serverın apiden dönen statu kodları logglamaya sağlar
app.use(express.json()); //sunucudan json dönen veriyi js çeviriyor.
app.use(cors()); //güvenlik önlemi için
app.use("/api", mainRoute);
app.listen(port, () => {
  connect();
  console.log(`Sunucu ${port} portunda çalışıyor.`);
});
