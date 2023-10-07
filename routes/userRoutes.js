const express = require('express')
const { register, login } = require('../controllers/authController')
const {
  findAllDoctors,
  findDoctorWithType,
  findOneDoctor
} = require('../controllers/userController')

const router = express.Router()

router.post('/register', register)
router.post('/login', login)
router.get('/doctors', findAllDoctors)
router.get('/doctors/type', findDoctorWithType)
router.get('/doctors/:id', findOneDoctor)

module.exports = router
