const pool = require('../config/database');

class Usuario {
  static async create({ nombre_completo, email, contraseña, telefono, estado }) {
    const [result] = await pool.query(
      'INSERT INTO usuarios (nombre_completo, email, contraseña, telefono, estado) VALUES (?, ?, ?, ?, ?)',
      [nombre_completo, email, contraseña, telefono, estado]
    );
    return result.insertId;
  }

  static async findByEmail(email) {
    const [rows] = await pool.query('SELECT * FROM usuarios WHERE email = ?', [email]);
    return rows[0];
  }

  static async findById(id) {
    const [rows] = await pool.query('SELECT * FROM usuarios WHERE id_usuario = ?', [id]);
    return rows[0];
  }

  static async update(id, { nombre_completo, email, telefono, estado }) {
    await pool.query(
      'UPDATE usuarios SET nombre_completo = ?, email = ?, telefono = ?, estado = ? WHERE id_usuario = ?',
      [nombre_completo, email, telefono, estado, id]
    );
  }

  static async delete(id) {
    await pool.query('DELETE FROM usuarios WHERE id_usuario = ?', [id]);
  }

  static async getAll() {
    const [rows] = await pool.query('SELECT * FROM usuarios');
    return rows;
  }

  static async assignRole(usuarioId, rolId) {
    await pool.query('INSERT INTO usuario_rol (id_usuario, id_rol) VALUES (?, ?)', [usuarioId, rolId]);
  }
}