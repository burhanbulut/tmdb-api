const express = require('express');
const db = require("./config/database.js");
const dotenv = require('dotenv');

dotenv.config();
const app = express();

const PORT = process.env.PORT || 3000;


db();
app.listen(PORT, () => {
    console.log(`Server started on port ${PORT}`);
});