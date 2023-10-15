const BASE_URL = "https://g0sdm8q2-3000.brs.devtunnels.ms/";

// CAMPOS DA TELA DE LOGIN
const inputsLogin = {
  usuario: document.getElementById("usuario"),
  senha: document.getElementById("senha"),
};

// FUNÇÃO QUE É CHAMADA NO HTML
function logar() {
    if(inputsLogin.usuario.value == ""){
        alert("Favor digite o usuário");
    }else if(inputsLogin.senha.value == ""){
        alert("Favor digite a senha");
    }else{
        buscarLoginAPI(inputsLogin.usuario.value, inputsLogin.senha.value);
    }
}


// PESQUISA USUARIO NO BANCO
function buscarLoginAPI(usuario, senha) {
  fetch(BASE_URL + `login?nome_usuario=${usuario}&senha=${senha}`)
    .then((resposta) => {
        if(resposta.status === 403){
            alert("Usuario ou senha incorretos");
        }else{
            return resposta.json();
        }
    })
    .then((login) => {
        if(login.tipo_usuario === "aluno"){
            alert("Alunos não possuem permissão nesta plataforma");
        }else if(login.tipo_usuario === "admin"){
            location.href = "classGroup.html";
        }
    })
}