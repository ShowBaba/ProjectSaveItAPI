const bodyParser = require('body-parser');
const mongoose = require('mongoose');
// const logger = require('morgan');
const userRoute = require('./server/routes/routes.js');
const express = require("express");
const cors = require("cors");
require('dotenv/config');


const app = express();

// var corsOptions = {
//   origin: "htttp://localhost:8081"
// };

// app.use(cors(corsOptions));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
// app.use(logger('dev'));

//use local db
/* const local_url = 'mongodb://127.0.0.1:27017/saveit_db';
mongoose.connect(local_url, { useUnifiedTopology: true, useNewUrlParser: true,
  useFindAndModify: false });
const db = mongoose.connection;
db.once('open', _ => {
  console.log('Database connected');
});

db.on('error', err => {
  console.log('Database connection error', err);
}); **/

//connect to mongodb
mongoose.connect(process.env.DB_CONNECTION, { useUnifiedTopology: true, useNewUrlParser: true }, (err) => {
  if (err) {
    console.log(`Not connected to database ${err}`);
  } else {
    console.log('Successfully connected to database');
  }
});



const port = 8080;
app.use('/notes', userRoute);


app.get('/', (req, res) => {
  res.send('Welcome to Note page!');
});


app.listen(port, (req, res) => {
  console.log(`Running server on port ${port}`);
});
