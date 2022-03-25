const User = require('../models/userModel');
const catchAsync = require('./../utils/catchAsync');

const findAllDoctors = catchAsync(async (req, res, next) => {
  const doctors = await User.find({ userType: 'doctor' });
  res.status(200).json({
    status: 'succeess',
    results: doctors.length,
    doctors,
  });
});

module.exports = { findAllDoctors };
