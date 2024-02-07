const mysql = require('mysql');
const dotenv = require('dotenv');
const createMovieTable = require("../models/movies.js");
const createReviewTable = require("../models/reviews.js");
const createUserTable = require("../models/users.js");


dotenv.config();
const db =  () =>{
    const connection = mysql.createConnection({
        host: `${process.env.DB_HOST}`,
        user: `${process.env.DB_USER}`,
        password: `${process.env.DB_PASS}`,
        database: `${process.env.DB_NAME}`
    });
    connection.connect((err) =>{
        if(err){
            console.error('MySQL bağlantısı başarısız: ' + err.stack);
            return;
        }
        console.log('MySQL bağlantısı başarılı');
    })

    connection.query(createMovieTable, (err, result) => {
        if (err) throw err;
        console.log('Movie oluşturuldu.');
    });
    connection.query(createReviewTable, (err, result) => {
        if (err) throw err;
        console.log('Review oluşturuldu.');

    });

    connection.query(createUserTable, (err, result) => {
        if (err) throw err;
        console.log('User oluşturuldu.');

    });



    return connection;

}



module.exports = db;