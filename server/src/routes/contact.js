const express = require('express')
const router = express.Router()
const { submitContactMessage, getAllMessages } = require('../controllers/contactController')

router.post('/', submitContactMessage)
router.get('/',  getAllMessages)

module.exports = router
