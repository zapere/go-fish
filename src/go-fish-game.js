const { askRank, askPlayer, askNewPlayer } = require('./prompt-user')
const { makeDeck, dealFromTop } = require('./deck')
const shuffle = require('./shuffle')
const { printGameState, moveBookFromHandToBooks, findBooks, getRanks } = require("./go-fish")
async function run() {
	let gameState = {
		players: [],
		ocean: [],
		whoseTurn: 0,
	}

	// ask for the players
	let player
	let players = []
	while (true) {
		player = await askNewPlayer()
		if (player === undefined) {
			break
		}
		players.push(player)
	}

	gameState.players = players.map(player => {
		return {
			name: player,
			hand: [],
			books: []
		}
	})

	// create and shuffle the deck
	let deck = makeDeck()
	deck = shuffle(deck)
	// deal n cards to each player
	// n is 7 if # players is 2 or 3, otherwise n is 5
	let cardsPerPlayer
	if (gameState.players.length < 4) {
		cardsPerPlayer = 7
	} else {
		cardsPerPlayer = 5
	}

	gameState.players.forEach(function (player) {
		player.hand = dealFromTop(deck, cardsPerPlayer)
		const books = findBooks(player.hand)
		books.forEach(function (book) {
			moveBookFromHandToBooks(player, book)
		})
	})


	const currentPlayer = gameState.players[0]
	console.log(printGameState(gameState, currentPlayer))
	// first player: here is the situation (show game state)
	// Who do you want to ask?
	const otherPlayers = gameState.players
		.filter(function (player) {
			return player !== currentPlayer
		})
		.map(function (player) {
			return player.name
		})
	const otherPlayerName = await askPlayer(otherPlayers)

	// For what card?
	const rank = await askRank(getRanks(currentPlayer.hand))

	console.log('rank', rank)

	// does otherPlayer have the rank?
	const otherPlayer = gameState.players
		.find(function (player) {
			if (player.name === otherPlayerName) {
				return true
			} else {
				return false
			}
		})
	console.log("other player hand", otherPlayer.hand)
	// const otherPlayerHandContainsRank = ???
	// console.log('other player has requested rank?', otherPlayerHandContainsRank)


}

run()