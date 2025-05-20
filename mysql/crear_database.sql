drop database gestion_proyectos;

CREATE DATABASE IF NOT EXISTS gestion_proyectos;
USE gestion_proyectos;

CREATE TABLE usuarios (
    id_usuario INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    nombre_completo VARCHAR(100),
    email VARCHAR(100),
    contraseña VARCHAR(255),
    telefono VARCHAR(20),
    estado TINYINT(0), /* 0: desactivado, 1: activado */
    rol TINYINT(0) NOT NULL /* 0: admin, 1: responsable_proyecto, 2:responsable_tarea */
);

-- Tabla de proyectos
CREATE TABLE proyectos (
    id_proyecto INT AUTO_INCREMENT PRIMARY KEY,
    titulo VARCHAR(100),
    descripcion TEXT,
    fecha_inicio DATE,
    fecha_fin DATE,
    id_responsable INT,
    FOREIGN KEY (id_responsable) REFERENCES usuarios(id_usuario)
);

-- Tabla de tareas
CREATE TABLE tareas (
    id_tarea INT AUTO_INCREMENT PRIMARY KEY,
    titulo VARCHAR(100),
    descripcion TEXT,
    fecha_inicio DATE,
    fecha_fin DATE,
    id_proyecto INT,
    id_usuario_asignado INT,
    FOREIGN KEY (id_proyecto) REFERENCES proyectos(id_proyecto),
    FOREIGN KEY (id_usuario_asignado) REFERENCES usuarios(id_usuario)
);

-- Tabla de archivos
CREATE TABLE archivos (
    id_archivo INT AUTO_INCREMENT PRIMARY KEY,
    nombre_archivo VARCHAR(255),
    tipo VARCHAR(10),
    ruta_archivo VARCHAR(255),
    id_proyecto INT,
    id_tarea INT,
    FOREIGN KEY (id_proyecto) REFERENCES proyectos(id_proyecto),
    FOREIGN KEY (id_tarea) REFERENCES tareas(id_tarea)
);


DELIMITER //

CREATE PROCEDURE login_cliente(
    IN in_email VARCHAR(255),
    IN in_contraseña VARCHAR(255)
)
BEGIN
    DECLARE usuario_id INT;

    -- Validación de entrada: campos nulos
    IF in_email IS NULL OR in_contraseña IS NULL THEN
        SIGNAL SQLSTATE '45000'
        SET MESSAGE_TEXT = 'El email o la contraseña no pueden ser nulos.';
    END IF;

    -- Verificar si el email está registrado
    IF NOT EXISTS (
        SELECT 1 FROM usuarios WHERE email = in_email
    ) THEN
        SIGNAL SQLSTATE '45000'
        SET MESSAGE_TEXT = 'El email no está registrado.';
    END IF;

    -- Validar que la contraseña sea correcta para ese email
    SELECT id_usuario INTO usuario_id
    FROM usuarios
    WHERE email = in_email AND contraseña = in_contraseña;

    IF usuario_id IS NULL THEN
        SIGNAL SQLSTATE '45000'
        SET MESSAGE_TEXT = 'Contraseña incorrecta.';
    END IF;
END;

