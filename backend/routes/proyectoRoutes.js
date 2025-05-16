const express = require('express');
const router = express.Router();
const proyectoController = require('../controllers/proyectoController');
const authMiddleware = require('../middlewares/authMiddleware');

router.get('/', authMiddleware, proyectoController.getAll);
router.get('/:id', authMiddleware, proyectoController.getById);
router.post('/', authMiddleware, proyectoController.create);
router.put('/:id', authMiddleware, proyectoController.update);
router.delete('/:id', authMiddleware, proyectoController.delete);
router.get('/responsable/:id', authMiddleware, proyectoController.getByResponsable);

module.exports = router;