/***********************************************************************
 * Objetivo: API Back-End funções
 * Versão: 1.0
 ***********************************************************************/

//Variável que recebe a lista de cursos
var cursos = require('./cursos.js')
var alunos = require('./alunos.js')

//Função que retorna a lista de cursos
const getNomeCursos = (function () {
    let jsonCursos = {}
    let arrayCursos = []
    let status = false

    jsonCursos.cursos = arrayCursos

    cursos.cursos.forEach(curso => {
        let listaCursos = {}
        listaCursos.sigla = curso.sigla
        listaCursos.icone = curso.icone

        arrayCursos.push(listaCursos)
        status = true
    })

    if (status) {
        return jsonCursos
    } else {
        return status
    }

})

//Função que retorna a lista de alunos
const getListaAlunos = (function () {
    let jsonListaAlunos = {}
    let arrayAlunos = []
    let status = false

    jsonListaAlunos.alunos = arrayAlunos

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

//Função que retorna os dados dos alunos pelo número de matrícula
const getMatriculaAlunos = (function (matricula) {
    let jsonMatricula = {}
    let status = false

    alunos.alunos.forEach(aluno => {

        if (aluno.matricula == matricula) {

            jsonMatricula.foto = aluno.foto
            jsonMatricula.nome = aluno.nome
            jsonMatricula.matricula = aluno.matricula
            jsonMatricula.sexo = aluno.sexo
            jsonMatricula.curso = aluno.curso
            jsonMatricula.status = aluno.status
            status = true
        }
    })

    if (status) {
        return jsonMatricula
    } else {
        return status
    }

})

//Função que retorna uma lista de todos os alunos matriculados no curso especificado
const getAlunosCurso = (function (nomeCurso) {
    let jsonAlunosCurso = {}
    let arrayAlunosCurso = []
    let status = false

    jsonAlunosCurso.curso = arrayAlunosCurso

    alunos.alunos.forEach(curso => {

        curso.curso.forEach(nomeDoCurso => {

            if (nomeDoCurso.sigla.toUpperCase() == nomeCurso.toUpperCase()) {

                arrayAlunosCurso.push(curso)
                status = true
            }
        })
    })



    if (status) {
        return jsonAlunosCurso
    } else {
        return status
    }

})

// console.log(getNomeCursos())
// console.log(getListaAlunos())
// console.log(getMatriculaAlunos('20151001001'))
// console.log(getAlunosCurso('rds'))

module.exports = {
    getNomeCursos,
    getListaAlunos,
    getMatriculaAlunos,
    getAlunosCurso
}