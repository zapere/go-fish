const assert = require('assert')
const words = ['school', 'books', 'fish', 'windows', 'apple'];

function hasAnO(word) {
	for (let i = 0; i < word.length; i++) {
		if (word[i] === 'o') {
			return true
		}
	}
	return false
}

// https://github.com/MicrosoftDocs/live-share/issues/1485

assert.strictEqual(true, hasAnO('okapi'))
assert.strictEqual(false, hasAnO('fish'))
assert.strictEqual(true, hasAnO('school'))
// filter - make a list of all the words that contain an 'o'.
const justTheOs = words.filter(hasAnO)
assert.deepEqual(['school', 'books', 'windows'], justTheOs)

// forEach
// For each word in words print whether or not the word contains an 'o'. 
// [word] does not contain an o. 
// [word] contains an o. 
function report(word) {
	if (hasAnO(word)) {
		return `${word} contains an o`;
	} else {
		return `${word} does not contain an o`;
	}
}

assert.strictEqual('books contains an o', report('books'))
assert.strictEqual('fish does not contain an o', report('fish'))
function printReport(word) {
	console.log(report(word));
}
// words.forEach(printReport)

// Make a function that removes the first letter from a string. 
// Create a function that, given a list removes the first letter from each word in the list and returns the new list. 
function amputate(word) {
	let result = '';
	for (let i = 1; i < word.length; i++) {
		result += word[i]
	}
	return result;
}
const s = 'abcde'
const amputatedString = amputate(s)
assert.deepEqual('bcde', amputatedString)

const amputatedList = words.map(amputate)
assert.deepEqual(['chool', 'ooks', 'ish', 'indows', 'pple'], amputatedList)

// [ 'school', 'books', 'fish', 'windows', 'apple' ]
// [ school, books, fish, windows, apple ]
// school____books____fish____windows____apple
console.log(`[ ${words.join(' ')} ]`)



