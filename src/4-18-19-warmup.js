let list = ["dog", "cat", "rhinoceros", "bird"]

const catFirst = [
  list.find(a => a === 'cat'), 
  ...list.filter(a => a !== 'cat')
  ]
const catFirst2 = [list
    .find(a => a === 'cat')]
		.concat(list.filter(a => a !== 'cat')); 
list.findIndex

console.log(list);
console.log(catFirst)
console.log(catFirst2)
// list[1] = "elephant"
// list[1] = list[3]
// list[3] = list[1]
const indexOfCat = list.indexOf("cat")
console.log(`indexOfCat: ${indexOfCat}`);
const a = list[0]
list[0] = list[indexOfCat]
list[indexOfCat] = a
console.log(list);

