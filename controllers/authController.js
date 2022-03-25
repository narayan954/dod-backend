const User = require('../models/userModel');
const AppError = require('../utils/appError');
const catchAsync = require('../utils/catchAsync');
const createToken = require('../utils/createToken');

const register = catchAsync(async (req, res, next) => {
  const { name, email, password, avatar, userType, tags } = req.body;
  const doctorTags = [];
  if (!name || !email || !password || !avatar || !userType) {
    return next(new AppError('All fields are required', 400));
  }

  if (userType === 'doctor') {
    if (!tags.length) {
      return next(new AppError('Doctor types are required', 400));
    }
    doctorTags.push(...tags);
  }

  if (userType === 'admin') {
    return next(new AppError('Invalid Request', 400));
  }

  const user = await User.create({
    name,
    email,
    password,
    avatar,
    userType,
    tags,
  });

  res.status(201).json({
    status: 'success',
    user,
    token: createToken(user._id, userType),
  });
});

const login = catchAsync(async (req, res, next) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return next(new AppError('Email and password are required', 400));
  }

  const user = await User.findOne({ email }).select('+password');

  if (!user) {
    return next(new AppError('Invalid Credentials', 401));
  }

  if (!(await user.checkPassword(password, user.password))) {
    // user.failLoginCount.push()
    return next(new AppError('Invalid Credentials', 401));
  }

  res.status(200).json({
    status: 'success',
    user,
    token: createToken(user._id, user.userType),
  });
});

module.exports = { register, login };
