const path = require('path')
const app = require('express')()
const http = require('http').Server(app)
const io = require('socket.io')(http)
__dirname = path.resolve()

let activePlayers = []
let currentGameState;

io.on('connection', function (socket) {
  console.log('A player connected.', socket.id)

  socket.on('new-player', function (name) {
    console.log(`new-player ${name} - ${socket.id}`);
    const player = { name, id: socket.id }
    activePlayers.push(player)
    io.emit('player-added', activePlayers.map(player => player.name));
  })

  socket.on('start-game', function (gameState) {
    console.log(`start-game`)
    currentGameState = gameState
    io.emit('game-state-changed', currentGameState);
  })

  socket.on('rank-requested', function (rankRequest) {
    const requesteeName = rankRequest.requestee
    const rank = rankRequest.rank
    const requestor = currentGameState.players[currentGameState.whoseTurn].name
    console.log(`rank-requested ${requestor} ${requesteeName} ${rank}`)
    // TODO do ask rank logic. 
    // ******
    // ******
    // FIXME: gameState below should be currentGameState
    // ******
    // ******
    const requestee = gameState.players
      .find(function (player) {
        return player.name === requesteeName
      })

    console.log("other player hand", requestee.hand)

		/*
			The concat() method is used to merge two or more arrays. 
			This method does not change the existing arrays, but instead returns a new array.
		*/

    // If the person has the card. 
    // Take the cards of that rank from the person, and give them to the asker. 
    let gotTheRequestedRank = false
    const relinquishedCards = relinquishCardsOfRank(requestee, rank)
    if (relinquishedCards.length > 0) {
      console.log("relinquishedCards", relinquishedCards)
      currentPlayer.hand = currentPlayer.hand.concat(relinquishedCards)
      gotTheRequestedRank = true
    }
    else {
      // Otherwise, something else
      // Go fishing!!!!!!! (take a card from the top of the deck)
      //         c=>< c=>< c=>< c=>< 
      //     c=>< c=>< c=>< c=>< 
      // c=>< c=>< c=>< c=><  c=>< 
      //     c=>< c=>< c=>< c=>< 
      //         c=>< c=>< c=>< c=>< 
      const fishedCard = dealFromTop(ocean, 1)[0]
      currentPlayer.hand.push(fishedCard)
      console.log(`You got a ${fishedCard}`)

      if (getRank(fishedCard) === rank) {
        gotTheRequestedRank = true
      }
    }
    findAndMovePlayerBooks(currentPlayer)
    // let currentPlayer = gameState.players[gameState.whoseTurn]
    // if the player got the rank, then don't change whose turn.
    // but if the player didn't, then advance to the next player
    if (gotTheRequestedRank === false) {
      gameState.whoseTurn = (gameState.whoseTurn + 1) % gameState.players.length
    }
  })


  socket.on('disconnect', function (payload) {
    console.log('A player disconnected.', socket.id)

    // remove all the players
    activePlayers = []
    // let everyone know 
    io.emit('start-new-game')
    // end the game

  })
})

http.listen(3000, function () {
  console.log('listening on *:3000')
})

// TODO 
// Game play make it work. 
//  - Advance the turn after a player draws
// All players need to see the current player's requests. 
// Don't allow new players to join after a game has started. 