const express = require('express');
const cookieParser = require('cookie-parser');
const morgan = require('morgan');
const routes = require('./routes/index.js');
const err = require("./error_handler");
const setHeader = require('./set_headers.js');
const { conn } = require ('../src/db')
const { Recipe, Type } = require('./db');
const cors = require('cors')

require('./db.js');

const server = express();

server.name = 'API';

server.use(cors());
server.use(express.urlencoded({ extended: true, limit: '50mb' }));
server.use(express.json({ limit: '50mb' }));
server.use(cookieParser());
server.use(morgan('dev'));
server.use(setHeader);
//rutas

//middleware de control de errores
server.use(err);
//server.listen


server.use('/', routes);



// Type.sync({force:true})


module.exports = server;
