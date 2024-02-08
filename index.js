const express = require('express');
const db = require("./config/database.js");
const dotenv = require('dotenv');
const job = require("./middleware/job.js");
const bodyParser = require("body-parser");

const movie = require('./routes/movie.js');
const review = require('./routes/reviews.js');
const auth = require("./routes/auth.js");



dotenv.config();
const app = express();
app.use(bodyParser.json());
const PORT = process.env.PORT || 3000;


app.use('/api', movie)
app.use('/api', review)
app.use('/auth', auth);

db();
job();

app.listen(PORT, () => {
    console.log(`Server started on port ${PORT}`);
});

module.exports = app;