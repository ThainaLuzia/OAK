function camposAlunoValidos() {
    if (inputsAluno.nome.value.length <= 3) {
        alert("O nome do aluno é muito curto")
        return false
    }
    return true 
}


