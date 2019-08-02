const assert = require('assert')
const io = require('socket.io-client')
const { getRanks, findAndMovePlayerBooks } = require('./go-fish')
const shuffle = require('./shuffle')
const {dealFromTop, makeDeck} = require("./deck")
let socket

let playerName = "elijah"

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

let playerNames = []

let gameState = {
	players: [elijah, carl, rob],
	ocean: [`K♠`, `7♠`, `8♠`],
	whoseTurn: 2,
}

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
	return whoseTurnItIs.name === player.name
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
	return `<img class="playing-card" src="img/cards/${getCardFileName(card)}" height="180" width="120">`
}

function getBookImgTag(rank) {
	return `<img class="playing-card" src="img/cards/${rank}-book.png" height="180" width="120">`
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
	const booksHtml = player.books
		.map(getBookImgTag)
		.join('\n')

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
function getRankButtonHtml(player, rank) {
	return `<button onclick="rankButtonClicked('${rank}', '${player.name}')">${rank}</button>`
}

function getPlayerRankButtonsHtml(gameState, player, playerYou) {
	// if it's not "You"r turn, don't show buttons
	if (!isPlayersTurn(gameState, playerYou)) {
		return ""
	}
	// don't show buttons next to your own name
	if (isYou(player)) {
		return ""
	}
	const playerYouRanks = getRanks(playerYou.hand);

	function getRankButtonHtmlForPlayer(rank) {
		return getRankButtonHtml(player, rank)
	}

	const ranksHtml = playerYouRanks.map(getRankButtonHtmlForPlayer).join('\n')
	const html = `
	Ask for rank:
	${ranksHtml}
	`
	return html
}

function getFishIconHtml(gameState, player) {
	if (isPlayersTurn(gameState, player)) {
		return `<img class="fish-icon" src="img/fish-icon.svg" height="40px" width="40px">`
	}
	return ""
}


function getPlayerHtml(gameState, player) {
	let name = player.name
	if (isYou(player)) {
		name = "You"
	}
	const playerYou = gameState.players.find(isYou)
	const html = `
		<div id= "${name}" class="player-container">
			${getFishIconHtml(gameState, player)}
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
	const players = [...gameState.players]
	const indexOfYou = players.findIndex(isYou)
	swap(players, indexOfYou, 0)

	function getPlayerHtmlForGameState(player) {
		return getPlayerHtml(gameState, player)
	}

	const html = players.map(getPlayerHtmlForGameState).join('\n')
	document.body.innerHTML = html
}

function rankButtonClicked(rank, playerName) {
	console.log({ playerName: playerName, rank: rank });
	showToastMessage(`${playerName} have any ${rank}s?`)
	showToastMessage(`Fish is very good!`)
}
window.rankButtonClicked = rankButtonClicked

function showToastMessage(text) {
	$.toast({
		text: text,
		hideAfter: 5000,
		showHideTransition: 'plain' // fade, slide or plain
	})
}

function showNameScreen() {
	const startScreenHtml = `
		<div class="input-group mb-3">
			<input id="nameInput" type="text" class="form-control" placeholder="What's your name?">
			<div class="input-group-append">
				<button onclick="joinGame()" class="btn btn-outline-secondary" type="button" id="button-addon2">Join</button>
			</div>
		</div>`
	document.body.innerHTML = startScreenHtml;
}

function showConnectedPlayersScreen(activePlayers) {

	function getConnectedPlayerHtml(activePlayer) {
		return `<li class="list-group-item">${activePlayer}</li>`
	}

function onClickStart (){
	startGame()
}
window.onClickStart = onClickStart

	function getButtonHtml() {
		return `<button onClick="onClickStart()" type="button" class="btn btn-primary btn-lg btn-block">Start</button>`
	}

	const connectedPlayersListHtml = activePlayers.map(getConnectedPlayerHtml).join('\n')
	const connectedPlayersHtml = `
	<h1>Connected Players</h1>
	<ul class="list-group list-group-flush">
		${connectedPlayersListHtml}
		${getButtonHtml()}
	`
	document.body.innerHTML = connectedPlayersHtml;
}

function onPlayerAdded(activePlayers) {
	console.log(activePlayers)
	playerNames = activePlayers
	showConnectedPlayersScreen(activePlayers)
}

function joinGame() {
	const nameInput = document.getElementById("nameInput");
	console.log(`nameInput: ${nameInput.value}`);
	playerName = nameInput.value;
	socket.on('player-added', onPlayerAdded)
	socket.emit('new-player', playerName)
	console.log("joining game")
}
window.joinGame = joinGame


// let gameState = {
// 	players: [elijah, carl, rob],
// 	ocean: [`K♠`, `7♠`, `8♠`],
// 	whoseTurn: 2,
// }

function startGame() {
	console.log(playerNames)
	const ocean = shuffle(makeDeck())

	function createPlayer(name){
		const hand = dealFromTop(ocean, 7)
		const books = []
		const player = {
			name,
			hand,
			books
		}
		findAndMovePlayerBooks(player)
		return player
	}

	const players = playerNames.map(createPlayer)
	const whoseTurn = 0

	gameState = {
		players,
		ocean,
		whoseTurn
	}
	socket.emit('game-state', gameState)

	// showPlayers(gameState)
}

window.startGame = startGame

// Game play
// Ask the player their name. 
// Start game button. Which anyone can click to start the game. 
// Display the player looking at the games name on top
// Click "Ask" next to the player you wish to request a card from. 
// 	- Click a card in your hand to select the rank of the request.
// 		- Remove the card from the other player's hand OR 
// 		- go fish

// - If it is this user's turn:
//   - offer the option to ask any other player for any rank in this user's hand
// - Display requests to other players
// 	- Show the result of the request 
// - Show the number of cards in the ocean
window.onload = function () {
	socket = io('http://localhost:3000')
	showNameScreen();
	console.log('init')

	function myKeydownHandler(event) {
		// console.log(event);
		if (event.code === "Enter") {
			console.log("Enter is hit");
			joinGame()
		}
	}
	document.addEventListener('keydown', myKeydownHandler);

	// Next steps: 
	// √ Connect to the server. 
	// √ Send the name of the user to the server.
	// √ Save active players on the server 
	// Show a start button when 3 players have joined.
	// Show game after start button is hit
	// Start game play. 


	// Nice to have / ideas
	// Show the number of users already connected to the server. 
	// 


	socket.on('connect', onConnect)
	function onConnect() {
		console.log('connect ' + socket.id);
	}

	socket.on("game-state-changed", onGameStateChanged)
	function onGameStateChanged(gameState) {
		showPlayers(gameState)
	}

	function onStartNewGame() {
		showNameScreen()
	}
	socket.on('start-new-game', onStartNewGame)
	// $.toast('Here you can put the text of the toast')
}


