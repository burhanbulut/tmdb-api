const jwt = require('jsonwebtoken');

const auth = (req, res, next) => {

    try {
        const token = req.header.authorization.split(" ")[1];
        let decodedData;
        if (token) {
            decodedData = jwt.verify(token, process.env.SECRET);
            req.userId = decodedData?.id;
        }else{
            decodedData = jwt.decode(token);
            req.userId = decodedData?.sub;
        }
        next();
    } catch (e) {
        res.status(400).json({ message: 'Invalid token' });
    }
}