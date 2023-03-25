/***********************************************************************
 * Objetivo: API Back-End funções
 * Versão: 1.0
 ***********************************************************************/

//Imports dos recursos baixados
const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')

//Const que recebe o documento que contém a função getNomeCursos
const jsonDados = require('./modulo/index.js')

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

//EndPoints

//EndPoint da função getNomeCursos que lista os cursos
app.get('/v1/lion-school/cursos', cors(), async function (request, response, next) {
    let cursos = jsonDados.getNomeCursos()
    let statusCode
    let dadosCurso = {}

    if (cursos) {
        statusCode = 200
        dadosCurso = cursos
    } else {
        statusCode = 404
    }

    response.status(statusCode)
    response.json(dadosCurso)

})

//EndPoint da função getListaAlunos que lista todos os alunos da escola
app.get('/v1/lion-school/alunos', cors(), async function (request, response, next) {
    let alunos = jsonDados.getListaAlunos()
    let statusCode
    let dadosAlunos = {}

    if (alunos) {
        statusCode = 200
        dadosAlunos = alunos
    } else {
        statusCode = 404
    }

    response.status(statusCode)
    response.json(dadosAlunos)
 
})


//EndPoint da função getMatriculaAlunos que traz os dados do aluno com base no número da matricula
app.get('/v1/lion-school/alunos/:numeroMatricula', cors(), async function(request, response, next) {
    let numeroMatricula = request.params.numeroMatricula
    let statusCode
    let dadosMatricula = {}

    if (numeroMatricula == '' || numeroMatricula == undefined || numeroMatricula.length != 11 || isNaN(numeroMatricula)) {
        statusCode = 400
        dadosMatricula.message = 'Não foi possível processar pois os dados de entrada que foi enviado não corresponde ao exigido.'
    } else {
        let matricula = jsonDados.getMatriculaAlunos(numeroMatricula)

        if (matricula) {
            statusCode = 200
            dadosMatricula = matricula
        } else {
            statusCode = 404
        }
    }

    response.status(statusCode)
    response.json(dadosMatricula)

})

//EndPoint da função getAlunosCurso que filtra os alunos de acordo com seu curso
app.get('/v1/lion-school/alunos/curso/:curso', cors(), async function (request, response, next) {
    let siglaCurso = request.params.curso
    let statusCode
    let dadosCursoSigla = {}


    if (siglaCurso == '' || siglaCurso == undefined || !isNaN(siglaCurso)) {

        statusCode = 400
        dadosCursoSigla.message = 'Não foi possível processar pois os dados de entrada que foi enviado não corresponde ao exigido, confira o valor pois não pode ser vazio, precisa ser um caractere e ter dois dígitos'

    } else {
        let cursoSigla = jsonDados.getAlunosCurso(siglaCurso)

        if (cursoSigla) {
            statusCode = 200
            dadosCursoSigla = cursoSigla
        } else {
            statusCode = 404
        }
    }

    response.status(statusCode)
    response.json(dadosCursoSigla)




})






app.listen(8080, function () {
    console.log('Servidor aguardando requisições na porta 8080.')
})