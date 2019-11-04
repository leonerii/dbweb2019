var mongoose = require('mongoose')

/*
mongoose.connect('mongodb://localhost/filmes')

var db = mongoose.connection
db.on('error', console.error.bind(console, 'connection error'))
db.on('open', () => {
    console.log('connected to mongodb')
})
*/

mongoose.connect('mongodb://localhost/filmes', {useNewUrlParser: true, useUnifiedTopology: true})
    .then(() => console.log('connected to mongodb'))
    .catch(() => console.log('connection error'))


var filmSchema = new mongoose.Schema({
    title: String,
    year: Number,
    cast: Array,
    genres: Array
})

var FilmModel = mongoose.model('filmes', filmSchema)

var myMovie = new FilmModel({
    title: 'qualquer coisa',
    year: 2019,
    cast: ['a1', 'a2'],
    genres: ['Drama', 'Comedy']
})


myMovie.save((err, film) => {
    if(!err)
        console.log(myMovie.title + ' saved')
})


FilmModel.findOne({title: 'qualquer coisa'}, (err, film) => {
    if(!err)
        console.log(film)
})

/*
FilmModel.find((err, film) => {
    if(!err)
        console.log(film)
})
*/