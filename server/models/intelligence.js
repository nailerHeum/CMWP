const mongoose = require('mongoose')
const intelligence = new mongoose.Schema({
    identifier: { type: String, unique: true },
    item: Object,
    screenshot: String
})

module.exports = mongoose.model('Intelligence', intelligence)