var pokerhand = () => {
	var winningCards = [];
	var winningCards_nums = [];
	const alphaNumericArr = {
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
	const CONSTANT = {
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
	const convertToNumeric = (cardsArr) => cardsArr.map(concatArrElement);

	const concatArrElement = (cardsArrItem) => {
		let t = cardsArrItem.split(delimiter);
		return t[0] + delimiter + ((alphaNumericArr[t[1]] != undefined) ? alphaNumericArr[t[1]] : t[1]);
	}

	const revertToCards = (cardsArr) => cardsArr.map(concatArrElement);

	// SELECTION SORT 
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
	}

	// ES2015 ::  Set returns the size of unique elements in set
	const removeDuplicate = (cardsNumArr) => {
		return [...new Set(cardsNumArr)];
	}

	/* ES2015 ::  Set returns the size of unique elements in set
		by comparing the cardsArr with unique element array we can find whether the card is repeated or not
	*/
	const isCardsRepeated = (cardsArr) => cardsArr.length !== new Set(cardsArr).size


	// ***********************************************************************************************************

	const checkFlush = (suits, cardValueArr) => {
		let winType = CONSTANT.NONE;
		let suitCount = {};
		let winningCardsVal = {};

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
				winType = CONSTANT.FLUSH
			}
		});
		return winType;
	}

	const checkStraight = (cardValueArr, suits = []) => {
		let count = 0;
		let cardValueArrNoDuplicate = removeDuplicate(cardValueArr);
		let cardValueArrNoDuplicateLen = cardValueArrNoDuplicate.length;
		// AFTER REMOVING DUPLICATE THERE SHOULD BE MIN 5 CARDS ELSE RETURN FALSE
		if (cardValueArrNoDuplicateLen < winningCardLength) return false;

		let wCards = [];
		for (let i = 0; i < cardValueArr.length - 1; i++) {
			if (cardValueArr[i] === cardValueArr[i + 1] + 1) {
				count += 1;
				wCards.push(suits[i] + delimiter + cardValueArr[i])
				if (i === cardValueArr.length - 2) {
					count += 1;
					wCards.push(suits[i + 1] + delimiter + cardValueArr[i + 1])
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
	}

	const checkNumbers = (cardValueArr, suites)=>
	{
		let cNum = Array(14).fill(0);
		let cNumValArr = Array(2).fill(0);
		let one_pair, two_pair, ToK, FoK, fullhouse, straight, high_card;
		[one_pair, two_pair, ToK, FoK, fullhouse, straight, high_card].fill(false);

		cardValueArr.map((cardVal, index) => {
			cNum[index] += 1;
			switch (cNum[index]) {
				case 4:
					FoK = true;
					cNumValArr[0] = index;
					break;
				case 3:
					if (one_pair || two_pair) {
						fullhouse = true;
						cNumValArr[1] = index;
					} else {
						ToK = true;
						cNumValArr[0] = index;
					}
					break;
				case 2:
					if (one_pair || two_pair) {
						two_pair = true;
						cNumValArr[1] = index;
					} else if (ToK) {
						fullhouse = true
						cNumValArr[1] = index;
					} else {
						one_pair = true;
						cNumValArr[0] = index;
					}
				default:
					high_card = true;
					(ToK == true || FoK == true) ? cNumValArr[1] = index : cNumValArr[0] = index;
			}
			straight = checkStraight(cardValueArr);
		// RETURN WINTYPE
		if (FoK == true) {
			addCardsToArray(CONSTANT.FOUR_OF_A_KIND, cardValueArr, cNumValArr, suites);
			return CONSTANT.FOUR_OF_A_KIND;
		} else if ((ToK == true && one_pair == true) || fullhouse == true) {
			addCardsToArray(CONSTANT.FULLHOUSE, cardValueArr, cNumValArr, suites);
			return CONSTANT.FULLHOUSE;
		} else if (straight) {
			return CONSTANT.STRAIGHT;
		} else if (ToK) {
			addCardsToArray(CONSTANT.THREE_OF_A_KIND, cardValueArr, cNumValArr, suites);
			return CONSTANT.THREE_OF_A_KIND;
		} else if (two_pair) {
			addCardsToArray(CONSTANT.TWO_PAIR, cardValueArr, cNumValArr, suites);
			return CONSTANT.TWO_PAIR;
		} else if (one_pair) {
			addCardsToArray(CONSTANT.ONE_PAIR, cardValueArr, cNumValArr, suites);
			return CONSTANT.ONE_PAIR;
		} else {
			addCardsToArray(CONSTANT.HIGH_CARD, cardValueArr, cNumValArr, suites);
			return CONSTANT.HIGH_CARD;
		}
		});
	}

	// ALL OTHER WINS
	function checkNumbersq(numbers, suites) {
		var cNum = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
		// TEMPERORY VARIABLES FOR CHECKING PURPOSES ONLY
		var one_pair, two_pair, TOK, FOK, fullhouse, straight;
		one_pair = two_pair = TOK = FOK = fullhouse = false;
		var temp_arr = [0, 0];

		// COUNT THE REPETATIVE NUMBERS
		for (var j = 0; j < numbers.length; j++) cNum[numbers[j]]++;

		// CHECK THE WINTYPE
		for (var i = 0; i < cNum.length; i++) {
			//trace("the Cnum valuse is "+cNum[i]);
			switch (cNum[i]) {
				case 4:
					FOK = true;
					temp_arr[0] = i;
					break;
				case 3:
					if (one_pair == true || TOK == true) {
						fullhouse = true;
						temp_arr[1] = i;
					} else {
						TOK = true;
						temp_arr[0] = i;
					}
					break;
				case 2:
					if (one_pair == true) {
						if (two_pair == true) {
							temp_arr[0] = temp_arr[1];
						} else {
							two_pair = true;
						}
						temp_arr[1] = i;
					} else {
						(TOK == true || FOK == true) ? temp_arr[1] = i : temp_arr[0] = i;
						one_pair = true;
					}
					break;
			}
		}
		// CHECK FOR STRAIGHT
		straight = checkStraight(numbers);
		// RETURN WINTYPE
		if (FOK == true) {
			addCardsToArray(CONSTANT.FOUR_OF_A_KIND, numbers, temp_arr, suites);
			return CONSTANT.FOUR_OF_A_KIND;
		} else if ((TOK == true && one_pair == true) || fullhouse == true) {
			addCardsToArray(CONSTANT.FULLHOUSE, numbers, temp_arr, suites);
			return CONSTANT.FULLHOUSE;
		} else if (straight) {
			return CONSTANT.STRAIGHT;
		} else if (TOK) {
			addCardsToArray(CONSTANT.THREE_OF_A_KIND, numbers, temp_arr, suites);
			return CONSTANT.THREE_OF_A_KIND;
		} else if (two_pair) {
			addCardsToArray(CONSTANT.TWO_PAIR, numbers, temp_arr, suites);
			return CONSTANT.TWO_PAIR;
		} else if (one_pair) {
			addCardsToArray(CONSTANT.ONE_PAIR, numbers, temp_arr, suites);
			return CONSTANT.ONE_PAIR;
		} else {
			addCardsToArray(CONSTANT.HIGH_CARD, numbers, temp_arr, suites);
			return CONSTANT.HIGH_CARD;
		}
	}

	function addCardsToArray(winType, nums, temp_arr, suites) {
		var cnt = 0;
		winningCards = [];
		var i;

		switch (winType) {
			case CONSTANT.FOUR_OF_A_KIND:
				for (i = 0; i < nums.length; i++) {
					if (temp_arr[0] == nums[i] && cnt < 4) {
						winningCards.push(suites[i] + delimiter + nums[i]);
						cnt++;
					}
				}
				break;
			case CONSTANT.FULLHOUSE:
				for (i = 0; i < nums.length; i++) {
					if (nums[i] == temp_arr[0] || nums[i] == temp_arr[1]) {
						winningCards.push(suites[i] + delimiter + nums[i]);
						cnt++;
					}
				}
				break;
			case CONSTANT.THREE_OF_A_KIND:
				for (i = 0; i < nums.length; i++) {
					if (temp_arr[0] == nums[i] && cnt <= 3) {
						winningCards.push(suites[i] + delimiter + nums[i]);
						cnt++;
					}
				}
				break;
			case CONSTANT.TWO_PAIR:
				for (i = 0; i < nums.length; i++) {
					if (nums[i] == temp_arr[0] || nums[i] == temp_arr[1] && cnt < 4) {
						winningCards.push(suites[i] + delimiter + nums[i]);
						cnt++;
					}
				}
				break;
			case CONSTANT.ONE_PAIR:
				for (i = 0; i < nums.length; i++) {
					if (temp_arr[0] == nums[i] && cnt < 2) {
						winningCards.push(suites[i] + delimiter + nums[i]);
						cnt++;
					}
				}
				break;
			default:
				winningCards.push(suites[0] + delimiter + nums[0]);
				break;
		}
	}

	const checkRank = (cardsArr) => {
		console.log("The cards are :: " + cardsArr);
		try {
			if (isCardsRepeated(cardsArr)) {
				throw "cards repeated : please do not use more than 1 suite ";
			}
		} catch (e) {
			console.log("************** ERROR *********************");
			console.log(e);
			console.log("************** ERROR *********************");
			process.exit();
		}

		var card_array = rearrangeCards(convertToNumeric(cardsArr));
		var card_suit = [];
		var card_value = [];
		var rank;
		var straight;

		for (var i = 0; i < card_array.length; i++) {
			var t = card_array[i].split(delimiter);
			card_suit[i] = t[0];
			card_value[i] = parseInt(t[1]);
		}

		rank = checkFlush(card_suit, card_value);

		if (rank == CONSTANT.FLUSH) {
			straight = checkStraight(winningCards_nums);
			if (straight == true) {
				rank = (winningCards_nums[0] == 14 && winningCards_nums[1] == 13) ? CONSTANT.ROYAL_FLUSH : CONSTANT.STRAIGHT_FLUSH;
			}
		} else {
			var tCardVal = card_value;
			var tCardSuit = card_suit;
			if (card_value[0] == 14) {
				tCardVal.push(1);
				tCardSuit.push(card_suit[0]);
			}
			straight = checkStraight(tCardVal, tCardSuit);
			if (straight) {
				rank = CONSTANT.STRAIGHT;
			} else {
				rank = checkNumbers(card_value, card_suit);
			}
		}
		winningCards = revertToCards(winningCards);
		console.log("The winning cards are " + winningCards);
		console.log("THe rank is " + rank);
		console.log("*********************************************************************************");
	}

	return {
		"checkRank": checkRank
	}

};

module.exports = pokerhand();