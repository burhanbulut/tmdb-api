const request = require('supertest');
const app = require('../index.js'); // Assuming your Express app instance is exported as 'app'

describe('GET /getmoviedetails', () => {
    test('Seçilen movienin özelliklerini göstermeli', async () => {
        const response = await request(app).get('/getmoviedetails');
        expect(response.statusCode).toBe(200);
        expect(Array.isArray(response.body)).toBe(true);

    });
});
