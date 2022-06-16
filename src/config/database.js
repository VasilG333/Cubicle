const mongoose = require('mongoose')
const urlMongo = 'mongodb://localhost:27017/Cubicle'

exports.dbStart = () => mongoose.connect(urlMongo)