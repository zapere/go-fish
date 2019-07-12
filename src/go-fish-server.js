const path = require('path')
const app = require('express')()
const http = require('http').Server(app)
const io = require('socket.io')(http)
__dirname = path.resolve()

let activePlayers = []

io.on('connection', function (socket) {
  console.log('A player connected.', socket.id)

  socket.on('new-player', function (name) {
    console.log(`new-player ${name} - ${socket.id}`);
    const player = { name, id: socket.id }
    activePlayers.push(player)
    io.emit('player-added', activePlayers.map(player => player.name));
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