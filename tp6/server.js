var http = require('http')
var pug = require('pug')
var fs = require('fs')
var jsonfile = require('jsonfile')
var {parse} = require('querystring')

var db = "arq-son-EVO.json"

http.createServer((req,res) => {
    console.log(req.method + ' ' + req.url)

    if(req.method == 'GET'){
        if(req.url == '/'){
            res.writeHead(200, {'Content-Type' : 'text/html', 'charset' : 'utf-8'})
            jsonfile.readFile(db, (err, data) => {
                if(!err){
                    res.write(pug.renderFile('index.pug', {arq_lista: data}))
                }
                else{
                    res.write(pug.renderFile('erro.pug', {e: 'ERRO na leitura da db'}))
                }
                res.end()
            })
        
        }else if(req.url == '/w3.css'){
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
        
        }else if(req.url.match(/^\/[a-z0-9-]{36}$/)){
            res.writeHead(200, {'Content-Type' : 'text/html', 'charset' : 'utf-8'})
            jsonfile.readFile(db, (err, data) => {
                
                if(!err){
                    var id = req.url.split('/')[1]
                    var index = data.findIndex(a => a.id == id)
                    
                    if(index > -1)
                        res.write(pug.renderFile('details.pug', {arq: data[index]}))

                    else
                        res.write(pug.renderFile('erro.pug', {e: 'Arqueositio nao encontrado'}))
                }
                else
                    res.write(pug.renderFile('erro.pug', {e: 'ERRO na leitura da db'}))

                res.end()
            })
        
        }else if(req.url.match(/update/)){

            res.writeHead(200, {'Content-Type' : 'text/html', 'charset' : 'utf-8'})
            jsonfile.readFile(db, (err, data) => {
                
                if(!err){
                    var id = req.url.split('/')[2]
                    res.write(pug.renderFile('update.pug', {id: id}))
                }
                else{
                    res.write(pug.renderFile('erro.pug', {e: 'ERRO na leitura da db'}))
                }
                res.end()
            })
        
        }else if(req.url == '/apagar.js'){
            res.writeHead(200, {'Content-Type' : 'text/javascript', 'charset' : 'utf-8'})
            fs.readFile('apagar.js', (err, data) => {
                if(!err) res.write(data)
                else res.write(pug.renderFile('<p>Erro: ' + err + '</p>'))
                
                res.end()
            })
        
        }else{
            res.writeHead(200, {'Content-Type' : 'text/html', 'charset' : 'utf-8'})
            console.log('ERRO ' + req.url + ' nao encontrado')
            res.write(pug.renderFile('erro.pug', {e: 'ERRO ' + req.url + ' nao encontrado'}))
            res.end()
        }

    }else if(req.method == 'POST'){
        if(req.url == '/'){
            recuperaInfo(req, resultado => {
                jsonfile.readFile(db, (err, data) => {
                    
                    if(!err){
                        data.push(resultado)
                        jsonfile.writeFile(db, data, err => {
                            
                            if(!err){
                                console.log('registro gravado com sucesso')
                            }
                        })
                    }
                    res.writeHead(301, {
                        'Location' : 'http://127.0.0.1:9999/'
                    })
                    res.end()
                })
            })
        }else{
            res.writeHead(200, {'Content-Type' : 'text/html', 'charset' : 'utf-8'})
            console.log('ERRO ' + req.url + ' nao encontrado')
            //puggs.org manual
            res.write(pug.renderFile('erro.pug', {e: 'ERRO ' + req.url + ' nao encontrado'}))
            res.end()
        }

    }else if(req.method == 'DELETE'){
        if(req.url.startsWith('/')){
            var id = req.url.split('/')[1]

            jsonfile.readFile(db, (err, data) => {
                if(!err){
                    var index = data.findIndex(c => c.id == id)

                    if(index > -1){
                        data.splice(index, 1)
                        jsonfile.writeFile(db, data, err => {
                            if(err) console.log(err)
                            else console.log('db atualizada com sucesso')
                        })
                        res.end('0')
                    
                    }else{
                        console.log('arq nao encontrado para remover')
                        res.end(1)
                    }
                
                }else{
                    console.log('erro na leitura na db')
                }
            })

        }else{
            res.end('1')
        }
    
    }else if(req.method == 'PUT'){
        console.log('puuuuuuuuuuut')
        if(req.url.match(/[a-z0-9-]{36}/)){
            res.writeHead(200, {'Content-Type' : 'text/html', 'charset' : 'utf-8'})
            recuperaInfo(req, resultado => {
                jsonfile.readFile(db, (err, data) => {
                    
                    if(!err){
                        var id = req.url.split('/')[1]
                        console.log('id = ' + id)
                        var index = data.findIndex(a => a.id == id)
                        resultado.id = id
                        data[index] = resultado
                        jsonfile.writeFile(db, data, err => {
                            
                            if(!err){
                                console.log('registro gravado com sucesso')
                            }
                        })
                    }
                    res.writeHead(301, {
                        'Location' : 'http://127.0.0.1:9999/' + id
                    })
                    res.end()
                })
            })
        }else{
            res.writeHead(200, {'Content-Type' : 'text/html', 'charset' : 'utf-8'})
            console.log('ERRO ' + req.method + ' nao suportado')
            res.write(pug.renderFile('erro.pug', {e: 'ERRO ' + req.url + ' nao suportado'}))
            res.end()
        }
    
    }else{
        res.writeHead(200, {'Content-Type' : 'text/html', 'charset' : 'utf-8'})
        console.log('ERRO ' + req.method + ' nao suportado')
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