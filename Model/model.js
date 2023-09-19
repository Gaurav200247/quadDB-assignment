const mongoose = require("mongoose");

const DataModel = new mongoose.Schema({
  name: String,
  last: String,
  buy: String,
  sell: String,
  volume: String,
  base_unit: String,
});

module.exports = mongoose.model("DataModel", DataModel);
