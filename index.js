const pokerhand = (() => {
	let winningCards = [];
	let winningCards_nums = [];
	const metaAJQK = {
		"A": 14,
		"J": 11,
		"Q": 12,
		"K": 13,
		"11": "J",
		"12": "Q",
		"13": "K",
		"14": "A"
	};
	const winningCardLength = 5;
	const delimiter = "-";
	const WIN = {
		ROYAL_FLUSH: "ROYAL_FLUSH",
		STRAIGHT_FLUSH: "STRAIGHT_FLUSH",
		FLUSH: "FLUSH",
		FOUR_OF_A_KIND: "FOUR_OF_A_KIND",
		FULLHOUSE: "FULLHOUSE",
		THREE_OF_A_KIND: "THREE_OF_A_KIND",
		TWO_PAIR: "TWO_PAIR",
		ONE_PAIR: "ONE_PAIR",
		STRAIGHT: "STRAIGHT",
		HIGH_CARD: "HIGH_CARD",
		NONE: ""
	};


	// UTILITY FUNCTIONS ***************************************************************************************
	// function converts AJQK to numeric
	const convertCard = (card) => {
		let t = card.split(delimiter);
		return t[0] + delimiter + ((metaAJQK[t[1]] !== undefined) ? metaAJQK[t[1]] : t[1]);
	};

	/* SELECTION SORT ALGORITHM
		re-arrange the cards in increasing order based on the card value
	*/
	const rearrangeCards = (cardArr) => {
		let cardArrLen = cardArr.length;
		for (let i = 0; i < cardArrLen; i++) {
			for (let j = i + 1; j < cardArrLen; j++) {
				if (cardArr[i].split(delimiter)[1] < cardArr[j].split(delimiter)[1]) {
					[cardArr[i], cardArr[j]] = [cardArr[j], cardArr[i]];
				}
			}
		}
		return cardArr;
	};

	// Set function is used to get the non-repetitive element Array Size
	const isCardsRepeated = (cardsArr) => cardsArr.length !== new Set(cardsArr).size;

	// ***********************************************************************************************************

	const checkFlush = (suits, cardValueArr) => {
		let winType = WIN.NONE;
		let suitCount = {};
		let winningCardsVal = {};

		// for loop is better suited here as conditional break is not available with map
		suits.map((suit, index) => {
			if (suitCount[suit] === undefined) {
				suitCount[suit] = [];
				winningCardsVal[suit] = [];
			}
			suitCount[suit].push(suit + delimiter + cardValueArr[index]);
			winningCardsVal[suit].push(cardValueArr[index]);
			if (suitCount[suit].length >= 5) {
				winningCards = [...suitCount[suit]];
				winningCards_nums = [...winningCardsVal[suit]];
				winType = WIN.FLUSH;
			}
		});
		return winType;
	};

	const checkStraight = (cardValueArr, suits = []) => {
		let count = 0;
		// AFTER REMOVING DUPLICATE THERE SHOULD BE MIN 5 CARDS ELSE RETURN FALSE
		if (new Set(cardValueArr).size < winningCardLength) return false;

		let wCards = [];
		for (let i = 0; i < cardValueArr.length - 1; i++) {
			if (cardValueArr[i] === cardValueArr[i + 1] + 1) {
				count += 1;
				wCards.push(suits[i] + delimiter + cardValueArr[i])
				if (i === cardValueArr.length - 2) {
					count += 1;
					wCards.push(suits[i + 1] + delimiter + cardValueArr[i + 1]);
				}
			} else if (cardValueArr[i] !== cardValueArr[i + 1]) {
				count = 0;
				wCards = [];
			}
		}

		if (count >= winningCardLength) {
			if (suits.length > 0) {
				winningCards = [...wCards];
			}
			return true;
		}
		return false;
	};

	const checkNumbers = (cardValueArr, suites) => {
		let cNum = Array(14).fill(0);
		let cNumValArr = Array(2).fill(0);
		let one_pair, two_pair, ToK, FoK, fullhouse, straight, high_card;
		[one_pair, two_pair, ToK, FoK, fullhouse, straight, high_card].fill(false);

		cardValueArr.map((cardVal) => {
			cNum[cardVal] += 1;
		});

		for (var i = 0; i < cNum.length; i++) {
			switch (cNum[i]) {
				case 4:
					FoK = true;
					cNumValArr[0] = i;
					break;
				case 3:
					if (one_pair) {
						one_pair = false;
						fullhouse = true;
						cNumValArr[1] = i;
					} else if (two_pair) {
						two_pair = false;
						fullhouse = true;
						cNumValArr[0] = Math.max(...cNumValArr);
						cNumValArr[1] = i;
					} else if (ToK) {
						ToK = false;
						fullhouse = true;
						cNumValArr[1] = i;
					} else {
						ToK = true;
						cNumValArr[0] = i;
					}
					break;
				case 2:
					if (one_pair) {
						one_pair = false;
						two_pair = true;
						cNumValArr[1] = i;
					} else if (two_pair) {
						cNumValArr = [...cNumValArr, i].sort().reverse().slice(0, 2);
					} else if (ToK) {
						one_pair = false;
						fullhouse = true;
						cNumValArr[1] = i;
					} else {
						one_pair = true;
						cNumValArr[0] = i;
					}
					break;
				default:
					break;
			}
		}
		straight = checkStraight(cardValueArr);
		let winType = "";
		// RETURN WINTYPE
		if (FoK) {
			winType = WIN.FOUR_OF_A_KIND;
		} else if (fullhouse) {
			winType = WIN.FULLHOUSE;
		} else if (straight) {
			winType = WIN.STRAIGHT;
		} else if (ToK) {
			winType = WIN.THREE_OF_A_KIND;
		} else if (two_pair) {
			winType = WIN.TWO_PAIR;
		} else if (one_pair) {
			winType = WIN.ONE_PAIR;
		} else {
			cNumValArr[0] = Math.max(...cardValueArr);
			winType = WIN.HIGH_CARD;
		}
		addWinningCardsToArray(winType, cardValueArr, cNumValArr, suites);
		return winType;
	};


	const addWinningCardsToArray = (winType, cardValArr, cardsNumArr, suites) => {
		winningCards = [];
		switch (winType) {
			case WIN.FOUR_OF_A_KIND:
			case WIN.THREE_OF_A_KIND:
			case WIN.ONE_PAIR:
			case WIN.HIGH_CARD:
				winningCards = cardValArr.map((cardVal, index) => {
					if (cardsNumArr[0] === cardVal) {
						return (suites[index] + delimiter + cardVal);
					}
				}).filter(n => n);
				break;
			case WIN.FULLHOUSE:
			case WIN.TWO_PAIR:
				winningCards = cardValArr.map((cardVal, index) => {
					if (cardsNumArr[0] === cardVal || cardsNumArr[1] === cardVal) {
						return (suites[index] + delimiter + cardVal);
					}
				}).filter(n => n);
				break;
			default:
				break;
		}
	};

	const checkRank = (hand) => {
		try {
			if (isCardsRepeated(hand)) {
				throw new Error("cards repeated : cards from 1 set only, please do not use repeated cards.");
			}
		} catch (e) {
			console.error(e.stack);
			process.exit();
		}

		hand = rearrangeCards(hand.map(convertCard));
		let [card_suit, card_value] = [[], []];
		let rank, straight;

		hand.map((card, index) => {
			let cardObj = card.split(delimiter);
			[card_suit[index], card_value[index]] = [cardObj[0], parseInt(cardObj[1])];
		});

		rank = checkFlush(card_suit, card_value);

		if (rank == WIN.FLUSH) {
			straight = checkStraight(winningCards_nums);
			if (straight == true) {
				rank = (winningCards_nums[0] == 14 && winningCards_nums[1] == 13) ? WIN.ROYAL_FLUSH : rank;
			}
		} else {
			let tCardVal = card_value;
			let tCardSuit = card_suit;
			if (card_value[0] == 14) {
				tCardVal.push(1);
				tCardSuit.push(card_suit[0]);
			}
			straight = checkStraight(tCardVal, tCardSuit);
			rank = (straight) ? WIN.STRAIGHT : checkNumbers(card_value, card_suit);
		}
		winningCards = winningCards.map(convertCard);

		console.info("Winning Cards : " + winningCards);
		console.info("Rank : " + rank);

		// RETURN RANK & WINIINGS CARDS TO HIGHLIGHT
		return {
			"wintype": rank,
			"winningcards": winningCards
		};
	};

	// This is the only exposed function
	return {
		"checkRank": checkRank
	};

})();

module.exports = pokerhand;