const express = require('express')
const app = express();
const dotenv = require("dotenv").config();
const connectDB = require("./config/connectDB");
const authRoutes = require("./routes/authRoutes")
const cookieParser = require("cookie-parser");
const { requireAuth } = require("./middleware/authMiddleware");
const PORT = 3000;

connectDB();
app.use(express.json());
app.use(express.static('public'));
app.use(cookieParser());

app.set("view engine", "ejs");
app.get('/', (req, res) => res.render('home'));
app.get('/smoothies', requireAuth, (req, res) => res.render('smoothies'));
app.use(authRoutes);
app.listen(PORT, () => {console.log(`Server listening on port number ${PORT}`);});


//testing cookies
// app.get('/set-cookies', (req, res) => {
//     //res.setHeader('Set-Cookie', "newUser = true");
//     res.cookie("newUser", false);
//     res.cookie("isEmployee", true, {maxAge: 100*60*60*24, httpOnly: true});

//     res.send("You got the cookie");
    
     
// }) 
// app.get('/read-cookies', (req, res) => {
//     let cookies = req.cookies;
//     console.log(cookies);
//     console.log(cookies.newUser);


//     res.json(cookies);
// })
