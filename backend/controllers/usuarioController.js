const Usuario = require('../models/usuarioModel');

const usuarioController = {
  getAll: async (req, res) => {
    try {
      const usuarios = await Usuario.getAll();
      res.json(usuarios);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Error al obtener usuarios' });
    }
  },

  getById: async (req, res) => {
    try {
      const usuario = await Usuario.findById(req.params.id);
      if (!usuario) {
        return res.status(404).json({ message: 'Usuario no encontrado' });
      }
      res.json(usuario);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Error al obtener usuario' });
    }
  },

  create: async (req, res) => {
    try {
      const userId = await Usuario.create(req.body);
      res.status(201).json({ id: userId, message: 'Usuario creado exitosamente' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Error al crear usuario' });
    }
  },

  update: async (req, res) => {
    try {
      await Usuario.update(req.params.id, req.body);
      res.json({ message: 'Usuario actualizado exitosamente' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Error al actualizar usuario' });
    }
  },

  delete: async (req, res) => {
    try {
      await Usuario.delete(req.params.id);
      res.json({ message: 'Usuario eliminado exitosamente' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Error al eliminar usuario' });
    }
  },

  assignRole: async (req, res) => {
    try {
      const { usuarioId, rolId } = req.body;
      await Usuario.assignRole(usuarioId, rolId);
      res.json({ message: 'Rol asignado exitosamente' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Error al asignar rol' });
    }
  },

  // LOGIN
  login: async (req, res) => {
    const { email, contraseña } = req.body;

    if (!email || email.trim() === '' || !contraseña || contraseña.trim() === '') {
      return res.status(400).json({ error: 'Datos inválidos' });
    }

    try {
      const [rows] = await pool.query(
        `CALL login_cliente(?, ?)`,
        [email.trim(), contraseña]
      );

      // Verifica que el procedimiento devuelva resultados válidos
      if (!rows[0] || rows[0].length === 0) {
        return res.status(401).json({ error: 'Credenciales incorrectas' });
      }

      const cliente = rows[0][0];

      // Variables de sesión para cliente
      req.session.userType = 'client';
      req.session.id_usuario = cliente.id_usuario;

      res.status(200).json({ message: 'Login exitoso (cliente)' });
    } catch (error) {
      if (error?.sqlState === '45000') {
        console.error('Error en <cliente.login>:', error);
        res.status(401).json({ error: 'Error en login: ' + error.sqlMessage });
      } else {
        console.error('Error en <cliente.login>:', error);
        res.status(500).json({ error: 'Error interno del servidor' });
      }
    }
  },

  loginAdmin: async (req, res) => {
    const { email, contraseña } = req.body;

    if (!email || email.trim() === '' || !contraseña || contraseña.trim() === '') {
      return res.status(400).json({ error: 'Datos inválidos' });
    }

    try {
      const [rows] = await pool.query(
        `CALL login_admin(?, ?)`,
        [email.trim(), contraseña]
      );

      if (!rows[0] || rows[0].length === 0) {
        return res.status(401).json({ error: 'Credenciales incorrectas' });
      }

      const admin = rows[0][0];

      // Variables de sesión para administrador
      req.session.userType = 'admin';
      req.session.id_usuario = admin.id_usuario;

      res.status(200).json({ message: 'Login exitoso (admin)' });
    } catch (error) {
      if (error?.sqlState === '45000') {
        console.error('Error en <admin.login>:', error);
        res.status(401).json({ error: 'Error en login: ' + error.sqlMessage });
      } else {
        console.error('Error en <admin.login>:', error);
        res.status(500).json({ error: 'Error interno del servidor' });
      }
    }
  },


  logged_in: async (req, res) => {
    if (req.session.id_usuario && req.session.userType) {
      res.json({
        loggedIn: true,
        id_usuario: req.session.id_usuario,
        userType: req.session.userType
      });
    } else {
      res.json({ loggedIn: false });
    }
  },

  logout: async (req, res) => {
    req.session.destroy(() => {
      res.clearCookie('my-cookie-name.sid');
      res.json({ success: true });
    });
  },

};

module.exports = usuarioController;
