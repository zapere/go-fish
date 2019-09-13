const assert = require('assert')

const bases = ['a', 'c', 'g', 't']

const sequences = [
    'gagtactcagtgtactcatgacgatcgtcatcatcgctatacgctgcaacgatctatggg',
    'cagtcacatcatcattagctacgcgatcacggacttcatcattcagagctcatgcgcgac',
    'acttcagacttgatacggtacgcagactcagcgcattcaggcgatactcgagacgggacg',
    'tttttactgcgaggagacgagaggaggaggggggcaggagagtgtacgtcttcggggcag'
]


// map, filter, forEach


assert.deepEqual(5, countCommonBases("aaccgg", "taccgg"))

/*
 *  a a c c g g
 *  x | | | | |
 *  t a c c g g
 */


function countCommonBases(sequence1, sequence2) {
    let commonBaseCount = 0
    for (let i = 0; i < sequence1.length; i++) {
        if (sequence1[i] === sequence2[i]) {
            commonBaseCount = commonBaseCount + 1
        }

    }
    return commonBaseCount
}

console.log(sequences.map(function (sequence) {
    return countCommonBases(sequence, sequences[0])
}))

assert.deepEqual({ a: 0, c: 2, g: 1, t: 4 }, { c: 2, g: 1, a: 0, t: 4 })



function baseCounts(sequence) {

    let a = 0
    let c = 0
    let g = 0
    let t = 0

    for (let i = 0; i < sequence.length; i++) {

        if (sequence[i] === "a") {
            a++
        } else if (sequence[i] === "c") {
            c++
        } else if (sequence[i] === "g") {
            g++
        } else if (sequence[i] === "t") {
            t++
        }
    }
    return { a, c, g, t }
}


assert.deepEqual({ a: 0, c: 2, g: 1, t: 4 }, baseCounts("cgtcttt"))

console.log(sequences.map(baseCounts))

const baseWeights = {
    a: 507.2,
    c: 483.2,
    g: 523.2,
    t: 484.2
}

function molecularWeight(sequence) {
    const counts = baseCounts(sequence)
    return Math.round(baseWeights.a * counts.a + baseWeights.c * counts.c + baseWeights.g * counts.g + baseWeights.t * counts.t)
}

assert.deepEqual(2 * 507, molecularWeight("aa"))

console.log(sequences.map(molecularWeight))
