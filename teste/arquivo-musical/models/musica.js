var mongoose = require('mongoose');

var partituraSchema = new mongoose.Schema({
    voz: String,
    path: String
})

var instrumentoSchema = new mongoose.Schema({
    designacao: String,
    partitura: partituraSchema
});

var musicaSchema = new mongoose.Schema({
    _id: String,
    titulo: String,
    tipo: String,
    compositor: String,
    instrumentos: [instrumentoSchema]    
});


module.exports = mongoose.model('musica', musicaSchema, 'musica');