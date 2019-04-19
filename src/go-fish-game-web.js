const assert = require('assert')
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

function getPlayerHandHtml(player) {
	let html = ''
	if (isYou(player)) {
		// const zzz =        players.map(getPlayerHtml).join('\n')
		const cardsHtml = player.hand.map(getCardImgTag).join('\n')
		html = `
		<h4>Hand</h4>
		<div class="playerHandContainer">
			${cardsHtml}
		</div>`
	}
	return html
}

function getPlayerHtml(player) {
	let name = player.name
	if (isYou(player)) {
		name = "You"
	}
	const html = `
    <div id="${name}" class="player-container">
		<span class="playerName">${name}</span>
		${getPlayerHandHtml(player)}
		</div>`
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



function showPlayers(players) {
	const indexOfYou = players.findIndex(isYou)
	swap(players, indexOfYou, 0)
	const html = players.map(getPlayerHtml).join('\n')
	document.body.innerHTML = html
	// Show the names of all the players
	// √ names 
	// Hand if player is this user
	// Books 
}

// - Show the hand of the user
// 	- Show the hand of elijah


// really start doing things here
window.onload = function () {
	clearBoard()
	showPlayers(gameState.players)
}


