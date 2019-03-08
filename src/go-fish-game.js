const { askRank, askPlayer, askNewPlayer } = require('./prompt-user')
const { makeDeck, dealFromTop } = require('./deck')
const shuffle = require('./shuffle')
const {
	printGameState,
	moveBookFromHandToBooks,
	findBooks,
	getRanks,
	relinquishCardsOfRank,
	getRank
} = require("./go-fish")
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
	// ocean = ["2♠"]
	deck = shuffle(deck)
	ocean = deck
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

	while (true) {
		let currentPlayer = gameState.players[gameState.whoseTurn]
		console.log(printGameState(gameState, currentPlayer))
		// first player: here is the situation (show game state)
		// Who do you want to ask?

		/// START OF LOOP
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

		console.log('Asking for a: ', rank)

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

		/*
			The concat() method is used to merge two or more arrays. 
			This method does not change the existing arrays, but instead returns a new array.
		*/

		// If the person has the card. 
		// Take the cards of that rank from the person, and give them to the asker. 
		let gotTheRequestedRank = false
		const relinquishedCards = relinquishCardsOfRank(otherPlayer, rank)
		if (relinquishedCards.length > 0) {
			console.log("relinquishedCards", relinquishedCards)
			currentPlayer.hand = currentPlayer.hand.concat(relinquishedCards)
			gotTheRequestedRank = true
		}
		else {
			// Otherwise, something else
			// Go fishing!!!!!!! (take a card from the top of the deck)
			//         c=>< c=>< c=>< c=>< 
			//     c=>< c=>< c=>< c=>< 
			// c=>< c=>< c=>< c=><  c=>< 
			//     c=>< c=>< c=>< c=>< 
			//         c=>< c=>< c=>< c=>< 
			const fishedCard = dealFromTop(ocean, 1)[0]
			currentPlayer.hand.push(fishedCard)

			if (getRank(fishedCard) === rank) {
				gotTheRequestedRank = true
			}
		}

		console.log("gotTheRequestedRank?", gotTheRequestedRank)
		// let currentPlayer = gameState.players[gameState.whoseTurn]
		// if the player got the rank, then don't change whose turn.
		// but if the player didn't, then advance to the next player
		if(gotTheRequestedRank === false){
			gameState.whoseTurn = (gameState.whoseTurn + 1) % gameState.players.length
		}
	} /// END OF LOOP

	// const otherPlayerHandContainsRank = ???
	// console.log('other player has requested rank?', otherPlayerHandContainsRank)


}

run()