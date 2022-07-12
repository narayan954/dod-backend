const User = require("../models/userModel");
const AppError = require("../utils/appError");
const catchAsync = require("./../utils/catchAsync");

const findAllDoctors = catchAsync(async (req, res, next) => {
  const doctors = await User.find({ userType: "doctor" });
  res.status(200).json({
    status: "succeess",
    results: doctors.length,
    doctors,
  });
});

const findDoctorWithType = catchAsync(async (req, res, next) => {
  const doctors = await User.find({ tags: { $contains: req.body.type } });
  res.status(200).json({
    status: "succeess",
    results: doctors.length,
    doctors,
  });
});

const findOneDoctor = catchAsync(async (req, res, next) => {
  const doctor = await User.findById(req.params.id);
  if (!doctor) {
    return next(new AppError("No doctor find with that ID", 404));
  }
  res.status(200).json({
    status: "succeess",
    doctor,
  });
});

module.exports = { findAllDoctors, findDoctorWithType, findOneDoctor };
