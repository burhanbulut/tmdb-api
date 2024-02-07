const createReviewTable = `
    CREATE TABLE IF NOT EXISTS review (
        id INT AUTO_INCREMENT PRIMARY KEY,
        user_id INT,
        movie_id INT,
        review TEXT,
        rating INT,
        CHECK (rating >= 0 AND rating <= 10),        
        FOREIGN KEY (user_id) REFERENCES users(id),
        FOREIGN KEY (movie_id) REFERENCES movie(id)
    )`;

module.exports = createReviewTable;