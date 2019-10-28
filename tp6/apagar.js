function apagaItem(numero){
    console.log('apagar o aluno de numero ' + numero)

    axios.delete('/' + numero)
        .then(response => window.location.assign('/'))
        .catch(err => console.log(err))
}

function details(id) {
    console.log('detalhes do arq ' + id)

    axios.get('/' + id)
        .then(response => window.location.assign('/' + id))
        .catch(err => console.log(err))
}

function update(id) {
    console.log('update do arq ' + id)

    axios.put('/' + id)
        .then(response => window.location.assign('/' + id))
        .catch(err => console.log(err))
}

function update_(id) {
    console.log('update do arq ' + id)

    axios.get('/update/' + id)
        .then(response => window.location.assign('/update/' + id))
        .catch(err => console.log(err))
}

