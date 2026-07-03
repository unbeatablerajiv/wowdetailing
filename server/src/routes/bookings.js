const express = require('express')
const router = express.Router()
const { createBooking, getAllBookings, getBookingById, updateBookingStatus } = require('../controllers/bookingController')

router.post('/',          createBooking)
router.get('/',           getAllBookings)
router.get('/:id',        getBookingById)
router.patch('/:id/status', updateBookingStatus)

module.exports = router
