const bcrypt = require('bcrypt');
const cookieParser = require('cookie-parser');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

const salt = 10;


exports.register = async (username, password, repeatPassword) => {
    if(password === repeatPassword) {
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
    const user = await User.findOne({username: username}).lean();
    let answer = await bcrypt.compare(password, user.password)
    if(answer) {

    }
}



// [Object: null prototype] {
//     username: 'peter',
//     password: '123123',
//     repeatPassword: '123123'
//   }