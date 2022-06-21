const router = require('express').Router();
const authService = require('../service/authService')

router.get('/register', (req, res) => {
    res.render('auth/register')
})

router.post('/register', (req, res) => {
    const {username, password, repeatPassword} = req.body
    authService.register(username, password, repeatPassword);
    res.redirect('/');
})

router.get('/login', (req, res) => {
    res.render('auth/login');
})

router.post('/login', (req, res) => {
    const {username, password} = req.body
    authService.login(username, password);
    res.redirect('/');
})

module.exports = router