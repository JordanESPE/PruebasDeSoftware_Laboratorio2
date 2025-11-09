// Importar los módulos necesarios
const express = require('express');
const { getAllUsers, createUser } = require('../controllers/user.controller');

// Crear router de Express
const router = express.Router();

// Definir ruta GET para obtener todos los usuarios
router.get('/', getAllUsers);

// Definir ruta POST para crear un nuevo usuario
router.post('/', createUser);

// Exportar el router con module.exports
module.exports = router;
