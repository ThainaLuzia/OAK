const openModalButton = document.querySelector("#open-modal");
const closeModalButton = document.querySelector("#close-modal"); 
const modal = document.querySelector("#modal"); 
const fade = document.querySelector("#fade"); 
const listaDeSalas = document.querySelector("#room-list");
const roomName = document.querySelector("#room_name")
const roomNumber = document.querySelector("#room_number")
const roomFloor = document.querySelector("#room_floor")
const emptyMessgeRoom = document.querySelector("#empty-message-room")

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
    createRoomComponent(roomName.value, roomNumber.value, 0, roomFloor.value)
    cleanRoomModalFields()
    toggleModal()
    emptyMessgeRoom.classList.add("hide")
}

function cleanRoomModalFields(){
    roomName.value = null
    roomNumber.value = null
    roomFloor.value = null
}

function createRoomComponent(nomeSala, numero, qtdAlunos, andar) {
    const pai = document.createElement("li")
    const titulo = document.createElement("h2")
    const texto = document.createElement("p")

    titulo.innerHTML = nomeSala
    texto.innerHTML = "Sala: " + numero + "<br/>" + "Alunos: " + qtdAlunos + "<br/>" + "Andar: " + andar

    pai.className = "folder-componet"
    pai.appendChild(titulo)
    pai.appendChild(texto)
    listaDeSalas.appendChild(pai)
}

function fetchRooms() {
    fetch("https://mocki.io/v1/710708d1-2f91-4e24-8f3d-774d559f1071").then(res => res.json()).then(salas => {
        for (let index = 0; index < salas.length; index++) {
            const sala = salas[index];
            createRoomComponent(sala.name, sala.number, sala.qtdStudents, sala.floor)
        }
        emptyMessgeRoom.classList.add("hide")
    })
}

onLoad();