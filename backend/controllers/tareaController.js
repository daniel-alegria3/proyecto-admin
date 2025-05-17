const Tarea = require('../models/tareaModel');

// Listar todas las tareas o filtrar por proyecto si se pasa ?id_proyecto=
// Si no hay id_proyecto, devuelve todas las tareas
exports.listarTareas = async (req, res) => {
  try {
    const id_proyecto = req.query.id_proyecto;
    let tareas;
    if (id_proyecto) {
      tareas = await Tarea.getByProyecto(id_proyecto);
    } else {
      tareas = await Tarea.getAll();
    }
    res.json(tareas);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Listar tareas específicamente por proyecto (ruta con param)
exports.listarTareasPorProyecto = async (req, res) => {
  try {
    const id_proyecto = req.params.id;
    const tareas = await Tarea.getByProyecto(id_proyecto);
    res.json(tareas);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Obtener una tarea por id
exports.obtenerTarea = async (req, res) => {
  try {
    const tarea = await Tarea.findById(req.params.id);
    if (!tarea) return res.status(404).json({ error: 'Tarea no encontrada' });

    // Formatear las fechas para inputs date
    const tareaFormateada = {
      ...tarea,
      fecha_inicio: tarea.fecha_inicio ? tarea.fecha_inicio.toISOString().split('T')[0] : null,
      fecha_fin: tarea.fecha_fin ? tarea.fecha_fin.toISOString().split('T')[0] : null,
    };

    res.json(tareaFormateada);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};



// Crear una tarea
exports.crearTarea = async (req, res) => {
  try {
    const id = await Tarea.create(req.body);
    res.status(201).json({ mensaje: 'Tarea creada', id });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Actualizar una tarea
exports.actualizarTarea = async (req, res) => {
  try {
    await Tarea.update(req.params.id, req.body);
    res.json({ mensaje: 'Tarea actualizada' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Eliminar una tarea
exports.eliminarTarea = async (req, res) => {
  try {
    await Tarea.delete(req.params.id);
    res.json({ mensaje: 'Tarea eliminada' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
