const assert = require('assert')
const {
	group,
	printPlayerHand,
	printPlayerName,
	printPlayerBooks,
	printPlayerGameState,
	printGameState,
	getRank,
	findBooks,
	hasFourCharacters,
	getFirstChar,
	moveBookFromHandToBooks,
	getRanks
} = require('./go-fish')

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

// carl: [.....] [6666]
// rob: [.....] []

assert.deepEqual('rob', printPlayerName(rob, elijah))
assert.deepEqual('YOU', printPlayerName(rob, rob))

assert.equal('3', getRank('3♠'))
assert.equal('10', getRank('10♠'))

assert.deepEqual(['33', '4', 'K'], group(['3', 'K', '3', '4']))


// assert.deepEqual('[.....]', printPlayerHand(rob, elijah))
// ['3♠', 'K♠', '3♥'] -> [3, K, 3]
assert.deepEqual(`[33, K]`, printPlayerHand(rob, rob))
assert.deepEqual(`[.....]`, printPlayerHand(rob, elijah))

assert.deepEqual(`[5555 AAAA]`, printPlayerBooks(rob))
assert.deepEqual(`[]`, printPlayerBooks(carl))

assert.deepEqual(`YOU: [22, 9] [4444]`, printPlayerGameState(elijah, elijah))
assert.deepEqual(`rob: [.....] [5555 AAAA]`, printPlayerGameState(rob, elijah))
assert.deepEqual(`YOU: [33, K] [5555 AAAA]\n\nelijah: [.....] [4444]\ncarl: [.....] []\n`, printGameState(gameState, rob))

assert.deepEqual(false, hasFourCharacters(`aaa`))
assert.deepEqual(true, hasFourCharacters(`aaaa`))

assert.deepEqual('a', getFirstChar(`aaa`))

assert.deepEqual([`4`], findBooks(['4♠', '4♦', '4♥', `4♣`, `K♣`, `9♦`]))
assert.deepEqual([`5`], findBooks(['5♠', '5♦', '5♥', `5♣`, `K♣`, `9♦`]))
assert.deepEqual([], findBooks(['5♠', '5♦', '5♥', `6♣`, `K♣`, `9♦`]))

const george = {
	name: 'george',
	hand: ['3♠', '5♠', '5♦', '5♥', `5♣`, 'K♠', '3♥'],
	books: ['A']
}
const expectedGeorge = {
	name: 'george',
	hand: ['3♠', 'K♠', '3♥'],
	books: ['A', '5']
}

moveBookFromHandToBooks(george, '5')
assert.deepEqual(george, expectedGeorge)

const fred = {
	name: 'fred',
	hand: ['3♠', '5♠', '5♦', '5♥', `5♣`, 'K♠', '3♥'],
	books: ['A']
}

const ranks = getRanks(fred.hand)
assert.deepEqual(ranks, ['3', '5', 'K'])


// console.log(printGameState(gameState, carl))

// const gameStateTextExpected = `
// YOU: [22, 9] [4444]

// carl: [.....] []
// rob: [.....] [AAAA]`.trim()

// assert.equal(gameStateTextExpected, printGameState(gameState))

// assert.deepEqual(expected, printGameState(gameState))
// ♣ ♦	