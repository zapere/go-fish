const getRank = function (card) {
	const rank = card.slice(0, card.length - 1)
	return rank
}
const printPlayerHand = function (playerToDisplay, forPlayer) {
	if (playerToDisplay === forPlayer) {
		return playerToDisplay.hand.map(getRank)
	}
	return 'asdflkasdflkj'
}

const printPlayerName = function (playerToDisplay, forPlayer) {
	let result = playerToDisplay.name
	if (playerToDisplay === forPlayer) {
		return 'YOU'
	}
	return result
}

const printPlayerBooks = function () {

}

const printGameState = function (gameState) {
	let result = players
	return result
}



module.exports = {
	getRank,
	printPlayerHand,
	printPlayerName,
	printPlayerBooks,
	printGameState,
}