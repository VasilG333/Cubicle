const express = require('express')
const router = express.Router()
const homeController = require('./controllers/homeController')
const cubeController = require('./controllers/cubeController')
const searchController = require('./controllers/searchController')

router.use('/', homeController)
router.use('/cube', cubeController)
router.get('/details/:id', (req,res) => {
    const cube = searchController.getDetailsPage(req.params.id)
    res.render('details', {cube})
} )

module.exports = router;