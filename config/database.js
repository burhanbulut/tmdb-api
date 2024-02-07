const mysql = require('mysql');
const dotenv = require('dotenv');


dotenv.config();
const db =  () =>{
    const connection = mysql.createConnection({
        host: `${process.env.DB_HOST}`,
        user: `${process.env.DB_USER}`,
        password: `${process.env.DB_PASS}`,
        database: `${process.env.DB_NAME}`
    });
    connection.connect((err) =>{
        if(err){
            console.error('MySQL bağlantısı başarısız: ' + err.stack);
            return;
        }
        console.log('MySQL bağlantısı başarılı');
    })

    return connection;

}



module.exports = db;