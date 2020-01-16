var Musica = require('../models/musica')

const Musicas = module.exports

Musicas.list = () => {
    return Musica.find({}, {titulo: 1, tipo: 1, compositor: 1}).exec()
}

Musicas.get = id => {
    return Musica.find({_id: id}).exec()
}

Musicas.types = () => {
    return Musica.distinct('tipo').exec()
}

Musicas.filter = filter => {
    return Musica.find(filter).exec()
}
