USE gestion_proyectos;

INSERT INTO usuarios (nombre_completo, email, contraseña, telefono, estado, rol) VALUES
('Juan Pérez', 'juan.perez@empresa.com', 'hashed_password_123', '555-1234567', 1, 0),
('María González', 'maria.gonzalez@empresa.com', 'hashed_password_456', '555-2345678', 1, 1),
('Carlos López', 'carlos.lopez@empresa.com', 'hashed_password_789', '555-3456789', 1, 2),
('Ana Martínez', 'ana.martinez@empresa.com', 'hashed_password_012', '555-4567890', 1, 1),
('Pedro Sánchez', 'pedro.sanchez@empresa.com', 'hashed_password_345', '555-5678901', 1, 2),
('Laura Rodríguez', 'laura.rodriguez@empresa.com', 'hashed_password_678', '555-6789012', 1, 2),
('Sofía Fernández', 'sofia.fernandez@empresa.com', 'hashed_password_901', '555-7890123', 0, 2);

INSERT INTO proyectos (titulo, descripcion, fecha_inicio, fecha_fin, id_responsable) VALUES
('Sistema de Gestión de Proyectos', 'Desarrollo de una plataforma para gestionar proyectos internos', '2023-01-15', '2023-06-30', 2),
('Rediseño de Sitio Web', 'Actualización del diseño y funcionalidades del sitio web corporativo', '2023-02-01', '2023-05-15', 4),
('Aplicación Móvil', 'Desarrollo de una aplicación móvil para clientes', '2023-03-10', '2023-08-20', 2),
('Migración a la Nube', 'Transferencia de servidores locales a infraestructura en la nube', '2023-04-05', '2023-07-30', 4);

INSERT INTO tareas (titulo, descripcion, fecha_inicio, fecha_fin, id_proyecto, id_usuario_asignado) VALUES
('Diseño de Base de Datos', 'Crear el modelo entidad-relación para el sistema', '2023-01-15', '2023-01-30', 1, 3),
('Desarrollo Frontend', 'Implementar la interfaz de usuario del sistema', '2023-02-01', '2023-03-15', 1, 5),
('Pruebas de Integración', 'Realizar pruebas de integración entre módulos', '2023-05-01', '2023-05-20', 1, 6),
('Diseño UI/UX', 'Crear wireframes y prototipos para el nuevo sitio', '2023-02-01', '2023-02-15', 2, 3),
('Implementación Backend', 'Desarrollar la lógica del servidor para la app móvil', '2023-03-15', '2023-05-10', 3, 5),
('Configuración de Servidores', 'Preparar el entorno en la nube para la migración', '2023-04-05', '2023-04-20', 4, 6),
('Transferencia de Datos', 'Migrar los datos de los servidores locales a la nube', '2023-05-01', '2023-05-30', 4, 7);

INSERT INTO archivos (nombre_archivo, tipo, ruta_archivo, id_proyecto, id_tarea) VALUES
('modelo_er.pdf', 'pdf', '/documentos/proyecto1/modelo_er.pdf', 1, 1),
('prototipo_figma.fig', 'fig', '/design/proyecto2/prototipo.fig', 2, 1),
('requisitos.docx', 'docx', '/documentos/proyecto1/requisitos.docx', 1, 3),
('manual_instalacion.pdf', 'pdf', '/documentos/proyecto4/manual.pdf', 4, 2),
('codigo_fuente.zip', 'zip', '/desarrollo/proyecto3/codigo.zip', 3, 3),
('reporte_pruebas.xlsx', 'xlsx', '/pruebas/proyecto1/reporte.xlsx', 2, 4);

