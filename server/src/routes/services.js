const express = require('express')
const router = express.Router()
const { getAllServices, getServiceBySlug } = require('../controllers/serviceController')

router.get('/',       getAllServices)
router.get('/:slug',  getServiceBySlug)

module.exports = router
