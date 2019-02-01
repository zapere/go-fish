const { askRank, askPlayer} = require('./prompt-user')

async function run() {
	const rank = await askRank(['2','4','9','A'])
	const otherPlayer = await askPlayer(['rob', 'carl'])

	console.log('rank', rank)
	console.log('player', otherPlayer)
}

run()