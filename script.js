

let pontos = 0;  // Inicializa a variável de pontos
const contador = document.querySelector('.contador'); // Referência para o elemento da pontuação

// Função para incrementar a pontuação
const incrementarPontos = () => {
  pontos++;  // Aumenta os pontos
  contador.textContent = `Pontos: ${pontos}`;  // Atualiza a pontuação na tela
};

const mario = document.querySelector(".mario");
const pipe = document.querySelector(".pipe");
const bill = document.querySelector(".bill")
const abaixar = document.querySelector(".abaixar")
const menu = document.getElementById("login");
const input = document.getElementById("username");
const button = document.getElementById("start-button");
const form = document.querySelector(".login-forma");
const theEnd = document.getElementById("game-over");


const somPulo = document.getElementById("somPulo");
const somMorteMario = document.getElementById("somMorteMario");
const gameOver = document.getElementById("gameOver");

// Variáveis de controle do jogo para o mario se abaixar quando bil vir
let marioAbaixado = false;

window.onload = () => {
  // Recupera o nome do jogador do localStorage
  const playerName = localStorage.getItem('player');

  // Se o nome do jogador existir no localStorage, exibe no jogo
  if (playerName) {
    const playerNameElement = document.querySelector('.nome');
    playerNameElement.textContent = `Player: ${playerName}`; // Exibe o nome na tela
  } else {
    const playerNameElement = document.querySelector('.nome');
    playerNameElement.textContent = "Bem-vindo, jogador!"; // Caso o nome não esteja no localStorage
  }
}

const jump = () => {
  if (!somPulo.paused) {
    // Caso o som do pulo esteja tocando, reinicia ele
    somPulo.currentTime = 0;
  }
  mario.classList.add("jump");
  somPulo.play(); // Toca o som do pulo

  setTimeout(() => {
    mario.classList.remove("jump");
  }, 500);
};

const loop = setInterval(() => {


  const billPositionX = bill.offsetLeft 
  const pipePosition = pipe.offsetLeft;
  // getComputedStyle vai pegar todos os estilos aplicados ao mario
  const marioPosition = +window
    .getComputedStyle(mario)
    .bottom.replace("px", "");

  if ((pipePosition <= 90 && pipePosition > 0 && marioPosition < 70) || (billPositionX <= 90 && billPositionX > 0 && marioPosition < 70 && !marioAbaixado)) {
    
    incrementarPontos();
    
    // Quando o Mario colidir com o pipe:
    // Interrompe o som de pulo (caso esteja tocando)
    somPulo.pause();

    // Toca o som de morte do Mario
    somMorteMario.play();

    // Para o movimento do pipe e do Mario
    pipe.style.animation = "none";
    pipe.style.left = `${pipePosition}px`;

    mario.style.animation = "none";
    mario.style.bottom = `${marioPosition}px`;

    // para o movimento do bill  e  do mario
    bill.style.animation = "none"
    bill.style.left = `${billPositionX}px`

    // Aparece a imagem do Mario morrendo
    mario.src = "./image/game-over.png";
    mario.style.width = "55px";
    mario.style.marginLeft = "40px";
    somPulo.pause();

    // Exibe o Game Over
    theEnd.style.bottom = "0px";
    theEnd.style.animation = "nome-game-over 10s ease ";

    // Pausa o som de fundo (se houver)
    const som = document.getElementById("som");
    som.pause();

    // Toca o som de game over após o som de morte do Mario
    somMorteMario.onended = () => {
      gameOver.play(); // Toca o som de game over depois que o som da morte terminar
    };

    incrementarPontos();
    // Para o loop do jogo
    clearInterval(loop);
  }
}, 10);

//mario pulo usando space
document.addEventListener("keypress", (e) => {
  if(e.code === "Space"){
    jump();
  }
});

//mario se abaixa
document.addEventListener('keydown', (e) => {
  if(e.code === "ArrowDown"){

      marioAbaixado = true
      mario.src = "./image/abaixar.png";
      mario.style.width = "55px"
      mario.style.left = "50px"


  } 
})

//mario vai se levantar
document.addEventListener("keyup" , (e) => {
  if(e.code === "ArrowDown"){
    
    marioAbaixado = false
    mario.src = "./image/mario.gif"
    mario.style.width = "110px"
  }
})

// Object destructuring para validar o input
const validateInput = ({ target }) => {
  if (target.value.length > 2) {
    button.removeAttribute("disabled");
  } else {
    button.setAttribute("disabled", "");
  }
};

// Enviar o formulário
const handleSubimit = (e) => {
  e.preventDefault();

  // Salva o nome do jogador no localStorage
  localStorage.setItem("player", input.value);

  // Redireciona para o jogo
  window.location = "game.html";
};

input.addEventListener("input", validateInput);
form.addEventListener("submit", handleSubimit);

// Espera o usuário clicar no botão para iniciar o áudio
document.getElementById("start-button").addEventListener("click", function () {
  const som = document.getElementById("som");
  som.play(); // Inicia o som
});