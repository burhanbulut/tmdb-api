const schedule = require('node-schedule');
const dotenv = require('dotenv');
const db = require("../config/database.js");



dotenv.config();

const connection = db();
let page = 1;
const job = () => schedule.scheduleJob('* 2 * * *', function(){
    const url = `https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=en-US&page=${page}&sort_by=popularity.desc`;
    const options = {
        method: 'GET',
        headers: {
            accept: 'application/json',
            Authorization: `Bearer ${process.env.TOKEN}` //
        }
    };

    fetch(url, options)
        .then(res => res.json())
        .then(json => {
            console.log(page)
            json.results.forEach(movie => {


                connection.query('INSERT INTO movie (name, description) VALUES (?, ?)', [movie.title, movie.overview], (err, result) => {
                    if (err) throw err;
                });
            });
            page++;
        })
        .catch(err => console.error('error:' + err));
});



module.exports = job;