const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()

const submitContactMessage = async (req, res, next) => {
  try {
    const { name, email, subject, message } = req.body
    if (!name || !email || !subject || !message) {
      return res.status(400).json({ success: false, message: 'All fields are required.' })
    }
    const contact = await prisma.contactMessage.create({ data: { name, email, subject, message } })
    res.status(201).json({ success: true, data: contact, message: "Message received. We'll be in touch soon!" })
  } catch (err) {
    next(err)
  }
}

const getAllMessages = async (req, res, next) => {
  try {
    const messages = await prisma.contactMessage.findMany({ orderBy: { createdAt: 'desc' } })
    res.json({ success: true, data: messages, count: messages.length })
  } catch (err) {
    next(err)
  }
}

module.exports = { submitContactMessage, getAllMessages }
