const assert = require('assert')
const EventEmitter = require('events');

// filter 
const list1 = [1, 2, 3, 4, 5]
const list2 = [6, 7, 8, 9, 10]
const objects = [
	{ name: 'school' },
	{ name: 'books' },
	{ name: 'fish' },
	{ name: 'windows' },
	{ name: 'apple' },
	{ name: 'axe' }
];
// list of the words that start with the letter a. 

function startsWithALongWay(word) {
	return word.name[0] === 'a'
}

function getObjectName(object) {
	return object.name
}

const startsWithA = word => word.name[0] === 'a'
assert(startsWithA({ name: 'apple' }), true)

const aObjects = objects.filter(startsWithA)
assert.deepEqual(aObjects, [{ name: 'apple' }, { name: 'axe' }])

const aWords = objects
	.filter(startsWithA)
	.map(getObjectName)
assert.deepEqual(aWords, ['apple', 'axe'])

// // const startsWithS = word => word[0] === 's'

// const sWords = words.filter(word => word[0] === 's')

// assert.deepEqual(sWords, ['school'])

// Events 
const emitter = new EventEmitter();

const startHandler = function (payload) {
	console.log("elijahs start handler")
	console.log(payload.name)
}

emitter.on('start', startHandler)


emitter.emit('start', { name: "rob" })

// Make an event handler by passing in a variable instead of an inline function. 

// Create a new event that send an object as the payload.