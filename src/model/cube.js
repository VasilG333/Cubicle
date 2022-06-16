const mongoose = require('mongoose')

const Cube = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    description: {
        type:String,
        required: true,
        max: 120
    },
    imageURL: {
        type:String,
        required: true
    },
    difficultyLevel: {
        type: Number,
        required: true,
        min: 1,
        max: 6
    },
    // TODO Accessories
})

Cube.path('imageURL', () {
    return this.imageURL.startsWith('http');
})