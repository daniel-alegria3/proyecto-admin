const pool = require('../config/database');

class Tarea {
  static async create({ titulo, descripcion, fecha_inicio, fecha_fin, id_proyecto, id_usuario_asignado }) {
    const [result] = await pool.query(
      'INSERT INTO tareas (titulo, descripcion, fecha_inicio, fecha_fin, id_proyecto, id_usuario_asignado) VALUES (?, ?, ?, ?, ?, ?)',
      [titulo, descripcion, fecha_inicio, fecha_fin, id_proyecto, id_usuario_asignado]
    );
    return result.insertId;
  }

  static async findById(id) {
    const [rows] = await pool.query('SELECT * FROM tareas WHERE id_tarea = ?', [id]);
    return rows[0];
  }

  static async update(id, { titulo, descripcion, fecha_inicio, fecha_fin, id_proyecto, id_usuario_asignado }) {
    await pool.query(
      'UPDATE tareas SET titulo = ?, descripcion = ?, fecha_inicio = ?, fecha_fin = ?, id_proyecto = ? WHERE id_tarea = ?',
      [titulo, descripcion, fecha_inicio, fecha_fin, id_proyecto, id]
    );
  }

  static async delete(id) {
    await pool.query('DELETE FROM tareas WHERE id_tarea = ?', [id]);
  }

  static async getAll() {
    const [rows] = await pool.query('SELECT * FROM tareas');
    return rows;
  }

  static async getByProyecto(id_proyecto) {
    const [rows] = await pool.query('SELECT * FROM tareas WHERE id_proyecto = ?', [id_proyecto]);
    return rows;
  }

  static async getByUsuario(id_usuario) {
    const [rows] = await pool.query('SELECT * FROM tareas WHERE id_usuario_asignado = ?', [id_usuario]);
    return rows;
  }
}

module.exports = Tarea;
