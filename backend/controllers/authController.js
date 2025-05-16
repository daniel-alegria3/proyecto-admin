const Usuario = require('../models/usuarioModel');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const authController = {
  login: async (req, res) => {
    try {
      const { email, password } = req.body;
      
      // Buscar usuario por email
      const usuario = await Usuario.findByEmail(email);
      if (!usuario) {
        return res.status(401).json({ message: 'Credenciales incorrectas' });
      }
      
      // Verificar contraseña
      const isMatch = await bcrypt.compare(password, usuario.contraseña);
      if (!isMatch) {
        return res.status(401).json({ message: 'Credenciales incorrectas' });
      }
      
      // Generar token JWT
      const token = jwt.sign(
        { id: usuario.id_usuario, email: usuario.email },
        process.env.JWT_SECRET,
        { expiresIn: '1h' }
      );
      
      res.json({ token, usuario: { id: usuario.id_usuario, email: usuario.email, nombre: usuario.nombre_completo } });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Error en el servidor' });
    }
  },

  register: async (req, res) => {
    try {
      const { nombre_completo, email, password, telefono } = req.body;
      
      // Verificar si el usuario ya existe
      const existingUser = await Usuario.findByEmail(email);
      if (existingUser) {
        return res.status(400).json({ message: 'El usuario ya existe' });
      }
      
      // Hash de la contraseña
      const hashedPassword = await bcrypt.hash(password, 10);
      
      // Crear usuario
      const userId = await Usuario.create({
        nombre_completo,
        email,
        contraseña: hashedPassword,
        telefono,
        estado: 1
      });
      
      res.status(201).json({ message: 'Usuario creado exitosamente', userId });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Error en el servidor' });
    }
  }
};

module.exports = authController;