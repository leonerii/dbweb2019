var http = require('http')
var url = require('url')
var pug = require('pug')
var fs = require('fs')
var jsonfile = require('jsonfile')
var {parse} = require('querystring')

var db = "task.json"

http.createServer((req,res) => {
    var purl = url.parse(req.url, true)

    console.log(req.method + ' ' + purl.pathname)

    if(req.method == 'GET'){
        if((purl.pathname == '/') || (purl.pathname == '/task_manager')){
            res.writeHead(200, {'Content-Type' : 'text/html', 'charset' : 'utf-8'})
            jsonfile.readFile(db, (err, data) => {
                if(!err){
                    res.write(pug.renderFile('index.pug', {task_list: data}))
                }
                else{
                    res.write(pug.renderFile('erro.pug', {e: 'ERRO na leitura da db'}))
                }
                res.end()
            })
        
        }else if(purl.pathname == '/w3.css'){
            res.writeHead(200, {'Content-Type' : 'text/css', 'charset' : 'utf-8'})
            fs.readFile('stylesheet/w3.css', (err, data) => {
                if(!err){
                    res.write(data)
                }
                else{
                    res.write('<p>Error: ' + err + '</p>')
                }
                res.end()
            })
        
        }else{
            res.writeHead(200, {'Content-Type' : 'text/html', 'charset' : 'utf-8'})
            console.log('ERROR ' + purl.pathname + ' not find')
            //puggs.org manual
            res.write(pug.renderFile('erro.pug', {e: 'ERRO ' + purl.pathname + ' nao encontrado'}))
            res.end()
        }

    }else if(req.method == 'POST'){
        if(purl.pathname == '/create_task'){
            recuperaInfo(req, resultado => {
                jsonfile.readFile(db, (err, data) => {
                    
                    if(!err){
                        delete resultado.Create
                        data.push(resultado)
                        jsonfile.writeFile(db, data, err => {
                            
                            if(!err){
                                res.writeHead(301, {
                                    'Location' : 'http://127.0.0.1:9999/'
                                })
                                res.end()
                            }
                        })
                    }
                })
            })
        }else{
            res.writeHead(200, {'Content-Type' : 'text/html', 'charset' : 'utf-8'})
            console.log('ERROR ' + purl.pathname + ' not find')
            res.write(pug.renderFile('erro.pug', {e: 'ERROR ' + purl.pathname + ' not find'}))
            res.end()
        }

    }else{
        res.writeHead(200, {'Content-Type' : 'text/html', 'charset' : 'utf-8'})
        console.log('ERROR ' + req.method + ' not supported')
        res.write(pug.renderFile('erro.pug', {e: 'ERROR ' + req.method + ' not supported'}))
        res.end()
    }
}).listen(9999, () => {
    console.log('Servidor na porta 9999')
})

function recuperaInfo(req, callback){
    if(req.headers['content-type'] == 'application/x-www-form-urlencoded'){
        var body = ''
        req.on('data', data => {
            body += data.toString()
        })
        req.on('end', () => {
            callback(parse(body))
        })
    }else{
        console.log('header error')
    }
}