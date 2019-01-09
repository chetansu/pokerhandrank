var pokerHandRank = require("./index.js");
pokerHandRank.checkRank(["hearts-8","hearts-9","clubs-8","diamonds-8","hearts-4","hearts-7", "hearts-5"]);
pokerHandRank.checkRank(["hearts-8","hearts-7","clubs-8","diamonds-8","hearts-4","hearts-6", "hearts-5"]);
pokerHandRank.checkRank(["hearts-A","hearts-K","clubs-J","diamonds-8","hearts-J","hearts-Q", "hearts-10"]);
pokerHandRank.checkRank(["hearts-A","hearts-3","clubs-5","diamonds-2","diamonds-4","hearts-Q", "hearts-10"]);

// STRAIGHT FLUSH 1,2,3,4,5
pokerHandRank.checkRank(["hearts-A","hearts-3","clubs-4","diamonds-8","hearts-4","hearts-5", "hearts-2"]);

// FOUR OF A KIND
pokerHandRank.checkRank(["hearts-7","hearts-3","clubs-4","diamonds-4","hearts-7","hearts-5", "spades-4"]);

// FULL HOUSE
pokerHandRank.checkRank(["hearts-4","hearts-3","clubs-4","diamonds-4","hearts-7","clubs-5", "spades-5"]);

// THREE OF A KIND
pokerHandRank.checkRank(["hearts-4","hearts-3","clubs-4","diamonds-4","hearts-7","clubs-9", "spades-5"]);

// TWO PAIR
pokerHandRank.checkRank(["hearts-4","hearts-3","clubs-3","diamonds-4","hearts-7","clubs-9", "spades-5"]);

// PAIR
pokerHandRank.checkRank(["hearts-4","hearts-A","clubs-4","diamonds-6","hearts-7","clubs-9", "spades-5"]);

// HIGH CARD
pokerHandRank.checkRank(["hearts-4","hearts-6","clubs-9","diamonds-K","hearts-J","clubs-2", "spades-5"]);
// console.log("hello")
