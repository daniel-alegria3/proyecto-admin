const express = require('express');
const router = express.Router();
const usuarioController = require('../controllers/usuarioController');
const authMiddleware = require('../middlewares/authMiddleware');

router.get('/', authMiddleware, usuarioController.getAll);
router.get('/:id', authMiddleware, usuarioController.getById);
router.post('/', authMiddleware, usuarioController.create);
router.put('/:id', authMiddleware, usuarioController.update);
router.delete('/:id', authMiddleware, usuarioController.delete);
router.post('/assign-role', authMiddleware, usuarioController.assignRole);

module.exports = router;