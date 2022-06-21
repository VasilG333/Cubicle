const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        // validate: {
        //     validator: function() {
        //         return this.userName.length > 2;
        //     },
        //     message: 'Username must be atleast 3 symbols long!'
        // }
    },
    password: {
        type: String,
        required: true,
        // validate: {
        //     validator: function() {
        //         return this.password.length > 2;
        //     },
        //     message: 'Password must be atleast 3 symbols long!'
        // }
    },
    cubes: [
        {
            type: mongoose.Types.ObjectId,
            ref: 'Cube'
        }
    ]
})

const User = mongoose.model('User', userSchema);

module.exports = User;