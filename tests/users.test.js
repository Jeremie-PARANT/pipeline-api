const request = require('supertest');

// Mock du module db avant de charger l'app
jest.mock('../src/db');
const pool = require('../src/db');
const app = require('../src/index.js');

describe('GET /users', () => {
  test('retourne la liste des utilisateurs', async () => {
    const mockUsers = [
      { id: 1, nom: 'Alice Dupont', mail: 'alice.dupont@example.com' },
      { id: 2, nom: 'Bob Martin', mail: 'bob.martin@example.com' },
      { id: 3, nom: 'Claire Leroy', mail: 'claire.leroy@example.com' },
    ];
    pool.query.mockResolvedValue([mockUsers]);

    const response = await request(app).get('/users');

    expect(response.status).toBe(200);
    expect(response.body).toEqual(mockUsers);
  });

  test('retourne une erreur 500 si la BDD échoue', async () => {
    pool.query.mockRejectedValue(new Error('DB error'));

    const response = await request(app).get('/users');

    expect(response.status).toBe(500);
    expect(response.body.status).toBe('error');
  });
});