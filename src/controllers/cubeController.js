const router = require('express').Router()
const fs = require('fs/promises')
const cubes = require('../db.json')
const path = require('path')

router.get('/create', (req, res) => {
    res.render('create');
});

router.post('/create', (req, res) => {
    const cube = req.body;

    if (cube.name.length < 2) {
        return res.status(400).send('Invalid request');
    }
    let lastCubeId = cubes[cubes.length - 1].id
    cube.id = lastCubeId + 1

    cubes.push(cube);
    fs.writeFile(path.resolve('src', 'db.json'), JSON.stringify(cubes, "", 4))
        .then(() => {
            res.redirect('/')
        })
        .catch(err => {
            res.status(400).send('Invalid request')
        })
})
function getFiltered (search = '', from = 0, to = 6)  {
    const result = cubes
                .filter(x => x.name.toLowerCase().includes(search.toLowerCase()))
                .filter(x => x.difficultyLevel > from && x.difficultyLevel < to);
    return result;
}
module.exports = getFiltered
module.exports = cubes;
module.exports = router;