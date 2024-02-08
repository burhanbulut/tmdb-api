const request = require('supertest');
const app = require('../index.js');

describe('POST /advicemovie', () => {
    test('Öneri maili göndermeli', async () => {
        const response = await request(app)
            .post('/advicemovie')
            .send({ email: 'test@example.com' }); // Assuming a valid email address for testing
        expect(response.statusCode).toBe(200);
        expect(response.body).toHaveProperty('success', true);
        expect(response.body).toHaveProperty('info');
        // You may add more specific checks based on the behavior of the function
    });
});
