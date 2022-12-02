# Poker Hand Ranking
A simple algorithm (with JS ES6 features) to identify the win a hand has.

# Git Repository
https://github.com/chetansu/pokerhand_rank.git

# Usage
install the package using npm command 
```sh
$ npm i pokerhandrank
```

for instantiation, you wil have to assign pokerhand rank to a variable.
The only method that is exposed is checkRank. checkRank function takes in an array of 7 cards. and returns with a json response, indicating the type of win and the winning cards.

```sh
const pokerhand = require("pokerhandrank");

pokerhand.checkRank(["hearts-A", "hearts-K", "clubs-J", "diamonds-8", "hearts-J", "hearts-Q", "hearts-10"]);
pokerhand.checkRank(["hearts-7", "hearts-3", "clubs-7", "diamonds-7", "spades-7", "hearts-5", "spades-4"]);
pokerhand.checkRank(["hearts-9", "hearts-3", "clubs-4", "diamonds-8", "hearts-4", "hearts-5", "hearts-2"]);
pokerhand.checkRank(["hearts-4", "hearts-3", "clubs-4", "diamonds-4", "hearts-7", "clubs-5", "spades-5"]);
pokerhand.checkRank(["hearts-5", "hearts-3", "clubs-4", "diamonds-2", "hearts-7", "clubs-5", "spades-5"]);
pokerhand.checkRank(["hearts-4", "hearts-3", "clubs-3", "diamonds-4", "hearts-7", "clubs-9", "spades-5"]);
pokerhand.checkRank(["hearts-4", "hearts-A", "clubs-4", "diamonds-6", "hearts-7", "clubs-9", "spades-5"]);
pokerhand.checkRank(["hearts-4", "hearts-7", "clubs-9", "diamonds-K", "hearts-J", "clubs-2", "spades-5"]);
```

call to checkRank will result in the json structured below
```sh
{
  wintype: 'TWO_PAIR',
  winningcards: [ 'diamonds-4', 'hearts-4', 'hearts-3', 'clubs-3' ]
}
```


# Testing
To run the mocha test case. please install mocha and run the cases by using the command mocha.
```sh
$ npm install -g mocha
$ mocha


  Check Poker rank of various hands
Winning Cards : hearts-A,hearts-K,hearts-Q,hearts-J,hearts-10
Rank : ROYAL_FLUSH
    ✔ cards in hand are : hearts-A,hearts-K,clubs-J,diamonds-8,hearts-J,hearts-Q,hearts-10
Winning Cards : hearts-7,clubs-7,diamonds-7,spades-7
Rank : FOUR_OF_A_KIND
    ✔ cards in hand are : hearts-7,hearts-3,clubs-7,diamonds-7,spades-7,hearts-5,spades-4
Winning Cards : hearts-9,hearts-5,hearts-4,hearts-3,hearts-2
Rank : FLUSH
    ✔ cards in hand are : hearts-9,hearts-3,clubs-4,diamonds-8,hearts-4,hearts-5,hearts-2
Winning Cards : clubs-5,spades-5,hearts-4,clubs-4,diamonds-4
Rank : FULLHOUSE
    ✔ cards in hand are : hearts-4,hearts-3,clubs-4,diamonds-4,hearts-7,clubs-5,spades-5
Winning Cards : hearts-5,clubs-5,spades-5
Rank : THREE_OF_A_KIND
    ✔ cards in hand are : hearts-5,hearts-3,clubs-4,diamonds-2,hearts-7,clubs-5,spades-5
Winning Cards : diamonds-4,hearts-4,hearts-3,clubs-3
Rank : TWO_PAIR
    ✔ cards in hand are : hearts-4,hearts-3,clubs-3,diamonds-4,hearts-7,clubs-9,spades-5
Winning Cards : hearts-4,clubs-4
Rank : ONE_PAIR
    ✔ cards in hand are : hearts-4,hearts-A,clubs-4,diamonds-6,hearts-7,clubs-9,spades-5
Winning Cards : diamonds-K
Rank : HIGH_CARD
    ✔ cards in hand are : hearts-4,hearts-7,clubs-9,diamonds-K,hearts-J,clubs-2,spades-5


  8 passing (21ms)
```

License
----
ISC
**Free Software, Hell Yeah!**
