require('dotenv').config();
const mysql = require('mysql2');

// Crear la conexión utilizando las variables del archivo .env
const connection = mysql.createConnection({
  host: process.env.DB_HOST, // Lee desde .env
  user: process.env.DB_USER, // Lee desde .env
  password: process.env.DB_PASSWORD, // Lee desde .env
  database: process.env.DB_NAME // Lee desde .env
});

// Verificar la conexión
connection.connect((err) => {
  if (err) {
    console.error('Error de conexión a la base de datos:', err.stack);
  } else {
    console.log('Conectado a la base de datos MySQL');
  }
});

module.exports = connection;
