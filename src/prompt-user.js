const inquirer = require('inquirer')

const askRank = async (ranks) => {
    let rank = undefined
    while (rank === undefined) {
        const answer = await inquirer.prompt({
            type: 'input',
            name: 'whichRank',
            message: `Which rank? (${ranks})`,
            default: ranks[0]
        });

        if (ranks.includes(answer.whichRank)) {
            rank = answer.whichRank
        }
    }
    return rank
}

const askPlayer = async (players, currentPlayer) => {
    let player = undefined
    while (player === undefined) {
        const answer = await inquirer.prompt({
            type: 'input',
            name: 'whichPlayer',
            message: `${currentPlayer}, which player do you want to ask? (${players})`,
            default: players[0]
        });
        

        if (players.includes(answer.whichPlayer)) {
            player = answer.whichPlayer
        }
    }
    return player
}
const askNewPlayer = async () => {
    let player = undefined
    while (player === undefined) {
        const answer = await inquirer.prompt({
            type: 'input',
            name: 'whichPlayer',
            message: `Who is the next player?`,
            default: 'DONE'
        });
        
        console.log(answer.whichPlayer)
        if (answer.whichPlayer !== 'DONE') {
            player = answer.whichPlayer
        } else {
            player = undefined
            break;
        }
    }
    return player
}

module.exports = {
    askRank, askPlayer, askNewPlayer
}