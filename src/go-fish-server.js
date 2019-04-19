const path = require('path')
const app = require('express')()
const http = require('http').Server(app)
const io = require('socket.io')(http)
let players = []
__dirname = path.resolve()

// app.get('/', function(req, res) {
//   res.sendFile(__dirname + '/index.html')
// })

io.on('connection', function(socket) {
  console.log('A client connected.')

  socket.on('game-state-changed', function(newGameState) {
    socket.broadcast.emit('game-state-changed', newGameState)
  })

  socket.on('make-ask', function(askData) {
    socket.broadcast.emit('ask-made', askData)
  })

  socket.on('ask-rank', function(rank) {
    socket.broadcast.emit('ask-rank', rank)
  })

  socket.on('add-new-player', function(playerName) {
    players.push({ name: playerName, id: socket.id })
    io.emit('new-player-added', players)
  })

  socket.on('game-complete', function(playerName) {
    players = [];
    console.log(`${playerName} sent a game complete message.`)
    io.emit('game-complete')
  })

  socket.on('disconnect', function() {
    console.log('A player disconnected')
    if (players.find(p => p.id === socket.id)) {
      players = [];
      console.log('Reset game.')
      io.emit('game-reset')
    }
  })
})

http.listen(3000, function() {
  console.log('listening on *:3000')
})