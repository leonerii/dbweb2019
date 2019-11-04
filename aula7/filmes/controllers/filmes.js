var Filme = require('../models/filme')

const Filmes = module.exports


Filmes.listar = () => {
    return Filme.find().sort({title: 1}).exec()
}

Filmes.consultar = fid => {
    return Filme.findOne({_id: fid}).exec()
}

Filmes.deletar = fid => {
    return Filme.deleteOne({_id: fid}).exec()
}

Filmes.criar = movie_ => {
    var movie = new Filme(movie_)

    return movie.save()
}

Filmes.atualizar = movie_ => {
    var movie = new Filme(movie_)

    return movie.updateOne()
}



