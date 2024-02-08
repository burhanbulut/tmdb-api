const { auth } = require('express-openid-connect');


// app.get('/sign-up', (req, res) => {
//     res.oidc.login({
//         returnTo: '/', // Kullanıcı kaydolduktan sonra nerede kalacaklarını belirtin
//         authorizationParams: {
//             screen_hint: 'signup',
//         },
//     });
// });

const register = (req,res) =>{
    res.oidc.login({
        returnTo: '/',
        authorizationParams: {
            screen_hint: 'signup',
        },
    });
}



const login = (req, res) =>{

    res.oidc.login({
        returnTo: '/',
        authorizationParams: {
            screen_hint: 'login',
        },

    });
}

module.exports = {login,register}