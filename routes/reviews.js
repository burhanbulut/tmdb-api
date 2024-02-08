const express = require('express');
const {addreview, getallreviews} = require("../controllers/reviews.js");
const auth = require('../middleware/auth.js');
const router = express.Router();

router.post('/addreview', auth, addreview)
router.get('/getallreviews',getallreviews)


module.exports = router;