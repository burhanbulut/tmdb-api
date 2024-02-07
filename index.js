const express = require('express');
const db = require("./config/database.js");
const dotenv = require('dotenv');
const movie = require('./routes/movie.js');
const job = require("./middleware/job.js");
const bodyParser = require("body-parser");
dotenv.config();
const app = express();
app.use(bodyParser.json());
const PORT = process.env.PORT || 3000;
app.use('/api', movie)

db();
job()
app.listen(PORT, () => {
    console.log(`Server started on port ${PORT}`);
});