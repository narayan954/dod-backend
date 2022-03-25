const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    const connection = await mongoose.connect(process.env.DB_URL);
    console.log('DB Connected');
  } catch (err) {
    console.log(`Error connecting DB: ${err.message}`);
    process.exit();
  }
};

module.exports = connectDB;
