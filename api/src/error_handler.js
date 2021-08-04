const express = require ("express");

const errorHandler = express()

// errorHandler.use((err, req, res, next) => { // eslint-disable-line no-unused-vars
//     const status = err.status || 500;
//     const message = err.message || err;
//     console.error(err);
//     res.status(status).send(message);
//   });
errorHandler.use((err, req, res, next) => { // eslint-disable-line no-unused-vars
    const status = err.status || 500;
    const message = err.message || err;
    console.error(err);
    return res.status(status).send(message);
  });

module.exports = errorHandler;
  