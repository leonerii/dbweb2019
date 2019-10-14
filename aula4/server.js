var http = require('http')
var meta = require('./meta.js')
var url = require('url')
var fs = require('fs')

http.createServer(function(req,res){
    var q = url.parse(req.url, true).query
    //var qf = url.parse(req.url, false).query

    //var result = parseInt(q.a, 10) + parseInt(q.b, 10)

    var file_ = req.url.split('/')
    var file = file_[file_.length-1]

    console.log(file)

    console.log(req.method + ' ' + req.url)

    if(file.match(/[1-3]/)){
        res.writeHead(200, {'Content-Type':'text/html; charset=utf-8'})
        fs.readFile('index' + file + '.html', function(err,data){
            try{
                console.log(file)
                //res.write("Criado com NodeJS por " + meta.myName() + " em " + meta.myDate() + "\n")
                //res.write('True: <pre>' + JSON.stringify(q) + '</pre>')
                //res.write('False: <pre>' + JSON.stringify(qf) + '</pre>')
                res.end(data)

                //res.end(q.a + ' + ' + q.b + ' = ' + result)

            }catch(err){
                console.log(err)
            }})
    }else{
        res.writeHead(400, {'Content-Type':'text/html; charset=utf-8'})
        res.end('shit')
    }  
}).listen(7777);

//console.log('string')
//console.dir(obj)
//console.debug('string')

console.log('Servidor na porta 7777')