const router = require('express').Router()
const fs = require('fs/promises')
const cubeService = require('../service/cubeService')
const accessoryService = require('../service/accessoryService')
const {isAuth} = require('../middlewares/authMiddleware')
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

router.get('/details/:_id/edit',isAuth , async (req, res) => {
    const cube = await cubeService.getOne(req.params._id).lean();
    if (cube.owner != req.user._id) {
        // TODO Add message
        return res.redirect('/404');
    }
    cube.options = cubeService.generateOptions(cube.difficultyLevel);
    res.render('cube/edit', {cube});
})

router.post('/details/:_id/edit',isAuth, async (req, res) => {
    const modifiedCube = await cubeService.update(req.params._id, req.body);
    res.redirect(`/cube/details/${modifiedCube._id}`)
})

router.get('/details/:_id/delete', isAuth, async (req, res) => {
    const cube = await cubeService.getOne(req.params._id).lean();
    cube.options = cubeService.generateOptions(cube.difficultyLevel);
    res.render('cube/delete', {cube})
})

router.post('/details/:_id/delete', isAuth, async (req, res) => {
    const yesorno = await cubeService.delete(req.params._id);
    res.redirect('/')
})

module.exports = router;