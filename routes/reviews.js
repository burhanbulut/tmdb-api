const express = require('express');
const {addreview, getallreviews} = require("../controllers/reviews.js");

const router = express.Router();

router.get('/addreview',addreview)
router.get('/getallreviews',getallreviews)


module.exports = router;