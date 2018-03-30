const express = require('express');

const app = express();
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

require('dotenv').config({ path: 'variables.env' });

// Connect to our Database and handle any bad connections
// mongoose.connect(process.env.DATABASE);
mongoose.Promise = global.Promise; // Tell Mongoose to use ES6 promises
mongoose.connection.on('error', err => {
  console.error(`🙅 🚫 🙅 🚫 🙅 🚫 🙅 🚫 → ${err.message}`);
});

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Start our app!
// const app = require('./app');
app.set('port', process.env.PORT || 3002);
const server = app.listen(app.get('port'), () => {
  console.log(`Expresss running → PORT ${server.address().port}`);
});
