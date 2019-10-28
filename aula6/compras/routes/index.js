var express = require('express');
var router = express.Router();
var jsonfile = require('jsonfile')

var db = __dirname + '../compras.json'

/* GET home page. */
router.get('/', function(req, res, next) {
jsonfile.readFile(db, (err, data) => {
    
    if(!err) res.render('index', {item_lista: data})
    
    else console.log(err)
})
res.render('index', {item_lista: []});
})

router.post('/', (req, res) => {
jsonfile.writeFile(db, data, err => {
    if(!err) res.render('index', {item_lista: data})
    else res.render('erro', {error: err})
})
res.redirect('/')
})

module.exports = router;
