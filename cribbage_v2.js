//Generates an array of consecutive integers from 1 to a
var range = function (a) {
    var b = [];
    var i = 1;
    while (i <= a) {
        b.push(i);
        i++;
    }
    return b;
}

//Fisher-Yates Shuffle, woohoo!
function shuffle(array) {
  var m = array.length, t, i;

  // While there remain elements to shuffle…
  while (m) {

    // Pick a remaining element…
    i = Math.floor(Math.random() * m--);

    // And swap it with the current element.
    t = array[m];
    array[m] = array[i];
    array[i] = t;
  }

  return array;
}

var p1hand = [];
var p2hand = [];
var deck = shuffle(range(52));

//Deals 6 cards into p1hand and p2hand
var deal = function () {
    for (var i = 1; i < 7; i++) {
        p1hand.push(deck.pop());
        p2hand.push(deck.pop());
    }
}

// function testDeal() {
//     var p1Hand = [];
//     var p1Expected = [1,4,...];
//     var p2Hand = [];
//     var deck = [1,21,4,24,4,141,6];
//     var result = deal(deck, p1Hand, p2Hand);
//     
//     [1,2,3] == [1,2,3]
//     
//     for (var i=0; i<deck;i++) {
//         assert(p1expected[i] == p1hand[i])
//     }
//     console.assert("p1hand is wrong!", result[0] == [1,4,6...])
//     console.assert("p2 hand is wrong!", result[1] == )
// }


//Converts cards from numerical values to objects with properties
function CardProps (num) {
    this.index = num;
    this.type = this.getType(num);
    this.value = function() {
        if (num > 36) {
            return 10;
        } else {
            return Math.ceil(num / 4);
        }
    }()
    this.suit = function() {
        if (num % 4 == 1) {
            return "C";
        } else if (num % 4 == 2) {
            return "D";
        } else if (num % 4 == 3) {
            return "H";
        } else {
            return "S";
        }
    }()
}
CardProps.prototype.getType = function (num) {
    return Math.ceil(num/4);
}

//Deal two hands of six cards
deal();

var crib = [];
crib.push(p1hand.pop());
crib.push(p1hand.pop());
crib.push(p2hand.pop());
crib.push(p2hand.pop());

var flipCard = deck.pop();
p1hand.push(flipCard);
p2hand.push(flipCard);
crib.push(flipCard);

//Sort the hands in ascending order, for scoring
//NEED TO DO THIS IN SCORE FUNCTION ---
/*p1hand.sort(function(a,b){return a-b});
p2hand.sort(function(a,b){return a-b});
crib.sort(function(a,b){return a-b});*/

//Convert the hands to something I can read
var p1handMod = [];
var p2handMod = [];
var cribMod = [];

var handConvert = function (hand1, hand2, crib) {
    for (var i = 0; i < 5; i++) {
        p1handMod[i] = new CardProps(hand1[i]);
        p2handMod[i] = new CardProps(hand2[i]);
        cribMod[i] = new CardProps(crib[i]);
    }
}

//SHOW ME THE MONEY
/*handConvert(p1hand, p2hand, crib);
console.log(p1hand);
console.log(p2hand);
console.log(crib);
console.log("Player 1 hand:");
console.log(p1handMod);
console.log("Player 2 hand:");
console.log(p2handMod);
console.log("Crib:");
console.log(cribMod);*/

//TEST HAND
var testHand = [1, 5, 9, 13, 17];
var testHandMod = [];
for (i = 0; i < 5; i++) {
    testHandMod[i] = new CardProps(testHand[i]);
}

var CARDS = {};

CARDS.Jack = 11;

//SCORING, BETCH
var handScore = function (hand) {
    var score = 0;
    //Nob Jack
    if (hand[4].type == CARDS.Jack) {
        for (i = 0; i < hand.length - 1; i++) {
            if (hand[i].suit == hand[4].suit) {
                score += 1;
            }
        }
    }
    //Flush
    if (hand[0].suit == hand[1].suit) {
        if (hand[1].suit == hand[2].suit) {
            if (hand[2].suit == hand[3].suit) {
                if (hand[3].suit == hand[4].suit) {
                    score += 5;
                }
                else {
                    score += 4;
                }
            }
        }
    }
    //Rest of the scores require sorting
    hand = hand.sort();
    //Pairs
    for (i = 0; i < hand.length - 1; i++) {
        if (hand[i].type == hand[i+1].type) {
            score += 2;
        }
    }
    //3 of a kind?
    for (i = 0; i < hand.length - 2; i++) {
        if (hand[i].type == hand[i+2].type) {
            score += 2;
        }
    }
    //4 of a kind?!
    for (i = 0; i < hand.length - 3; i++) {
        if (hand[i].type == hand[i+3].type) {
            score += 2;
        }
    }
    //Fifteens ----
        // 2-card combos
    for (i = 0; i < hand.length - 1; i++) {
        if (hand[i].value + hand[i+1].value == 15) {
            score += 2;
        }
    }
    for (i = 0; i < hand.length - 2; i++) {
        if (hand[i].value + hand[i+2].value == 15) {
            score += 2;
        }
    }
    for (i = 0; i < hand.length - 3; i++) {
        if (hand[i].value + hand[i+3].value == 15) {
            score += 2;
        }
    }
    if (hand[0].value + hand[4].value == 15) {
        score += 2;
    }
        //3-card combos
    var randomPair = hand[0].value + hand[1].value;
    for (i = 2; i < hand.length; i++) {
        if (randomPair + hand[i].value == 15) {
            score += 2;
        }
    }
    randomPair = hand[0].value + hand[2].value;
    for (i = 3; i < hand.length; i++) {
        if (randomPair + hand[i].value == 15) {
            score += 2;
        }
    }
    if (hand[0].value + hand[3].value + hand[4].value == 15) {
        score += 2;
    }
    randomPair = hand[1].value + hand[2].value;
    for (i = 3; i < hand.length; i++) {
        if (randomPair + hand[i].value == 15) {
            score += 2;
        }
    }
    if (hand[2].value + hand[3].value + hand[4].value == 15) {
        score += 2;
    }
        //4-card combos
    if (hand[0].value + hand[1].value + hand[2].value + hand[3].value == 15) {
        score += 2;
    }
    if (hand[0].value + hand[1].value + hand[2].value + hand[4].value == 15) {
        score += 2;
    }
    if (hand[0].value + hand[1].value + hand[3].value + hand[4].value == 15) {
        score += 2;
    }
    if (hand[0].value + hand[2].value + hand[3].value + hand[4].value == 15) {
        score += 2;
    }
    if (hand[1].value + hand[2].value + hand[3].value + hand[4].value == 15) {
        score += 2;
    }
        //5-card combo
    var tempCount = 0;
    for (i = 0; i < hand.length; i++) {
        tempCount += hand[i].value;
    }
    if (tempCount == 15) {
        score += 2;
    }
    //Runs
    
    return score;
}

console.log(testHand);
console.log(testHandMod);
console.log(handScore(testHandMod));
