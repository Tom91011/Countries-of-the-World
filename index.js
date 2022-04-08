const express = require('express');
const app = express();
const path = require('path')
const mongoose = require('mongoose');
const { fetchCountryData } = require('./country-data.js')
const dotenv = require("dotenv");
dotenv.config();

app.set('view engine', 'ejs')
app.use('/public', express.static(path.join(__dirname, './public')))
app.use(express.urlencoded({ extended: false }));

// Mongo DB conncetion
const database = process.env.MONGODB_DATABASE_ACCESS;
mongoose
  .connect(database, { useUnifiedTopology: true, useNewUrlParser: true })
  .then(() => console.log("Connected to Mongoose"))
  .catch((err) => console.log(err));

app.use('/', require('./routes/dashboard'))

const PORT = process.env.PORT || 3000;
const server = app.listen(PORT, console.log("Server connected to port: " + 3000))