const assert = require('assert')

// Using the `` print your name and age. 

// const elijah = {
// 	name: "Elijah",
// 	age: 15
// }

const elijah = {
	name: 'elijah',
	hand: ['2♠', '9♠'],
	books: ['4']

}
const rob = {
	name: 'rob',
	hand: ['3♠', 'K♠', '3♥'],
	books: ['A', '5']
}
// console.log(rob.name); // rob 


const carl = {
	name: 'carl',
	hand: ['5♠', '6♠'],
	books: []
}

const gameState = {
	players: [elijah, carl, rob],
	ocean: [`K♠`, `7♠`, `4♠`],
	whoseTurn: 0,
}
// Hi my name is Elijah and I'm 15. 
// console.log(`Hi my name is ${elijah.name} and I'm ${elijah.age}.`);

// map 
// Get a list of all the player names 
function playerName(player) {
	const playerName = player.name
	return playerName
}
const names = gameState.players.map(playerName)
// const names = gameState.players.map(player => player.name)
// const names = gameState.players.map(function playerName(player) {
// 	const playerName = player.name
// 	return playerName
// })
console.log(playerName(elijah));


assert.deepEqual(['elijah', 'carl', 'rob'], names)
// filter
// Make a list of the players names who have at least two books. 
// Use map and filter. 
// Steps
// does the player have two or more books 
// get their name 
// 

function hasTwoOrMoreBooks(player) {
	if (player.books.length >= 2) {
		return true
	} else {
		return false
	}
}

// function hasTwoOrMoreBooks(player) {
// 	return player.books.length >= 2
// }

// const hasTwoOrMoreBooks = player => player.books.length >= 2

assert.equal(true, hasTwoOrMoreBooks(rob))
assert.equal(false, hasTwoOrMoreBooks(carl))



const namesWithLotOfBooks = gameState.players.filter(hasTwoOrMoreBooks).map(playerName)

assert.deepEqual(['rob'], namesWithLotOfBooks)
