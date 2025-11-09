// Importar los módulos necesarios
const express = require('express');
const userRoutes = require('./routes/user.routes');

// Crear una instancia de la aplicación Express
const app = express();

// Usar un middleware para parsear JSON del cuerpo de las solicitudes
app.use(express.json());

// Establecer la ruta base para los usuarios
app.use('/users', userRoutes);

// Usar un manejador de rutas no encontradas (404)
app.use((req, res) => {
  res.status(404).json({ error: 'Route not found' });
});

// Exportar la instancia app para poder usarla en tests o en un archivo de servidor separado
module.exports = app;
