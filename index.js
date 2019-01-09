var pokerhand = (function () {
	var winningCards = [];
	var winningCards_nums = [];
	var alphaNumericArr = {
		"A": 14,
		"J": 11,
		"Q": 12,
		"K": 13,
		"11": "J",
		"12": "Q",
		"13": "K",
		"14": "A"
	};
	var delimiter = "-";
	var CONSTANT = {
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
	function convertToNumeric(cardsArr) {
		for (var i = 0; i < cardsArr.length; i++) {
			var t = cardsArr[i].split(delimiter);
			cardsArr[i] = t[0] + delimiter + ((alphaNumericArr[t[1]] != undefined) ? alphaNumericArr[t[1]] : t[1]);
		}
		return cardsArr;
	}

	function revertToCards(cardsArr) {
		for (var i = 0; i < cardsArr.length; i++) {
			var t = cardsArr[i].split(delimiter);
			cardsArr[i] = t[0] + delimiter + ((alphaNumericArr[t[1]] != undefined) ? alphaNumericArr[t[1]] : t[1]);
		}
		return cardsArr;
	}

	function rearrangeCards(card_array) {
		var temp;
		for (var i = 0; i < card_array.length; i++) {
			for (var j = i + 1; j < card_array.length; j++) {
				var t1 = card_array[i].split(delimiter);
				var t2 = card_array[j].split(delimiter);
				if (parseInt(t1[1]) < parseInt(t2[1])) {
					temp = card_array[j];
					card_array[j] = card_array[i];
					card_array[i] = temp;
				}
			}
		}
		return card_array;
	}

	// ***********************************************************************************************************


	function checkFlush(suits, cValue) {
		var suitCount = {
			"hearts": [],
			"diamonds": [],
			"clubs": [],
			"spades": []
		};
		var winType = CONSTANT.NONE;
		for (var i = 0; i < suits.length; i++) {
			suitCount[suits[i]].push(cValue[i]);
			if (suitCount[suits[i]].length >= 5) {
                winningCards = [];
				for (var j = 0; j < suitCount[suits[i]].length; j++) {
					winningCards.push(suits[i] + delimiter + suitCount[suits[i]][j]);
				}
				winningCards_nums = suitCount[suits[i]];
				winType = CONSTANT.FLUSH;
			}
		}
		return winType;
	}

	function checkStraight(cards_num_arr, cards_suit_arr) {
		var truCount = 0;
		var straight = false;
		var index = [];

		for (var j = 0; j < cards_num_arr.length - 1; j++) {
			if (parseInt(cards_num_arr[j]) == parseInt(cards_num_arr[j + 1]) + 1 && straight == false) {
				index.push(j);
				truCount++;
				if (truCount == 4) {
					index.push(j + 1);

					if (typeof cards_suit_arr != "undefined") {
						winningCards = [];
						for (var i = 0; i <= truCount; i++) {
							if (i == truCount && parseInt(cards_num_arr[j + 1]) == 1) {
								cards_num_arr[j + 1] = 14;
							}
							winningCards.push(cards_suit_arr[index[i]] + delimiter + cards_num_arr[index[i]]);
						}
					}
					straight = true;
				}
			} else if (cards_num_arr[j] != cards_num_arr[j + 1]) {
				index = [];
				truCount = 0;
			}
		}
		return straight;
	}

	// ALL OTHER WINS
	function checkNumbers(numbers, suites) {
		var cNum = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
		// TEMPERORY VARIABLES FOR CHECKING PURPOSES ONLY
		var one_pair, two_pair, TOK, FOK, fullhouse, straight;
		one_pair = two_pair = TOK = FOK = fullhouse  = false;
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
						(TOK == true || FOK == true) ? temp_arr[1] = i: temp_arr[0] = i;
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

    function repeatedCards(cardsArr) {
        var repeatCards = false;
        console.log("checking foro repeated cards");
        for(var i =0;i<cardsArr.length-1;i++)
        {
            for(var j= i+1;j<cardsArr.length;j++)
            {
                if(cardsArr[i] == cardsArr[j]) repeatCards = true;
            }
        }
        console.log("the cards aree repeated "+repeatCards);
        return repeatCards;
    }


	function checkRank(cardsArr) {
        console.log("The cards are :: "+cardsArr);
        try{
            if(repeatedCards(cardsArr))
            {
                throw "cards repeated : please do not use more than 1 suite ";
            }
        }catch(e)
        {
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
			card_value[i] = t[1];
		}

		rank = checkFlush(card_suit, card_value);

		if (rank == CONSTANT.FLUSH) {
			if (winningCards_nums[0] == 14) {
				winningCards_nums.push(1);
			}
			straight = checkStraight(winningCards_nums);
			if (straight == true) {
				rank = (winningCards_nums[0] == 14 && winningCards_nums[1] == 13)? CONSTANT.ROYAL_FLUSH : CONSTANT.STRAIGHT_FLUSH;
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

})();

module.exports = pokerhand;