let pontos = 0;  // Inicializa a variável de pontos
const contador = document.querySelector('.contador'); // Referência para o elemento da pontuação

// Flag para verificar se o jogo terminou
let gameOverFlag = false;
let pipePassado = false;  // Flag para verificar se o Mario passou o pipe

// Função para incrementar a pontuação
const incrementarPontos = () => {
  if (!gameOverFlag) {  // Verifica se o jogo não acabou
    pontos++;  // Aumenta os pontos
    contador.textContent = `${pontos}`;  // Atualiza a pontuação na tela
  }
};

const mario = document.querySelector(".mario");
const pipe = document.querySelector(".pipe");
const bill = document.querySelector(".bill");
const abaixar = document.querySelector(".abaixar");
const menu = document.getElementById("login");
const input = document.getElementById("username");
const button = document.getElementById("start-button");
const form = document.querySelector(".login-forma");
const theEnd = document.getElementById("game-over");

const somPulo = document.getElementById("somPulo");
const somMorteMario = document.getElementById("somMorteMario");
const gameOver = document.getElementById("gameOver");

// Variáveis de controle do jogo para o mario se abaixar quando bill vir
let marioAbaixado = false;
let marioMorreu = false; // Flag para controlar se o Mario morreu

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
};

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
  if (gameOverFlag) return; // Se o jogo acabou, não executa mais o loop

  const billPositionX = bill.offsetLeft;
  const pipePosition = pipe.offsetLeft;
  const marioPosition = +window.getComputedStyle(mario).bottom.replace("px", "");

  // Verifica se o Mario passou o pipe e ainda não marcou pontos
  if (pipePosition <= 90 && pipePosition > 0 && !pipePassado) {
    // Quando o Mario passa o pipe, incrementa os pontos
    pipePassado = false;  // Impede que o ponto seja contado várias vezes
    incrementarPontos();
  }

  // Verifica colisão com o pipe ou com o bill
  if ((pipePosition <= 90 && pipePosition > 0 && marioPosition < 70 ) || 
      (billPositionX <= 90 && billPositionX > 0 && marioPosition < 70 && !marioAbaixado)) {
   

    // Quando o Mario colidir com o pipe:
    somPulo.pause();
    somMorteMario.play();

    // Para o movimento do pipe e do Mario
    pipe.style.animation = "none";
    pipe.style.left = `${pipePosition}px`;
    
    mario.style.animation = "none";
    mario.style.bottom = `${marioPosition}px`;

    bill.style.animation = "none";
    bill.style.left = `${billPositionX}px`;

    mario.src = "./image/game-over.png";
    mario.style.width = "55px";
    mario.style.marginLeft = "40px";
    somPulo.pause();

    // Exibe o Game Over
    theEnd.style.bottom = "0px";
    theEnd.style.animation = "nome-game-over 10s ease ";

    const som = document.getElementById("som");
    som.pause();

    somMorteMario.onended = () => {
      gameOver.play();
    };

    gameOverFlag = true;
    marioMorreu = true; // Mario morreu, então desabilitamos o abaixar

    clearInterval(loop);
  }
}, 10);

// Mario pulo usando space
document.addEventListener("keypress", (e) => {
  if(e.code === "Space" && !gameOverFlag) {
    jump();
  }
});

const agaichar = () => {
  if (!marioMorreu) {  // Se o Mario não morreu, ele pode abaixar
    marioAbaixado = true;
    mario.src = "./image/abaixar.png";
    mario.style.width = "55px";
    mario.style.left = "0";
  }
};

// Mario se abaixa
document.addEventListener('keydown', (e) => {
  if(e.code === "ArrowDown" && !gameOverFlag) {
    agaichar();
  } 
});

// Mario vai se levantar
document.addEventListener("keyup", (e) => {
  if(e.code === "ArrowDown" && !gameOverFlag) {
    marioAbaixado = false;
    mario.src = "./image/mario.gif";
    mario.style.width = "110px";
  }
});

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
