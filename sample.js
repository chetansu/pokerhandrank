const pokerhand = require("pokerhandrank");

console.log(pokerhand.checkRank(["hearts-A", "hearts-K", "clubs-J", "diamonds-8", "hearts-J", "hearts-Q", "hearts-10"]));
console.log(pokerhand.checkRank(["hearts-7", "hearts-3", "clubs-7", "diamonds-7", "spades-7", "hearts-5", "spades-4"]));
console.log(pokerhand.checkRank(["hearts-9", "hearts-3", "clubs-4", "diamonds-8", "hearts-4", "hearts-5", "hearts-2"]));
console.log(pokerhand.checkRank(["hearts-4", "hearts-3", "clubs-4", "diamonds-4", "hearts-7", "clubs-5", "spades-5"]));
console.log(pokerhand.checkRank(["hearts-5", "hearts-3", "clubs-4", "diamonds-2", "hearts-7", "clubs-5", "spades-5"]));
console.log(pokerhand.checkRank(["hearts-4", "hearts-3", "clubs-3", "diamonds-4", "hearts-7", "clubs-9", "spades-5"]));
console.log(pokerhand.checkRank(["hearts-4", "hearts-A", "clubs-4", "diamonds-6", "hearts-7", "clubs-9", "spades-5"]));
console.log(pokerhand.checkRank(["hearts-4", "hearts-7", "clubs-9", "diamonds-K", "hearts-J", "clubs-2", "spades-5"]));