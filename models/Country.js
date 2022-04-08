const mongoose = require("mongoose");

const CountrySchema = new mongoose.Schema({
  country: {
    type: JSON,
    required: true
  }
})

const Country = mongoose.model("Country", CountrySchema);
module.exports = Country;