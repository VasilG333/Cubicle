const router = require('express').Router()
const fs = require('fs/promises')
const cubeService = require('../service/cubeService')
const accessoryService = require('../service/accessoryService')
const path = require('path')

router.get('/create', async (req, res) => {
    res.render('create');
});

router.post('/create', async (req, res) => {
    const cube = req.body;
    if (cube.name.length < 2) {
        return res.status(400).send('Invalid request');
    }

    try {
        await cubeService.create(cube);
        res.redirect('/');
    } catch (error) {
        console.log(error);
        res.status(400).send(error);
    }
})

router.get('/details/:_id/attach-accessory', async (req, res) => {
    const cube = await cubeService.getOne(req.params._id).lean();
    const accessories = await accessoryService.getFiltered(cube.accessories).lean();
    res.render('accessories/attach', { cube, accessories })
})

router.post('/details/:_id/attach-accessory', async (req, res) => {
    await cubeService.attachAccessory(req.params._id, req.body.accessory);
    res.redirect(`/cube/details/${req.params._id}`)
})

router.get('/details/:_id', async (req, res) => {
    const cubeId = req.params._id;
    const cube = await cubeService.getOneDetails(cubeId).lean();
    res.render('details', { cube })
})

module.exports = router;