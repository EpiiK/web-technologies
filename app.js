const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const passport = require('passport');
const bodyParser = require('body-parser');
const config = require('./config/database');
const incidents = require('./routes/incidents');
const users = require('./routes/users');

const app = express();

const port = 5000;

//Connection to the database.
mongoose.Promise = global.Promise;
mongoose.connect(config.database, { useNewUrlParser: true });

//Testing the connection to ensure that it's working.
mongoose.connection.on('connected', () => {
  console.log('Connected to database ' + config.database);
});

mongoose.connection.on('error', (err) => {
  console.log('Error with the database: ' + err);
});

//Enable CORS for express.
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Content-Type, Authorization");
  next();
});

//Static file serving of front-end
app.use(express.static(path.join(__dirname, 'public')));

//Bodyparser middleware.
app.use(bodyParser.json());

//Passport middleware
app.use(passport.initialize());
app.use(passport.session());

//Enable routes
app.use('/incidents', incidents);
app.use('/users', users);

app.get('/', (req, res) => {
  res.send('Server is running!');
})

app.listen(port, () => {
  console.log("The local server is running at the address localhost:" + port);
})
