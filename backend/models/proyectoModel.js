const pool = require('../config/database');

class Proyecto {
  static async create({ titulo, descripcion, fecha_inicio, fecha_fin, id_responsable }) {
    const [result] = await pool.query(
      'INSERT INTO proyectos (titulo, descripcion, fecha_inicio, fecha_fin, id_responsable) VALUES (?, ?, ?, ?, ?)',
      [titulo, descripcion, fecha_inicio, fecha_fin, id_responsable]
    );
    return result.insertId;
  }

  static async findById(id) {
    const [rows] = await pool.query('SELECT * FROM proyectos WHERE id_proyecto = ?', [id]);
    return rows[0];
  }

  static async update(id, { titulo, descripcion, fecha_inicio, fecha_fin, id_responsable }) {
    await pool.query(
      'UPDATE proyectos SET titulo = ?, descripcion = ?, fecha_inicio = ?, fecha_fin = ?, id_responsable = ? WHERE id_proyecto = ?',
      [titulo, descripcion, fecha_inicio, fecha_fin, id_responsable, id]
    );
  }

  static async delete(id) {
    await pool.query('DELETE FROM proyectos WHERE id_proyecto = ?', [id]);
  }

  static async getAll() {
    const [rows] = await pool.query('SELECT * FROM proyectos');
    return rows;
  }

  static async getByResponsable(id_responsable) {
    const [rows] = await pool.query('SELECT * FROM proyectos WHERE id_responsable = ?', [id_responsable]);
    return rows;
  }
}