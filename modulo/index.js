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
        jsonAluno.curso = aluno.curso[0].nome
        jsonAluno.conclusao = aluno.curso[0].conclusao
        jsonAluno.conclusao = aluno.curso[0].disciplinas
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


// Função que retorna as siglas de cada materia
const getSiglaMaterias = (nomeMateria) => {
    const materia = nomeMateria.split(' ')
    const siglaMateria = materia.map(materia => materia.charAt(0).toUpperCase());
    return siglaMateria.join('')
}

//Função que retorna os dados dos alunos pelo número de matrícula
const getMatriculaAlunos = (function (matricula) {
    let jsonMatricula = {}
    let status = false

    alunos.alunos.forEach(aluno => {

        if (aluno.matricula == matricula) {

            jsonMatricula.aluno = aluno
            aluno.curso[0].disciplinas.forEach(disciplina => {
                disciplina.sigla = getSiglaMaterias(disciplina.nome)
            })
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
                let jsonAlunos = {}

                jsonAlunos.foto = curso.foto
                jsonAlunos.nome = curso.nome
                jsonAlunos.curso = curso.curso[0].nome
                jsonAlunos.conclusao = curso.curso[0].conclusao
                jsonAlunos.status = curso.status
                jsonAlunos.matricula = curso.matricula

                arrayAlunosCurso.push(jsonAlunos)
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

//Função que retorna o status dos alunos
const getStatusAlunos = (function (statusAluno, jsonAlunosCurso) {
    let jsonStatus = {}
    let arrayStatus = []
    let status = false

    jsonStatus.status = arrayStatus

    jsonAlunosCurso.forEach(aluno => {
        let jsonStatusAluno = {}

        if (aluno.status.toUpperCase() == statusAluno.toUpperCase()) {
            jsonStatusAluno = aluno

            arrayStatus.push(jsonStatusAluno)
            status = true

        }
    })

    if (status) {
        return jsonStatus
    } else {
        return status
    }


})

// console.log(getNomeCursos())
// console.log(getListaAlunos())
// console.log(getMatriculaAlunos('20151001001'))
// console.log(getAlunosCurso('ds'))
// console.log(getStatusAlunos('finalizado'))
// console.log(getSiglaMaterias('Programação Web Back End'))


module.exports = {
    getNomeCursos,
    getListaAlunos,
    getMatriculaAlunos,
    getAlunosCurso,
    getStatusAlunos,
    getSiglaMaterias
}