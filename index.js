// Config
require("dotenv").config();

require("express-async-errors");

const express = require("express");
const connectDB = require("./DB/connectDB");
const DataRouter = require("./Router/DataRouter");
const path = require("path");

const app = express();

// static files
app.use(express.static(path.join(__dirname, "./public")));

// index.html
app.get("/", (req, res) => {
  res.sendFile(path.resolve(__dirname, "./public/index.html"));
});

// api routes
app.get("/welcome", (req, res) => {
  res.send("Welcome to my app");
});

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
