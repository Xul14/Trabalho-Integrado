/***********************************************************************
 * Objetivo: API Back-End funções
 * Versão: 1.0
 ***********************************************************************/

//Imports dos recursos baixados
const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')

//Const que recebe o documento que contém a função getNomeCursos
const JsonCursos = require('./modulo/index.js')

const app = express()

//Cria um objeto com as caracteristicas do express.
app.use((request, response, next) => {

    //Define se a API vai ser pública ou privada.
    response.header('Access-Control-Allow-Origin', '*')

    //Quais métodos poderão ser utilizados nas requisições da API.
    response.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS')

    //Envia para o cors as regras de permissões
    app.use(cors())

    next()

})

app.get('/v1/lion-school/cursos/:siglaCurso', cors(), async function(request, response, next) {
    let siglaCurso = request.params.siglaCurso
    let statusCode
    let dadosCurso = {}

    if (siglaCurso == '' || siglaCurso == undefined || !isNaN(siglaCurso)) {
        statusCode = 400
        dadosCurso.message = 'Não foi possível processar pois os dados de entrada que foi enviado não corresponde ao exigido.'
    } else {
        let cursos = JsonCursos.getNomeCursos(siglaCurso)

        if (cursos) {
            statusCode = 200
            dadosCurso = cursos
        } else {
            statusCode = 404
        }
    }

    response.status(statusCode)
    response.json(dadosCurso)

})

app.get('/v1/lion-school/alunos', cors(), async function(request, response, next) {
    let siglaCurso = request.params.siglaCurso
    let statusCode
    let dadosAlunos = {}
})

app.listen(8080, function() {
    console.log('Servidor aguardando requisições na porta 8080.')
})