const openModalButton = document.querySelector("#open-modal");
const closeModalButton = document.querySelector("#close-modal");
const deleteModalButton = document.querySelector("#delete-student");
const modal = document.querySelector("#modal");
const fade = document.querySelector("#fade");
const listaDeAlunos = document.querySelector("#student-list");
const mensagemListaVazia = document.querySelector("#empty-message-student");
const BASE_URL = "https://v2csj5c0-3000.brs.devtunnels.ms/";

// CAMPOS DA MODAL DE ALUNOS
const inputsAluno = {
    id: document.querySelector("#id_student"),
    nome: document.querySelector("#name_student"),
    rg: document.querySelector("#rg"),
    cpf: document.querySelector("#cpf"),
    telefone: document.querySelector("#phone"),
    endereco: document.querySelector("#address"),
    email: document.querySelector("#email"),
};

function onLoad() {
    const urlParams = new URLSearchParams(window.location.search);
    const turmaId = urlParams.get("turma");

  // buscarAlunosAPI(turmaId);
  preencherTurmasNoSelect()
}

const alternarModal = () => {
  modal.classList.toggle("hide");
  fade.classList.toggle("hide");
  if(inputsAluno.id.value){
    deleteModalButton.classList.remove('hide')
  }else{
    deleteModalButton.classList.add('hide')
  }
};

[openModalButton, closeModalButton].forEach((el) => {
    el.addEventListener("click", () => alternarModal());
});

onLoad();

// FUNÇÕES DA TELA (CRUD)

function salvarAluno() {
    if (inputsAluno.id.value) {
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
      alert("Não foi possível criar aluno corretamente. Tente novamente mais tarde");
    });
}

function atualizarAluno() {
  atualizarAlunoAPI()
    .then(function () {
      // SE DEU CERTO ATUALIZAR  A TURMA
      window.location.reload();
    })
    .catch(function () {
      // SE DEU ERRO ATUALIZAR A TURMA
      alert("Não foi possível atualizar o aluno corretamente. Tente novamente mais tarde");
    });
}

function excluirAluno() {
  if(confirm(`Deseja realmente excluir ${inputsAluno.nome.value}?`) == true){
    excluirAlunoAPI()
    .then(function () {
      window.location.reload();
    })
    .catch(function () {
      alert("Não foi possível excluir o aluno corretamente. Tente novamente mais tarde");
    });
  }
}

function limparCamposModalAluno() {
    definirCamposModalAluno(null, null, null, null, null, null, null);
}

function definirCamposModalAluno(id, nome, rg, cpf, telefone, endereco, email) {
    inputsAluno.id.value = id;
    inputsAluno.nome.value = nome;
    inputsAluno.rg.value = rg;
    inputsAluno.cpf.value = cpf;
    inputsAluno.telefone.value = telefone;
    inputsAluno.endereco.value = endereco;
    inputsAluno.email.value = email;
}

//criar html so que em js
function criarComponenteAluno(id, nome, rg, cpf, telefone, endereco, email) {
    const pai = document.createElement("li");
    pai.innerHTML = `<div class="status-container">
                        <span class="status"></span>
                        <p>${id}</p>
                    </div>
                    <h3>${nome}</h3>
                    <p>${cpf}</p>
                    <p>${email}</p>
                    <div class="list-action">
                        <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 22 22" fill="none">
                            <path
                             d="M8 0H2C1.46957 0 0.960859 0.210714 0.585786 0.585786C0.210714 0.960859 0 1.46957 0 2V8C0 8.53043 0.210714 9.03914 0.585786 9.41421C0.960859 9.78929 1.46957 10 2 10H8C8.53043 10 9.03914 9.78929 9.41421 9.41421C9.78929 9.03914 10 8.53043 10 8V2C10 1.46957 9.78929 0.960859 9.41421 0.585786C9.03914 0.210714 8.53043 0 8 0ZM8 8H2V2H8V8ZM8 12H2C1.46957 12 0.960859 12.2107 0.585786 12.5858C0.210714 12.9609 0 13.4696 0 14V20C0 20.5304 0.210714 21.0391 0.585786 21.4142C0.960859 21.7893 1.46957 22 2 22H8C8.53043 22 9.03914 21.7893 9.41421 21.4142C9.78929 21.0391 10 20.5304 10 20V14C10 13.4696 9.78929 12.9609 9.41421 12.5858C9.03914 12.2107 8.53043 12 8 12ZM8 20H2V14H8V20ZM20 0H14C13.4696 0 12.9609 0.210714 12.5858 0.585786C12.2107 0.960859 12 1.46957 12 2V8C12 8.53043 12.2107 9.03914 12.5858 9.41421C12.9609 9.78929 13.4696 10 14 10H20C20.5304 10 21.0391 9.78929 21.4142 9.41421C21.7893 9.03914 22 8.53043 22 8V2C22 1.46957 21.7893 0.960859 21.4142 0.585786C21.0391 0.210714 20.5304 0 20 0ZM20 8H14V2H20V8ZM12 17V13C12 12.7348 12.1054 12.4804 12.2929 12.2929C12.4804 12.1054 12.7348 12 13 12C13.2652 12 13.5196 12.1054 13.7071 12.2929C13.8946 12.4804 14 12.7348 14 13V17C14 17.2652 13.8946 17.5196 13.7071 17.7071C13.5196 17.8946 13.2652 18 13 18C12.7348 18 12.4804 17.8946 12.2929 17.7071C12.1054 17.5196 12 17.2652 12 17ZM22 15C22 15.2652 21.8946 15.5196 21.7071 15.7071C21.5196 15.8946 21.2652 16 21 16H18V21C18 21.2652 17.8946 21.5196 17.7071 21.7071C17.5196 21.8946 17.2652 22 17 22H13C12.7348 22 12.4804 21.8946 12.2929 21.7071C12.1054 21.5196 12 21.2652 12 21C12 20.7348 12.1054 20.4804 12.2929 20.2929C12.4804 20.1054 12.7348 20 13 20H16V13C16 12.7348 16.1054 12.4804 16.2929 12.2929C16.4804 12.1054 16.7348 12 17 12C17.2652 12 17.5196 12.1054 17.7071 12.2929C17.8946 12.4804 18 12.7348 18 13V14H21C21.2652 14 21.5196 14.1054 21.7071 14.2929C21.8946 14.4804 22 14.7348 22 15ZM22 19V21C22 21.2652 21.8946 21.5196 21.7071 21.7071C21.5196 21.8946 21.2652 22 21 22C20.7348 22 20.4804 21.8946 20.2929 21.7071C20.1054 21.5196 20 21.2652 20 21V19C20 18.7348 20.1054 18.4804 20.2929 18.2929C20.4804 18.1054 20.7348 18 21 18C21.2652 18 21.5196 18.1054 21.7071 18.2929C21.8946 18.4804 22 18.7348 22 19Z" />
                        </svg>
                    </div>`;

    pai.addEventListener("click", function () {
        definirCamposModalAluno(
            id,
            nome,
            rg,
            cpf,
            telefone,
            endereco,
            email,
            null,
            null
        );
        alternarModal();
    });

    listaDeAlunos.append(pai);
}

// COMUNICAÇÃO COM O BANCO

function buscarAlunosAPI(turma_id) {
  fetch(BASE_URL + `students?turma_id=${turma_id}`)
    .then((res) => res.json())
    .then((alunos) => {
      if (alunos.length <= 0) {
        mensagemListaVazia.classList.remove("hide");
        return;
      }

            for (let valor = 0; valor < alunos.length; valor++) {
                const aluno = alunos[valor];
                criarComponenteAluno(
                    aluno.id,
                    aluno.nome,
                    aluno.rg,
                    aluno.cpf,
                    aluno.telefone,
                    aluno.endereco,
                    aluno.email
                );
            }

            mensagemListaVazia.classList.add("hide");
        });
}

function criarAlunoAPI() {
    const urlParams = new URLSearchParams(window.location.search);
    const turmaId = urlParams.get("turma");

    return fetch(BASE_URL + "student", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            rm: null,
            nome: inputsAluno.nome.value,
            rg: inputsAluno.rg.value,
            cpf: inputsAluno.cpf.value,
            telefone: inputsAluno.telefone.value,
            endereco: inputsAluno.endereco.value,
            email: inputsAluno.email.value,
            status: 1,
            usuario_id: null,
            turma_id: turmaId,
        }),
    });
}

function atualizarAlunoAPI() {
    const urlParams = new URLSearchParams(window.location.search);
    const turmaId = urlParams.get("turma");

    return fetch(BASE_URL + "student", {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            rm: null,
            nome: inputsAluno.nome.value,
            rg: inputsAluno.rg.value,
            cpf: inputsAluno.cpf.value,
            telefone: inputsAluno.telefone.value,
            endereco: inputsAluno.endereco.value,
            email: inputsAluno.email.value,
            status: 1,
            usuario_id: null,
            turma_id: turmaId,
            id: inputsAluno.id.value,
        }),
    });
}

function excluirAlunoAPI() {
  return fetch(BASE_URL + "student", {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({id: inputsAluno.id.value}),
  });
}

function preencherTurmasNoSelect() {
  const urlParams = new URLSearchParams(window.location.search);
  const turmaId = urlParams.get("turma");

  fetch(BASE_URL + "class_groups")
    .then((res) => res.json())
    .then((turmas) => {
      const componenteSelect = document.querySelector("#class-groups-select");
      for (let index = 0; index < turmas.length; index++) {
        const option = document.createElement('option')
        option.value = turmas[index].id
        option.text = turmas[index].nome_turma
        componenteSelect.append(option)
      }

      if(turmaId){
        componenteSelect.value = turmaId
      }

      buscarAlunosAPI(componenteSelect.value);
      window.history.pushState('data', `Alunos ${componenteSelect.text}`, `/student.html?turma=${componenteSelect.value}`);

      componenteSelect.addEventListener('change', function(){
        window.history.pushState('data', `Alunos ${componenteSelect.text}`, `/student.html?turma=${componenteSelect.value}`);
        listaDeAlunos.innerHTML = ""
        buscarAlunosAPI(componenteSelect.value);
      })
    });
}