const openModalButton = document.querySelector("#open-modal");
const closeModalButton = document.querySelector("#close-modal"); 
const modal = document.querySelector("#modal"); 
const fade = document.querySelector("#fade"); 
const listaDeTurma = document.querySelector("#room-list"); 
const emptyMessgeRoom = document.querySelector("#empty-message-room")
const camposTurma = {
    nome:  document.querySelector("#room_name"),
    anoLetivo: document.querySelector("#room_year"),
    periodo: document.querySelector("#room_period"),
    sala: document.querySelector("#room")
}
const URL = "https://v2csj5c0-3000.brs.devtunnels.ms/"

const alternarModal = () => {
    modal.classList.toggle("hide");
    fade.classList.toggle("hide");
};

[openModalButton, closeModalButton, fade].forEach((el) => {
    el.addEventListener("click", () => alternarModal());
});

function onLoad() {
    fetchRooms()
}

function criarTurma() {
    //mandar pro samuel
    //se deu erro: alert de erro
    //se deu certo: cria o component
    //alert("Não foi possivel criar a sala")
    //alert("Sala criada com sucesso")
    criarComponenteDeTurma(camposTurma.nome.value, camposTurma.anoLetivo.value, camposTurma.periodo.value, camposTurma.sala.value)
    limparCamposModalTurma()
    alternarModal()
    emptyMessgeRoom.classList.add("hide")
}

function limparCamposModalTurma(){
    camposTurma.nome.value = null
    camposTurma.anoLetivo.value = 2023
    camposTurma.periodo.value = "matutino"
    camposTurma.sala.value = 1 
}

function criarComponenteDeTurma(nome, anoLetivo, periodo, sala) {
    const pai = document.createElement("li")
    const titulo = document.createElement("h2")
    const texto = document.createElement("p")

    titulo.innerHTML = nome
    texto.innerHTML = `Ano letivo: ${anoLetivo}<br/> 
    Período: ${periodo}<br/>
    Sala: ${sala}`
    pai.className = "folder-componet"
    pai.appendChild(titulo)
    pai.appendChild(texto)
    listaDeTurma.appendChild(pai)
}

function fetchRooms() {
    fetch(URL + "class_group").then(res => res.json()).then(turmas => {
        for (let index = 0; index < turmas.length; index++) {
            const turma = turmas[index];
            criarComponenteDeTurma(turma.nome, turma.anoLetivo, turma.periodo, turma.sala)
        }
        emptyMessgeRoom.classList.add("hide")
    })
}

onLoad(); 

