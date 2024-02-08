const request = require('supertest');
const app = require('../index.js'); // Assuming your Express app instance is exported as 'app'
const db = require('../config/database.js');

describe('GET /getallreviews', () => {
    test('It should respond with JSON containing all reviews', async () => {
        const response = await request(app).get('/getallreviews');
        expect(response.statusCode).toBe(200);
        expect(Array.isArray(response.body)).toBe(true);


    });
});
