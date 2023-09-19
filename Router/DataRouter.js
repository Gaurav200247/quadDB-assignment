const express = require("express");
const router = express.Router();
const DataModel = require("../Model/model");
const { StatusCodes } = require("http-status-codes");

router.route("/data").get(async (req, res) => {
  const data = await DataModel.find();

  res.status(StatusCodes.OK).json({
    success: true,
    data,
  });
});

module.exports = router;
