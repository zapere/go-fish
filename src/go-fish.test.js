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
	matchesRank,
	hasFourCards,
	getRankFromGroup,
	moveBookFromHandToBooks,
	findAndMovePlayerBooks,
	getRanks,
	relinquishCardsOfRank,
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

assert.deepEqual(false, hasFourCards(`aaa`))
assert.deepEqual(true, hasFourCards(`aaaa`))
assert.deepEqual(true, hasFourCards(`10101010`))
assert.deepEqual(false, hasFourCards(`1010`))


assert.deepEqual('a', getRankFromGroup(`aaa`))
assert.deepEqual('10', getRankFromGroup(`1010`))

assert.deepEqual([`4`], findBooks(['4♠', '4♦', '4♥', `4♣`, `K♣`, `9♦`]))
assert.deepEqual([`5`], findBooks(['5♠', '5♦', '5♥', `5♣`, `K♣`, `9♦`]))
assert.deepEqual([], findBooks(['10♠', '10♥']))
assert.deepEqual(['10'], findBooks(['10♠', '10♥', '10♣', '10♦']))
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

const alice = {
	name: 'alice',
	hand: ['3♠', '5♠', '5♦', '5♥', `5♣`, 'K♠', '3♥'],
	books: ['A']
}
const expectedAlice = {
	name: 'alice',
	hand: ['3♠', 'K♠', '3♥'],
	books: ['A', '5']
}

findAndMovePlayerBooks(alice)
assert.deepEqual(alice, expectedAlice)

const twoTens = {
	name: 'twoTens',
	hand: ['10♠', '10♥'],
	books: []
}
findAndMovePlayerBooks(twoTens)
assert.deepEqual(twoTens.books, [])
assert.deepEqual(twoTens.hand, ['10♠', '10♥'])

const fourTens = {
	name: 'fourTens',
	hand: ['10♠', '10♥', '10♣', '10♦'],
	books: []
}
findAndMovePlayerBooks(fourTens)
assert.deepEqual(fourTens.books, [10])
assert.deepEqual(fourTens.hand, [])


const fred = {
	name: 'fred',
	hand: ['3♠', '5♠', '5♦', '5♥', 'K♠', '3♥'],
	books: ['A']
}

const ranks = getRanks(fred.hand)
assert.deepEqual(ranks, ['3', '5', 'K'])

assert.deepEqual(matchesRank('3', '3♠'), true)
assert.deepEqual(matchesRank('5', '7♠'), false)


const sevens = relinquishCardsOfRank(fred, '7')
assert.deepEqual(sevens, [])
assert.deepEqual(fred.hand, ['3♠', '5♠', '5♦', '5♥', 'K♠', '3♥'])


const threes = relinquishCardsOfRank(fred, '3')
assert.deepEqual(threes, ['3♠', '3♥'])
assert.deepEqual(fred.hand, ['5♠', '5♦', '5♥', 'K♠'])

// console.log(printGameState(gameState, carl))

// const gameStateTextExpected = `
// YOU: [22, 9] [4444]

// carl: [.....] []
// rob: [.....] [AAAA]`.trim()

// assert.equal(gameStateTextExpected, printGameState(gameState))

// assert.deepEqual(expected, printGameState(gameState))
// ♣ ♦	