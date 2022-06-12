const router = require('express').Router();
const cubeController = require('./cubeController');


router.get('/', (req, res) => {
    const { search, from, to } = req.query;
    console.log(search, from, to);
    const cubes = cubeController.getFiltered(search, from, to)

    res.render('index', { cubes })
})
router.get('/about', (req, res) => res.render('about'))

module.exports = router;