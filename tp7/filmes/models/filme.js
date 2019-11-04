var mongoose = require('mongoose')
var schema = mongoose.Schema

var FilmSchema = new schema({
    title: {type: String, required: true},
    year: {type: Number, required: true},
    cast: Array,
    genres: Array
})

module.exports = mongoose.model('filmes', FilmSchema)