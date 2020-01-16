var express = require('express');
var router = express.Router();
var axios = require('axios')

var apikey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE1Nzg4NjAwNTQsImV4cCI6MTU4MTQ1MjA1NH0.HIlH4_Ao6504qaLhhbZ2_OtDzaZaG5FeYy-Yc2d9lwQ'

/* GET home page. */
router.get('/', function(req, res, next) {
    axios.get('http://clav-api.dglab.gov.pt/api/entidades?apikey=' + apikey)
        .then(data => {
            res.set('Content-Type', 'text/html')
            res.render('index', {lista: data.data})
        })
        .catch(err => {
            res.render('error', {error: err})
        })
});

router.get('/tipologia/:id', (req, res, next) => {
    axios.get('http://clav-api.dglab.gov.pt/api/entidades/' + req.params.id + '/tipologias?apikey=' + apikey)
        .then(data => {
            res.render('tipologia', {lista: data.data})
        })
        .catch(err => {
            res.render('error', {error: err})
        })
})

router.get('/processo/dono/:id', (req, res, next) => {
    axios.get('http://clav-api.dglab.gov.pt/api/entidades/' + req.params.id + '/intervencao/dono?apikey=' + apikey)
        .then(data => {
            res.render('proc-dono', {lista: data.data})
        })
        .catch(err => {
            res.render('error', {error: err})
        })
})

router.get('/processo/part/:id', (req, res, next) => {
    axios.get('http://clav-api.dglab.gov.pt/api/entidades/' + req.params.id + '/intervencao/participante?apikey=' + apikey)
        .then(data => {
            res.render('proc-part', {lista: data.data})
        })
        .catch(err => {
            res.render('error', {error: err})
        })
})

router.get('/:id', (req, res, next) => {
    axios.get('http://clav-api.dglab.gov.pt/api/entidades/' + req.params.id + '?apikey=' + apikey)
        .then(data => {
            res.render('details', {lista: [data.data]})
        })
        .catch(err => {
            res.render('error', {error: err})
        })
})

module.exports = router;
