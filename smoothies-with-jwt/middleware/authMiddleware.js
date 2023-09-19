let jwt = require('jsonwebtoken');
const dotenv = require("dotenv").config();
// const ACCESS_TOKEN_SECRET = 'tokenSecret';

const requireAuth = (req, res, next) => {
    const token = req.cookies.jwt;

    if (token) {
        jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decodedToken) => {
            if (err) {
                console.error(err.message);
                res.redirect('/login');           
            } else {
                next();
                console.log(decodedToken);
            }
        });


    } else {
        res.redirect("/login")
    }
}

module.exports = { requireAuth };