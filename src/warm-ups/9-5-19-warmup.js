const list = ["dog", "cat", "rhinoceros", "bird"]

function printItem(item) {
	console.log(">", item);
}

list.forEach(printItem)

list.forEach(item => {
	console.log(item);
})

function printItemSentence(item) {
	console.log(`${item} has ${item.length} letters`)
}

list.forEach(item => {
	console.log(`${item} has ${item.length} letters`)
})

function animalNameHasAnA(item){
  return item.includes('a')
}

list
.filter(animalNameHasAnA)
.forEach(printItemSentence)
