const express = require('express');
const router = express.Router();
const usuarioController = require('../controllers/usuarioController');
const tareaController = require('../controllers/tareaController');
const proyectoController = require('../controllers/proyectoController');
const fileController = require('../controllers/fileController')
const session = require('express-session');
const multer = require('multer');

const upload = multer({ storage: multer.memoryStorage() });

/// Permite que router use express-session
// router.use(session({
//   name: 'my-cookie-name.sid',
//   secret: 'my-secret-key',
//   resave: false,
//   saveUninitialized: false,
//   cookie: {
//     secure: false, // set to true in production with HTTPS
//     httpOnly: true,
//     sameSite: 'lax',
//     maxAge: 1000 * 60 * 60 // 1 hour
//   }
// }));

function requireAuth(req, res, next) {
    if (!req.session.userType) {
      return res.status(401).json({ error: 'No ha iniciado sesión.' });
    }
    next();
  }
function requireClient(req, res, next) {
  if (req.session.userType !== 'client') {
    return res.status(403).json({ error: 'Acceso restringido a clientes.' });
  }
  next();
}
function requireAdmin(req, res, next) {
    if (req.session.userType !== 'admin') {
      return res.status(403).json({ error: 'Acceso restringido a administradores.' });
    }
    next();
  }

//Client
router.post('/login', usuarioController.login)

//Admin
router.post('/loginAdmin', usuarioController.loginAdmin)

//Both xd
router.post('/logged_in', usuarioController.logged_in)
router.post('/logout', usuarioController.logout)

//Metodos protegidos Admin
router.get('/admin',  usuarioController.getAll);
router.get('/admin/:id',  usuarioController.getById);
router.post('/admin',  usuarioController.create);
router.put('/admin/:id',  usuarioController.update);
router.delete('/admin/:id',  usuarioController.delete);
router.post('/admin/assign-role',  usuarioController.assignRole);

//Metodos protegidos Client
//Metodos Tareas
router.get('/cliente/tareas',  tareaController.getAll);
router.get('/cliente/tareas/proyecto/:id',  tareaController.listarTareasPorProyecto);
router.get('/cliente/tareas/:id',  tareaController.obtenerTarea);
router.post('/cliente/tareas',  tareaController.crearTarea);
router.put('/cliente/tareas/:id',  tareaController.actualizarTarea);
router.delete('/cliente/tareas/:id',  tareaController.eliminarTarea);
//Metodos Proyectos
router.get('/cliente/proyectos',  proyectoController.getAll);
router.get('/cliente/proyectos/:id',  proyectoController.getById);
router.post('/cliente/proyectos',  proyectoController.create);
router.put('/cliente/proyectos/:id',  proyectoController.update);
router.delete('/cliente/proyectos/:id',  proyectoController.delete);
//Metodos Archivos
router.post('/cliente/archivos', upload.single('archivo'), fileController.createFile);
router.get('/cliente/archivos', fileController.getAllFiles);
router.get('/cliente/archivos/:id', fileController.getFileById);
router.put('/cliente/archivos/:id', upload.single('archivo'), fileController.updateFile);
router.delete('/cliente/archivos/:id', fileController.deleteFile);

module.exports = router;

