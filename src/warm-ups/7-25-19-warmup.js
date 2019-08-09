const assert = require('assert')
const EventEmitter = require('events');

// Events 
const emitter = new EventEmitter();

const dataHandler = function (payload) {
  // console.log("elijahs data handler")
  console.log(payload)
}

emitter.on('data', dataHandler)

// emitter.on('data', function () {
//   console.log(`Data again.`);
// })

for (let index = 0; index < 10; index++) {
  index = index + 1;
  emitter.emit('data', { name: "rob", count: index })
}

// for (let index = 0; index < 10; index++) {
//   // index = index + 1;
//   dataHandler({ name: "rob", count: index + 1 });
//   console.log(`Data again.`);
// }

// { name: 'rob', count: 1 }
// { name: 'rob', count: 2 }
// { name: 'rob', count: 3 }
// { name: 'rob', count: 4 }
// { name: 'rob', count: 5 }
// { name: 'rob', count: 6 }
// { name: 'rob', count: 7 }
// { name: 'rob', count: 8 }
// { name: 'rob', count: 9 }
// { name: 'rob', count: 10 }
// Data again

// Make the data event emit 10 times. 
// Each time show the number of times the event has been emitted. 
// Replace dataHandler with an inline function. 