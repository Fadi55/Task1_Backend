var mysql = require('mysql');

var con = mysql.createConnection({
  database: 'ExchangeDB',
  username: 'root',
  password: '',
  host: 'localhost',
});

con.connect(function(err) {
    if (err) throw err;
    console.log("Connected!");
    /*Create a table named "customers":*/
    var sql = "CREATE TABLE customers (name VARCHAR(255), address VARCHAR(255))";
    con.query(sql, function (err, result) {
      if (err) throw err;
      console.log("Table created");
    });
  });
