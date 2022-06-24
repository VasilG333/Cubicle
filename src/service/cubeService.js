const fs = require('fs/promises');
const { default: mongoose } = require('mongoose');
const Accessory = require('../models/Accessory');

const Cube = require('../models/Cube');

exports.getAll = async (search = '', fromInput, toInput) => {
    const from = Number(fromInput) || 0;
    const to = Number(toInput) || 6;

    let cubes = await Cube.find({name: { $regex: new RegExp(search, 'i') }})
        .where('difficultyLevel').lte(to).gte(from)
        .lean();

    return cubes;
};

exports.getOne = (cubeId) => Cube.findById(cubeId);

exports.getOneDetails = (cubeId) => Cube.findById(cubeId).populate('accessories');

exports.create = (cube) => Cube.create(cube);

exports.update = (cubeId, data) => Cube.findByIdAndUpdate(cubeId, data)

exports.delete = (cubeId) => Cube.findByIdAndDelete(cubeId)


exports.attachAccessory = async (cubeId, accessoryId) => {
    const cube = await Cube.findById(cubeId);
    const accessory = await Accessory.findById(accessoryId);

    cube.accessories.push(accessory);
    accessory.cubes.push(cube);

    await cube.save();
    await accessory.save();

    return cube;
}

exports.generateOptions = (category) => {
    return [
      { content: '1 - Very Easy', value: '1' },
      { content: '2 - Easy', value: '2' },
      { content: '3 - Medium (Standard 3x3)', value: '3' },
      { content: '4 - Intermediate', value: '4' },
      { content: '5 - Expert', value: '5' },
      { content: '6 - Hardcore', value: '6' },
    ].map((x, i) => (x.value == category ? { ...x, selected: 'selected' } : x));
}