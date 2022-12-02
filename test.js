const assert = require('assert');
const pokerhand = require('./index');

describe('Check Poker rank of various hands', function () {
  const tests = [
    {args: ["hearts-A", "hearts-K", "clubs-J", "diamonds-8", "hearts-J", "hearts-Q", "hearts-10"], expected: "ROYAL_FLUSH"},
    {args: ["hearts-7", "hearts-3", "clubs-7", "diamonds-7", "spades-7", "hearts-5", "spades-4"], expected: "FOUR_OF_A_KIND"},
    {args: ["hearts-9", "hearts-3", "clubs-4", "diamonds-8", "hearts-4", "hearts-5", "hearts-2"], expected: "FLUSH"},
    {args: ["hearts-4", "hearts-3", "clubs-4", "diamonds-4", "hearts-7", "clubs-5", "spades-5"], expected: "FULLHOUSE"},
    {args: ["hearts-5", "hearts-3", "clubs-4", "diamonds-2", "hearts-7", "clubs-5", "spades-5"], expected: "THREE_OF_A_KIND"},
    {args: ["hearts-4", "hearts-3", "clubs-3", "diamonds-4", "hearts-7", "clubs-9", "spades-5"], expected: "TWO_PAIR"},
    {args: ["hearts-4", "hearts-A", "clubs-4", "diamonds-6", "hearts-7", "clubs-9", "spades-5"], expected: "ONE_PAIR"},
    {args: ["hearts-4", "hearts-7", "clubs-9", "diamonds-K", "hearts-J", "clubs-2", "spades-5"], expected: "HIGH_CARD"}
  ];

  tests.forEach(({args, expected}) => {
    it(`cards in hand are : ${args}`, function () {
      const res = pokerhand.checkRank(args);
      assert.strictEqual(res.wintype, expected);
    });
  });
});