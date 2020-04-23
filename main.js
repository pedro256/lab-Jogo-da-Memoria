const cardBoard = document.querySelector("#cardboard");
const placar = document.querySelector('#pontos');
const erros = document.querySelector('#erro');
let pontos = 0;
let errro =0;
const imgs = [
  "vue.svg",
  "angular.svg",
  "react.svg",
  "ember.svg",
  "backbone.svg",
  "aurelia.svg"
];

function generateRan() {
  var max = 6;
  var random = [];
  for (var i = 0; i < max; i++) {
    var temp = Math.floor(Math.random() * max);
    if (random.indexOf(temp) == -1) {
      random.push(temp);
    }
    else
      i--;
  }
  return random
}

const valores1 = generateRan();
const valores2 = generateRan();

let cardHTML1 = "";
let cardHTML2 = "";

for (var i = 0; i < 6; i++) {
  cardHTML1 += `<div class="memory-card" data-card="${imgs[valores1[i]]}">
  <img class="front-face" src="img/${imgs[valores1[i]]}"/>
  <img class="back-face" src="img/js-badge.svg">
</div>`
cardHTML2 += `<div class="memory-card" data-card="${imgs[valores2[i]]}">
  <img class="front-face" src="img/${imgs[valores2[i]]}"/>
  <img class="back-face" src="img/js-badge.svg">
</div>`
}


cardBoard.innerHTML = cardHTML1 + cardHTML2;

/** Fim da Renderização HTML */

const cards = document.querySelectorAll(".memory-card");
let firstCard, secondCard;
let lockCards = false;

function flipCard() {
  if (lockCards) return false;
  this.classList.add("flip");

  if (!firstCard) {
    firstCard = this;
    return false;
  }

  secondCard = this;

  checkForMatch();
}

function checkForMatch() {
  let isMatch = firstCard.dataset.card === secondCard.dataset.card;

  !isMatch ? unFlipCards() : pontuarCartas();
}
function pontuarCartas(){
  pontos++;
  placar.innerText = 'PONTUAÇÃO: '+pontos;
  resetCards(false);
  if(pontos==6){
    setTimeout(()=>{
      if(pontos>errro){
        placar.innerText ="VOCÊ GANHOU!!"
        placar.style.color = 'blue'
      }else if(pontos == errro){
        placar.style.color = 'darkcyan'
        placar.innerText = "EMPATE!"
      }else if(pontos<errro){
        placar.innerText = "VOCÊ PERDEU!!"
        placar.style.color = 'red'
      }
    },2000)
  }
}

function unFlipCards() {
  lockCards = true;
  errro++
  erro.innerText = 'ERROS: '+ errro;
  setTimeout(() => {
    firstCard.classList.remove("flip");
    secondCard.classList.remove("flip");

    resetCards();
  }, 1000);
}

function resetCards(isMatch = false) {
  if (isMatch) {
    firstCard.removeEventListener("click", flipCard);
    secondCard.removeEventListener("click", flipCard);
  }

  [firstCard, secondCard, lockCards] = [null, null, false];
  console.log('4')
}

cards.forEach(card => card.addEventListener("click", flipCard));
