const openModalButton = document.querySelector("#open-modal");
const closeModalButton = document.querySelector("#close-modal");
const modal = document.querySelector("#modal");
const fade = document.querySelector("#fade");
const listaDeTurma = document.querySelector("#room-list");
const mensagemListaVazia = document.querySelector("#empty-message-room");
const BASE_URL = "https://v2csj5c0-3000.brs.devtunnels.ms/";

// CAMPOS DA MODAL DE TURMAS
const inputsTurma = {
  nome: document.querySelector("#room_name"),
  anoLetivo: document.querySelector("#room_year"),
  periodo: document.querySelector("#room_period"),
  sala: document.querySelector("#room"),
  id: document.querySelector("#class_id"),
};

function onLoad() {
  buscarTurmasAPI();
}

const alternarModal = () => {
  modal.classList.toggle("hide");
  fade.classList.toggle("hide");
};

[openModalButton, closeModalButton].forEach((el) => {
  el.addEventListener("click", () => alternarModal());
});

onLoad();

// AÇÕES DA TELA

function salvarTurma() {
  if (inputsTurma.id.value) {
    atualizarTurma();
  } else {
    criarTurma();
  }
}

function criarTurma() {
  criarTurmaAPI()
    .then(function () {
      // SE DEU CERTO CRIAR  A TURMA
      window.location.reload();
    })
    .catch(function () {
      // SE DEU ERRO CRIAR A TURMA
      alert(
        "Não foi possível criar a turma corretamente. Tente novamente mais tarde"
      );
    });
}

function atualizarTurma() {
  atualizarTurmaAPI(
    inputsTurma.nome.value,
    inputsTurma.anoLetivo.value,
    inputsTurma.periodo.value,
    inputsTurma.sala.value,
    inputsTurma.id.value
  )
    .then(function () {
      // SE DEU CERTO ATUALIZAR  A TURMA
      window.location.reload();
    })
    .catch(function () {
      // SE DEU ERRO ATUALIZAR A TURMA
      alert(
        "Não foi possível atualizar a turma corretamente. Tente novamente mais tarde"
      );
    });
}

function excluirTurma() {
  if(confirm(`Deseja realmente excluir ${inputsTurma.nome.value}?`) == true){
    excluirTurmaAPI()
    .then(function () {
      // SE DEU CERTO ATUALIZAR  A TURMA
      window.location.reload();
    })
    .catch(function () {
      // SE DEU ERRO ATUALIZAR A TURMA
      alert(
        "Não foi possível excluir a turma corretamente. Tente novamente mais tarde"
      );
    });
  }
}

function limparCamposModalTurma() {
  definirCamposModalTurma(null, 2023, "matutino", 1, null);
}

function definirCamposModalTurma(nome, anoLetivo, periodo, sala, id) {
  inputsTurma.nome.value = nome;
  inputsTurma.anoLetivo.value = anoLetivo;
  inputsTurma.periodo.value = periodo;
  inputsTurma.sala.value = sala;
  inputsTurma.id.value = id;
}

function criarComponenteDeTurma(nome, anoLetivo, periodo, sala, id) {
  const pai = document.createElement("li");
  const titulo = document.createElement("h2");
  const texto = document.createElement("p");
  const link = document.createElement("a");

  titulo.innerHTML = nome;
  texto.innerHTML = `Ano letivo: ${anoLetivo}<br/> 
    Período: ${periodo}<br/>
    Sala: ${sala}`;
  link.href = `/student.html?turma=${id}`;
  link.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 22 22" fill="none">
  <path d="M18.443 17.0689C18.8279 16.6844 19.0902 16.1944 19.1965 15.6609C19.3029 15.1274 19.2486 14.5743 19.0405 14.0716C18.8325 13.5689 18.48 13.1393 18.0277 12.837C17.5754 12.5347 17.0436 12.3733 16.4996 12.3733C15.9555 12.3733 15.4237 12.5347 14.9714 12.837C14.5191 13.1393 14.1667 13.5689 13.9586 14.0716C13.7506 14.5743 13.6963 15.1274 13.8026 15.6609C13.909 16.1944 14.1712 16.6844 14.5561 17.0689C13.8331 17.5301 13.3087 18.2449 13.0857 19.073C13.0388 19.2492 13.0637 19.4368 13.1551 19.5945C13.2465 19.7523 13.3968 19.8673 13.573 19.9143C13.6307 19.9296 13.6902 19.9373 13.75 19.9375C13.9016 19.9374 14.049 19.8873 14.1691 19.7948C14.2892 19.7023 14.3754 19.5727 14.4143 19.4262C14.6575 18.5127 15.5152 17.875 16.5 17.875C17.4848 17.875 18.3425 18.5127 18.5857 19.4262C18.6075 19.5149 18.6467 19.5985 18.7012 19.6719C18.7556 19.7453 18.8241 19.8072 18.9028 19.8538C18.9814 19.9004 19.0685 19.9309 19.159 19.9434C19.2496 19.956 19.3417 19.9504 19.4301 19.9269C19.5184 19.9034 19.6012 19.8625 19.6735 19.8067C19.7459 19.7508 19.8064 19.6811 19.8515 19.6016C19.8965 19.5221 19.9253 19.4344 19.9361 19.3436C19.9469 19.2528 19.9395 19.1608 19.9143 19.073C19.6911 18.2448 19.1663 17.53 18.443 17.0689ZM16.5 13.75C16.7719 13.75 17.0378 13.8306 17.2639 13.9817C17.49 14.1328 17.6663 14.3476 17.7703 14.5988C17.8744 14.8501 17.9016 15.1265 17.8486 15.3932C17.7955 15.66 17.6646 15.905 17.4723 16.0973C17.28 16.2896 17.035 16.4205 16.7682 16.4736C16.5015 16.5266 16.2251 16.4994 15.9738 16.3953C15.7226 16.2913 15.5078 16.115 15.3567 15.8889C15.2056 15.6628 15.125 15.3969 15.125 15.125C15.125 14.7603 15.2699 14.4106 15.5277 14.1527C15.7856 13.8949 16.1353 13.75 16.5 13.75ZM19.9375 7.5625V10.3125C19.9375 10.4948 19.8651 10.6697 19.7361 10.7986C19.6072 10.9276 19.4323 11 19.25 11C19.0677 11 18.8928 10.9276 18.7639 10.7986C18.6349 10.6697 18.5625 10.4948 18.5625 10.3125V7.5625H11.2295C10.9321 7.56176 10.6428 7.46534 10.4045 7.2875L8.02055 5.5H3.4375V17.1875H10.3125C10.4948 17.1875 10.6697 17.2599 10.7986 17.3889C10.9276 17.5178 11 17.6927 11 17.875C11 18.0573 10.9276 18.2322 10.7986 18.3611C10.6697 18.4901 10.4948 18.5625 10.3125 18.5625H3.4375C3.07283 18.5625 2.72309 18.4176 2.46523 18.1598C2.20737 17.9019 2.0625 17.5522 2.0625 17.1875V5.5C2.0625 5.13533 2.20737 4.78559 2.46523 4.52773C2.72309 4.26987 3.07283 4.125 3.4375 4.125H8.02055C8.31794 4.12574 8.60719 4.22216 8.84555 4.4L11.2295 6.1875H18.5625C18.9272 6.1875 19.2769 6.33237 19.5348 6.59023C19.7926 6.84809 19.9375 7.19783 19.9375 7.5625Z" fill="#5D4895"/>
  </svg>`;

  // ADICIONA FUNÇÃO DE ATUALIZAR DADOS NO CLICK
  pai.addEventListener("click", function () {
    definirCamposModalTurma(nome, anoLetivo, periodo, sala, id);
    alternarModal();
  });

  pai.className = "folder-componet";
  pai.appendChild(titulo);
  pai.appendChild(texto);
  pai.appendChild(link);

  listaDeTurma.appendChild(pai);
}

// COMUNICAÇÃO COM O BANCO

function buscarTurmasAPI() {
  fetch(BASE_URL + "class_groups")
    .then((res) => res.json())
    .then((turmas) => {
      if (turmas.length <= 0) {
        return;
      }
      for (let index = 0; index < turmas.length; index++) {
        const turma = turmas[index];
        criarComponenteDeTurma(
          turma.nome_turma,
          turma.ano_letivo,
          turma.periodo,
          turma.sala_id,
          turma.id
        );
      }
      mensagemListaVazia.classList.add("hide");
    });
}

function criarTurmaAPI() {
  return fetch(BASE_URL + "class_group", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      nome_turma: inputsTurma.nome.value,
      ano_letivo: inputsTurma.anoLetivo.value,
      periodo: inputsTurma.periodo.value,
      sala_id: inputsTurma.sala.value,
    }),
  });
}

function atualizarTurmaAPI(nomeTurma, anoLetivo, periodo, sala, id) {
  return fetch(BASE_URL + "class_group", {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      nome_turma: nomeTurma,
      ano_letivo: anoLetivo,
      periodo: periodo,
      sala_id: sala,
      id: id,
    }),
  });
}

function excluirTurmaAPI(){
  return fetch(BASE_URL + "class_group", {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({id: inputsTurma.id.value}),
  });
}
