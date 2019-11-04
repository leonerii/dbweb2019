var express = require('express');
var router = express.Router();
var Filmes = require('../controllers/filmes')

/* GET home page. */
router.get('/', function(req, res) {
    Filmes.listar()
        .then(data => res.jsonp(data))
        .catch(err => res.status(500).jsonp(err))
});

router.get('/:id', (req, res) => {
    var id = req.params.id

    Filmes.consultar(id)
        .then(data => res.jsonp(data))
        .catch(err => res.status(500).jsonp(err))
})

router.post('/', (req, res) => {
    var doc = (req.body)

    doc = JSON.parse(JSON.stringify(doc))

    Filmes.criar(doc)
        .then(data => res.jsonp(data))
        .catch(err => res.status(500).jsonp(err))
})

router.put('/', (req, res) => {
    var doc = (req.body)

    doc = JSON.parse(JSON.stringify(doc))

    Filmes.atualizar(doc)
        .then(data => res.jsonp(data))
        .catch(err => res.status(500).jsonp(err))
})

router.delete('/:id', (req, res) => {
    var id = req.params.id

    Filmes.deletar(id)
        .then(data => res.jsonp(data))
        .catch(err => res.status(500).jsonp(err))
})

module.exports = router;
