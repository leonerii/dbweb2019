var express = require('express');
var router = express.Router();
var Musicas = require('../controller/musica')

/* GET home page. */
router.get('/obras', function(req, res, next) {
    if (req.query.compositor){
        console.log('compositor = ' + req.query.compositor)
        Musicas.filter({'compositor': req.query.compositor})
            .then(data => res.jsonp(data))
            .catch(err => res.statusCode(500).jsonp(err))
    }
    else if (req.query.instrumento){
        Musicas.filter({'instrumentos.partitura.voz': req.query.instrumento})
            .then(data => res.jsonp(data))
            .catch(err => res.statusCode(500).jsonp(err))
    }
    else {
        Musicas.list()
            .then(data => res.jsonp(data))
            .catch(err => res.statusCode(500).jsonp(err))
    }
});

router.get('/obras/:id', (req, res, next) => {
    Musicas.get(req.params.id)
        .then(data => res.jsonp(data))
        .catch(err => res.statusCode(500).jsonp(err))
})

router.get('/tipos', (req, res, next) => {
    Musicas.types()
        .then(data => res.jsonp(data))
        .catch(err => res.statusCode(500).jsonp(err))
})

router.get('/obrasQuant', (req, res, next) => {
    Musicas.get(req.params.id)
        .then(data => res.jsonp(data))
        .catch(err => res.statusCode(500).jsonp(err))
})

module.exports = router;
