const express = require('express');
const { register, login } = require('../controllers/authController');
const { findAllDoctors } = require('../controllers/userController');

const router = express.Router();

router.post('/register', register);
router.post('/login', login);
router.get('/doctors', findAllDoctors);

module.exports = router;
