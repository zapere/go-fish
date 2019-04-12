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

const gameState = {
	players: [elijah, carl, rob],
	ocean: [`K♠`, `7♠`, `8♠`],
	whoseTurn: 0,
}

function clearBoard() {
	document.body.innerHTML = "";
}

function getPlayerHtml(player) {
	const name = player.name
	const html = `
    <div id="${name}" class="player-container">
		<span class="playerName">${name}</span>
    </div>`
	return html
}

function showPlayers(players) {
	const html = players.map(getPlayerHtml).join('\n')
	document.body.innerHTML = html
	// Show the names of all the players
	// names 
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
