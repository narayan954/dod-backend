const jwt = require('jsonwebtoken');

const createToken = (userId, userType) => {
  const token = jwt.sign({ id: userId, userType }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });
  return token;
};

module.exports = createToken;
