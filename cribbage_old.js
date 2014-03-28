function CardProps (num) {
    this.type = Math.ceil(num / 4);
    this.value = function() {
        if (num > 46) {
            return 10;
        }
        else {
            return Math.ceil(num / 4);
        }
    }
    
    this.suit = function() {
        if (num % 4 == 1) {
            return "Clubs";
        } else if (num % 4 == 2) {
            return "Diamonds";
        } else if (num % 4 == 3) {
            return "Hearts";
        } else {
            return "Spades";
        }
    }
}

var dealHand = function () {

  var pickCard = function () {
    return (Math.floor(Math.random() * 52 + 1));
  }

  var card1 = pickCard();
  var card2 = pickCard();
  var card3 = pickCard();
  var card4 = pickCard();

  if (card2 == card1) {
    while (card2 == card1) {
        card2 = pickCard();
    }
  }

  if (card3 == card1 || card3 == card2) {
    while (card3 == card1 || card3 == card2) {
        card3 = pickCard();
    }
  }

  if (card4 == card1 || card4 == card2 || card4 == card3) {
    while (card4 == card1 || card4 == card2 || card4 == card3) {
        card4 = pickCard();
    }
  }

var cardOne = new CardProps(card1);
var cardTwo = new CardProps(card2);
var cardThree = new CardProps(card3);
var cardFour = new CardProps(card4);

console.log([cardOne, cardTwo, cardThree, cardFour]);
  
}

dealHand();