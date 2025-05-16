const express = require('express');
const router = express.Router();
const db = require('../config/database'); // conexión a tu base de datos
const bcrypt = require('bcrypt'); // en caso uses hash (opcional)
const authController = require('../controllers/authController');

// POST /login
router.post('/', async (req, res) => {
  const { email, password } = req.body;

  try {
    const [rows] = await db.execute('SELECT * FROM usuarios WHERE email = ?', [email]);

    if (rows.length === 0) {
      return res.status(401).json({ error: 'Email no registrado' });
    }

    const user = rows[0];

    // Comparación directa (como tu PHP original) — mejor usar bcrypt si tienes hash
    if (password === user.password) {
      return res.json({ message: 'Login exitoso', email: user.email });
    } else {
      return res.status(401).json({ error: 'Contraseña incorrecta' });
    }

  } catch (error) {
    console.error('Error al intentar login:', error);
    return res.status(500).json({ error: 'Error interno del servidor' });
  }
});

router.post('/login', authController.login);
router.post('/register', authController.register);

module.exports = router;

