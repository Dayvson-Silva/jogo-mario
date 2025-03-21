const mario = document.querySelector(".mario");
const pipe = document.querySelector(".pipe");
const menu = document.getElementById("login")
const input = document.getElementById("username")
const button = document.getElementById("start-button")
const form = document.querySelector(".login-forma")


const jump = () => {
  mario.classList.add("jump");

  setTimeout(() => {
    mario.classList.remove("jump");
  }, 500);
};

const loop = setInterval(() => {

  const pipePosition = pipe.offsetLeft;
  // getcomputedstyle vai pegar todos os estilo usado
  const marioPosition = +window.getComputedStyle(mario).bottom.replace("px", "");

  

  if (pipePosition <= 90 && pipePosition > 0 && marioPosition < 70) {

    pipe.style.animation = "none";
    pipe.style.left = `${pipePosition}px`;

    mario.style.animation = "none";
    mario.style.bottom = `${marioPosition}px`;

    mario.src = "./image/game-over.png"
    mario.style.width = "55px"
    mario.style.marginLeft = "40px"
    
    //para parar o loop
    clearInterval(loop)
  }

}, 10);

document.addEventListener("keydown", jump);

// object destructuring dessistruturar o objeto no caso ai foi tirar o evento e colocar o target direto pois ele sinboliza o input
const validateInput = ({ target }) => {

  if(target.value.length > 2){
    button.removeAttribute("disabled")
  }else{
    button.setAttribute("disabled", '');
  }
}

// eniviar o formulario
const handleSubimit = (e) => {
  e.preventDefault();

  //salvar no local storage
  localStorage.setItem( 'player', input.value);
  window.location = "game.html"
}


input.addEventListener('input', validateInput);
form.addEventListener('submit', handleSubimit )
  



