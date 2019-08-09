const assert = require('assert')
const words = ['school', 'books', 'fish', 'windows', 'apple'];


// map 
// Given a list convert each item in the list into the number of times 
// "o" occurs. 
// ["fool", "books", "window", "apple"] -> [2, 2, 1, 0]
// Parts: 
// use map somewhere
// howManyOs - function 
function howManyOs(word) {
	let count = 0
	for (let i = 0; i < word.length; i++) {
		if (word[i] === 'o') {
			count++
		}
	}
	return count
}

assert.strictEqual(2, howManyOs('fool'))
assert.strictEqual(0, howManyOs('bar'))
const oList = words.map(howManyOs)
assert.deepEqual([2, 2, 0, 1, 0], oList)


// join 
// build a string of the all the works with "::" as the delimiter. 
// ["fool", "books", "window", "apple"] -> fool::books::window::apple
const joinedWords = words.join('::')

console.log(joinedWords)
assert.strictEqual('school::books::fish::windows::apple', joinedWords)


// sort 
const ranks = ['3', 'k', '3']
console.log(ranks.sort().join(','));