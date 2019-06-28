const path = require('path')
const app = require('express')()
const http = require('http').Server(app)
const io = require('socket.io')(http)
__dirname = path.resolve()

let activePlayers = []

io.on('connection', function (socket) {
  console.log('A player connected.')

  socket.on('new-player', function (name) {
    console.log(`new-player ${name} - ${socket.id}`);
    const player = { name, id: socket.id }
    activePlayers.push(player)
    io.emit('player-added', activePlayers.map(player => player.name));
  })

  function doesntHaveID(player) {

  }

  socket.on('disconnect', function () {
    console.log('A player disconnected.', socket.id)
    // remove the disconnected player
    activePlayers.filter()
    // let everyone know 

    // end the game

  })
})

http.listen(3000, function () {
  console.log('listening on *:3000')
})