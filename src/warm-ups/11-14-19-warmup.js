const assert = require('assert')
// old 
function add(number1, number2) {
	return number1 + number2
}
// fat-arrow
const fatAdd = (number1, number2) => number1 + number2

assert.equal(4, add(2, 2))
assert.equal(4, fatAdd(2, 2))

const numbers = [1, 7, 2, 44, 92, 13, 18];

const addTwo = (number) => number + 2

assert.equal(4, addTwo(2))

const something = numbers.map(addTwo)
const numbersPlusTwo = [3, 9, 4, 46, 94, 15, 20]; 
assert.deepEqual(numbersPlusTwo, something);