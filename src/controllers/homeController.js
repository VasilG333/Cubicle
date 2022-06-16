const router = require('express').Router();

const searchController = require('./searchController');



router.get('/', (req, res) => {
    const { search, from, to } = req.query;
    const cubes = searchController.getFiltered(search, from, to)
    res.render('index', { cubes, search, from, to })
})
router.get('/about', (req, res) => res.render('about'))

module.exports = router;