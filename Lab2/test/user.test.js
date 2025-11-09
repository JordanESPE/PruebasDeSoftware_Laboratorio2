    // Importar el cliente HTTP supertest para pruebas
const request = require('supertest');

// Importar app Express
const app = require('../src/app');

// Describe el conjunto de pruebas para el API de usuarios
describe('User API Tests', () => {
  
  // Crear prueba que GET devuelva lista vacía inicialmente
  test('GET /users - should return an empty array initially', async () => {
    const response = await request(app).get('/users');
    
    expect(response.status).toBe(200);
    expect(response.body).toEqual([]);
  });

  // Crear prueba que POST cree un nuevo usuario correctamente
  test('POST /users - should create a new user successfully', async () => {
    const newUser = {
      name: 'John Doe',
      email: 'john.doe@example.com'
    };

    const response = await request(app)
      .post('/users')
      .send(newUser)
      .set('Content-Type', 'application/json');

    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty('id');
    expect(response.body.name).toBe(newUser.name);
    expect(response.body.email).toBe(newUser.email);
  });

  // Crear prueba que el endpoint rechace peticiones inválidas
  test('POST /users - should reject invalid requests without name', async () => {
    const invalidUser = {
      email: 'test@example.com'
    };

    const response = await request(app)
      .post('/users')
      .send(invalidUser)
      .set('Content-Type', 'application/json');

    expect(response.status).toBe(400);
    expect(response.body).toHaveProperty('error');
  });

  test('POST /users - should reject invalid requests without email', async () => {
    const invalidUser = {
      name: 'Jane Doe'
    };

    const response = await request(app)
      .post('/users')
      .send(invalidUser)
      .set('Content-Type', 'application/json');

    expect(response.status).toBe(400);
    expect(response.body).toHaveProperty('error');
  });

  test('POST /users - should reject invalid email format', async () => {
    const invalidUser = {
      name: 'Jane Doe',
      email: 'invalid-email'
    };

    const response = await request(app)
      .post('/users')
      .send(invalidUser)
      .set('Content-Type', 'application/json');

    expect(response.status).toBe(400);
    expect(response.body.error).toBe('Invalid email format');
  });

  // ACTIVIDAD 1: Prueba de flujo completo end-to-end
  test('END-TO-END - should create multiple users and retrieve them all', async () => {
    // Paso 1: Crear el primer usuario
    const user1 = {
      name: 'Alice Smith',
      email: 'alice@example.com'
    };

    const createResponse1 = await request(app)
      .post('/users')
      .send(user1)
      .set('Content-Type', 'application/json');

    expect(createResponse1.status).toBe(201);
    expect(createResponse1.body.name).toBe(user1.name);

    // Paso 2: Crear el segundo usuario
    const user2 = {
      name: 'Bob Johnson',
      email: 'bob@example.com'
    };

    const createResponse2 = await request(app)
      .post('/users')
      .send(user2)
      .set('Content-Type', 'application/json');

    expect(createResponse2.status).toBe(201);
    expect(createResponse2.body.name).toBe(user2.name);

    // Paso 3: Crear el tercer usuario
    const user3 = {
      name: 'Charlie Brown',
      email: 'charlie@example.com'
    };

    const createResponse3 = await request(app)
      .post('/users')
      .send(user3)
      .set('Content-Type', 'application/json');

    expect(createResponse3.status).toBe(201);
    expect(createResponse3.body.name).toBe(user3.name);

    // Paso 4: Obtener todos los usuarios
    const getAllResponse = await request(app).get('/users');

    // Verificaciones del flujo completo
    expect(getAllResponse.status).toBe(200);
    expect(Array.isArray(getAllResponse.body)).toBe(true);
    expect(getAllResponse.body.length).toBeGreaterThanOrEqual(3);

    // Verificar que los usuarios creados están en la lista
    const userEmails = getAllResponse.body.map(u => u.email);
    expect(userEmails).toContain(user1.email);
    expect(userEmails).toContain(user2.email);
    expect(userEmails).toContain(user3.email);
  });

  // ACTIVIDAD 2: Prueba para aumentar cobertura - Manejador 404
  test('GET /nonexistent - should return 404 for non-existent routes', async () => {
    const response = await request(app).get('/nonexistent');

    expect(response.status).toBe(404);
    expect(response.body).toHaveProperty('error');
    expect(response.body.error).toBe('Route not found');
  });
});
