const express = require('express');
const {
  getBookingsForADate,
  createBooking,
} = require('../controllers/bookingController');

const router = express.Router();

router.get('/:userId', getBookingsForADate);
router.post('/create', createBooking);

module.exports = router;
