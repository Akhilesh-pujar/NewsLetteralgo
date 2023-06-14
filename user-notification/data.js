const mongoose = require('mongoose')

const DataSchema = mongoose.Schema({
    title: String,
    type: String,
    description: String
})

module.exports = mongoose.model('Data',DataSchema)