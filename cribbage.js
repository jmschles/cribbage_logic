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

//Create empty hands and a deck
var p1hand = [];
var p2hand = [];
var deck = shuffle(range(52));

//Deals 6 cards into p1hand and p2hand when called
var deal = function () {
    var i = 1;
    while (i < 7) {
        p1hand.push(deck.pop());
        p2hand.push(deck.pop());
        i++;
    }
}

//Converts cards from numerical values to objects with properties
function CardProps (num) {
    this.index = num;
    this.type = Math.ceil(num / 4);
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
    this.name = function() {
        var typename = function () {
            if (num > 48) {
                return 'King';
            } else if (num > 44) {
                return 'Queen';
            } else if (num > 40) {
                return 'Jack';
            } else if (num < 5) {
                return 'Ace';
            } else {
                return Math.ceil(num / 4);
            }
        }()
        var suitname = function () {
            switch (num % 4) {
                case 1:
                    return "Clubs";
                    break;
                case 2:
                    return "Diamonds";
                    break;
                case 3:
                    return "Hearts";
                    break;
                default:
                    return "Spades";
                    break;
            }
        }()
        return typename + " of " + suitname;
    }()
}

//Prints out a sorted hand showing only English card names
var showHand = function (hand) {
    var newHand = hand.slice(0);
    newHand.sort(function(a,b){return a.index-b.index});
    for (var i = 0; i < newHand.length; i++) {
        console.log(newHand[i].name);
    }
}

//Deal two hands of six cards
deal();

//Put the last two card sof each hand into the crib
var crib = [];
crib.push(p1hand.pop());
crib.push(p1hand.pop());
crib.push(p2hand.pop());
crib.push(p2hand.pop());

//Pop a cut card from the end of the remaining deck
var flipCard = deck.pop();
p1hand.push(flipCard);
p2hand.push(flipCard);
crib.push(flipCard);

//Converts a numerical hand into card objects
var handConvert = function (hand) {
    var handMod = [];
    for (i = 0; i < 5; i++) {
        handMod[i] = new CardProps(hand[i]);
    }
    return handMod;
}

var p1handMod = handConvert(p1hand);
var p2handMod = handConvert(p2hand);
var cribMod = handConvert(crib);

//SCORING, BETCH
var nobScore = function (hand) {
    var score = 0;
    for (var i = 0; i < hand.length - 1; i++) {
        if (hand[i].type == 11 && hand[i].suit == hand[4].suit) {
            score += 1;
        }
    }
    return score;
}
var flushScore = function (hand) {
    var score = 0;
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
    return score;
}
var pairScore = function (hand) {
    hand = hand.sort(function(a,b){return a.index-b.index});
    var score = 0; 
    //Pairs
    for (var i = 0; i < hand.length - 1; i++) {
        if (hand[i].type == hand[i+1].type) {
            score += 2;
        }
    }
    //3 of a kind?
    for (var i = 0; i < hand.length - 2; i++) {
        if (hand[i].type == hand[i+2].type) {
            score += 2;
        }
    }
    //4 of a kind?!
    for (var i = 0; i < hand.length - 3; i++) {
        if (hand[i].type == hand[i+3].type) {
            score += 2;
        }
    }
    return score;
}
var fifteenScore = function (hand) {
    hand = hand.sort(function(a,b){return a.index-b.index});
    var score = 0;
    // 2-card combos
    for (var i = 0; i < hand.length - 1; i++) {
        if (hand[i].value + hand[i+1].value == 15) {
            score += 2;
        }
    }
    for (var i = 0; i < hand.length - 2; i++) {
        if (hand[i].value + hand[i+2].value == 15) {
            score += 2;
        }
    }
    for (var i = 0; i < hand.length - 3; i++) {
        if (hand[i].value + hand[i+3].value == 15) {
            score += 2;
        }
    }
    if (hand[0].value + hand[4].value == 15) {
        score += 2;
    }
        //3-card combos
    var randomPair = hand[0].value + hand[1].value;
    for (var i = 2; i < hand.length; i++) {
        if (randomPair + hand[i].value == 15) {
            score += 2;
        }
    }
    randomPair = hand[0].value + hand[2].value;
    for (var i = 3; i < hand.length; i++) {
        if (randomPair + hand[i].value == 15) {
            score += 2;
        }
    }
    if (hand[0].value + hand[3].value + hand[4].value == 15) {
        score += 2;
    }
    randomPair = hand[1].value + hand[2].value;
    for (var i = 3; i < hand.length; i++) {
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
    for (var i = 0; i < hand.length; i++) {
        tempCount += hand[i].value;
    }
    if (tempCount == 15) {
        score += 2;
    }
    return score;
}
var runScore = function (hand) {
    hand = hand.sort(function(a,b){return a.index-b.index});
    var score = 0;
    var i = 0;
    while (i < hand.length) {
        var cardsInRun = 1;
        var multiplier = 1;
        var cardsInPair = 1;
        var totalPairs = 0;
        var threeOfKind = false;
        var scoreThis = function () {
            if (cardsInRun >= 3) {
                if (threeOfKind == true) {
                    score += 3 * cardsInRun;
                } else if (totalPairs == 2) {
                    score += 4 * cardsInRun;
                } else if (totalPairs == 1) {
                    score += 2 * cardsInRun;
                } else {
                    score += cardsInRun * multiplier;
                }
            }
            return score;
        }
        for (var j = i; j < hand.length; j++) {
            if (hand[j+1].type == hand[j].type + 1) {
                cardsInRun += 1;
                if (cardsInPair == 2) {
                    totalPairs += 1;
                }
                cardsInPair = 1;
                if (j == hand.length - 2) {
                    scoreThis();
                    return score;
                }
            }
            else if (hand[j+1].type == hand[j].type) {
                multiplier += 1;
                cardsInPair += 1;
                if (cardsInPair == 3) {
                    threeOfKind = true;
                }
                if (j == 3) {
                    totalPairs += 1;
                }
                if (j == hand.length - 2) {
                    scoreThis();
                    return score;
                }
            }
            else {
                if (j == hand.length - 2) {
                    scoreThis();
                    return score;
                }
                scoreThis();
                i = j+1;
                break;
            }
        }
    }
    return score;
}

var handScore = function (hand) {
    var nob = nobScore(hand);
    var flush = flushScore(hand);
    var pair = pairScore(hand);
    var fifteen = fifteenScore(hand);
    var run = runScore(hand);
    if (nob > 0) {
        console.log("His Nobs: " + nob);
    }
    if (flush > 0) {
        console.log("Flush score: " + flush);
    }
    if (pair > 0) {
        console.log("Pairs score: " + pair);
    }
    if (fifteen > 0) {
        console.log("Fifteens score: " + fifteen);
    }
    if (run > 0) {
        console.log("Run score: " + run);    
    }
    var totalScore = nob + pair + fifteen + flush + run;
    console.log("TOTAL SCORE: " + totalScore);
}

console.log("Player 1 Hand:");
showHand(p1handMod);
handScore(p1handMod);
console.log("Player 2 Hand:");
showHand(p2handMod);
handScore(p2handMod);
console.log("Crib:");
showHand(cribMod);
handScore(cribMod);

//TEST HAND
// var testHand = [9, 5, 1, 13, 50];
// var testHandMod = handConvert(testHand);
// 
// console.log("Test Hand:")
// console.log(testHand);
// console.log(testHandMod);
// showHand(testHandMod);
// handScore(testHandMod);




