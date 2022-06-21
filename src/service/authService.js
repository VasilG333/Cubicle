const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

const salt = 10;
const secret = 'aiurfhasolgi;dfoujh234-9857yuweiulfyhw923ophq4'


exports.register = async (username, password, repeatPassword) => {
    if (password === repeatPassword) {
        const hash = await bcrypt.hash(password, salt)
        await User.create({
            username: username,
            password: hash
        })
    } else {
        console.log(`Passwords doesn't match`);
    }
}

exports.login = async (username, password) => {
    const user = await User.findOne({ username: username }).lean();
    if (!user) {
        // res.redirect('404')
        return;
    }

    const isValid = await bcrypt.compare(password, user.password)

    if(!isValid) {
        return;
    }
    
    const result = new Promise((resolve, reject) => {
        jwt.sign({id: user._id, username: user.username}, secret, {expiresIn: '2d'}, (err, token) => {
            if(err) {
                reject(err);
            }
            resolve(token);
        })
    })

    return result;
}



// [Object: null prototype] {
//     username: 'peter',
//     password: '123123',
//     repeatPassword: '123123'
//   }