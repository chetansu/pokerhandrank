# Poker Hand Ranking
A simple algorithm (with JS ES6 features) to identify the win a hand has.

# Git Repository
https://github.com/chetansu/pokerhand_rank.git

# Testing
To run the mocha test case. please install mocha and run the cases by using the command mocha.
'''sh
$ npm install -g mocha
$ mocha

Check Poker rank of various hands
The winning cards are hearts-A,hearts-K,hearts-Q,hearts-J,hearts-10
THe rank is ROYAL_FLUSH
    ✔ cards in hand are : hearts-A,hearts-K,clubs-J,diamonds-8,hearts-J,hearts-Q,hearts-10
The winning cards are hearts-7,clubs-7,diamonds-7,spades-7
THe rank is FOUR_OF_A_KIND
    ✔ cards in hand are : hearts-7,hearts-3,clubs-7,diamonds-7,spades-7,hearts-5,spades-4
The winning cards are hearts-9,hearts-5,hearts-4,hearts-3,hearts-2
THe rank is FLUSH
    ✔ cards in hand are : hearts-9,hearts-3,clubs-4,diamonds-8,hearts-4,hearts-5,hearts-2
The winning cards are clubs-5,spades-5,hearts-4,clubs-4,diamonds-4
THe rank is FULLHOUSE
    ✔ cards in hand are : hearts-4,hearts-3,clubs-4,diamonds-4,hearts-7,clubs-5,spades-5
The winning cards are hearts-5,clubs-5,spades-5
THe rank is THREE_OF_A_KIND
    ✔ cards in hand are : hearts-5,hearts-3,clubs-4,diamonds-2,hearts-7,clubs-5,spades-5
The winning cards are diamonds-4,hearts-4,hearts-3,clubs-3
THe rank is TWO_PAIR
    ✔ cards in hand are : hearts-4,hearts-3,clubs-3,diamonds-4,hearts-7,clubs-9,spades-5
The winning cards are hearts-4,clubs-4
THe rank is ONE_PAIR
    ✔ cards in hand are : hearts-4,hearts-A,clubs-4,diamonds-6,hearts-7,clubs-9,spades-5
The winning cards are diamonds-K
THe rank is HIGH_CARD
    ✔ cards in hand are : hearts-4,hearts-7,clubs-9,diamonds-K,hearts-J,clubs-2,spades-5


  8 passing (21ms)
'''

License
----
ISC
**Free Software, Hell Yeah!**
