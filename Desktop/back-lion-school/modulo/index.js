/***********************************************************************
 * Objetivo: API Back-End funções
 * Versão: 1.0
 ***********************************************************************/

//Variável que recebe a lista de cursos
var cursos = require('./cursos.js')
var alunos = require('./alunos.js')

//Função que retorna a sigla do curso para a primeira página do site
const getNomeCursos = (function(sigla, icone) {
    let jsonCursos = {}
    let status = false

    cursos.cursos.forEach(curso => {

        if (curso.sigla == sigla.toUpperCase()) {
            jsonCursos.sigla = curso.sigla
            jsonCursos.icone = curso.icone
            status = true
        }

    })

    if (status) {
        return jsonCursos
    } else {
        return status
    }

})

//Função que retorna a lista de alunos para a segunda página do site
const getListaAlunos = (function() {
    let jsonListaAlunos = {}
    let arrayAlunos = []
    let status = false

    jsonListaAlunos = arrayAlunos

    alunos.alunos.forEach(aluno => {

        let jsonAluno = {}

        jsonAluno.foto = aluno.foto
        jsonAluno.nome = aluno.nome
        jsonAluno.matricula = aluno.matricula
        jsonAluno.sexo = aluno.sexo
        jsonAluno.curso = aluno.curso
        jsonAluno.status = aluno.status

        arrayAlunos.push(jsonAluno)
        status = true

    })

    if (status) {
        return jsonListaAlunos
    } else {
        return status
    }

})

console.log(getListaAlunos());


module.exports = {
    getNomeCursos,
    getListaAlunos
}