const express = require('express');
const app = express();
const timeout = require('connect-timeout')
const path = require('path')
const mongoose = require('mongoose');
const { fetchCountryData } = require('./country-data.js')
const dotenv = require("dotenv");
dotenv.config();

const { sendCountries} = require('./controllers/dashboardController')

app.set('view engine', 'ejs')
app.use(timeout('10s'))
app.use('/public', express.static(path.join(__dirname, './public')))
app.use(haltOnTimedout)
app.use(express.urlencoded({ extended: false }));
app.use(haltOnTimedout)

// Mongo DB conncetion
const database = process.env.MONGODB_DATABASE_ACCESS;
mongoose
  .connect(database, { useUnifiedTopology: true, useNewUrlParser: true })
  .then(() => console.log("Connected to Mongoose"))
  .catch((err) => console.log(err));

app.use('/', require('./routes/dashboard'))
// app.use(haltOnTimedout)

function haltOnTimedout (req, res, next) {
  if (!req.timedout) next()
}

const PORT = process.env.PORT || 3000;
const server = app.listen(PORT, console.log("Server connected to port: " + 3000))

const io = require('socket.io')(server);

io.on('connection', async (socket) => {
  let socketId = socket.id
  const countriesData = await sendCountries()
  console.log(socketId + ' has connected');

  io.to(socket.id).emit('sendCountriesData', countriesData)
  console.log(countriesData[0]);

  socket.on('disconnect', () => {
    console.log(`Socket ID: ${socket.id} has disconnected`);
    socket.disconnect(socket.id)
  });
})