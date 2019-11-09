const express = require('express');
const cors = require('cors');
const server = express();

const routes = require('./src/routes')
const dbConnection = require('./src/config/mysql')

server.use(cors())
server.use(express.json())
server.use(routes);

dbConnection.connect((err) => {
    if (err) throw err;
        console.log("Connected!");
    });

server.listen(3333, '0.0.0.0');