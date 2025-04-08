const input = document.getElementById("username");
const buttonStart = document.getElementById("start-button");
const form = document.querySelector(".login-forma");

// Object destructuring para validar o input
const validateInput = () => {
  if (input.value.length >= 3) {
    buttonStart.removeAttribute("disabled");
  } else {
    buttonStart.setAttribute("disabled", "");
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
buttonStart.addEventListener("click", function () {
  som.play(); // Inicia o som
});
