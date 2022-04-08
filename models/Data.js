const mongoose = require("mongoose");

const DataSchema = new mongoose.Schema({
  data: {
    type: JSON,
    required: true
  }
})

const Data = mongoose.model("Data", DataSchema);
module.exports = Data;