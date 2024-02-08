const request = require('supertest');
const app = require('../index.js');

describe('GET /getallmovies', () => {
    test('JSON formatında movieleri göstermeli', async () => {
        const response = await request(app).get('/getallmovies');
        expect(response.statusCode).toBe(200);
        expect(response.body).toHaveProperty('currentPage');
        expect(response.body).toHaveProperty('movies');
        expect(Array.isArray(response.body.movies)).toBe(true);
    });
});
