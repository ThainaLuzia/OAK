const openModalButton = document.querySelector("#open-modal");
const closeModalButton = document.querySelector("#close-modal");
const modal = document.querySelector("#modal");
const fade = document.querySelector("#fade");
const listaDeAlunos = document.querySelector("#student-list");
const emptyMessgeStudent = document.querySelector("#empty-message-student")
const BASE_URL = "https://v2csj5c0-3000.brs.devtunnels.ms/"

// CAMPOS DA MODAL DE ALUNOS
const inputsAluno = {
    nome: document.querySelector("#name_student"),
    rg: document.querySelector("#rg"),
    cpf: document.querySelector("#cpf"),
    telefone: document.querySelector("#phone"),
    endereco: document.querySelector("#address"),
    email: document.querySelector("#email"),
    senha: document.querySelector("#create_password_student"),
    senhaConfirma: document.querySelector("#confirm_password_student"),
}

function onLoad() {
    fetchStudents()
}

const alternarModal = () => {
    modal.classList.toggle("hide");
    fade.classList.toggle("hide");
};

[openModalButton, closeModalButton].forEach((el) => {
    el.addEventListener("click", () => alternarModal());
});

onLoad()

function salvarAluno() {
    if (inputsTurma.id.value) {
      atualizarAluno();
    } else {
      criarAluno();
    }
  }

  function criarAluno() {
    criarAlunoAPI()
      .then(function () {
        // SE DEU CERTO CRIAR  O ALUNO
        window.location.reload();
      })
      .catch(function () {
        // SE DEU ERRO CRIAR A TURMA
        alert(
          "Não foi possível criar aluno corretamente. Tente novamente mais tarde"
        );
      });
  }

  function atualizarAluno() {
    atualizarAlunoAPI(
      inputsAluno.nome.value,
      inputsAluno.rg.value,
      inputsAluno.cpf.value,
      inputsAluno.telefone.value,
      inputsAluno.endereco.value,
      inputsAluno.email.value,
      inputsAluno.senha.value,
      inputsAluno.senhaConfirma.value
    )
      .then(function () {
        // SE DEU CERTO ATUALIZAR  A TURMA
        window.location.reload();
      })
      .catch(function () {
        // SE DEU ERRO ATUALIZAR A TURMA
        alert(
          "Não foi possível atualizar o aluno corretamente. Tente novamente mais tarde"
        );
      });
  }

  function limparCamposModalAluno() {
    definirCamposModalAluno(null, null, null, null, null, null, null, null);
  }

  function definirCamposModalAluno(nome, rg, cpf, telefone, endereco, email, senha, senhaConfirma){
  inputsAluno.nome.value = nome;
  inputsAluno.rg.value = rg;
  inputsAluno.cpf.value = cpf;
  inputsAluno.telefone.value = telefone;
  inputsAluno.endereco.value = endereco;
  inputsAluno.email.value = email;
  inputsAluno.senha.value  = senha;
  inputsAluno.senhaConfirma.value = senhaConfirma
  }

  //criar html so que em js 
function criarComponenteAluno(nome, rg, cpf, telefone, endereco, email, senha, senhaConfirma) {
    const pai = document.createElement("li")
    pai.innerHTML = `<div class="status-container">
                        <span class="status"></span>
                        <p>${cpf}</p>
                    </div>
                    <h3>${nome}</h3>
                    <p>${email}</p>
                    <div class="list-action">
                        <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 22 22" fill="none">
                            <path
                             d="M8 0H2C1.46957 0 0.960859 0.210714 0.585786 0.585786C0.210714 0.960859 0 1.46957 0 2V8C0 8.53043 0.210714 9.03914 0.585786 9.41421C0.960859 9.78929 1.46957 10 2 10H8C8.53043 10 9.03914 9.78929 9.41421 9.41421C9.78929 9.03914 10 8.53043 10 8V2C10 1.46957 9.78929 0.960859 9.41421 0.585786C9.03914 0.210714 8.53043 0 8 0ZM8 8H2V2H8V8ZM8 12H2C1.46957 12 0.960859 12.2107 0.585786 12.5858C0.210714 12.9609 0 13.4696 0 14V20C0 20.5304 0.210714 21.0391 0.585786 21.4142C0.960859 21.7893 1.46957 22 2 22H8C8.53043 22 9.03914 21.7893 9.41421 21.4142C9.78929 21.0391 10 20.5304 10 20V14C10 13.4696 9.78929 12.9609 9.41421 12.5858C9.03914 12.2107 8.53043 12 8 12ZM8 20H2V14H8V20ZM20 0H14C13.4696 0 12.9609 0.210714 12.5858 0.585786C12.2107 0.960859 12 1.46957 12 2V8C12 8.53043 12.2107 9.03914 12.5858 9.41421C12.9609 9.78929 13.4696 10 14 10H20C20.5304 10 21.0391 9.78929 21.4142 9.41421C21.7893 9.03914 22 8.53043 22 8V2C22 1.46957 21.7893 0.960859 21.4142 0.585786C21.0391 0.210714 20.5304 0 20 0ZM20 8H14V2H20V8ZM12 17V13C12 12.7348 12.1054 12.4804 12.2929 12.2929C12.4804 12.1054 12.7348 12 13 12C13.2652 12 13.5196 12.1054 13.7071 12.2929C13.8946 12.4804 14 12.7348 14 13V17C14 17.2652 13.8946 17.5196 13.7071 17.7071C13.5196 17.8946 13.2652 18 13 18C12.7348 18 12.4804 17.8946 12.2929 17.7071C12.1054 17.5196 12 17.2652 12 17ZM22 15C22 15.2652 21.8946 15.5196 21.7071 15.7071C21.5196 15.8946 21.2652 16 21 16H18V21C18 21.2652 17.8946 21.5196 17.7071 21.7071C17.5196 21.8946 17.2652 22 17 22H13C12.7348 22 12.4804 21.8946 12.2929 21.7071C12.1054 21.5196 12 21.2652 12 21C12 20.7348 12.1054 20.4804 12.2929 20.2929C12.4804 20.1054 12.7348 20 13 20H16V13C16 12.7348 16.1054 12.4804 16.2929 12.2929C16.4804 12.1054 16.7348 12 17 12C17.2652 12 17.5196 12.1054 17.7071 12.2929C17.8946 12.4804 18 12.7348 18 13V14H21C21.2652 14 21.5196 14.1054 21.7071 14.2929C21.8946 14.4804 22 14.7348 22 15ZM22 19V21C22 21.2652 21.8946 21.5196 21.7071 21.7071C21.5196 21.8946 21.2652 22 21 22C20.7348 22 20.4804 21.8946 20.2929 21.7071C20.1054 21.5196 20 21.2652 20 21V19C20 18.7348 20.1054 18.4804 20.2929 18.2929C20.4804 18.1054 20.7348 18 21 18C21.2652 18 21.5196 18.1054 21.7071 18.2929C21.8946 18.4804 22 18.7348 22 19Z" />
                        </svg>
                        <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" viewBox="0 0 25 25" fill="none">
                             <path
                                 d="M24.7075 4.29329L20.7075 0.293287C20.6146 0.20031 20.5043 0.126551 20.3829 0.0762267C20.2615 0.0259024 20.1314 0 20 0C19.8686 0 19.7385 0.0259024 19.6171 0.0762267C19.4957 0.126551 19.3854 0.20031 19.2925 0.293287L7.2925 12.2933C7.19967 12.3862 7.12605 12.4965 7.07586 12.6179C7.02568 12.7393 6.9999 12.8694 7 13.0008V17.0008C7 17.266 7.10536 17.5204 7.29289 17.7079C7.48043 17.8954 7.73478 18.0008 8 18.0008H12C12.1314 18.0009 12.2615 17.9751 12.3829 17.9249C12.5042 17.8747 12.6146 17.8011 12.7075 17.7083L24.7075 5.70829C24.8005 5.61541 24.8742 5.50513 24.9246 5.38373C24.9749 5.26233 25.0008 5.1322 25.0008 5.00079C25.0008 4.86937 24.9749 4.73924 24.9246 4.61785C24.8742 4.49645 24.8005 4.38616 24.7075 4.29329ZM11.5863 16.0008H9V13.4145L17 5.41454L19.5863 8.00079L11.5863 16.0008ZM21 6.58704L18.4137 4.00079L20 2.41454L22.5863 5.00079L21 6.58704ZM24 12.0008V23.0008C24 23.5312 23.7893 24.0399 23.4142 24.415C23.0391 24.7901 22.5304 25.0008 22 25.0008H2C1.46957 25.0008 0.960859 24.7901 0.585786 24.415C0.210714 24.0399 0 23.5312 0 23.0008V3.00079C0 2.47035 0.210714 1.96165 0.585786 1.58657C0.960859 1.2115 1.46957 1.00079 2 1.00079H13C13.2652 1.00079 13.5196 1.10614 13.7071 1.29368C13.8946 1.48122 14 1.73557 14 2.00079C14 2.266 13.8946 2.52036 13.7071 2.70789C13.5196 2.89543 13.2652 3.00079 13 3.00079H2V23.0008H22V12.0008C22 11.7356 22.1054 11.4812 22.2929 11.2937C22.4804 11.1061 22.7348 11.0008 23 11.0008C23.2652 11.0008 23.5196 11.1061 23.7071 11.2937C23.8946 11.4812 24 11.7356 24 12.0008Z" />
                        </svg>
                    </div>`
    listaDeAlunos.append(pai)
}

function buscarAlunosAPI() {
    fetch(BASE_URL + "students")
      .then((res) => res.json())
      .then((alunos) => {
        if (alunos.length <= 0) {
          return;
        }
        for (let index = 0; index < alunos.length; index++) {
          const aluno = alunos[index];
          criarComponenteAluno(
            aluno.nome,
            turma.ano_letivo,
            turma.periodo,
            turma.sala_id,
            turma.id
          );
        }
        mensagemListaVazia.classList.add("hide");
      });
  }

function criarAluno() {
    //mandar pro samuel
    //se deu erro: alert de erro
    //se deu certo: cria o component
    //alert("Não foi possivel criar a sala")
    //alert("Sala criada com sucesso")
    criarComponenteAluno(inputsAluno.nome.value, inputsAluno.rg.value, inputsAluno.cpf.value, inputsAluno.telefone.value, inputsAluno.endereco.value, inputsAluno.email.value, inputsAluno.senha.value, inputsAluno.senhaConfirma.value)
    limparCamposModalAluno()
    alternarModal()
    emptyMessgeStudent.classList.add("hide")
}

function fetchStudents() {
    fetch("https://mocki.io/v1/e091728c-2908-44da-8888-00f06ae2b22a").then(res => res.json()).then(alunos => {
        for (let index = 0; index < alunos.length; index++) {
            const aluno = alunos[index];
            criarComponenteAluno(aluno.nome, aluno.rg, aluno.cpf, aluno.telefone, aluno.endereco, aluno.email, aluno.senha, aluno.senhaConfirma)
            emptyMessgeStudent.classList.add("hide")
        }
    })
}

function criarAlunoAPI() {
    fetch("https://mocki.io/v1/e091728c-2908-44da-8888-00f06ae2b22a").then().catch()
}

function deletStudentAPI() {

}

function updateStudentAPI() {

}
onLoad();