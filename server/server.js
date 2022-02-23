// we need a separate server.js file to just have the app.listen method so that testing doesn't return an EADDRESS in use error
// https://stackoverflow.com/questions/56122778/supertest-not-found-error-testing-express-endpoint/57368925#57368925

const app = require('./app')
const PORT = 3000;

const server = app.listen(PORT, () =>
  console.log(`Server running on ${process.env.HOST}:${process.env.PORT}`)
);

module.exports = server;
