// Function for shuffling array.
function shuffle(array) {
  var counter = array.length;
  while (counter > 0) {
    var index = Math.floor(Math.random() * counter);
    counter--;
    var temp = array[counter];
    array[counter] = array[index];
    array[index] = temp;
  }
  return array;
}

// Set of cards used in game.
const cardsSet = [
  {
    'name':'cat',
    'content':'🐱'
  },
  {
    'name':'dog',
    'content':'🐶'
  },
  {
    'name':'rabbit',
    'content':'🐰'
  },
  {
    'name':'rat',
    'content':'🐭'
  },
  {
    'name':'panda',
    'content':'🐼'
  },
  {
    'name':'lion',
    'content':'🦁'
  }
];

// Create pair of cards and shuffle it for different start positions.
var cardsArray = cardsSet.concat(cardsSet);
shuffle(cardsArray);

var game = document.getElementById('game');

// Initialize array of clicked cards at the moment.
var clickedCards = [];

var inProgress = false;

// Add cards to the field on the web page.
cardsArray.forEach(elem => {
  var card = document.createElement('div');
  card.classList.add('card');
  card.dataset.name = elem.name;
  card.addEventListener("click", function(){
    if (clickedCards.indexOf(card) !== -1 || inProgress) {
      return;
    }
    card.classList.add('selected');
    card.innerHTML = elem.content;
    clickedCards.push(card);
    if (clickedCards.length === 2) {
      if (clickedCards[0].dataset.name === clickedCards[1].dataset.name) {
        clickedCards.forEach(item => {
          inProgress = true;
          setTimeout(function() {
            item.classList.remove('selected');
            item.classList.add('deleted');
            inProgress = false;
          }, 1000);
        });
        clickedCards = [];
      } else {
        clickedCards.forEach(item => {
          inProgress = true;
          setTimeout(function() {
            item.classList.remove('selected');
            item.innerHTML = '';
            inProgress = false;
          }, 1000);
        });
        clickedCards = [];
      }
    }
  })
  game.appendChild(card);
});
