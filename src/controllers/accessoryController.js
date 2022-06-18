const router = require('express').Router();
const accessoryService = require('../service/accessoryService')

router.get('/create', (req, res) => {
    res.render('accessories/create')
})

router.post('/create', async (req, res) => {
    await accessoryService.create(req.body)
    res.redirect('/')
})

module.exports = router