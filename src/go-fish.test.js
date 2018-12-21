const assert = require('assert')
const {
	printPlayerHand,
	printPlayerName,
	printPlayerBooks,
	printGameState,
	getRank
} = require('./go-fish')

const elijah = {
	name: 'elijah',
	hand: ['2♠', '9♠'],
	books: ['4']

}
const rob = {
	name: 'rob',
	hand: ['3♠', 'K♠', '3♥'],
	books: ['A']
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

// GAME STATE:
// YOU: [AA 22 3 777 9 K]  [8888 JJJJ]

// PLAYER 2: [.....] [6666]
// PLAYER 3: [.....] []

const expected = `
YOU: [2 9] [4444]
carl: [.....] []
rob: [.....] [AAAA]`.trim()

assert.deepEqual('rob', printPlayerName(rob, elijah))
assert.deepEqual('YOU', printPlayerName(rob, rob))

assert.equal('3', getRank('3♠'))
assert.equal('10', getRank('10♠'))

const addRJB = function (item) {
	return "RJB"
}
const list = ['3♠', 'K♠', '3♥']
console.log(list.map(getRank));


// assert.deepEqual('[.....]', printPlayerHand(rob, elijah))
// ['3♠', 'K♠', '3♥'] -> [3, K, 3]
assert.deepEqual(`[3, K, 3]`, printPlayerHand(rob, rob))


// assert.deepEqual(expected, printGameState(gameState))