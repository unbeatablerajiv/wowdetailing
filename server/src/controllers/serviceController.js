const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()

const getAllServices = async (req, res, next) => {
  try {
    const services = await prisma.service.findMany({
      where: { active: true },
      orderBy: { price: 'asc' },
    })
    res.json({ success: true, data: services })
  } catch (err) {
    next(err)
  }
}

const getServiceBySlug = async (req, res, next) => {
  try {
    const service = await prisma.service.findUnique({ where: { slug: req.params.slug } })
    if (!service) return res.status(404).json({ success: false, message: 'Service not found.' })
    res.json({ success: true, data: service })
  } catch (err) {
    next(err)
  }
}

module.exports = { getAllServices, getServiceBySlug }
