const Proyecto = require('../models/proyectoModel');

const proyectoController = {
  getAll: async (req, res) => {
    try {
      const proyectos = await Proyecto.getAll();
      res.json(proyectos);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Error al obtener proyectos' });
    }
  },

  getById: async (req, res) => {
    try {
      const proyecto = await Proyecto.findById(req.params.id);
      if (!proyecto) {
        return res.status(404).json({ message: 'Proyecto no encontrado' });
      }
      res.json(proyecto);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Error al obtener proyecto' });
    }
  },

  create: async (req, res) => {
    try {
      const proyectoId = await Proyecto.create(req.body);
      res.status(201).json({ id: proyectoId, message: 'Proyecto creado exitosamente' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Error al crear proyecto' });
    }
  },

  update: async (req, res) => {
    try {
      await Proyecto.update(req.params.id, req.body);
      res.json({ message: 'Proyecto actualizado exitosamente' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Error al actualizar proyecto' });
    }
  },

  delete: async (req, res) => {
    try {
      await Proyecto.delete(req.params.id);
      res.json({ message: 'Proyecto eliminado exitosamente' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Error al eliminar proyecto' });
    }
  },

  getByResponsable: async (req, res) => {
    try {
      const proyectos = await Proyecto.getByResponsable(req.params.id);
      res.json(proyectos);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Error al obtener proyectos por responsable' });
    }
  }
};

module.exports = proyectoController;