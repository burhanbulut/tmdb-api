const db = require('../config/database.js');



const connection = db();
const addreview = (req, res) => {
    const { user_id, movie_id, review, rating } = req.body;
    connection.query('INSERT INTO review (user_id, movie_id, review, rating) VALUES (?, ?, ?, ?)', [user_id, movie_id, review, rating], (err, result) => {
        if (err) throw err;
        res.json(result);
    });

    //review eklendikten sonra ortalama rating güncelle film için
    connection.query('SELECT AVG(rating) as average_rating FROM review WHERE movie_id = ?', [movie_id], (err, result) => {
        if (err) throw err;
        db.query('UPDATE movie SET average_rating = ? WHERE id = ?', [result[0].average_rating, movie_id], (err, result) => {
            if (err) throw err;
        });
    });
}

const getallreviews = (req, res) => {
    connection.query('SELECT * FROM review', (err, result) => {
        if (err) throw err;
        res.json(result);
    });
}



module.exports = {addreview,getallreviews};