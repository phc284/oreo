const mongoose = require('mongoose');

// import environmental variables from our variables.env file
require('dotenv').config({ path: 'variables.env' });

// Connect to our Database and handle any bad connections
mongoose.connect(process.env.DATABASE);
// mongoose.connect(process.env.DATABASE);
mongoose.Promise = global.Promise; // Tell Mongoose to use ES6 promises
mongoose.connection.on('error', err => {
  console.error(`🚫 🚫 🚫 🚫 → ${err.message}`);
});

require('./models/Oreo');
require('./models/User');

// Start our app!
const app = require('./app');
const port = process.env.PORT || 3002;
const server = app.listen(port, () => {
  console.log(`Expresss running → PORT ${port}`);
});

module.exports = app;
