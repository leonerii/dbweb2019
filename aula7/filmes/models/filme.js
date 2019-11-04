var mongoose = require('mongoose')
var schema = mongoose.Schema

var FilmSchema = new schema({
    title: String,
    year: Number,
    cast: Array,
    genres: Array
})

module.exports = mongoose.model('filmes', FilmSchema)