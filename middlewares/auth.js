const { SECRET } = require('../config');
const jwt = require('jsonwebtoken');

module.exports = () => (req, res, next) => {
    const token = req.headers['x-authorization']
    // console.log(token)
    try {
        if (token) {
            const userData = jwt.verify(token, SECRET);
            req.user = userData;
        }
        
    } catch (err) {
        console.log(err)
        // res.status(401).json({ message: 'Unauthorized!'});

    }

    next();

}

