const assert = require('assert')

const books = [
	{ title: "little women", author: "louisa may alcott", pages: 359, chapters: 23 },
	{ title: "1984", author: "george orwell", pages: 225, chapters: 17 },
	{ title: "animal farm", author: "george orwell", pages: 270, chapters: 14 },
	{ title: "hop on pop", author: "dr seuss", pages: 22, chapters: 1 },
]

function getChapterPageAvg(book) {
	const avgPagesPerChapter = book.pages / book.chapters
	return avgPagesPerChapter
}

const avgPagePerChapter = books.map(getChapterPageAvg)

assert.deepEqual([
	15.608695652173912,
	13.235294117647058,
	19.285714285714285,
	22
], avgPagePerChapter);

// Console.log the titles of each book with its avg page per chapter.
// Hint: round numbers to the nearest decimal using .toFixed(1). ex: number.toFixed(1)
// little women has an average of 15.6 pages per chapter. 
// _title_ has an average of _pages_ pages per chapter.
function logTitle(book) {
	console.log(book.title);
}
// console.log(books.forEach(logTitle))

function getSentence(book) {
	return `${book.title} has an average of ${getChapterPageAvg(book).toFixed(1)} pages per chapter`
}
// console.log(`${getChapterPageAvg(books[0])}`)
// console.log(getChapterPageAvg(books[0]))
// console.log(getChapterPageAvg(books[0]).toFixed(1))

const sentences = books.map(getSentence)

function log(string) {
	console.log(string);
}

// sentences.forEach(log)

function writtenByGeorge(book) {
	return book.author === 'george orwell'
}

const writtenByGeorgeOrwell = books.filter(writtenByGeorge)
// console.log(writtenByGeorgeOrwell)


books
	.filter(writtenByGeorge)
	.map(getSentence)
	.forEach(log)



// console.log(7)

// function log1(book) {
// 	console.log(1)
// 	return 12
// }
// log1({"some": "thing"})
// log1({ title: "little women", author: "louisa may alcott", pages: 359, chapters: 23 })
// console.log(books.forEach(log1))


// Console.log the titles of books written by george orwell with its avg page per chapter. Ex: 
