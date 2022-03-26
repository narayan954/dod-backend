const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const appointmentSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Types.ObjectId,
      ref: 'User',
      required: [true, 'UserId is required!'],
    },
    doctorId: {
      type: mongoose.Types.ObjectId,
      ref: 'User',
      required: [true, 'DoctorId is required!'],
    },
    date: {
      type: Date,
      required: [true, 'Appointment Date is required!'],
    },
    timeSlot: {
      type: String,
      required: [true, 'Appointment timeslot is required!'],
    },
  },
  {
    timestamps: true,
  }
);

const Appointment = mongoose.model('Appointments', appointmentSchema);

module.exports = Appointment;
