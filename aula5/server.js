var http = require('http')
var url = require('url')
var pug = require('pug')
var fs = require('fs')
var jsonfile = require('jsonfile')
var {parse} = require('querystring')

var db = "alunos.json"

http.createServer((req,res) => {
    var purl = url.parse(req.url, true)
    var query = purl.query

    console.log(req.method + ' ' + purl.pathname)

    if(req.method == 'GET'){
        if((purl.pathname == '/') || (purl.pathname == '/gestaoAlunos')){
            res.writeHead(200, {'Content-Type' : 'text/html', 'charset' : 'utf-8'})
            //puggs.org manual
            res.write(pug.renderFile('index.pug'))
        
        }else if(purl.pathname == '/w3.css'){
            res.writeHead(200, {'Content-Type' : 'text/css', 'charset' : 'utf-8'})
            fs.readFile('stylesheet/w3.css', (err, data) => {
                if(!err){
                    res.write(data)
                }
                else{
                    res.write(pug.renderFile('<p>Erro: ' + err + '</p>'))
                }
                res.end()
            })
        
        }else if(purl.pathname == '/listar'){
            res.writeHead(200, {'Content-Type' : 'text/html', 'charset' : 'utf-8'})
            jsonfile.readFile(db, (err, data) => {
                if(!err){
                    res.write(pug.renderFile('lista-alunos.pug', {lista: data}))
                }
                else{
                    res.write(pug.renderFile('erro.pug', {e: 'ERRO na leitura da db'}))
                }
                res.end()
            })
        
        }else if(purl.pathname == '/registar'){
            res.writeHead(200, {'Content-Type' : 'text/html', 'charset' : 'utf-8'})
            res.write(pug.renderFile('form-alunos.pug'))
            res.end()
        
        }else{
            res.writeHead(200, {'Content-Type' : 'text/html', 'charset' : 'utf-8'})
            console.log('ERRO ' + purl.pathname + ' nao encontrado')
            //puggs.org manual
            res.write(pug.renderFile('erro.pug', {e: 'ERRO ' + purl.pathname + ' nao encontrado'}))
            res.end()
        }

    }else if(req.method == 'POST'){
        if(purl.pathname == '/aluno'){
            recuperaInfo(req, resultado => {
                jsonfile.readFile(db, (err, data) => {
                    
                    if(!err){
                        data.push(resultado)
                        jsonfile.writeFile(db, data, err => {
                            
                            if(!err){
                                console.log('registro gravado com sucesso')
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
            console.log('ERRO ' + purl.pathname + ' nao encontrado')
            //puggs.org manual
            res.write(pug.renderFile('erro.pug', {e: 'ERRO ' + purl.pathname + ' nao encontrado'}))
            res.end()
        }

    }else{
        res.writeHead(200, {'Content-Type' : 'text/html', 'charset' : 'utf-8'})
        console.log('ERRO ' + req.method + ' nao suportado')
        //puggs.org manual
        res.write(pug.renderFile('erro.pug', {e: 'ERRO ' + req.method + ' nao suportado'}))
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