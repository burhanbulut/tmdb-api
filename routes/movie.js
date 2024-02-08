const express = require('express');
const {getallmovies,getmoviedetails,advicemovie} = require('../controllers/movies.js');


const router = express.Router();

router.get('/getallmovies',getallmovies)
router.get('/getmoviedetails/:id',getmoviedetails)
router.post('/advicemovie',advicemovie)


module.exports = router;