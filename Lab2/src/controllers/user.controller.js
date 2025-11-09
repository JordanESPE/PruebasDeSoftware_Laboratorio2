// Base de datos simulada en memoria (arreglo)
let users = [];

// Función para devolver todos los usuarios almacenados
const getAllUsers = (req, res) => {
  res.status(200).json(users);
};

// Función para crear un nuevo usuario si se proveen nombre y correo válidos
const createUser = (req, res) => {
  const { name, email } = req.body;

  // Validación básica de entrada
  if (!name || !email) {
    return res.status(400).json({
      error: 'Name and email are required'
    });
  }

  // Validar formato de email
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return res.status(400).json({
      error: 'Invalid email format'
    });
  }

  // Crear un objeto usuario y añadirlo al arreglo de usuarios
  const newUser = {
    id: users.length + 1,
    name,
    email
  };

  users.push(newUser);

  // Responder con el usuario creado status 201
  res.status(201).json(newUser);
};

// Exportar las funciones creadas con module.exports
module.exports = {
  getAllUsers,
  createUser
};
