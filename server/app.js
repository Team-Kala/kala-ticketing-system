const express = require('express');
require('dotenv').config();
const cors = require('cors');
const path = require('path');
const PORT = 3000;

// import routers 
const apiRouter = require('./routes/api.js');

// initialize application
const app = express();

// set up CORS for Cross-Origin-Resource-Sharing
app.use(cors());
app.use(function (req, res, next) {
  res.header('Access-Control-Allow-Origin', 'locahost:3000');
  res.header(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept'
  );
  next();
});

// converts API responses to JSON
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// serve static files
app.use(express.static(path.resolve(__dirname, '../dist')));

if (process.env.NODE_ENV === 'production') {
  app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, './src/index.html'));
  });
}

// set up router
app.use('/api', apiRouter);

// catch-all route handler for any requests to an unknown route
app.use('/*', (req, res) => res.sendStatus(404));

// configire express global error handler
app.use((err, req, res, next) => {
  const defaultErr = {
    log: 'Express error handler caught unknown middleware error',
    status: 400,
    message: { err: 'An error occurred' },
  };
  const errorObj = Object.assign({}, defaultErr, err);
  console.log(errorObj.log);
  return res.status(errorObj.status).json(errorObj.message);
});

// app.listen(process.env.PORT, process.env.HOST, () =>
//   console.log(`Server running on ${process.env.HOST}:${process.env.PORT}`)
// );

module.exports = app;
