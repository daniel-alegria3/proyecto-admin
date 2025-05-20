const pool = require('../config/database');

const fileController = {
  // Crear archivo
  createFile: async (req, res) => {
    const { nombre_archivo, tipo, id_proyecto, id_tarea } = req.body;
    const archivo_binario = req.file ? req.file.buffer : null;

    if (!archivo_binario) {
      return res.status(400).json({ message: 'Archivo binario no proporcionado' });
    }

    try {
      const [result] = await pool.query(
        `INSERT INTO archivos (nombre_archivo, tipo, archivo_binario, id_proyecto, id_tarea)
         VALUES (?, ?, ?, ?, ?)`,
        [nombre_archivo, tipo, archivo_binario, id_proyecto, id_tarea]
      );
      res.status(201).json({ message: 'Archivo creado', id: result.insertId });
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: 'Error al crear el archivo' });
    }
  },

  // Obtener todos los archivos
  getAllFiles: async (req, res) => {
    try {
      const [files] = await pool.query('SELECT id_archivo, nombre_archivo, tipo, id_proyecto, id_tarea FROM archivos');
      res.json(files);
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: 'Error al obtener archivos' });
    }
  },

  // Obtener un archivo por ID
  getFileById: async (req, res) => {
    const { id } = req.params;
    try {
      const [rows] = await pool.query('SELECT * FROM archivos WHERE id_archivo = ?', [id]);
      if (rows.length === 0) {
        return res.status(404).json({ message: 'Archivo no encontrado' });
      }
      const file = rows[0];
      res.set('Content-Type', file.tipo);
      res.send(file.archivo_binario);
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: 'Error al obtener el archivo' });
    }
  },

  // Actualizar archivo
  updateFile: async (req, res) => {
    const { id } = req.params;
    const { nombre_archivo, tipo, id_proyecto, id_tarea } = req.body;
    const archivo_binario = req.file ? req.file.buffer : null;

    try {
      const [result] = await pool.query(
        `UPDATE archivos 
         SET nombre_archivo = ?, tipo = ?, archivo_binario = ?, id_proyecto = ?, id_tarea = ?
         WHERE id_archivo = ?`,
        [nombre_archivo, tipo, archivo_binario, id_proyecto, id_tarea, id]
      );
      if (result.affectedRows === 0) {
        return res.status(404).json({ message: 'Archivo no encontrado' });
      }
      res.json({ message: 'Archivo actualizado' });
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: 'Error al actualizar el archivo' });
    }
  },

  // Eliminar archivo
  deleteFile: async (req, res) => {
    const { id } = req.params;
    try {
      const [result] = await pool.query('DELETE FROM archivos WHERE id_archivo = ?', [id]);
      if (result.affectedRows === 0) {
        return res.status(404).json({ message: 'Archivo no encontrado' });
      }
      res.json({ message: 'Archivo eliminado' });
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: 'Error al eliminar el archivo' });
    }
  }
};

module.exports = fileController;
