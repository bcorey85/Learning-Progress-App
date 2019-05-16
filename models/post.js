const mongoose = require('mongoose')

//MONGOOSE CONFIG
let postSchema = new mongoose.Schema({
    date: String,
    start: String,
    end: String,
    notes: String,
    totalMin: String,
    timeString: String
})

module.exports = mongoose.model('Post', postSchema)