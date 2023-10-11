const openModalButton = document.querySelector("#open-modal");
const closeModalButton = document.querySelector("#close-modal"); 
const modal = document.querySelector("#modal"); 
const fade = document.querySelector("#fade"); 
const listaDeTurma = document.querySelector("#room-list");
const roomName = document.querySelector("#room_name")
const roomYear = document.querySelector("#room_year")
const roomPeriod = document.querySelector("#room_period")
const roomNumber = document.querySelector("#room_number") 
const roomType = document.querySelector("#room_type") 
const emptyMessgeRoom = document.querySelector("#empty-message-room")
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
    createRoomComponent(roomName.value, roomYear.value, 0, roomPeriod.value)
    cleanRoomModalFields()
    toggleModal()
    emptyMessgeRoom.classList.add("hide")
}

function cleanRoomModalFields(){
    roomName.value = null
    roomYear.value = null
    roomPeriod.value = null
}

function createRoomComponent(nomeTurma, numero, qtdAlunos, andar) {
    const pai = document.createElement("li")
    const titulo = document.createElement("h2")
    const texto = document.createElement("p")

    titulo.innerHTML = nomeTurma
    texto.innerHTML = "Turma: " + numero + "<br/>" + "Alunos: " + qtdAlunos + "<br/>" + "Andar: " + andar

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

