let mysql = require("mysql");

let connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "root",
  database: "restaurant",
});

connection.connect((error) => {
  if (error) throw error;
  console.log("conexion correcta");
});

module.exports = connection;

