function apagaItem(numero){
    console.log('apagar o aluno de numero ' + numero)

    axios.delete('/' + numero)
        .then(response => window.location.assign('/'))
        .catch(err => console.log(err))
}