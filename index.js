// Config
require("dotenv").config();

require("express-async-errors");

const express = require("express");
const connectDB = require("./DB/connectDB");
const DataRouter = require("./Router/DataRouter");

const app = express();
const cors = require("cors");

// cors
app.use(cors());

// routes
app.use(express.static("./public"));

app.use("/api/v1", DataRouter);

// app listening
const PORT = process.env.PORT || 4000;

const start = async () => {
  try {
    await connectDB(process.env.MONGO_URI);
    app.listen(PORT, () => {
      console.log(`listening on port ${PORT}... at http://localhost:${PORT}/`);
    });
  } catch (error) {
    console.log(error);
  }
};

// app start
start();
