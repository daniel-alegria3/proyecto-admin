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
  }
};

module.exports = usuarioController;