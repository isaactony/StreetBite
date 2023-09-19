const express = require('express');
const connectDB = require('../config/connectDB');
const router = express.Router();
const authController = require('../controllers/authController');
const { signup_get, login_get, signup_post, login_post, logout_get } = require("../controllers/authController");

router.get('/signup', signup_get);
router.post('/signup', signup_post);
router.get('/login', login_get);
router.post('/login', login_post);
router.get('/logout', logout_get);

module.exports = router;