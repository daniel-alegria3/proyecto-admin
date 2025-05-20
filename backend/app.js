require('dotenv').config();
const express = require('express');
const helmet = require('helmet');
const cors = require('cors');
const morgan = require('morgan');
const { createLogger, format, transports } = require('winston');
const db = require('./config/database');
const loginRoute = require('./routes/authRoutes');
const app = express();

//Rutas para el CRUD
const usuarioRoutes = require('./routes/usuarioRoutes');
const proyectoRoutes = require('./routes/proyectoRoutes');
const tareaRoutes = require('./routes/tareaRoutes'); // 👉 Agregado para tareas


// Logger configurado con Winston
const logger = createLogger({
  level: 'info',
  format: format.combine(
    format.timestamp(),
    format.json()
  ),
  transports: [
    new transports.File({ filename: 'logs/error.log', level: 'error' }),
    new transports.File({ filename: 'logs/combined.log' })
  ]
});

if (process.env.NODE_ENV !== 'production') {
  logger.add(new transports.Console({
    format: format.simple()
  }));
}

// Middlewares globales
app.use(helmet());
app.use(cors({
  origin: 'http://localhost:5173', // don't use '*'
  credentials: true
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan('dev', { stream: { write: message => logger.info(message.trim()) } }));



// 📌 Rutas base
//app.use('authRoutes', loginRoute); // <-- aquí registras tu ruta /login
app.use('/users', usuarioRoutes);


// Rutas base (vacías por ahora)
app.get('/', (req, res) => {
  res.send('API funcionando correctamente');
});

// Middleware de errores (activo)
app.use((err, req, res, next) => {
  logger.error(`${err.status || 500} - ${err.message} - ${req.originalUrl} - ${req.method} - ${req.ip}`);
  res.status(err.status || 500).json({
    error: {
      message: err.message || 'Algo salio mal'
    }
  });
});


// Servidor
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  logger.info(`Servidor corriendo en el puerto ${PORT}`);
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});

module.exports = app;
