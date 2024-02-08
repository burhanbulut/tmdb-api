




const register = (req,res) =>{
  
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