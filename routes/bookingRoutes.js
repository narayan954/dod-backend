const express = require('express');
const { getBookingsForADate } = require('../controllers/bookingController');

const router = express.Router();

router.get('/:userId', getBookingsForADate);

module.exports = router;
