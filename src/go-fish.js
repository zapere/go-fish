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

}

const printGameState = function (gameState) {
	let result = ''

	// Steps: 
	// get the player whose turn it is. 
	const whoseTurn = gameState.players[gameState.whoseTurn]
	// print name hand books 
	// result = `${printPlayerHand(whoseTurn,)}`
	// get other players 
	// print name hand books 

	return result
}



module.exports = {
	group,
	getRank,
	printPlayerHand,
	printPlayerName,
	printPlayerBooks,
	printPlayerGameState,
	printGameState,
}