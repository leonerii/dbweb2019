var http = require('http')
var fs = require('fs')

http.createServer(function(req,res){
    var file = req.url.substr(1)


    if(file.match(/^[1-9][0-9]?[0-9]?$/)){
        file = 'dataset/arq' + file + '.xml'
    }
    else if(file == ""){
        file = 'arq.xml'
    }

    console.log(req.method + ' ' + req.url)

    res.writeHead(200, {'Content-Type':'text/xml; charset=utf-8'})
    fs.readFile(file, function(err,data){

        if(err) console.log(err);

        res.end(data);
    })
}).listen(7777);

console.log('Servidor na porta 7777')