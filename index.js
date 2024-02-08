const express = require('express');
const db = require("./config/database.js");
const dotenv = require('dotenv');
const movie = require('./routes/movie.js');
const review = require('./routes/reviews.js');
const job = require("./middleware/job.js");
const bodyParser = require("body-parser");
const {auth, requiresAuth} = require("express-openid-connect");
const config = require("./config/auth.js");
const authentication = require("./routes/auth");



dotenv.config();
const app = express();
app.use(bodyParser.json());
const PORT = process.env.PORT || 3000;
app.use('/api', movie)
app.use(auth(config));
app.use('/auth', authentication)
app.use('/api', review)
app.get('/', (req, res) => {
    res.send(req.oidc.isAuthenticated() ? 'Logged in' : 'Logged out');
});

app.get('/profile', requiresAuth(), (req, res) => {
    res.send(JSON.stringify(req.oidc.user, null, 2));
});

db();
job()
app.listen(PORT, () => {
    console.log(`Server started on port ${PORT}`);
});