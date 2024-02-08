const dotenv = require('dotenv');

dotenv.config();

const config = {
    authRequired: false,
    auth0Logout: true,
    secret: `${process.env.SECRET}`,
    baseURL: 'http://localhost:3000',
    clientID: `${process.env.CLIENT_ID}`,
    issuerBaseURL: `${process.env.ISSUERBASEURL}`
};


module.exports = config;