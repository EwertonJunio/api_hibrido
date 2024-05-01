const express = require('express');
const router = express.Router();
const AuthController = require('../controllers/AuthController');

router.post('/registrar', AuthController.registrar);
router.get('/listar-usuarios', AuthController.listarUsuarios);
router.get('/buscar-usuario/:id', AuthController.buscarUsuarioPorId);
router.patch('/atualizar-usuario/:id', AuthController.atualizarUsuarioPorId);
router.delete('/excluir-usuario/:id', AuthController.excluirUsuarioPorId);
router.post('/autenticar', AuthController.autenticar);

module.exports = router;
