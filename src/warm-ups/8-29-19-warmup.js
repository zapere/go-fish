const assert = require('assert')

const books = [
  { title: "little women", author: "louisa may alcott", pages: 359, chapters: 23 },
  { title: "1984", author: "george orwell", pages: 225, chapters: 17 },
  { title: "animal farm", author: "george orwell", pages: 270, chapters: 14 },
  { title: "hop on pop", author: "dr seuss", pages: 22, chapters: 1 },
]

const getChapterPageAvg = (book) => book.pages / book.chapters


/*
    ones a const and the other is a function
    need an equals sign for the shorter version
    shoter version needs a fat arrow

*/

const avgPagePerChapter = books.map(getChapterPageAvg)

assert.deepEqual([
  15.608695652173912,
  13.235294117647058,
  19.285714285714285,
  22
], avgPagePerChapter)

// function getSentence(book) {
// 	return `${book.title} has an average of ${getChapterPageAvg(book).toFixed(1)} pages per chapter`
// }

const getSentence = (book) => `${book.title} has an average of ${getChapterPageAvg(book).toFixed(1)} pages per chapter`

const sentences = books.map(getSentence)

// function log(string) {
// 	console.log(string);
// }

const log = string => console.log(string)

sentences.forEach(log)

// function writtenByGeorge(book) {
// 	return book.author === 'george orwell'
// }

const writtenByGeorge = (book) => book.author === 'george orwell'


const writtenByGeorgeOrwell = books.filter(writtenByGeorge)
// console.log(writtenByGeorgeOrwell)


assert.deepEqual(writtenByGeorgeOrwell, [
  {
    author: 'george orwell',
    chapters: 17,
    pages: 225,
    title: '1984'
  },
  {
    author: 'george orwell',
    chapters: 14,
    pages: 270,
    title: 'animal farm'
  }
])

console.log("test")
console.log(["test", 7])
console.log({ test: "test", seven: 7 })

const bases = ['a', 'c', 'g', 't']

const sequences = [
  'gagtactcagtgtactcatgacgatcgtcatcatcgctatacgctgcaacgatctatggg',
  'cagtcacatcatcattagctacgcgatcacggacttcatcattcagagctcatgcgcgac',
  'acttcagacttgatacggtacgcagactcagcgcattcaggcgatactcgagacgggacg',
  'tttttactgcgaggagacgagaggaggaggggggcaggagagtgtacgtcttcggggcag'
]

function longestStringOfGs(sequence) {
  let currentSequenceLength = 0
  let highestSequenceLength = 0
  for (let i = 0; i < sequence.length; i++) {
    if (sequence[i] === 'g') {
      currentSequenceLength++
      if (currentSequenceLength > highestSequenceLength) {
        highestSequenceLength = currentSequenceLength
      }
    }
    else {

      currentSequenceLength = 0
    }
  }
  return highestSequenceLength
}

sequences.forEach(s => console.log(s, longestStringOfGs(s)))

function gcRation(sequence) {
  let gOrC = 0
  for (let i = 0; i < sequence.length; i++) {
    // if(sequence[i] === "c" || sequence[i] === "g"){
    if (["g", "c"].includes(sequence[i])) {
      gOrC++
    }

  }
  return gOrC / sequence.length
}
sequences.forEach(s => console.log(s, gcRation(s)))

const pattern = 'acttgatac'

function cutAtPattern(sequence, pattern) {
  const index = sequence.indexOf(pattern)
  if(index < 0){
    return []
  } 
  
  return [
    sequence.substring(0, pattern.length+index),
    sequence.substring(pattern.length+index, sequence.length )
  ]
}

sequences.forEach(s => console.log(s, cutAtPattern(s, pattern)))
