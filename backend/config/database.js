require('dotenv').config();
const mysql = require('mysql2');

// Usamos createPool y activamos el modo promesa
const pool = mysql.createPool({
  host: process.env.DB_HOST, // Lee desde .env
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
}).promise(); // <<--- ¡Importante para usar await!

// Solo mensaje de conexión
pool.getConnection()
  .then(() => {
    console.log('Conectado a la base de datos MySQL');
  })
  .catch(err => {
    console.error('Error de conexión a la base de datos:', err.stack);
  });

module.exports = pool;
