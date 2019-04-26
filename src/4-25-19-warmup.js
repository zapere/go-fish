const assert = require('assert')
// THE "SPREAD" OPERATOR (...)

// combine lists (manipulate lists)
const list1 = [1, 2, 3, 4, 5]
const list2 = [6, 7, 8, 9, 10]
// const list3 = list1.concat(list2)
const list3 = [...list1, 0, ...list2]
console.log(list3);

// combine objects
const object1 = { a: 1, b: 2, c: 3 }
const object2 = { c: 30, d: 40, e: 50 }

const object3 = { ...object1, ...object2 }
console.log(object3);

const object4 = { ...object2, ...object1 }
console.log(object4);

const objectCopy = { ...object1 }

objectCopy.a = 17



assert.equal(object1.a, 1)