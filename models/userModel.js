const mongoose = require('mongoose')
const bcrypt = require('bcrypt')

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'User Name is String.']
    },
    email: {
      type: String,
      unique: true,
      required: [true, 'Email is required.']
    },
    password: {
      type: String,
      required: [true, 'Password is required.'],
      select: false
    },
    avatar: {
      type: String,
      default:
        'https://icon-library.com/images/anonymous-avatar-icon/anonymous-avatar-icon-25.jpg'
    },
    userType: {
      type: String,
      enum: ['user', 'doctor', 'admin']
    },
    tags: [String]
  },
  {
    timestamps: true
  }
)

userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next()
  this.password = await bcrypt.hash(this.password, 12)
  next()
})

userSchema.methods.checkPassword = async function (
  enteredPassword,
  storedPassword
) {
  return await bcrypt.compare(enteredPassword, storedPassword)
}

const User = mongoose.model('Users', userSchema)

module.exports = User
