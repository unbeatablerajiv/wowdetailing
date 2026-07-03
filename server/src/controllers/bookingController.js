const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()

const createBooking = async (req, res, next) => {
  try {
    const {
      firstName, lastName, email, phone,
      vehicleMake, vehicleModel, vehicleYear, vehicleColor,
      serviceType, date, timeSlot, notes,
    } = req.body

    if (!firstName || !lastName || !email || !phone || !vehicleMake || !vehicleModel || !vehicleYear || !serviceType || !date || !timeSlot) {
      return res.status(400).json({ success: false, message: 'Missing required fields.' })
    }

    const service = await prisma.service.findUnique({ where: { slug: serviceType } })

    const booking = await prisma.booking.create({
      data: {
        firstName, lastName, email, phone,
        vehicleMake, vehicleModel, vehicleYear,
        vehicleColor: vehicleColor || null,
        serviceType,
        serviceId: service?.id || null,
        date, timeSlot,
        notes: notes || null,
        status: 'pending',
      },
    })

    res.status(201).json({ success: true, data: booking })
  } catch (err) {
    next(err)
  }
}

const getAllBookings = async (req, res, next) => {
  try {
    const bookings = await prisma.booking.findMany({
      orderBy: { createdAt: 'desc' },
      include: { service: { select: { name: true, price: true } } },
    })
    res.json({ success: true, data: bookings, count: bookings.length })
  } catch (err) {
    next(err)
  }
}

const getBookingById = async (req, res, next) => {
  try {
    const booking = await prisma.booking.findUnique({
      where: { id: Number(req.params.id) },
      include: { service: true },
    })
    if (!booking) return res.status(404).json({ success: false, message: 'Booking not found.' })
    res.json({ success: true, data: booking })
  } catch (err) {
    next(err)
  }
}

const updateBookingStatus = async (req, res, next) => {
  try {
    const { status } = req.body
    const allowed = ['pending', 'confirmed', 'in_progress', 'completed', 'cancelled']
    if (!allowed.includes(status)) {
      return res.status(400).json({ success: false, message: 'Invalid status value.' })
    }
    const booking = await prisma.booking.update({
      where: { id: Number(req.params.id) },
      data: { status },
    })
    res.json({ success: true, data: booking })
  } catch (err) {
    next(err)
  }
}

module.exports = { createBooking, getAllBookings, getBookingById, updateBookingStatus }
