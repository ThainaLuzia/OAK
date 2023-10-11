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

const toggleModal = () => {
    modal.classList.toggle("hide");
    fade.classList.toggle("hide");
};

[openModalButton, closeModalButton, fade].forEach((el) => {
    el.addEventListener("click", () => toggleModal());
});

function onLoad() {
    fetchRooms()
}

function createRoom() {
    //mandar pro samuel
    //se deu erro: alert de erro
    //se deu certo: cria o component
    //alert("Não foi possivel criar a sala")
    //alert("Sala criada com sucesso")
    createRoomComponent()
    cleanRoomModalFields()
    toggleModal()
    emptyMessgeRoom.classList.add("hide")
}

function cleanRoomModalFields(){
    camposTurma.nome.value = null
    camposTurma.anoLetivo.value = 2023
    camposTurma.periodo.value = "matutino"
    camposTurma.sala.value = 1 
}

function createRoomComponent() {
    const pai = document.createElement("li")
    const titulo = document.createElement("h2")
    const texto = document.createElement("p")

    titulo.innerHTML = camposTurma.nome.value
    texto.innerHTML = `Ano letivo: ${camposTurma.anoLetivo.value}<br/> 
    Período: ${camposTurma.periodo.value}<br/>
    Sala: ${camposTurma.sala.value}`
    pai.className = "folder-componet"
    pai.appendChild(titulo)
    pai.appendChild(texto)
    listaDeTurma.appendChild(pai)
}

function fetchRooms() {
    fetch(URL + "rooms").then(res => res.json()).then(turmas => {
        for (let index = 0; index < turmas.length; index++) {
            const turma = turmas[index];
            createRoomComponent(turma.NomeTurma, turma.number, turma.qtdStudents, turma.floor)
        }
        emptyMessgeRoom.classList.add("hide")
    })
}

onLoad(); 

