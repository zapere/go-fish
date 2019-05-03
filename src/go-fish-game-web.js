const assert = require('assert')
const io = require('socket.io-client')
const { getRanks } = require('./go-fish')

function swap(list, index1, index2) {
	const temp = list[index1]
	list[index1] = list[index2]
	list[index2] = temp
}

const list = ["dog", "cat", "rhinoceros", "bird"]
swap(list, 0, 3)
const swapped = list
assert.deepEqual(["bird", "cat", "rhinoceros", "dog"], swapped)

function isYou(player) {
	if (player.name === playerName) {
		return true
	}
	return false
}

function isPlayersTurn(gameState, player) {
	const whoseTurnItIs = gameState.players[gameState.whoseTurn]
	return whoseTurnItIs === player
}

// Game play
// Ask the player their name. 
// Start game button. Which anyone can click to start the game. 
// Display the player looking at the games name on top
// Click "Ask" next to the player you wish to request a card from. 
// 	- Click a card in your hand to select the rank of the request.
// 		- Remove the card from the other player's hand OR 
// 		- go fish

// printGameState
// - Show the hand of the user
// - Show the books of the user
// - Show the number of cards in the hands of the other players
// - Show the books of the other players
// - Show whose turn it is
// - 
// - If it is this user's turn:
//   - offer the option to ask any other player for any rank in this user's hand
// - Display requests to other players
// 	- Show the result of the request 
// - Show the number of cards in the ocean

const elijah = {
	name: 'elijah',
	hand: ['2♠', '9♠', '2♥'],
	books: ['4']
}
const rob = {
	name: 'rob',
	hand: ['3♠', 'K♠', '3♥'],
	books: ['A', '5']
}

const carl = {
	name: 'carl',
	hand: ['6♠', '7♥'],
	books: []
}

const playerName = "rob"

const gameState = {
	players: [elijah, carl, rob],
	ocean: [`K♠`, `7♠`, `8♠`],
	whoseTurn: 0,
}

function clearBoard() {
	document.body.innerHTML = "";
}

function getCardFileName(card) {
	const rank = card.slice(0, card.length - 1)
	const suit = card.slice(-1)
	const suitToLetter = {
		'♠': 'S',
		'♥': 'H',
		'♣': 'C',
		'♦': 'D'
	}
	return rank + suitToLetter[suit] + '.png'
}

function getCardImgTag(card) {
	return `<img src="img/cards/${getCardFileName(card)}" height="180" width="120">`
}

function getBookCard(book) {
	const card = `${book}♣`
	return card
}

function getPlayerHandHtml(player) {
	let html = ''
	if (isYou(player)) {
		const cardsHtml = player.hand.map(getCardImgTag).join('\n')
		html = `
		<h4>Hand</h4>
		<div class="playerHandContainer">
			${cardsHtml}
		</div>`
	}
	return html
}

function getPlayerBooksHtml(player) {
	const booksHtml = player.books.map(getBookCard).map(getCardImgTag).join('\n')
	const html = `
		<h4>Books</h4>
		<div class="playerBookContainer">
			${booksHtml}
		</div>`
	return html
}

function getPlayerCardCountHtml(player) {
	if (!isYou(player)) return `<span class="badge badge-primary">${player.hand.length}</span>`
	return ''
}

//   Show buttons on each player
//     - if it is "You"r turn
//     - buttons for each rank in "You"r hand
//     - for each player who is not You
function getRankButtonHtml(rank) {
	return `<button>${rank}</button>`
}
function getPlayerRankButtonsHtml(gameState, player, playerYou) {
	if (!isPlayersTurn(gameState, playerYou)) {
		return ""
	}
	if (isYou(player)) {
		return ""
	}
	const playerYouRanks = getRanks(playerYou.hand);
	const ranksHtml = playerYouRanks.map(getRankButtonHtml).join('\n')
	const html = `
	Ask for rank:
	${ranksHtml}
	`
	return html
}

function getPlayerHtml(gameState, player) {
	let name = player.name
	if (isYou(player)) {
		name = "You"
	}
	const playerYou = gameState.players.find(isYou)
	const html = `
		<div id= "${name}" class="player-container">
			<span class="playerName">${name}</span>
			${getPlayerCardCountHtml(player)}
			${getPlayerRankButtonsHtml(gameState, player, playerYou)}
			${getPlayerHandHtml(player)}
			${getPlayerBooksHtml(player)}
		</div>
		<hr/>`
	// <div id="player1" class="player-container">
	// 	<span class="playerName">You</span>
	// 	<h4>Hand</h4>
	// 	<div class="playerHandContainer">
	// 		<img src="img/cards/10C.png" height="180" width="120">
	// 		<img src="img/cards/10C.png" height="180" width="120">
	// 		<img src="img/cards/10C.png" height="180" width="120">
	// 		<img src="img/cards/10C.png" height="180" width="120">
	// 		<img src="img/cards/10C.png" height="180" width="120">
	// 		<img src="img/cards/10C.png" height="180" width="120">
	// 		<img src="img/cards/10C.png" height="180" width="120">
	// 		<img src="img/cards/10C.png" height="180" width="120">
	// 		<img src="img/cards/10C.png" height="180" width="120">
	// 		<img src="img/cards/10C.png" height="180" width="120">
	// 	</div>
	// 	<h4>Books</h4>
	// 	<div class="playerBookContainer">
	// 		<img src="img/cards/10C.png" height="180" width="120">
	// 		<img src="img/cards/2C.png" height="180" width="120">
	// 	</div>
	// </div>
	return html
}



function showPlayers(gameState) {
	const indexOfYou = gameState.players.findIndex(isYou)
	swap(gameState.players, indexOfYou, 0)

	function getPlayerHtmlForGameState(player) {
		return getPlayerHtml(gameState, player)
	}

	const html = gameState.players.map(getPlayerHtmlForGameState).join('\n')
	document.body.innerHTML = html
	// Show the names of all the players
	// √ names 
	// √ Hand if player is this user
	// - Books - use new book images. 
	// √ Show the number of cards with each player
	//   Show buttons on each player
	//     - if it is "You"r turn
	//     - buttons for each rank in "You"r hand
	//     - for each player who is not You
}



// really start doing things here
window.onload = function () {
	showPlayers(gameState)
	// const socket = io('http://localhost:3000')
	console.log('init')


	// socket.on('connect', onConnect)
	// socket.on('new-player-added', onNewPlayerAdded)

	// function onNewPlayerAdded(players) {
	// 	console.log(`new player`)
	// 	console.log(`all players`, players)
	// }

	// function onConnect() {
	// 	console.log('connect ' + socket.id);
	// 	socket.emit('add-new-player', "Rob");
	// }

	// $.toast('Here you can put the text of the toast')
}


