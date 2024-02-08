const request = require('supertest');
const app = require('../index.js'); // Assuming your Express app instance is exported as 'app'
const db = require('../config/database.js');

describe('POST /addreview', () => {
    test('It should add a review and update movie average rating', async () => {
        const newReview = {
            user_id: 1,
            movie_id: 1,
            review: 'This movie is great!',
            rating: 4.5
        };

        const response = await request(app)
            .post('/addreview')
            .send(newReview);

        expect(response.statusCode).toBe(200);


        const reviews = await db().query('SELECT * FROM review WHERE user_id = ? AND movie_id = ?', [newReview.user_id, newReview.movie_id]);
        expect(reviews.length).toBe(1);


        const movie = await db().query('SELECT * FROM movie WHERE id = ?', [newReview.movie_id]);
        expect(movie[0].average_rating).toBeCloseTo(4.5);
    });
});
