const db = require("../config/database.js");
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');

dotenv.config();
const connection = db();

const register =async (req,res) =>{
    try {
        const {name, password} = req.body;
        const passwordHash =await  bcrypt.hash(password, 12);
        let userId;
         connection.query('INSERT INTO users (name, password) VALUES (?, ?)', [name, passwordHash], (error, results) => {
            if (error) {
                console.log(error);
            } else {

            }
        });
         connection.query('SELECT * FROM users WHERE name = ?', [name], (error, results) => {
            if (error) {
                console.log(error);
            } else {
                userId = results[0].id;
            }
         });
        const userToken = await jwt.sign({ id: userId }, process.env.SECRET, { expiresIn: '7d' });
        console.log(userToken);
        res.json({
            message: 'User registered',
            name : name,
            token: userToken
        })
    }catch (e) {
        console.log(e);
        res.status(500).json({
            message: 'Server error'
        })
    }
}



const login = (req, res) =>{
    try{
        const {name, password} = req.body;
        connection.query('SELECT * FROM users WHERE name = ?', [name], async (error, results) => {
            if (error) {
                console.log(error);
            } else {
                if (results.length > 0) {
                    const user = results[0];
                    const isMatch = await bcrypt.compare(password, user.password);
                    if (isMatch) {
                        const token = jwt.sign({ id: user.id }, process.env.SECRET, { expiresIn: '7d' });
                        res.json({
                            message: 'User logged in',
                            name : name,
                            token: token
                        })
                    } else {
                        res.json({
                            message: 'Password is incorrect'
                        })
                    }
                } else {
                    res.json({
                        message: 'User not found'
                    })
                }
            }
        });
    }catch (e) {
        
    }

}

module.exports = {login,register}