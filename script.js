
// Referências para os elementos
const mario = document.querySelector(".mario");
const pipe = document.querySelector(".pipe");
const bill = document.querySelector(".bill");
const abaixar = document.querySelector(".abaixar");
const menu = document.getElementById("login");
const theEnd = document.getElementById("game-over");

// Audio
const som = document.getElementById("som");
const somPulo = document.getElementById("somPulo");
const somMorteMario = document.getElementById("somMorteMario");
const gameOver = document.getElementById("gameOver");
const mute = document.getElementById("mute");
const unmute = document.getElementById("unmute");

let pontos = 0; // Inicializa a variável de pontos
const contador = document.querySelector(".contador"); // Referência para o elemento da pontuação

// Flag para verificar se o jogo terminou
let gameOverFlag = false;

// Função para incrementar a pontuação
const incrementarPontos = () => {
  if (!gameOverFlag) {
    // Verifica se o jogo não acabou
    pontos = Math.floor((pontos + 0.11) * 10) / 10;
    contador.textContent = `${Math.floor(pontos)}`; // Atualiza a pontuação na tela
  }
};

// Volume das musicas
somPulo.volume = 0.1;
somMorteMario.volume = 0.2;
gameOver.volume = 0.2;

// Mutar musica
const muteMusic = () => {
  som.pause();
  som.currentTime = 0;
  mute.style.display = "none";
  unmute.style.display = "block";
};
const unmuteMusic = () => {
  som.play();
  mute.style.display = "block";
  unmute.style.display = "none";
};
mute.addEventListener("click", muteMusic);
unmute.addEventListener("click", unmuteMusic);

document.addEventListener("keydown", (e) => {
  if (e.code === "KeyM") {
    if (som.paused) {
      // Se a tecla "M" tiver pressionada e o som estiver pausado, ele vai despausar a musica
      unmuteMusic();
    } else {
      // Se a tecla "M" tiver pressionada e o som estiver tocando, ele vai pausar a musica
      muteMusic();
    }
  }
});

// Variáveis de controle do jogo para o mario se abaixar quando bill vir
let marioAbaixado = false;
let marioMorreu = false; // Flag para controlar se o Mario morreu

window.onload = () => {
  // Recupera o nome do jogador do localStorage
  const playerName = localStorage.getItem("player");

  // Se o nome do jogador existir no localStorage, exibe no jogo
  if (playerName) {
    const playerNameElement = document.querySelector(".nome");
    playerNameElement.textContent = `Player: ${playerName}`; // Exibe o nome na tela
  } else {
    const playerNameElement = document.querySelector(".nome");
    playerNameElement.textContent = "Bem-vindo, jogador!"; // Caso o nome não esteja no localStorage
  }
};

// Jump
const jump = () => {
  if (!somPulo.paused) {
    // Caso o som do pulo esteja tocando, reinicia ele
    somPulo.currentTime = 0;
  }
  somPulo.play(); // Toca o som do pulo

  mario.classList.add("jump");

  setTimeout(() => {
    mario.classList.remove("jump");
  }, 500);
};

const loop = setInterval(() => {
  if (gameOverFlag) return; // Se o jogo acabou, não executa mais o loop

  const billPositionX = bill.offsetLeft;
  const pipePosition = pipe.offsetLeft;
  const marioPosition = +window
    .getComputedStyle(mario)
    .bottom.replace("px", "");

  // Verifica se o Mario passou o pipe e ainda não marcou pontos
  if (!gameOverFlag) {
    incrementarPontos();
  }

  // Verifica colisão com o pipe ou com o bill
  if (
    (pipePosition <= 90 && pipePosition > 0 && marioPosition < 70) ||
    (billPositionX <= 90 &&
      billPositionX > 0 &&
      marioPosition < 70 &&
      !marioAbaixado)
  ) {
    gameOverFlag = true;
    marioMorreu = true; // Mario morreu, então desabilitamos o abaixar

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
    mario.style.animation = "dead 2s ease";
    mario.style.bottom = "-100%";
    somPulo.pause();

    // Exibe o Game Over
    theEnd.style.bottom = "0px";
    theEnd.style.animation = "nome-game-over 8.8s ease ";

    const som = document.getElementById("som");
    som.pause();

    somMorteMario.onended = () => {
      gameOver.play();
    };

    clearInterval(loop);
  }
}, 10);

// Mario pulo usando space (keys de pulo)
document.addEventListener("keydown", (e) => {
  if (e.code === "Space" && !gameOverFlag || e.code === "KeyW" && !gameOverFlag || e.code === "ArrowUp" && !gameOverFlag) {
    jump();
  }
});

const agachar = () => {
  if (!marioMorreu) {
    // Se o Mario não morreu, ele pode abaixar
    marioAbaixado = true;
    mario.src = "./image/abaixar.png";
    mario.style.width = "55px";
    mario.style.left = "0";
  }
};

// Mario se abaixa
document.addEventListener("keydown", (e) => {
  if (e.code === "ArrowDown" && !gameOverFlag || e.code === "KeyS" && !gameOverFlag) {
    agachar();
  }
});

// Mario vai se levantar
document.addEventListener("keyup", (e) => {
  if (e.code === "ArrowDown" && !gameOverFlag || e.code === "KeyS" && !gameOverFlag) {
    marioAbaixado = false;
    mario.src = "./image/mario.gif";
    mario.style.width = "110px";
  }
});



