const mysql = require('mysql');

var connection = mysql.createConnection(
  "mysql://root:root@database/solinc"
);

module.exports = connection;