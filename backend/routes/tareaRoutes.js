const express = require('express');
const router = express.Router();
const tareaController = require('../controllers/tareaController');

router.get('/', tareaController.listarTareas);
router.get('/proyecto/:id', tareaController.listarTareasPorProyecto);
router.get('/:id', tareaController.obtenerTarea);
router.post('/', tareaController.crearTarea);
router.put('/:id', tareaController.actualizarTarea);
router.delete('/:id', tareaController.eliminarTarea);
router.put('/:id', tareaController.actualizarTarea);

module.exports = router;