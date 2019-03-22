const getRank = function (card) {
	const rank = card.slice(0, card.length - 1)
	return rank
}
const printPlayerHand = function (playerToDisplay, forPlayer) {
	if (playerToDisplay === forPlayer) {
		let ranks = playerToDisplay.hand.map(getRank)
		ranks = group(ranks)
		return `[${ranks.join(', ')}]`
	}
	return '[.....]'
}

const group = function (list) {
	list.sort()
	list.push('Sentinel')
	let previous = list[0]
	let currentResultItem = ''
	let result = []
	for (let i = 0; i < list.length; i++) {
		if (list[i] === previous) {
			currentResultItem += list[i]
		} else {
			result.push(currentResultItem)
			currentResultItem = list[i]
			previous = list[i]
		}
	}
	return result
}

const printPlayerName = function (playerToDisplay, forPlayer) {
	let result = playerToDisplay.name
	if (playerToDisplay === forPlayer) {
		return 'YOU'
	}
	return result
}

const printPlayerBooks = function (player) {
	let result = []
	// Steps 
	// get the player's books 
	// 
	const books = player.books
	for (let i = 0; i < books.length; i++) {
		result.push(books[i].repeat(4))
	}
	result.sort()
	return `[${result.join(' ')}]`
}

const printPlayerGameState = function (playerToDisplay, forPlayer) {
	const hand = printPlayerHand(playerToDisplay, forPlayer)
	const books = printPlayerBooks(playerToDisplay)
	const player = printPlayerName(playerToDisplay, forPlayer)
	return `${player}: ${hand} ${books}`
}

const printGameState = function (gameState, forPlayer) {
	let result = ''

	// Steps: 
	// get the player whose turn it is. 
	//const whoseTurn = gameState.players[gameState.whoseTurn]
	// print name hand books 
	result += printPlayerGameState(forPlayer, forPlayer) + '\n\n'
	const otherPlayers = gameState.players.filter(function (player) {
		return player !== forPlayer
	})
	otherPlayers.forEach(
		function (player) {
			result += printPlayerGameState(player) + '\n'
		}
	)
	// result = `${printPlayerHand(whoseTurn,)}`
	// get other players 
	// print name hand books 

	return result
}

const hasFourCards = function (group) {
	if (group.includes('0')) {
		if (group.length === 8) {
			return true
		}
		return false
	}

	if (group.length === 4) {
		return true
	}
	return false
}
const getRankFromGroup = function (group) {
	if (group.includes('0')) {
		return '10'
	}
	return group[0]
}
// find the books in the hand 
const findBooks = function (hand) {
	const ranks = hand.map(getRank)
	const groups = group(ranks)
	const books = groups
		.filter(hasFourCards)
		.map(getRankFromGroup)
	return books
}

const moveBookFromHandToBooks = function (player, book) {

	// Take the book's cards out of player's hand. 
	player.hand = player.hand.filter(function (card) {
		const rank = getRank(card);
		if (rank === book) {
			return false
		}
		return true
	})
	// Add the new book to the player's books. 
	player.books.push(book)
}

const findAndMovePlayerBooks = function (player) {
	const books = findBooks(player.hand)
	books.forEach(function (book) {
		moveBookFromHandToBooks(player, book)
	})
}

const getRanks = function (hand) {
	let ranks = []
	// const handRanks = hand.map(getRank)
	// handRanks.forEach(rank => {
	// 	if (!ranks.includes(rank)) {
	// 		ranks.push(rank)
	// 	}
	// })
	for (let i = 0; i < hand.length; i++) {
		const rank = getRank(hand[i])
		if (!ranks.includes(rank)) {
			ranks.push(rank)
		}
	}
	return ranks
}

const matchesRank = function (rank, card) {
	const cardRank = getRank(card)
	if (rank === cardRank) {
		return true
	}
	else {
		return false
	}
}

const relinquishCardsOfRank = function (player, requestedRank) {
	const matchesThisRank = function (card) {
		return matchesRank(requestedRank, card)
	}

	const matchingCards = player.hand.filter(matchesThisRank)

	const doesntMatchThisRank = function (card) {
		return !matchesRank(requestedRank, card)
	}

	player.hand = player.hand.filter(doesntMatchThisRank)

	return matchingCards
}

// when found, move books from hand to books

// determine if the player has the requested card 

// change a player's hand (add or remove cards)


module.exports = {
	group,
	getRank,
	printPlayerHand,
	printPlayerName,
	printPlayerBooks,
	printPlayerGameState,
	printGameState,
	findBooks,
	hasFourCards,
	getRankFromGroup,
	moveBookFromHandToBooks,
	findAndMovePlayerBooks,
	getRanks,
	matchesRank,
	relinquishCardsOfRank
}

