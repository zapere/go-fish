const assert = require('assert')

const words = ['school', 'books', 'fish', 'windows', 'apple'];

function endsWithS(word) {
	const length = word.length;
	if (word[word.length - 1] === 's') {
		return true
	} else return false
}

function endsWithSAgain(word) {
	return endsWithS(word);
}

const endsWithSYetAgain = (word) => {
    return endsWithSAgain(word);
}

assert.deepEqual(endsWithS(""), false)
assert.deepEqual(endsWithS("s"), true)
assert.deepEqual(endsWithS("x"), false)
assert.deepEqual(endsWithS("sx"), false)
assert.deepEqual(endsWithS("xs"), true)

for (let i = 0; i < words.length; i++) {
	const word = words[i];
	if (endsWithS(word) === true) {
		console.log(word)
	}
}

function printWord(word) { 
    console.log(word) 
}

words
	.filter(function (word) { return endsWithS(word); })
	.forEach(function (word) { console.log(word) })

words
	.filter(endsWithS)
	.forEach(printWord)