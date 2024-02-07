const db = require('../config/database.js');
const nodemailer = require("nodemailer");
const dotenv = require('dotenv');

dotenv.config();
const connection = db();
const movieAdvice = 'Movie Recommendations'
const getallmovies = (req, res) => {
    const page = parseInt(req.query.page) || 1;
    const pageSize = parseInt(req.query.pageSize) || 10;
    const offset = (page - 1) * pageSize;

    connection.query('SELECT * FROM movie LIMIT ?, ?', [offset, pageSize], (err, result) => {
        if (err) throw err;
        res.json({
            currentPage: page,
            movies: result
        });
    });
}

const getmoviedetails = (req, res) => {

    connection.query(`
    SELECT review.id, users.name AS username, movie.name AS movie_name, review.review, review.rating
    FROM review 
    INNER JOIN movie ON review.movie_id = movie.id
    INNER JOIN users ON review.user_id = users.id   
  `, (err,response) =>{
        if (err) throw err;
        res.json(response)
    } )
}
//fonksiyon olcak her seferinde random 4 filmi çekip mail atacak
let adviceList = []
const randommovies = connection.query('SELECT * FROM movie  ORDER BY RAND() LIMIT 4' , (err, result) =>{
    if(err) throw err;
    result.forEach(element => {
        adviceList.push(element.name )
    })

})


const advicemovie = (req, res) => {
    const transporter = nodemailer.createTransport({
        service : `${process.env.EMAIL_SERVICE}`,
        auth: {
            user: `${process.env.EMAIL_ADDRESS}`,
            pass: `${process.env.EMAIL_PASSWORD}`
        }
    });


    const mailOptions = {
        from: `${process.env.EMAIL_ADDRESS}`,
        to: req.body.email,
        subject: movieAdvice ,
        text: adviceList.join("\n"),
        //html ile gönder
    };

    transporter.sendMail(mailOptions, (err, info) => {
        if (err) {
            res.status(500).send({ error: err.message });
        } else {
            res.send({ success: true, info });
        }
    });
}


module.exports = {getallmovies,getmoviedetails,advicemovie};