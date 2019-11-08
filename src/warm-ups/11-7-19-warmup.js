const fruits = ['apple', 'banana', 'orange', 'papaya', 'plum']
const vegetables = ['carrot', 'spinach', 'beet', 'broccoli']

const hasEvenLength = (word) => {
	return word.length % 2 === 0
}

const capitalize = (word) => {
	const initial = word[0]
	return initial.toUpperCase() + word.slice(1)
}
// console.log(capitalize('apple'))

vegetables
	.filter(
		(vegetable) => {
			return vegetable.length % 2 === 0
		}
	)
	.map(capitalize)
	.forEach(
		(vegetable) => {
			console.log(vegetable)
		}
	);

function fn1(a) {
	return a + 2;
}

const add2 = (a) => {
	return a + 2;
}

let a = add2(2)
a = a + 5

console.log(a)