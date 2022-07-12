const Appointment = require("../models/appointmentModel");
const catchAsync = require("../utils/catchAsync");

const getBookingsForADate = catchAsync(async (req, res, next) => {
  console.log(req.params.userId, req.query.date);
  const bookings = await Appointment.find({
    _id: req.params.userId,
    date: req.query.date,
  });

  res.status(200).json({
    status: "success",
    bookings,
  });
});

const createBooking = catchAsync(async (req, res, next) => {
  const booking = await Appointment.create(req.body);
  res.status(200).json({
    status: "success",
    booking,
  });
});

module.exports = { getBookingsForADate, createBooking };
