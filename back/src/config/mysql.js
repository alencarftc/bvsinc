const mysql = require('mysql');

// var connection = mysql.createConnection(
//   "mysql://root:root@database/solinc"
// );

var connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "root",
  database: "solinc"
});

module.exports = connection;
