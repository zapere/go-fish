const assert = require('assert')

const books = [
    {title: "little women", author: "louisa may alcott", pages: 359, chapters: 23},
    {title: "1984", author: "george orwell", pages: 225, chapters: 17},
    {title: "animal farm", author: "george orwell", pages: 270, chapters: 14},
    {title: "hop on pop", author: "dr seuss", pages: 22, chapters: 1},
]

function getChapterPageAvg (book){
    const avgPagesPerChapter = book.pages/book.chapters
    return avgPagesPerChapter
}

const avgPagePerChapter = books.map(getChapterPageAvg)

assert.deepEqual([  
    15.608695652173912,
    13.235294117647058,
    19.285714285714285,
    22
], avgPagePerChapter);

