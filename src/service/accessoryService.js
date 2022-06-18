const Accessory = require('../models/Accessory')

exports.create = (accessoryData) => Accessory.create(accessoryData)

exports.getAll = () => Accessory.find();

exports.getFiltered = (ids) => Accessory.find({_id: {$nin: ids}})

exports.getOne = (_id) => Accessory.findById(_id);