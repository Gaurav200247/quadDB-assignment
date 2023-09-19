const mongoose = require("mongoose");

const connectDB = async (url) => {
  return mongoose
    .set("strictQuery", true)
    .connect(url)
    .then(() => console.log("DB Connected !!"))
    .catch((err) => {
      console.log(err, "DB Connection Failed !!");
    });
};

module.exports = connectDB;
