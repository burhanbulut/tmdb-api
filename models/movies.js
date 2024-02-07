

const createMovieTable = `
    CREATE TABLE IF NOT EXISTS movie (
        id INT AUTO_INCREMENT PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        description TEXT,
        average_rating DECIMAL(3,2) DEFAULT 0
    )
`;




module.exports = createMovieTable;