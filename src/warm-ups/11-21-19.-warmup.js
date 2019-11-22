const assert = require('assert')

const dishes = [
	"turkey",
	"stuffing",
	"gravy",
	"mashed potatoes",
	"brussels sprouts",
	"cranberry sauce",
	"Mac n Cheese",
	"biscuits",
	"pumpkin pie"
];

// make a list of the vegan dishes. 
// const vegan = 
// const veganDish = (dish) => dish

const isVegan = dish => {
	const vegan = ["cranberry sauce", "pumpkin pie"]
	return vegan.includes(dish)
}

assert.deepEqual(isVegan("turkey"), false)
assert.deepEqual(isVegan("cranberry sauce"), true)

const veganDishes = dishes.filter(isVegan)
const veganDishesLonger = dishes.filter((dish) => isVegan(dish))
const veganDishesLongerer = dishes.filter(function (dish) { return isVegan(dish) })
assert.deepEqual(veganDishes, ["cranberry sauce", "pumpkin pie"])
assert.deepEqual(veganDishesLonger, ["cranberry sauce", "pumpkin pie"])

const longerIsVegan = dish => { 
    return isVegan(dish)
}

const longerLongerIsVegan = dish => { 
    return longerIsVegan(dish)
}
