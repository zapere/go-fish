const path = require('path')
const app = require('express')()
const http = require('http').Server(app)
const io = require('socket.io')(http)
let players = []
__dirname = path.resolve()

// app.get('/', function(req, res) {
//   res.sendFile(__dirname + '/index.html')
// })

function sendGameState(gameState) {
  io.emit('update-game-state', gameState)
}

io.on('connection', function (socket) {
  console.log('A client connected.')

  socket.on('ask', function (askData) {
    // Called when a player asks another player for a card.  
    // What kind of information do we need here? What should askData look like? 
  })

  socket.on('add-new-player', function (playerName) {
    players.push({ name: playerName, id: socket.id })
    io.emit('new-player-added', players)
  })

  socket.on('disconnect', function () {
    console.log('A player disconnected.')
    if (players.find(p => p.id === socket.id)) {
      players = [];
      console.log('Reset game.')
      io.emit('game-reset')
    }
  })
})

http.listen(3000, function () {
  console.log('listening on *:3000')
})