const openModalButton = document.querySelector("#open-modal");
const closeModalButton = document.querySelector("#close-modal"); 
const modal = document.querySelector("#modal"); 
const fade = document.querySelector("#fade"); 


// Mudar os nomes das variaveis e dos ids (roxo, #) // 
const listaDeSalas = document.querySelector("#room-list");
const studentName = document.querySelector("#name_student")
const CPF = document.querySelector("#CPF")
const email = document.querySelector("#email")
const createPassword = document.querySelector("#create_password_student")
const emptyMessgeStudent = document.querySelector("#empty-message-student")

const toggleModal = () => {
    modal.classList.toggle("hide");
    fade.classList.toggle("hide");
};

[openModalButton, closeModalButton, fade].forEach((el) => {
    el.addEventListener("click", () => toggleModal());
});

function onLoad() {
    
}

function createStudent() {
    //mandar pro samuel
    //se deu erro: alert de erro
    //se deu certo: cria o component
    //alert("Não foi possivel criar a sala")
    //alert("Sala criada com sucesso")
    //passar os parametros de aluno (atualizar linha abaixo)
    createStudentComponent(studentName.value, CPF.value, email.value, createPassword.value)
    cleanStudentModalFields()
    toggleModal()
    emptyMessgeRoom.classList.add("hide")
}
 //atualizar para os campos modal de alunos 
function cleanStudentModalFields(){
    studentName.value = null
    CPF.value = null
    email.value = null
    createPassword.value = null
}
 //criar html so que em js 
function createStudentComponent(studentName, CPF, email, createPassword) {
    const pai = document.createElement("li")
    const texto = document.createElement("p")
    const titulo = document.createElement("h3")
    const texto = document.createElement("p")

    titulo.innerHTML = nomeSala
    texto.innerHTML = "Sala: " + numero + "<br/>" + "Alunos: " + qtdAlunos + "<br/>" + "Andar: " + andar

    pai.className = "folder-componet"
    pai.appendChild(titulo)
    pai.appendChild(texto)
    listaDeSalas.appendChild(pai)
}

onLoad();