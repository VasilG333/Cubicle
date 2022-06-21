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

router.post('/login', async (req, res) => {
    const token = await authService.login(req.body);
    if(!token) {
        res.redirect('/404');
        return;
    }
    res.cookie('session', token);
    res.redirect('/')
})

module.exports = router